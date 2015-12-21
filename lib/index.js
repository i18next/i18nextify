'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _i18next = require('i18next');

var _i18next2 = _interopRequireDefault(_i18next);

var _i18nextXhrBackend = require('i18next-xhr-backend');

var _i18nextXhrBackend2 = _interopRequireDefault(_i18nextXhrBackend);

var _i18nextBrowserLanguagedetector = require('i18next-browser-languagedetector');

var _i18nextBrowserLanguagedetector2 = _interopRequireDefault(_i18nextBrowserLanguagedetector);

var _Observer = require('./Observer');

var _Observer2 = _interopRequireDefault(_Observer);

var _docReady = require('./docReady');

var _docReady2 = _interopRequireDefault(_docReady);

var _renderer = require('./renderer');

var _renderer2 = _interopRequireDefault(_renderer);

var _missingHandler = require('./missingHandler');

function getDefaults() {
  return {
    autorun: true,
    ele: document.body,
    ignoreTags: ['SCRIPT'],
    nsSeparator: '#||#',
    keySeparator: '#|#',
    debug: window.location.search && window.location.search.indexOf('debug=true') > -1,
    saveMissing: window.location.search && window.location.search.indexOf('saveMissing=true') > -1
  };
}

// auto initialize on dom ready
var domReady = false;
var initialized = false;
(0, _docReady2['default'])(function () {
  domReady = true;
  if (!initialized) init();
});

// extend i18next with default extensions
_i18next2['default'].use(_i18nextXhrBackend2['default']);
_i18next2['default'].use(_i18nextBrowserLanguagedetector2['default']);

// log out missings
_i18next2['default'].on('missingKey', _missingHandler.missingHandler);

// store last init options - for case init is called before dom ready
var lastOptions = {};

function init() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  options = _extends({}, getDefaults(), lastOptions, options);

  // delay init from domReady
  if (!options.ele) {
    delete options.ele;
    lastOptions = options;
    return;
  }

  initialized = true;
  var renderers = [];

  function addRenderers() {
    var ele = options.ele;
    var children = ele.children;

    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (options.ignoreTags.indexOf(c.tagName) < 0 && !c.attributes.translated) {
        var r = (0, _renderer2['default'])(c, observer);
        renderers.push(r);
        r.render();
      }
    }
  }

  var observer = new _Observer2['default'](options.ele);

  observer.on('changed', function (mutations) {
    renderers.forEach(function (r) {
      return r.debouncedRender();
    });
    addRenderers();
  });

  var todo = 1;
  if (!domReady) todo++;
  if (options.autorun === false) todo++;

  function done() {
    todo = todo - 1;
    if (!todo) {
      addRenderers();
      if (options.ele.style && options.ele.style.display === 'none') options.ele.style.display = 'block';
    }
  }

  _i18next2['default'].init(options, done);

  if (options.autorun !== false && !domReady) {
    (0, _docReady2['default'])(done);
  }
  if (options.autorun === false) return { start: done };
}

exports['default'] = {
  init: init,
  i18next: _i18next2['default']
};
module.exports = exports['default'];