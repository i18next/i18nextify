import virtualize from 'vdom-virtualize';
import diff from 'virtual-dom/diff';
import patch from 'virtual-dom/patch';
import ultraDeepClone from 'udc';

import Instrument from './Instrument';
import localize from './localize';
import * as utils from './utils';

import i18next from 'i18next';

function createVdom(node) {
  const virtualizeTime = new Instrument();
  virtualizeTime.start();

  const vNode = virtualize(node);

  i18next.services.logger.log(`virtualization took: ${virtualizeTime.end()}ms`);
  return vNode;
}

export default function (root, observer) {
  const ret = {};
  ret.render = function render(retranslate) {
    const newNode = createVdom(root);
    const localized = localize(ultraDeepClone(newNode), retranslate);

    const patches = diff(newNode, localized);
    if (patches['0']) observer.reset(); // reset observer if having patches
    root = patch(root, patches);
  };

  ret.debouncedRender = utils.debounce(ret.render, 200);

  return ret;
}
