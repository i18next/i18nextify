'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = localize;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _i18next = require('i18next');

var _i18next2 = _interopRequireDefault(_i18next);

var _i18nextLibUtils = require('i18next/lib/utils');

var _Instrument = require('./Instrument');

var _Instrument2 = _interopRequireDefault(_Instrument);

function isUnTranslated(node) {
  return !node.properties || !node.properties.attributes || node.properties.attributes.translated !== '';
}

function translate(str) {
  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var key = str.trim();
  if (!options.defaultValue) options.defaultValue = str;
  if (key) return _i18next2['default'].t(key, options);
  return str;
}

var toTranslate = ['placeholder', 'title'];
function translateProps(props) {
  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  if (!props) return props;

  toTranslate.forEach(function (attr) {
    var value = (0, _i18nextLibUtils.getPath)(props, attr);
    if (value) (0, _i18nextLibUtils.setPath)(props, attr, translate(value, options));
  });

  return props;
}

function getTOptions(opts, node) {
  var optsOnNode = node.properties && node.properties.attributes && node.properties.attributes['i18next-options'];
  if (optsOnNode) {
    try {
      optsOnNode = JSON.parse(optsOnNode);
    } catch (e) {
      console.warn('failed parsing options on node', node);
    }
  }

  return _extends({}, optsOnNode || {}, opts || {});
}

function walk(node, tOptions) {
  tOptions = getTOptions(tOptions, node);
  if (node.text) node.text = translate(node.text, tOptions);
  if (node.properties) node.properties = translateProps(node.properties, tOptions);

  var nodeIsUnTranslated = isUnTranslated(node);
  if (node.children) {
    node.children.forEach(function (child) {
      if (nodeIsUnTranslated && child.text || !child.text && isUnTranslated(child)) {
        walk(child, tOptions);
      }
    });
  }
  if (node.properties && node.properties.attributes) node.properties.attributes.translated = '';

  return node;
}

function localize(node) {
  var recurseTime = new _Instrument2['default']();
  recurseTime.start();

  var localized = walk(node);

  _i18next2['default'].services.logger.log('localization took: ' + recurseTime.end() + 'ms');

  return localized;
}

module.exports = exports['default'];