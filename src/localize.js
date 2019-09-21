import toHTML from 'vdom-to-html';
import parser from 'vdom-parser';
import VNode from 'virtual-dom/vnode/vnode';
import i18next from 'i18next';
import { getPath, setPath } from 'i18next/dist/es/utils';
import { getAttribute } from './utils';
import Instrument from './Instrument';

function isUnTranslated(node, opts = { retranslate: false }) {
  if (opts && opts.retranslate) return true;
  return (
    !node.properties ||
    !node.properties.attributes ||
    node.properties.attributes.localized !== ''
  );
}

function isNotExcluded(node) {
  let ret =
    !node.properties ||
    !node.properties.attributes ||
    node.properties.attributes.translated !== '';

  if (
    ret &&
    node.tagName &&
    i18next.options.ignoreTags.indexOf(node.tagName) > -1
  ) {
    ret = false;
  }

  if (
    ret &&
    i18next.options.ignoreClasses &&
    node.properties &&
    node.properties.className
  ) {
    const p = node.properties.className.split(' ');
    p.forEach((cls) => {
      if (!ret) return;
      if (i18next.options.ignoreClasses.indexOf(cls) > -1) ret = false;
    });
  }

  if (ret && i18next.options.ignoreIds) {
    if (
      i18next.options.ignoreIds.indexOf(node.properties && node.properties.id) >
      -1
    ) {
      ret = false;
    }
  }

  return ret;
}

function translate(str, options = {}, overrideKey) {
  const hasContent = str.trim();
  const key = overrideKey || str.trim();
  if (!options.defaultValue) options.defaultValue = str;
  if (
    (hasContent && !i18next.options.ignoreWithoutKey) ||
    (hasContent && i18next.options.ignoreWithoutKey && overrideKey)
  ) {
    return i18next.t(key, options);
  }
  return str;
}

const replaceInside = ['src', 'href'];
const REGEXP = new RegExp('%7B%7B(.+?)%7D%7D', 'g'); // urlEncoded {{}}
function translateProps(node, props, tOptions = {}, overrideKey, opts) {
  if (!props) return props;

  i18next.options.translateAttributes.forEach((item) => {
    if (item.ele && node.tagName !== item.ele) return;
    if (item.cond && item.cond.length === 2) {
      const condValue =
        getPath(props, item.cond[0]) || getPath(props.attributes, item.cond[0]);
      if (!condValue || condValue !== item.cond[1]) return;
    }

    let wasOnAttr = false;
    let value = getPath(props, item.attr);
    if (!value) {
      value = getPath(props.attributes, item.attr);
      if (value) wasOnAttr = true;
    }

    if (opts.retranslate) {
      let usedValue =
        node.properties &&
        node.properties &&
        node.properties.attributes[`${item.attr}-locize-original-content`];
      if (!usedValue) usedValue = value;
      value = usedValue;
    }

    if (value) {
      node.properties.attributes[
        `${item.attr}-locize-original-content`
      ] = value;

      setPath(
        wasOnAttr ? props.attributes : props,
        item.attr,
        translate(
          value,
          { ...tOptions },
          overrideKey ? `${overrideKey}.${item.attr}` : ''
        )
      );
    }
  });

  replaceInside.forEach((attr) => {
    let value = getPath(props, attr);
    if (value) {
      value = value.replace(/\{\{/g, '%7B%7B').replace(/\}\}/g, '%7D%7D');
    } // fix for safari
    if (value && value.indexOf('%7B') > -1) {
      const arr = [];

      value.split(REGEXP).reduce((mem, match, index) => {
        if (match.length === 0) return mem;

        if (!index || index % 2 === 0) {
          mem.push(match);
        } else {
          mem.push(translate(
            match,
            { ...tOptions },
            overrideKey ? `${overrideKey}.${attr}` : ''
          ));
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
  if (optsOnNode && optsOnNode.inlineTags) {
    optsOnNode.inlineTags = optsOnNode.inlineTags.map(s => s.toUpperCase());
  }

  return { ...(opts || {}), ...(optsOnNode || {}) };
}

function removeIndent(str, substitution) {
  if (!i18next.options.cleanIndent) return str;

  const ret = str.replace(/\n +/g, substitution);
  return ret;
}

function canInline(node, tOptions) {
  if (
    !node.children ||
    !node.children.length ||
    i18next.options.ignoreInlineOn.indexOf(node.tagName) > -1
  ) {
    return false;
  }
  if (i18next.options.mergeTags.indexOf(node.tagName) > -1) return true;

  const baseTags = tOptions.inlineTags || i18next.options.inlineTags;
  const inlineTags = tOptions.additionalInlineTags
    ? baseTags.concat(tOptions.additionalInlineTags)
    : baseTags;

  let inlineable = true;
  let hadNonTextNode = false;
  node.children.forEach((child) => {
    if (!child.text && inlineTags.indexOf(child.tagName) < 0) {
      inlineable = false;
    }
    if (child.tagName) hadNonTextNode = true;
  });

  return inlineable && hadNonTextNode;
}

function walk(
  node,
  tOptions,
  parent,
  parentOverrideKey,
  currentDepth = 0,
  opts
) {
  const nodeIsNotExcluded = isNotExcluded(node);
  const nodeIsUnTranslated = isUnTranslated(node, opts);
  tOptions = getTOptions(tOptions, node);
  let parentKey = currentDepth === 0 ? parentOverrideKey : '';
  if (
    currentDepth > 0 &&
    parentOverrideKey &&
    !i18next.options.ignoreWithoutKey
  ) {
    parentKey = `${parentOverrideKey}.${currentDepth}`;
  }
  const overrideKey = getAttribute(node, i18next.options.keyAttr) || parentKey; // normally we use content as key, but optionally we allow to override it

  // translate node as one block
  const mergeFlag = getAttribute(node, 'merge');
  if (
    mergeFlag !== 'false' &&
    (mergeFlag === '' || canInline(node, tOptions))
  ) {
    if (nodeIsNotExcluded && nodeIsUnTranslated) {
      // wrap children into dummy node and remove that outer from translation
      const dummyNode = new VNode('I18NEXTIFYDUMMY', null, node.children);
      let key = removeIndent(toHTML(dummyNode), '')
        .replace('<i18nextifydummy>', '')
        .replace('</i18nextifydummy>', '');

      // grab orginial text if we enforce a retranslate
      if (opts.retranslate) {
        let usedKey =
          node.properties &&
          node.properties.attributes &&
          node.properties.attributes['locize-original-content'];
        if (!usedKey) {
          usedKey =
            parent &&
            parent.properties &&
            parent.properties.attributes &&
            parent.properties.attributes['locize-original-content'];
        }
        if (!usedKey) usedKey = key;

        key = usedKey;
      }

      // translate that's children and surround it again with a dummy node to parse to vdom
      const translation = `<i18nextifydummy>${translate(
        key,
        tOptions,
        overrideKey
      )}</i18nextifydummy>`;
      const newNode = parser((translation || '').trim());

      // replace children on passed in node
      node.children = newNode.children;

      // persist original key for future retranslate
      if (node.properties && node.properties.attributes) {
        node.properties.attributes['locize-original-content'] = key;
      } else if (parent && parent.properties && parent.properties.attributes) {
        parent.properties.attributes['locize-original-content'] = key;
      }

      if (node.properties && node.properties.attributes) {
        node.properties.attributes.localized = '';
      }
    }

    return node;
  }

  if (node.children) {
    node.children.forEach((child, i) => {
      if (
        (nodeIsNotExcluded && nodeIsUnTranslated && child.text) ||
        (!child.text && isNotExcluded(child))
      ) {
        walk(
          child,
          tOptions,
          node,
          overrideKey,
          node.children.length > 1 ? i + 1 : i, // if only a inner text node - keep it index 0, else add a index number + 1
          opts
        );
      }
    });
  }

  // ignore comments
  if (node.text && !node.properties && node.type === 'Widget') return node;

  if (nodeIsNotExcluded && nodeIsUnTranslated) {
    if (node.text) {
      let match;
      let txt = node.text;
      let originalText = node.text;

      // grab orginial text if we enforce a retranslate
      if (opts.retranslate) {
        let usedText =
          node.properties &&
          node.properties.attributes &&
          node.properties.attributes['locize-original-content'];
        if (!usedText) {
          usedText =
            parent &&
            parent.properties &&
            parent.properties.attributes &&
            parent.properties.attributes['locize-original-content'];
        }
        if (!usedText) usedText = node.text;

        txt = usedText;
        originalText = usedText;
      }

      // exclude whitespace replacement eg on PRE, CODE
      const ignore =
        i18next.options.ignoreCleanIndentFor.indexOf(parent.tagName) > -1;

      if (!ignore) {
        txt = removeIndent(node.text, '\n');
        if (i18next.options.cleanWhitespace) {
          const regex = /^\s*(.*[^\s])\s*$/g;
          match = regex.exec(txt);
        }
      }

      if (
        !ignore &&
        match &&
        match.length > 1 &&
        i18next.options.cleanWhitespace
      ) {
        const translation = translate(match[1], tOptions, overrideKey || '');
        node.text = txt.replace(match[1], translation);
      } else {
        node.text = translate(txt, tOptions, overrideKey || '');
      }

      // persist original text (key) for future retranslate
      if (node.properties && node.properties.attributes) {
        if (originalText) {
          node.properties.attributes['locize-original-content'] = originalText;
        }
      } else if (parent && parent.properties && parent.properties.attributes) {
        if (originalText) {
          parent.properties.attributes[
            'locize-original-content'
          ] = originalText;
        }
      }
    }

    // translate propertied
    if (node.properties) {
      node.properties = translateProps(
        node,
        node.properties,
        tOptions,
        overrideKey,
        opts
      );
    }

    // set translated
    if (node.properties && node.properties.attributes) {
      node.properties.attributes.localized = '';
    }
  }

  return node;
}

export default function localize(node, retranslate) {
  const recurseTime = new Instrument();
  recurseTime.start();

  const localized = walk(node, null, null, null, null, { retranslate });

  i18next.services.logger.log(`localization took: ${recurseTime.end()}ms`);

  return localized;
}
