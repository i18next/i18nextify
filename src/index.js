import i18next from 'i18next';
import HttpApi from 'i18next-http-backend';
import LngDet from 'i18next-browser-languagedetector';

import Observer from './Observer';

import docReady from './docReady';
import renderer from './renderer';
import { missingHandler } from './missingHandler';
import { parseOptions, getPathname } from './utils';

function getDefaults() {
  const scriptEle = document.getElementById('i18nextify');
  return {
    autorun: true,
    ele: document.body,
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
    debug:
      window.location.search &&
      window.location.search.indexOf('debug=true') > -1,
    saveMissing:
      window.location.search &&
      window.location.search.indexOf('saveMissing=true') > -1,
    namespace: false,
    namespaceFromPath: false,
    missingKeyHandler: missingHandler,
    ns: [],
    onInitialTranslate: () => {},
    fallbackLng: (scriptEle && (scriptEle.getAttribute('fallbacklng') || scriptEle.getAttribute('fallbackLng'))) || undefined
  };
}

// auto initialize on dom ready
let domReady = false;
let initialized = false;
docReady(() => {
  domReady = true;
  if (!initialized) init();
});

// extend i18next with default extensions
i18next.use(HttpApi);
i18next.use(LngDet);

// log out missings
// i18next.on('missingKey', missingHandler);

// store last init options - for case init is called before dom ready
let lastOptions = {};

function changeNamespace(ns) {
  if (!ns && lastOptions.namespaceFromPath) ns = getPathname();
  lastOptions.ns.push(ns);
  lastOptions.defaultNS = ns;

  i18next.loadNamespaces(lastOptions.ns, () => {
    i18next.setDefaultNamespace(ns);
  });
}

const renderers = [];

function init(options = {}) {
  options = { ...getDefaults(), ...lastOptions, ...options };

  options = parseOptions(options);

  // delay init from domReady
  if (!options.ele) {
    delete options.ele;
    lastOptions = options;
  }

  initialized = true;

  let observer;

  function addRenderers(children) {
    for (let i = 0; i < children.length; i++) {
      const c = children[i];
      if (
        options.ignoreTags.indexOf(c.tagName) < 0 &&
        options.ignoreIds.indexOf(c.id) < 0 &&
        options.ignoreClasses.indexOf(c.className) < 0 &&
        !c.attributes.localized &&
        !c.attributes.translated
      ) {
        const r = renderer(c, observer);
        renderers.push(r);
        r.render();
      }
    }
  }

  function waitForInitialRender(children, timeout, callback) {
    let allRendered = true;
    setTimeout(() => {
      for (let i = 0; i < children.length; i++) {
        const c = children[i];
        if (
          options.ignoreTags.indexOf(c.tagName) < 0 &&
          options.ignoreIds.indexOf(c.id) < 0 &&
          options.ignoreClasses.indexOf(c.className) < 0 &&
          !c.attributes.localized &&
          !c.attributes.translated
        ) {
          if (allRendered) waitForInitialRender(children, 100, callback);
          allRendered = false;
          break;
        }
      }

      if (allRendered) callback();
    }, timeout);
  }

  let todo = 1;
  if (!domReady) todo++;
  if (options.autorun === false) todo++;

  function done() {
    todo -= 1;
    if (!todo) {
      if (!options.ele) options.ele = document.body;
      const children = options.ele.children;

      observer = new Observer(options.ele);
      addRenderers(children);

      observer.on('changed', (mutations) => {
        renderers.forEach(r => r.debouncedRender());
        addRenderers(children);
      });

      waitForInitialRender(children, 0, () => {
        if (options.ele.style && options.ele.style.display === 'none') {
          options.ele.style.display = 'block';
        }

        if (window.document.title) {
          const keyTitle = window.document.getElementsByTagName('title').length > 0 && window.document.getElementsByTagName('title')[0].getAttribute('i18next-key');
          window.document.title = i18next.t(keyTitle || window.document.title);
        }
        if (document.querySelector('meta[name="description"]') && document.querySelector('meta[name="description"]').content) {
          const keyDescr = document.querySelector('meta[name="description"]').getAttribute(i18next.options.keyAttr) || document.querySelector('meta[name="description"]').content;
          document.querySelector('meta[name="description"]').setAttribute("content", i18next.t(keyDescr));
        }

        options.onInitialTranslate();
      });
    }
  }

  i18next.on('languageChanged', (lng) => {
    window.document.documentElement.lang = lng;
  });

  i18next.init(options, done);

  if (!domReady) {
    docReady(done);
  }
  if (options.autorun === false) return { start: done };
}

function forceRerender() {
  renderers.forEach((r) => {
    r.render(true); // enforce a rerender
  });
}

export default {
  init,
  i18next,
  changeNamespace,
  forceRerender
};
