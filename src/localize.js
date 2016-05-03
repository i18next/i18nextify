import i18next from 'i18next';
import { getPath, setPath } from 'i18next/dist/es/utils'
import Instrument from './Instrument';

function isUnTranslated(node) {
  return !node.properties || !node.properties.attributes || node.properties.attributes.localized !== '';
}

function isNotExcluded(node) {
  return !node.properties || !node.properties.attributes || node.properties.attributes.translated !== '';
}

function translate(str, options = {}) {
  let key = str.trim();
  if (!options.defaultValue) options.defaultValue = str;
  if (key) return i18next.t(key, options);
  return str
}

let toTranslate = ['placeholder', 'title'];
function translateProps(props, options = {}) {
  if (!props) return props;

  toTranslate.forEach((attr) => {
    let value = getPath(props, attr);
    if (value) setPath(props, attr, translate(value, options));
  });

  return props;
}

function getTOptions(opts, node) {
  let optsOnNode = node.properties && node.properties.attributes && node.properties.attributes['i18next-options'];
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
  const nodeIsNotExcluded = isNotExcluded(node);
  tOptions = getTOptions(tOptions, node);

  if (node.children) {
    node.children.forEach((child) => {
      if ((nodeIsNotExcluded && child.text) ||
          (!child.text && isNotExcluded(child))) {
        walk(child, tOptions);
      }
    });
  }

  if (nodeIsNotExcluded && isUnTranslated(node)) {
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
