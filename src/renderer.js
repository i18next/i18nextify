import virtualize from 'vdom-virtualize';
import diff from 'virtual-dom/diff';
import patch from 'virtual-dom/patch';
import ultraDeepClone from 'udc';

import Instrument from './Instrument';
import localize from './localize';
import * as utils from './utils';

import i18next from 'i18next/lib';

function createVdom(node) {
  let virtualizeTime = new Instrument();
  virtualizeTime.start();

  let vNode = virtualize(node);

  i18next.services.logger.log('virtualization took: ' + virtualizeTime.end() + 'ms');
  return vNode;
}

export default function(root, observer) {
  let ret = {};
  ret.render = function render() {
    let newNode = createVdom(root);
    let localized = localize(ultraDeepClone(newNode));

    let patches = diff(newNode, localized);
    if (patches['0']) observer.reset(); // reset observer if having patches
    root = patch(root, patches);
  }

  ret.debouncedRender = utils.debounce(ret.render, 200);

  return ret;
}
