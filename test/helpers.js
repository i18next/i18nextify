jest.mock('i18next');

import i18next from 'i18next';

const VNode = require('virtual-dom/vnode/vnode');
const VText = require('virtual-dom/vnode/vtext');

const convertHTML = require('html-to-vdom')({
  VNode,
  VText
});

import toHTML from 'vdom-to-html';
import localize from '../src/localize';

export function run(source, expectedResult, expectedKeys, debug = false) {
  const node = convertHTML(source.trim());

  const result = toHTML(localize(node));
  const calls = i18next.getCalls();

  if (debug && expectedResult) console.warn(result);
  if (debug && expectedKeys) console.warn(calls);

  if (expectedResult) expect(result).toEqual(expectedResult);
  if (expectedKeys) {
    expect(expectedKeys.length).toBe(calls.length);
    expectedKeys.forEach((k, i) => {
      if (typeof k === 'string') {
        expect(calls[i].k).toEqual(k);
      } else if (k.k && k.v) {
        expect(calls[i].k).toEqual(k.k);
        expect(calls[i].opts.defaultValue).toEqual(k.v);
      }
    });
  }
}

export function createRunner(opts = {}) {
  i18next.resetOptions(opts);

  return { run };
}
