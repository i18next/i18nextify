'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _i18nextLibEventEmitter = require('i18next/lib/EventEmitter');

var _i18nextLibEventEmitter2 = _interopRequireDefault(_i18nextLibEventEmitter);

var Observer = (function (_EventEmitter) {
  _inherits(Observer, _EventEmitter);

  function Observer(ele) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    _classCallCheck(this, Observer);

    _get(Object.getPrototypeOf(Observer.prototype), 'constructor', this).call(this);
    this.ele = ele;
    this.options = options;
    this.observer = this.create();
    this.internalChange = true;
  }

  _createClass(Observer, [{
    key: 'create',
    value: function create() {
      var _this = this;

      var lastToggleTimeout = undefined;
      var toggleInternal = function toggleInternal() {
        if (lastToggleTimeout) window.clearTimeout(lastToggleTimeout);

        lastToggleTimeout = setTimeout(function () {
          if (_this.internalChange) _this.internalChange = false;
        }, 200);
      };

      var observer = new MutationObserver(function (mutations) {
        // For the sake of...observation...let's output the mutation to console to see how this all works
        // mutations.forEach(function(mutation) {
        // 	console.log(mutation.type);
        // });
        if (_this.internalChange) toggleInternal();
        if (!_this.internalChange) _this.emit('changed', mutations);
      });

      // Notify me of everything!
      var observerConfig = {
        attributes: true,
        childList: true,
        characterData: true,
        subtree: true
      };

      // Node, config
      // In this case we'll listen to all changes to body and child nodes
      observer.observe(this.ele, observerConfig);

      return observer;
    }
  }, {
    key: 'reset',
    value: function reset() {
      this.internalChange = true;
    }
  }]);

  return Observer;
})(_i18nextLibEventEmitter2['default']);

exports['default'] = Observer;
exports['default'] = Observer;
module.exports = exports['default'];