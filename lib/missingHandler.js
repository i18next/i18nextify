'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.missingHandler = missingHandler;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _i18next = require('i18next');

var _i18next2 = _interopRequireDefault(_i18next);

var _i18nextLibUtils = require('i18next/lib/utils');

var _utils = require('./utils');

var utils = _interopRequireWildcard(_utils);

var missings = {};

function log() {
  _i18next2['default'].services.logger.log('missing resources: \n' + JSON.stringify(missings, null, 2));
}

var debouncedLog = utils.debounce(log, 2000);

function missingHandler(lngs, namespace, key, res) {
  console.warn('here');
  (0, _i18nextLibUtils.setPath)(missings, [namespace, key], res);
  console.warn('there');
  debouncedLog();
}