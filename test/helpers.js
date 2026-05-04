// The i18next mock is registered in `test/setup.js` (run via vitest
// `setupFiles`) so every spec file inherits it.
import i18next from 'i18next'
import VNode from 'virtual-dom/vnode/vnode.js'
import VText from 'virtual-dom/vnode/vtext.js'
import htmlToVdom from 'html-to-vdom'
import toHTML from 'vdom-to-html'
import localize from '../src/localize.js'

const convertHTML = htmlToVdom({ VNode, VText })

export function run(source, expectedResult, expectedKeys, debug = false) {
  const node = convertHTML(source.trim())

  const result = toHTML(localize(node))
  const calls = i18next.getCalls()

  if (debug && expectedResult) console.warn(result)
  if (debug && expectedKeys) console.warn(calls)

  if (expectedResult) expect(result).toEqual(expectedResult)
  if (expectedKeys) {
    expect(expectedKeys.length).toBe(calls.length)
    expectedKeys.forEach((k, i) => {
      if (typeof k === 'string') {
        expect(calls[i].k).toEqual(k)
      } else if (k.k && k.v) {
        expect(calls[i].k).toEqual(k.k)
        expect(calls[i].opts.defaultValue).toEqual(k.v)
      }
    })
  }
}

export function createRunner(opts = {}) {
  i18next.resetOptions(opts)

  return { run }
}
