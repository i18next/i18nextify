(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.i18nextify = factory());
}(this, (function () { 'use strict';

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function _typeof(obj) {
        return typeof obj;
      };
    } else {
      _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _defineProperty$1(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? Object(arguments[i]) : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        _defineProperty$1(target, key, source[key]);
      });
    }

    return target;
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  var consoleLogger = {
    type: 'logger',
    log: function log(args) {
      this.output('log', args);
    },
    warn: function warn(args) {
      this.output('warn', args);
    },
    error: function error(args) {
      this.output('error', args);
    },
    output: function output(type, args) {
      if (console && console[type]) console[type].apply(console, args);
    }
  };

  var Logger = function () {
    function Logger(concreteLogger) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, Logger);

      this.init(concreteLogger, options);
    }

    _createClass(Logger, [{
      key: "init",
      value: function init(concreteLogger) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        this.prefix = options.prefix || 'i18next:';
        this.logger = concreteLogger || consoleLogger;
        this.options = options;
        this.debug = options.debug;
      }
    }, {
      key: "setDebug",
      value: function setDebug(bool) {
        this.debug = bool;
      }
    }, {
      key: "log",
      value: function log() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return this.forward(args, 'log', '', true);
      }
    }, {
      key: "warn",
      value: function warn() {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        return this.forward(args, 'warn', '', true);
      }
    }, {
      key: "error",
      value: function error() {
        for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          args[_key3] = arguments[_key3];
        }

        return this.forward(args, 'error', '');
      }
    }, {
      key: "deprecate",
      value: function deprecate() {
        for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
          args[_key4] = arguments[_key4];
        }

        return this.forward(args, 'warn', 'WARNING DEPRECATED: ', true);
      }
    }, {
      key: "forward",
      value: function forward(args, lvl, prefix, debugOnly) {
        if (debugOnly && !this.debug) return null;
        if (typeof args[0] === 'string') args[0] = "".concat(prefix).concat(this.prefix, " ").concat(args[0]);
        return this.logger[lvl](args);
      }
    }, {
      key: "create",
      value: function create(moduleName) {
        return new Logger(this.logger, _objectSpread({}, {
          prefix: "".concat(this.prefix, ":").concat(moduleName, ":")
        }, this.options));
      }
    }]);

    return Logger;
  }();

  var baseLogger = new Logger();

  var EventEmitter = function () {
    function EventEmitter() {
      _classCallCheck(this, EventEmitter);

      this.observers = {};
    }

    _createClass(EventEmitter, [{
      key: "on",
      value: function on(events, listener) {
        var _this = this;

        events.split(' ').forEach(function (event) {
          _this.observers[event] = _this.observers[event] || [];

          _this.observers[event].push(listener);
        });
        return this;
      }
    }, {
      key: "off",
      value: function off(event, listener) {
        if (!this.observers[event]) return;

        if (!listener) {
          delete this.observers[event];
          return;
        }

        this.observers[event] = this.observers[event].filter(function (l) {
          return l !== listener;
        });
      }
    }, {
      key: "emit",
      value: function emit(event) {
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        if (this.observers[event]) {
          var cloned = [].concat(this.observers[event]);
          cloned.forEach(function (observer) {
            observer.apply(void 0, args);
          });
        }

        if (this.observers['*']) {
          var _cloned = [].concat(this.observers['*']);

          _cloned.forEach(function (observer) {
            observer.apply(observer, [event].concat(args));
          });
        }
      }
    }]);

    return EventEmitter;
  }();

  function defer() {
    var res;
    var rej;
    var promise = new Promise(function (resolve, reject) {
      res = resolve;
      rej = reject;
    });
    promise.resolve = res;
    promise.reject = rej;
    return promise;
  }

  function makeString(object) {
    if (object == null) return '';
    return '' + object;
  }

  function copy(a, s, t) {
    a.forEach(function (m) {
      if (s[m]) t[m] = s[m];
    });
  }

  function getLastOfPath(object, path, Empty) {
    function cleanKey(key) {
      return key && key.indexOf('###') > -1 ? key.replace(/###/g, '.') : key;
    }

    function canNotTraverseDeeper() {
      return !object || typeof object === 'string';
    }

    var stack = typeof path !== 'string' ? [].concat(path) : path.split('.');

    while (stack.length > 1) {
      if (canNotTraverseDeeper()) return {};
      var key = cleanKey(stack.shift());
      if (!object[key] && Empty) object[key] = new Empty();
      object = object[key];
    }

    if (canNotTraverseDeeper()) return {};
    return {
      obj: object,
      k: cleanKey(stack.shift())
    };
  }

  function setPath(object, path, newValue) {
    var _getLastOfPath = getLastOfPath(object, path, Object),
        obj = _getLastOfPath.obj,
        k = _getLastOfPath.k;

    obj[k] = newValue;
  }

  function pushPath(object, path, newValue, concat) {
    var _getLastOfPath2 = getLastOfPath(object, path, Object),
        obj = _getLastOfPath2.obj,
        k = _getLastOfPath2.k;

    obj[k] = obj[k] || [];
    if (concat) obj[k] = obj[k].concat(newValue);
    if (!concat) obj[k].push(newValue);
  }

  function getPath(object, path) {
    var _getLastOfPath3 = getLastOfPath(object, path),
        obj = _getLastOfPath3.obj,
        k = _getLastOfPath3.k;

    if (!obj) return undefined;
    return obj[k];
  }

  function getPathWithDefaults(data, defaultData, key) {
    var value = getPath(data, key);

    if (value !== undefined) {
      return value;
    }

    return getPath(defaultData, key);
  }

  function deepExtend(target, source, overwrite) {
    for (var prop in source) {
      if (prop !== '__proto__') {
        if (prop in target) {
          if (typeof target[prop] === 'string' || target[prop] instanceof String || typeof source[prop] === 'string' || source[prop] instanceof String) {
            if (overwrite) target[prop] = source[prop];
          } else {
            deepExtend(target[prop], source[prop], overwrite);
          }
        } else {
          target[prop] = source[prop];
        }
      }
    }

    return target;
  }

  function regexEscape(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
  }

  var _entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;'
  };

  function escape(data) {
    if (typeof data === 'string') {
      return data.replace(/[&<>"'\/]/g, function (s) {
        return _entityMap[s];
      });
    }

    return data;
  }

  var isIE10 = typeof window !== 'undefined' && window.navigator && window.navigator.userAgent && window.navigator.userAgent.indexOf('MSIE') > -1;

  var ResourceStore = function (_EventEmitter) {
    _inherits(ResourceStore, _EventEmitter);

    function ResourceStore(data) {
      var _this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        ns: ['translation'],
        defaultNS: 'translation'
      };

      _classCallCheck(this, ResourceStore);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(ResourceStore).call(this));

      if (isIE10) {
        EventEmitter.call(_assertThisInitialized(_this));
      }

      _this.data = data || {};
      _this.options = options;

      if (_this.options.keySeparator === undefined) {
        _this.options.keySeparator = '.';
      }

      return _this;
    }

    _createClass(ResourceStore, [{
      key: "addNamespaces",
      value: function addNamespaces(ns) {
        if (this.options.ns.indexOf(ns) < 0) {
          this.options.ns.push(ns);
        }
      }
    }, {
      key: "removeNamespaces",
      value: function removeNamespaces(ns) {
        var index = this.options.ns.indexOf(ns);

        if (index > -1) {
          this.options.ns.splice(index, 1);
        }
      }
    }, {
      key: "getResource",
      value: function getResource(lng, ns, key) {
        var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
        var keySeparator = options.keySeparator !== undefined ? options.keySeparator : this.options.keySeparator;
        var path = [lng, ns];
        if (key && typeof key !== 'string') path = path.concat(key);
        if (key && typeof key === 'string') path = path.concat(keySeparator ? key.split(keySeparator) : key);

        if (lng.indexOf('.') > -1) {
          path = lng.split('.');
        }

        return getPath(this.data, path);
      }
    }, {
      key: "addResource",
      value: function addResource(lng, ns, key, value) {
        var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {
          silent: false
        };
        var keySeparator = this.options.keySeparator;
        if (keySeparator === undefined) keySeparator = '.';
        var path = [lng, ns];
        if (key) path = path.concat(keySeparator ? key.split(keySeparator) : key);

        if (lng.indexOf('.') > -1) {
          path = lng.split('.');
          value = ns;
          ns = path[1];
        }

        this.addNamespaces(ns);
        setPath(this.data, path, value);
        if (!options.silent) this.emit('added', lng, ns, key, value);
      }
    }, {
      key: "addResources",
      value: function addResources(lng, ns, resources) {
        var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {
          silent: false
        };

        for (var m in resources) {
          if (typeof resources[m] === 'string' || Object.prototype.toString.apply(resources[m]) === '[object Array]') this.addResource(lng, ns, m, resources[m], {
            silent: true
          });
        }

        if (!options.silent) this.emit('added', lng, ns, resources);
      }
    }, {
      key: "addResourceBundle",
      value: function addResourceBundle(lng, ns, resources, deep, overwrite) {
        var options = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {
          silent: false
        };
        var path = [lng, ns];

        if (lng.indexOf('.') > -1) {
          path = lng.split('.');
          deep = resources;
          resources = ns;
          ns = path[1];
        }

        this.addNamespaces(ns);
        var pack = getPath(this.data, path) || {};

        if (deep) {
          deepExtend(pack, resources, overwrite);
        } else {
          pack = _objectSpread({}, pack, resources);
        }

        setPath(this.data, path, pack);
        if (!options.silent) this.emit('added', lng, ns, resources);
      }
    }, {
      key: "removeResourceBundle",
      value: function removeResourceBundle(lng, ns) {
        if (this.hasResourceBundle(lng, ns)) {
          delete this.data[lng][ns];
        }

        this.removeNamespaces(ns);
        this.emit('removed', lng, ns);
      }
    }, {
      key: "hasResourceBundle",
      value: function hasResourceBundle(lng, ns) {
        return this.getResource(lng, ns) !== undefined;
      }
    }, {
      key: "getResourceBundle",
      value: function getResourceBundle(lng, ns) {
        if (!ns) ns = this.options.defaultNS;
        if (this.options.compatibilityAPI === 'v1') return _objectSpread({}, {}, this.getResource(lng, ns));
        return this.getResource(lng, ns);
      }
    }, {
      key: "getDataByLanguage",
      value: function getDataByLanguage(lng) {
        return this.data[lng];
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        return this.data;
      }
    }]);

    return ResourceStore;
  }(EventEmitter);

  var postProcessor = {
    processors: {},
    addPostProcessor: function addPostProcessor(module) {
      this.processors[module.name] = module;
    },
    handle: function handle(processors, value, key, options, translator) {
      var _this = this;

      processors.forEach(function (processor) {
        if (_this.processors[processor]) value = _this.processors[processor].process(value, key, options, translator);
      });
      return value;
    }
  };
  var checkedLoadedFor = {};

  var Translator = function (_EventEmitter) {
    _inherits(Translator, _EventEmitter);

    function Translator(services) {
      var _this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, Translator);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Translator).call(this));

      if (isIE10) {
        EventEmitter.call(_assertThisInitialized(_this));
      }

      copy(['resourceStore', 'languageUtils', 'pluralResolver', 'interpolator', 'backendConnector', 'i18nFormat', 'utils'], services, _assertThisInitialized(_this));
      _this.options = options;

      if (_this.options.keySeparator === undefined) {
        _this.options.keySeparator = '.';
      }

      _this.logger = baseLogger.create('translator');
      return _this;
    }

    _createClass(Translator, [{
      key: "changeLanguage",
      value: function changeLanguage(lng) {
        if (lng) this.language = lng;
      }
    }, {
      key: "exists",
      value: function exists(key) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
          interpolation: {}
        };
        var resolved = this.resolve(key, options);
        return resolved && resolved.res !== undefined;
      }
    }, {
      key: "extractFromKey",
      value: function extractFromKey(key, options) {
        var nsSeparator = options.nsSeparator !== undefined ? options.nsSeparator : this.options.nsSeparator;
        if (nsSeparator === undefined) nsSeparator = ':';
        var keySeparator = options.keySeparator !== undefined ? options.keySeparator : this.options.keySeparator;
        var namespaces = options.ns || this.options.defaultNS;

        if (nsSeparator && key.indexOf(nsSeparator) > -1) {
          var m = key.match(this.interpolator.nestingRegexp);

          if (m && m.length > 0) {
            return {
              key: key,
              namespaces: namespaces
            };
          }

          var parts = key.split(nsSeparator);
          if (nsSeparator !== keySeparator || nsSeparator === keySeparator && this.options.ns.indexOf(parts[0]) > -1) namespaces = parts.shift();
          key = parts.join(keySeparator);
        }

        if (typeof namespaces === 'string') namespaces = [namespaces];
        return {
          key: key,
          namespaces: namespaces
        };
      }
    }, {
      key: "translate",
      value: function translate(keys, options, lastKey) {
        var _this2 = this;

        if (_typeof(options) !== 'object' && this.options.overloadTranslationOptionHandler) {
          options = this.options.overloadTranslationOptionHandler(arguments);
        }

        if (!options) options = {};
        if (keys === undefined || keys === null) return '';
        if (!Array.isArray(keys)) keys = [String(keys)];
        var keySeparator = options.keySeparator !== undefined ? options.keySeparator : this.options.keySeparator;

        var _this$extractFromKey = this.extractFromKey(keys[keys.length - 1], options),
            key = _this$extractFromKey.key,
            namespaces = _this$extractFromKey.namespaces;

        var namespace = namespaces[namespaces.length - 1];
        var lng = options.lng || this.language;
        var appendNamespaceToCIMode = options.appendNamespaceToCIMode || this.options.appendNamespaceToCIMode;

        if (lng && lng.toLowerCase() === 'cimode') {
          if (appendNamespaceToCIMode) {
            var nsSeparator = options.nsSeparator || this.options.nsSeparator;
            return namespace + nsSeparator + key;
          }

          return key;
        }

        var resolved = this.resolve(keys, options);
        var res = resolved && resolved.res;
        var resUsedKey = resolved && resolved.usedKey || key;
        var resExactUsedKey = resolved && resolved.exactUsedKey || key;
        var resType = Object.prototype.toString.apply(res);
        var noObject = ['[object Number]', '[object Function]', '[object RegExp]'];
        var joinArrays = options.joinArrays !== undefined ? options.joinArrays : this.options.joinArrays;
        var handleAsObjectInI18nFormat = !this.i18nFormat || this.i18nFormat.handleAsObject;
        var handleAsObject = typeof res !== 'string' && typeof res !== 'boolean' && typeof res !== 'number';

        if (handleAsObjectInI18nFormat && res && handleAsObject && noObject.indexOf(resType) < 0 && !(typeof joinArrays === 'string' && resType === '[object Array]')) {
          if (!options.returnObjects && !this.options.returnObjects) {
            this.logger.warn('accessing an object - but returnObjects options is not enabled!');
            return this.options.returnedObjectHandler ? this.options.returnedObjectHandler(resUsedKey, res, options) : "key '".concat(key, " (").concat(this.language, ")' returned an object instead of string.");
          }

          if (keySeparator) {
            var resTypeIsArray = resType === '[object Array]';
            var copy$$1 = resTypeIsArray ? [] : {};
            var newKeyToUse = resTypeIsArray ? resExactUsedKey : resUsedKey;

            for (var m in res) {
              if (Object.prototype.hasOwnProperty.call(res, m)) {
                var deepKey = "".concat(newKeyToUse).concat(keySeparator).concat(m);
                copy$$1[m] = this.translate(deepKey, _objectSpread({}, options, {
                  joinArrays: false,
                  ns: namespaces
                }));
                if (copy$$1[m] === deepKey) copy$$1[m] = res[m];
              }
            }

            res = copy$$1;
          }
        } else if (handleAsObjectInI18nFormat && typeof joinArrays === 'string' && resType === '[object Array]') {
          res = res.join(joinArrays);
          if (res) res = this.extendTranslation(res, keys, options, lastKey);
        } else {
          var usedDefault = false;
          var usedKey = false;

          if (!this.isValidLookup(res) && options.defaultValue !== undefined) {
            usedDefault = true;

            if (options.count !== undefined) {
              var suffix = this.pluralResolver.getSuffix(lng, options.count);
              res = options["defaultValue".concat(suffix)];
            }

            if (!res) res = options.defaultValue;
          }

          if (!this.isValidLookup(res)) {
            usedKey = true;
            res = key;
          }

          var updateMissing = options.defaultValue && options.defaultValue !== res && this.options.updateMissing;

          if (usedKey || usedDefault || updateMissing) {
            this.logger.log(updateMissing ? 'updateKey' : 'missingKey', lng, namespace, key, updateMissing ? options.defaultValue : res);

            if (keySeparator) {
              var fk = this.resolve(key, _objectSpread({}, options, {
                keySeparator: false
              }));
              if (fk && fk.res) this.logger.warn('Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.');
            }

            var lngs = [];
            var fallbackLngs = this.languageUtils.getFallbackCodes(this.options.fallbackLng, options.lng || this.language);

            if (this.options.saveMissingTo === 'fallback' && fallbackLngs && fallbackLngs[0]) {
              for (var i = 0; i < fallbackLngs.length; i++) {
                lngs.push(fallbackLngs[i]);
              }
            } else if (this.options.saveMissingTo === 'all') {
              lngs = this.languageUtils.toResolveHierarchy(options.lng || this.language);
            } else {
              lngs.push(options.lng || this.language);
            }

            var send = function send(l, k) {
              if (_this2.options.missingKeyHandler) {
                _this2.options.missingKeyHandler(l, namespace, k, updateMissing ? options.defaultValue : res, updateMissing, options);
              } else if (_this2.backendConnector && _this2.backendConnector.saveMissing) {
                _this2.backendConnector.saveMissing(l, namespace, k, updateMissing ? options.defaultValue : res, updateMissing, options);
              }

              _this2.emit('missingKey', l, namespace, k, res);
            };

            if (this.options.saveMissing) {
              var needsPluralHandling = options.count !== undefined && typeof options.count !== 'string';

              if (this.options.saveMissingPlurals && needsPluralHandling) {
                lngs.forEach(function (l) {
                  var plurals = _this2.pluralResolver.getPluralFormsOfKey(l, key);

                  plurals.forEach(function (p) {
                    return send([l], p);
                  });
                });
              } else {
                send(lngs, key);
              }
            }
          }

          res = this.extendTranslation(res, keys, options, resolved, lastKey);
          if (usedKey && res === key && this.options.appendNamespaceToMissingKey) res = "".concat(namespace, ":").concat(key);
          if (usedKey && this.options.parseMissingKeyHandler) res = this.options.parseMissingKeyHandler(res);
        }

        return res;
      }
    }, {
      key: "extendTranslation",
      value: function extendTranslation(res, key, options, resolved, lastKey) {
        var _this3 = this;

        if (this.i18nFormat && this.i18nFormat.parse) {
          res = this.i18nFormat.parse(res, options, resolved.usedLng, resolved.usedNS, resolved.usedKey, {
            resolved: resolved
          });
        } else if (!options.skipInterpolation) {
          if (options.interpolation) this.interpolator.init(_objectSpread({}, options, {
            interpolation: _objectSpread({}, this.options.interpolation, options.interpolation)
          }));
          var skipOnVariables = options.interpolation && options.interpolation.skipOnVariables || this.options.interpolation.skipOnVariables;
          var nestBef;

          if (skipOnVariables) {
            var nb = res.match(this.interpolator.nestingRegexp);
            nestBef = nb && nb.length;
          }

          var data = options.replace && typeof options.replace !== 'string' ? options.replace : options;
          if (this.options.interpolation.defaultVariables) data = _objectSpread({}, this.options.interpolation.defaultVariables, data);
          res = this.interpolator.interpolate(res, data, options.lng || this.language, options);

          if (skipOnVariables) {
            var na = res.match(this.interpolator.nestingRegexp);
            var nestAft = na && na.length;
            if (nestBef < nestAft) options.nest = false;
          }

          if (options.nest !== false) res = this.interpolator.nest(res, function () {
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }

            if (lastKey && lastKey[0] === args[0]) {
              _this3.logger.warn("It seems you are nesting recursively key: ".concat(args[0], " in key: ").concat(key[0]));

              return null;
            }

            return _this3.translate.apply(_this3, args.concat([key]));
          }, options);
          if (options.interpolation) this.interpolator.reset();
        }

        var postProcess = options.postProcess || this.options.postProcess;
        var postProcessorNames = typeof postProcess === 'string' ? [postProcess] : postProcess;

        if (res !== undefined && res !== null && postProcessorNames && postProcessorNames.length && options.applyPostProcessor !== false) {
          res = postProcessor.handle(postProcessorNames, res, key, this.options && this.options.postProcessPassResolved ? _objectSpread({
            i18nResolved: resolved
          }, options) : options, this);
        }

        return res;
      }
    }, {
      key: "resolve",
      value: function resolve(keys) {
        var _this4 = this;

        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var found;
        var usedKey;
        var exactUsedKey;
        var usedLng;
        var usedNS;
        if (typeof keys === 'string') keys = [keys];
        keys.forEach(function (k) {
          if (_this4.isValidLookup(found)) return;

          var extracted = _this4.extractFromKey(k, options);

          var key = extracted.key;
          usedKey = key;
          var namespaces = extracted.namespaces;
          if (_this4.options.fallbackNS) namespaces = namespaces.concat(_this4.options.fallbackNS);
          var needsPluralHandling = options.count !== undefined && typeof options.count !== 'string';
          var needsContextHandling = options.context !== undefined && typeof options.context === 'string' && options.context !== '';
          var codes = options.lngs ? options.lngs : _this4.languageUtils.toResolveHierarchy(options.lng || _this4.language, options.fallbackLng);
          namespaces.forEach(function (ns) {
            if (_this4.isValidLookup(found)) return;
            usedNS = ns;

            if (!checkedLoadedFor["".concat(codes[0], "-").concat(ns)] && _this4.utils && _this4.utils.hasLoadedNamespace && !_this4.utils.hasLoadedNamespace(usedNS)) {
              checkedLoadedFor["".concat(codes[0], "-").concat(ns)] = true;

              _this4.logger.warn("key \"".concat(usedKey, "\" for languages \"").concat(codes.join(', '), "\" won't get resolved as namespace \"").concat(usedNS, "\" was not yet loaded"), 'This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!');
            }

            codes.forEach(function (code) {
              if (_this4.isValidLookup(found)) return;
              usedLng = code;
              var finalKey = key;
              var finalKeys = [finalKey];

              if (_this4.i18nFormat && _this4.i18nFormat.addLookupKeys) {
                _this4.i18nFormat.addLookupKeys(finalKeys, key, code, ns, options);
              } else {
                var pluralSuffix;
                if (needsPluralHandling) pluralSuffix = _this4.pluralResolver.getSuffix(code, options.count);
                if (needsPluralHandling && needsContextHandling) finalKeys.push(finalKey + pluralSuffix);
                if (needsContextHandling) finalKeys.push(finalKey += "".concat(_this4.options.contextSeparator).concat(options.context));
                if (needsPluralHandling) finalKeys.push(finalKey += pluralSuffix);
              }

              var possibleKey;

              while (possibleKey = finalKeys.pop()) {
                if (!_this4.isValidLookup(found)) {
                  exactUsedKey = possibleKey;
                  found = _this4.getResource(code, ns, possibleKey, options);
                }
              }
            });
          });
        });
        return {
          res: found,
          usedKey: usedKey,
          exactUsedKey: exactUsedKey,
          usedLng: usedLng,
          usedNS: usedNS
        };
      }
    }, {
      key: "isValidLookup",
      value: function isValidLookup(res) {
        return res !== undefined && !(!this.options.returnNull && res === null) && !(!this.options.returnEmptyString && res === '');
      }
    }, {
      key: "getResource",
      value: function getResource(code, ns, key) {
        var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
        if (this.i18nFormat && this.i18nFormat.getResource) return this.i18nFormat.getResource(code, ns, key, options);
        return this.resourceStore.getResource(code, ns, key, options);
      }
    }]);

    return Translator;
  }(EventEmitter);

  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  var LanguageUtil = function () {
    function LanguageUtil(options) {
      _classCallCheck(this, LanguageUtil);

      this.options = options;
      this.whitelist = this.options.supportedLngs || false;
      this.supportedLngs = this.options.supportedLngs || false;
      this.logger = baseLogger.create('languageUtils');
    }

    _createClass(LanguageUtil, [{
      key: "getScriptPartFromCode",
      value: function getScriptPartFromCode(code) {
        if (!code || code.indexOf('-') < 0) return null;
        var p = code.split('-');
        if (p.length === 2) return null;
        p.pop();
        if (p[p.length - 1].toLowerCase() === 'x') return null;
        return this.formatLanguageCode(p.join('-'));
      }
    }, {
      key: "getLanguagePartFromCode",
      value: function getLanguagePartFromCode(code) {
        if (!code || code.indexOf('-') < 0) return code;
        var p = code.split('-');
        return this.formatLanguageCode(p[0]);
      }
    }, {
      key: "formatLanguageCode",
      value: function formatLanguageCode(code) {
        if (typeof code === 'string' && code.indexOf('-') > -1) {
          var specialCases = ['hans', 'hant', 'latn', 'cyrl', 'cans', 'mong', 'arab'];
          var p = code.split('-');

          if (this.options.lowerCaseLng) {
            p = p.map(function (part) {
              return part.toLowerCase();
            });
          } else if (p.length === 2) {
            p[0] = p[0].toLowerCase();
            p[1] = p[1].toUpperCase();
            if (specialCases.indexOf(p[1].toLowerCase()) > -1) p[1] = capitalize(p[1].toLowerCase());
          } else if (p.length === 3) {
            p[0] = p[0].toLowerCase();
            if (p[1].length === 2) p[1] = p[1].toUpperCase();
            if (p[0] !== 'sgn' && p[2].length === 2) p[2] = p[2].toUpperCase();
            if (specialCases.indexOf(p[1].toLowerCase()) > -1) p[1] = capitalize(p[1].toLowerCase());
            if (specialCases.indexOf(p[2].toLowerCase()) > -1) p[2] = capitalize(p[2].toLowerCase());
          }

          return p.join('-');
        }

        return this.options.cleanCode || this.options.lowerCaseLng ? code.toLowerCase() : code;
      }
    }, {
      key: "isWhitelisted",
      value: function isWhitelisted(code) {
        this.logger.deprecate('languageUtils.isWhitelisted', 'function "isWhitelisted" will be renamed to "isSupportedCode" in the next major - please make sure to rename it\'s usage asap.');
        return this.isSupportedCode(code);
      }
    }, {
      key: "isSupportedCode",
      value: function isSupportedCode(code) {
        if (this.options.load === 'languageOnly' || this.options.nonExplicitSupportedLngs) {
          code = this.getLanguagePartFromCode(code);
        }

        return !this.supportedLngs || !this.supportedLngs.length || this.supportedLngs.indexOf(code) > -1;
      }
    }, {
      key: "getBestMatchFromCodes",
      value: function getBestMatchFromCodes(codes) {
        var _this = this;

        if (!codes) return null;
        var found;
        codes.forEach(function (code) {
          if (found) return;

          var cleanedLng = _this.formatLanguageCode(code);

          if (!_this.options.supportedLngs || _this.isSupportedCode(cleanedLng)) found = cleanedLng;
        });

        if (!found && this.options.supportedLngs) {
          codes.forEach(function (code) {
            if (found) return;

            var lngOnly = _this.getLanguagePartFromCode(code);

            if (_this.isSupportedCode(lngOnly)) return found = lngOnly;
            found = _this.options.supportedLngs.find(function (supportedLng) {
              if (supportedLng.indexOf(lngOnly) === 0) return supportedLng;
            });
          });
        }

        if (!found) found = this.getFallbackCodes(this.options.fallbackLng)[0];
        return found;
      }
    }, {
      key: "getFallbackCodes",
      value: function getFallbackCodes(fallbacks, code) {
        if (!fallbacks) return [];
        if (typeof fallbacks === 'string') fallbacks = [fallbacks];
        if (Object.prototype.toString.apply(fallbacks) === '[object Array]') return fallbacks;
        if (!code) return fallbacks["default"] || [];
        var found = fallbacks[code];
        if (!found) found = fallbacks[this.getScriptPartFromCode(code)];
        if (!found) found = fallbacks[this.formatLanguageCode(code)];
        if (!found) found = fallbacks[this.getLanguagePartFromCode(code)];
        if (!found) found = fallbacks["default"];
        return found || [];
      }
    }, {
      key: "toResolveHierarchy",
      value: function toResolveHierarchy(code, fallbackCode) {
        var _this2 = this;

        var fallbackCodes = this.getFallbackCodes(fallbackCode || this.options.fallbackLng || [], code);
        var codes = [];

        var addCode = function addCode(c) {
          if (!c) return;

          if (_this2.isSupportedCode(c)) {
            codes.push(c);
          } else {
            _this2.logger.warn("rejecting language code not found in supportedLngs: ".concat(c));
          }
        };

        if (typeof code === 'string' && code.indexOf('-') > -1) {
          if (this.options.load !== 'languageOnly') addCode(this.formatLanguageCode(code));
          if (this.options.load !== 'languageOnly' && this.options.load !== 'currentOnly') addCode(this.getScriptPartFromCode(code));
          if (this.options.load !== 'currentOnly') addCode(this.getLanguagePartFromCode(code));
        } else if (typeof code === 'string') {
          addCode(this.formatLanguageCode(code));
        }

        fallbackCodes.forEach(function (fc) {
          if (codes.indexOf(fc) < 0) addCode(_this2.formatLanguageCode(fc));
        });
        return codes;
      }
    }]);

    return LanguageUtil;
  }();

  var sets = [{
    lngs: ['ach', 'ak', 'am', 'arn', 'br', 'fil', 'gun', 'ln', 'mfe', 'mg', 'mi', 'oc', 'pt', 'pt-BR', 'tg', 'ti', 'tr', 'uz', 'wa'],
    nr: [1, 2],
    fc: 1
  }, {
    lngs: ['af', 'an', 'ast', 'az', 'bg', 'bn', 'ca', 'da', 'de', 'dev', 'el', 'en', 'eo', 'es', 'et', 'eu', 'fi', 'fo', 'fur', 'fy', 'gl', 'gu', 'ha', 'hi', 'hu', 'hy', 'ia', 'it', 'kn', 'ku', 'lb', 'mai', 'ml', 'mn', 'mr', 'nah', 'nap', 'nb', 'ne', 'nl', 'nn', 'no', 'nso', 'pa', 'pap', 'pms', 'ps', 'pt-PT', 'rm', 'sco', 'se', 'si', 'so', 'son', 'sq', 'sv', 'sw', 'ta', 'te', 'tk', 'ur', 'yo'],
    nr: [1, 2],
    fc: 2
  }, {
    lngs: ['ay', 'bo', 'cgg', 'fa', 'ht', 'id', 'ja', 'jbo', 'ka', 'kk', 'km', 'ko', 'ky', 'lo', 'ms', 'sah', 'su', 'th', 'tt', 'ug', 'vi', 'wo', 'zh'],
    nr: [1],
    fc: 3
  }, {
    lngs: ['be', 'bs', 'cnr', 'dz', 'hr', 'ru', 'sr', 'uk'],
    nr: [1, 2, 5],
    fc: 4
  }, {
    lngs: ['ar'],
    nr: [0, 1, 2, 3, 11, 100],
    fc: 5
  }, {
    lngs: ['cs', 'sk'],
    nr: [1, 2, 5],
    fc: 6
  }, {
    lngs: ['csb', 'pl'],
    nr: [1, 2, 5],
    fc: 7
  }, {
    lngs: ['cy'],
    nr: [1, 2, 3, 8],
    fc: 8
  }, {
    lngs: ['fr'],
    nr: [1, 2],
    fc: 9
  }, {
    lngs: ['ga'],
    nr: [1, 2, 3, 7, 11],
    fc: 10
  }, {
    lngs: ['gd'],
    nr: [1, 2, 3, 20],
    fc: 11
  }, {
    lngs: ['is'],
    nr: [1, 2],
    fc: 12
  }, {
    lngs: ['jv'],
    nr: [0, 1],
    fc: 13
  }, {
    lngs: ['kw'],
    nr: [1, 2, 3, 4],
    fc: 14
  }, {
    lngs: ['lt'],
    nr: [1, 2, 10],
    fc: 15
  }, {
    lngs: ['lv'],
    nr: [1, 2, 0],
    fc: 16
  }, {
    lngs: ['mk'],
    nr: [1, 2],
    fc: 17
  }, {
    lngs: ['mnk'],
    nr: [0, 1, 2],
    fc: 18
  }, {
    lngs: ['mt'],
    nr: [1, 2, 11, 20],
    fc: 19
  }, {
    lngs: ['or'],
    nr: [2, 1],
    fc: 2
  }, {
    lngs: ['ro'],
    nr: [1, 2, 20],
    fc: 20
  }, {
    lngs: ['sl'],
    nr: [5, 1, 2, 3],
    fc: 21
  }, {
    lngs: ['he', 'iw'],
    nr: [1, 2, 20, 21],
    fc: 22
  }];
  var _rulesPluralsTypes = {
    1: function _(n) {
      return Number(n > 1);
    },
    2: function _(n) {
      return Number(n != 1);
    },
    3: function _(n) {
      return 0;
    },
    4: function _(n) {
      return Number(n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
    },
    5: function _(n) {
      return Number(n == 0 ? 0 : n == 1 ? 1 : n == 2 ? 2 : n % 100 >= 3 && n % 100 <= 10 ? 3 : n % 100 >= 11 ? 4 : 5);
    },
    6: function _(n) {
      return Number(n == 1 ? 0 : n >= 2 && n <= 4 ? 1 : 2);
    },
    7: function _(n) {
      return Number(n == 1 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
    },
    8: function _(n) {
      return Number(n == 1 ? 0 : n == 2 ? 1 : n != 8 && n != 11 ? 2 : 3);
    },
    9: function _(n) {
      return Number(n >= 2);
    },
    10: function _(n) {
      return Number(n == 1 ? 0 : n == 2 ? 1 : n < 7 ? 2 : n < 11 ? 3 : 4);
    },
    11: function _(n) {
      return Number(n == 1 || n == 11 ? 0 : n == 2 || n == 12 ? 1 : n > 2 && n < 20 ? 2 : 3);
    },
    12: function _(n) {
      return Number(n % 10 != 1 || n % 100 == 11);
    },
    13: function _(n) {
      return Number(n !== 0);
    },
    14: function _(n) {
      return Number(n == 1 ? 0 : n == 2 ? 1 : n == 3 ? 2 : 3);
    },
    15: function _(n) {
      return Number(n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
    },
    16: function _(n) {
      return Number(n % 10 == 1 && n % 100 != 11 ? 0 : n !== 0 ? 1 : 2);
    },
    17: function _(n) {
      return Number(n == 1 || n % 10 == 1 && n % 100 != 11 ? 0 : 1);
    },
    18: function _(n) {
      return Number(n == 0 ? 0 : n == 1 ? 1 : 2);
    },
    19: function _(n) {
      return Number(n == 1 ? 0 : n == 0 || n % 100 > 1 && n % 100 < 11 ? 1 : n % 100 > 10 && n % 100 < 20 ? 2 : 3);
    },
    20: function _(n) {
      return Number(n == 1 ? 0 : n == 0 || n % 100 > 0 && n % 100 < 20 ? 1 : 2);
    },
    21: function _(n) {
      return Number(n % 100 == 1 ? 1 : n % 100 == 2 ? 2 : n % 100 == 3 || n % 100 == 4 ? 3 : 0);
    },
    22: function _(n) {
      return Number(n == 1 ? 0 : n == 2 ? 1 : (n < 0 || n > 10) && n % 10 == 0 ? 2 : 3);
    }
  };

  function createRules() {
    var rules = {};
    sets.forEach(function (set) {
      set.lngs.forEach(function (l) {
        rules[l] = {
          numbers: set.nr,
          plurals: _rulesPluralsTypes[set.fc]
        };
      });
    });
    return rules;
  }

  var PluralResolver = function () {
    function PluralResolver(languageUtils) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, PluralResolver);

      this.languageUtils = languageUtils;
      this.options = options;
      this.logger = baseLogger.create('pluralResolver');
      this.rules = createRules();
    }

    _createClass(PluralResolver, [{
      key: "addRule",
      value: function addRule(lng, obj) {
        this.rules[lng] = obj;
      }
    }, {
      key: "getRule",
      value: function getRule(code) {
        return this.rules[code] || this.rules[this.languageUtils.getLanguagePartFromCode(code)];
      }
    }, {
      key: "needsPlural",
      value: function needsPlural(code) {
        var rule = this.getRule(code);
        return rule && rule.numbers.length > 1;
      }
    }, {
      key: "getPluralFormsOfKey",
      value: function getPluralFormsOfKey(code, key) {
        var _this = this;

        var ret = [];
        var rule = this.getRule(code);
        if (!rule) return ret;
        rule.numbers.forEach(function (n) {
          var suffix = _this.getSuffix(code, n);

          ret.push("".concat(key).concat(suffix));
        });
        return ret;
      }
    }, {
      key: "getSuffix",
      value: function getSuffix(code, count) {
        var _this2 = this;

        var rule = this.getRule(code);

        if (rule) {
          var idx = rule.noAbs ? rule.plurals(count) : rule.plurals(Math.abs(count));
          var suffix = rule.numbers[idx];

          if (this.options.simplifyPluralSuffix && rule.numbers.length === 2 && rule.numbers[0] === 1) {
            if (suffix === 2) {
              suffix = 'plural';
            } else if (suffix === 1) {
              suffix = '';
            }
          }

          var returnSuffix = function returnSuffix() {
            return _this2.options.prepend && suffix.toString() ? _this2.options.prepend + suffix.toString() : suffix.toString();
          };

          if (this.options.compatibilityJSON === 'v1') {
            if (suffix === 1) return '';
            if (typeof suffix === 'number') return "_plural_".concat(suffix.toString());
            return returnSuffix();
          } else if (this.options.compatibilityJSON === 'v2') {
            return returnSuffix();
          } else if (this.options.simplifyPluralSuffix && rule.numbers.length === 2 && rule.numbers[0] === 1) {
            return returnSuffix();
          }

          return this.options.prepend && idx.toString() ? this.options.prepend + idx.toString() : idx.toString();
        }

        this.logger.warn("no plural rule found for: ".concat(code));
        return '';
      }
    }]);

    return PluralResolver;
  }();

  var Interpolator = function () {
    function Interpolator() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, Interpolator);

      this.logger = baseLogger.create('interpolator');
      this.options = options;

      this.format = options.interpolation && options.interpolation.format || function (value) {
        return value;
      };

      this.init(options);
    }

    _createClass(Interpolator, [{
      key: "init",
      value: function init() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        if (!options.interpolation) options.interpolation = {
          escapeValue: true
        };
        var iOpts = options.interpolation;
        this.escape = iOpts.escape !== undefined ? iOpts.escape : escape;
        this.escapeValue = iOpts.escapeValue !== undefined ? iOpts.escapeValue : true;
        this.useRawValueToEscape = iOpts.useRawValueToEscape !== undefined ? iOpts.useRawValueToEscape : false;
        this.prefix = iOpts.prefix ? regexEscape(iOpts.prefix) : iOpts.prefixEscaped || '{{';
        this.suffix = iOpts.suffix ? regexEscape(iOpts.suffix) : iOpts.suffixEscaped || '}}';
        this.formatSeparator = iOpts.formatSeparator ? iOpts.formatSeparator : iOpts.formatSeparator || ',';
        this.unescapePrefix = iOpts.unescapeSuffix ? '' : iOpts.unescapePrefix || '-';
        this.unescapeSuffix = this.unescapePrefix ? '' : iOpts.unescapeSuffix || '';
        this.nestingPrefix = iOpts.nestingPrefix ? regexEscape(iOpts.nestingPrefix) : iOpts.nestingPrefixEscaped || regexEscape('$t(');
        this.nestingSuffix = iOpts.nestingSuffix ? regexEscape(iOpts.nestingSuffix) : iOpts.nestingSuffixEscaped || regexEscape(')');
        this.nestingOptionsSeparator = iOpts.nestingOptionsSeparator ? iOpts.nestingOptionsSeparator : iOpts.nestingOptionsSeparator || ',';
        this.maxReplaces = iOpts.maxReplaces ? iOpts.maxReplaces : 1000;
        this.alwaysFormat = iOpts.alwaysFormat !== undefined ? iOpts.alwaysFormat : false;
        this.resetRegExp();
      }
    }, {
      key: "reset",
      value: function reset() {
        if (this.options) this.init(this.options);
      }
    }, {
      key: "resetRegExp",
      value: function resetRegExp() {
        var regexpStr = "".concat(this.prefix, "(.+?)").concat(this.suffix);
        this.regexp = new RegExp(regexpStr, 'g');
        var regexpUnescapeStr = "".concat(this.prefix).concat(this.unescapePrefix, "(.+?)").concat(this.unescapeSuffix).concat(this.suffix);
        this.regexpUnescape = new RegExp(regexpUnescapeStr, 'g');
        var nestingRegexpStr = "".concat(this.nestingPrefix, "(.+?)").concat(this.nestingSuffix);
        this.nestingRegexp = new RegExp(nestingRegexpStr, 'g');
      }
    }, {
      key: "interpolate",
      value: function interpolate(str, data, lng, options) {
        var _this = this;

        var match;
        var value;
        var replaces;
        var defaultData = this.options && this.options.interpolation && this.options.interpolation.defaultVariables || {};

        function regexSafe(val) {
          return val.replace(/\$/g, '$$$$');
        }

        var handleFormat = function handleFormat(key) {
          if (key.indexOf(_this.formatSeparator) < 0) {
            var path = getPathWithDefaults(data, defaultData, key);
            return _this.alwaysFormat ? _this.format(path, undefined, lng) : path;
          }

          var p = key.split(_this.formatSeparator);
          var k = p.shift().trim();
          var f = p.join(_this.formatSeparator).trim();
          return _this.format(getPathWithDefaults(data, defaultData, k), f, lng, options);
        };

        this.resetRegExp();
        var missingInterpolationHandler = options && options.missingInterpolationHandler || this.options.missingInterpolationHandler;
        var skipOnVariables = options && options.interpolation && options.interpolation.skipOnVariables || this.options.interpolation.skipOnVariables;
        var todos = [{
          regex: this.regexpUnescape,
          safeValue: function safeValue(val) {
            return regexSafe(val);
          }
        }, {
          regex: this.regexp,
          safeValue: function safeValue(val) {
            return _this.escapeValue ? regexSafe(_this.escape(val)) : regexSafe(val);
          }
        }];
        todos.forEach(function (todo) {
          replaces = 0;

          while (match = todo.regex.exec(str)) {
            value = handleFormat(match[1].trim());

            if (value === undefined) {
              if (typeof missingInterpolationHandler === 'function') {
                var temp = missingInterpolationHandler(str, match, options);
                value = typeof temp === 'string' ? temp : '';
              } else if (skipOnVariables) {
                value = match[0];
                continue;
              } else {
                _this.logger.warn("missed to pass in variable ".concat(match[1], " for interpolating ").concat(str));

                value = '';
              }
            } else if (typeof value !== 'string' && !_this.useRawValueToEscape) {
              value = makeString(value);
            }

            str = str.replace(match[0], todo.safeValue(value));
            todo.regex.lastIndex = 0;
            replaces++;

            if (replaces >= _this.maxReplaces) {
              break;
            }
          }
        });
        return str;
      }
    }, {
      key: "nest",
      value: function nest(str, fc) {
        var _this2 = this;

        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        var match;
        var value;

        var clonedOptions = _objectSpread({}, options);

        clonedOptions.applyPostProcessor = false;
        delete clonedOptions.defaultValue;

        function handleHasOptions(key, inheritedOptions) {
          var sep = this.nestingOptionsSeparator;
          if (key.indexOf(sep) < 0) return key;
          var c = key.split(new RegExp("".concat(sep, "[ ]*{")));
          var optionsString = "{".concat(c[1]);
          key = c[0];
          optionsString = this.interpolate(optionsString, clonedOptions);
          optionsString = optionsString.replace(/'/g, '"');

          try {
            clonedOptions = JSON.parse(optionsString);
            if (inheritedOptions) clonedOptions = _objectSpread({}, inheritedOptions, clonedOptions);
          } catch (e) {
            this.logger.warn("failed parsing options string in nesting for key ".concat(key), e);
            return "".concat(key).concat(sep).concat(optionsString);
          }

          delete clonedOptions.defaultValue;
          return key;
        }

        while (match = this.nestingRegexp.exec(str)) {
          var formatters = [];
          var doReduce = false;

          if (match[0].includes(this.formatSeparator) && !/{.*}/.test(match[1])) {
            var r = match[1].split(this.formatSeparator).map(function (elem) {
              return elem.trim();
            });
            match[1] = r.shift();
            formatters = r;
            doReduce = true;
          }

          value = fc(handleHasOptions.call(this, match[1].trim(), clonedOptions), clonedOptions);
          if (value && match[0] === str && typeof value !== 'string') return value;
          if (typeof value !== 'string') value = makeString(value);

          if (!value) {
            this.logger.warn("missed to resolve ".concat(match[1], " for nesting ").concat(str));
            value = '';
          }

          if (doReduce) {
            value = formatters.reduce(function (v, f) {
              return _this2.format(v, f, options.lng, options);
            }, value.trim());
          }

          str = str.replace(match[0], value);
          this.regexp.lastIndex = 0;
        }

        return str;
      }
    }]);

    return Interpolator;
  }();

  function remove(arr, what) {
    var found = arr.indexOf(what);

    while (found !== -1) {
      arr.splice(found, 1);
      found = arr.indexOf(what);
    }
  }

  var Connector = function (_EventEmitter) {
    _inherits(Connector, _EventEmitter);

    function Connector(backend, store, services) {
      var _this;

      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      _classCallCheck(this, Connector);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Connector).call(this));

      if (isIE10) {
        EventEmitter.call(_assertThisInitialized(_this));
      }

      _this.backend = backend;
      _this.store = store;
      _this.services = services;
      _this.languageUtils = services.languageUtils;
      _this.options = options;
      _this.logger = baseLogger.create('backendConnector');
      _this.state = {};
      _this.queue = [];

      if (_this.backend && _this.backend.init) {
        _this.backend.init(services, options.backend, options);
      }

      return _this;
    }

    _createClass(Connector, [{
      key: "queueLoad",
      value: function queueLoad(languages, namespaces, options, callback) {
        var _this2 = this;

        var toLoad = [];
        var pending = [];
        var toLoadLanguages = [];
        var toLoadNamespaces = [];
        languages.forEach(function (lng) {
          var hasAllNamespaces = true;
          namespaces.forEach(function (ns) {
            var name = "".concat(lng, "|").concat(ns);

            if (!options.reload && _this2.store.hasResourceBundle(lng, ns)) {
              _this2.state[name] = 2;
            } else if (_this2.state[name] < 0) ;else if (_this2.state[name] === 1) {
              if (pending.indexOf(name) < 0) pending.push(name);
            } else {
              _this2.state[name] = 1;
              hasAllNamespaces = false;
              if (pending.indexOf(name) < 0) pending.push(name);
              if (toLoad.indexOf(name) < 0) toLoad.push(name);
              if (toLoadNamespaces.indexOf(ns) < 0) toLoadNamespaces.push(ns);
            }
          });
          if (!hasAllNamespaces) toLoadLanguages.push(lng);
        });

        if (toLoad.length || pending.length) {
          this.queue.push({
            pending: pending,
            loaded: {},
            errors: [],
            callback: callback
          });
        }

        return {
          toLoad: toLoad,
          pending: pending,
          toLoadLanguages: toLoadLanguages,
          toLoadNamespaces: toLoadNamespaces
        };
      }
    }, {
      key: "loaded",
      value: function loaded(name, err, data) {
        var s = name.split('|');
        var lng = s[0];
        var ns = s[1];
        if (err) this.emit('failedLoading', lng, ns, err);

        if (data) {
          this.store.addResourceBundle(lng, ns, data);
        }

        this.state[name] = err ? -1 : 2;
        var loaded = {};
        this.queue.forEach(function (q) {
          pushPath(q.loaded, [lng], ns);
          remove(q.pending, name);
          if (err) q.errors.push(err);

          if (q.pending.length === 0 && !q.done) {
            Object.keys(q.loaded).forEach(function (l) {
              if (!loaded[l]) loaded[l] = [];

              if (q.loaded[l].length) {
                q.loaded[l].forEach(function (ns) {
                  if (loaded[l].indexOf(ns) < 0) loaded[l].push(ns);
                });
              }
            });
            q.done = true;

            if (q.errors.length) {
              q.callback(q.errors);
            } else {
              q.callback();
            }
          }
        });
        this.emit('loaded', loaded);
        this.queue = this.queue.filter(function (q) {
          return !q.done;
        });
      }
    }, {
      key: "read",
      value: function read(lng, ns, fcName) {
        var _this3 = this;

        var tried = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
        var wait = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 350;
        var callback = arguments.length > 5 ? arguments[5] : undefined;
        if (!lng.length) return callback(null, {});
        return this.backend[fcName](lng, ns, function (err, data) {
          if (err && data && tried < 5) {
            setTimeout(function () {
              _this3.read.call(_this3, lng, ns, fcName, tried + 1, wait * 2, callback);
            }, wait);
            return;
          }

          callback(err, data);
        });
      }
    }, {
      key: "prepareLoading",
      value: function prepareLoading(languages, namespaces) {
        var _this4 = this;

        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        var callback = arguments.length > 3 ? arguments[3] : undefined;

        if (!this.backend) {
          this.logger.warn('No backend was added via i18next.use. Will not load resources.');
          return callback && callback();
        }

        if (typeof languages === 'string') languages = this.languageUtils.toResolveHierarchy(languages);
        if (typeof namespaces === 'string') namespaces = [namespaces];
        var toLoad = this.queueLoad(languages, namespaces, options, callback);

        if (!toLoad.toLoad.length) {
          if (!toLoad.pending.length) callback();
          return null;
        }

        toLoad.toLoad.forEach(function (name) {
          _this4.loadOne(name);
        });
      }
    }, {
      key: "load",
      value: function load(languages, namespaces, callback) {
        this.prepareLoading(languages, namespaces, {}, callback);
      }
    }, {
      key: "reload",
      value: function reload(languages, namespaces, callback) {
        this.prepareLoading(languages, namespaces, {
          reload: true
        }, callback);
      }
    }, {
      key: "loadOne",
      value: function loadOne(name) {
        var _this5 = this;

        var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
        var s = name.split('|');
        var lng = s[0];
        var ns = s[1];
        this.read(lng, ns, 'read', undefined, undefined, function (err, data) {
          if (err) _this5.logger.warn("".concat(prefix, "loading namespace ").concat(ns, " for language ").concat(lng, " failed"), err);
          if (!err && data) _this5.logger.log("".concat(prefix, "loaded namespace ").concat(ns, " for language ").concat(lng), data);

          _this5.loaded(name, err, data);
        });
      }
    }, {
      key: "saveMissing",
      value: function saveMissing(languages, namespace, key, fallbackValue, isUpdate) {
        var options = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};

        if (this.services.utils && this.services.utils.hasLoadedNamespace && !this.services.utils.hasLoadedNamespace(namespace)) {
          this.logger.warn("did not save key \"".concat(key, "\" as the namespace \"").concat(namespace, "\" was not yet loaded"), 'This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!');
          return;
        }

        if (key === undefined || key === null || key === '') return;

        if (this.backend && this.backend.create) {
          this.backend.create(languages, namespace, key, fallbackValue, null, _objectSpread({}, options, {
            isUpdate: isUpdate
          }));
        }

        if (!languages || !languages[0]) return;
        this.store.addResource(languages[0], namespace, key, fallbackValue);
      }
    }]);

    return Connector;
  }(EventEmitter);

  function get() {
    return {
      debug: false,
      initImmediate: true,
      ns: ['translation'],
      defaultNS: ['translation'],
      fallbackLng: ['dev'],
      fallbackNS: false,
      whitelist: false,
      nonExplicitWhitelist: false,
      supportedLngs: false,
      nonExplicitSupportedLngs: false,
      load: 'all',
      preload: false,
      simplifyPluralSuffix: true,
      keySeparator: '.',
      nsSeparator: ':',
      pluralSeparator: '_',
      contextSeparator: '_',
      partialBundledLanguages: false,
      saveMissing: false,
      updateMissing: false,
      saveMissingTo: 'fallback',
      saveMissingPlurals: true,
      missingKeyHandler: false,
      missingInterpolationHandler: false,
      postProcess: false,
      postProcessPassResolved: false,
      returnNull: true,
      returnEmptyString: true,
      returnObjects: false,
      joinArrays: false,
      returnedObjectHandler: false,
      parseMissingKeyHandler: false,
      appendNamespaceToMissingKey: false,
      appendNamespaceToCIMode: false,
      overloadTranslationOptionHandler: function handle(args) {
        var ret = {};
        if (_typeof(args[1]) === 'object') ret = args[1];
        if (typeof args[1] === 'string') ret.defaultValue = args[1];
        if (typeof args[2] === 'string') ret.tDescription = args[2];

        if (_typeof(args[2]) === 'object' || _typeof(args[3]) === 'object') {
          var options = args[3] || args[2];
          Object.keys(options).forEach(function (key) {
            ret[key] = options[key];
          });
        }

        return ret;
      },
      interpolation: {
        escapeValue: true,
        format: function format(value, _format, lng, options) {
          return value;
        },
        prefix: '{{',
        suffix: '}}',
        formatSeparator: ',',
        unescapePrefix: '-',
        nestingPrefix: '$t(',
        nestingSuffix: ')',
        nestingOptionsSeparator: ',',
        maxReplaces: 1000,
        skipOnVariables: false
      }
    };
  }

  function transformOptions(options) {
    if (typeof options.ns === 'string') options.ns = [options.ns];
    if (typeof options.fallbackLng === 'string') options.fallbackLng = [options.fallbackLng];
    if (typeof options.fallbackNS === 'string') options.fallbackNS = [options.fallbackNS];

    if (options.whitelist) {
      if (options.whitelist && options.whitelist.indexOf('cimode') < 0) {
        options.whitelist = options.whitelist.concat(['cimode']);
      }

      options.supportedLngs = options.whitelist;
    }

    if (options.nonExplicitWhitelist) {
      options.nonExplicitSupportedLngs = options.nonExplicitWhitelist;
    }

    if (options.supportedLngs && options.supportedLngs.indexOf('cimode') < 0) {
      options.supportedLngs = options.supportedLngs.concat(['cimode']);
    }

    return options;
  }

  function noop() {}

  var I18n = function (_EventEmitter) {
    _inherits(I18n, _EventEmitter);

    function I18n() {
      var _this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var callback = arguments.length > 1 ? arguments[1] : undefined;

      _classCallCheck(this, I18n);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(I18n).call(this));

      if (isIE10) {
        EventEmitter.call(_assertThisInitialized(_this));
      }

      _this.options = transformOptions(options);
      _this.services = {};
      _this.logger = baseLogger;
      _this.modules = {
        external: []
      };

      if (callback && !_this.isInitialized && !options.isClone) {
        if (!_this.options.initImmediate) {
          _this.init(options, callback);

          return _possibleConstructorReturn(_this, _assertThisInitialized(_this));
        }

        setTimeout(function () {
          _this.init(options, callback);
        }, 0);
      }

      return _this;
    }

    _createClass(I18n, [{
      key: "init",
      value: function init() {
        var _this2 = this;

        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var callback = arguments.length > 1 ? arguments[1] : undefined;

        if (typeof options === 'function') {
          callback = options;
          options = {};
        }

        if (options.whitelist && !options.supportedLngs) {
          this.logger.deprecate('whitelist', 'option "whitelist" will be renamed to "supportedLngs" in the next major - please make sure to rename this option asap.');
        }

        if (options.nonExplicitWhitelist && !options.nonExplicitSupportedLngs) {
          this.logger.deprecate('whitelist', 'options "nonExplicitWhitelist" will be renamed to "nonExplicitSupportedLngs" in the next major - please make sure to rename this option asap.');
        }

        this.options = _objectSpread({}, get(), this.options, transformOptions(options));
        this.format = this.options.interpolation.format;
        if (!callback) callback = noop;

        function createClassOnDemand(ClassOrObject) {
          if (!ClassOrObject) return null;
          if (typeof ClassOrObject === 'function') return new ClassOrObject();
          return ClassOrObject;
        }

        if (!this.options.isClone) {
          if (this.modules.logger) {
            baseLogger.init(createClassOnDemand(this.modules.logger), this.options);
          } else {
            baseLogger.init(null, this.options);
          }

          var lu = new LanguageUtil(this.options);
          this.store = new ResourceStore(this.options.resources, this.options);
          var s = this.services;
          s.logger = baseLogger;
          s.resourceStore = this.store;
          s.languageUtils = lu;
          s.pluralResolver = new PluralResolver(lu, {
            prepend: this.options.pluralSeparator,
            compatibilityJSON: this.options.compatibilityJSON,
            simplifyPluralSuffix: this.options.simplifyPluralSuffix
          });
          s.interpolator = new Interpolator(this.options);
          s.utils = {
            hasLoadedNamespace: this.hasLoadedNamespace.bind(this)
          };
          s.backendConnector = new Connector(createClassOnDemand(this.modules.backend), s.resourceStore, s, this.options);
          s.backendConnector.on('*', function (event) {
            for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
              args[_key - 1] = arguments[_key];
            }

            _this2.emit.apply(_this2, [event].concat(args));
          });

          if (this.modules.languageDetector) {
            s.languageDetector = createClassOnDemand(this.modules.languageDetector);
            s.languageDetector.init(s, this.options.detection, this.options);
          }

          if (this.modules.i18nFormat) {
            s.i18nFormat = createClassOnDemand(this.modules.i18nFormat);
            if (s.i18nFormat.init) s.i18nFormat.init(this);
          }

          this.translator = new Translator(this.services, this.options);
          this.translator.on('*', function (event) {
            for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
              args[_key2 - 1] = arguments[_key2];
            }

            _this2.emit.apply(_this2, [event].concat(args));
          });
          this.modules.external.forEach(function (m) {
            if (m.init) m.init(_this2);
          });
        }

        if (!this.modules.languageDetector && !this.options.lng) {
          this.logger.warn('init: no languageDetector is used and no lng is defined');
        }

        var storeApi = ['getResource', 'addResource', 'addResources', 'addResourceBundle', 'removeResourceBundle', 'hasResourceBundle', 'getResourceBundle', 'getDataByLanguage'];
        storeApi.forEach(function (fcName) {
          _this2[fcName] = function () {
            var _this2$store;

            return (_this2$store = _this2.store)[fcName].apply(_this2$store, arguments);
          };
        });
        var deferred = defer();

        var load = function load() {
          _this2.changeLanguage(_this2.options.lng, function (err, t) {
            _this2.isInitialized = true;

            _this2.logger.log('initialized', _this2.options);

            _this2.emit('initialized', _this2.options);

            deferred.resolve(t);
            callback(err, t);
          });
        };

        if (this.options.resources || !this.options.initImmediate) {
          load();
        } else {
          setTimeout(load, 0);
        }

        return deferred;
      }
    }, {
      key: "loadResources",
      value: function loadResources(language) {
        var _this3 = this;

        var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
        var usedCallback = callback;
        var usedLng = typeof language === 'string' ? language : this.language;
        if (typeof language === 'function') usedCallback = language;

        if (!this.options.resources || this.options.partialBundledLanguages) {
          if (usedLng && usedLng.toLowerCase() === 'cimode') return usedCallback();
          var toLoad = [];

          var append = function append(lng) {
            if (!lng) return;

            var lngs = _this3.services.languageUtils.toResolveHierarchy(lng);

            lngs.forEach(function (l) {
              if (toLoad.indexOf(l) < 0) toLoad.push(l);
            });
          };

          if (!usedLng) {
            var fallbacks = this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);
            fallbacks.forEach(function (l) {
              return append(l);
            });
          } else {
            append(usedLng);
          }

          if (this.options.preload) {
            this.options.preload.forEach(function (l) {
              return append(l);
            });
          }

          this.services.backendConnector.load(toLoad, this.options.ns, usedCallback);
        } else {
          usedCallback(null);
        }
      }
    }, {
      key: "reloadResources",
      value: function reloadResources(lngs, ns, callback) {
        var deferred = defer();
        if (!lngs) lngs = this.languages;
        if (!ns) ns = this.options.ns;
        if (!callback) callback = noop;
        this.services.backendConnector.reload(lngs, ns, function (err) {
          deferred.resolve();
          callback(err);
        });
        return deferred;
      }
    }, {
      key: "use",
      value: function use(module) {
        if (!module) throw new Error('You are passing an undefined module! Please check the object you are passing to i18next.use()');
        if (!module.type) throw new Error('You are passing a wrong module! Please check the object you are passing to i18next.use()');

        if (module.type === 'backend') {
          this.modules.backend = module;
        }

        if (module.type === 'logger' || module.log && module.warn && module.error) {
          this.modules.logger = module;
        }

        if (module.type === 'languageDetector') {
          this.modules.languageDetector = module;
        }

        if (module.type === 'i18nFormat') {
          this.modules.i18nFormat = module;
        }

        if (module.type === 'postProcessor') {
          postProcessor.addPostProcessor(module);
        }

        if (module.type === '3rdParty') {
          this.modules.external.push(module);
        }

        return this;
      }
    }, {
      key: "changeLanguage",
      value: function changeLanguage(lng, callback) {
        var _this4 = this;

        this.isLanguageChangingTo = lng;
        var deferred = defer();
        this.emit('languageChanging', lng);

        var done = function done(err, l) {
          if (l) {
            _this4.language = l;
            _this4.languages = _this4.services.languageUtils.toResolveHierarchy(l);

            _this4.translator.changeLanguage(l);

            _this4.isLanguageChangingTo = undefined;

            _this4.emit('languageChanged', l);

            _this4.logger.log('languageChanged', l);
          } else {
            _this4.isLanguageChangingTo = undefined;
          }

          deferred.resolve(function () {
            return _this4.t.apply(_this4, arguments);
          });
          if (callback) callback(err, function () {
            return _this4.t.apply(_this4, arguments);
          });
        };

        var setLng = function setLng(lngs) {
          var l = typeof lngs === 'string' ? lngs : _this4.services.languageUtils.getBestMatchFromCodes(lngs);

          if (l) {
            if (!_this4.language) {
              _this4.language = l;
              _this4.languages = _this4.services.languageUtils.toResolveHierarchy(l);
            }

            if (!_this4.translator.language) _this4.translator.changeLanguage(l);
            if (_this4.services.languageDetector) _this4.services.languageDetector.cacheUserLanguage(l);
          }

          _this4.loadResources(l, function (err) {
            done(err, l);
          });
        };

        if (!lng && this.services.languageDetector && !this.services.languageDetector.async) {
          setLng(this.services.languageDetector.detect());
        } else if (!lng && this.services.languageDetector && this.services.languageDetector.async) {
          this.services.languageDetector.detect(setLng);
        } else {
          setLng(lng);
        }

        return deferred;
      }
    }, {
      key: "getFixedT",
      value: function getFixedT(lng, ns) {
        var _this5 = this;

        var fixedT = function fixedT(key, opts) {
          var options;

          if (_typeof(opts) !== 'object') {
            for (var _len3 = arguments.length, rest = new Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
              rest[_key3 - 2] = arguments[_key3];
            }

            options = _this5.options.overloadTranslationOptionHandler([key, opts].concat(rest));
          } else {
            options = _objectSpread({}, opts);
          }

          options.lng = options.lng || fixedT.lng;
          options.lngs = options.lngs || fixedT.lngs;
          options.ns = options.ns || fixedT.ns;
          return _this5.t(key, options);
        };

        if (typeof lng === 'string') {
          fixedT.lng = lng;
        } else {
          fixedT.lngs = lng;
        }

        fixedT.ns = ns;
        return fixedT;
      }
    }, {
      key: "t",
      value: function t() {
        var _this$translator;

        return this.translator && (_this$translator = this.translator).translate.apply(_this$translator, arguments);
      }
    }, {
      key: "exists",
      value: function exists() {
        var _this$translator2;

        return this.translator && (_this$translator2 = this.translator).exists.apply(_this$translator2, arguments);
      }
    }, {
      key: "setDefaultNamespace",
      value: function setDefaultNamespace(ns) {
        this.options.defaultNS = ns;
      }
    }, {
      key: "hasLoadedNamespace",
      value: function hasLoadedNamespace(ns) {
        var _this6 = this;

        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        if (!this.isInitialized) {
          this.logger.warn('hasLoadedNamespace: i18next was not initialized', this.languages);
          return false;
        }

        if (!this.languages || !this.languages.length) {
          this.logger.warn('hasLoadedNamespace: i18n.languages were undefined or empty', this.languages);
          return false;
        }

        var lng = this.languages[0];
        var fallbackLng = this.options ? this.options.fallbackLng : false;
        var lastLng = this.languages[this.languages.length - 1];
        if (lng.toLowerCase() === 'cimode') return true;

        var loadNotPending = function loadNotPending(l, n) {
          var loadState = _this6.services.backendConnector.state["".concat(l, "|").concat(n)];

          return loadState === -1 || loadState === 2;
        };

        if (options.precheck) {
          var preResult = options.precheck(this, loadNotPending);
          if (preResult !== undefined) return preResult;
        }

        if (this.hasResourceBundle(lng, ns)) return true;
        if (!this.services.backendConnector.backend) return true;
        if (loadNotPending(lng, ns) && (!fallbackLng || loadNotPending(lastLng, ns))) return true;
        return false;
      }
    }, {
      key: "loadNamespaces",
      value: function loadNamespaces(ns, callback) {
        var _this7 = this;

        var deferred = defer();

        if (!this.options.ns) {
          callback && callback();
          return Promise.resolve();
        }

        if (typeof ns === 'string') ns = [ns];
        ns.forEach(function (n) {
          if (_this7.options.ns.indexOf(n) < 0) _this7.options.ns.push(n);
        });
        this.loadResources(function (err) {
          deferred.resolve();
          if (callback) callback(err);
        });
        return deferred;
      }
    }, {
      key: "loadLanguages",
      value: function loadLanguages(lngs, callback) {
        var deferred = defer();
        if (typeof lngs === 'string') lngs = [lngs];
        var preloaded = this.options.preload || [];
        var newLngs = lngs.filter(function (lng) {
          return preloaded.indexOf(lng) < 0;
        });

        if (!newLngs.length) {
          if (callback) callback();
          return Promise.resolve();
        }

        this.options.preload = preloaded.concat(newLngs);
        this.loadResources(function (err) {
          deferred.resolve();
          if (callback) callback(err);
        });
        return deferred;
      }
    }, {
      key: "dir",
      value: function dir(lng) {
        if (!lng) lng = this.languages && this.languages.length > 0 ? this.languages[0] : this.language;
        if (!lng) return 'rtl';
        var rtlLngs = ['ar', 'shu', 'sqr', 'ssh', 'xaa', 'yhd', 'yud', 'aao', 'abh', 'abv', 'acm', 'acq', 'acw', 'acx', 'acy', 'adf', 'ads', 'aeb', 'aec', 'afb', 'ajp', 'apc', 'apd', 'arb', 'arq', 'ars', 'ary', 'arz', 'auz', 'avl', 'ayh', 'ayl', 'ayn', 'ayp', 'bbz', 'pga', 'he', 'iw', 'ps', 'pbt', 'pbu', 'pst', 'prp', 'prd', 'ug', 'ur', 'ydd', 'yds', 'yih', 'ji', 'yi', 'hbo', 'men', 'xmn', 'fa', 'jpr', 'peo', 'pes', 'prs', 'dv', 'sam'];
        return rtlLngs.indexOf(this.services.languageUtils.getLanguagePartFromCode(lng)) >= 0 ? 'rtl' : 'ltr';
      }
    }, {
      key: "createInstance",
      value: function createInstance() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var callback = arguments.length > 1 ? arguments[1] : undefined;
        return new I18n(options, callback);
      }
    }, {
      key: "cloneInstance",
      value: function cloneInstance() {
        var _this8 = this;

        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;

        var mergedOptions = _objectSpread({}, this.options, options, {
          isClone: true
        });

        var clone = new I18n(mergedOptions);
        var membersToCopy = ['store', 'services', 'language'];
        membersToCopy.forEach(function (m) {
          clone[m] = _this8[m];
        });
        clone.services = _objectSpread({}, this.services);
        clone.services.utils = {
          hasLoadedNamespace: clone.hasLoadedNamespace.bind(clone)
        };
        clone.translator = new Translator(clone.services, clone.options);
        clone.translator.on('*', function (event) {
          for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
            args[_key4 - 1] = arguments[_key4];
          }

          clone.emit.apply(clone, [event].concat(args));
        });
        clone.init(mergedOptions, callback);
        clone.translator.options = clone.options;
        clone.translator.backendConnector.services.utils = {
          hasLoadedNamespace: clone.hasLoadedNamespace.bind(clone)
        };
        return clone;
      }
    }]);

    return I18n;
  }(EventEmitter);

  var i18next = new I18n();

  var arr = [];
  var each = arr.forEach;
  var slice = arr.slice;
  function defaults(obj) {
    each.call(slice.call(arguments, 1), function (source) {
      if (source) {
        for (var prop in source) {
          if (obj[prop] === undefined) obj[prop] = source[prop];
        }
      }
    });
    return obj;
  }

  var fetchApi;
  if (typeof fetch === 'function') {
    if (typeof global !== 'undefined' && global.fetch) {
      fetchApi = global.fetch;
    } else if (typeof window !== 'undefined' && window.fetch) {
      fetchApi = window.fetch;
    }
  }

  if (typeof require !== 'undefined' && (typeof window === 'undefined' || typeof window.document === 'undefined')) {
    var f = fetchApi || require('node-fetch');
    if (f.default) f = f.default;
    exports.default = f;
    module.exports = exports.default;
  }

  var fetchNode = /*#__PURE__*/Object.freeze({
    __proto__: null
  });

  function _typeof$1(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof$1 = function _typeof(obj) {
        return typeof obj;
      };
    } else {
      _typeof$1 = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof$1(obj);
  }
  var fetchApi$1;

  if (typeof fetch === 'function') {
    if (typeof global !== 'undefined' && global.fetch) {
      fetchApi$1 = global.fetch;
    } else if (typeof window !== 'undefined' && window.fetch) {
      fetchApi$1 = window.fetch;
    }
  }

  var XmlHttpRequestApi;

  if (typeof XMLHttpRequest === 'function') {
    if (typeof global !== 'undefined' && global.XMLHttpRequest) {
      XmlHttpRequestApi = global.XMLHttpRequest;
    } else if (typeof window !== 'undefined' && window.XMLHttpRequest) {
      XmlHttpRequestApi = window.XMLHttpRequest;
    }
  }

  var ActiveXObjectApi;

  if (typeof ActiveXObject === 'function') {
    if (typeof global !== 'undefined' && global.ActiveXObject) {
      ActiveXObjectApi = global.ActiveXObject;
    } else if (typeof window !== 'undefined' && window.ActiveXObject) {
      ActiveXObjectApi = window.ActiveXObject;
    }
  }

  if (!fetchApi$1 && fetchNode && !XmlHttpRequestApi && !ActiveXObjectApi) fetchApi$1 = undefined || fetchNode;
  if (typeof fetchApi$1 !== 'function') fetchApi$1 = undefined;

  var addQueryString = function addQueryString(url, params) {
    if (params && _typeof$1(params) === 'object') {
      var queryString = '';

      for (var paramName in params) {
        queryString += '&' + encodeURIComponent(paramName) + '=' + encodeURIComponent(params[paramName]);
      }

      if (!queryString) return url;
      url = url + (url.indexOf('?') !== -1 ? '&' : '?') + queryString.slice(1);
    }

    return url;
  };

  var requestWithFetch = function requestWithFetch(options, url, payload, callback) {
    if (options.queryStringParams) {
      url = addQueryString(url, options.queryStringParams);
    }

    var headers = defaults({}, options.customHeaders);
    if (payload) headers['Content-Type'] = 'application/json';
    fetchApi$1(url, defaults({
      method: payload ? 'POST' : 'GET',
      body: payload ? options.stringify(payload) : undefined,
      headers: headers
    }, typeof options.requestOptions === 'function' ? options.requestOptions(payload) : options.requestOptions)).then(function (response) {
      if (!response.ok) return callback(response.statusText || 'Error', {
        status: response.status
      });
      response.text().then(function (data) {
        callback(null, {
          status: response.status,
          data: data
        });
      }).catch(callback);
    }).catch(callback);
  };

  var requestWithXmlHttpRequest = function requestWithXmlHttpRequest(options, url, payload, callback) {
    if (payload && _typeof$1(payload) === 'object') {
      payload = addQueryString('', payload).slice(1);
    }

    if (options.queryStringParams) {
      url = addQueryString(url, options.queryStringParams);
    }

    try {
      var x;

      if (XmlHttpRequestApi) {
        x = new XmlHttpRequestApi();
      } else {
        x = new ActiveXObjectApi('MSXML2.XMLHTTP.3.0');
      }

      x.open(payload ? 'POST' : 'GET', url, 1);

      if (!options.crossDomain) {
        x.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      }

      x.withCredentials = !!options.withCredentials;

      if (payload) {
        x.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      }

      if (x.overrideMimeType) {
        x.overrideMimeType('application/json');
      }

      var h = options.customHeaders;
      h = typeof h === 'function' ? h() : h;

      if (h) {
        for (var i in h) {
          x.setRequestHeader(i, h[i]);
        }
      }

      x.onreadystatechange = function () {
        x.readyState > 3 && callback(x.status >= 400 ? x.statusText : null, {
          status: x.status,
          data: x.responseText
        });
      };

      x.send(payload);
    } catch (e) {
      console && console.log(e);
    }
  };

  var request = function request(options, url, payload, callback) {
    if (typeof payload === 'function') {
      callback = payload;
      payload = undefined;
    }

    callback = callback || function () {};

    if (fetchApi$1) {
      return requestWithFetch(options, url, payload, callback);
    }

    if (typeof XMLHttpRequest === 'function' || typeof ActiveXObject === 'function') {
      return requestWithXmlHttpRequest(options, url, payload, callback);
    }
  };

  function _classCallCheck$1(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties$1(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass$1(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties$1(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties$1(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty$2(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  var getDefaults = function getDefaults() {
    return {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
      addPath: '/locales/add/{{lng}}/{{ns}}',
      allowMultiLoading: false,
      parse: function parse(data) {
        return JSON.parse(data);
      },
      stringify: JSON.stringify,
      parsePayload: function parsePayload(namespace, key, fallbackValue) {
        return _defineProperty$2({}, key, fallbackValue || '');
      },
      request: request,
      reloadInterval: false,
      customHeaders: {},
      queryStringParams: {},
      crossDomain: false,
      withCredentials: false,
      overrideMimeType: false,
      requestOptions: {
        mode: 'cors',
        credentials: 'same-origin',
        cache: 'default'
      }
    };
  };

  var Backend = function () {
    function Backend(services) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var allOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      _classCallCheck$1(this, Backend);

      this.services = services;
      this.options = options;
      this.allOptions = allOptions;
      this.type = 'backend';
      this.init(services, options, allOptions);
    }

    _createClass$1(Backend, [{
      key: "init",
      value: function init(services) {
        var _this = this;

        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var allOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        this.services = services;
        this.options = defaults(options, this.options || {}, getDefaults());
        this.allOptions = allOptions;

        if (this.options.reloadInterval) {
          setInterval(function () {
            return _this.reload();
          }, this.options.reloadInterval);
        }
      }
    }, {
      key: "readMulti",
      value: function readMulti(languages, namespaces, callback) {
        var loadPath = this.options.loadPath;

        if (typeof this.options.loadPath === 'function') {
          loadPath = this.options.loadPath(languages, namespaces);
        }

        var url = this.services.interpolator.interpolate(loadPath, {
          lng: languages.join('+'),
          ns: namespaces.join('+')
        });
        this.loadUrl(url, callback, languages, namespaces);
      }
    }, {
      key: "read",
      value: function read(language, namespace, callback) {
        var loadPath = this.options.loadPath;

        if (typeof this.options.loadPath === 'function') {
          loadPath = this.options.loadPath([language], [namespace]);
        }

        var url = this.services.interpolator.interpolate(loadPath, {
          lng: language,
          ns: namespace
        });
        this.loadUrl(url, callback, language, namespace);
      }
    }, {
      key: "loadUrl",
      value: function loadUrl(url, callback, languages, namespaces) {
        var _this2 = this;

        this.options.request(this.options, url, undefined, function (err, res) {
          if (res && (res.status >= 500 && res.status < 600 || !res.status)) return callback('failed loading ' + url, true);
          if (res && res.status >= 400 && res.status < 500) return callback('failed loading ' + url, false);
          if (!res && err && err.message && err.message.indexOf('Failed to fetch') > -1) return callback('failed loading ' + url, true);
          if (err) return callback(err, false);
          var ret, parseErr;

          try {
            if (typeof res.data === 'string') {
              ret = _this2.options.parse(res.data, languages, namespaces);
            } else {
              ret = res.data;
            }
          } catch (e) {
            parseErr = 'failed parsing ' + url + ' to json';
          }

          if (parseErr) return callback(parseErr, false);
          callback(null, ret);
        });
      }
    }, {
      key: "create",
      value: function create(languages, namespace, key, fallbackValue) {
        var _this3 = this;

        if (!this.options.addPath) return;
        if (typeof languages === 'string') languages = [languages];
        var payload = this.options.parsePayload(namespace, key, fallbackValue);
        languages.forEach(function (lng) {
          var url = _this3.services.interpolator.interpolate(_this3.options.addPath, {
            lng: lng,
            ns: namespace
          });

          _this3.options.request(_this3.options, url, payload, function (data, res) {});
        });
      }
    }, {
      key: "reload",
      value: function reload() {
        var _this4 = this;

        var _this$services = this.services,
            backendConnector = _this$services.backendConnector,
            languageUtils = _this$services.languageUtils,
            logger = _this$services.logger;
        var currentLanguage = backendConnector.language;
        if (currentLanguage && currentLanguage.toLowerCase() === 'cimode') return;
        var toLoad = [];

        var append = function append(lng) {
          var lngs = languageUtils.toResolveHierarchy(lng);
          lngs.forEach(function (l) {
            if (toLoad.indexOf(l) < 0) toLoad.push(l);
          });
        };

        append(currentLanguage);
        if (this.allOptions.preload) this.allOptions.preload.forEach(function (l) {
          return append(l);
        });
        toLoad.forEach(function (lng) {
          _this4.allOptions.ns.forEach(function (ns) {
            backendConnector.read(lng, ns, 'read', null, null, function (err, data) {
              if (err) logger.warn("loading namespace ".concat(ns, " for language ").concat(lng, " failed"), err);
              if (!err && data) logger.log("loaded namespace ".concat(ns, " for language ").concat(lng), data);
              backendConnector.loaded("".concat(lng, "|").concat(ns), err, data);
            });
          });
        });
      }
    }]);

    return Backend;
  }();

  Backend.type = 'backend';

  var arr$1 = [];
  var each$1 = arr$1.forEach;
  var slice$1 = arr$1.slice;

  function defaults$1(obj) {
    each$1.call(slice$1.call(arguments, 1), function (source) {
      if (source) {
        for (var prop in source) {
          if (obj[prop] === undefined) obj[prop] = source[prop];
        }
      }
    });
    return obj;
  } // eslint-disable-next-line no-control-regex


  var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;

  var serializeCookie = function serializeCookie(name, val, options) {
    var opt = options || {};
    opt.path = opt.path || '/';
    var value = encodeURIComponent(val);
    var str = name + '=' + value;

    if (opt.maxAge > 0) {
      var maxAge = opt.maxAge - 0;
      if (isNaN(maxAge)) throw new Error('maxAge should be a Number');
      str += '; Max-Age=' + Math.floor(maxAge);
    }

    if (opt.domain) {
      if (!fieldContentRegExp.test(opt.domain)) {
        throw new TypeError('option domain is invalid');
      }

      str += '; Domain=' + opt.domain;
    }

    if (opt.path) {
      if (!fieldContentRegExp.test(opt.path)) {
        throw new TypeError('option path is invalid');
      }

      str += '; Path=' + opt.path;
    }

    if (opt.expires) {
      if (typeof opt.expires.toUTCString !== 'function') {
        throw new TypeError('option expires is invalid');
      }

      str += '; Expires=' + opt.expires.toUTCString();
    }

    if (opt.httpOnly) str += '; HttpOnly';
    if (opt.secure) str += '; Secure';

    if (opt.sameSite) {
      var sameSite = typeof opt.sameSite === 'string' ? opt.sameSite.toLowerCase() : opt.sameSite;

      switch (sameSite) {
        case true:
          str += '; SameSite=Strict';
          break;

        case 'lax':
          str += '; SameSite=Lax';
          break;

        case 'strict':
          str += '; SameSite=Strict';
          break;

        case 'none':
          str += '; SameSite=None';
          break;

        default:
          throw new TypeError('option sameSite is invalid');
      }
    }

    return str;
  };

  var cookie = {
    create: function create(name, value, minutes, domain) {
      var cookieOptions = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {
        path: '/',
        sameSite: 'strict'
      };

      if (minutes) {
        cookieOptions.expires = new Date();
        cookieOptions.expires.setTime(cookieOptions.expires.getTime() + minutes * 60 * 1000);
      }

      if (domain) cookieOptions.domain = domain;
      document.cookie = serializeCookie(name, encodeURIComponent(value), cookieOptions);
    },
    read: function read(name) {
      var nameEQ = name + '=';
      var ca = document.cookie.split(';');

      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];

        while (c.charAt(0) === ' ') {
          c = c.substring(1, c.length);
        }

        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
      }

      return null;
    },
    remove: function remove(name) {
      this.create(name, '', -1);
    }
  };
  var cookie$1 = {
    name: 'cookie',
    lookup: function lookup(options) {
      var found;

      if (options.lookupCookie && typeof document !== 'undefined') {
        var c = cookie.read(options.lookupCookie);
        if (c) found = c;
      }

      return found;
    },
    cacheUserLanguage: function cacheUserLanguage(lng, options) {
      if (options.lookupCookie && typeof document !== 'undefined') {
        cookie.create(options.lookupCookie, lng, options.cookieMinutes, options.cookieDomain, options.cookieOptions);
      }
    }
  };
  var querystring = {
    name: 'querystring',
    lookup: function lookup(options) {
      var found;

      if (typeof window !== 'undefined') {
        var query = window.location.search.substring(1);
        var params = query.split('&');

        for (var i = 0; i < params.length; i++) {
          var pos = params[i].indexOf('=');

          if (pos > 0) {
            var key = params[i].substring(0, pos);

            if (key === options.lookupQuerystring) {
              found = params[i].substring(pos + 1);
            }
          }
        }
      }

      return found;
    }
  };
  var hasLocalStorageSupport;

  try {
    hasLocalStorageSupport = window !== 'undefined' && window.localStorage !== null;
    var testKey = 'i18next.translate.boo';
    window.localStorage.setItem(testKey, 'foo');
    window.localStorage.removeItem(testKey);
  } catch (e) {
    hasLocalStorageSupport = false;
  }

  var localStorage = {
    name: 'localStorage',
    lookup: function lookup(options) {
      var found;

      if (options.lookupLocalStorage && hasLocalStorageSupport) {
        var lng = window.localStorage.getItem(options.lookupLocalStorage);
        if (lng) found = lng;
      }

      return found;
    },
    cacheUserLanguage: function cacheUserLanguage(lng, options) {
      if (options.lookupLocalStorage && hasLocalStorageSupport) {
        window.localStorage.setItem(options.lookupLocalStorage, lng);
      }
    }
  };
  var hasSessionStorageSupport;

  try {
    hasSessionStorageSupport = window !== 'undefined' && window.sessionStorage !== null;
    var testKey$1 = 'i18next.translate.boo';
    window.sessionStorage.setItem(testKey$1, 'foo');
    window.sessionStorage.removeItem(testKey$1);
  } catch (e) {
    hasSessionStorageSupport = false;
  }

  var sessionStorage = {
    name: 'sessionStorage',
    lookup: function lookup(options) {
      var found;

      if (options.lookupSessionStorage && hasSessionStorageSupport) {
        var lng = window.sessionStorage.getItem(options.lookupSessionStorage);
        if (lng) found = lng;
      }

      return found;
    },
    cacheUserLanguage: function cacheUserLanguage(lng, options) {
      if (options.lookupSessionStorage && hasSessionStorageSupport) {
        window.sessionStorage.setItem(options.lookupSessionStorage, lng);
      }
    }
  };
  var navigator$1 = {
    name: 'navigator',
    lookup: function lookup(options) {
      var found = [];

      if (typeof navigator !== 'undefined') {
        if (navigator.languages) {
          // chrome only; not an array, so can't use .push.apply instead of iterating
          for (var i = 0; i < navigator.languages.length; i++) {
            found.push(navigator.languages[i]);
          }
        }

        if (navigator.userLanguage) {
          found.push(navigator.userLanguage);
        }

        if (navigator.language) {
          found.push(navigator.language);
        }
      }

      return found.length > 0 ? found : undefined;
    }
  };
  var htmlTag = {
    name: 'htmlTag',
    lookup: function lookup(options) {
      var found;
      var htmlTag = options.htmlTag || (typeof document !== 'undefined' ? document.documentElement : null);

      if (htmlTag && typeof htmlTag.getAttribute === 'function') {
        found = htmlTag.getAttribute('lang');
      }

      return found;
    }
  };
  var path = {
    name: 'path',
    lookup: function lookup(options) {
      var found;

      if (typeof window !== 'undefined') {
        var language = window.location.pathname.match(/\/([a-zA-Z-]*)/g);

        if (language instanceof Array) {
          if (typeof options.lookupFromPathIndex === 'number') {
            if (typeof language[options.lookupFromPathIndex] !== 'string') {
              return undefined;
            }

            found = language[options.lookupFromPathIndex].replace('/', '');
          } else {
            found = language[0].replace('/', '');
          }
        }
      }

      return found;
    }
  };
  var subdomain = {
    name: 'subdomain',
    lookup: function lookup(options) {
      var found;

      if (typeof window !== 'undefined') {
        var language = window.location.href.match(/(?:http[s]*\:\/\/)*(.*?)\.(?=[^\/]*\..{2,5})/gi);

        if (language instanceof Array) {
          if (typeof options.lookupFromSubdomainIndex === 'number') {
            found = language[options.lookupFromSubdomainIndex].replace('http://', '').replace('https://', '').replace('.', '');
          } else {
            found = language[0].replace('http://', '').replace('https://', '').replace('.', '');
          }
        }
      }

      return found;
    }
  };

  function getDefaults$1() {
    return {
      order: ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag'],
      lookupQuerystring: 'lng',
      lookupCookie: 'i18next',
      lookupLocalStorage: 'i18nextLng',
      lookupSessionStorage: 'i18nextLng',
      // cache user language
      caches: ['localStorage'],
      excludeCacheFor: ['cimode'] //cookieMinutes: 10,
      //cookieDomain: 'myDomain'

    };
  }

  var Browser = /*#__PURE__*/function () {
    function Browser(services) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, Browser);

      this.type = 'languageDetector';
      this.detectors = {};
      this.init(services, options);
    }

    _createClass(Browser, [{
      key: "init",
      value: function init(services) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var i18nOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        this.services = services;
        this.options = defaults$1(options, this.options || {}, getDefaults$1()); // backwards compatibility

        if (this.options.lookupFromUrlIndex) this.options.lookupFromPathIndex = this.options.lookupFromUrlIndex;
        this.i18nOptions = i18nOptions;
        this.addDetector(cookie$1);
        this.addDetector(querystring);
        this.addDetector(localStorage);
        this.addDetector(sessionStorage);
        this.addDetector(navigator$1);
        this.addDetector(htmlTag);
        this.addDetector(path);
        this.addDetector(subdomain);
      }
    }, {
      key: "addDetector",
      value: function addDetector(detector) {
        this.detectors[detector.name] = detector;
      }
    }, {
      key: "detect",
      value: function detect(detectionOrder) {
        var _this = this;

        if (!detectionOrder) detectionOrder = this.options.order;
        var detected = [];
        detectionOrder.forEach(function (detectorName) {
          if (_this.detectors[detectorName]) {
            var lookup = _this.detectors[detectorName].lookup(_this.options);

            if (lookup && typeof lookup === 'string') lookup = [lookup];
            if (lookup) detected = detected.concat(lookup);
          }
        });
        if (this.services.languageUtils.getBestMatchFromCodes) return detected; // new i18next v19.5.0

        return detected.length > 0 ? detected[0] : null; // a little backward compatibility
      }
    }, {
      key: "cacheUserLanguage",
      value: function cacheUserLanguage(lng, caches) {
        var _this2 = this;

        if (!caches) caches = this.options.caches;
        if (!caches) return;
        if (this.options.excludeCacheFor && this.options.excludeCacheFor.indexOf(lng) > -1) return;
        caches.forEach(function (cacheName) {
          if (_this2.detectors[cacheName]) _this2.detectors[cacheName].cacheUserLanguage(lng, _this2.options);
        });
      }
    }]);

    return Browser;
  }();

  Browser.type = 'languageDetector';

  class EventEmitter$1 {
    constructor() {
      this.observers = {};
    }

    on(events, listener) {
      events.split(' ').forEach(event => {
        this.observers[event] = this.observers[event] || [];
        this.observers[event].push(listener);
      });
      return this;
    }

    off(event, listener) {
      if (!this.observers[event]) return;

      if (!listener) {
        delete this.observers[event];
        return;
      }

      this.observers[event] = this.observers[event].filter(l => l !== listener);
    }

    emit(event) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      if (this.observers[event]) {
        var cloned = [].concat(this.observers[event]);
        cloned.forEach(observer => {
          observer(...args);
        });
      }

      if (this.observers['*']) {
        var _cloned = [].concat(this.observers['*']);

        _cloned.forEach(observer => {
          observer.apply(observer, [event, ...args]);
        });
      }
    }

  }

  class Observer extends EventEmitter$1 {
    constructor(ele) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      super();
      this.ele = ele;
      this.options = options;
      this.observer = this.create();
      this.internalChange = true;
    }

    create() {
      var lastToggleTimeout;

      var toggleInternal = () => {
        if (lastToggleTimeout) window.clearTimeout(lastToggleTimeout);
        lastToggleTimeout = setTimeout(() => {
          if (this.internalChange) this.internalChange = false;
        }, 200);
      };

      var observer = new MutationObserver(mutations => {
        // For the sake of...observation...let's output the mutation to console to see how this all works
        // mutations.forEach(function(mutation) {
        // 	console.log(mutation.type);
        // });
        if (this.internalChange) toggleInternal();
        if (!this.internalChange) this.emit('changed', mutations);
      }); // Notify me of everything!

      var observerConfig = {
        attributes: true,
        childList: true,
        characterData: true,
        subtree: true
      }; // Node, config
      // In this case we'll listen to all changes to body and child nodes

      observer.observe(this.ele, observerConfig);
      return observer;
    }

    reset() {
      this.internalChange = true;
    }

  }

  // https://github.com/jfriend00/docReady
  // (function(funcName, baseObj) {
  //     "use strict";
  //     // The public function name defaults to window.docReady
  //     // but you can modify the last line of this function to pass in a different object or method name
  //     // if you want to put them in a different namespace and those will be used instead of
  //     // window.docReady(...)
  //     funcName = funcName || "docReady";
  //     baseObj = baseObj || window;
  var readyList = [];
  var readyFired = false;
  var readyEventHandlersInstalled = false; // call this when the document is ready
  // this function protects itself against being called more than once

  function ready() {
    if (!readyFired) {
      // this must be set to true before we start calling callbacks
      readyFired = true;

      for (var i = 0; i < readyList.length; i++) {
        // if a callback here happens to add new ready handlers,
        // the docReady() function will see that it already fired
        // and will schedule the callback to run right after
        // this event loop finishes so all handlers will still execute
        // in order and no new ones will be added to the readyList
        // while we are processing the list
        readyList[i].fn.call(window, readyList[i].ctx);
      } // allow any closures held by these functions to free


      readyList = [];
    }
  }

  function readyStateChange() {
    if (document.readyState === "complete") {
      ready();
    }
  } // This is the one public interface
  // docReady(fn, context);
  // the context argument is optional - if present, it will be passed
  // as an argument to the callback
  // baseObj[funcName] = function(callback, context) {


  function docReady (callback, context) {
    // if ready has already fired, then just schedule the callback
    // to fire asynchronously, but right away
    if (readyFired) {
      setTimeout(function () {
        callback(context);
      }, 1);
      return;
    } else {
      // add the function and context to the list
      readyList.push({
        fn: callback,
        ctx: context
      });
    } // if document already ready to go, schedule the ready function to run
    // IE only safe when readyState is "complete", others safe when readyState is "interactive"


    if (document.readyState === "complete" || !document.attachEvent && document.readyState === "interactive") {
      setTimeout(ready, 1);
    } else if (!readyEventHandlersInstalled) {
      // otherwise if we don't have event handlers installed, install them
      if (document.addEventListener) {
        // first choice is DOMContentLoaded event
        document.addEventListener("DOMContentLoaded", ready, false); // backup is window load event

        window.addEventListener("load", ready, false);
      } else {
        // must be IE
        document.attachEvent("onreadystatechange", readyStateChange);
        window.attachEvent("onload", ready);
      }

      readyEventHandlersInstalled = true;
    }
  } // })("docReady", window);
  // modify this previous line to pass in your own method name
  // and object for the method to be attached to

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var version = "2";

  var isVnode = isVirtualNode;

  function isVirtualNode(x) {
    return x && x.type === "VirtualNode" && x.version === version;
  }

  var isWidget_1 = isWidget;

  function isWidget(w) {
    return w && w.type === "Widget";
  }

  var isThunk_1 = isThunk;

  function isThunk(t) {
    return t && t.type === "Thunk";
  }

  var isVhook = isHook;

  function isHook(hook) {
    return hook && (typeof hook.hook === "function" && !hook.hasOwnProperty("hook") || typeof hook.unhook === "function" && !hook.hasOwnProperty("unhook"));
  }

  var vnode = VirtualNode;
  var noProperties = {};
  var noChildren = [];

  function VirtualNode(tagName, properties, children, key, namespace) {
    this.tagName = tagName;
    this.properties = properties || noProperties;
    this.children = children || noChildren;
    this.key = key != null ? String(key) : undefined;
    this.namespace = typeof namespace === "string" ? namespace : null;
    var count = children && children.length || 0;
    var descendants = 0;
    var hasWidgets = false;
    var hasThunks = false;
    var descendantHooks = false;
    var hooks;

    for (var propName in properties) {
      if (properties.hasOwnProperty(propName)) {
        var property = properties[propName];

        if (isVhook(property) && property.unhook) {
          if (!hooks) {
            hooks = {};
          }

          hooks[propName] = property;
        }
      }
    }

    for (var i = 0; i < count; i++) {
      var child = children[i];

      if (isVnode(child)) {
        descendants += child.count || 0;

        if (!hasWidgets && child.hasWidgets) {
          hasWidgets = true;
        }

        if (!hasThunks && child.hasThunks) {
          hasThunks = true;
        }

        if (!descendantHooks && (child.hooks || child.descendantHooks)) {
          descendantHooks = true;
        }
      } else if (!hasWidgets && isWidget_1(child)) {
        if (typeof child.destroy === "function") {
          hasWidgets = true;
        }
      } else if (!hasThunks && isThunk_1(child)) {
        hasThunks = true;
      }
    }

    this.count = count + descendants;
    this.hasWidgets = hasWidgets;
    this.hasThunks = hasThunks;
    this.hooks = hooks;
    this.descendantHooks = descendantHooks;
  }

  VirtualNode.prototype.version = version;
  VirtualNode.prototype.type = "VirtualNode";

  var vtext = VirtualText;

  function VirtualText(text) {
    this.text = String(text);
  }

  VirtualText.prototype.version = version;
  VirtualText.prototype.type = "VirtualText";

  var vcomment = VirtualComment;

  function VirtualComment(text) {
    this.text = String(text);
  }

  VirtualComment.prototype.type = 'Widget';

  VirtualComment.prototype.init = function () {
    return document.createComment(this.text);
  };

  VirtualComment.prototype.update = function (previous, domNode) {
    if (this.text === previous.text) return;
    domNode.nodeValue = this.text;
  };

  var vdomVirtualize = createCommonjsModule(function (module) {
  /*!
  * vdom-virtualize
  * Copyright 2014 by Marcel Klehr <mklehr@gmx.net>
  *
  * (MIT LICENSE)
  * Permission is hereby granted, free of charge, to any person obtaining a copy
  * of this software and associated documentation files (the "Software"), to deal
  * in the Software without restriction, including without limitation the rights
  * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  * copies of the Software, and to permit persons to whom the Software is
  * furnished to do so, subject to the following conditions:
  *
  * The above copyright notice and this permission notice shall be included in
  * all copies or substantial portions of the Software.
  *
  * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  * THE SOFTWARE.
  */


  module.exports = createVNode;

  function createVNode(domNode, key) {

    if (domNode.nodeType == 1) return createFromElement(domNode);
    if (domNode.nodeType == 3) return createFromTextNode(domNode);
    if (domNode.nodeType == 8) return createFromCommentNode(domNode);
    return;
  }

  function createFromTextNode(tNode) {
    return new vtext(tNode.nodeValue);
  }

  function createFromCommentNode(cNode) {
    return new vcomment(cNode.nodeValue);
  }

  function createFromElement(el) {
    var tagName = el.tagName,
        namespace = el.namespaceURI == 'http://www.w3.org/1999/xhtml' ? null : el.namespaceURI,
        properties = getElementProperties(el),
        children = [];

    for (var i = 0; i < el.childNodes.length; i++) {
      children.push(createVNode(el.childNodes[i]
      /*, i*/
      ));
    }

    return new vnode(tagName, properties, children, null, namespace);
  }

  function getElementProperties(el) {
    var obj = {};

    for (var i = 0; i < props.length; i++) {
      var propName = props[i];
      if (!el[propName]) continue; // Special case: style
      // .style is a DOMStyleDeclaration, thus we need to iterate over all
      // rules to create a hash of applied css properties.
      //
      // You can directly set a specific .style[prop] = value so patching with vdom
      // is possible.

      if ("style" == propName) {
        var css = {},
            styleProp;

        if ('undefined' !== typeof el.style.length) {
          for (var j = 0; j < el.style.length; j++) {
            styleProp = el.style[j];
            css[styleProp] = el.style.getPropertyValue(styleProp); // XXX: add support for "!important" via getPropertyPriority()!
          }
        } else {
          // IE8
          for (var styleProp in el.style) {
            if (el.style[styleProp] && el.style.hasOwnProperty(styleProp)) {
              css[styleProp] = el.style[styleProp];
            }
          }
        }

        if (Object.keys(css).length) obj[propName] = css;
        continue;
      } // https://msdn.microsoft.com/en-us/library/cc848861%28v=vs.85%29.aspx
      // The img element does not support the HREF content attribute.
      // In addition, the href property is read-only for the img Document Object Model (DOM) object


      if (el.tagName.toLowerCase() === 'img' && propName === 'href') {
        continue;
      } // Special case: dataset
      // we can iterate over .dataset with a simple for..in loop.
      // The all-time foo with data-* attribs is the dash-snake to camelCase
      // conversion.
      //
      // *This is compatible with h(), but not with every browser, thus this section was removed in favor
      // of attributes (specified below)!*
      //
      // .dataset properties are directly accessible as transparent getters/setters, so
      // patching with vdom is possible.

      /*if("dataset" == propName) {
        var data = {}
        for(var p in el.dataset) {
          data[p] = el.dataset[p]
        }
        obj[propName] = data
        return
      }*/
      // Special case: attributes
      // these are a NamedNodeMap, but we can just convert them to a hash for vdom,
      // because of https://github.com/Matt-Esch/virtual-dom/blob/master/vdom/apply-properties.js#L57


      if ("attributes" == propName) {
        var atts = Array.prototype.slice.call(el[propName]);
        var hash = {};

        for (var k = 0; k < atts.length; k++) {
          var name = atts[k].name;
          if (obj[name] || obj[attrBlacklist[name]]) continue;
          hash[name] = el.getAttribute(name);
        }

        obj[propName] = hash;
        continue;
      }

      if ("tabIndex" == propName && el.tabIndex === -1) continue; // Special case: contentEditable
      // browser use 'inherit' by default on all nodes, but does not allow setting it to ''
      // diffing virtualize dom will trigger error
      // ref: https://github.com/Matt-Esch/virtual-dom/issues/176

      if ("contentEditable" == propName && el[propName] === 'inherit') continue;
      if ('object' === typeof el[propName]) continue; // default: just copy the property

      obj[propName] = el[propName];
    }

    return obj;
  }
  /**
   * DOMNode property white list
   * Taken from https://github.com/Raynos/react/blob/dom-property-config/src/browser/ui/dom/DefaultDOMPropertyConfig.js
   */


  var props = module.exports.properties = ["accept", "accessKey", "action", "alt", "async", "autoComplete", "autoPlay", "cellPadding", "cellSpacing", "checked", "className", "colSpan", "content", "contentEditable", "controls", "crossOrigin", "data" //,"dataset" removed since attributes handles data-attributes
  , "defer", "dir", "download", "draggable", "encType", "formNoValidate", "href", "hrefLang", "htmlFor", "httpEquiv", "icon", "id", "label", "lang", "list", "loop", "max", "mediaGroup", "method", "min", "multiple", "muted", "name", "noValidate", "pattern", "placeholder", "poster", "preload", "radioGroup", "readOnly", "rel", "required", "rowSpan", "sandbox", "scope", "scrollLeft", "scrolling", "scrollTop", "selected", "span", "spellCheck", "src", "srcDoc", "srcSet", "start", "step", "style", "tabIndex", "target", "title", "type", "value" // Non-standard Properties
  , "autoCapitalize", "autoCorrect", "property", "attributes"];
  var attrBlacklist = module.exports.attrBlacklist = {
    'class': 'className'
  };
  });
  var vdomVirtualize_1 = vdomVirtualize.properties;
  var vdomVirtualize_2 = vdomVirtualize.attrBlacklist;

  var nativeIsArray = Array.isArray;
  var toString = Object.prototype.toString;
  var xIsArray = nativeIsArray || isArray;

  function isArray(obj) {
    return toString.call(obj) === "[object Array]";
  }

  VirtualPatch.NONE = 0;
  VirtualPatch.VTEXT = 1;
  VirtualPatch.VNODE = 2;
  VirtualPatch.WIDGET = 3;
  VirtualPatch.PROPS = 4;
  VirtualPatch.ORDER = 5;
  VirtualPatch.INSERT = 6;
  VirtualPatch.REMOVE = 7;
  VirtualPatch.THUNK = 8;
  var vpatch = VirtualPatch;

  function VirtualPatch(type, vNode, patch) {
    this.type = Number(type);
    this.vNode = vNode;
    this.patch = patch;
  }

  VirtualPatch.prototype.version = version;
  VirtualPatch.prototype.type = "VirtualPatch";

  var isVtext = isVirtualText;

  function isVirtualText(x) {
    return x && x.type === "VirtualText" && x.version === version;
  }

  var handleThunk_1 = handleThunk;

  function handleThunk(a, b) {
    var renderedA = a;
    var renderedB = b;

    if (isThunk_1(b)) {
      renderedB = renderThunk(b, a);
    }

    if (isThunk_1(a)) {
      renderedA = renderThunk(a, null);
    }

    return {
      a: renderedA,
      b: renderedB
    };
  }

  function renderThunk(thunk, previous) {
    var renderedThunk = thunk.vnode;

    if (!renderedThunk) {
      renderedThunk = thunk.vnode = thunk.render(previous);
    }

    if (!(isVnode(renderedThunk) || isVtext(renderedThunk) || isWidget_1(renderedThunk))) {
      throw new Error("thunk did not return a valid node");
    }

    return renderedThunk;
  }

  var isObject = function isObject(x) {
    return typeof x === "object" && x !== null;
  };

  var diffProps_1 = diffProps;

  function diffProps(a, b) {
    var diff;

    for (var aKey in a) {
      if (!(aKey in b)) {
        diff = diff || {};
        diff[aKey] = undefined;
      }

      var aValue = a[aKey];
      var bValue = b[aKey];

      if (aValue === bValue) {
        continue;
      } else if (isObject(aValue) && isObject(bValue)) {
        if (getPrototype(bValue) !== getPrototype(aValue)) {
          diff = diff || {};
          diff[aKey] = bValue;
        } else if (isVhook(bValue)) {
          diff = diff || {};
          diff[aKey] = bValue;
        } else {
          var objectDiff = diffProps(aValue, bValue);

          if (objectDiff) {
            diff = diff || {};
            diff[aKey] = objectDiff;
          }
        }
      } else {
        diff = diff || {};
        diff[aKey] = bValue;
      }
    }

    for (var bKey in b) {
      if (!(bKey in a)) {
        diff = diff || {};
        diff[bKey] = b[bKey];
      }
    }

    return diff;
  }

  function getPrototype(value) {
    if (Object.getPrototypeOf) {
      return Object.getPrototypeOf(value);
    } else if (value.__proto__) {
      return value.__proto__;
    } else if (value.constructor) {
      return value.constructor.prototype;
    }
  }

  var diff_1 = diff;

  function diff(a, b) {
    var patch = {
      a: a
    };
    walk(a, b, patch, 0);
    return patch;
  }

  function walk(a, b, patch, index) {
    if (a === b) {
      return;
    }

    var apply = patch[index];
    var applyClear = false;

    if (isThunk_1(a) || isThunk_1(b)) {
      thunks(a, b, patch, index);
    } else if (b == null) {
      // If a is a widget we will add a remove patch for it
      // Otherwise any child widgets/hooks must be destroyed.
      // This prevents adding two remove patches for a widget.
      if (!isWidget_1(a)) {
        clearState(a, patch, index);
        apply = patch[index];
      }

      apply = appendPatch(apply, new vpatch(vpatch.REMOVE, a, b));
    } else if (isVnode(b)) {
      if (isVnode(a)) {
        if (a.tagName === b.tagName && a.namespace === b.namespace && a.key === b.key) {
          var propsPatch = diffProps_1(a.properties, b.properties);

          if (propsPatch) {
            apply = appendPatch(apply, new vpatch(vpatch.PROPS, a, propsPatch));
          }

          apply = diffChildren(a, b, patch, apply, index);
        } else {
          apply = appendPatch(apply, new vpatch(vpatch.VNODE, a, b));
          applyClear = true;
        }
      } else {
        apply = appendPatch(apply, new vpatch(vpatch.VNODE, a, b));
        applyClear = true;
      }
    } else if (isVtext(b)) {
      if (!isVtext(a)) {
        apply = appendPatch(apply, new vpatch(vpatch.VTEXT, a, b));
        applyClear = true;
      } else if (a.text !== b.text) {
        apply = appendPatch(apply, new vpatch(vpatch.VTEXT, a, b));
      }
    } else if (isWidget_1(b)) {
      if (!isWidget_1(a)) {
        applyClear = true;
      }

      apply = appendPatch(apply, new vpatch(vpatch.WIDGET, a, b));
    }

    if (apply) {
      patch[index] = apply;
    }

    if (applyClear) {
      clearState(a, patch, index);
    }
  }

  function diffChildren(a, b, patch, apply, index) {
    var aChildren = a.children;
    var orderedSet = reorder(aChildren, b.children);
    var bChildren = orderedSet.children;
    var aLen = aChildren.length;
    var bLen = bChildren.length;
    var len = aLen > bLen ? aLen : bLen;

    for (var i = 0; i < len; i++) {
      var leftNode = aChildren[i];
      var rightNode = bChildren[i];
      index += 1;

      if (!leftNode) {
        if (rightNode) {
          // Excess nodes in b need to be added
          apply = appendPatch(apply, new vpatch(vpatch.INSERT, null, rightNode));
        }
      } else {
        walk(leftNode, rightNode, patch, index);
      }

      if (isVnode(leftNode) && leftNode.count) {
        index += leftNode.count;
      }
    }

    if (orderedSet.moves) {
      // Reorder nodes last
      apply = appendPatch(apply, new vpatch(vpatch.ORDER, a, orderedSet.moves));
    }

    return apply;
  }

  function clearState(vNode, patch, index) {
    // TODO: Make this a single walk, not two
    unhook(vNode, patch, index);
    destroyWidgets(vNode, patch, index);
  } // Patch records for all destroyed widgets must be added because we need
  // a DOM node reference for the destroy function


  function destroyWidgets(vNode, patch, index) {
    if (isWidget_1(vNode)) {
      if (typeof vNode.destroy === "function") {
        patch[index] = appendPatch(patch[index], new vpatch(vpatch.REMOVE, vNode, null));
      }
    } else if (isVnode(vNode) && (vNode.hasWidgets || vNode.hasThunks)) {
      var children = vNode.children;
      var len = children.length;

      for (var i = 0; i < len; i++) {
        var child = children[i];
        index += 1;
        destroyWidgets(child, patch, index);

        if (isVnode(child) && child.count) {
          index += child.count;
        }
      }
    } else if (isThunk_1(vNode)) {
      thunks(vNode, null, patch, index);
    }
  } // Create a sub-patch for thunks


  function thunks(a, b, patch, index) {
    var nodes = handleThunk_1(a, b);
    var thunkPatch = diff(nodes.a, nodes.b);

    if (hasPatches(thunkPatch)) {
      patch[index] = new vpatch(vpatch.THUNK, null, thunkPatch);
    }
  }

  function hasPatches(patch) {
    for (var index in patch) {
      if (index !== "a") {
        return true;
      }
    }

    return false;
  } // Execute hooks when two nodes are identical


  function unhook(vNode, patch, index) {
    if (isVnode(vNode)) {
      if (vNode.hooks) {
        patch[index] = appendPatch(patch[index], new vpatch(vpatch.PROPS, vNode, undefinedKeys(vNode.hooks)));
      }

      if (vNode.descendantHooks || vNode.hasThunks) {
        var children = vNode.children;
        var len = children.length;

        for (var i = 0; i < len; i++) {
          var child = children[i];
          index += 1;
          unhook(child, patch, index);

          if (isVnode(child) && child.count) {
            index += child.count;
          }
        }
      }
    } else if (isThunk_1(vNode)) {
      thunks(vNode, null, patch, index);
    }
  }

  function undefinedKeys(obj) {
    var result = {};

    for (var key in obj) {
      result[key] = undefined;
    }

    return result;
  } // List diff, naive left to right reordering


  function reorder(aChildren, bChildren) {
    // O(M) time, O(M) memory
    var bChildIndex = keyIndex(bChildren);
    var bKeys = bChildIndex.keys;
    var bFree = bChildIndex.free;

    if (bFree.length === bChildren.length) {
      return {
        children: bChildren,
        moves: null
      };
    } // O(N) time, O(N) memory


    var aChildIndex = keyIndex(aChildren);
    var aKeys = aChildIndex.keys;
    var aFree = aChildIndex.free;

    if (aFree.length === aChildren.length) {
      return {
        children: bChildren,
        moves: null
      };
    } // O(MAX(N, M)) memory


    var newChildren = [];
    var freeIndex = 0;
    var freeCount = bFree.length;
    var deletedItems = 0; // Iterate through a and match a node in b
    // O(N) time,

    for (var i = 0; i < aChildren.length; i++) {
      var aItem = aChildren[i];
      var itemIndex;

      if (aItem.key) {
        if (bKeys.hasOwnProperty(aItem.key)) {
          // Match up the old keys
          itemIndex = bKeys[aItem.key];
          newChildren.push(bChildren[itemIndex]);
        } else {
          // Remove old keyed items
          itemIndex = i - deletedItems++;
          newChildren.push(null);
        }
      } else {
        // Match the item in a with the next free item in b
        if (freeIndex < freeCount) {
          itemIndex = bFree[freeIndex++];
          newChildren.push(bChildren[itemIndex]);
        } else {
          // There are no free items in b to match with
          // the free items in a, so the extra free nodes
          // are deleted.
          itemIndex = i - deletedItems++;
          newChildren.push(null);
        }
      }
    }

    var lastFreeIndex = freeIndex >= bFree.length ? bChildren.length : bFree[freeIndex]; // Iterate through b and append any new keys
    // O(M) time

    for (var j = 0; j < bChildren.length; j++) {
      var newItem = bChildren[j];

      if (newItem.key) {
        if (!aKeys.hasOwnProperty(newItem.key)) {
          // Add any new keyed items
          // We are adding new items to the end and then sorting them
          // in place. In future we should insert new items in place.
          newChildren.push(newItem);
        }
      } else if (j >= lastFreeIndex) {
        // Add any leftover non-keyed items
        newChildren.push(newItem);
      }
    }

    var simulate = newChildren.slice();
    var simulateIndex = 0;
    var removes = [];
    var inserts = [];
    var simulateItem;

    for (var k = 0; k < bChildren.length;) {
      var wantedItem = bChildren[k];
      simulateItem = simulate[simulateIndex]; // remove items

      while (simulateItem === null && simulate.length) {
        removes.push(remove$1(simulate, simulateIndex, null));
        simulateItem = simulate[simulateIndex];
      }

      if (!simulateItem || simulateItem.key !== wantedItem.key) {
        // if we need a key in this position...
        if (wantedItem.key) {
          if (simulateItem && simulateItem.key) {
            // if an insert doesn't put this key in place, it needs to move
            if (bKeys[simulateItem.key] !== k + 1) {
              removes.push(remove$1(simulate, simulateIndex, simulateItem.key));
              simulateItem = simulate[simulateIndex]; // if the remove didn't put the wanted item in place, we need to insert it

              if (!simulateItem || simulateItem.key !== wantedItem.key) {
                inserts.push({
                  key: wantedItem.key,
                  to: k
                });
              } // items are matching, so skip ahead
              else {
                  simulateIndex++;
                }
            } else {
              inserts.push({
                key: wantedItem.key,
                to: k
              });
            }
          } else {
            inserts.push({
              key: wantedItem.key,
              to: k
            });
          }

          k++;
        } // a key in simulate has no matching wanted key, remove it
        else if (simulateItem && simulateItem.key) {
            removes.push(remove$1(simulate, simulateIndex, simulateItem.key));
          }
      } else {
        simulateIndex++;
        k++;
      }
    } // remove all the remaining nodes from simulate


    while (simulateIndex < simulate.length) {
      simulateItem = simulate[simulateIndex];
      removes.push(remove$1(simulate, simulateIndex, simulateItem && simulateItem.key));
    } // If the only moves we have are deletes then we can just
    // let the delete patch remove these items.


    if (removes.length === deletedItems && !inserts.length) {
      return {
        children: newChildren,
        moves: null
      };
    }

    return {
      children: newChildren,
      moves: {
        removes: removes,
        inserts: inserts
      }
    };
  }

  function remove$1(arr, index, key) {
    arr.splice(index, 1);
    return {
      from: index,
      key: key
    };
  }

  function keyIndex(children) {
    var keys = {};
    var free = [];
    var length = children.length;

    for (var i = 0; i < length; i++) {
      var child = children[i];

      if (child.key) {
        keys[child.key] = i;
      } else {
        free.push(i);
      }
    }

    return {
      keys: keys,
      // A hash of key name to index
      free: free // An array of unkeyed item indices

    };
  }

  function appendPatch(apply, patch) {
    if (apply) {
      if (xIsArray(apply)) {
        apply.push(patch);
      } else {
        apply = [apply, patch];
      }

      return apply;
    } else {
      return patch;
    }
  }

  var diff_1$1 = diff_1;

  var slice$2 = Array.prototype.slice;
  var domWalk = iterativelyWalk;

  function iterativelyWalk(nodes, cb) {
    if (!('length' in nodes)) {
      nodes = [nodes];
    }

    nodes = slice$2.call(nodes);

    while (nodes.length) {
      var node = nodes.shift(),
          ret = cb(node);

      if (ret) {
        return ret;
      }

      if (node.childNodes && node.childNodes.length) {
        nodes = slice$2.call(node.childNodes).concat(nodes);
      }
    }
  }

  var domComment = Comment;

  function Comment(data, owner) {
    if (!(this instanceof Comment)) {
      return new Comment(data, owner);
    }

    this.data = data;
    this.nodeValue = data;
    this.length = data.length;
    this.ownerDocument = owner || null;
  }

  Comment.prototype.nodeType = 8;
  Comment.prototype.nodeName = "#comment";

  Comment.prototype.toString = function _Comment_toString() {
    return "[object Comment]";
  };

  var domText = DOMText;

  function DOMText(value, owner) {
    if (!(this instanceof DOMText)) {
      return new DOMText(value);
    }

    this.data = value || "";
    this.length = this.data.length;
    this.ownerDocument = owner || null;
  }

  DOMText.prototype.type = "DOMTextNode";
  DOMText.prototype.nodeType = 3;
  DOMText.prototype.nodeName = "#text";

  DOMText.prototype.toString = function _Text_toString() {
    return this.data;
  };

  DOMText.prototype.replaceData = function replaceData(index, length, value) {
    var current = this.data;
    var left = current.substring(0, index);
    var right = current.substring(index + length, current.length);
    this.data = left + value + right;
    this.length = this.data.length;
  };

  var dispatchEvent_1 = dispatchEvent;

  function dispatchEvent(ev) {
    var elem = this;
    var type = ev.type;

    if (!ev.target) {
      ev.target = elem;
    }

    if (!elem.listeners) {
      elem.listeners = {};
    }

    var listeners = elem.listeners[type];

    if (listeners) {
      return listeners.forEach(function (listener) {
        ev.currentTarget = elem;

        if (typeof listener === 'function') {
          listener(ev);
        } else {
          listener.handleEvent(ev);
        }
      });
    }

    if (elem.parentNode) {
      elem.parentNode.dispatchEvent(ev);
    }
  }

  var addEventListener_1 = addEventListener;

  function addEventListener(type, listener) {
    var elem = this;

    if (!elem.listeners) {
      elem.listeners = {};
    }

    if (!elem.listeners[type]) {
      elem.listeners[type] = [];
    }

    if (elem.listeners[type].indexOf(listener) === -1) {
      elem.listeners[type].push(listener);
    }
  }

  var removeEventListener_1 = removeEventListener;

  function removeEventListener(type, listener) {
    var elem = this;

    if (!elem.listeners) {
      return;
    }

    if (!elem.listeners[type]) {
      return;
    }

    var list = elem.listeners[type];
    var index = list.indexOf(listener);

    if (index !== -1) {
      list.splice(index, 1);
    }
  }

  var serialize = serializeNode;
  var voidElements = ["area", "base", "br", "col", "embed", "hr", "img", "input", "keygen", "link", "menuitem", "meta", "param", "source", "track", "wbr"];

  function serializeNode(node) {
    switch (node.nodeType) {
      case 3:
        return escapeText(node.data);

      case 8:
        return "<!--" + node.data + "-->";

      default:
        return serializeElement(node);
    }
  }

  function serializeElement(elem) {
    var strings = [];
    var tagname = elem.tagName;

    if (elem.namespaceURI === "http://www.w3.org/1999/xhtml") {
      tagname = tagname.toLowerCase();
    }

    strings.push("<" + tagname + properties(elem) + datasetify(elem));

    if (voidElements.indexOf(tagname) > -1) {
      strings.push(" />");
    } else {
      strings.push(">");

      if (elem.childNodes.length) {
        strings.push.apply(strings, elem.childNodes.map(serializeNode));
      } else if (elem.textContent || elem.innerText) {
        strings.push(escapeText(elem.textContent || elem.innerText));
      } else if (elem.innerHTML) {
        strings.push(elem.innerHTML);
      }

      strings.push("</" + tagname + ">");
    }

    return strings.join("");
  }

  function isProperty(elem, key) {
    var type = typeof elem[key];

    if (key === "style" && Object.keys(elem.style).length > 0) {
      return true;
    }

    return elem.hasOwnProperty(key) && (type === "string" || type === "boolean" || type === "number") && key !== "nodeName" && key !== "className" && key !== "tagName" && key !== "textContent" && key !== "innerText" && key !== "namespaceURI" && key !== "innerHTML";
  }

  function stylify(styles) {
    if (typeof styles === 'string') return styles;
    var attr = "";
    Object.keys(styles).forEach(function (key) {
      var value = styles[key];
      key = key.replace(/[A-Z]/g, function (c) {
        return "-" + c.toLowerCase();
      });
      attr += key + ":" + value + ";";
    });
    return attr;
  }

  function datasetify(elem) {
    var ds = elem.dataset;
    var props = [];

    for (var key in ds) {
      props.push({
        name: "data-" + key,
        value: ds[key]
      });
    }

    return props.length ? stringify(props) : "";
  }

  function stringify(list) {
    var attributes = [];
    list.forEach(function (tuple) {
      var name = tuple.name;
      var value = tuple.value;

      if (name === "style") {
        value = stylify(value);
      }

      attributes.push(name + "=" + "\"" + escapeAttributeValue(value) + "\"");
    });
    return attributes.length ? " " + attributes.join(" ") : "";
  }

  function properties(elem) {
    var props = [];

    for (var key in elem) {
      if (isProperty(elem, key)) {
        props.push({
          name: key,
          value: elem[key]
        });
      }
    }

    for (var ns in elem._attributes) {
      for (var attribute in elem._attributes[ns]) {
        var prop = elem._attributes[ns][attribute];
        var name = (prop.prefix ? prop.prefix + ":" : "") + attribute;
        props.push({
          name: name,
          value: prop.value
        });
      }
    }

    if (elem.className) {
      props.push({
        name: "class",
        value: elem.className
      });
    }

    return props.length ? stringify(props) : "";
  }

  function escapeText(s) {
    var str = '';

    if (typeof s === 'string') {
      str = s;
    } else if (s) {
      str = s.toString();
    }

    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function escapeAttributeValue(str) {
    return escapeText(str).replace(/"/g, "&quot;");
  }

  var htmlns = "http://www.w3.org/1999/xhtml";
  var domElement = DOMElement;

  function DOMElement(tagName, owner, namespace) {
    if (!(this instanceof DOMElement)) {
      return new DOMElement(tagName);
    }

    var ns = namespace === undefined ? htmlns : namespace || null;
    this.tagName = ns === htmlns ? String(tagName).toUpperCase() : tagName;
    this.nodeName = this.tagName;
    this.className = "";
    this.dataset = {};
    this.childNodes = [];
    this.parentNode = null;
    this.style = {};
    this.ownerDocument = owner || null;
    this.namespaceURI = ns;
    this._attributes = {};

    if (this.tagName === 'INPUT') {
      this.type = 'text';
    }
  }

  DOMElement.prototype.type = "DOMElement";
  DOMElement.prototype.nodeType = 1;

  DOMElement.prototype.appendChild = function _Element_appendChild(child) {
    if (child.parentNode) {
      child.parentNode.removeChild(child);
    }

    this.childNodes.push(child);
    child.parentNode = this;
    return child;
  };

  DOMElement.prototype.replaceChild = function _Element_replaceChild(elem, needle) {
    // TODO: Throw NotFoundError if needle.parentNode !== this
    if (elem.parentNode) {
      elem.parentNode.removeChild(elem);
    }

    var index = this.childNodes.indexOf(needle);
    needle.parentNode = null;
    this.childNodes[index] = elem;
    elem.parentNode = this;
    return needle;
  };

  DOMElement.prototype.removeChild = function _Element_removeChild(elem) {
    // TODO: Throw NotFoundError if elem.parentNode !== this
    var index = this.childNodes.indexOf(elem);
    this.childNodes.splice(index, 1);
    elem.parentNode = null;
    return elem;
  };

  DOMElement.prototype.insertBefore = function _Element_insertBefore(elem, needle) {
    // TODO: Throw NotFoundError if referenceElement is a dom node
    // and parentNode !== this
    if (elem.parentNode) {
      elem.parentNode.removeChild(elem);
    }

    var index = needle === null || needle === undefined ? -1 : this.childNodes.indexOf(needle);

    if (index > -1) {
      this.childNodes.splice(index, 0, elem);
    } else {
      this.childNodes.push(elem);
    }

    elem.parentNode = this;
    return elem;
  };

  DOMElement.prototype.setAttributeNS = function _Element_setAttributeNS(namespace, name, value) {
    var prefix = null;
    var localName = name;
    var colonPosition = name.indexOf(":");

    if (colonPosition > -1) {
      prefix = name.substr(0, colonPosition);
      localName = name.substr(colonPosition + 1);
    }

    if (this.tagName === 'INPUT' && name === 'type') {
      this.type = value;
    } else {
      var attributes = this._attributes[namespace] || (this._attributes[namespace] = {});
      attributes[localName] = {
        value: value,
        prefix: prefix
      };
    }
  };

  DOMElement.prototype.getAttributeNS = function _Element_getAttributeNS(namespace, name) {
    var attributes = this._attributes[namespace];
    var value = attributes && attributes[name] && attributes[name].value;

    if (this.tagName === 'INPUT' && name === 'type') {
      return this.type;
    }

    if (typeof value !== "string") {
      return null;
    }

    return value;
  };

  DOMElement.prototype.removeAttributeNS = function _Element_removeAttributeNS(namespace, name) {
    var attributes = this._attributes[namespace];

    if (attributes) {
      delete attributes[name];
    }
  };

  DOMElement.prototype.hasAttributeNS = function _Element_hasAttributeNS(namespace, name) {
    var attributes = this._attributes[namespace];
    return !!attributes && name in attributes;
  };

  DOMElement.prototype.setAttribute = function _Element_setAttribute(name, value) {
    return this.setAttributeNS(null, name, value);
  };

  DOMElement.prototype.getAttribute = function _Element_getAttribute(name) {
    return this.getAttributeNS(null, name);
  };

  DOMElement.prototype.removeAttribute = function _Element_removeAttribute(name) {
    return this.removeAttributeNS(null, name);
  };

  DOMElement.prototype.hasAttribute = function _Element_hasAttribute(name) {
    return this.hasAttributeNS(null, name);
  };

  DOMElement.prototype.removeEventListener = removeEventListener_1;
  DOMElement.prototype.addEventListener = addEventListener_1;
  DOMElement.prototype.dispatchEvent = dispatchEvent_1; // Un-implemented

  DOMElement.prototype.focus = function _Element_focus() {
    return void 0;
  };

  DOMElement.prototype.toString = function _Element_toString() {
    return serialize(this);
  };

  DOMElement.prototype.getElementsByClassName = function _Element_getElementsByClassName(classNames) {
    var classes = classNames.split(" ");
    var elems = [];
    domWalk(this, function (node) {
      if (node.nodeType === 1) {
        var nodeClassName = node.className || "";
        var nodeClasses = nodeClassName.split(" ");

        if (classes.every(function (item) {
          return nodeClasses.indexOf(item) !== -1;
        })) {
          elems.push(node);
        }
      }
    });
    return elems;
  };

  DOMElement.prototype.getElementsByTagName = function _Element_getElementsByTagName(tagName) {
    tagName = tagName.toLowerCase();
    var elems = [];
    domWalk(this.childNodes, function (node) {
      if (node.nodeType === 1 && (tagName === '*' || node.tagName.toLowerCase() === tagName)) {
        elems.push(node);
      }
    });
    return elems;
  };

  DOMElement.prototype.contains = function _Element_contains(element) {
    return domWalk(this, function (node) {
      return element === node;
    }) || false;
  };

  var domFragment = DocumentFragment;

  function DocumentFragment(owner) {
    if (!(this instanceof DocumentFragment)) {
      return new DocumentFragment();
    }

    this.childNodes = [];
    this.parentNode = null;
    this.ownerDocument = owner || null;
  }

  DocumentFragment.prototype.type = "DocumentFragment";
  DocumentFragment.prototype.nodeType = 11;
  DocumentFragment.prototype.nodeName = "#document-fragment";
  DocumentFragment.prototype.appendChild = domElement.prototype.appendChild;
  DocumentFragment.prototype.replaceChild = domElement.prototype.replaceChild;
  DocumentFragment.prototype.removeChild = domElement.prototype.removeChild;

  DocumentFragment.prototype.toString = function _DocumentFragment_toString() {
    return this.childNodes.map(function (node) {
      return String(node);
    }).join("");
  };

  var event = Event;

  function Event(family) {}

  Event.prototype.initEvent = function _Event_initEvent(type, bubbles, cancelable) {
    this.type = type;
    this.bubbles = bubbles;
    this.cancelable = cancelable;
  };

  Event.prototype.preventDefault = function _Event_preventDefault() {};

  var document$1 = Document;

  function Document() {
    if (!(this instanceof Document)) {
      return new Document();
    }

    this.head = this.createElement("head");
    this.body = this.createElement("body");
    this.documentElement = this.createElement("html");
    this.documentElement.appendChild(this.head);
    this.documentElement.appendChild(this.body);
    this.childNodes = [this.documentElement];
    this.nodeType = 9;
  }

  var proto = Document.prototype;

  proto.createTextNode = function createTextNode(value) {
    return new domText(value, this);
  };

  proto.createElementNS = function createElementNS(namespace, tagName) {
    var ns = namespace === null ? null : String(namespace);
    return new domElement(tagName, this, ns);
  };

  proto.createElement = function createElement(tagName) {
    return new domElement(tagName, this);
  };

  proto.createDocumentFragment = function createDocumentFragment() {
    return new domFragment(this);
  };

  proto.createEvent = function createEvent(family) {
    return new event(family);
  };

  proto.createComment = function createComment(data) {
    return new domComment(data, this);
  };

  proto.getElementById = function getElementById(id) {
    id = String(id);
    var result = domWalk(this.childNodes, function (node) {
      if (String(node.id) === id) {
        return node;
      }
    });
    return result || null;
  };

  proto.getElementsByClassName = domElement.prototype.getElementsByClassName;
  proto.getElementsByTagName = domElement.prototype.getElementsByTagName;
  proto.contains = domElement.prototype.contains;
  proto.removeEventListener = removeEventListener_1;
  proto.addEventListener = addEventListener_1;
  proto.dispatchEvent = dispatchEvent_1;

  var minDocument = new document$1();

  var topLevel = typeof commonjsGlobal !== 'undefined' ? commonjsGlobal : typeof window !== 'undefined' ? window : {};



  var doccy;

  if (typeof document !== 'undefined') {
    doccy = document;
  } else {
    doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'];

    if (!doccy) {
      doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'] = minDocument;
    }
  }

  var document_1 = doccy;

  var applyProperties_1 = applyProperties;

  function applyProperties(node, props, previous) {
    for (var propName in props) {
      var propValue = props[propName];

      if (propValue === undefined) {
        removeProperty(node, propName, propValue, previous);
      } else if (isVhook(propValue)) {
        removeProperty(node, propName, propValue, previous);

        if (propValue.hook) {
          propValue.hook(node, propName, previous ? previous[propName] : undefined);
        }
      } else {
        if (isObject(propValue)) {
          patchObject(node, props, previous, propName, propValue);
        } else {
          node[propName] = propValue;
        }
      }
    }
  }

  function removeProperty(node, propName, propValue, previous) {
    if (previous) {
      var previousValue = previous[propName];

      if (!isVhook(previousValue)) {
        if (propName === "attributes") {
          for (var attrName in previousValue) {
            node.removeAttribute(attrName);
          }
        } else if (propName === "style") {
          for (var i in previousValue) {
            node.style[i] = "";
          }
        } else if (typeof previousValue === "string") {
          node[propName] = "";
        } else {
          node[propName] = null;
        }
      } else if (previousValue.unhook) {
        previousValue.unhook(node, propName, propValue);
      }
    }
  }

  function patchObject(node, props, previous, propName, propValue) {
    var previousValue = previous ? previous[propName] : undefined; // Set attributes

    if (propName === "attributes") {
      for (var attrName in propValue) {
        var attrValue = propValue[attrName];

        if (attrValue === undefined) {
          node.removeAttribute(attrName);
        } else {
          node.setAttribute(attrName, attrValue);
        }
      }

      return;
    }

    if (previousValue && isObject(previousValue) && getPrototype$1(previousValue) !== getPrototype$1(propValue)) {
      node[propName] = propValue;
      return;
    }

    if (!isObject(node[propName])) {
      node[propName] = {};
    }

    var replacer = propName === "style" ? "" : undefined;

    for (var k in propValue) {
      var value = propValue[k];
      node[propName][k] = value === undefined ? replacer : value;
    }
  }

  function getPrototype$1(value) {
    if (Object.getPrototypeOf) {
      return Object.getPrototypeOf(value);
    } else if (value.__proto__) {
      return value.__proto__;
    } else if (value.constructor) {
      return value.constructor.prototype;
    }
  }

  var createElement_1 = createElement;

  function createElement(vnode, opts) {
    var doc = opts ? opts.document || document_1 : document_1;
    var warn = opts ? opts.warn : null;
    vnode = handleThunk_1(vnode).a;

    if (isWidget_1(vnode)) {
      return vnode.init();
    } else if (isVtext(vnode)) {
      return doc.createTextNode(vnode.text);
    } else if (!isVnode(vnode)) {
      if (warn) {
        warn("Item is not a valid virtual dom node", vnode);
      }

      return null;
    }

    var node = vnode.namespace === null ? doc.createElement(vnode.tagName) : doc.createElementNS(vnode.namespace, vnode.tagName);
    var props = vnode.properties;
    applyProperties_1(node, props);
    var children = vnode.children;

    for (var i = 0; i < children.length; i++) {
      var childNode = createElement(children[i], opts);

      if (childNode) {
        node.appendChild(childNode);
      }
    }

    return node;
  }

  // Maps a virtual DOM tree onto a real DOM tree in an efficient manner.
  // We don't want to read all of the DOM nodes in the tree so we use
  // the in-order tree indexing to eliminate recursion down certain branches.
  // We only recurse into a DOM node if we know that it contains a child of
  // interest.
  var noChild = {};
  var domIndex_1 = domIndex;

  function domIndex(rootNode, tree, indices, nodes) {
    if (!indices || indices.length === 0) {
      return {};
    } else {
      indices.sort(ascending);
      return recurse(rootNode, tree, indices, nodes, 0);
    }
  }

  function recurse(rootNode, tree, indices, nodes, rootIndex) {
    nodes = nodes || {};

    if (rootNode) {
      if (indexInRange(indices, rootIndex, rootIndex)) {
        nodes[rootIndex] = rootNode;
      }

      var vChildren = tree.children;

      if (vChildren) {
        var childNodes = rootNode.childNodes;

        for (var i = 0; i < tree.children.length; i++) {
          rootIndex += 1;
          var vChild = vChildren[i] || noChild;
          var nextIndex = rootIndex + (vChild.count || 0); // skip recursion down the tree if there are no nodes down here

          if (indexInRange(indices, rootIndex, nextIndex)) {
            recurse(childNodes[i], vChild, indices, nodes, rootIndex);
          }

          rootIndex = nextIndex;
        }
      }
    }

    return nodes;
  } // Binary search for an index in the interval [left, right]


  function indexInRange(indices, left, right) {
    if (indices.length === 0) {
      return false;
    }

    var minIndex = 0;
    var maxIndex = indices.length - 1;
    var currentIndex;
    var currentItem;

    while (minIndex <= maxIndex) {
      currentIndex = (maxIndex + minIndex) / 2 >> 0;
      currentItem = indices[currentIndex];

      if (minIndex === maxIndex) {
        return currentItem >= left && currentItem <= right;
      } else if (currentItem < left) {
        minIndex = currentIndex + 1;
      } else if (currentItem > right) {
        maxIndex = currentIndex - 1;
      } else {
        return true;
      }
    }

    return false;
  }

  function ascending(a, b) {
    return a > b ? 1 : -1;
  }

  var updateWidget_1 = updateWidget;

  function updateWidget(a, b) {
    if (isWidget_1(a) && isWidget_1(b)) {
      if ("name" in a && "name" in b) {
        return a.id === b.id;
      } else {
        return a.init === b.init;
      }
    }

    return false;
  }

  var patchOp = applyPatch;

  function applyPatch(vpatch$1, domNode, renderOptions) {
    var type = vpatch$1.type;
    var vNode = vpatch$1.vNode;
    var patch = vpatch$1.patch;

    switch (type) {
      case vpatch.REMOVE:
        return removeNode(domNode, vNode);

      case vpatch.INSERT:
        return insertNode(domNode, patch, renderOptions);

      case vpatch.VTEXT:
        return stringPatch(domNode, vNode, patch, renderOptions);

      case vpatch.WIDGET:
        return widgetPatch(domNode, vNode, patch, renderOptions);

      case vpatch.VNODE:
        return vNodePatch(domNode, vNode, patch, renderOptions);

      case vpatch.ORDER:
        reorderChildren(domNode, patch);
        return domNode;

      case vpatch.PROPS:
        applyProperties_1(domNode, patch, vNode.properties);
        return domNode;

      case vpatch.THUNK:
        return replaceRoot(domNode, renderOptions.patch(domNode, patch, renderOptions));

      default:
        return domNode;
    }
  }

  function removeNode(domNode, vNode) {
    var parentNode = domNode.parentNode;

    if (parentNode) {
      parentNode.removeChild(domNode);
    }

    destroyWidget(domNode, vNode);
    return null;
  }

  function insertNode(parentNode, vNode, renderOptions) {
    var newNode = renderOptions.render(vNode, renderOptions);

    if (parentNode) {
      parentNode.appendChild(newNode);
    }

    return parentNode;
  }

  function stringPatch(domNode, leftVNode, vText, renderOptions) {
    var newNode;

    if (domNode.nodeType === 3) {
      domNode.replaceData(0, domNode.length, vText.text);
      newNode = domNode;
    } else {
      var parentNode = domNode.parentNode;
      newNode = renderOptions.render(vText, renderOptions);

      if (parentNode && newNode !== domNode) {
        parentNode.replaceChild(newNode, domNode);
      }
    }

    return newNode;
  }

  function widgetPatch(domNode, leftVNode, widget, renderOptions) {
    var updating = updateWidget_1(leftVNode, widget);
    var newNode;

    if (updating) {
      newNode = widget.update(leftVNode, domNode) || domNode;
    } else {
      newNode = renderOptions.render(widget, renderOptions);
    }

    var parentNode = domNode.parentNode;

    if (parentNode && newNode !== domNode) {
      parentNode.replaceChild(newNode, domNode);
    }

    if (!updating) {
      destroyWidget(domNode, leftVNode);
    }

    return newNode;
  }

  function vNodePatch(domNode, leftVNode, vNode, renderOptions) {
    var parentNode = domNode.parentNode;
    var newNode = renderOptions.render(vNode, renderOptions);

    if (parentNode && newNode !== domNode) {
      parentNode.replaceChild(newNode, domNode);
    }

    return newNode;
  }

  function destroyWidget(domNode, w) {
    if (typeof w.destroy === "function" && isWidget_1(w)) {
      w.destroy(domNode);
    }
  }

  function reorderChildren(domNode, moves) {
    var childNodes = domNode.childNodes;
    var keyMap = {};
    var node;
    var remove;
    var insert;

    for (var i = 0; i < moves.removes.length; i++) {
      remove = moves.removes[i];
      node = childNodes[remove.from];

      if (remove.key) {
        keyMap[remove.key] = node;
      }

      domNode.removeChild(node);
    }

    var length = childNodes.length;

    for (var j = 0; j < moves.inserts.length; j++) {
      insert = moves.inserts[j];
      node = keyMap[insert.key]; // this is the weirdest bug i've ever seen in webkit

      domNode.insertBefore(node, insert.to >= length++ ? null : childNodes[insert.to]);
    }
  }

  function replaceRoot(oldRoot, newRoot) {
    if (oldRoot && newRoot && oldRoot !== newRoot && oldRoot.parentNode) {
      oldRoot.parentNode.replaceChild(newRoot, oldRoot);
    }

    return newRoot;
  }

  var patch_1 = patch;

  function patch(rootNode, patches, renderOptions) {
    renderOptions = renderOptions || {};
    renderOptions.patch = renderOptions.patch && renderOptions.patch !== patch ? renderOptions.patch : patchRecursive;
    renderOptions.render = renderOptions.render || createElement_1;
    return renderOptions.patch(rootNode, patches, renderOptions);
  }

  function patchRecursive(rootNode, patches, renderOptions) {
    var indices = patchIndices(patches);

    if (indices.length === 0) {
      return rootNode;
    }

    var index = domIndex_1(rootNode, patches.a, indices);
    var ownerDocument = rootNode.ownerDocument;

    if (!renderOptions.document && ownerDocument !== document_1) {
      renderOptions.document = ownerDocument;
    }

    for (var i = 0; i < indices.length; i++) {
      var nodeIndex = indices[i];
      rootNode = applyPatch$1(rootNode, index[nodeIndex], patches[nodeIndex], renderOptions);
    }

    return rootNode;
  }

  function applyPatch$1(rootNode, domNode, patchList, renderOptions) {
    if (!domNode) {
      return rootNode;
    }

    var newNode;

    if (xIsArray(patchList)) {
      for (var i = 0; i < patchList.length; i++) {
        newNode = patchOp(patchList[i], domNode, renderOptions);

        if (domNode === rootNode) {
          rootNode = newNode;
        }
      }
    } else {
      newNode = patchOp(patchList, domNode, renderOptions);

      if (domNode === rootNode) {
        rootNode = newNode;
      }
    }

    return rootNode;
  }

  function patchIndices(patches) {
    var indices = [];

    for (var key in patches) {
      if (key !== "a") {
        indices.push(Number(key));
      }
    }

    return indices;
  }

  var patch_1$1 = patch_1;

  var udc = createCommonjsModule(function (module, exports) {
  (function (root, factory) {

    {
      module.exports = factory();
    }
  })(commonjsGlobal, function () {
    var functionPropertyFilter = ["caller", "arguments"]; // Node.js has a lot of silly enumeral properties on its "TypedArray" implementation

    var typedArrayPropertyFilter = ['BYTES_PER_ELEMENT', 'get', 'set', 'slice', 'subarray', 'buffer', 'length', 'byteOffset', 'byteLength'];
    var primitiveCloner = makeCloner(clonePrimitive);
    var typedArrayCloner = makeRecursiveCloner(makeCloner(cloneTypedArray), typedArrayPropertyFilter);

    function typeString(type) {
      return '[object ' + type + ']';
    }

    var cloneFunctions = {};
    cloneFunctions[typeString('RegExp')] = makeCloner(cloneRegExp);
    cloneFunctions[typeString('Date')] = makeCloner(cloneDate);
    cloneFunctions[typeString('Function')] = makeRecursiveCloner(makeCloner(cloneFunction), functionPropertyFilter);
    cloneFunctions[typeString('Object')] = makeRecursiveCloner(makeCloner(cloneObject));
    cloneFunctions[typeString('Array')] = makeRecursiveCloner(makeCloner(cloneArray));
    ['Null', 'Undefined', 'Number', 'String', 'Boolean'].map(typeString).forEach(function (type) {
      cloneFunctions[type] = primitiveCloner;
    });
    ['Int8Array', 'Uint8Array', 'Uint8ClampedArray', 'Int16Array', 'Uint16Array', 'Int32Array', 'Uint32Array', 'Float32Array', 'Float64Array'].map(typeString).forEach(function (type) {
      cloneFunctions[type] = typedArrayCloner;
    });

    function makeArguments(numberOfArgs) {
      var letters = [];

      for (var i = 1; i <= numberOfArgs; i++) {
        letters.push("arg" + i);
      }

      return letters;
    }

    function wrapFunctionWithArity(callback) {
      var argList = makeArguments(callback.length);
      var functionCode = 'return false || function ';
      functionCode += callback.name + '(';
      functionCode += argList.join(', ') + ') {\n';
      functionCode += 'return fn.apply(this, arguments);\n';
      functionCode += '};';
      return Function("fn", functionCode)(callback);
    }

    function makeCloner(cloneThing) {
      return function (thing, thingStack, copyStack) {
        thingStack.push(thing);
        var copy = cloneThing(thing);
        copyStack.push(copy);
        return copy;
      };
    }

    function clonePrimitive(primitive) {
      return primitive;
    }

    function cloneRegExp(regexp) {
      return new RegExp(regexp);
    }

    function cloneDate(date) {
      return new Date(date.getTime());
    } // We can't really clone functions but we can wrap them in a new function that will
    // recieve clones of any properties the original function may have had


    function cloneFunction(fn) {
      return wrapFunctionWithArity(fn);
    } // This will not properly clone `constructed` objects because
    // it is impossible to know with what arguments the constructor
    // was originally invoked.


    function cloneObject(object) {
      return Object.create(Object.getPrototypeOf(object));
    }

    function cloneArray(array) {
      return [];
    }

    function cloneTypedArray(typedArray) {
      var len = typedArray.length;
      return new typedArray.constructor(len);
    }

    function makeRecursiveCloner(cloneThing, propertyFilter) {
      return function (thing, thingStack, copyStack) {
        var clone = this;
        return Object.getOwnPropertyNames(thing).filter(function (prop) {
          return !propertyFilter || propertyFilter.indexOf(prop) === -1;
        }).reduce(function (copy, prop) {
          var thingOffset = thingStack.indexOf(thing[prop]);

          if (thingOffset === -1) {
            copy[prop] = clone(thing[prop]);
          } else {
            copy[prop] = copyStack[thingOffset];
          }

          return copy;
        }, cloneThing(thing, thingStack, copyStack));
      };
    }

    return function _ultraDeepClone(source) {
      var thingStack = [];
      var copyStack = [];

      function clone(thing) {
        var typeOfThing = Object.prototype.toString.call(thing);
        return cloneFunctions[typeOfThing].call(clone, thing, thingStack, copyStack);
      }
      return clone(source);
    };
  });
  });

  class Instrument {
    constructor() {}

    start() {
      this.started = new Date().getTime();
    }

    end() {
      this.ended = new Date().getTime();
      return this.ended - this.started;
    }

  }

  /*!
   * escape-html
   * Copyright(c) 2012-2013 TJ Holowaychuk
   * Copyright(c) 2015 Andreas Lubbe
   * Copyright(c) 2015 Tiancheng "Timothy" Gu
   * MIT Licensed
   */
  /**
   * Module variables.
   * @private
   */

  var matchHtmlRegExp = /["'&<>]/;
  /**
   * Module exports.
   * @public
   */

  var escapeHtml_1 = escapeHtml;
  /**
   * Escape special characters in the given string of html.
   *
   * @param  {string} string The string to escape for inserting into HTML
   * @return {string}
   * @public
   */

  function escapeHtml(string) {
    var str = '' + string;
    var match = matchHtmlRegExp.exec(str);

    if (!match) {
      return str;
    }

    var escape;
    var html = '';
    var index = 0;
    var lastIndex = 0;

    for (index = match.index; index < str.length; index++) {
      switch (str.charCodeAt(index)) {
        case 34:
          // "
          escape = '&quot;';
          break;

        case 38:
          // &
          escape = '&amp;';
          break;

        case 39:
          // '
          escape = '&#39;';
          break;

        case 60:
          // <
          escape = '&lt;';
          break;

        case 62:
          // >
          escape = '&gt;';
          break;

        default:
          continue;
      }

      if (lastIndex !== index) {
        html += str.substring(lastIndex, index);
      }

      lastIndex = index + 1;
      html += escape;
    }

    return lastIndex !== index ? html + str.substring(lastIndex, index) : html;
  }

  var immutable = extend;
  var hasOwnProperty = Object.prototype.hasOwnProperty;

  function extend() {
    var target = {};

    for (var i = 0; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  }

  var softSetHook = SoftSetHook;

  function SoftSetHook(value) {
    if (!(this instanceof SoftSetHook)) {
      return new SoftSetHook(value);
    }

    this.value = value;
  }

  SoftSetHook.prototype.hook = function (node, propertyName) {
    if (node[propertyName] !== this.value) {
      node[propertyName] = this.value;
    }
  };

  var attributeHook = AttributeHook;

  function AttributeHook(namespace, value) {
    if (!(this instanceof AttributeHook)) {
      return new AttributeHook(namespace, value);
    }

    this.namespace = namespace;
    this.value = value;
  }

  AttributeHook.prototype.hook = function (node, prop, prev) {
    if (prev && prev.type === 'AttributeHook' && prev.value === this.value && prev.namespace === this.namespace) {
      return;
    }

    node.setAttributeNS(this.namespace, prop, this.value);
  };

  AttributeHook.prototype.unhook = function (node, prop, next) {
    if (next && next.type === 'AttributeHook' && next.namespace === this.namespace) {
      return;
    }

    var colonPosition = prop.indexOf(':');
    var localName = colonPosition > -1 ? prop.substr(colonPosition + 1) : prop;
    node.removeAttributeNS(this.namespace, localName);
  };

  AttributeHook.prototype.type = 'AttributeHook';

  /**
   * Special language-specific overrides.
   *
   * Source: ftp://ftp.unicode.org/Public/UCD/latest/ucd/SpecialCasing.txt
   *
   * @type {Object}
   */
  var LANGUAGES = {
    tr: {
      regexp: /\u0130|\u0049|\u0049\u0307/g,
      map: {
        '\u0130': '\u0069',
        '\u0049': '\u0131',
        '\u0049\u0307': '\u0069'
      }
    },
    az: {
      regexp: /[\u0130]/g,
      map: {
        '\u0130': '\u0069',
        '\u0049': '\u0131',
        '\u0049\u0307': '\u0069'
      }
    },
    lt: {
      regexp: /[\u0049\u004A\u012E\u00CC\u00CD\u0128]/g,
      map: {
        '\u0049': '\u0069\u0307',
        '\u004A': '\u006A\u0307',
        '\u012E': '\u012F\u0307',
        '\u00CC': '\u0069\u0307\u0300',
        '\u00CD': '\u0069\u0307\u0301',
        '\u0128': '\u0069\u0307\u0303'
      }
    }
  };
  /**
   * Lowercase a string.
   *
   * @param  {String} str
   * @return {String}
   */

  var lowerCase = function (str, locale) {
    var lang = LANGUAGES[locale];
    str = str == null ? '' : String(str);

    if (lang) {
      str = str.replace(lang.regexp, function (m) {
        return lang.map[m];
      });
    }

    return str.toLowerCase();
  };

  var nonWordRegexp = /[^\u0041-\u005A\u0061-\u007A\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC\u0030-\u0039\u00B2\u00B3\u00B9\u00BC-\u00BE\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u09F4-\u09F9\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0B72-\u0B77\u0BE6-\u0BF2\u0C66-\u0C6F\u0C78-\u0C7E\u0CE6-\u0CEF\u0D66-\u0D75\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F33\u1040-\u1049\u1090-\u1099\u1369-\u137C\u16EE-\u16F0\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1946-\u194F\u19D0-\u19DA\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\u2070\u2074-\u2079\u2080-\u2089\u2150-\u2182\u2185-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2CFD\u3007\u3021-\u3029\u3038-\u303A\u3192-\u3195\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\uA620-\uA629\uA6E6-\uA6EF\uA830-\uA835\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19]+/g;

  var camelCaseRegexp = /([\u0061-\u007A\u00B5\u00DF-\u00F6\u00F8-\u00FF\u0101\u0103\u0105\u0107\u0109\u010B\u010D\u010F\u0111\u0113\u0115\u0117\u0119\u011B\u011D\u011F\u0121\u0123\u0125\u0127\u0129\u012B\u012D\u012F\u0131\u0133\u0135\u0137\u0138\u013A\u013C\u013E\u0140\u0142\u0144\u0146\u0148\u0149\u014B\u014D\u014F\u0151\u0153\u0155\u0157\u0159\u015B\u015D\u015F\u0161\u0163\u0165\u0167\u0169\u016B\u016D\u016F\u0171\u0173\u0175\u0177\u017A\u017C\u017E-\u0180\u0183\u0185\u0188\u018C\u018D\u0192\u0195\u0199-\u019B\u019E\u01A1\u01A3\u01A5\u01A8\u01AA\u01AB\u01AD\u01B0\u01B4\u01B6\u01B9\u01BA\u01BD-\u01BF\u01C6\u01C9\u01CC\u01CE\u01D0\u01D2\u01D4\u01D6\u01D8\u01DA\u01DC\u01DD\u01DF\u01E1\u01E3\u01E5\u01E7\u01E9\u01EB\u01ED\u01EF\u01F0\u01F3\u01F5\u01F9\u01FB\u01FD\u01FF\u0201\u0203\u0205\u0207\u0209\u020B\u020D\u020F\u0211\u0213\u0215\u0217\u0219\u021B\u021D\u021F\u0221\u0223\u0225\u0227\u0229\u022B\u022D\u022F\u0231\u0233-\u0239\u023C\u023F\u0240\u0242\u0247\u0249\u024B\u024D\u024F-\u0293\u0295-\u02AF\u0371\u0373\u0377\u037B-\u037D\u0390\u03AC-\u03CE\u03D0\u03D1\u03D5-\u03D7\u03D9\u03DB\u03DD\u03DF\u03E1\u03E3\u03E5\u03E7\u03E9\u03EB\u03ED\u03EF-\u03F3\u03F5\u03F8\u03FB\u03FC\u0430-\u045F\u0461\u0463\u0465\u0467\u0469\u046B\u046D\u046F\u0471\u0473\u0475\u0477\u0479\u047B\u047D\u047F\u0481\u048B\u048D\u048F\u0491\u0493\u0495\u0497\u0499\u049B\u049D\u049F\u04A1\u04A3\u04A5\u04A7\u04A9\u04AB\u04AD\u04AF\u04B1\u04B3\u04B5\u04B7\u04B9\u04BB\u04BD\u04BF\u04C2\u04C4\u04C6\u04C8\u04CA\u04CC\u04CE\u04CF\u04D1\u04D3\u04D5\u04D7\u04D9\u04DB\u04DD\u04DF\u04E1\u04E3\u04E5\u04E7\u04E9\u04EB\u04ED\u04EF\u04F1\u04F3\u04F5\u04F7\u04F9\u04FB\u04FD\u04FF\u0501\u0503\u0505\u0507\u0509\u050B\u050D\u050F\u0511\u0513\u0515\u0517\u0519\u051B\u051D\u051F\u0521\u0523\u0525\u0527\u0561-\u0587\u1D00-\u1D2B\u1D6B-\u1D77\u1D79-\u1D9A\u1E01\u1E03\u1E05\u1E07\u1E09\u1E0B\u1E0D\u1E0F\u1E11\u1E13\u1E15\u1E17\u1E19\u1E1B\u1E1D\u1E1F\u1E21\u1E23\u1E25\u1E27\u1E29\u1E2B\u1E2D\u1E2F\u1E31\u1E33\u1E35\u1E37\u1E39\u1E3B\u1E3D\u1E3F\u1E41\u1E43\u1E45\u1E47\u1E49\u1E4B\u1E4D\u1E4F\u1E51\u1E53\u1E55\u1E57\u1E59\u1E5B\u1E5D\u1E5F\u1E61\u1E63\u1E65\u1E67\u1E69\u1E6B\u1E6D\u1E6F\u1E71\u1E73\u1E75\u1E77\u1E79\u1E7B\u1E7D\u1E7F\u1E81\u1E83\u1E85\u1E87\u1E89\u1E8B\u1E8D\u1E8F\u1E91\u1E93\u1E95-\u1E9D\u1E9F\u1EA1\u1EA3\u1EA5\u1EA7\u1EA9\u1EAB\u1EAD\u1EAF\u1EB1\u1EB3\u1EB5\u1EB7\u1EB9\u1EBB\u1EBD\u1EBF\u1EC1\u1EC3\u1EC5\u1EC7\u1EC9\u1ECB\u1ECD\u1ECF\u1ED1\u1ED3\u1ED5\u1ED7\u1ED9\u1EDB\u1EDD\u1EDF\u1EE1\u1EE3\u1EE5\u1EE7\u1EE9\u1EEB\u1EED\u1EEF\u1EF1\u1EF3\u1EF5\u1EF7\u1EF9\u1EFB\u1EFD\u1EFF-\u1F07\u1F10-\u1F15\u1F20-\u1F27\u1F30-\u1F37\u1F40-\u1F45\u1F50-\u1F57\u1F60-\u1F67\u1F70-\u1F7D\u1F80-\u1F87\u1F90-\u1F97\u1FA0-\u1FA7\u1FB0-\u1FB4\u1FB6\u1FB7\u1FBE\u1FC2-\u1FC4\u1FC6\u1FC7\u1FD0-\u1FD3\u1FD6\u1FD7\u1FE0-\u1FE7\u1FF2-\u1FF4\u1FF6\u1FF7\u210A\u210E\u210F\u2113\u212F\u2134\u2139\u213C\u213D\u2146-\u2149\u214E\u2184\u2C30-\u2C5E\u2C61\u2C65\u2C66\u2C68\u2C6A\u2C6C\u2C71\u2C73\u2C74\u2C76-\u2C7B\u2C81\u2C83\u2C85\u2C87\u2C89\u2C8B\u2C8D\u2C8F\u2C91\u2C93\u2C95\u2C97\u2C99\u2C9B\u2C9D\u2C9F\u2CA1\u2CA3\u2CA5\u2CA7\u2CA9\u2CAB\u2CAD\u2CAF\u2CB1\u2CB3\u2CB5\u2CB7\u2CB9\u2CBB\u2CBD\u2CBF\u2CC1\u2CC3\u2CC5\u2CC7\u2CC9\u2CCB\u2CCD\u2CCF\u2CD1\u2CD3\u2CD5\u2CD7\u2CD9\u2CDB\u2CDD\u2CDF\u2CE1\u2CE3\u2CE4\u2CEC\u2CEE\u2CF3\u2D00-\u2D25\u2D27\u2D2D\uA641\uA643\uA645\uA647\uA649\uA64B\uA64D\uA64F\uA651\uA653\uA655\uA657\uA659\uA65B\uA65D\uA65F\uA661\uA663\uA665\uA667\uA669\uA66B\uA66D\uA681\uA683\uA685\uA687\uA689\uA68B\uA68D\uA68F\uA691\uA693\uA695\uA697\uA723\uA725\uA727\uA729\uA72B\uA72D\uA72F-\uA731\uA733\uA735\uA737\uA739\uA73B\uA73D\uA73F\uA741\uA743\uA745\uA747\uA749\uA74B\uA74D\uA74F\uA751\uA753\uA755\uA757\uA759\uA75B\uA75D\uA75F\uA761\uA763\uA765\uA767\uA769\uA76B\uA76D\uA76F\uA771-\uA778\uA77A\uA77C\uA77F\uA781\uA783\uA785\uA787\uA78C\uA78E\uA791\uA793\uA7A1\uA7A3\uA7A5\uA7A7\uA7A9\uA7FA\uFB00-\uFB06\uFB13-\uFB17\uFF41-\uFF5A])([\u0041-\u005A\u00C0-\u00D6\u00D8-\u00DE\u0100\u0102\u0104\u0106\u0108\u010A\u010C\u010E\u0110\u0112\u0114\u0116\u0118\u011A\u011C\u011E\u0120\u0122\u0124\u0126\u0128\u012A\u012C\u012E\u0130\u0132\u0134\u0136\u0139\u013B\u013D\u013F\u0141\u0143\u0145\u0147\u014A\u014C\u014E\u0150\u0152\u0154\u0156\u0158\u015A\u015C\u015E\u0160\u0162\u0164\u0166\u0168\u016A\u016C\u016E\u0170\u0172\u0174\u0176\u0178\u0179\u017B\u017D\u0181\u0182\u0184\u0186\u0187\u0189-\u018B\u018E-\u0191\u0193\u0194\u0196-\u0198\u019C\u019D\u019F\u01A0\u01A2\u01A4\u01A6\u01A7\u01A9\u01AC\u01AE\u01AF\u01B1-\u01B3\u01B5\u01B7\u01B8\u01BC\u01C4\u01C7\u01CA\u01CD\u01CF\u01D1\u01D3\u01D5\u01D7\u01D9\u01DB\u01DE\u01E0\u01E2\u01E4\u01E6\u01E8\u01EA\u01EC\u01EE\u01F1\u01F4\u01F6-\u01F8\u01FA\u01FC\u01FE\u0200\u0202\u0204\u0206\u0208\u020A\u020C\u020E\u0210\u0212\u0214\u0216\u0218\u021A\u021C\u021E\u0220\u0222\u0224\u0226\u0228\u022A\u022C\u022E\u0230\u0232\u023A\u023B\u023D\u023E\u0241\u0243-\u0246\u0248\u024A\u024C\u024E\u0370\u0372\u0376\u0386\u0388-\u038A\u038C\u038E\u038F\u0391-\u03A1\u03A3-\u03AB\u03CF\u03D2-\u03D4\u03D8\u03DA\u03DC\u03DE\u03E0\u03E2\u03E4\u03E6\u03E8\u03EA\u03EC\u03EE\u03F4\u03F7\u03F9\u03FA\u03FD-\u042F\u0460\u0462\u0464\u0466\u0468\u046A\u046C\u046E\u0470\u0472\u0474\u0476\u0478\u047A\u047C\u047E\u0480\u048A\u048C\u048E\u0490\u0492\u0494\u0496\u0498\u049A\u049C\u049E\u04A0\u04A2\u04A4\u04A6\u04A8\u04AA\u04AC\u04AE\u04B0\u04B2\u04B4\u04B6\u04B8\u04BA\u04BC\u04BE\u04C0\u04C1\u04C3\u04C5\u04C7\u04C9\u04CB\u04CD\u04D0\u04D2\u04D4\u04D6\u04D8\u04DA\u04DC\u04DE\u04E0\u04E2\u04E4\u04E6\u04E8\u04EA\u04EC\u04EE\u04F0\u04F2\u04F4\u04F6\u04F8\u04FA\u04FC\u04FE\u0500\u0502\u0504\u0506\u0508\u050A\u050C\u050E\u0510\u0512\u0514\u0516\u0518\u051A\u051C\u051E\u0520\u0522\u0524\u0526\u0531-\u0556\u10A0-\u10C5\u10C7\u10CD\u1E00\u1E02\u1E04\u1E06\u1E08\u1E0A\u1E0C\u1E0E\u1E10\u1E12\u1E14\u1E16\u1E18\u1E1A\u1E1C\u1E1E\u1E20\u1E22\u1E24\u1E26\u1E28\u1E2A\u1E2C\u1E2E\u1E30\u1E32\u1E34\u1E36\u1E38\u1E3A\u1E3C\u1E3E\u1E40\u1E42\u1E44\u1E46\u1E48\u1E4A\u1E4C\u1E4E\u1E50\u1E52\u1E54\u1E56\u1E58\u1E5A\u1E5C\u1E5E\u1E60\u1E62\u1E64\u1E66\u1E68\u1E6A\u1E6C\u1E6E\u1E70\u1E72\u1E74\u1E76\u1E78\u1E7A\u1E7C\u1E7E\u1E80\u1E82\u1E84\u1E86\u1E88\u1E8A\u1E8C\u1E8E\u1E90\u1E92\u1E94\u1E9E\u1EA0\u1EA2\u1EA4\u1EA6\u1EA8\u1EAA\u1EAC\u1EAE\u1EB0\u1EB2\u1EB4\u1EB6\u1EB8\u1EBA\u1EBC\u1EBE\u1EC0\u1EC2\u1EC4\u1EC6\u1EC8\u1ECA\u1ECC\u1ECE\u1ED0\u1ED2\u1ED4\u1ED6\u1ED8\u1EDA\u1EDC\u1EDE\u1EE0\u1EE2\u1EE4\u1EE6\u1EE8\u1EEA\u1EEC\u1EEE\u1EF0\u1EF2\u1EF4\u1EF6\u1EF8\u1EFA\u1EFC\u1EFE\u1F08-\u1F0F\u1F18-\u1F1D\u1F28-\u1F2F\u1F38-\u1F3F\u1F48-\u1F4D\u1F59\u1F5B\u1F5D\u1F5F\u1F68-\u1F6F\u1FB8-\u1FBB\u1FC8-\u1FCB\u1FD8-\u1FDB\u1FE8-\u1FEC\u1FF8-\u1FFB\u2102\u2107\u210B-\u210D\u2110-\u2112\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u2130-\u2133\u213E\u213F\u2145\u2183\u2C00-\u2C2E\u2C60\u2C62-\u2C64\u2C67\u2C69\u2C6B\u2C6D-\u2C70\u2C72\u2C75\u2C7E-\u2C80\u2C82\u2C84\u2C86\u2C88\u2C8A\u2C8C\u2C8E\u2C90\u2C92\u2C94\u2C96\u2C98\u2C9A\u2C9C\u2C9E\u2CA0\u2CA2\u2CA4\u2CA6\u2CA8\u2CAA\u2CAC\u2CAE\u2CB0\u2CB2\u2CB4\u2CB6\u2CB8\u2CBA\u2CBC\u2CBE\u2CC0\u2CC2\u2CC4\u2CC6\u2CC8\u2CCA\u2CCC\u2CCE\u2CD0\u2CD2\u2CD4\u2CD6\u2CD8\u2CDA\u2CDC\u2CDE\u2CE0\u2CE2\u2CEB\u2CED\u2CF2\uA640\uA642\uA644\uA646\uA648\uA64A\uA64C\uA64E\uA650\uA652\uA654\uA656\uA658\uA65A\uA65C\uA65E\uA660\uA662\uA664\uA666\uA668\uA66A\uA66C\uA680\uA682\uA684\uA686\uA688\uA68A\uA68C\uA68E\uA690\uA692\uA694\uA696\uA722\uA724\uA726\uA728\uA72A\uA72C\uA72E\uA732\uA734\uA736\uA738\uA73A\uA73C\uA73E\uA740\uA742\uA744\uA746\uA748\uA74A\uA74C\uA74E\uA750\uA752\uA754\uA756\uA758\uA75A\uA75C\uA75E\uA760\uA762\uA764\uA766\uA768\uA76A\uA76C\uA76E\uA779\uA77B\uA77D\uA77E\uA780\uA782\uA784\uA786\uA78B\uA78D\uA790\uA792\uA7A0\uA7A2\uA7A4\uA7A6\uA7A8\uA7AA\uFF21-\uFF3A\u0030-\u0039\u00B2\u00B3\u00B9\u00BC-\u00BE\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u09F4-\u09F9\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0B72-\u0B77\u0BE6-\u0BF2\u0C66-\u0C6F\u0C78-\u0C7E\u0CE6-\u0CEF\u0D66-\u0D75\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F33\u1040-\u1049\u1090-\u1099\u1369-\u137C\u16EE-\u16F0\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1946-\u194F\u19D0-\u19DA\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\u2070\u2074-\u2079\u2080-\u2089\u2150-\u2182\u2185-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2CFD\u3007\u3021-\u3029\u3038-\u303A\u3192-\u3195\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\uA620-\uA629\uA6E6-\uA6EF\uA830-\uA835\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19])/g;

  var trailingDigitRegexp = /([\u0030-\u0039\u00B2\u00B3\u00B9\u00BC-\u00BE\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u09F4-\u09F9\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0B72-\u0B77\u0BE6-\u0BF2\u0C66-\u0C6F\u0C78-\u0C7E\u0CE6-\u0CEF\u0D66-\u0D75\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F33\u1040-\u1049\u1090-\u1099\u1369-\u137C\u16EE-\u16F0\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1946-\u194F\u19D0-\u19DA\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\u2070\u2074-\u2079\u2080-\u2089\u2150-\u2182\u2185-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2CFD\u3007\u3021-\u3029\u3038-\u303A\u3192-\u3195\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\uA620-\uA629\uA6E6-\uA6EF\uA830-\uA835\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19])([^\u0030-\u0039\u00B2\u00B3\u00B9\u00BC-\u00BE\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u09F4-\u09F9\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0B72-\u0B77\u0BE6-\u0BF2\u0C66-\u0C6F\u0C78-\u0C7E\u0CE6-\u0CEF\u0D66-\u0D75\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F33\u1040-\u1049\u1090-\u1099\u1369-\u137C\u16EE-\u16F0\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1946-\u194F\u19D0-\u19DA\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\u2070\u2074-\u2079\u2080-\u2089\u2150-\u2182\u2185-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2CFD\u3007\u3021-\u3029\u3038-\u303A\u3192-\u3195\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\uA620-\uA629\uA6E6-\uA6EF\uA830-\uA835\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19])/g;

  /**
   * Sentence case a string.
   *
   * @param  {String} str
   * @param  {String} locale
   * @param  {String} replacement
   * @return {String}
   */


  var sentenceCase = function (str, locale, replacement) {
    if (str == null) {
      return '';
    }

    replacement = replacement || ' ';

    function replace(match, index, string) {
      if (index === 0 || index === string.length - match.length) {
        return '';
      }

      return replacement;
    }

    str = String(str) // Support camel case ("camelCase" -> "camel Case").
    .replace(camelCaseRegexp, '$1 $2') // Support digit groups ("test2012" -> "test 2012").
    .replace(trailingDigitRegexp, '$1 $2') // Remove all non-word characters and replace with a single space.
    .replace(nonWordRegexp, replace); // Lower case the entire string.

    return lowerCase(str, locale);
  };

  /**
   * Param case a string.
   *
   * @param  {String} string
   * @param  {String} [locale]
   * @return {String}
   */


  var paramCase = function (string, locale) {
    return sentenceCase(string, locale, '-');
  };

  /**
   * Attribute types.
   */
  var types = {
    BOOLEAN: 1,
    OVERLOADED_BOOLEAN: 2
  };
  /**
   * Properties.
   *
   * Taken from https://github.com/facebook/react/blob/847357e42e5267b04dd6e297219eaa125ab2f9f4/src/browser/ui/dom/HTMLDOMPropertyConfig.js
   *
   */

  var properties$1 = {
    /**
     * Standard Properties
     */
    accept: true,
    acceptCharset: true,
    accessKey: true,
    action: true,
    allowFullScreen: types.BOOLEAN,
    allowTransparency: true,
    alt: true,
    async: types.BOOLEAN,
    autocomplete: true,
    autofocus: types.BOOLEAN,
    autoplay: types.BOOLEAN,
    cellPadding: true,
    cellSpacing: true,
    charset: true,
    checked: types.BOOLEAN,
    classID: true,
    className: true,
    cols: true,
    colSpan: true,
    content: true,
    contentEditable: true,
    contextMenu: true,
    controls: types.BOOLEAN,
    coords: true,
    crossOrigin: true,
    data: true,
    // For `<object />` acts as `src`.
    dateTime: true,
    defer: types.BOOLEAN,
    dir: true,
    disabled: types.BOOLEAN,
    download: types.OVERLOADED_BOOLEAN,
    draggable: true,
    enctype: true,
    form: true,
    formAction: true,
    formEncType: true,
    formMethod: true,
    formNoValidate: types.BOOLEAN,
    formTarget: true,
    frameBorder: true,
    headers: true,
    height: true,
    hidden: types.BOOLEAN,
    href: true,
    hreflang: true,
    htmlFor: true,
    httpEquiv: true,
    icon: true,
    id: true,
    label: true,
    lang: true,
    list: true,
    loop: types.BOOLEAN,
    manifest: true,
    marginHeight: true,
    marginWidth: true,
    max: true,
    maxLength: true,
    media: true,
    mediaGroup: true,
    method: true,
    min: true,
    multiple: types.BOOLEAN,
    muted: types.BOOLEAN,
    name: true,
    noValidate: types.BOOLEAN,
    open: true,
    pattern: true,
    placeholder: true,
    poster: true,
    preload: true,
    radiogroup: true,
    readOnly: types.BOOLEAN,
    rel: true,
    required: types.BOOLEAN,
    role: true,
    rows: true,
    rowSpan: true,
    sandbox: true,
    scope: true,
    scrolling: true,
    seamless: types.BOOLEAN,
    selected: types.BOOLEAN,
    shape: true,
    size: true,
    sizes: true,
    span: true,
    spellcheck: true,
    src: true,
    srcdoc: true,
    srcset: true,
    start: true,
    step: true,
    style: true,
    tabIndex: true,
    target: true,
    title: true,
    type: true,
    useMap: true,
    value: true,
    width: true,
    wmode: true,

    /**
     * Non-standard Properties
     */
    // autoCapitalize and autoCorrect are supported in Mobile Safari for
    // keyboard hints.
    autocapitalize: true,
    autocorrect: true,
    // itemProp, itemScope, itemType are for Microdata support. See
    // http://schema.org/docs/gs.html
    itemProp: true,
    itemScope: types.BOOLEAN,
    itemType: true,
    // property is supported for OpenGraph in meta tags.
    property: true
  };
  /**
   * Properties to attributes mapping.
   *
   * The ones not here are simply converted to lower case.
   */

  var attributeNames = {
    acceptCharset: 'accept-charset',
    className: 'class',
    htmlFor: 'for',
    httpEquiv: 'http-equiv'
  };
  /**
   * Exports.
   */

  var propertyConfig = {
    attributeTypes: types,
    properties: properties$1,
    attributeNames: attributeNames
  };

  var types$1 = propertyConfig.attributeTypes;
  var properties$2 = propertyConfig.properties;
  var attributeNames$1 = propertyConfig.attributeNames;
  var prefixAttribute = memoizeString(function (name) {
    return escapeHtml_1(name) + '="';
  });
  var createAttribute_1 = createAttribute;
  /**
   * Create attribute string.
   *
   * @param {String} name The name of the property or attribute
   * @param {*} value The value
   * @param {Boolean} [isAttribute] Denotes whether `name` is an attribute.
   * @return {?String} Attribute string || null if not a valid property or custom attribute.
   */

  function createAttribute(name, value, isAttribute) {
    if (properties$2.hasOwnProperty(name)) {
      if (shouldSkip(name, value)) return '';
      name = (attributeNames$1[name] || name).toLowerCase();
      var attrType = properties$2[name]; // for BOOLEAN `value` only has to be truthy
      // for OVERLOADED_BOOLEAN `value` has to be === true

      if (attrType === types$1.BOOLEAN || attrType === types$1.OVERLOADED_BOOLEAN && value === true) {
        return escapeHtml_1(name);
      }

      return prefixAttribute(name) + escapeHtml_1(value) + '"';
    } else if (isAttribute) {
      if (value == null) return '';
      return prefixAttribute(name) + escapeHtml_1(value) + '"';
    } // return null if `name` is neither a valid property nor an attribute


    return null;
  }
  /**
   * Should skip false boolean attributes.
   */


  function shouldSkip(name, value) {
    var attrType = properties$2[name];
    return value == null || attrType === types$1.BOOLEAN && !value || attrType === types$1.OVERLOADED_BOOLEAN && value === false;
  }
  /**
   * Memoizes the return value of a function that accepts one string argument.
   *
   * @param {function} callback
   * @return {function}
   */


  function memoizeString(callback) {
    var cache = {};
    return function (string) {
      if (cache.hasOwnProperty(string)) {
        return cache[string];
      } else {
        return cache[string] = callback.call(this, string);
      }
    };
  }

  /**
   * Void elements.
   *
   * https://github.com/facebook/react/blob/v0.12.0/src/browser/ui/ReactDOMComponent.js#L99
   */
  var voidElements$1 = {
    'area': true,
    'base': true,
    'br': true,
    'col': true,
    'embed': true,
    'hr': true,
    'img': true,
    'input': true,
    'keygen': true,
    'link': true,
    'meta': true,
    'param': true,
    'source': true,
    'track': true,
    'wbr': true
  };

  var vdomToHtml = toHTML;

  function toHTML(node, parent) {
    if (!node) return '';

    if (isThunk_1(node)) {
      node = node.render();
    }

    if (isWidget_1(node) && node.render) {
      node = node.render();
    }

    if (isVnode(node)) {
      return openTag(node) + tagContent(node) + closeTag(node);
    } else if (isVtext(node)) {
      if (parent && (parent.tagName.toLowerCase() === 'script' || parent.tagName.toLowerCase() === 'style')) return String(node.text);
      return escapeHtml_1(String(node.text));
    }

    return '';
  }

  function openTag(node) {
    var props = node.properties;
    var ret = '<' + node.tagName.toLowerCase();

    for (var name in props) {
      var value = props[name];
      if (value == null) continue;

      if (name == 'attributes') {
        value = immutable({}, value);

        for (var attrProp in value) {
          ret += ' ' + createAttribute_1(attrProp, value[attrProp], true);
        }

        continue;
      }

      if (name == 'dataset') {
        value = immutable({}, value);

        for (var dataProp in value) {
          ret += ' ' + createAttribute_1('data-' + paramCase(dataProp), value[dataProp], true);
        }

        continue;
      }

      if (name == 'style') {
        var css = '';
        value = immutable({}, value);

        for (var styleProp in value) {
          css += paramCase(styleProp) + ': ' + value[styleProp] + '; ';
        }

        value = css.trim();
      }

      if (value instanceof softSetHook || value instanceof attributeHook) {
        ret += ' ' + createAttribute_1(name, value.value, true);
        continue;
      }

      var attr = createAttribute_1(name, value);
      if (attr) ret += ' ' + attr;
    }

    return ret + '>';
  }

  function tagContent(node) {
    var innerHTML = node.properties.innerHTML;
    if (innerHTML != null) return innerHTML;else {
      var ret = '';

      if (node.children && node.children.length) {
        for (var i = 0, l = node.children.length; i < l; i++) {
          var child = node.children[i];
          ret += toHTML(child, node);
        }
      }

      return ret;
    }
  }

  function closeTag(node) {
    var tag = node.tagName.toLowerCase();
    return voidElements$1[tag] ? '' : '</' + tag + '>';
  }

  /**
   * property-map.js
   *
   * Necessary to map dom attributes back to vdom properties
   */

  var properties$3 = {
    'abbr': 'abbr',
    'accept': 'accept',
    'accept-charset': 'acceptCharset',
    'accesskey': 'accessKey',
    'action': 'action',
    'allowfullscreen': 'allowFullScreen',
    'allowtransparency': 'allowTransparency',
    'alt': 'alt',
    'async': 'async',
    'autocomplete': 'autoComplete',
    'autofocus': 'autoFocus',
    'autoplay': 'autoPlay',
    'cellpadding': 'cellPadding',
    'cellspacing': 'cellSpacing',
    'challenge': 'challenge',
    'charset': 'charset',
    'checked': 'checked',
    'cite': 'cite',
    'class': 'className',
    'cols': 'cols',
    'colspan': 'colSpan',
    'command': 'command',
    'content': 'content',
    'contenteditable': 'contentEditable',
    'contextmenu': 'contextMenu',
    'controls': 'controls',
    'coords': 'coords',
    'crossorigin': 'crossOrigin',
    'data': 'data',
    'datetime': 'dateTime',
    'default': 'default',
    'defer': 'defer',
    'dir': 'dir',
    'disabled': 'disabled',
    'download': 'download',
    'draggable': 'draggable',
    'dropzone': 'dropzone',
    'enctype': 'encType',
    'for': 'htmlFor',
    'form': 'form',
    'formaction': 'formAction',
    'formenctype': 'formEncType',
    'formmethod': 'formMethod',
    'formnovalidate': 'formNoValidate',
    'formtarget': 'formTarget',
    'frameBorder': 'frameBorder',
    'headers': 'headers',
    'height': 'height',
    'hidden': 'hidden',
    'high': 'high',
    'href': 'href',
    'hreflang': 'hrefLang',
    'http-equiv': 'httpEquiv',
    'icon': 'icon',
    'id': 'id',
    'inputmode': 'inputMode',
    'ismap': 'isMap',
    'itemid': 'itemId',
    'itemprop': 'itemProp',
    'itemref': 'itemRef',
    'itemscope': 'itemScope',
    'itemtype': 'itemType',
    'kind': 'kind',
    'label': 'label',
    'lang': 'lang',
    'list': 'list',
    'loop': 'loop',
    'manifest': 'manifest',
    'max': 'max',
    'maxlength': 'maxLength',
    'media': 'media',
    'mediagroup': 'mediaGroup',
    'method': 'method',
    'min': 'min',
    'minlength': 'minLength',
    'multiple': 'multiple',
    'muted': 'muted',
    'name': 'name',
    'novalidate': 'noValidate',
    'open': 'open',
    'optimum': 'optimum',
    'pattern': 'pattern',
    'ping': 'ping',
    'placeholder': 'placeholder',
    'poster': 'poster',
    'preload': 'preload',
    'radiogroup': 'radioGroup',
    'readonly': 'readOnly',
    'rel': 'rel',
    'required': 'required',
    'role': 'role',
    'rows': 'rows',
    'rowspan': 'rowSpan',
    'sandbox': 'sandbox',
    'scope': 'scope',
    'scoped': 'scoped',
    'scrolling': 'scrolling',
    'seamless': 'seamless',
    'selected': 'selected',
    'shape': 'shape',
    'size': 'size',
    'sizes': 'sizes',
    'sortable': 'sortable',
    'span': 'span',
    'spellcheck': 'spellCheck',
    'src': 'src',
    'srcdoc': 'srcDoc',
    'srcset': 'srcSet',
    'start': 'start',
    'step': 'step',
    'style': 'style',
    'tabindex': 'tabIndex',
    'target': 'target',
    'title': 'title',
    'translate': 'translate',
    'type': 'type',
    'typemustmatch': 'typeMustMatch',
    'usemap': 'useMap',
    'value': 'value',
    'width': 'width',
    'wmode': 'wmode',
    'wrap': 'wrap'
  };
  var propertyMap = properties$3;

  /**
   * namespace-map.js
   *
   * Necessary to map svg attributes back to their namespace
   */

  var DEFAULT_NAMESPACE = null;
  var EV_NAMESPACE = 'http://www.w3.org/2001/xml-events';
  var XLINK_NAMESPACE = 'http://www.w3.org/1999/xlink';
  var XML_NAMESPACE = 'http://www.w3.org/XML/1998/namespace';
  var namespaces = {
    'about': DEFAULT_NAMESPACE,
    'accent-height': DEFAULT_NAMESPACE,
    'accumulate': DEFAULT_NAMESPACE,
    'additive': DEFAULT_NAMESPACE,
    'alignment-baseline': DEFAULT_NAMESPACE,
    'alphabetic': DEFAULT_NAMESPACE,
    'amplitude': DEFAULT_NAMESPACE,
    'arabic-form': DEFAULT_NAMESPACE,
    'ascent': DEFAULT_NAMESPACE,
    'attributeName': DEFAULT_NAMESPACE,
    'attributeType': DEFAULT_NAMESPACE,
    'azimuth': DEFAULT_NAMESPACE,
    'bandwidth': DEFAULT_NAMESPACE,
    'baseFrequency': DEFAULT_NAMESPACE,
    'baseProfile': DEFAULT_NAMESPACE,
    'baseline-shift': DEFAULT_NAMESPACE,
    'bbox': DEFAULT_NAMESPACE,
    'begin': DEFAULT_NAMESPACE,
    'bias': DEFAULT_NAMESPACE,
    'by': DEFAULT_NAMESPACE,
    'calcMode': DEFAULT_NAMESPACE,
    'cap-height': DEFAULT_NAMESPACE,
    'class': DEFAULT_NAMESPACE,
    'clip': DEFAULT_NAMESPACE,
    'clip-path': DEFAULT_NAMESPACE,
    'clip-rule': DEFAULT_NAMESPACE,
    'clipPathUnits': DEFAULT_NAMESPACE,
    'color': DEFAULT_NAMESPACE,
    'color-interpolation': DEFAULT_NAMESPACE,
    'color-interpolation-filters': DEFAULT_NAMESPACE,
    'color-profile': DEFAULT_NAMESPACE,
    'color-rendering': DEFAULT_NAMESPACE,
    'content': DEFAULT_NAMESPACE,
    'contentScriptType': DEFAULT_NAMESPACE,
    'contentStyleType': DEFAULT_NAMESPACE,
    'cursor': DEFAULT_NAMESPACE,
    'cx': DEFAULT_NAMESPACE,
    'cy': DEFAULT_NAMESPACE,
    'd': DEFAULT_NAMESPACE,
    'datatype': DEFAULT_NAMESPACE,
    'defaultAction': DEFAULT_NAMESPACE,
    'descent': DEFAULT_NAMESPACE,
    'diffuseConstant': DEFAULT_NAMESPACE,
    'direction': DEFAULT_NAMESPACE,
    'display': DEFAULT_NAMESPACE,
    'divisor': DEFAULT_NAMESPACE,
    'dominant-baseline': DEFAULT_NAMESPACE,
    'dur': DEFAULT_NAMESPACE,
    'dx': DEFAULT_NAMESPACE,
    'dy': DEFAULT_NAMESPACE,
    'edgeMode': DEFAULT_NAMESPACE,
    'editable': DEFAULT_NAMESPACE,
    'elevation': DEFAULT_NAMESPACE,
    'enable-background': DEFAULT_NAMESPACE,
    'end': DEFAULT_NAMESPACE,
    'ev:event': EV_NAMESPACE,
    'event': DEFAULT_NAMESPACE,
    'exponent': DEFAULT_NAMESPACE,
    'externalResourcesRequired': DEFAULT_NAMESPACE,
    'fill': DEFAULT_NAMESPACE,
    'fill-opacity': DEFAULT_NAMESPACE,
    'fill-rule': DEFAULT_NAMESPACE,
    'filter': DEFAULT_NAMESPACE,
    'filterRes': DEFAULT_NAMESPACE,
    'filterUnits': DEFAULT_NAMESPACE,
    'flood-color': DEFAULT_NAMESPACE,
    'flood-opacity': DEFAULT_NAMESPACE,
    'focusHighlight': DEFAULT_NAMESPACE,
    'focusable': DEFAULT_NAMESPACE,
    'font-family': DEFAULT_NAMESPACE,
    'font-size': DEFAULT_NAMESPACE,
    'font-size-adjust': DEFAULT_NAMESPACE,
    'font-stretch': DEFAULT_NAMESPACE,
    'font-style': DEFAULT_NAMESPACE,
    'font-variant': DEFAULT_NAMESPACE,
    'font-weight': DEFAULT_NAMESPACE,
    'format': DEFAULT_NAMESPACE,
    'from': DEFAULT_NAMESPACE,
    'fx': DEFAULT_NAMESPACE,
    'fy': DEFAULT_NAMESPACE,
    'g1': DEFAULT_NAMESPACE,
    'g2': DEFAULT_NAMESPACE,
    'glyph-name': DEFAULT_NAMESPACE,
    'glyph-orientation-horizontal': DEFAULT_NAMESPACE,
    'glyph-orientation-vertical': DEFAULT_NAMESPACE,
    'glyphRef': DEFAULT_NAMESPACE,
    'gradientTransform': DEFAULT_NAMESPACE,
    'gradientUnits': DEFAULT_NAMESPACE,
    'handler': DEFAULT_NAMESPACE,
    'hanging': DEFAULT_NAMESPACE,
    'height': DEFAULT_NAMESPACE,
    'horiz-adv-x': DEFAULT_NAMESPACE,
    'horiz-origin-x': DEFAULT_NAMESPACE,
    'horiz-origin-y': DEFAULT_NAMESPACE,
    'id': DEFAULT_NAMESPACE,
    'ideographic': DEFAULT_NAMESPACE,
    'image-rendering': DEFAULT_NAMESPACE,
    'in': DEFAULT_NAMESPACE,
    'in2': DEFAULT_NAMESPACE,
    'initialVisibility': DEFAULT_NAMESPACE,
    'intercept': DEFAULT_NAMESPACE,
    'k': DEFAULT_NAMESPACE,
    'k1': DEFAULT_NAMESPACE,
    'k2': DEFAULT_NAMESPACE,
    'k3': DEFAULT_NAMESPACE,
    'k4': DEFAULT_NAMESPACE,
    'kernelMatrix': DEFAULT_NAMESPACE,
    'kernelUnitLength': DEFAULT_NAMESPACE,
    'kerning': DEFAULT_NAMESPACE,
    'keyPoints': DEFAULT_NAMESPACE,
    'keySplines': DEFAULT_NAMESPACE,
    'keyTimes': DEFAULT_NAMESPACE,
    'lang': DEFAULT_NAMESPACE,
    'lengthAdjust': DEFAULT_NAMESPACE,
    'letter-spacing': DEFAULT_NAMESPACE,
    'lighting-color': DEFAULT_NAMESPACE,
    'limitingConeAngle': DEFAULT_NAMESPACE,
    'local': DEFAULT_NAMESPACE,
    'marker-end': DEFAULT_NAMESPACE,
    'marker-mid': DEFAULT_NAMESPACE,
    'marker-start': DEFAULT_NAMESPACE,
    'markerHeight': DEFAULT_NAMESPACE,
    'markerUnits': DEFAULT_NAMESPACE,
    'markerWidth': DEFAULT_NAMESPACE,
    'mask': DEFAULT_NAMESPACE,
    'maskContentUnits': DEFAULT_NAMESPACE,
    'maskUnits': DEFAULT_NAMESPACE,
    'mathematical': DEFAULT_NAMESPACE,
    'max': DEFAULT_NAMESPACE,
    'media': DEFAULT_NAMESPACE,
    'mediaCharacterEncoding': DEFAULT_NAMESPACE,
    'mediaContentEncodings': DEFAULT_NAMESPACE,
    'mediaSize': DEFAULT_NAMESPACE,
    'mediaTime': DEFAULT_NAMESPACE,
    'method': DEFAULT_NAMESPACE,
    'min': DEFAULT_NAMESPACE,
    'mode': DEFAULT_NAMESPACE,
    'name': DEFAULT_NAMESPACE,
    'nav-down': DEFAULT_NAMESPACE,
    'nav-down-left': DEFAULT_NAMESPACE,
    'nav-down-right': DEFAULT_NAMESPACE,
    'nav-left': DEFAULT_NAMESPACE,
    'nav-next': DEFAULT_NAMESPACE,
    'nav-prev': DEFAULT_NAMESPACE,
    'nav-right': DEFAULT_NAMESPACE,
    'nav-up': DEFAULT_NAMESPACE,
    'nav-up-left': DEFAULT_NAMESPACE,
    'nav-up-right': DEFAULT_NAMESPACE,
    'numOctaves': DEFAULT_NAMESPACE,
    'observer': DEFAULT_NAMESPACE,
    'offset': DEFAULT_NAMESPACE,
    'opacity': DEFAULT_NAMESPACE,
    'operator': DEFAULT_NAMESPACE,
    'order': DEFAULT_NAMESPACE,
    'orient': DEFAULT_NAMESPACE,
    'orientation': DEFAULT_NAMESPACE,
    'origin': DEFAULT_NAMESPACE,
    'overflow': DEFAULT_NAMESPACE,
    'overlay': DEFAULT_NAMESPACE,
    'overline-position': DEFAULT_NAMESPACE,
    'overline-thickness': DEFAULT_NAMESPACE,
    'panose-1': DEFAULT_NAMESPACE,
    'path': DEFAULT_NAMESPACE,
    'pathLength': DEFAULT_NAMESPACE,
    'patternContentUnits': DEFAULT_NAMESPACE,
    'patternTransform': DEFAULT_NAMESPACE,
    'patternUnits': DEFAULT_NAMESPACE,
    'phase': DEFAULT_NAMESPACE,
    'playbackOrder': DEFAULT_NAMESPACE,
    'pointer-events': DEFAULT_NAMESPACE,
    'points': DEFAULT_NAMESPACE,
    'pointsAtX': DEFAULT_NAMESPACE,
    'pointsAtY': DEFAULT_NAMESPACE,
    'pointsAtZ': DEFAULT_NAMESPACE,
    'preserveAlpha': DEFAULT_NAMESPACE,
    'preserveAspectRatio': DEFAULT_NAMESPACE,
    'primitiveUnits': DEFAULT_NAMESPACE,
    'propagate': DEFAULT_NAMESPACE,
    'property': DEFAULT_NAMESPACE,
    'r': DEFAULT_NAMESPACE,
    'radius': DEFAULT_NAMESPACE,
    'refX': DEFAULT_NAMESPACE,
    'refY': DEFAULT_NAMESPACE,
    'rel': DEFAULT_NAMESPACE,
    'rendering-intent': DEFAULT_NAMESPACE,
    'repeatCount': DEFAULT_NAMESPACE,
    'repeatDur': DEFAULT_NAMESPACE,
    'requiredExtensions': DEFAULT_NAMESPACE,
    'requiredFeatures': DEFAULT_NAMESPACE,
    'requiredFonts': DEFAULT_NAMESPACE,
    'requiredFormats': DEFAULT_NAMESPACE,
    'resource': DEFAULT_NAMESPACE,
    'restart': DEFAULT_NAMESPACE,
    'result': DEFAULT_NAMESPACE,
    'rev': DEFAULT_NAMESPACE,
    'role': DEFAULT_NAMESPACE,
    'rotate': DEFAULT_NAMESPACE,
    'rx': DEFAULT_NAMESPACE,
    'ry': DEFAULT_NAMESPACE,
    'scale': DEFAULT_NAMESPACE,
    'seed': DEFAULT_NAMESPACE,
    'shape-rendering': DEFAULT_NAMESPACE,
    'slope': DEFAULT_NAMESPACE,
    'snapshotTime': DEFAULT_NAMESPACE,
    'spacing': DEFAULT_NAMESPACE,
    'specularConstant': DEFAULT_NAMESPACE,
    'specularExponent': DEFAULT_NAMESPACE,
    'spreadMethod': DEFAULT_NAMESPACE,
    'startOffset': DEFAULT_NAMESPACE,
    'stdDeviation': DEFAULT_NAMESPACE,
    'stemh': DEFAULT_NAMESPACE,
    'stemv': DEFAULT_NAMESPACE,
    'stitchTiles': DEFAULT_NAMESPACE,
    'stop-color': DEFAULT_NAMESPACE,
    'stop-opacity': DEFAULT_NAMESPACE,
    'strikethrough-position': DEFAULT_NAMESPACE,
    'strikethrough-thickness': DEFAULT_NAMESPACE,
    'string': DEFAULT_NAMESPACE,
    'stroke': DEFAULT_NAMESPACE,
    'stroke-dasharray': DEFAULT_NAMESPACE,
    'stroke-dashoffset': DEFAULT_NAMESPACE,
    'stroke-linecap': DEFAULT_NAMESPACE,
    'stroke-linejoin': DEFAULT_NAMESPACE,
    'stroke-miterlimit': DEFAULT_NAMESPACE,
    'stroke-opacity': DEFAULT_NAMESPACE,
    'stroke-width': DEFAULT_NAMESPACE,
    'surfaceScale': DEFAULT_NAMESPACE,
    'syncBehavior': DEFAULT_NAMESPACE,
    'syncBehaviorDefault': DEFAULT_NAMESPACE,
    'syncMaster': DEFAULT_NAMESPACE,
    'syncTolerance': DEFAULT_NAMESPACE,
    'syncToleranceDefault': DEFAULT_NAMESPACE,
    'systemLanguage': DEFAULT_NAMESPACE,
    'tableValues': DEFAULT_NAMESPACE,
    'target': DEFAULT_NAMESPACE,
    'targetX': DEFAULT_NAMESPACE,
    'targetY': DEFAULT_NAMESPACE,
    'text-anchor': DEFAULT_NAMESPACE,
    'text-decoration': DEFAULT_NAMESPACE,
    'text-rendering': DEFAULT_NAMESPACE,
    'textLength': DEFAULT_NAMESPACE,
    'timelineBegin': DEFAULT_NAMESPACE,
    'title': DEFAULT_NAMESPACE,
    'to': DEFAULT_NAMESPACE,
    'transform': DEFAULT_NAMESPACE,
    'transformBehavior': DEFAULT_NAMESPACE,
    'type': DEFAULT_NAMESPACE,
    'typeof': DEFAULT_NAMESPACE,
    'u1': DEFAULT_NAMESPACE,
    'u2': DEFAULT_NAMESPACE,
    'underline-position': DEFAULT_NAMESPACE,
    'underline-thickness': DEFAULT_NAMESPACE,
    'unicode': DEFAULT_NAMESPACE,
    'unicode-bidi': DEFAULT_NAMESPACE,
    'unicode-range': DEFAULT_NAMESPACE,
    'units-per-em': DEFAULT_NAMESPACE,
    'v-alphabetic': DEFAULT_NAMESPACE,
    'v-hanging': DEFAULT_NAMESPACE,
    'v-ideographic': DEFAULT_NAMESPACE,
    'v-mathematical': DEFAULT_NAMESPACE,
    'values': DEFAULT_NAMESPACE,
    'version': DEFAULT_NAMESPACE,
    'vert-adv-y': DEFAULT_NAMESPACE,
    'vert-origin-x': DEFAULT_NAMESPACE,
    'vert-origin-y': DEFAULT_NAMESPACE,
    'viewBox': DEFAULT_NAMESPACE,
    'viewTarget': DEFAULT_NAMESPACE,
    'visibility': DEFAULT_NAMESPACE,
    'width': DEFAULT_NAMESPACE,
    'widths': DEFAULT_NAMESPACE,
    'word-spacing': DEFAULT_NAMESPACE,
    'writing-mode': DEFAULT_NAMESPACE,
    'x': DEFAULT_NAMESPACE,
    'x-height': DEFAULT_NAMESPACE,
    'x1': DEFAULT_NAMESPACE,
    'x2': DEFAULT_NAMESPACE,
    'xChannelSelector': DEFAULT_NAMESPACE,
    'xlink:actuate': XLINK_NAMESPACE,
    'xlink:arcrole': XLINK_NAMESPACE,
    'xlink:href': XLINK_NAMESPACE,
    'xlink:role': XLINK_NAMESPACE,
    'xlink:show': XLINK_NAMESPACE,
    'xlink:title': XLINK_NAMESPACE,
    'xlink:type': XLINK_NAMESPACE,
    'xml:base': XML_NAMESPACE,
    'xml:id': XML_NAMESPACE,
    'xml:lang': XML_NAMESPACE,
    'xml:space': XML_NAMESPACE,
    'y': DEFAULT_NAMESPACE,
    'y1': DEFAULT_NAMESPACE,
    'y2': DEFAULT_NAMESPACE,
    'yChannelSelector': DEFAULT_NAMESPACE,
    'z': DEFAULT_NAMESPACE,
    'zoomAndPan': DEFAULT_NAMESPACE
  };
  var namespaceMap = namespaces;

  var domParser;





  var HTML_NAMESPACE = 'http://www.w3.org/1999/xhtml';
  var vdomParser = parser;
  /**
   * DOM/html string to vdom parser
   *
   * @param   Mixed   el    DOM element or html string
   * @param   String  attr  Attribute name that contains vdom key
   * @return  Object        VNode or VText
   */

  function parser(el, attr) {
    // empty input fallback to empty text node
    if (!el) {
      return createNode(document.createTextNode(''));
    }

    if (typeof el === 'string') {
      if (!('DOMParser' in window)) {
        throw new Error('DOMParser is not available, so parsing string to DOM node is not possible.');
      }

      domParser = domParser || new DOMParser();
      var doc = domParser.parseFromString(el, 'text/html'); // most tags default to body

      if (doc.body.firstChild) {
        el = doc.getElementsByTagName('body')[0].firstChild; // some tags, like script and style, default to head
      } else if (doc.head.firstChild && (doc.head.firstChild.tagName !== 'TITLE' || doc.title)) {
        el = doc.head.firstChild; // special case for html comment, cdata, doctype
      } else if (doc.firstChild && doc.firstChild.tagName !== 'HTML') {
        el = doc.firstChild; // other element, such as whitespace, or html/body/head tag, fallback to empty text node
      } else {
        el = document.createTextNode('');
      }
    }

    if (typeof el !== 'object' || !el || !el.nodeType) {
      throw new Error('invalid dom node', el);
    }

    return createNode(el, attr);
  }
  /**
   * Create vdom from dom node
   *
   * @param   Object  el    DOM element
   * @param   String  attr  Attribute name that contains vdom key
   * @return  Object        VNode or VText
   */


  function createNode(el, attr) {
    // html comment is not currently supported by virtual-dom
    if (el.nodeType === 3) {
      return createVirtualTextNode(el); // cdata or doctype is not currently supported by virtual-dom
    } else if (el.nodeType === 1 || el.nodeType === 9) {
      return createVirtualDomNode(el, attr);
    } // default to empty text node


    return new vtext('');
  }
  /**
   * Create vtext from dom node
   *
   * @param   Object  el  Text node
   * @return  Object      VText
   */


  function createVirtualTextNode(el) {
    return new vtext(el.nodeValue);
  }
  /**
   * Create vnode from dom node
   *
   * @param   Object  el    DOM element
   * @param   String  attr  Attribute name that contains vdom key
   * @return  Object        VNode
   */


  function createVirtualDomNode(el, attr) {
    var ns = el.namespaceURI !== HTML_NAMESPACE ? el.namespaceURI : null;
    var key = attr && el.getAttribute(attr) ? el.getAttribute(attr) : null;
    return new vnode(el.tagName, createProperties(el), createChildren(el, attr), key, ns);
  }
  /**
   * Recursively create vdom
   *
   * @param   Object  el    Parent element
   * @param   String  attr  Attribute name that contains vdom key
   * @return  Array         Child vnode or vtext
   */


  function createChildren(el, attr) {
    var children = [];

    for (var i = 0; i < el.childNodes.length; i++) {
      children.push(createNode(el.childNodes[i], attr));
    }
    return children;
  }
  /**
   * Create properties from dom node
   *
   * @param   Object  el  DOM element
   * @return  Object      Node properties and attributes
   */


  function createProperties(el) {
    var properties = {};

    if (!el.hasAttributes()) {
      return properties;
    }

    var ns;

    if (el.namespaceURI && el.namespaceURI !== HTML_NAMESPACE) {
      ns = el.namespaceURI;
    }

    var attr;

    for (var i = 0; i < el.attributes.length; i++) {
      // use built in css style parsing
      if (el.attributes[i].name == 'style') {
        attr = createStyleProperty(el);
      } else if (ns) {
        attr = createPropertyNS(el.attributes[i]);
      } else {
        attr = createProperty(el.attributes[i]);
      } // special case, namespaced attribute, use properties.foobar


      if (attr.ns) {
        properties[attr.name] = {
          namespace: attr.ns,
          value: attr.value
        }; // special case, use properties.attributes.foobar
      } else if (attr.isAttr) {
        // init attributes object only when necessary
        if (!properties.attributes) {
          properties.attributes = {};
        }

        properties.attributes[attr.name] = attr.value; // default case, use properties.foobar
      } else {
        properties[attr.name] = attr.value;
      }
    }
    return properties;
  }
  /**
   * Create property from dom attribute
   *
   * @param   Object  attr  DOM attribute
   * @return  Object        Normalized attribute
   */


  function createProperty(attr) {
    var name, value, isAttr; // using a map to find the correct case of property name

    if (propertyMap[attr.name]) {
      name = propertyMap[attr.name];
    } else {
      name = attr.name;
    } // special cases for data attribute, we default to properties.attributes.data


    if (name.indexOf('data-') === 0 || name.indexOf('aria-') === 0) {
      value = attr.value;
      isAttr = true;
    } else {
      value = attr.value;
    }

    return {
      name: name,
      value: value,
      isAttr: isAttr || false
    };
  }
  /**
   * Create namespaced property from dom attribute
   *
   * @param   Object  attr  DOM attribute
   * @return  Object        Normalized attribute
   */


  function createPropertyNS(attr) {
    return {
      name: attr.name,
      value: attr.value,
      ns: namespaceMap[attr.name] || ''
    };
  }
  /**
   * Create style property from dom node
   *
   * @param   Object  el  DOM node
   * @return  Object        Normalized attribute
   */


  function createStyleProperty(el) {
    var style = el.style;
    var output = {};

    for (var i = 0; i < style.length; ++i) {
      var item = style.item(i);
      output[item] = String(style[item]); // hack to workaround browser inconsistency with url()

      if (output[item].indexOf('url') > -1) {
        output[item] = output[item].replace(/\"/g, '');
      }
    }

    return {
      name: 'style',
      value: output
    };
  }

  function debounce(func, wait, immediate) {
    var timeout;
    return function () {
      var context = this,
          args = arguments;

      var later = function later() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };

      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }
  function getAttribute(node, attr) {
    return node.properties && node.properties.attributes && node.properties.attributes[attr];
  }

  function getLastOfPath$1(object, path, Empty) {
    function cleanKey(key) {
      return key && key.indexOf('###') > -1 ? key.replace(/###/g, '.') : key;
    }

    function canNotTraverseDeeper() {
      return !object || typeof object === 'string';
    }

    var stack = typeof path !== 'string' ? [].concat(path) : path.split('.');

    while (stack.length > 1) {
      if (canNotTraverseDeeper()) return {};
      var key = cleanKey(stack.shift());
      if (!object[key] && Empty) object[key] = new Empty();
      object = object[key];
    }

    if (canNotTraverseDeeper()) return {};
    return {
      obj: object,
      k: cleanKey(stack.shift())
    };
  }

  function setPath$1(object, path, newValue) {
    var {
      obj,
      k
    } = getLastOfPath$1(object, path, Object);
    obj[k] = newValue;
  }
  function getPath$1(object, path) {
    var {
      obj,
      k
    } = getLastOfPath$1(object, path);
    if (!obj) return undefined;
    return obj[k];
  }
  function getPathname() {
    var path = location.pathname;
    if (path === '/') return 'root';
    var parts = path.split('/');
    var ret = 'root';
    parts.forEach(p => {
      if (p) ret += "_".concat(p);
    });
    return ret;
  }
  var parseOptions = options => {
    if (options.namespace) {
      options.ns.push(options.namespace);
      options.defaultNS = options.namespace;
    } else if (options.namespaceFromPath) {
      var ns = getPathname();
      options.ns.push(ns);
      options.defaultNS = ns;
    }

    if (!options.ns.length) options.ns = ['translation'];

    if (options.ignoreTags) {
      options.ignoreTags = options.ignoreTags.map(s => s.toUpperCase());
    }

    if (options.ignoreCleanIndentFor) {
      options.ignoreCleanIndentFor = options.ignoreCleanIndentFor.map(s => s.toUpperCase());
    }

    if (options.inlineTags) {
      options.inlineTags = options.inlineTags.map(s => s.toUpperCase());
    }

    if (options.ignoreInlineOn) {
      options.ignoreInlineOn = options.ignoreInlineOn.map(s => s.toUpperCase());
    }

    if (options.mergeTags) {
      options.mergeTags = options.mergeTags.map(s => s.toUpperCase());
    }

    options.translateAttributes = options.translateAttributes.reduce((mem, attr) => {
      var res = {
        attr
      };

      if (attr.indexOf('#') > -1) {
        var [a, c] = attr.split('#');
        res.attr = a;

        if (c.indexOf('.') > -1) {
          var [e, b] = c.split('.');
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
    return options;
  };

  function isUnTranslated(node) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      retranslate: false
    };
    if (opts && opts.retranslate) return true;
    return !node.properties || !node.properties.attributes || node.properties.attributes.localized !== '';
  }

  function isNotExcluded(node) {
    var ret = !node.properties || !node.properties.attributes || node.properties.attributes.translated !== '';

    if (ret && node.tagName && i18next.options.ignoreTags.indexOf(node.tagName) > -1) {
      ret = false;
    }

    if (ret && i18next.options.ignoreClasses && node.properties && node.properties.className) {
      var p = node.properties.className.split(' ');
      p.forEach(cls => {
        if (!ret) return;
        if (i18next.options.ignoreClasses.indexOf(cls) > -1) ret = false;
      });
    }

    if (ret && i18next.options.ignoreIds) {
      if (i18next.options.ignoreIds.indexOf(node.properties && node.properties.id) > -1) {
        ret = false;
      }
    }

    return ret;
  }

  function translate(str) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var overrideKey = arguments.length > 2 ? arguments[2] : undefined;
    var hasContent = str.trim();
    var key = overrideKey || str.trim();
    if (!options.defaultValue) options.defaultValue = str;

    if (hasContent && !i18next.options.ignoreWithoutKey || hasContent && i18next.options.ignoreWithoutKey && overrideKey) {
      return i18next.t(key, options);
    }

    return str;
  }

  var replaceInside = ['src', 'href'];
  var REGEXP = new RegExp('%7B%7B(.+?)%7D%7D', 'g'); // urlEncoded {{}}

  function translateProps(node, props) {
    var tOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var overrideKey = arguments.length > 3 ? arguments[3] : undefined;
    var realNodeIsUnTranslated = arguments.length > 4 ? arguments[4] : undefined;
    var opts = arguments.length > 5 ? arguments[5] : undefined;
    if (!props) return props;
    i18next.options.translateAttributes.forEach(item => {
      if (item.ele && node.tagName !== item.ele) return;

      if (item.cond && item.cond.length === 2) {
        var condValue = getPath$1(props, item.cond[0]) || getPath$1(props.attributes, item.cond[0]);
        if (!condValue || condValue !== item.cond[1]) return;
      }

      var wasOnAttr = false;
      var value = getPath$1(props, item.attr);

      if (!value) {
        value = getPath$1(props.attributes, item.attr);
        if (value) wasOnAttr = true;
      }

      if (opts.retranslate) {
        var usedValue = node.properties && node.properties && node.properties.attributes["".concat(item.attr, "-i18next-orgval")];
        if (!usedValue) usedValue = value;
        value = usedValue;
      }

      if (value) {
        if (realNodeIsUnTranslated) {
          node.properties.attributes["".concat(item.attr, "-i18next-orgval")] = value;
        }

        setPath$1(wasOnAttr ? props.attributes : props, item.attr, translate(value, _objectSpread2({}, tOptions), overrideKey ? "".concat(overrideKey, ".").concat(item.attr) : ''));
      }
    });
    replaceInside.forEach(attr => {
      var value = getPath$1(props, attr);

      if (value) {
        value = value.replace(/\{\{/g, '%7B%7B').replace(/\}\}/g, '%7D%7D');
      } // fix for safari


      if (value && value.indexOf('%7B') > -1) {
        var arr = [];
        value.split(REGEXP).reduce((mem, match, index) => {
          if (match.length === 0) return mem;

          if (!index || index % 2 === 0) {
            mem.push(match);
          } else {
            mem.push(translate(match, _objectSpread2({}, tOptions), overrideKey ? "".concat(overrideKey, ".").concat(attr) : ''));
          }

          return mem;
        }, arr);
        if (arr.length) setPath$1(props, attr, arr.join(''));
      }
    });
    return props;
  }

  function getTOptions(opts, node) {
    var optsOnNode = getAttribute(node, 'i18next-options');

    if (optsOnNode) {
      try {
        optsOnNode = JSON.parse(optsOnNode);
      } catch (e) {
        console.warn('failed parsing options on node', node);
      }
    }

    if (optsOnNode && optsOnNode.inlineTags) {
      optsOnNode.inlineTags = optsOnNode.inlineTags.map(s => s.toUpperCase());
    }

    return _objectSpread2(_objectSpread2({}, opts || {}), optsOnNode || {});
  }

  function removeIndent(str, substitution) {
    if (!i18next.options.cleanIndent) return str;
    var ret = str.replace(/\n +/g, substitution);
    return ret;
  }

  function canInline(node, tOptions) {
    if (!node.children || !node.children.length || i18next.options.ignoreInlineOn.indexOf(node.tagName) > -1) {
      return false;
    }

    if (i18next.options.mergeTags.indexOf(node.tagName) > -1) return true;
    var baseTags = tOptions.inlineTags || i18next.options.inlineTags;
    var inlineTags = tOptions.additionalInlineTags ? baseTags.concat(tOptions.additionalInlineTags) : baseTags;
    var inlineable = true;
    var hadNonTextNode = false;
    node.children.forEach(child => {
      if (!child.text && child.tagName && inlineTags.indexOf(child.tagName.toUpperCase()) < 0) {
        inlineable = false;
      }

      if (child.tagName) hadNonTextNode = true;
    });
    return inlineable && hadNonTextNode;
  }

  function walk$1(node, tOptions, parent, parentOverrideKey) {
    var currentDepth = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
    var opts = arguments.length > 5 ? arguments[5] : undefined;
    var nodeIsNotExcluded = isNotExcluded(node);
    var nodeIsUnTranslated = isUnTranslated(node, opts);
    var realNodeIsUnTranslated = isUnTranslated(node); // ignoring forced threatment

    tOptions = getTOptions(tOptions, node);
    var parentKey = currentDepth === 0 ? parentOverrideKey : '';

    if (currentDepth > 0 && parentOverrideKey && !i18next.options.ignoreWithoutKey) {
      parentKey = "".concat(parentOverrideKey, ".").concat(currentDepth);
    }

    var overrideKey = getAttribute(node, i18next.options.keyAttr) || parentKey; // normally we use content as key, but optionally we allow to override it
    // translate node as one block

    var mergeFlag = getAttribute(node, 'merge');

    if (mergeFlag !== 'false' && (mergeFlag === '' || canInline(node, tOptions))) {
      if (nodeIsNotExcluded && nodeIsUnTranslated) {
        // wrap children into dummy node and remove that outer from translation
        var dummyNode = new vnode('I18NEXTIFYDUMMY', null, node.children);
        var key = removeIndent(vdomToHtml(dummyNode), '').replace('<i18nextifydummy>', '').replace('</i18nextifydummy>', ''); // grab orginial text if we enforce a retranslate

        if (opts.retranslate) {
          var usedKey = node.properties && node.properties.attributes && node.properties.attributes['i18next-orgval'];

          if (!usedKey) {
            usedKey = parent && parent.properties && parent.properties.attributes && parent.properties.attributes["i18next-orgval-".concat(currentDepth)];
          }

          if (!usedKey) usedKey = key;
          key = usedKey;
        } // translate that's children and surround it again with a dummy node to parse to vdom


        var translation = "<i18nextifydummy>".concat(translate(key, tOptions, overrideKey), "</i18nextifydummy>");
        var newNode = vdomParser((translation || '').trim()); // replace children on passed in node

        node.children = newNode.children; // persist original key for future retranslate

        if (realNodeIsUnTranslated && node.properties && node.properties.attributes) {
          node.properties.attributes['i18next-orgval'] = key;
        } else if (realNodeIsUnTranslated && parent && parent.properties && parent.properties.attributes) {
          parent.properties.attributes["i18next-orgval-".concat(currentDepth)] = key;
        }

        if (node.properties && node.properties.attributes) {
          node.properties.attributes.localized = '';
        }
      }

      return node;
    }

    if (node.children) {
      node.children.forEach((child, i) => {
        if (nodeIsNotExcluded && nodeIsUnTranslated && child.text || !child.text && isNotExcluded(child)) {
          walk$1(child, tOptions, node, overrideKey, node.children.length > 1 ? i + 1 : i, // if only a inner text node - keep it index 0, else add a index number + 1
          opts);
        }
      });
    } // ignore comments


    if (node.text && !node.properties && node.type === 'Widget') return node;

    if (nodeIsNotExcluded && nodeIsUnTranslated) {
      if (node.text) {
        var match;
        var txt = node.text;
        var originalText = node.text; // grab orginial text if we enforce a retranslate

        if (opts.retranslate) {
          var usedText = node.properties && node.properties.attributes && node.properties.attributes['i18next-orgval'];

          if (!usedText) {
            usedText = parent && parent.properties && parent.properties.attributes && parent.properties.attributes["i18next-orgval-".concat(currentDepth)];
          }

          if (!usedText) usedText = node.text;
          txt = usedText;
          originalText = usedText;
        } // exclude whitespace replacement eg on PRE, CODE


        var ignore = i18next.options.ignoreCleanIndentFor.indexOf(parent.tagName) > -1;

        if (!ignore) {
          txt = removeIndent(txt, '\n');

          if (i18next.options.cleanWhitespace) {
            var regex = /^\s*(.*[^\s])\s*$/g;
            match = regex.exec(txt);
          }
        }

        if (!ignore && match && match.length > 1 && i18next.options.cleanWhitespace) {
          var _translation = translate(match[1], tOptions, overrideKey || '');

          node.text = txt.replace(match[1], _translation);
        } else {
          node.text = translate(txt, tOptions, overrideKey || '');
        } // persist original text (key) for future retranslate


        if (realNodeIsUnTranslated && node.properties && node.properties.attributes) {
          if (originalText) {
            node.properties.attributes['i18next-orgval'] = originalText;
          }
        } else if (realNodeIsUnTranslated && parent && parent.properties && parent.properties.attributes) {
          if (originalText) {
            parent.properties.attributes["i18next-orgval-".concat(currentDepth)] = originalText;
          }
        }
      } // translate propertied


      if (node.properties) {
        node.properties = translateProps(node, node.properties, tOptions, overrideKey, realNodeIsUnTranslated, opts);
      } // set translated


      if (node.properties && node.properties.attributes) {
        node.properties.attributes.localized = '';
      }
    }

    return node;
  }

  function localize(node, retranslate) {
    var recurseTime = new Instrument();
    recurseTime.start();
    var localized = walk$1(node, null, null, null, null, {
      retranslate
    });
    i18next.services.logger.log("localization took: ".concat(recurseTime.end(), "ms"));
    return localized;
  }

  function createVdom(node) {
    var virtualizeTime = new Instrument();
    virtualizeTime.start();
    var vNode = vdomVirtualize(node);
    i18next.services.logger.log("virtualization took: ".concat(virtualizeTime.end(), "ms"));
    return vNode;
  }

  function renderer (root, observer) {
    var ret = {};

    ret.render = function render(retranslate) {
      var newNode = createVdom(root);
      var localized = localize(udc(newNode), retranslate);
      var patches = diff_1$1(newNode, localized);
      if (patches['0']) observer.reset(); // reset observer if having patches

      root = patch_1$1(root, patches);
    };

    ret.debouncedRender = debounce(ret.render, 200);
    return ret;
  }

  var missings = {};

  function log() {
    i18next.services.logger.log('missing resources: \n' + JSON.stringify(missings, null, 2));
  }

  var debouncedLog = debounce(log, 2000);
  function missingHandler(lngs, namespace, key, res) {
    if (typeof lngs === 'string') lngs = [lngs];
    if (!lngs) lngs = [];
    lngs.forEach(lng => {
      setPath$1(missings, [lng, namespace, key], res);
      debouncedLog();
    });

    if (i18next.services.backendConnector && i18next.services.backendConnector.saveMissing) {
      i18next.services.backendConnector.saveMissing(lngs, namespace, key, res);
    }
  }

  function getDefaults$2() {
    return {
      autorun: true,
      ele: document.body,
      keyAttr: 'i18next-key',
      ignoreWithoutKey: false,
      ignoreTags: ['SCRIPT'],
      ignoreIds: [],
      ignoreClasses: [],
      translateAttributes: ['placeholder', 'title', 'alt', 'value#input.type=button', 'value#input.type=submit'],
      mergeTags: [],
      inlineTags: [],
      ignoreInlineOn: [],
      cleanIndent: true,
      ignoreCleanIndentFor: ['PRE', 'CODE'],
      cleanWhitespace: true,
      nsSeparator: '#||#',
      keySeparator: '#|#',
      debug: window.location.search && window.location.search.indexOf('debug=true') > -1,
      saveMissing: window.location.search && window.location.search.indexOf('saveMissing=true') > -1,
      namespace: false,
      namespaceFromPath: false,
      missingKeyHandler: missingHandler,
      ns: [],
      onInitialTranslate: () => {}
    };
  } // auto initialize on dom ready


  var domReady = false;
  var initialized = false;
  docReady(() => {
    domReady = true;
    if (!initialized) init();
  }); // extend i18next with default extensions

  i18next.use(Backend);
  i18next.use(Browser); // log out missings
  // i18next.on('missingKey', missingHandler);
  // store last init options - for case init is called before dom ready

  var lastOptions = {};

  function changeNamespace(ns) {
    if (!ns && lastOptions.namespaceFromPath) ns = getPathname();
    lastOptions.ns.push(ns);
    lastOptions.defaultNS = ns;
    i18next.loadNamespaces(lastOptions.ns, () => {
      i18next.setDefaultNamespace(ns);
    });
  }

  var renderers = [];

  function init() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    options = _objectSpread2(_objectSpread2(_objectSpread2({}, getDefaults$2()), lastOptions), options);
    options = parseOptions(options); // delay init from domReady

    if (!options.ele) {
      delete options.ele;
      lastOptions = options;
    }

    initialized = true;
    var observer;

    function addRenderers(children) {
      for (var i = 0; i < children.length; i++) {
        var c = children[i];

        if (options.ignoreTags.indexOf(c.tagName) < 0 && options.ignoreIds.indexOf(c.id) < 0 && options.ignoreClasses.indexOf(c.className) < 0 && !c.attributes.localized && !c.attributes.translated) {
          var r = renderer(c, observer);
          renderers.push(r);
          r.render();
        }
      }
    }

    function waitForInitialRender(children, timeout, callback) {
      var allRendered = true;
      setTimeout(() => {
        for (var i = 0; i < children.length; i++) {
          var c = children[i];

          if (options.ignoreTags.indexOf(c.tagName) < 0 && options.ignoreIds.indexOf(c.id) < 0 && options.ignoreClasses.indexOf(c.className) < 0 && !c.attributes.localized && !c.attributes.translated) {
            if (allRendered) waitForInitialRender(children, 100, callback);
            allRendered = false;
            break;
          }
        }

        if (allRendered) callback();
      }, timeout);
    }

    var todo = 1;
    if (!domReady) todo++;
    if (options.autorun === false) todo++;

    function done() {
      todo -= 1;

      if (!todo) {
        if (!options.ele) options.ele = document.body;
        var children = options.ele.children;
        observer = new Observer(options.ele);
        addRenderers(children);
        observer.on('changed', mutations => {
          renderers.forEach(r => r.debouncedRender());
          addRenderers(children);
        });
        waitForInitialRender(children, 0, () => {
          if (options.ele.style && options.ele.style.display === 'none') {
            options.ele.style.display = 'block';
          }

          options.onInitialTranslate();
        });
      }
    }

    i18next.init(options, done);

    if (!domReady) {
      docReady(done);
    }

    if (options.autorun === false) return {
      start: done
    };
  }

  function forceRerender() {
    renderers.forEach(r => {
      r.render(true); // enforce a rerender
    });
  }

  var index = {
    init,
    i18next,
    changeNamespace,
    forceRerender
  };

  return index;

})));
