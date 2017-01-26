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

  return { ...(opts || {}), ...(optsOnNode || {}) };
}

function walk(node, tOptions) {
  var nodeIsNotExcluded = isNotExcluded(node);
  var nodeIsUnTranslated = isUnTranslated(node);
  tOptions = getTOptions(tOptions, node);

  console.warn('attr', getAttribute(node, 'merge'))

  console.warn(node, tOptions)
  console.warn(toHTML(node))

  // translate node as one block
  if (getAttribute(node, 'merge') === '' && nodeIsNotExcluded && nodeIsUnTranslated) {console.warn('here')
    const translation = translate(toHTML(node), tOptions);
    return parser((translation || '').trim());
  }

  if (node.children) {
    node.children.forEach(function (child) {
      if ((nodeIsNotExcluded && nodeIsUnTranslated && child.text) || (!child.text && isNotExcluded(child))) {
        walk(child, tOptions);
      }
    });
  }

  // ignore comments
  if (node.text && !node.properties && node.type === 'Widget') return node;

  if (nodeIsNotExcluded && nodeIsUnTranslated) {
    if (node.text) node.text = translate(node.text, tOptions);
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
