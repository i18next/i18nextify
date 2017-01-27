import toHTML from 'vdom-to-html';
import parser from 'vdom-parser';
import i18next from 'i18next';
import { getPath, setPath } from 'i18next/dist/es/utils';
import { getAttribute } from './utils'
import Instrument from './Instrument';

function isUnTranslated(node) {
  return !node.properties || !node.properties.attributes || node.properties.attributes.localized !== '';
}

function isNotExcluded(node) {
  let ret = !node.properties || !node.properties.attributes || node.properties.attributes.translated !== '';

  if (ret && node.tagName && i18next.options.ignoreTags.indexOf(node.tagName) > -1) ret = false;

  if (ret && i18next.options.ignoreClasses && node.properties && node.properties.className) {
    const p = node.properties.className.split(' ');
    p.forEach(cls => {
      if (!ret) return;
      if (i18next.options.ignoreClasses.indexOf(cls) > -1) ret = false;
    });
  }

  if (ret && i18next.options.ignoreIds) {
    if (i18next.options.ignoreIds.indexOf(node.properties && node.properties.id) > -1) ret = false;
  }

  return ret;
}

function translate(str, options = {}) {
  let key = str.trim();
  if (!options.defaultValue) options.defaultValue = str;
  if (key) return i18next.t(key, options);
  return str
}

let toTranslate = ['placeholder', 'title', 'alt'];
let replaceInside = ['src', 'href'];
const REGEXP = new RegExp('%7B%7B(.+?)%7D%7D', 'g'); // urlEncoded {{}}
function translateProps(props, options = {}) {
  if (!props) return props;

  toTranslate.forEach((attr) => {
    let value = getPath(props, attr);
    if (value) setPath(props, attr, translate(value, { ...options }));
  });

  replaceInside.forEach((attr) => {
    let value = getPath(props, attr);
    if (value) value = value.replace(/\{\{/g, '%7B%7B').replace(/\}\}/g, '%7D%7D'); // fix for safari
    if (value && value.indexOf('%7B') > -1) {
      const arr = [];

      value.split(REGEXP).reduce((mem, match, index) => {
        if (match.length === 0) return mem;

        if (!index || index % 2 === 0) {
          mem.push(match)
        } else {
          mem.push(translate(match, { ...options }));
        }
        return mem;
      }, arr);
      if (arr.length) setPath(props, attr, arr.join(''));
    }
  });

  return props;
}

function getTOptions(opts, node) {
  let optsOnNode = getAttribute(node, 'i18next-options');
  if (optsOnNode) {
    try {
      optsOnNode = JSON.parse(optsOnNode);
    } catch (e) {
      console.warn('failed parsing options on node', node);
    }
  }
  if (optsOnNode && optsOnNode.inlineTags) optsOnNode.inlineTags = optsOnNode.inlineTags.map(s => s.toUpperCase());

  return { ...(opts || {}), ...(optsOnNode || {}) };
}

function removeIndent(str, substitution) {
  if (!i18next.options.cleanIndent) return str;
  // const p = str.split('\n');
  // if (str.indexOf('\n') === 0 && p.length === 3) return p[1].replace(/^\s+/, '');
  // if (str.indexOf('\n') === 0 && p.length === 2) return p[1].replace(/^\s+/, '');
  // if (str.indexOf('\n') > 0 && p.length === 2) return p[0];
  const ret = str.replace(/\n +/g, substitution);
  return ret;
}

function canInline(node, tOptions) {
  if (!node.children || !node.children.length) return false;

  const baseTags = tOptions.inlineTags || i18next.options.inlineTags;
  const inlineTags = tOptions.additionalInlineTags ? baseTags.concat(tOptions.additionalInlineTags) : baseTags;

  let inlineable = true;
  let hadNonTextNode = false;
  node.children.forEach(function (child) {
    if (!child.text && inlineTags.indexOf(child.tagName) < 0) inlineable = false;
    if (child.tagName) hadNonTextNode = true;
  });

  return inlineable && hadNonTextNode;
}

function walk(node, tOptions, parent) {
  var nodeIsNotExcluded = isNotExcluded(node);
  var nodeIsUnTranslated = isUnTranslated(node);
  tOptions = getTOptions(tOptions, node);

  // translate node as one block
  if ((getAttribute(node, 'merge') === '' || canInline(node, tOptions)) && nodeIsNotExcluded && nodeIsUnTranslated) {
    const translation = translate(removeIndent(toHTML(node), ''), tOptions);
    const newNode = parser((translation || '').trim());

    if (newNode.properties && newNode.properties.attributes) newNode.properties.attributes.localized = '';
    return newNode;
  }

  if (node.children) {
    node.children.forEach(function (child) {
      if ((nodeIsNotExcluded && nodeIsUnTranslated && child.text) || (!child.text && isNotExcluded(child))) {
        walk(child, tOptions, node);
      }
    });
  }

  // ignore comments
  if (node.text && !node.properties && node.type === 'Widget') return node;

  if (nodeIsNotExcluded && nodeIsUnTranslated) {
    if (node.text) {
      let match;
      let txt = node.text;

      // exclude whitespace replacement eg on PRE, CODE
      const ignore = i18next.options.ignoreCleanIndentFor.indexOf(parent.tagName) > -1;

      if (!ignore) {
        txt = removeIndent(node.text, '\n');
        if (i18next.options.cleanWhitespace) {
          const regex = /^\s*(.*[^\s])\s*$/g;
          match = regex.exec(txt);
        }
      }

      if (!ignore && match && match.length > 1 && i18next.options.cleanWhitespace) {
        const translation = translate(match[1], tOptions);
        node.text = txt.replace(match[1], translation);
      } else {
        node.text = translate(txt, tOptions);
      }
    }
    if (node.properties) node.properties = translateProps(node.properties, tOptions);
    if (node.properties && node.properties.attributes) node.properties.attributes.localized = '';
  }

  return node;
}

export default function localize(node) {
  let recurseTime = new Instrument();
  recurseTime.start();

  let localized = walk(node);

  i18next.services.logger.log('localization took: ' + recurseTime.end() + 'ms');

  return localized;
}
