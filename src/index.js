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
    nsSeparator: '#||#',
    keySeparator: '#|#',
    debug: window.location.search && window.location.search.indexOf('debug=true') > -1,
    saveMissing: window.location.search && window.location.search.indexOf('saveMissing=true') > -1
  }
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
i18next.on('missingKey', missingHandler);

// store last init options - for case init is called before dom ready
let lastOptions = {};


function init(options = {}) {
  options = {...getDefaults(), ...lastOptions, ...options};

  // delay init from domReady
  if (!options.ele) {
    delete options.ele;
    lastOptions = options;
    return;
  }

  initialized = true;
  let renderers = [];

  function addRenderers() {
    let ele = options.ele;
    let children = ele.children;

    for (var i = 0; i < children.length; i++) {
      let c = children[i];
      if (options.ignoreTags.indexOf(c.tagName) < 0 && !c.attributes.translated) {
        let r = renderer(c, observer);
        renderers.push(r);
        r.render();
      }
    }
  }

  let observer = new Observer(options.ele);

  observer.on('changed', (mutations) => {
    renderers.forEach(r => r.debouncedRender());
    addRenderers();
  });

  let todo = 1;
  if (!domReady) todo++;
  if (options.autorun === false) todo++;

  function done() {
    todo = todo - 1;
    if (!todo) {
      addRenderers();
      if (options.ele.style && options.ele.style.display === 'none') options.ele.style.display = 'block';
    }
  }

  i18next.init(options, done);

  if (options.autorun !== false && !domReady) {
    docReady(done);
  }
  if (options.autorun === false) return { start: done };
}

export default {
  init: init,
  i18next: i18next
}
