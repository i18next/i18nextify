import { parseOptions } from '../src/utils';

const options = {
  autorun: true,
  keyAttr: 'i18next-key',
  ignoreWithoutKey: false,
  ignoreTags: ['SCRIPT'],
  ignoreIds: [],
  ignoreClasses: [],
  translateAttributes: [
    'placeholder',
    'title',
    'alt',
    'value#input.type=button',
    'value#input.type=submit'
  ],
  mergeTags: [],
  inlineTags: [],
  ignoreInlineOn: [],
  cleanIndent: true,
  ignoreCleanIndentFor: ['PRE', 'CODE'],
  cleanWhitespace: true,
  nsSeparator: '#||#',
  keySeparator: '#|#',
  debug: false,
  saveMissing: true,
  namespace: false,
  namespaceFromPath: false,
  missingKeyHandler: () => {},
  ns: [],
  onInitialTranslate: () => {}
};

let tCalls = [];
let translations = null;
const resetCalls = () => {
  tCalls = [];
};
module.exports = {
  options: parseOptions({ ...options }),
  resetOptions(opts) {
    this.options = parseOptions({ ...options, ...opts });
  },
  // Test-only: override the stubbed translation return values. `map` is
  // `{ key: returnValue, ... }`. Call with null to clear.
  setTranslations(map) {
    translations = map;
  },
  t(k, opts = {}) {
    tCalls.push({ k, opts });
    if (translations && Object.prototype.hasOwnProperty.call(translations, k)) {
      return translations[k];
    }
    return `#${opts.defaultValue || k}#`;
  },
  getCalls(reset = true) {
    const calls = tCalls;
    if (reset) resetCalls();
    return calls;
  },
  resetCalls,
  services: {
    logger: {
      log: () => {}
    }
  }
};
