import i18next from 'i18next';
import XHR from 'i18next-xhr-backend';
import LngDet from 'i18next-browser-languagedetector';

import Observer from './Observer';

import docReady from './docReady';
import renderer from './renderer';
import { missingHandler } from './missingHandler';

function getDefaults() {
  return {
    autorun: true,
    ele: document.body,
    ignoreTags: ['SCRIPT'],
    ignoreIds: [],
    ignoreClasses: [],
    translateAttributes: ['placeholder', 'title', 'alt', 'value#input.type=button'],
    mergeTags: [],
    inlineTags: [],
    ignoreInlineOn: [],
    cleanIndent: false,
    ignoreCleanIndentFor: ['PRE', 'CODE'],
    cleanWhitespace: false,
    nsSeparator: '#||#',
    keySeparator: '#|#',
    debug: window.location.search && window.location.search.indexOf('debug=true') > -1,
    saveMissing: window.location.search && window.location.search.indexOf('saveMissing=true') > -1,
    namespace: false,
    namespaceFromPath: false,
    missingKeyHandler: missingHandler,
    ns: []
  };
}


// auto initialize on dom ready
let domReady = false;
let initialized = false;
docReady(function() {
  domReady = true;
  if (!initialized) init();
});

// extend i18next with default extensions
i18next.use(XHR);
i18next.use(LngDet);

// log out missings
// i18next.on('missingKey', missingHandler);

// store last init options - for case init is called before dom ready
let lastOptions = {};

function getPathname() {
  let path = location.pathname;
  if (path === '/') return 'root';

  const parts = path.split('/');
  let ret = 'root';

  parts.forEach(p => {
    if (p) ret += `_${p}`;
  });

  return ret;
}

function changeNamespace(ns) {
  if (!ns && lastOptions.namespaceFromPath) ns = getPathname();
  lastOptions.ns.push(ns);
  lastOptions.defaultNS = ns;

  i18next.loadNamespaces(lastOptions.ns, () => {
    i18next.setDefaultNamespace(ns);
  });
}

function init(options = {}) {
  options = {...getDefaults(), ...lastOptions, ...options};

  if (options.namespace) {
    options.ns.push(options.namespace);
    options.defaultNS = options.namespace;
  } else if (options.namespaceFromPath) {
    const ns = getPathname();
    options.ns.push(ns);
    options.defaultNS = ns;
  }

  if (!options.ns.length) options.ns = ['translation'];

  // delay init from domReady
  if (!options.ele) {
    delete options.ele;
    lastOptions = options;
  }

  if (options.ignoreTags) options.ignoreTags = options.ignoreTags.map(s => s.toUpperCase());
  if (options.ignoreCleanIndentFor) options.ignoreCleanIndentFor = options.ignoreCleanIndentFor.map(s => s.toUpperCase());
  if (options.inlineTags) options.inlineTags = options.inlineTags.map(s => s.toUpperCase());
  if (options.ignoreInlineOn) options.ignoreInlineOn = options.ignoreInlineOn.map(s => s.toUpperCase());
  if (options.mergeTags) options.mergeTags = options.mergeTags.map(s => s.toUpperCase());
  options.translateAttributes = options.translateAttributes.reduce((mem, attr) => {
    const res = { attr };
    if (attr.indexOf('#') > -1) {
      const [a, c] = attr.split('#');
      res.attr = a;
      if (c.indexOf('.') > -1) {
        const [e, b] = c.split('.');
        res.ele = e.toUpperCase();
        res.cond = b.toLowerCase().split('=');
      } else if (c.indexOf('=') > -1) {
        res.cond = c.toLowerCase().split('=');
      } else {
        res.ele = c.toUpperCase();
      }
    }
    mem.push(res);
    return mem;
  }, []);


  initialized = true;
  let renderers = [];

  let observer;

  function addRenderers(children) {
    for (var i = 0; i < children.length; i++) {
      let c = children[i];
      if (options.ignoreTags.indexOf(c.tagName) < 0 &&
        options.ignoreIds.indexOf(c.id) < 0 &&
        options.ignoreClasses.indexOf(c.className) < 0 &&
        !c.attributes.localized &&
        !c.attributes.translated) {
        let r = renderer(c, observer);
        renderers.push(r);
        r.render();
      }
    }
  }

  function waitForInitialRender(children, timeout, callback) {
    let allRendered = true;
    setTimeout(() => {
      for (var i = 0; i < children.length; i++) {
        let c = children[i];
        if (options.ignoreTags.indexOf(c.tagName) < 0 &&
          options.ignoreIds.indexOf(c.id) < 0 &&
          options.ignoreClasses.indexOf(c.className) < 0 &&
          !c.attributes.localized &&
          !c.attributes.translated) {
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
    todo = todo - 1;
    if (!todo) {
      if (!options.ele) options.ele = document.body;
      let children = options.ele.children;

      observer = new Observer(options.ele);
      addRenderers(children);

      observer.on('changed', (mutations) => {
        renderers.forEach(r => r.debouncedRender());
        addRenderers(children);
      });

      waitForInitialRender(children, 0, () => {
        if (options.ele.style && options.ele.style.display === 'none') options.ele.style.display = 'block';
      });
    }
  }

  i18next.init(options, done);

  if (!domReady) {
    docReady(done);
  }
  if (options.autorun === false) return { start: done };
}

export default {
  init,
  i18next,
  changeNamespace
}
