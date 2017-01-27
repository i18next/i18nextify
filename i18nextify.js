(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.i18nextify = factory());
}(this, function () { 'use strict';

	var _extends$1 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _classCallCheck$1(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var consoleLogger = {
	  type: 'logger',

	  log: function log(args) {
	    this._output('log', args);
	  },
	  warn: function warn(args) {
	    this._output('warn', args);
	  },
	  error: function error(args) {
	    this._output('error', args);
	  },
	  _output: function _output(type, args) {
	    if (console && console[type]) console[type].apply(console, Array.prototype.slice.call(args));
	  }
	};

	var Logger = function () {
	  function Logger(concreteLogger) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    _classCallCheck$1(this, Logger);

	    this.subs = [];
	    this.init(concreteLogger, options);
	  }

	  Logger.prototype.init = function init(concreteLogger) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    this.prefix = options.prefix || 'i18next:';
	    this.logger = concreteLogger || consoleLogger;
	    this.options = options;
	    this.debug = options.debug === false ? false : true;
	  };

	  Logger.prototype.setDebug = function setDebug(bool) {
	    this.debug = bool;
	    this.subs.forEach(function (sub) {
	      sub.setDebug(bool);
	    });
	  };

	  Logger.prototype.log = function log() {
	    this.forward(arguments, 'log', '', true);
	  };

	  Logger.prototype.warn = function warn() {
	    this.forward(arguments, 'warn', '', true);
	  };

	  Logger.prototype.error = function error() {
	    this.forward(arguments, 'error', '');
	  };

	  Logger.prototype.deprecate = function deprecate() {
	    this.forward(arguments, 'warn', 'WARNING DEPRECATED: ', true);
	  };

	  Logger.prototype.forward = function forward(args, lvl, prefix, debugOnly) {
	    if (debugOnly && !this.debug) return;
	    if (typeof args[0] === 'string') args[0] = prefix + this.prefix + ' ' + args[0];
	    this.logger[lvl](args);
	  };

	  Logger.prototype.create = function create(moduleName) {
	    var sub = new Logger(this.logger, _extends$1({ prefix: this.prefix + ':' + moduleName + ':' }, this.options));
	    this.subs.push(sub);

	    return sub;
	  };

	  // createInstance(options = {}) {
	  //   return new Logger(options, callback);
	  // }

	  return Logger;
	}();

	;

	var baseLogger = new Logger();

	function _classCallCheck$2(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var EventEmitter = function () {
		function EventEmitter() {
			_classCallCheck$2(this, EventEmitter);

			this.observers = {};
		}

		EventEmitter.prototype.on = function on(events, listener) {
			var _this = this;

			events.split(' ').forEach(function (event) {
				_this.observers[event] = _this.observers[event] || [];
				_this.observers[event].push(listener);
			});
		};

		EventEmitter.prototype.off = function off(event, listener) {
			var _this2 = this;

			if (!this.observers[event]) {
				return;
			}

			this.observers[event].forEach(function () {
				if (!listener) {
					delete _this2.observers[event];
				} else {
					var index = _this2.observers[event].indexOf(listener);
					if (index > -1) {
						_this2.observers[event].splice(index, 1);
					}
				}
			});
		};

		EventEmitter.prototype.emit = function emit(event) {
			for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
				args[_key - 1] = arguments[_key];
			}

			if (this.observers[event]) {
				this.observers[event].forEach(function (observer) {
					observer.apply(undefined, args);
				});
			}

			if (this.observers['*']) {
				this.observers['*'].forEach(function (observer) {
					var _ref;

					observer.apply(observer, (_ref = [event]).concat.apply(_ref, args));
				});
			}
		};

		return EventEmitter;
	}();

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

	  var stack = typeof path !== 'string' ? [].concat(path) : path.split('.');
	  while (stack.length > 1) {
	    if (!object) return {};

	    var key = cleanKey(stack.shift());
	    if (!object[key] && Empty) object[key] = new Empty();
	    object = object[key];
	  }

	  if (!object) return {};
	  return {
	    obj: object,
	    k: cleanKey(stack.shift())
	  };
	}

	function setPath(object, path, newValue) {
	  var _getLastOfPath = getLastOfPath(object, path, Object);

	  var obj = _getLastOfPath.obj;
	  var k = _getLastOfPath.k;


	  obj[k] = newValue;
	}

	function pushPath(object, path, newValue, concat) {
	  var _getLastOfPath2 = getLastOfPath(object, path, Object);

	  var obj = _getLastOfPath2.obj;
	  var k = _getLastOfPath2.k;


	  obj[k] = obj[k] || [];
	  if (concat) obj[k] = obj[k].concat(newValue);
	  if (!concat) obj[k].push(newValue);
	}

	function getPath(object, path) {
	  var _getLastOfPath3 = getLastOfPath(object, path);

	  var obj = _getLastOfPath3.obj;
	  var k = _getLastOfPath3.k;


	  if (!obj) return undefined;
	  return obj[k];
	}

	function deepExtend(target, source, overwrite) {
	  for (var prop in source) {
	    if (prop in target) {
	      // If we reached a leaf string in target or source then replace with source or skip depending on the 'overwrite' switch
	      if (typeof target[prop] === 'string' || target[prop] instanceof String || typeof source[prop] === 'string' || source[prop] instanceof String) {
	        if (overwrite) target[prop] = source[prop];
	      } else {
	        deepExtend(target[prop], source[prop], overwrite);
	      }
	    } else {
	      target[prop] = source[prop];
	    }
	  }return target;
	}

	function regexEscape(str) {
	  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
	}

	/* eslint-disable */
	var _entityMap = {
	  "&": "&amp;",
	  "<": "&lt;",
	  ">": "&gt;",
	  '"': '&quot;',
	  "'": '&#39;',
	  "/": '&#x2F;'
	};
	/* eslint-enable */

	function escape(data) {
	  if (typeof data === 'string') {
	    return data.replace(/[&<>"'\/]/g, function (s) {
	      return _entityMap[s];
	    });
	  } else {
	    return data;
	  }
	}

	var _extends$2 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _defaults$1(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

	function _classCallCheck$3(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn$1(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits$1(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults$1(subClass, superClass); }

	var ResourceStore = function (_EventEmitter) {
	  _inherits$1(ResourceStore, _EventEmitter);

	  function ResourceStore() {
	    var data = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var options = arguments.length <= 1 || arguments[1] === undefined ? { ns: ['translation'], defaultNS: 'translation' } : arguments[1];

	    _classCallCheck$3(this, ResourceStore);

	    var _this = _possibleConstructorReturn$1(this, _EventEmitter.call(this));

	    _this.data = data;
	    _this.options = options;
	    return _this;
	  }

	  ResourceStore.prototype.addNamespaces = function addNamespaces(ns) {
	    if (this.options.ns.indexOf(ns) < 0) {
	      this.options.ns.push(ns);
	    }
	  };

	  ResourceStore.prototype.removeNamespaces = function removeNamespaces(ns) {
	    var index = this.options.ns.indexOf(ns);
	    if (index > -1) {
	      this.options.ns.splice(index, 1);
	    }
	  };

	  ResourceStore.prototype.getResource = function getResource(lng, ns, key) {
	    var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

	    var keySeparator = options.keySeparator || this.options.keySeparator;
	    if (keySeparator === undefined) keySeparator = '.';

	    var path = [lng, ns];
	    if (key && typeof key !== 'string') path = path.concat(key);
	    if (key && typeof key === 'string') path = path.concat(keySeparator ? key.split(keySeparator) : key);

	    if (lng.indexOf('.') > -1) {
	      path = lng.split('.');
	    }

	    return getPath(this.data, path);
	  };

	  ResourceStore.prototype.addResource = function addResource(lng, ns, key, value) {
	    var options = arguments.length <= 4 || arguments[4] === undefined ? { silent: false } : arguments[4];

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
	  };

	  ResourceStore.prototype.addResources = function addResources(lng, ns, resources) {
	    for (var m in resources) {
	      if (typeof resources[m] === 'string') this.addResource(lng, ns, m, resources[m], { silent: true });
	    }
	    this.emit('added', lng, ns, resources);
	  };

	  ResourceStore.prototype.addResourceBundle = function addResourceBundle(lng, ns, resources, deep, overwrite) {
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
	      pack = _extends$2({}, pack, resources);
	    }

	    setPath(this.data, path, pack);

	    this.emit('added', lng, ns, resources);
	  };

	  ResourceStore.prototype.removeResourceBundle = function removeResourceBundle(lng, ns) {
	    if (this.hasResourceBundle(lng, ns)) {
	      delete this.data[lng][ns];
	    }
	    this.removeNamespaces(ns);

	    this.emit('removed', lng, ns);
	  };

	  ResourceStore.prototype.hasResourceBundle = function hasResourceBundle(lng, ns) {
	    return this.getResource(lng, ns) !== undefined;
	  };

	  ResourceStore.prototype.getResourceBundle = function getResourceBundle(lng, ns) {
	    if (!ns) ns = this.options.defaultNS;

	    // TODO: COMPATIBILITY remove extend in v2.1.0
	    if (this.options.compatibilityAPI === 'v1') return _extends$2({}, this.getResource(lng, ns));

	    return this.getResource(lng, ns);
	  };

	  ResourceStore.prototype.toJSON = function toJSON() {
	    return this.data;
	  };

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

	function convertInterpolation(options) {

	  options.interpolation = {
	    unescapeSuffix: 'HTML'
	  };

	  options.interpolation.prefix = options.interpolationPrefix || '__';
	  options.interpolation.suffix = options.interpolationSuffix || '__';
	  options.interpolation.escapeValue = options.escapeInterpolation || false;

	  options.interpolation.nestingPrefix = options.reusePrefix || '$t(';
	  options.interpolation.nestingSuffix = options.reuseSuffix || ')';

	  return options;
	}

	function convertAPIOptions(options) {
	  if (options.resStore) options.resources = options.resStore;

	  if (options.ns && options.ns.defaultNs) {
	    options.defaultNS = options.ns.defaultNs;
	    options.ns = options.ns.namespaces;
	  } else {
	    options.defaultNS = options.ns || 'translation';
	  }

	  if (options.fallbackToDefaultNS && options.defaultNS) options.fallbackNS = options.defaultNS;

	  options.saveMissing = options.sendMissing;
	  options.saveMissingTo = options.sendMissingTo || 'current';
	  options.returnNull = options.fallbackOnNull ? false : true;
	  options.returnEmptyString = options.fallbackOnEmpty ? false : true;
	  options.returnObjects = options.returnObjectTrees;
	  options.joinArrays = '\n';

	  options.returnedObjectHandler = options.objectTreeKeyHandler;
	  options.parseMissingKeyHandler = options.parseMissingKey;
	  options.appendNamespaceToMissingKey = true;

	  options.nsSeparator = options.nsseparator;
	  options.keySeparator = options.keyseparator;

	  if (options.shortcutFunction === 'sprintf') {
	    options.overloadTranslationOptionHandler = function (args) {
	      var values = [];

	      for (var i = 1; i < args.length; i++) {
	        values.push(args[i]);
	      }

	      return {
	        postProcess: 'sprintf',
	        sprintf: values
	      };
	    };
	  }

	  options.whitelist = options.lngWhitelist;
	  options.preload = options.preload;
	  if (options.load === 'current') options.load = 'currentOnly';
	  if (options.load === 'unspecific') options.load = 'languageOnly';

	  // backend
	  options.backend = options.backend || {};
	  options.backend.loadPath = options.resGetPath || 'locales/__lng__/__ns__.json';
	  options.backend.addPath = options.resPostPath || 'locales/add/__lng__/__ns__';
	  options.backend.allowMultiLoading = options.dynamicLoad;

	  // cache
	  options.cache = options.cache || {};
	  options.cache.prefix = 'res_';
	  options.cache.expirationTime = 7 * 24 * 60 * 60 * 1000;
	  options.cache.enabled = options.useLocalStorage ? true : false;

	  options = convertInterpolation(options);
	  if (options.defaultVariables) options.interpolation.defaultVariables = options.defaultVariables;

	  // TODO: deprecation
	  // if (options.getAsync === false) throw deprecation error

	  return options;
	}

	function convertJSONOptions(options) {
	  options = convertInterpolation(options);
	  options.joinArrays = '\n';

	  return options;
	}

	function convertTOptions(options) {
	  if (options.interpolationPrefix || options.interpolationSuffix || options.escapeInterpolation) {
	    options = convertInterpolation(options);
	  }

	  options.nsSeparator = options.nsseparator;
	  options.keySeparator = options.keyseparator;

	  options.returnObjects = options.returnObjectTrees;

	  return options;
	}

	function appendBackwardsAPI(i18n) {
	  i18n.lng = function () {
	    baseLogger.deprecate('i18next.lng() can be replaced by i18next.language for detected language or i18next.languages for languages ordered by translation lookup.');
	    return i18n.services.languageUtils.toResolveHierarchy(i18n.language)[0];
	  };

	  i18n.preload = function (lngs, cb) {
	    baseLogger.deprecate('i18next.preload() can be replaced with i18next.loadLanguages()');
	    i18n.loadLanguages(lngs, cb);
	  };

	  i18n.setLng = function (lng, options, callback) {
	    baseLogger.deprecate('i18next.setLng() can be replaced with i18next.changeLanguage() or i18next.getFixedT() to get a translation function with fixed language or namespace.');
	    if (typeof options === 'function') {
	      callback = options;
	      options = {};
	    }
	    if (!options) options = {};

	    if (options.fixLng === true) {
	      if (callback) return callback(null, i18n.getFixedT(lng));
	    }

	    i18n.changeLanguage(lng, callback);
	  };

	  i18n.addPostProcessor = function (name, fc) {
	    baseLogger.deprecate('i18next.addPostProcessor() can be replaced by i18next.use({ type: \'postProcessor\', name: \'name\', process: fc })');
	    i18n.use({
	      type: 'postProcessor',
	      name: name,
	      process: fc
	    });
	  };
	}

	var _extends$3 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _typeof$1 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	function _defaults$2(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

	function _classCallCheck$4(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn$2(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits$2(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults$2(subClass, superClass); }

	var Translator = function (_EventEmitter) {
	  _inherits$2(Translator, _EventEmitter);

	  function Translator(services) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    _classCallCheck$4(this, Translator);

	    var _this = _possibleConstructorReturn$2(this, _EventEmitter.call(this));

	    copy(['resourceStore', 'languageUtils', 'pluralResolver', 'interpolator', 'backendConnector'], services, _this);

	    _this.options = options;
	    _this.logger = baseLogger.create('translator');
	    return _this;
	  }

	  Translator.prototype.changeLanguage = function changeLanguage(lng) {
	    if (lng) this.language = lng;
	  };

	  Translator.prototype.exists = function exists(key) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? { interpolation: {} } : arguments[1];

	    if (this.options.compatibilityAPI === 'v1') {
	      options = convertTOptions(options);
	    }

	    return this.resolve(key, options) !== undefined;
	  };

	  Translator.prototype.extractFromKey = function extractFromKey(key, options) {
	    var nsSeparator = options.nsSeparator || this.options.nsSeparator;
	    if (nsSeparator === undefined) nsSeparator = ':';

	    var namespaces = options.ns || this.options.defaultNS;
	    if (nsSeparator && key.indexOf(nsSeparator) > -1) {
	      var parts = key.split(nsSeparator);
	      namespaces = parts[0];
	      key = parts[1];
	    }
	    if (typeof namespaces === 'string') namespaces = [namespaces];

	    return {
	      key: key,
	      namespaces: namespaces
	    };
	  };

	  Translator.prototype.translate = function translate(keys) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    if ((typeof options === 'undefined' ? 'undefined' : _typeof$1(options)) !== 'object') {
	      options = this.options.overloadTranslationOptionHandler(arguments);
	    } else if (this.options.compatibilityAPI === 'v1') {
	      options = convertTOptions(options);
	    }

	    // non valid keys handling
	    if (keys === undefined || keys === null || keys === '') return '';
	    if (typeof keys === 'number') keys = String(keys);
	    if (typeof keys === 'string') keys = [keys];

	    // return key on CIMode
	    var lng = options.lng || this.language;
	    if (lng && lng.toLowerCase() === 'cimode') return keys[keys.length - 1];

	    // separators
	    var keySeparator = options.keySeparator || this.options.keySeparator || '.';

	    // get namespace(s)

	    var _extractFromKey = this.extractFromKey(keys[keys.length - 1], options);

	    var key = _extractFromKey.key;
	    var namespaces = _extractFromKey.namespaces;

	    var namespace = namespaces[namespaces.length - 1];

	    // resolve from store
	    var res = this.resolve(keys, options);

	    var resType = Object.prototype.toString.apply(res);
	    var noObject = ['[object Number]', '[object Function]', '[object RegExp]'];
	    var joinArrays = options.joinArrays !== undefined ? options.joinArrays : this.options.joinArrays;

	    // object
	    if (res && typeof res !== 'string' && noObject.indexOf(resType) < 0 && !(joinArrays && resType === '[object Array]')) {
	      if (!options.returnObjects && !this.options.returnObjects) {
	        this.logger.warn('accessing an object - but returnObjects options is not enabled!');
	        return this.options.returnedObjectHandler ? this.options.returnedObjectHandler(key, res, options) : 'key \'' + key + ' (' + this.language + ')\' returned an object instead of string.';
	      }

	      var copy = resType === '[object Array]' ? [] : {}; // apply child translation on a copy

	      for (var m in res) {
	        copy[m] = this.translate('' + key + keySeparator + m, _extends$3({ joinArrays: false, ns: namespaces }, options));
	      }
	      res = copy;
	    }
	    // array special treatment
	    else if (joinArrays && resType === '[object Array]') {
	        res = res.join(joinArrays);
	        if (res) res = this.extendTranslation(res, key, options);
	      }
	      // string, empty or null
	      else {
	          var usedDefault = false,
	              usedKey = false;

	          // fallback value
	          if (!this.isValidLookup(res) && options.defaultValue !== undefined) {
	            usedDefault = true;
	            res = options.defaultValue;
	          }
	          if (!this.isValidLookup(res)) {
	            usedKey = true;
	            res = key;
	          }

	          // save missing
	          if (usedKey || usedDefault) {
	            this.logger.log('missingKey', lng, namespace, key, res);

	            var lngs = [];
	            if (this.options.saveMissingTo === 'fallback' && this.options.fallbackLng && this.options.fallbackLng[0]) {
	              for (var i = 0; i < this.options.fallbackLng.length; i++) {
	                lngs.push(this.options.fallbackLng[i]);
	              }
	            } else if (this.options.saveMissingTo === 'all') {
	              lngs = this.languageUtils.toResolveHierarchy(options.lng || this.language);
	            } else {
	              //(this.options.saveMissingTo === 'current' || (this.options.saveMissingTo === 'fallback' && this.options.fallbackLng[0] === false) ) {
	              lngs.push(options.lng || this.language);
	            }

	            if (this.options.saveMissing) {
	              if (this.options.missingKeyHandler) {
	                this.options.missingKeyHandler(lngs, namespace, key, res);
	              } else if (this.backendConnector && this.backendConnector.saveMissing) {
	                this.backendConnector.saveMissing(lngs, namespace, key, res);
	              }
	            }

	            this.emit('missingKey', lngs, namespace, key, res);
	          }

	          // extend
	          res = this.extendTranslation(res, key, options);

	          // append namespace if still key
	          if (usedKey && res === key && this.options.appendNamespaceToMissingKey) res = namespace + ':' + key;

	          // parseMissingKeyHandler
	          if (usedKey && this.options.parseMissingKeyHandler) res = this.options.parseMissingKeyHandler(res);
	        }

	    // return
	    return res;
	  };

	  Translator.prototype.extendTranslation = function extendTranslation(res, key, options) {
	    var _this2 = this;

	    if (options.interpolation) this.interpolator.init(options);

	    // interpolate
	    var data = options.replace && typeof options.replace !== 'string' ? options.replace : options;
	    if (this.options.interpolation.defaultVariables) data = _extends$3({}, this.options.interpolation.defaultVariables, data);
	    res = this.interpolator.interpolate(res, data, this.language);

	    // nesting
	    res = this.interpolator.nest(res, function () {
	      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

	      return _this2.translate.apply(_this2, args);
	    }, options);

	    if (options.interpolation) this.interpolator.reset();

	    // post process
	    var postProcess = options.postProcess || this.options.postProcess;
	    var postProcessorNames = typeof postProcess === 'string' ? [postProcess] : postProcess;

	    if (res !== undefined && postProcessorNames && postProcessorNames.length && options.applyPostProcessor !== false) {
	      res = postProcessor.handle(postProcessorNames, res, key, options, this);
	    }

	    return res;
	  };

	  Translator.prototype.resolve = function resolve(keys) {
	    var _this3 = this;

	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    var found = void 0;

	    if (typeof keys === 'string') keys = [keys];

	    // forEach possible key
	    keys.forEach(function (k) {
	      if (_this3.isValidLookup(found)) return;

	      var _extractFromKey2 = _this3.extractFromKey(k, options);

	      var key = _extractFromKey2.key;
	      var namespaces = _extractFromKey2.namespaces;

	      if (_this3.options.fallbackNS) namespaces = namespaces.concat(_this3.options.fallbackNS);

	      var needsPluralHandling = options.count !== undefined && typeof options.count !== 'string';
	      var needsContextHandling = options.context !== undefined && typeof options.context === 'string' && options.context !== '';

	      var codes = options.lngs ? options.lngs : _this3.languageUtils.toResolveHierarchy(options.lng || _this3.language);

	      namespaces.forEach(function (ns) {
	        if (_this3.isValidLookup(found)) return;

	        codes.forEach(function (code) {
	          if (_this3.isValidLookup(found)) return;

	          var finalKey = key;
	          var finalKeys = [finalKey];

	          var pluralSuffix = void 0;
	          if (needsPluralHandling) pluralSuffix = _this3.pluralResolver.getSuffix(code, options.count);

	          // fallback for plural if context not found
	          if (needsPluralHandling && needsContextHandling) finalKeys.push(finalKey + pluralSuffix);

	          // get key for context if needed
	          if (needsContextHandling) finalKeys.push(finalKey += '' + _this3.options.contextSeparator + options.context);

	          // get key for plural if needed
	          if (needsPluralHandling) finalKeys.push(finalKey += pluralSuffix);

	          // iterate over finalKeys starting with most specific pluralkey (-> contextkey only) -> singularkey only
	          var possibleKey = void 0;
	          while (possibleKey = finalKeys.pop()) {
	            if (_this3.isValidLookup(found)) continue;
	            found = _this3.getResource(code, ns, possibleKey, options);
	          }
	        });
	      });
	    });

	    return found;
	  };

	  Translator.prototype.isValidLookup = function isValidLookup(res) {
	    return res !== undefined && !(!this.options.returnNull && res === null) && !(!this.options.returnEmptyString && res === '');
	  };

	  Translator.prototype.getResource = function getResource(code, ns, key) {
	    var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

	    return this.resourceStore.getResource(code, ns, key, options);
	  };

	  return Translator;
	}(EventEmitter);

	function _classCallCheck$5(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function capitalize(string) {
	  return string.charAt(0).toUpperCase() + string.slice(1);
	}

	var LanguageUtil = function () {
	  function LanguageUtil(options) {
	    _classCallCheck$5(this, LanguageUtil);

	    this.options = options;

	    this.whitelist = this.options.whitelist || false;
	    this.logger = baseLogger.create('languageUtils');
	  }

	  LanguageUtil.prototype.getLanguagePartFromCode = function getLanguagePartFromCode(code) {
	    if (code.indexOf('-') < 0) return code;

	    var specialCases = ['NB-NO', 'NN-NO', 'nb-NO', 'nn-NO', 'nb-no', 'nn-no'];
	    var p = code.split('-');
	    return this.formatLanguageCode(specialCases.indexOf(code) > -1 ? p[1].toLowerCase() : p[0]);
	  };

	  LanguageUtil.prototype.formatLanguageCode = function formatLanguageCode(code) {
	    // http://www.iana.org/assignments/language-tags/language-tags.xhtml
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

	        // if lenght 2 guess it's a country
	        if (p[1].length === 2) p[1] = p[1].toUpperCase();
	        if (p[0] !== 'sgn' && p[2].length === 2) p[2] = p[2].toUpperCase();

	        if (specialCases.indexOf(p[1].toLowerCase()) > -1) p[1] = capitalize(p[1].toLowerCase());
	        if (specialCases.indexOf(p[2].toLowerCase()) > -1) p[2] = capitalize(p[2].toLowerCase());
	      }

	      return p.join('-');
	    } else {
	      return this.options.cleanCode || this.options.lowerCaseLng ? code.toLowerCase() : code;
	    }
	  };

	  LanguageUtil.prototype.isWhitelisted = function isWhitelisted(code, exactMatch) {
	    if (this.options.load === 'languageOnly' || this.options.nonExplicitWhitelist && !exactMatch) {
	      code = this.getLanguagePartFromCode(code);
	    }
	    return !this.whitelist || !this.whitelist.length || this.whitelist.indexOf(code) > -1 ? true : false;
	  };

	  LanguageUtil.prototype.toResolveHierarchy = function toResolveHierarchy(code, fallbackCode) {
	    var _this = this;

	    fallbackCode = fallbackCode || this.options.fallbackLng || [];
	    if (typeof fallbackCode === 'string') fallbackCode = [fallbackCode];

	    var codes = [];
	    var addCode = function addCode(code) {
	      var exactMatch = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

	      if (_this.isWhitelisted(code, exactMatch)) {
	        codes.push(code);
	      } else {
	        _this.logger.warn('rejecting non-whitelisted language code: ' + code);
	      }
	    };

	    if (typeof code === 'string' && code.indexOf('-') > -1) {
	      if (this.options.load !== 'languageOnly') addCode(this.formatLanguageCode(code), true);
	      if (this.options.load !== 'currentOnly') addCode(this.getLanguagePartFromCode(code));
	    } else if (typeof code === 'string') {
	      addCode(this.formatLanguageCode(code));
	    }

	    fallbackCode.forEach(function (fc) {
	      if (codes.indexOf(fc) < 0) addCode(_this.formatLanguageCode(fc));
	    });

	    return codes;
	  };

	  return LanguageUtil;
	}();

	;

	var _typeof$2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	function _classCallCheck$6(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// definition http://translate.sourceforge.net/wiki/l10n/pluralforms
	/* eslint-disable */
	var sets = [{ lngs: ['ach', 'ak', 'am', 'arn', 'br', 'fil', 'gun', 'ln', 'mfe', 'mg', 'mi', 'oc', 'tg', 'ti', 'tr', 'uz', 'wa'], nr: [1, 2], fc: 1 }, { lngs: ['af', 'an', 'ast', 'az', 'bg', 'bn', 'ca', 'da', 'de', 'dev', 'el', 'en', 'eo', 'es', 'es_ar', 'et', 'eu', 'fi', 'fo', 'fur', 'fy', 'gl', 'gu', 'ha', 'he', 'hi', 'hu', 'hy', 'ia', 'it', 'kn', 'ku', 'lb', 'mai', 'ml', 'mn', 'mr', 'nah', 'nap', 'nb', 'ne', 'nl', 'nn', 'no', 'nso', 'pa', 'pap', 'pms', 'ps', 'pt', 'pt_br', 'rm', 'sco', 'se', 'si', 'so', 'son', 'sq', 'sv', 'sw', 'ta', 'te', 'tk', 'ur', 'yo'], nr: [1, 2], fc: 2 }, { lngs: ['ay', 'bo', 'cgg', 'fa', 'id', 'ja', 'jbo', 'ka', 'kk', 'km', 'ko', 'ky', 'lo', 'ms', 'sah', 'su', 'th', 'tt', 'ug', 'vi', 'wo', 'zh'], nr: [1], fc: 3 }, { lngs: ['be', 'bs', 'dz', 'hr', 'ru', 'sr', 'uk'], nr: [1, 2, 5], fc: 4 }, { lngs: ['ar'], nr: [0, 1, 2, 3, 11, 100], fc: 5 }, { lngs: ['cs', 'sk'], nr: [1, 2, 5], fc: 6 }, { lngs: ['csb', 'pl'], nr: [1, 2, 5], fc: 7 }, { lngs: ['cy'], nr: [1, 2, 3, 8], fc: 8 }, { lngs: ['fr'], nr: [1, 2], fc: 9 }, { lngs: ['ga'], nr: [1, 2, 3, 7, 11], fc: 10 }, { lngs: ['gd'], nr: [1, 2, 3, 20], fc: 11 }, { lngs: ['is'], nr: [1, 2], fc: 12 }, { lngs: ['jv'], nr: [0, 1], fc: 13 }, { lngs: ['kw'], nr: [1, 2, 3, 4], fc: 14 }, { lngs: ['lt'], nr: [1, 2, 10], fc: 15 }, { lngs: ['lv'], nr: [1, 2, 0], fc: 16 }, { lngs: ['mk'], nr: [1, 2], fc: 17 }, { lngs: ['mnk'], nr: [0, 1, 2], fc: 18 }, { lngs: ['mt'], nr: [1, 2, 11, 20], fc: 19 }, { lngs: ['or'], nr: [2, 1], fc: 2 }, { lngs: ['ro'], nr: [1, 2, 20], fc: 20 }, { lngs: ['sl'], nr: [5, 1, 2, 3], fc: 21 }];

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
	    return Number(n === 0 ? 0 : n == 1 ? 1 : n == 2 ? 2 : n % 100 >= 3 && n % 100 <= 10 ? 3 : n % 100 >= 11 ? 4 : 5);
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
	    return Number(n == 1 || n % 10 == 1 ? 0 : 1);
	  },
	  18: function _(n) {
	    return Number(n == 0 ? 0 : n == 1 ? 1 : 2);
	  },
	  19: function _(n) {
	    return Number(n == 1 ? 0 : n === 0 || n % 100 > 1 && n % 100 < 11 ? 1 : n % 100 > 10 && n % 100 < 20 ? 2 : 3);
	  },
	  20: function _(n) {
	    return Number(n == 1 ? 0 : n === 0 || n % 100 > 0 && n % 100 < 20 ? 1 : 2);
	  },
	  21: function _(n) {
	    return Number(n % 100 == 1 ? 1 : n % 100 == 2 ? 2 : n % 100 == 3 || n % 100 == 4 ? 3 : 0);
	  }
	};
	/* eslint-enable */

	function createRules() {
	  var l,
	      rules = {};
	  sets.forEach(function (set) {
	    set.lngs.forEach(function (l) {
	      return rules[l] = {
	        numbers: set.nr,
	        plurals: _rulesPluralsTypes[set.fc]
	      };
	    });
	  });
	  return rules;
	}

	var PluralResolver = function () {
	  function PluralResolver(languageUtils) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    _classCallCheck$6(this, PluralResolver);

	    this.languageUtils = languageUtils;
	    this.options = options;

	    this.logger = baseLogger.create('pluralResolver');

	    this.rules = createRules();
	  }

	  PluralResolver.prototype.addRule = function addRule(lng, obj) {
	    this.rules[lng] = obj;
	  };

	  PluralResolver.prototype.getRule = function getRule(code) {
	    return this.rules[this.languageUtils.getLanguagePartFromCode(code)];
	  };

	  PluralResolver.prototype.needsPlural = function needsPlural(code) {
	    var rule = this.getRule(code);

	    return rule && rule.numbers.length <= 1 ? false : true;
	  };

	  PluralResolver.prototype.getSuffix = function getSuffix(code, count) {
	    var _this = this;

	    var rule = this.getRule(code);

	    if (rule) {
	      var _ret = function () {
	        if (rule.numbers.length === 1) return {
	            v: ''
	          }; // only singular

	        var idx = rule.noAbs ? rule.plurals(count) : rule.plurals(Math.abs(count));
	        var suffix = rule.numbers[idx];

	        // special treatment for lngs only having singular and plural
	        if (rule.numbers.length === 2 && rule.numbers[0] === 1) {
	          if (suffix === 2) {
	            suffix = 'plural';
	          } else if (suffix === 1) {
	            suffix = '';
	          }
	        }

	        var returnSuffix = function returnSuffix() {
	          return _this.options.prepend && suffix.toString() ? _this.options.prepend + suffix.toString() : suffix.toString();
	        };

	        // COMPATIBILITY JSON
	        // v1
	        if (_this.options.compatibilityJSON === 'v1') {
	          if (suffix === 1) return {
	              v: ''
	            };
	          if (typeof suffix === 'number') return {
	              v: '_plural_' + suffix.toString()
	            };
	          return {
	            v: returnSuffix()
	          };
	        }
	        // v2
	        else if (_this.options.compatibilityJSON === 'v2' || rule.numbers.length === 2 && rule.numbers[0] === 1) {
	            return {
	              v: returnSuffix()
	            };
	          }
	          // v3 - gettext index
	          else if (rule.numbers.length === 2 && rule.numbers[0] === 1) {
	              return {
	                v: returnSuffix()
	              };
	            }
	        return {
	          v: _this.options.prepend && idx.toString() ? _this.options.prepend + idx.toString() : idx.toString()
	        };
	      }();

	      if ((typeof _ret === 'undefined' ? 'undefined' : _typeof$2(_ret)) === "object") return _ret.v;
	    } else {
	      this.logger.warn('no plural rule found for: ' + code);
	      return '';
	    }
	  };

	  return PluralResolver;
	}();

	;

	function _classCallCheck$7(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Interpolator = function () {
	  function Interpolator() {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    _classCallCheck$7(this, Interpolator);

	    this.logger = baseLogger.create('interpolator');

	    this.init(options, true);
	  }

	  Interpolator.prototype.init = function init() {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var reset = arguments[1];

	    if (reset) {
	      this.options = options;
	      this.format = options.interpolation && options.interpolation.format || function (value) {
	        return value;
	      };
	    }
	    if (!options.interpolation) options.interpolation = { escapeValue: true };

	    var iOpts = options.interpolation;

	    this.escapeValue = iOpts.escapeValue;

	    this.prefix = iOpts.prefix ? regexEscape(iOpts.prefix) : iOpts.prefixEscaped || '{{';
	    this.suffix = iOpts.suffix ? regexEscape(iOpts.suffix) : iOpts.suffixEscaped || '}}';
	    this.formatSeparator = iOpts.formatSeparator ? regexEscape(iOpts.formatSeparator) : iOpts.formatSeparator || ',';

	    this.unescapePrefix = iOpts.unescapeSuffix ? '' : iOpts.unescapePrefix || '-';
	    this.unescapeSuffix = this.unescapePrefix ? '' : iOpts.unescapeSuffix || '';

	    this.nestingPrefix = iOpts.nestingPrefix ? regexEscape(iOpts.nestingPrefix) : iOpts.nestingPrefixEscaped || regexEscape('$t(');
	    this.nestingSuffix = iOpts.nestingSuffix ? regexEscape(iOpts.nestingSuffix) : iOpts.nestingSuffixEscaped || regexEscape(')');

	    // the regexp
	    var regexpStr = this.prefix + '(.+?)' + this.suffix;
	    this.regexp = new RegExp(regexpStr, 'g');

	    var regexpUnescapeStr = this.prefix + this.unescapePrefix + '(.+?)' + this.unescapeSuffix + this.suffix;
	    this.regexpUnescape = new RegExp(regexpUnescapeStr, 'g');

	    var nestingRegexpStr = this.nestingPrefix + '(.+?)' + this.nestingSuffix;
	    this.nestingRegexp = new RegExp(nestingRegexpStr, 'g');
	  };

	  Interpolator.prototype.reset = function reset() {
	    if (this.options) this.init(this.options);
	  };

	  Interpolator.prototype.interpolate = function interpolate(str, data, lng) {
	    var _this = this;

	    var match = void 0,
	        value = void 0;

	    function regexSafe(val) {
	      return val.replace(/\$/g, '$$$$');
	    }

	    var handleFormat = function handleFormat(key) {
	      if (key.indexOf(_this.formatSeparator) < 0) return getPath(data, key);

	      var p = key.split(_this.formatSeparator);
	      var k = p.shift().trim();
	      var f = p.join(_this.formatSeparator).trim();

	      return _this.format(getPath(data, k), f, lng);
	    };

	    // unescape if has unescapePrefix/Suffix
	    while (match = this.regexpUnescape.exec(str)) {
	      var _value = handleFormat(match[1].trim());
	      str = str.replace(match[0], _value);
	      this.regexpUnescape.lastIndex = 0;
	    }

	    // regular escape on demand
	    while (match = this.regexp.exec(str)) {
	      value = handleFormat(match[1].trim());
	      if (typeof value !== 'string') value = makeString(value);
	      if (!value) {
	        this.logger.warn('missed to pass in variable ' + match[1] + ' for interpolating ' + str);
	        value = '';
	      }
	      value = this.escapeValue ? regexSafe(escape(value)) : regexSafe(value);
	      str = str.replace(match[0], value);
	      this.regexp.lastIndex = 0;
	    }
	    return str;
	  };

	  Interpolator.prototype.nest = function nest(str, fc) {
	    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

	    var match = void 0,
	        value = void 0;

	    var clonedOptions = JSON.parse(JSON.stringify(options));
	    clonedOptions.applyPostProcessor = false; // avoid post processing on nested lookup

	    function regexSafe(val) {
	      return val.replace(/\$/g, '$$$$');
	    }

	    // if value is something like "myKey": "lorem $(anotherKey, { "count": {{aValueInOptions}} })"
	    function handleHasOptions(key) {
	      if (key.indexOf(',') < 0) return key;

	      var p = key.split(',');
	      key = p.shift();
	      var optionsString = p.join(',');
	      optionsString = this.interpolate(optionsString, clonedOptions);

	      try {
	        clonedOptions = JSON.parse(optionsString);
	      } catch (e) {
	        this.logger.error('failed parsing options string in nesting for key ' + key, e);
	      }

	      return key;
	    }

	    // regular escape on demand
	    while (match = this.nestingRegexp.exec(str)) {
	      value = fc(handleHasOptions.call(this, match[1].trim()), clonedOptions);
	      if (typeof value !== 'string') value = makeString(value);
	      if (!value) {
	        this.logger.warn('missed to pass in variable ' + match[1] + ' for interpolating ' + str);
	        value = '';
	      }
	      value = this.escapeValue ? regexSafe(escape(value)) : regexSafe(value);
	      str = str.replace(match[0], value);
	      this.regexp.lastIndex = 0;
	    }
	    return str;
	  };

	  return Interpolator;
	}();

	var _extends$4 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	function _defaults$3(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

	function _classCallCheck$8(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn$3(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits$3(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults$3(subClass, superClass); }

	function remove(arr, what) {
	  var found = arr.indexOf(what);

	  while (found !== -1) {
	    arr.splice(found, 1);
	    found = arr.indexOf(what);
	  }
	}

	var Connector = function (_EventEmitter) {
	  _inherits$3(Connector, _EventEmitter);

	  function Connector(backend, store, services) {
	    var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

	    _classCallCheck$8(this, Connector);

	    var _this = _possibleConstructorReturn$3(this, _EventEmitter.call(this));

	    _this.backend = backend;
	    _this.store = store;
	    _this.services = services;
	    _this.options = options;
	    _this.logger = baseLogger.create('backendConnector');

	    _this.state = {};
	    _this.queue = [];

	    _this.backend && _this.backend.init && _this.backend.init(services, options.backend, options);
	    return _this;
	  }

	  Connector.prototype.queueLoad = function queueLoad(languages, namespaces, callback) {
	    var _this2 = this;

	    // find what needs to be loaded
	    var toLoad = [],
	        pending = [],
	        toLoadLanguages = [],
	        toLoadNamespaces = [];

	    languages.forEach(function (lng) {
	      var hasAllNamespaces = true;

	      namespaces.forEach(function (ns) {
	        var name = lng + '|' + ns;

	        if (_this2.store.hasResourceBundle(lng, ns)) {
	          _this2.state[name] = 2; // loaded
	        } else if (_this2.state[name] < 0) {
	            // nothing to do for err
	          } else if (_this2.state[name] === 1) {
	              if (pending.indexOf(name) < 0) pending.push(name);
	            } else {
	              _this2.state[name] = 1; // pending

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
	  };

	  Connector.prototype.loaded = function loaded(name, err, data) {
	    var _this3 = this;

	    var _name$split = name.split('|');

	    var _name$split2 = _slicedToArray(_name$split, 2);

	    var lng = _name$split2[0];
	    var ns = _name$split2[1];


	    if (err) this.emit('failedLoading', lng, ns, err);

	    if (data) {
	      this.store.addResourceBundle(lng, ns, data);
	    }

	    // set loaded
	    this.state[name] = err ? -1 : 2;
	    // callback if ready
	    this.queue.forEach(function (q) {
	      pushPath(q.loaded, [lng], ns);
	      remove(q.pending, name);

	      if (err) q.errors.push(err);

	      if (q.pending.length === 0 && !q.done) {
	        q.errors.length ? q.callback(q.errors) : q.callback();
	        _this3.emit('loaded', q.loaded);
	        q.done = true;
	      }
	    });

	    // remove done load requests
	    this.queue = this.queue.filter(function (q) {
	      return !q.done;
	    });
	  };

	  Connector.prototype.read = function read(lng, ns, fcName, tried, wait, callback) {
	    var _this4 = this;

	    if (!tried) tried = 0;
	    if (!wait) wait = 250;

	    if (!lng.length) return callback(null, {}); // noting to load

	    this.backend[fcName](lng, ns, function (err, data) {
	      if (err && data /* = retryFlag */ && tried < 5) {
	        setTimeout(function () {
	          _this4.read.call(_this4, lng, ns, fcName, ++tried, wait * 2, callback);
	        }, wait);
	        return;
	      }
	      callback(err, data);
	    });
	  };

	  Connector.prototype.load = function load(languages, namespaces, callback) {
	    var _this5 = this;

	    if (!this.backend) {
	      this.logger.warn('No backend was added via i18next.use. Will not load resources.');
	      return callback && callback();
	    }
	    var options = _extends$4({}, this.backend.options, this.options.backend);

	    if (typeof languages === 'string') languages = this.services.languageUtils.toResolveHierarchy(languages);
	    if (typeof namespaces === 'string') namespaces = [namespaces];

	    var toLoad = this.queueLoad(languages, namespaces, callback);
	    if (!toLoad.toLoad.length) {
	      if (!toLoad.pending.length) callback(); // nothing to load and no pendings...callback now
	      return; // pendings will trigger callback
	    }

	    // load with multi-load
	    if (options.allowMultiLoading && this.backend.readMulti) {
	      this.read(toLoad.toLoadLanguages, toLoad.toLoadNamespaces, 'readMulti', null, null, function (err, data) {
	        if (err) _this5.logger.warn('loading namespaces ' + toLoad.toLoadNamespaces.join(', ') + ' for languages ' + toLoad.toLoadLanguages.join(', ') + ' via multiloading failed', err);
	        if (!err && data) _this5.logger.log('loaded namespaces ' + toLoad.toLoadNamespaces.join(', ') + ' for languages ' + toLoad.toLoadLanguages.join(', ') + ' via multiloading', data);

	        toLoad.toLoad.forEach(function (name) {
	          var _name$split3 = name.split('|');

	          var _name$split4 = _slicedToArray(_name$split3, 2);

	          var l = _name$split4[0];
	          var n = _name$split4[1];


	          var bundle = getPath(data, [l, n]);
	          if (bundle) {
	            _this5.loaded(name, err, bundle);
	          } else {
	            var _err = 'loading namespace ' + n + ' for language ' + l + ' via multiloading failed';
	            _this5.loaded(name, _err);
	            _this5.logger.error(_err);
	          }
	        });
	      });
	    }

	    // load one by one
	    else {
	        (function () {
	          var readOne = function readOne(name) {
	            var _this6 = this;

	            var _name$split5 = name.split('|');

	            var _name$split6 = _slicedToArray(_name$split5, 2);

	            var lng = _name$split6[0];
	            var ns = _name$split6[1];


	            this.read(lng, ns, 'read', null, null, function (err, data) {
	              if (err) _this6.logger.warn('loading namespace ' + ns + ' for language ' + lng + ' failed', err);
	              if (!err && data) _this6.logger.log('loaded namespace ' + ns + ' for language ' + lng, data);

	              _this6.loaded(name, err, data);
	            });
	          };

	          ;

	          toLoad.toLoad.forEach(function (name) {
	            readOne.call(_this5, name);
	          });
	        })();
	      }
	  };

	  Connector.prototype.reload = function reload(languages, namespaces) {
	    var _this7 = this;

	    if (!this.backend) {
	      this.logger.warn('No backend was added via i18next.use. Will not load resources.');
	    }
	    var options = _extends$4({}, this.backend.options, this.options.backend);

	    if (typeof languages === 'string') languages = this.services.languageUtils.toResolveHierarchy(languages);
	    if (typeof namespaces === 'string') namespaces = [namespaces];

	    // load with multi-load
	    if (options.allowMultiLoading && this.backend.readMulti) {
	      this.read(languages, namespaces, 'readMulti', null, null, function (err, data) {
	        if (err) _this7.logger.warn('reloading namespaces ' + namespaces.join(', ') + ' for languages ' + languages.join(', ') + ' via multiloading failed', err);
	        if (!err && data) _this7.logger.log('reloaded namespaces ' + namespaces.join(', ') + ' for languages ' + languages.join(', ') + ' via multiloading', data);

	        languages.forEach(function (l) {
	          namespaces.forEach(function (n) {
	            var bundle = getPath(data, [l, n]);
	            if (bundle) {
	              _this7.loaded(l + '|' + n, err, bundle);
	            } else {
	              var _err2 = 'reloading namespace ' + n + ' for language ' + l + ' via multiloading failed';
	              _this7.loaded(l + '|' + n, _err2);
	              _this7.logger.error(_err2);
	            }
	          });
	        });
	      });
	    }

	    // load one by one
	    else {
	        (function () {
	          var readOne = function readOne(name) {
	            var _this8 = this;

	            var _name$split7 = name.split('|');

	            var _name$split8 = _slicedToArray(_name$split7, 2);

	            var lng = _name$split8[0];
	            var ns = _name$split8[1];


	            this.read(lng, ns, 'read', null, null, function (err, data) {
	              if (err) _this8.logger.warn('reloading namespace ' + ns + ' for language ' + lng + ' failed', err);
	              if (!err && data) _this8.logger.log('reloaded namespace ' + ns + ' for language ' + lng, data);

	              _this8.loaded(name, err, data);
	            });
	          };

	          ;

	          languages.forEach(function (l) {
	            namespaces.forEach(function (n) {
	              readOne.call(_this7, l + '|' + n);
	            });
	          });
	        })();
	      }
	  };

	  Connector.prototype.saveMissing = function saveMissing(languages, namespace, key, fallbackValue) {
	    if (this.backend && this.backend.create) this.backend.create(languages, namespace, key, fallbackValue);

	    // write to store to avoid resending
	    if (!languages || !languages[0]) return;
	    this.store.addResource(languages[0], namespace, key, fallbackValue);
	  };

	  return Connector;
	}(EventEmitter);

	var _extends$5 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _defaults$4(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

	function _classCallCheck$9(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn$4(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits$4(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults$4(subClass, superClass); }

	var Connector$1 = function (_EventEmitter) {
	  _inherits$4(Connector, _EventEmitter);

	  function Connector(cache, store, services) {
	    var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

	    _classCallCheck$9(this, Connector);

	    var _this = _possibleConstructorReturn$4(this, _EventEmitter.call(this));

	    _this.cache = cache;
	    _this.store = store;
	    _this.services = services;
	    _this.options = options;
	    _this.logger = baseLogger.create('cacheConnector');

	    _this.cache && _this.cache.init && _this.cache.init(services, options.cache, options);
	    return _this;
	  }

	  Connector.prototype.load = function load(languages, namespaces, callback) {
	    var _this2 = this;

	    if (!this.cache) return callback && callback();
	    var options = _extends$5({}, this.cache.options, this.options.cache);

	    if (typeof languages === 'string') languages = this.services.languageUtils.toResolveHierarchy(languages);
	    if (typeof namespaces === 'string') namespaces = [namespaces];

	    if (options.enabled) {
	      this.cache.load(languages, function (err, data) {
	        if (err) _this2.logger.error('loading languages ' + languages.join(', ') + ' from cache failed', err);
	        if (data) {
	          for (var l in data) {
	            for (var n in data[l]) {
	              if (n === 'i18nStamp') continue;
	              var bundle = data[l][n];
	              if (bundle) _this2.store.addResourceBundle(l, n, bundle);
	            }
	          }
	        }
	        if (callback) callback();
	      });
	    } else {
	      if (callback) callback();
	    }
	  };

	  Connector.prototype.save = function save() {
	    if (this.cache && this.options.cache && this.options.cache.enabled) this.cache.save(this.store.data);
	  };

	  return Connector;
	}(EventEmitter);

	function get() {
	  return {
	    debug: false,
	    initImmediate: true,

	    ns: ['translation'],
	    defaultNS: ['translation'],
	    fallbackLng: ['dev'],
	    fallbackNS: false, // string or array of namespaces

	    whitelist: false, // array with whitelisted languages
	    nonExplicitWhitelist: false,
	    load: 'all', // | currentOnly | languageOnly
	    preload: false, // array with preload languages

	    keySeparator: '.',
	    nsSeparator: ':',
	    pluralSeparator: '_',
	    contextSeparator: '_',

	    saveMissing: false, // enable to send missing values
	    saveMissingTo: 'fallback', // 'current' || 'all'
	    missingKeyHandler: false, // function(lng, ns, key, fallbackValue) -> override if prefer on handling

	    postProcess: false, // string or array of postProcessor names
	    returnNull: true, // allows null value as valid translation
	    returnEmptyString: true, // allows empty string value as valid translation
	    returnObjects: false,
	    joinArrays: false, // or string to join array
	    returnedObjectHandler: function returnedObjectHandler() {}, // function(key, value, options) triggered if key returns object but returnObjects is set to false
	    parseMissingKeyHandler: false, // function(key) parsed a key that was not found in t() before returning
	    appendNamespaceToMissingKey: false,
	    overloadTranslationOptionHandler: function overloadTranslationOptionHandler(args) {
	      return { defaultValue: args[1] };
	    },

	    interpolation: {
	      escapeValue: true,
	      format: function format(value, _format, lng) {
	        return value;
	      },
	      prefix: '{{',
	      suffix: '}}',
	      formatSeparator: ',',
	      // prefixEscaped: '{{',
	      // suffixEscaped: '}}',
	      // unescapeSuffix: '',
	      unescapePrefix: '-',

	      nestingPrefix: '$t(',
	      nestingSuffix: ')',
	      // nestingPrefixEscaped: '$t(',
	      // nestingSuffixEscaped: ')',
	      defaultVariables: undefined // object that can have values to interpolate on - extends passed in interpolation data
	    }
	  };
	}

	function transformOptions(options) {
	  // create namespace object if namespace is passed in as string
	  if (typeof options.ns === 'string') options.ns = [options.ns];
	  if (typeof options.fallbackLng === 'string') options.fallbackLng = [options.fallbackLng];
	  if (typeof options.fallbackNS === 'string') options.fallbackNS = [options.fallbackNS];

	  // extend whitelist with cimode
	  if (options.whitelist && options.whitelist.indexOf('cimode') < 0) options.whitelist.push('cimode');

	  return options;
	}

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

	var I18n = function (_EventEmitter) {
	  _inherits(I18n, _EventEmitter);

	  function I18n() {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var callback = arguments[1];

	    _classCallCheck(this, I18n);

	    var _this = _possibleConstructorReturn(this, _EventEmitter.call(this));

	    _this.options = transformOptions(options);
	    _this.services = {};
	    _this.logger = baseLogger;
	    _this.modules = {};

	    if (callback && !_this.isInitialized) _this.init(options, callback);
	    return _this;
	  }

	  I18n.prototype.init = function init(options, callback) {
	    var _this2 = this;

	    if (typeof options === 'function') {
	      callback = options;
	      options = {};
	    }
	    if (!options) options = {};

	    if (options.compatibilityAPI === 'v1') {
	      this.options = _extends({}, get(), transformOptions(convertAPIOptions(options)), {});
	    } else if (options.compatibilityJSON === 'v1') {
	      this.options = _extends({}, get(), transformOptions(convertJSONOptions(options)), {});
	    } else {
	      this.options = _extends({}, get(), this.options, transformOptions(options));
	    }
	    if (!callback) callback = function callback() {};

	    function createClassOnDemand(ClassOrObject) {
	      if (!ClassOrObject) return;
	      if (typeof ClassOrObject === 'function') return new ClassOrObject();
	      return ClassOrObject;
	    }

	    // init services
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
	      s.resourceStore.on('added removed', function (lng, ns) {
	        s.cacheConnector.save();
	      });
	      s.languageUtils = lu;
	      s.pluralResolver = new PluralResolver(lu, { prepend: this.options.pluralSeparator, compatibilityJSON: this.options.compatibilityJSON });
	      s.interpolator = new Interpolator(this.options);

	      s.backendConnector = new Connector(createClassOnDemand(this.modules.backend), s.resourceStore, s, this.options);
	      // pipe events from backendConnector
	      s.backendConnector.on('*', function (event) {
	        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	          args[_key - 1] = arguments[_key];
	        }

	        _this2.emit.apply(_this2, [event].concat(args));
	      });

	      s.backendConnector.on('loaded', function (loaded) {
	        s.cacheConnector.save();
	      });

	      s.cacheConnector = new Connector$1(createClassOnDemand(this.modules.cache), s.resourceStore, s, this.options);
	      // pipe events from backendConnector
	      s.cacheConnector.on('*', function (event) {
	        for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	          args[_key2 - 1] = arguments[_key2];
	        }

	        _this2.emit.apply(_this2, [event].concat(args));
	      });

	      if (this.modules.languageDetector) {
	        s.languageDetector = createClassOnDemand(this.modules.languageDetector);
	        s.languageDetector.init(s, this.options.detection, this.options);
	      }

	      this.translator = new Translator(this.services, this.options);
	      // pipe events from translator
	      this.translator.on('*', function (event) {
	        for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
	          args[_key3 - 1] = arguments[_key3];
	        }

	        _this2.emit.apply(_this2, [event].concat(args));
	      });
	    }

	    // append api
	    var storeApi = ['getResource', 'addResource', 'addResources', 'addResourceBundle', 'removeResourceBundle', 'hasResourceBundle', 'getResourceBundle'];
	    storeApi.forEach(function (fcName) {
	      _this2[fcName] = function () {
	        return this.store[fcName].apply(this.store, arguments);
	      };
	    });

	    // TODO: COMPATIBILITY remove this
	    if (this.options.compatibilityAPI === 'v1') appendBackwardsAPI(this);

	    var load = function load() {
	      _this2.changeLanguage(_this2.options.lng, function (err, t) {
	        _this2.emit('initialized', _this2.options);
	        _this2.logger.log('initialized', _this2.options);

	        callback(err, t);
	      });
	    };

	    if (this.options.resources || !this.options.initImmediate) {
	      load();
	    } else {
	      setTimeout(load, 0);
	    }

	    return this;
	  };

	  I18n.prototype.loadResources = function loadResources(callback) {
	    var _this3 = this;

	    if (!callback) callback = function callback() {};

	    if (!this.options.resources) {
	      var _ret = function () {
	        if (_this3.language && _this3.language.toLowerCase() === 'cimode') return {
	            v: callback()
	          }; // avoid loading resources for cimode

	        var toLoad = [];

	        var append = function append(lng) {
	          var lngs = _this3.services.languageUtils.toResolveHierarchy(lng);
	          lngs.forEach(function (l) {
	            if (toLoad.indexOf(l) < 0) toLoad.push(l);
	          });
	        };

	        append(_this3.language);

	        if (_this3.options.preload) {
	          _this3.options.preload.forEach(function (l) {
	            append(l);
	          });
	        }

	        _this3.services.cacheConnector.load(toLoad, _this3.options.ns, function () {
	          _this3.services.backendConnector.load(toLoad, _this3.options.ns, callback);
	        });
	      }();

	      if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	    } else {
	      callback(null);
	    }
	  };

	  I18n.prototype.reloadResources = function reloadResources(lngs, ns) {
	    if (!lngs) lngs = this.languages;
	    if (!ns) ns = this.options.ns;
	    this.services.backendConnector.reload(lngs, ns);
	  };

	  I18n.prototype.use = function use(module) {
	    if (module.type === 'backend') {
	      this.modules.backend = module;
	    }

	    if (module.type === 'cache') {
	      this.modules.cache = module;
	    }

	    if (module.type === 'logger' || module.log && module.warn && module.warn) {
	      this.modules.logger = module;
	    }

	    if (module.type === 'languageDetector') {
	      this.modules.languageDetector = module;
	    }

	    if (module.type === 'postProcessor') {
	      postProcessor.addPostProcessor(module);
	    }

	    return this;
	  };

	  I18n.prototype.changeLanguage = function changeLanguage(lng, callback) {
	    var _this4 = this;

	    var done = function done(err) {
	      if (lng) {
	        _this4.emit('languageChanged', lng);
	        _this4.logger.log('languageChanged', lng);
	      }

	      if (callback) callback(err, function () {
	        for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
	          args[_key4] = arguments[_key4];
	        }

	        return _this4.t.apply(_this4, args);
	      });
	    };

	    if (!lng && this.services.languageDetector) lng = this.services.languageDetector.detect();

	    if (lng) {
	      this.language = lng;
	      this.languages = this.services.languageUtils.toResolveHierarchy(lng);

	      this.translator.changeLanguage(lng);

	      if (this.services.languageDetector) this.services.languageDetector.cacheUserLanguage(lng);
	    }

	    this.loadResources(function (err) {
	      done(err);
	    });
	  };

	  I18n.prototype.getFixedT = function getFixedT(lng, ns) {
	    var _this5 = this;

	    var fixedT = function fixedT(key, options) {
	      options = options || {};
	      options.lng = options.lng || fixedT.lng;
	      options.ns = options.ns || fixedT.ns;
	      return _this5.t(key, options);
	    };
	    fixedT.lng = lng;
	    fixedT.ns = ns;
	    return fixedT;
	  };

	  I18n.prototype.t = function t() {
	    return this.translator && this.translator.translate.apply(this.translator, arguments);
	  };

	  I18n.prototype.exists = function exists() {
	    return this.translator && this.translator.exists.apply(this.translator, arguments);
	  };

	  I18n.prototype.setDefaultNamespace = function setDefaultNamespace(ns) {
	    this.options.defaultNS = ns;
	  };

	  I18n.prototype.loadNamespaces = function loadNamespaces(ns, callback) {
	    var _this6 = this;

	    if (!this.options.ns) return callback && callback();
	    if (typeof ns === 'string') ns = [ns];

	    ns.forEach(function (n) {
	      if (_this6.options.ns.indexOf(n) < 0) _this6.options.ns.push(n);
	    });

	    this.loadResources(callback);
	  };

	  I18n.prototype.loadLanguages = function loadLanguages(lngs, callback) {
	    if (typeof lngs === 'string') lngs = [lngs];
	    var preloaded = this.options.preload || [];

	    var newLngs = lngs.filter(function (lng) {
	      return preloaded.indexOf(lng) < 0;
	    });
	    // Exit early if all given languages are already preloaded
	    if (!newLngs.length) return callback();

	    this.options.preload = preloaded.concat(newLngs);
	    this.loadResources(callback);
	  };

	  I18n.prototype.dir = function dir(lng) {
	    if (!lng) lng = this.language;

	    var rtlLngs = ['ar', 'shu', 'sqr', 'ssh', 'xaa', 'yhd', 'yud', 'aao', 'abh', 'abv', 'acm', 'acq', 'acw', 'acx', 'acy', 'adf', 'ads', 'aeb', 'aec', 'afb', 'ajp', 'apc', 'apd', 'arb', 'arq', 'ars', 'ary', 'arz', 'auz', 'avl', 'ayh', 'ayl', 'ayn', 'ayp', 'bbz', 'pga', 'he', 'iw', 'ps', 'pbt', 'pbu', 'pst', 'prp', 'prd', 'ur', 'ydd', 'yds', 'yih', 'ji', 'yi', 'hbo', 'men', 'xmn', 'fa', 'jpr', 'peo', 'pes', 'prs', 'dv', 'sam'];

	    return rtlLngs.indexOf(this.services.languageUtils.getLanguagePartFromCode(lng)) >= 0 ? 'rtl' : 'ltr';
	  };

	  I18n.prototype.createInstance = function createInstance() {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var callback = arguments[1];

	    return new I18n(options, callback);
	  };

	  I18n.prototype.cloneInstance = function cloneInstance() {
	    var _this7 = this;

	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var callback = arguments[1];

	    var clone = new I18n(_extends({}, options, this.options, { isClone: true }), callback);
	    var membersToCopy = ['store', 'translator', 'services', 'language'];
	    membersToCopy.forEach(function (m) {
	      clone[m] = _this7[m];
	    });

	    return clone;
	  };

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

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _typeof$3 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	function _classCallCheck$10(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// https://gist.github.com/Xeoncross/7663273
	function ajax(url, options, callback, data, cache) {
	  // Must encode data
	  if (data && (typeof data === 'undefined' ? 'undefined' : _typeof$3(data)) === 'object') {
	    var y = '',
	        e = encodeURIComponent;
	    for (var m in data) {
	      y += '&' + e(m) + '=' + e(data[m]);
	    }
	    data = y.slice(1) + (!cache ? '&_t=' + new Date() : '');
	  }

	  try {
	    var x = new (XMLHttpRequest || ActiveXObject)('MSXML2.XMLHTTP.3.0');
	    x.open(data ? 'POST' : 'GET', url, 1);
	    if (!options.crossDomain) {
	      x.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	    }
	    if (data) {
	      x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	    }
	    x.onreadystatechange = function () {
	      x.readyState > 3 && callback && callback(x.responseText, x);
	    };
	    x.send(data);
	  } catch (e) {
	    window.console && console.log(e);
	  }
	};

	// ajax.uriEncode = function(o) {
	//     var x, y = '', e = encodeURIComponent;
	//     for (x in o) y += '&' + e(x) + '=' + e(o[x]);
	//     return y.slice(1);
	// };
	//
	// ajax.collect = (a, f) {
	//     var n = [];
	//     for (var i = 0; i < a.length; i++) {
	//         var v = f(a[i]);
	//         if (v != null) n.push(v);
	//     }
	//     return n;
	// };
	//
	// ajax.serialize = function (f) {
	//     function g(n) {
	//         return f.getElementsByTagName(n);
	//     };
	//     var nv = function (e) {
	//         if (e.name) return encodeURIComponent(e.name) + '=' + encodeURIComponent(e.value);
	//     };
	//     var i = collect(g('input'), function (i) {
	//         if ((i.type != 'radio' && i.type != 'checkbox') || i.checked) return nv(i);
	//     });
	//     var s = collect(g('select'), nv);
	//     var t = collect(g('textarea'), nv);
	//     return i.concat(s).concat(t).join('&');
	// };
	//

	function getDefaults$1() {
	  return {
	    loadPath: '/locales/{{lng}}/{{ns}}.json',
	    addPath: 'locales/add/{{lng}}/{{ns}}',
	    allowMultiLoading: false,
	    parse: JSON.parse,
	    crossDomain: false,
	    ajax: ajax
	  };
	}

	var Backend = function () {
	  function Backend(services) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    _classCallCheck$10(this, Backend);

	    this.init(services, options);

	    this.type = 'backend';
	  }

	  _createClass(Backend, [{
	    key: 'init',
	    value: function init(services) {
	      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	      this.services = services;
	      this.options = defaults(options, this.options || {}, getDefaults$1());
	    }
	  }, {
	    key: 'readMulti',
	    value: function readMulti(languages, namespaces, callback) {
	      var url = this.services.interpolator.interpolate(this.options.loadPath, { lng: languages.join('+'), ns: namespaces.join('+') });

	      this.loadUrl(url, callback);
	    }
	  }, {
	    key: 'read',
	    value: function read(language, namespace, callback) {
	      var url = this.services.interpolator.interpolate(this.options.loadPath, { lng: language, ns: namespace });

	      this.loadUrl(url, callback);
	    }
	  }, {
	    key: 'loadUrl',
	    value: function loadUrl(url, callback) {
	      var _this = this;

	      this.options.ajax(url, this.options, function (data, xhr) {
	        if (xhr.status >= 500 && xhr.status < 600) return callback('failed loading ' + url, true /* retry */);
	        if (xhr.status >= 400 && xhr.status < 500) return callback('failed loading ' + url, false /* no retry */);

	        var ret = void 0,
	            err = void 0;
	        try {
	          ret = _this.options.parse(data, url);
	        } catch (e) {
	          err = 'failed parsing ' + url + ' to json';
	        }
	        if (err) return callback(err, false);
	        callback(null, ret);
	      });
	    }
	  }, {
	    key: 'create',
	    value: function create(languages, namespace, key, fallbackValue) {
	      var _this2 = this;

	      if (typeof languages === 'string') languages = [languages];

	      var payload = {};
	      payload[key] = fallbackValue || '';

	      languages.forEach(function (lng) {
	        var url = _this2.services.interpolator.interpolate(_this2.options.addPath, { lng: lng, ns: namespace });

	        _this2.options.ajax(url, _this2.options, function (data, xhr) {
	          //const statusCode = xhr.status.toString();
	          // TODO: if statusCode === 4xx do log
	        }, payload);
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
	}

	var cookie = {
	  create: function create(name, value, minutes, domain) {
	    var expires = void 0;
	    if (minutes) {
	      var date = new Date();
	      date.setTime(date.getTime() + minutes * 60 * 1000);
	      expires = '; expires=' + date.toGMTString();
	    } else expires = '';
	    domain = domain ? 'domain=' + domain + ';' : '';
	    document.cookie = name + '=' + value + expires + ';' + domain + 'path=/';
	  },

	  read: function read(name) {
	    var nameEQ = name + '=';
	    var ca = document.cookie.split(';');
	    for (var i = 0; i < ca.length; i++) {
	      var c = ca[i];
	      while (c.charAt(0) === ' ') {
	        c = c.substring(1, c.length);
	      }if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
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
	    var found = void 0;

	    if (options.lookupCookie && typeof document !== 'undefined') {
	      var c = cookie.read(options.lookupCookie);
	      if (c) found = c;
	    }

	    return found;
	  },
	  cacheUserLanguage: function cacheUserLanguage(lng, options) {
	    if (options.lookupCookie && typeof document !== 'undefined') {
	      cookie.create(options.lookupCookie, lng, options.cookieMinutes, options.cookieDomain);
	    }
	  }
	};

	var querystring = {
	  name: 'querystring',

	  lookup: function lookup(options) {
	    var found = void 0;

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

	var storage = {
	  setItem: function setItem(key, value) {
	    if (window.localStorage) {
	      try {
	        window.localStorage.setItem(key, value);
	      } catch (e) {
	        //f.log('failed to set value for key '' + key + '' to localStorage.');
	      }
	    }
	  },
	  getItem: function getItem(key, value) {
	    if (window.localStorage) {
	      try {
	        return window.localStorage.getItem(key, value);
	      } catch (e) {
	        //f.log('failed to get value for key '' + key + '' from localStorage.');
	        return undefined;
	      }
	    }
	  }
	};

	var localStorage = {
	  name: 'localStorage',

	  lookup: function lookup(options) {
	    var found = void 0;

	    if (options.lookupLocalStorage && typeof window !== 'undefined' && window.localStorage) {
	      var lng = storage.getItem(options.lookupLocalStorage);
	      if (lng) found = lng;
	    }

	    return found;
	  },
	  cacheUserLanguage: function cacheUserLanguage(lng, options) {
	    if (options.lookupLocalStorage && typeof window !== 'undefined' && window.localStorage) {
	      storage.setItem(options.lookupLocalStorage, lng);
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
	    var found = void 0;
	    var htmlTag = options.htmlTag || (typeof document !== 'undefined' ? document.documentElement : null);

	    if (htmlTag && typeof htmlTag.getAttribute === 'function') {
	      found = htmlTag.getAttribute('lang');
	    }

	    return found;
	  }
	};

	var _createClass$1 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck$11(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function getDefaults$2() {
	  return {
	    order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
	    lookupQuerystring: 'lng',
	    lookupCookie: 'i18next',
	    lookupLocalStorage: 'i18nextLng',

	    // cache user language
	    caches: ['localStorage']
	    //cookieMinutes: 10,
	    //cookieDomain: 'myDomain'
	  };
	}

	var Browser = function () {
	  function Browser(services) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    _classCallCheck$11(this, Browser);

	    this.type = 'languageDetector';
	    this.detectors = {};

	    this.init(services, options);
	  }

	  _createClass$1(Browser, [{
	    key: 'init',
	    value: function init(services) {
	      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	      var i18nOptions = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

	      this.services = services;
	      this.options = defaults$1(options, this.options || {}, getDefaults$2());
	      this.i18nOptions = i18nOptions;

	      this.addDetector(cookie$1);
	      this.addDetector(querystring);
	      this.addDetector(localStorage);
	      this.addDetector(navigator$1);
	      this.addDetector(htmlTag);
	    }
	  }, {
	    key: 'addDetector',
	    value: function addDetector(detector) {
	      this.detectors[detector.name] = detector;
	    }
	  }, {
	    key: 'detect',
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

	      var found = void 0;
	      detected.forEach(function (lng) {
	        if (found) return;
	        var cleanedLng = _this.services.languageUtils.formatLanguageCode(lng);
	        if (_this.services.languageUtils.isWhitelisted(cleanedLng)) found = cleanedLng;
	      });

	      return found || this.i18nOptions.fallbackLng[0];
	    }
	  }, {
	    key: 'cacheUserLanguage',
	    value: function cacheUserLanguage(lng, caches) {
	      var _this2 = this;

	      if (!caches) caches = this.options.caches;
	      if (!caches) return;
	      caches.forEach(function (cacheName) {
	        if (_this2.detectors[cacheName]) _this2.detectors[cacheName].cacheUserLanguage(lng, _this2.options);
	      });
	    }
	  }]);

	  return Browser;
	}();

	Browser.type = 'languageDetector';

	var classCallCheck = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

	var createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

	var _extends$6 = Object.assign || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];

	    for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }

	  return target;
	};

	var inherits = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	  }

	  subClass.prototype = Object.create(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	};

	var possibleConstructorReturn = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return call && (typeof call === "object" || typeof call === "function") ? call : self;
	};

	var Observer = function (_EventEmitter) {
	  inherits(Observer, _EventEmitter);

	  function Observer(ele) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	    classCallCheck(this, Observer);

	    var _this = possibleConstructorReturn(this, Object.getPrototypeOf(Observer).call(this));

	    _this.ele = ele;
	    _this.options = options;
	    _this.observer = _this.create();
	    _this.internalChange = true;
	    return _this;
	  }

	  createClass(Observer, [{
	    key: 'create',
	    value: function create() {
	      var _this2 = this;

	      var lastToggleTimeout = void 0;
	      var toggleInternal = function toggleInternal() {
	        if (lastToggleTimeout) window.clearTimeout(lastToggleTimeout);

	        lastToggleTimeout = setTimeout(function () {
	          if (_this2.internalChange) _this2.internalChange = false;
	        }, 200);
	      };

	      var observer = new MutationObserver(function (mutations) {
	        // For the sake of...observation...let's output the mutation to console to see how this all works
	        // mutations.forEach(function(mutation) {
	        // 	console.log(mutation.type);
	        // });
	        if (_this2.internalChange) toggleInternal();
	        if (!_this2.internalChange) _this2.emit('changed', mutations);
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
	}(EventEmitter);

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
	var readyEventHandlersInstalled = false;

	// call this when the document is ready
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
	        }
	        // allow any closures held by these functions to free
	        readyList = [];
	    }
	}

	function readyStateChange() {
	    if (document.readyState === "complete") {
	        ready();
	    }
	}

	// This is the one public interface
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
	        readyList.push({ fn: callback, ctx: context });
	    }
	    // if document already ready to go, schedule the ready function to run
	    // IE only safe when readyState is "complete", others safe when readyState is "interactive"
	    if (document.readyState === "complete" || !document.attachEvent && document.readyState === "interactive") {
	        setTimeout(ready, 1);
	    } else if (!readyEventHandlersInstalled) {
	        // otherwise if we don't have event handlers installed, install them
	        if (document.addEventListener) {
	            // first choice is DOMContentLoaded event
	            document.addEventListener("DOMContentLoaded", ready, false);
	            // backup is window load event
	            window.addEventListener("load", ready, false);
	        } else {
	            // must be IE
	            document.attachEvent("onreadystatechange", readyStateChange);
	            window.attachEvent("onload", ready);
	        }
	        readyEventHandlersInstalled = true;
	    }
	}
	// })("docReady", window);
	// modify this previous line to pass in your own method name
	// and object for the method to be attached to

	var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var vcomment = createCommonjsModule(function (module) {
	module.exports = VirtualComment

	function VirtualComment(text) {
	  this.text = String(text)
	}

	VirtualComment.prototype.type = 'Widget'

	VirtualComment.prototype.init = function() {
	  return document.createComment(this.text)
	}

	VirtualComment.prototype.update = function(previous, domNode) {
	  if(this.text === previous.text) return
	  domNode.nodeValue = this.text
	}
	});

	var require$$0 = (vcomment && typeof vcomment === 'object' && 'default' in vcomment ? vcomment['default'] : vcomment);

	var version = createCommonjsModule(function (module) {
	module.exports = "2"
	});

	var require$$0$1 = (version && typeof version === 'object' && 'default' in version ? version['default'] : version);

	var vtext = createCommonjsModule(function (module) {
	var version = require$$0$1

	module.exports = VirtualText

	function VirtualText(text) {
	    this.text = String(text)
	}

	VirtualText.prototype.version = version
	VirtualText.prototype.type = "VirtualText"
	});

	var require$$2 = (vtext && typeof vtext === 'object' && 'default' in vtext ? vtext['default'] : vtext);

	var isVhook = createCommonjsModule(function (module) {
	module.exports = isHook

	function isHook(hook) {
	    return hook &&
	      (typeof hook.hook === "function" && !hook.hasOwnProperty("hook") ||
	       typeof hook.unhook === "function" && !hook.hasOwnProperty("unhook"))
	}
	});

	var require$$0$2 = (isVhook && typeof isVhook === 'object' && 'default' in isVhook ? isVhook['default'] : isVhook);

	var isThunk = createCommonjsModule(function (module) {
	module.exports = isThunk

	function isThunk(t) {
	    return t && t.type === "Thunk"
	}
	});

	var require$$6 = (isThunk && typeof isThunk === 'object' && 'default' in isThunk ? isThunk['default'] : isThunk);

	var isWidget = createCommonjsModule(function (module) {
	module.exports = isWidget

	function isWidget(w) {
	    return w && w.type === "Widget"
	}
	});

	var require$$5 = (isWidget && typeof isWidget === 'object' && 'default' in isWidget ? isWidget['default'] : isWidget);

	var isVnode = createCommonjsModule(function (module) {
	var version = require$$0$1

	module.exports = isVirtualNode

	function isVirtualNode(x) {
	    return x && x.type === "VirtualNode" && x.version === version
	}
	});

	var require$$8 = (isVnode && typeof isVnode === 'object' && 'default' in isVnode ? isVnode['default'] : isVnode);

	var vnode = createCommonjsModule(function (module) {
	var version = require$$0$1
	var isVNode = require$$8
	var isWidget = require$$5
	var isThunk = require$$6
	var isVHook = require$$0$2

	module.exports = VirtualNode

	var noProperties = {}
	var noChildren = []

	function VirtualNode(tagName, properties, children, key, namespace) {
	    this.tagName = tagName
	    this.properties = properties || noProperties
	    this.children = children || noChildren
	    this.key = key != null ? String(key) : undefined
	    this.namespace = (typeof namespace === "string") ? namespace : null

	    var count = (children && children.length) || 0
	    var descendants = 0
	    var hasWidgets = false
	    var hasThunks = false
	    var descendantHooks = false
	    var hooks

	    for (var propName in properties) {
	        if (properties.hasOwnProperty(propName)) {
	            var property = properties[propName]
	            if (isVHook(property) && property.unhook) {
	                if (!hooks) {
	                    hooks = {}
	                }

	                hooks[propName] = property
	            }
	        }
	    }

	    for (var i = 0; i < count; i++) {
	        var child = children[i]
	        if (isVNode(child)) {
	            descendants += child.count || 0

	            if (!hasWidgets && child.hasWidgets) {
	                hasWidgets = true
	            }

	            if (!hasThunks && child.hasThunks) {
	                hasThunks = true
	            }

	            if (!descendantHooks && (child.hooks || child.descendantHooks)) {
	                descendantHooks = true
	            }
	        } else if (!hasWidgets && isWidget(child)) {
	            if (typeof child.destroy === "function") {
	                hasWidgets = true
	            }
	        } else if (!hasThunks && isThunk(child)) {
	            hasThunks = true;
	        }
	    }

	    this.count = count + descendants
	    this.hasWidgets = hasWidgets
	    this.hasThunks = hasThunks
	    this.hooks = hooks
	    this.descendantHooks = descendantHooks
	}

	VirtualNode.prototype.version = version
	VirtualNode.prototype.type = "VirtualNode"
	});

	var require$$3 = (vnode && typeof vnode === 'object' && 'default' in vnode ? vnode['default'] : vnode);

	var index$1 = createCommonjsModule(function (module) {
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
	var VNode = require$$3
	  , VText = require$$2
	  , VComment = require$$0

	module.exports = createVNode

	function createVNode(domNode, key) {
	  key = key || null // XXX: Leave out `key` for now... merely used for (re-)ordering

	  if(domNode.nodeType == 1) return createFromElement(domNode, key)
	  if(domNode.nodeType == 3) return createFromTextNode(domNode, key)
	  if(domNode.nodeType == 8) return createFromCommentNode(domNode, key)
	  return
	}

	function createFromTextNode(tNode) {
	  return new VText(tNode.nodeValue)
	}


	function createFromCommentNode(cNode) {
	  return new VComment(cNode.nodeValue)
	}


	function createFromElement(el) {
	  var tagName = el.tagName
	  , namespace = el.namespaceURI == 'http://www.w3.org/1999/xhtml'? null : el.namespaceURI
	  , properties = getElementProperties(el)
	  , children = []

	  for (var i = 0; i < el.childNodes.length; i++) {
	    children.push(createVNode(el.childNodes[i]/*, i*/))
	  }

	  return new VNode(tagName, properties, children, null, namespace)
	}


	function getElementProperties(el) {
	  var obj = {}

	  for(var i=0; i<props.length; i++) {
	    var propName = props[i]
	    if(!el[propName]) continue

	    // Special case: style
	    // .style is a DOMStyleDeclaration, thus we need to iterate over all
	    // rules to create a hash of applied css properties.
	    //
	    // You can directly set a specific .style[prop] = value so patching with vdom
	    // is possible.
	    if("style" == propName) {
	      var css = {}
	        , styleProp
	      if ('undefined' !== typeof el.style.length) {
	        for(var j=0; j<el.style.length; j++) {
	          styleProp = el.style[j]
	          css[styleProp] = el.style.getPropertyValue(styleProp) // XXX: add support for "!important" via getPropertyPriority()!
	        }
	      } else { // IE8
	        for (var styleProp in el.style) {
	          if (el.style[styleProp] && el.style.hasOwnProperty(styleProp)) {
	            css[styleProp] = el.style[styleProp];
	          }
	        }
	      }

	      if(Object.keys(css).length) obj[propName] = css
	      continue
	    }

	    // https://msdn.microsoft.com/en-us/library/cc848861%28v=vs.85%29.aspx
	    // The img element does not support the HREF content attribute.
	    // In addition, the href property is read-only for the img Document Object Model (DOM) object
	    if (el.tagName.toLowerCase() === 'img' && propName === 'href') {
	      continue;
	    }

	    // Special case: dataset
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
	    if("attributes" == propName){
	      var atts = Array.prototype.slice.call(el[propName]);
	      var hash = {}
	      for(var k=0; k<atts.length; k++){
	        var name = atts[k].name;
	        if(obj[name] || obj[attrBlacklist[name]]) continue;
	        hash[name] = el.getAttribute(name);
	      }
	      obj[propName] = hash;
	      continue
	    }
	    if("tabIndex" == propName && el.tabIndex === -1) continue

	    // Special case: contentEditable
	    // browser use 'inherit' by default on all nodes, but does not allow setting it to ''
	    // diffing virtualize dom will trigger error
	    // ref: https://github.com/Matt-Esch/virtual-dom/issues/176
	    if("contentEditable" == propName && el[propName] === 'inherit') continue

	    if('object' === typeof el[propName]) continue

	    // default: just copy the property
	    obj[propName] = el[propName]
	  }

	  return obj
	}

	/**
	 * DOMNode property white list
	 * Taken from https://github.com/Raynos/react/blob/dom-property-config/src/browser/ui/dom/DefaultDOMPropertyConfig.js
	 */
	var props =

	module.exports.properties = [
	 "accept"
	,"accessKey"
	,"action"
	,"alt"
	,"async"
	,"autoComplete"
	,"autoPlay"
	,"cellPadding"
	,"cellSpacing"
	,"checked"
	,"className"
	,"colSpan"
	,"content"
	,"contentEditable"
	,"controls"
	,"crossOrigin"
	,"data"
	//,"dataset" removed since attributes handles data-attributes
	,"defer"
	,"dir"
	,"download"
	,"draggable"
	,"encType"
	,"formNoValidate"
	,"href"
	,"hrefLang"
	,"htmlFor"
	,"httpEquiv"
	,"icon"
	,"id"
	,"label"
	,"lang"
	,"list"
	,"loop"
	,"max"
	,"mediaGroup"
	,"method"
	,"min"
	,"multiple"
	,"muted"
	,"name"
	,"noValidate"
	,"pattern"
	,"placeholder"
	,"poster"
	,"preload"
	,"radioGroup"
	,"readOnly"
	,"rel"
	,"required"
	,"rowSpan"
	,"sandbox"
	,"scope"
	,"scrollLeft"
	,"scrolling"
	,"scrollTop"
	,"selected"
	,"span"
	,"spellCheck"
	,"src"
	,"srcDoc"
	,"srcSet"
	,"start"
	,"step"
	,"style"
	,"tabIndex"
	,"target"
	,"title"
	,"type"
	,"value"

	// Non-standard Properties
	,"autoCapitalize"
	,"autoCorrect"
	,"property"

	, "attributes"
	]

	var attrBlacklist =
	module.exports.attrBlacklist = {
	  'class': 'className'
	}
	});

	var virtualize = (index$1 && typeof index$1 === 'object' && 'default' in index$1 ? index$1['default'] : index$1);

	var index$2 = createCommonjsModule(function (module) {
	"use strict";

	module.exports = function isObject(x) {
		return typeof x === "object" && x !== null;
	};
	});

	var require$$1 = (index$2 && typeof index$2 === 'object' && 'default' in index$2 ? index$2['default'] : index$2);

	var diffProps = createCommonjsModule(function (module) {
	var isObject = require$$1
	var isHook = require$$0$2

	module.exports = diffProps

	function diffProps(a, b) {
	    var diff

	    for (var aKey in a) {
	        if (!(aKey in b)) {
	            diff = diff || {}
	            diff[aKey] = undefined
	        }

	        var aValue = a[aKey]
	        var bValue = b[aKey]

	        if (aValue === bValue) {
	            continue
	        } else if (isObject(aValue) && isObject(bValue)) {
	            if (getPrototype(bValue) !== getPrototype(aValue)) {
	                diff = diff || {}
	                diff[aKey] = bValue
	            } else if (isHook(bValue)) {
	                 diff = diff || {}
	                 diff[aKey] = bValue
	            } else {
	                var objectDiff = diffProps(aValue, bValue)
	                if (objectDiff) {
	                    diff = diff || {}
	                    diff[aKey] = objectDiff
	                }
	            }
	        } else {
	            diff = diff || {}
	            diff[aKey] = bValue
	        }
	    }

	    for (var bKey in b) {
	        if (!(bKey in a)) {
	            diff = diff || {}
	            diff[bKey] = b[bKey]
	        }
	    }

	    return diff
	}

	function getPrototype(value) {
	  if (Object.getPrototypeOf) {
	    return Object.getPrototypeOf(value)
	  } else if (value.__proto__) {
	    return value.__proto__
	  } else if (value.constructor) {
	    return value.constructor.prototype
	  }
	}
	});

	var require$$0$4 = (diffProps && typeof diffProps === 'object' && 'default' in diffProps ? diffProps['default'] : diffProps);

	var isVtext = createCommonjsModule(function (module) {
	var version = require$$0$1

	module.exports = isVirtualText

	function isVirtualText(x) {
	    return x && x.type === "VirtualText" && x.version === version
	}
	});

	var require$$7 = (isVtext && typeof isVtext === 'object' && 'default' in isVtext ? isVtext['default'] : isVtext);

	var handleThunk = createCommonjsModule(function (module) {
	var isVNode = require$$8
	var isVText = require$$7
	var isWidget = require$$5
	var isThunk = require$$6

	module.exports = handleThunk

	function handleThunk(a, b) {
	    var renderedA = a
	    var renderedB = b

	    if (isThunk(b)) {
	        renderedB = renderThunk(b, a)
	    }

	    if (isThunk(a)) {
	        renderedA = renderThunk(a, null)
	    }

	    return {
	        a: renderedA,
	        b: renderedB
	    }
	}

	function renderThunk(thunk, previous) {
	    var renderedThunk = thunk.vnode

	    if (!renderedThunk) {
	        renderedThunk = thunk.vnode = thunk.render(previous)
	    }

	    if (!(isVNode(renderedThunk) ||
	            isVText(renderedThunk) ||
	            isWidget(renderedThunk))) {
	        throw new Error("thunk did not return a valid node");
	    }

	    return renderedThunk
	}
	});

	var require$$0$5 = (handleThunk && typeof handleThunk === 'object' && 'default' in handleThunk ? handleThunk['default'] : handleThunk);

	var vpatch = createCommonjsModule(function (module) {
	var version = require$$0$1

	VirtualPatch.NONE = 0
	VirtualPatch.VTEXT = 1
	VirtualPatch.VNODE = 2
	VirtualPatch.WIDGET = 3
	VirtualPatch.PROPS = 4
	VirtualPatch.ORDER = 5
	VirtualPatch.INSERT = 6
	VirtualPatch.REMOVE = 7
	VirtualPatch.THUNK = 8

	module.exports = VirtualPatch

	function VirtualPatch(type, vNode, patch) {
	    this.type = Number(type)
	    this.vNode = vNode
	    this.patch = patch
	}

	VirtualPatch.prototype.version = version
	VirtualPatch.prototype.type = "VirtualPatch"
	});

	var require$$1$1 = (vpatch && typeof vpatch === 'object' && 'default' in vpatch ? vpatch['default'] : vpatch);

	var index$3 = createCommonjsModule(function (module) {
	var nativeIsArray = Array.isArray
	var toString = Object.prototype.toString

	module.exports = nativeIsArray || isArray

	function isArray(obj) {
	    return toString.call(obj) === "[object Array]"
	}
	});

	var require$$3$1 = (index$3 && typeof index$3 === 'object' && 'default' in index$3 ? index$3['default'] : index$3);

	var diff$2 = createCommonjsModule(function (module) {
	var isArray = require$$3$1

	var VPatch = require$$1$1
	var isVNode = require$$8
	var isVText = require$$7
	var isWidget = require$$5
	var isThunk = require$$6
	var handleThunk = require$$0$5

	var diffProps = require$$0$4

	module.exports = diff

	function diff(a, b) {
	    var patch = { a: a }
	    walk(a, b, patch, 0)
	    return patch
	}

	function walk(a, b, patch, index) {
	    if (a === b) {
	        return
	    }

	    var apply = patch[index]
	    var applyClear = false

	    if (isThunk(a) || isThunk(b)) {
	        thunks(a, b, patch, index)
	    } else if (b == null) {

	        // If a is a widget we will add a remove patch for it
	        // Otherwise any child widgets/hooks must be destroyed.
	        // This prevents adding two remove patches for a widget.
	        if (!isWidget(a)) {
	            clearState(a, patch, index)
	            apply = patch[index]
	        }

	        apply = appendPatch(apply, new VPatch(VPatch.REMOVE, a, b))
	    } else if (isVNode(b)) {
	        if (isVNode(a)) {
	            if (a.tagName === b.tagName &&
	                a.namespace === b.namespace &&
	                a.key === b.key) {
	                var propsPatch = diffProps(a.properties, b.properties)
	                if (propsPatch) {
	                    apply = appendPatch(apply,
	                        new VPatch(VPatch.PROPS, a, propsPatch))
	                }
	                apply = diffChildren(a, b, patch, apply, index)
	            } else {
	                apply = appendPatch(apply, new VPatch(VPatch.VNODE, a, b))
	                applyClear = true
	            }
	        } else {
	            apply = appendPatch(apply, new VPatch(VPatch.VNODE, a, b))
	            applyClear = true
	        }
	    } else if (isVText(b)) {
	        if (!isVText(a)) {
	            apply = appendPatch(apply, new VPatch(VPatch.VTEXT, a, b))
	            applyClear = true
	        } else if (a.text !== b.text) {
	            apply = appendPatch(apply, new VPatch(VPatch.VTEXT, a, b))
	        }
	    } else if (isWidget(b)) {
	        if (!isWidget(a)) {
	            applyClear = true
	        }

	        apply = appendPatch(apply, new VPatch(VPatch.WIDGET, a, b))
	    }

	    if (apply) {
	        patch[index] = apply
	    }

	    if (applyClear) {
	        clearState(a, patch, index)
	    }
	}

	function diffChildren(a, b, patch, apply, index) {
	    var aChildren = a.children
	    var orderedSet = reorder(aChildren, b.children)
	    var bChildren = orderedSet.children

	    var aLen = aChildren.length
	    var bLen = bChildren.length
	    var len = aLen > bLen ? aLen : bLen

	    for (var i = 0; i < len; i++) {
	        var leftNode = aChildren[i]
	        var rightNode = bChildren[i]
	        index += 1

	        if (!leftNode) {
	            if (rightNode) {
	                // Excess nodes in b need to be added
	                apply = appendPatch(apply,
	                    new VPatch(VPatch.INSERT, null, rightNode))
	            }
	        } else {
	            walk(leftNode, rightNode, patch, index)
	        }

	        if (isVNode(leftNode) && leftNode.count) {
	            index += leftNode.count
	        }
	    }

	    if (orderedSet.moves) {
	        // Reorder nodes last
	        apply = appendPatch(apply, new VPatch(
	            VPatch.ORDER,
	            a,
	            orderedSet.moves
	        ))
	    }

	    return apply
	}

	function clearState(vNode, patch, index) {
	    // TODO: Make this a single walk, not two
	    unhook(vNode, patch, index)
	    destroyWidgets(vNode, patch, index)
	}

	// Patch records for all destroyed widgets must be added because we need
	// a DOM node reference for the destroy function
	function destroyWidgets(vNode, patch, index) {
	    if (isWidget(vNode)) {
	        if (typeof vNode.destroy === "function") {
	            patch[index] = appendPatch(
	                patch[index],
	                new VPatch(VPatch.REMOVE, vNode, null)
	            )
	        }
	    } else if (isVNode(vNode) && (vNode.hasWidgets || vNode.hasThunks)) {
	        var children = vNode.children
	        var len = children.length
	        for (var i = 0; i < len; i++) {
	            var child = children[i]
	            index += 1

	            destroyWidgets(child, patch, index)

	            if (isVNode(child) && child.count) {
	                index += child.count
	            }
	        }
	    } else if (isThunk(vNode)) {
	        thunks(vNode, null, patch, index)
	    }
	}

	// Create a sub-patch for thunks
	function thunks(a, b, patch, index) {
	    var nodes = handleThunk(a, b)
	    var thunkPatch = diff(nodes.a, nodes.b)
	    if (hasPatches(thunkPatch)) {
	        patch[index] = new VPatch(VPatch.THUNK, null, thunkPatch)
	    }
	}

	function hasPatches(patch) {
	    for (var index in patch) {
	        if (index !== "a") {
	            return true
	        }
	    }

	    return false
	}

	// Execute hooks when two nodes are identical
	function unhook(vNode, patch, index) {
	    if (isVNode(vNode)) {
	        if (vNode.hooks) {
	            patch[index] = appendPatch(
	                patch[index],
	                new VPatch(
	                    VPatch.PROPS,
	                    vNode,
	                    undefinedKeys(vNode.hooks)
	                )
	            )
	        }

	        if (vNode.descendantHooks || vNode.hasThunks) {
	            var children = vNode.children
	            var len = children.length
	            for (var i = 0; i < len; i++) {
	                var child = children[i]
	                index += 1

	                unhook(child, patch, index)

	                if (isVNode(child) && child.count) {
	                    index += child.count
	                }
	            }
	        }
	    } else if (isThunk(vNode)) {
	        thunks(vNode, null, patch, index)
	    }
	}

	function undefinedKeys(obj) {
	    var result = {}

	    for (var key in obj) {
	        result[key] = undefined
	    }

	    return result
	}

	// List diff, naive left to right reordering
	function reorder(aChildren, bChildren) {
	    // O(M) time, O(M) memory
	    var bChildIndex = keyIndex(bChildren)
	    var bKeys = bChildIndex.keys
	    var bFree = bChildIndex.free

	    if (bFree.length === bChildren.length) {
	        return {
	            children: bChildren,
	            moves: null
	        }
	    }

	    // O(N) time, O(N) memory
	    var aChildIndex = keyIndex(aChildren)
	    var aKeys = aChildIndex.keys
	    var aFree = aChildIndex.free

	    if (aFree.length === aChildren.length) {
	        return {
	            children: bChildren,
	            moves: null
	        }
	    }

	    // O(MAX(N, M)) memory
	    var newChildren = []

	    var freeIndex = 0
	    var freeCount = bFree.length
	    var deletedItems = 0

	    // Iterate through a and match a node in b
	    // O(N) time,
	    for (var i = 0 ; i < aChildren.length; i++) {
	        var aItem = aChildren[i]
	        var itemIndex

	        if (aItem.key) {
	            if (bKeys.hasOwnProperty(aItem.key)) {
	                // Match up the old keys
	                itemIndex = bKeys[aItem.key]
	                newChildren.push(bChildren[itemIndex])

	            } else {
	                // Remove old keyed items
	                itemIndex = i - deletedItems++
	                newChildren.push(null)
	            }
	        } else {
	            // Match the item in a with the next free item in b
	            if (freeIndex < freeCount) {
	                itemIndex = bFree[freeIndex++]
	                newChildren.push(bChildren[itemIndex])
	            } else {
	                // There are no free items in b to match with
	                // the free items in a, so the extra free nodes
	                // are deleted.
	                itemIndex = i - deletedItems++
	                newChildren.push(null)
	            }
	        }
	    }

	    var lastFreeIndex = freeIndex >= bFree.length ?
	        bChildren.length :
	        bFree[freeIndex]

	    // Iterate through b and append any new keys
	    // O(M) time
	    for (var j = 0; j < bChildren.length; j++) {
	        var newItem = bChildren[j]

	        if (newItem.key) {
	            if (!aKeys.hasOwnProperty(newItem.key)) {
	                // Add any new keyed items
	                // We are adding new items to the end and then sorting them
	                // in place. In future we should insert new items in place.
	                newChildren.push(newItem)
	            }
	        } else if (j >= lastFreeIndex) {
	            // Add any leftover non-keyed items
	            newChildren.push(newItem)
	        }
	    }

	    var simulate = newChildren.slice()
	    var simulateIndex = 0
	    var removes = []
	    var inserts = []
	    var simulateItem

	    for (var k = 0; k < bChildren.length;) {
	        var wantedItem = bChildren[k]
	        simulateItem = simulate[simulateIndex]

	        // remove items
	        while (simulateItem === null && simulate.length) {
	            removes.push(remove(simulate, simulateIndex, null))
	            simulateItem = simulate[simulateIndex]
	        }

	        if (!simulateItem || simulateItem.key !== wantedItem.key) {
	            // if we need a key in this position...
	            if (wantedItem.key) {
	                if (simulateItem && simulateItem.key) {
	                    // if an insert doesn't put this key in place, it needs to move
	                    if (bKeys[simulateItem.key] !== k + 1) {
	                        removes.push(remove(simulate, simulateIndex, simulateItem.key))
	                        simulateItem = simulate[simulateIndex]
	                        // if the remove didn't put the wanted item in place, we need to insert it
	                        if (!simulateItem || simulateItem.key !== wantedItem.key) {
	                            inserts.push({key: wantedItem.key, to: k})
	                        }
	                        // items are matching, so skip ahead
	                        else {
	                            simulateIndex++
	                        }
	                    }
	                    else {
	                        inserts.push({key: wantedItem.key, to: k})
	                    }
	                }
	                else {
	                    inserts.push({key: wantedItem.key, to: k})
	                }
	                k++
	            }
	            // a key in simulate has no matching wanted key, remove it
	            else if (simulateItem && simulateItem.key) {
	                removes.push(remove(simulate, simulateIndex, simulateItem.key))
	            }
	        }
	        else {
	            simulateIndex++
	            k++
	        }
	    }

	    // remove all the remaining nodes from simulate
	    while(simulateIndex < simulate.length) {
	        simulateItem = simulate[simulateIndex]
	        removes.push(remove(simulate, simulateIndex, simulateItem && simulateItem.key))
	    }

	    // If the only moves we have are deletes then we can just
	    // let the delete patch remove these items.
	    if (removes.length === deletedItems && !inserts.length) {
	        return {
	            children: newChildren,
	            moves: null
	        }
	    }

	    return {
	        children: newChildren,
	        moves: {
	            removes: removes,
	            inserts: inserts
	        }
	    }
	}

	function remove(arr, index, key) {
	    arr.splice(index, 1)

	    return {
	        from: index,
	        key: key
	    }
	}

	function keyIndex(children) {
	    var keys = {}
	    var free = []
	    var length = children.length

	    for (var i = 0; i < length; i++) {
	        var child = children[i]

	        if (child.key) {
	            keys[child.key] = i
	        } else {
	            free.push(i)
	        }
	    }

	    return {
	        keys: keys,     // A hash of key name to index
	        free: free      // An array of unkeyed item indices
	    }
	}

	function appendPatch(apply, patch) {
	    if (apply) {
	        if (isArray(apply)) {
	            apply.push(patch)
	        } else {
	            apply = [apply, patch]
	        }

	        return apply
	    } else {
	        return patch
	    }
	}
	});

	var require$$0$3 = (diff$2 && typeof diff$2 === 'object' && 'default' in diff$2 ? diff$2['default'] : diff$2);

	var diff = createCommonjsModule(function (module) {
	var diff = require$$0$3

	module.exports = diff
	});

	var diff$1 = (diff && typeof diff === 'object' && 'default' in diff ? diff['default'] : diff);

	var updateWidget = createCommonjsModule(function (module) {
	var isWidget = require$$5

	module.exports = updateWidget

	function updateWidget(a, b) {
	    if (isWidget(a) && isWidget(b)) {
	        if ("name" in a && "name" in b) {
	            return a.id === b.id
	        } else {
	            return a.init === b.init
	        }
	    }

	    return false
	}
	});

	var require$$0$8 = (updateWidget && typeof updateWidget === 'object' && 'default' in updateWidget ? updateWidget['default'] : updateWidget);

	var applyProperties = createCommonjsModule(function (module) {
	var isObject = require$$1
	var isHook = require$$0$2

	module.exports = applyProperties

	function applyProperties(node, props, previous) {
	    for (var propName in props) {
	        var propValue = props[propName]

	        if (propValue === undefined) {
	            removeProperty(node, propName, propValue, previous);
	        } else if (isHook(propValue)) {
	            removeProperty(node, propName, propValue, previous)
	            if (propValue.hook) {
	                propValue.hook(node,
	                    propName,
	                    previous ? previous[propName] : undefined)
	            }
	        } else {
	            if (isObject(propValue)) {
	                patchObject(node, props, previous, propName, propValue);
	            } else {
	                node[propName] = propValue
	            }
	        }
	    }
	}

	function removeProperty(node, propName, propValue, previous) {
	    if (previous) {
	        var previousValue = previous[propName]

	        if (!isHook(previousValue)) {
	            if (propName === "attributes") {
	                for (var attrName in previousValue) {
	                    node.removeAttribute(attrName)
	                }
	            } else if (propName === "style") {
	                for (var i in previousValue) {
	                    node.style[i] = ""
	                }
	            } else if (typeof previousValue === "string") {
	                node[propName] = ""
	            } else {
	                node[propName] = null
	            }
	        } else if (previousValue.unhook) {
	            previousValue.unhook(node, propName, propValue)
	        }
	    }
	}

	function patchObject(node, props, previous, propName, propValue) {
	    var previousValue = previous ? previous[propName] : undefined

	    // Set attributes
	    if (propName === "attributes") {
	        for (var attrName in propValue) {
	            var attrValue = propValue[attrName]

	            if (attrValue === undefined) {
	                node.removeAttribute(attrName)
	            } else {
	                node.setAttribute(attrName, attrValue)
	            }
	        }

	        return
	    }

	    if(previousValue && isObject(previousValue) &&
	        getPrototype(previousValue) !== getPrototype(propValue)) {
	        node[propName] = propValue
	        return
	    }

	    if (!isObject(node[propName])) {
	        node[propName] = {}
	    }

	    var replacer = propName === "style" ? "" : undefined

	    for (var k in propValue) {
	        var value = propValue[k]
	        node[propName][k] = (value === undefined) ? replacer : value
	    }
	}

	function getPrototype(value) {
	    if (Object.getPrototypeOf) {
	        return Object.getPrototypeOf(value)
	    } else if (value.__proto__) {
	        return value.__proto__
	    } else if (value.constructor) {
	        return value.constructor.prototype
	    }
	}
	});

	var require$$4 = (applyProperties && typeof applyProperties === 'object' && 'default' in applyProperties ? applyProperties['default'] : applyProperties);

	var patchOp = createCommonjsModule(function (module) {
	var applyProperties = require$$4

	var isWidget = require$$5
	var VPatch = require$$1$1

	var updateWidget = require$$0$8

	module.exports = applyPatch

	function applyPatch(vpatch, domNode, renderOptions) {
	    var type = vpatch.type
	    var vNode = vpatch.vNode
	    var patch = vpatch.patch

	    switch (type) {
	        case VPatch.REMOVE:
	            return removeNode(domNode, vNode)
	        case VPatch.INSERT:
	            return insertNode(domNode, patch, renderOptions)
	        case VPatch.VTEXT:
	            return stringPatch(domNode, vNode, patch, renderOptions)
	        case VPatch.WIDGET:
	            return widgetPatch(domNode, vNode, patch, renderOptions)
	        case VPatch.VNODE:
	            return vNodePatch(domNode, vNode, patch, renderOptions)
	        case VPatch.ORDER:
	            reorderChildren(domNode, patch)
	            return domNode
	        case VPatch.PROPS:
	            applyProperties(domNode, patch, vNode.properties)
	            return domNode
	        case VPatch.THUNK:
	            return replaceRoot(domNode,
	                renderOptions.patch(domNode, patch, renderOptions))
	        default:
	            return domNode
	    }
	}

	function removeNode(domNode, vNode) {
	    var parentNode = domNode.parentNode

	    if (parentNode) {
	        parentNode.removeChild(domNode)
	    }

	    destroyWidget(domNode, vNode);

	    return null
	}

	function insertNode(parentNode, vNode, renderOptions) {
	    var newNode = renderOptions.render(vNode, renderOptions)

	    if (parentNode) {
	        parentNode.appendChild(newNode)
	    }

	    return parentNode
	}

	function stringPatch(domNode, leftVNode, vText, renderOptions) {
	    var newNode

	    if (domNode.nodeType === 3) {
	        domNode.replaceData(0, domNode.length, vText.text)
	        newNode = domNode
	    } else {
	        var parentNode = domNode.parentNode
	        newNode = renderOptions.render(vText, renderOptions)

	        if (parentNode && newNode !== domNode) {
	            parentNode.replaceChild(newNode, domNode)
	        }
	    }

	    return newNode
	}

	function widgetPatch(domNode, leftVNode, widget, renderOptions) {
	    var updating = updateWidget(leftVNode, widget)
	    var newNode

	    if (updating) {
	        newNode = widget.update(leftVNode, domNode) || domNode
	    } else {
	        newNode = renderOptions.render(widget, renderOptions)
	    }

	    var parentNode = domNode.parentNode

	    if (parentNode && newNode !== domNode) {
	        parentNode.replaceChild(newNode, domNode)
	    }

	    if (!updating) {
	        destroyWidget(domNode, leftVNode)
	    }

	    return newNode
	}

	function vNodePatch(domNode, leftVNode, vNode, renderOptions) {
	    var parentNode = domNode.parentNode
	    var newNode = renderOptions.render(vNode, renderOptions)

	    if (parentNode && newNode !== domNode) {
	        parentNode.replaceChild(newNode, domNode)
	    }

	    return newNode
	}

	function destroyWidget(domNode, w) {
	    if (typeof w.destroy === "function" && isWidget(w)) {
	        w.destroy(domNode)
	    }
	}

	function reorderChildren(domNode, moves) {
	    var childNodes = domNode.childNodes
	    var keyMap = {}
	    var node
	    var remove
	    var insert

	    for (var i = 0; i < moves.removes.length; i++) {
	        remove = moves.removes[i]
	        node = childNodes[remove.from]
	        if (remove.key) {
	            keyMap[remove.key] = node
	        }
	        domNode.removeChild(node)
	    }

	    var length = childNodes.length
	    for (var j = 0; j < moves.inserts.length; j++) {
	        insert = moves.inserts[j]
	        node = keyMap[insert.key]
	        // this is the weirdest bug i've ever seen in webkit
	        domNode.insertBefore(node, insert.to >= length++ ? null : childNodes[insert.to])
	    }
	}

	function replaceRoot(oldRoot, newRoot) {
	    if (oldRoot && newRoot && oldRoot !== newRoot && oldRoot.parentNode) {
	        oldRoot.parentNode.replaceChild(newRoot, oldRoot)
	    }

	    return newRoot;
	}
	});

	var require$$0$7 = (patchOp && typeof patchOp === 'object' && 'default' in patchOp ? patchOp['default'] : patchOp);

	var domIndex = createCommonjsModule(function (module) {
	// Maps a virtual DOM tree onto a real DOM tree in an efficient manner.
	// We don't want to read all of the DOM nodes in the tree so we use
	// the in-order tree indexing to eliminate recursion down certain branches.
	// We only recurse into a DOM node if we know that it contains a child of
	// interest.

	var noChild = {}

	module.exports = domIndex

	function domIndex(rootNode, tree, indices, nodes) {
	    if (!indices || indices.length === 0) {
	        return {}
	    } else {
	        indices.sort(ascending)
	        return recurse(rootNode, tree, indices, nodes, 0)
	    }
	}

	function recurse(rootNode, tree, indices, nodes, rootIndex) {
	    nodes = nodes || {}


	    if (rootNode) {
	        if (indexInRange(indices, rootIndex, rootIndex)) {
	            nodes[rootIndex] = rootNode
	        }

	        var vChildren = tree.children

	        if (vChildren) {

	            var childNodes = rootNode.childNodes

	            for (var i = 0; i < tree.children.length; i++) {
	                rootIndex += 1

	                var vChild = vChildren[i] || noChild
	                var nextIndex = rootIndex + (vChild.count || 0)

	                // skip recursion down the tree if there are no nodes down here
	                if (indexInRange(indices, rootIndex, nextIndex)) {
	                    recurse(childNodes[i], vChild, indices, nodes, rootIndex)
	                }

	                rootIndex = nextIndex
	            }
	        }
	    }

	    return nodes
	}

	// Binary search for an index in the interval [left, right]
	function indexInRange(indices, left, right) {
	    if (indices.length === 0) {
	        return false
	    }

	    var minIndex = 0
	    var maxIndex = indices.length - 1
	    var currentIndex
	    var currentItem

	    while (minIndex <= maxIndex) {
	        currentIndex = ((maxIndex + minIndex) / 2) >> 0
	        currentItem = indices[currentIndex]

	        if (minIndex === maxIndex) {
	            return currentItem >= left && currentItem <= right
	        } else if (currentItem < left) {
	            minIndex = currentIndex + 1
	        } else  if (currentItem > right) {
	            maxIndex = currentIndex - 1
	        } else {
	            return true
	        }
	    }

	    return false;
	}

	function ascending(a, b) {
	    return a > b ? 1 : -1
	}
	});

	var require$$1$2 = (domIndex && typeof domIndex === 'object' && 'default' in domIndex ? domIndex['default'] : domIndex);

	var removeEventListener = createCommonjsModule(function (module) {
	module.exports = removeEventListener

	function removeEventListener(type, listener) {
	    var elem = this

	    if (!elem.listeners) {
	        return
	    }

	    if (!elem.listeners[type]) {
	        return
	    }

	    var list = elem.listeners[type]
	    var index = list.indexOf(listener)
	    if (index !== -1) {
	        list.splice(index, 1)
	    }
	}
	});

	var require$$1$3 = (removeEventListener && typeof removeEventListener === 'object' && 'default' in removeEventListener ? removeEventListener['default'] : removeEventListener);

	var addEventListener = createCommonjsModule(function (module) {
	module.exports = addEventListener

	function addEventListener(type, listener) {
	    var elem = this

	    if (!elem.listeners) {
	        elem.listeners = {}
	    }

	    if (!elem.listeners[type]) {
	        elem.listeners[type] = []
	    }

	    if (elem.listeners[type].indexOf(listener) === -1) {
	        elem.listeners[type].push(listener)
	    }
	}
	});

	var require$$2$2 = (addEventListener && typeof addEventListener === 'object' && 'default' in addEventListener ? addEventListener['default'] : addEventListener);

	var dispatchEvent = createCommonjsModule(function (module) {
	module.exports = dispatchEvent

	function dispatchEvent(ev) {
	    var elem = this
	    var type = ev.type

	    if (!ev.target) {
	        ev.target = elem
	    }

	    if (!elem.listeners) {
	        elem.listeners = {}
	    }

	    var listeners = elem.listeners[type]

	    if (listeners) {
	        return listeners.forEach(function (listener) {
	            ev.currentTarget = elem
	            if (typeof listener === 'function') {
	                listener(ev)
	            } else {
	                listener.handleEvent(ev)
	            }
	        })
	    }

	    if (elem.parentNode) {
	        elem.parentNode.dispatchEvent(ev)
	    }
	}
	});

	var require$$3$2 = (dispatchEvent && typeof dispatchEvent === 'object' && 'default' in dispatchEvent ? dispatchEvent['default'] : dispatchEvent);

	var event = createCommonjsModule(function (module) {
	module.exports = Event

	function Event(family) {}

	Event.prototype.initEvent = function _Event_initEvent(type, bubbles, cancelable) {
	    this.type = type
	    this.bubbles = bubbles
	    this.cancelable = cancelable
	}

	Event.prototype.preventDefault = function _Event_preventDefault() {
	    
	}
	});

	var require$$3$3 = (event && typeof event === 'object' && 'default' in event ? event['default'] : event);

	var serialize = createCommonjsModule(function (module) {
	module.exports = serializeNode

	var voidElements = /area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr/i;

	function serializeNode(node) {
	    switch (node.nodeType) {
	        case 3:
	            return escapeText(node.data)
	        case 8:
	            return "<!--" + node.data + "-->"
	        default:
	            return serializeElement(node)
	    }
	}

	function serializeElement(elem) {
	    var strings = []

	    var tagname = elem.tagName

	    if (elem.namespaceURI === "http://www.w3.org/1999/xhtml") {
	        tagname = tagname.toLowerCase()
	    }

	    strings.push("<" + tagname + properties(elem) + datasetify(elem))

	    if (voidElements.test(tagname)) {
	        strings.push(" />")
	    } else {
	        strings.push(">")

	        if (elem.childNodes.length) {
	            strings.push.apply(strings, elem.childNodes.map(serializeNode))
	        } else if (elem.textContent || elem.innerText) {
	            strings.push(escapeText(elem.textContent || elem.innerText))
	        } else if (elem.innerHTML) {
	            strings.push(elem.innerHTML)
	        }

	        strings.push("</" + tagname + ">")
	    }

	    return strings.join("")
	}

	function isProperty(elem, key) {
	    var type = typeof elem[key]

	    if (key === "style" && Object.keys(elem.style).length > 0) {
	      return true
	    }

	    return elem.hasOwnProperty(key) &&
	        (type === "string" || type === "boolean" || type === "number") &&
	        key !== "nodeName" && key !== "className" && key !== "tagName" &&
	        key !== "textContent" && key !== "innerText" && key !== "namespaceURI" &&  key !== "innerHTML"
	}

	function stylify(styles) {
	    var attr = ""
	    Object.keys(styles).forEach(function (key) {
	        var value = styles[key]
	        key = key.replace(/[A-Z]/g, function(c) {
	            return "-" + c.toLowerCase();
	        })
	        attr += key + ":" + value + ";"
	    })
	    return attr
	}

	function datasetify(elem) {
	    var ds = elem.dataset
	    var props = []

	    for (var key in ds) {
	        props.push({ name: "data-" + key, value: ds[key] })
	    }

	    return props.length ? stringify(props) : ""
	}

	function stringify(list) {
	    var attributes = []
	    list.forEach(function (tuple) {
	        var name = tuple.name
	        var value = tuple.value

	        if (name === "style") {
	            value = stylify(value)
	        }

	        attributes.push(name + "=" + "\"" + escapeAttributeValue(value) + "\"")
	    })

	    return attributes.length ? " " + attributes.join(" ") : ""
	}

	function properties(elem) {
	    var props = []
	    for (var key in elem) {
	        if (isProperty(elem, key)) {
	            props.push({ name: key, value: elem[key] })
	        }
	    }

	    for (var ns in elem._attributes) {
	      for (var attribute in elem._attributes[ns]) {
	        var prop = elem._attributes[ns][attribute]
	        var name = (prop.prefix ? prop.prefix + ":" : "") + attribute
	        props.push({ name: name, value: prop.value })
	      }
	    }

	    if (elem.className) {
	        props.push({ name: "class", value: elem.className })
	    }

	    return props.length ? stringify(props) : ""
	}

	function escapeText(str) {
	    return str
	        .replace(/&/g, "&amp;")
	        .replace(/</g, "&lt;")
	        .replace(/>/g, "&gt;")
	}

	function escapeAttributeValue(str) {
	    return escapeText(str).replace(/"/g, "&quot;")
	}
	});

	var require$$0$12 = (serialize && typeof serialize === 'object' && 'default' in serialize ? serialize['default'] : serialize);

	var index$5 = createCommonjsModule(function (module) {
	var slice = Array.prototype.slice

	module.exports = iterativelyWalk

	function iterativelyWalk(nodes, cb) {
	    if (!('length' in nodes)) {
	        nodes = [nodes]
	    }
	    
	    nodes = slice.call(nodes)

	    while(nodes.length) {
	        var node = nodes.shift(),
	            ret = cb(node)

	        if (ret) {
	            return ret
	        }

	        if (node.childNodes && node.childNodes.length) {
	            nodes = slice.call(node.childNodes).concat(nodes)
	        }
	    }
	}
	});

	var require$$4$2 = (index$5 && typeof index$5 === 'object' && 'default' in index$5 ? index$5['default'] : index$5);

	var domElement = createCommonjsModule(function (module) {
	var domWalk = require$$4$2
	var dispatchEvent = require$$3$2
	var addEventListener = require$$2$2
	var removeEventListener = require$$1$3
	var serializeNode = require$$0$12

	var htmlns = "http://www.w3.org/1999/xhtml"

	module.exports = DOMElement

	function DOMElement(tagName, owner, namespace) {
	    if (!(this instanceof DOMElement)) {
	        return new DOMElement(tagName)
	    }

	    var ns = namespace === undefined ? htmlns : (namespace || null)

	    this.tagName = ns === htmlns ? String(tagName).toUpperCase() : tagName
	    this.className = ""
	    this.dataset = {}
	    this.childNodes = []
	    this.parentNode = null
	    this.style = {}
	    this.ownerDocument = owner || null
	    this.namespaceURI = ns
	    this._attributes = {}

	    if (this.tagName === 'INPUT') {
	      this.type = 'text'
	    }
	}

	DOMElement.prototype.type = "DOMElement"
	DOMElement.prototype.nodeType = 1

	DOMElement.prototype.appendChild = function _Element_appendChild(child) {
	    if (child.parentNode) {
	        child.parentNode.removeChild(child)
	    }

	    this.childNodes.push(child)
	    child.parentNode = this

	    return child
	}

	DOMElement.prototype.replaceChild =
	    function _Element_replaceChild(elem, needle) {
	        // TODO: Throw NotFoundError if needle.parentNode !== this

	        if (elem.parentNode) {
	            elem.parentNode.removeChild(elem)
	        }

	        var index = this.childNodes.indexOf(needle)

	        needle.parentNode = null
	        this.childNodes[index] = elem
	        elem.parentNode = this

	        return needle
	    }

	DOMElement.prototype.removeChild = function _Element_removeChild(elem) {
	    // TODO: Throw NotFoundError if elem.parentNode !== this

	    var index = this.childNodes.indexOf(elem)
	    this.childNodes.splice(index, 1)

	    elem.parentNode = null
	    return elem
	}

	DOMElement.prototype.insertBefore =
	    function _Element_insertBefore(elem, needle) {
	        // TODO: Throw NotFoundError if referenceElement is a dom node
	        // and parentNode !== this

	        if (elem.parentNode) {
	            elem.parentNode.removeChild(elem)
	        }

	        var index = needle === null || needle === undefined ?
	            -1 :
	            this.childNodes.indexOf(needle)

	        if (index > -1) {
	            this.childNodes.splice(index, 0, elem)
	        } else {
	            this.childNodes.push(elem)
	        }

	        elem.parentNode = this
	        return elem
	    }

	DOMElement.prototype.setAttributeNS =
	    function _Element_setAttributeNS(namespace, name, value) {
	        var prefix = null
	        var localName = name
	        var colonPosition = name.indexOf(":")
	        if (colonPosition > -1) {
	            prefix = name.substr(0, colonPosition)
	            localName = name.substr(colonPosition + 1)
	        }
	        var attributes = this._attributes[namespace] || (this._attributes[namespace] = {})
	        attributes[localName] = {value: value, prefix: prefix}
	    }

	DOMElement.prototype.getAttributeNS =
	    function _Element_getAttributeNS(namespace, name) {
	        var attributes = this._attributes[namespace];
	        var value = attributes && attributes[name] && attributes[name].value
	        if (typeof value !== "string") {
	            return null
	        }

	        return value
	    }

	DOMElement.prototype.removeAttributeNS =
	    function _Element_removeAttributeNS(namespace, name) {
	        var attributes = this._attributes[namespace];
	        if (attributes) {
	            delete attributes[name]
	        }
	    }

	DOMElement.prototype.hasAttributeNS =
	    function _Element_hasAttributeNS(namespace, name) {
	        var attributes = this._attributes[namespace]
	        return !!attributes && name in attributes;
	    }

	DOMElement.prototype.setAttribute = function _Element_setAttribute(name, value) {
	    return this.setAttributeNS(null, name, value)
	}

	DOMElement.prototype.getAttribute = function _Element_getAttribute(name) {
	    return this.getAttributeNS(null, name)
	}

	DOMElement.prototype.removeAttribute = function _Element_removeAttribute(name) {
	    return this.removeAttributeNS(null, name)
	}

	DOMElement.prototype.hasAttribute = function _Element_hasAttribute(name) {
	    return this.hasAttributeNS(null, name)
	}

	DOMElement.prototype.removeEventListener = removeEventListener
	DOMElement.prototype.addEventListener = addEventListener
	DOMElement.prototype.dispatchEvent = dispatchEvent

	// Un-implemented
	DOMElement.prototype.focus = function _Element_focus() {
	    return void 0
	}

	DOMElement.prototype.toString = function _Element_toString() {
	    return serializeNode(this)
	}

	DOMElement.prototype.getElementsByClassName = function _Element_getElementsByClassName(classNames) {
	    var classes = classNames.split(" ");
	    var elems = []

	    domWalk(this, function (node) {
	        if (node.nodeType === 1) {
	            var nodeClassName = node.className || ""
	            var nodeClasses = nodeClassName.split(" ")

	            if (classes.every(function (item) {
	                return nodeClasses.indexOf(item) !== -1
	            })) {
	                elems.push(node)
	            }
	        }
	    })

	    return elems
	}

	DOMElement.prototype.getElementsByTagName = function _Element_getElementsByTagName(tagName) {
	    tagName = tagName.toLowerCase()
	    var elems = []

	    domWalk(this.childNodes, function (node) {
	        if (node.nodeType === 1 && (tagName === '*' || node.tagName.toLowerCase() === tagName)) {
	            elems.push(node)
	        }
	    })

	    return elems
	}

	DOMElement.prototype.contains = function _Element_contains(element) {
	    return domWalk(this, function (node) {
	        return element === node
	    }) || false
	}
	});

	var require$$0$11 = (domElement && typeof domElement === 'object' && 'default' in domElement ? domElement['default'] : domElement);

	var domFragment = createCommonjsModule(function (module) {
	var DOMElement = require$$0$11

	module.exports = DocumentFragment

	function DocumentFragment(owner) {
	    if (!(this instanceof DocumentFragment)) {
	        return new DocumentFragment()
	    }

	    this.childNodes = []
	    this.parentNode = null
	    this.ownerDocument = owner || null
	}

	DocumentFragment.prototype.type = "DocumentFragment"
	DocumentFragment.prototype.nodeType = 11
	DocumentFragment.prototype.nodeName = "#document-fragment"

	DocumentFragment.prototype.appendChild  = DOMElement.prototype.appendChild
	DocumentFragment.prototype.replaceChild = DOMElement.prototype.replaceChild
	DocumentFragment.prototype.removeChild  = DOMElement.prototype.removeChild

	DocumentFragment.prototype.toString =
	    function _DocumentFragment_toString() {
	        return this.childNodes.map(function (node) {
	            return String(node)
	        }).join("")
	    }
	});

	var require$$4$1 = (domFragment && typeof domFragment === 'object' && 'default' in domFragment ? domFragment['default'] : domFragment);

	var domText = createCommonjsModule(function (module) {
	module.exports = DOMText

	function DOMText(value, owner) {
	    if (!(this instanceof DOMText)) {
	        return new DOMText(value)
	    }

	    this.data = value || ""
	    this.length = this.data.length
	    this.ownerDocument = owner || null
	}

	DOMText.prototype.type = "DOMTextNode"
	DOMText.prototype.nodeType = 3

	DOMText.prototype.toString = function _Text_toString() {
	    return this.data
	}

	DOMText.prototype.replaceData = function replaceData(index, length, value) {
	    var current = this.data
	    var left = current.substring(0, index)
	    var right = current.substring(index + length, current.length)
	    this.data = left + value + right
	    this.length = this.data.length
	}
	});

	var require$$6$1 = (domText && typeof domText === 'object' && 'default' in domText ? domText['default'] : domText);

	var domComment = createCommonjsModule(function (module) {
	module.exports = Comment

	function Comment(data, owner) {
	    if (!(this instanceof Comment)) {
	        return new Comment(data, owner)
	    }

	    this.data = data
	    this.nodeValue = data
	    this.length = data.length
	    this.ownerDocument = owner || null
	}

	Comment.prototype.nodeType = 8
	Comment.prototype.nodeName = "#comment"

	Comment.prototype.toString = function _Comment_toString() {
	    return "[object Comment]"
	}
	});

	var require$$7$1 = (domComment && typeof domComment === 'object' && 'default' in domComment ? domComment['default'] : domComment);

	var document$2 = createCommonjsModule(function (module) {
	var domWalk = require$$4$2

	var Comment = require$$7$1
	var DOMText = require$$6$1
	var DOMElement = require$$0$11
	var DocumentFragment = require$$4$1
	var Event = require$$3$3
	var dispatchEvent = require$$3$2
	var addEventListener = require$$2$2
	var removeEventListener = require$$1$3

	module.exports = Document;

	function Document() {
	    if (!(this instanceof Document)) {
	        return new Document();
	    }

	    this.head = this.createElement("head")
	    this.body = this.createElement("body")
	    this.documentElement = this.createElement("html")
	    this.documentElement.appendChild(this.head)
	    this.documentElement.appendChild(this.body)
	    this.childNodes = [this.documentElement]
	    this.nodeType = 9
	}

	var proto = Document.prototype;
	proto.createTextNode = function createTextNode(value) {
	    return new DOMText(value, this)
	}

	proto.createElementNS = function createElementNS(namespace, tagName) {
	    var ns = namespace === null ? null : String(namespace)
	    return new DOMElement(tagName, this, ns)
	}

	proto.createElement = function createElement(tagName) {
	    return new DOMElement(tagName, this)
	}

	proto.createDocumentFragment = function createDocumentFragment() {
	    return new DocumentFragment(this)
	}

	proto.createEvent = function createEvent(family) {
	    return new Event(family)
	}

	proto.createComment = function createComment(data) {
	    return new Comment(data, this)
	}

	proto.getElementById = function getElementById(id) {
	    id = String(id)

	    var result = domWalk(this.childNodes, function (node) {
	        if (String(node.id) === id) {
	            return node
	        }
	    })

	    return result || null
	}

	proto.getElementsByClassName = DOMElement.prototype.getElementsByClassName
	proto.getElementsByTagName = DOMElement.prototype.getElementsByTagName
	proto.contains = DOMElement.prototype.contains

	proto.removeEventListener = removeEventListener
	proto.addEventListener = addEventListener
	proto.dispatchEvent = dispatchEvent
	});

	var require$$0$10 = (document$2 && typeof document$2 === 'object' && 'default' in document$2 ? document$2['default'] : document$2);

	var index$4 = createCommonjsModule(function (module) {
	var Document = require$$0$10;

	module.exports = new Document();
	});

	var require$$0$9 = (index$4 && typeof index$4 === 'object' && 'default' in index$4 ? index$4['default'] : index$4);

	var document$1 = createCommonjsModule(function (module) {
	var topLevel = typeof commonjsGlobal !== 'undefined' ? commonjsGlobal :
	    typeof window !== 'undefined' ? window : {}
	var minDoc = require$$0$9;

	if (typeof document$1 !== 'undefined') {
	    module.exports = document$1;
	} else {
	    var doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'];

	    if (!doccy) {
	        doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'] = minDoc;
	    }

	    module.exports = doccy;
	}
	});

	var require$$5$1 = (document$1 && typeof document$1 === 'object' && 'default' in document$1 ? document$1['default'] : document$1);

	var createElement = createCommonjsModule(function (module) {
	var document = require$$5$1

	var applyProperties = require$$4

	var isVNode = require$$8
	var isVText = require$$7
	var isWidget = require$$5
	var handleThunk = require$$0$5

	module.exports = createElement

	function createElement(vnode, opts) {
	    var doc = opts ? opts.document || document : document
	    var warn = opts ? opts.warn : null

	    vnode = handleThunk(vnode).a

	    if (isWidget(vnode)) {
	        return vnode.init()
	    } else if (isVText(vnode)) {
	        return doc.createTextNode(vnode.text)
	    } else if (!isVNode(vnode)) {
	        if (warn) {
	            warn("Item is not a valid virtual dom node", vnode)
	        }
	        return null
	    }

	    var node = (vnode.namespace === null) ?
	        doc.createElement(vnode.tagName) :
	        doc.createElementNS(vnode.namespace, vnode.tagName)

	    var props = vnode.properties
	    applyProperties(node, props)

	    var children = vnode.children

	    for (var i = 0; i < children.length; i++) {
	        var childNode = createElement(children[i], opts)
	        if (childNode) {
	            node.appendChild(childNode)
	        }
	    }

	    return node
	}
	});

	var require$$2$1 = (createElement && typeof createElement === 'object' && 'default' in createElement ? createElement['default'] : createElement);

	var patch$2 = createCommonjsModule(function (module) {
	var document = require$$5$1
	var isArray = require$$3$1

	var render = require$$2$1
	var domIndex = require$$1$2
	var patchOp = require$$0$7
	module.exports = patch

	function patch(rootNode, patches, renderOptions) {
	    renderOptions = renderOptions || {}
	    renderOptions.patch = renderOptions.patch && renderOptions.patch !== patch
	        ? renderOptions.patch
	        : patchRecursive
	    renderOptions.render = renderOptions.render || render

	    return renderOptions.patch(rootNode, patches, renderOptions)
	}

	function patchRecursive(rootNode, patches, renderOptions) {
	    var indices = patchIndices(patches)

	    if (indices.length === 0) {
	        return rootNode
	    }

	    var index = domIndex(rootNode, patches.a, indices)
	    var ownerDocument = rootNode.ownerDocument

	    if (!renderOptions.document && ownerDocument !== document) {
	        renderOptions.document = ownerDocument
	    }

	    for (var i = 0; i < indices.length; i++) {
	        var nodeIndex = indices[i]
	        rootNode = applyPatch(rootNode,
	            index[nodeIndex],
	            patches[nodeIndex],
	            renderOptions)
	    }

	    return rootNode
	}

	function applyPatch(rootNode, domNode, patchList, renderOptions) {
	    if (!domNode) {
	        return rootNode
	    }

	    var newNode

	    if (isArray(patchList)) {
	        for (var i = 0; i < patchList.length; i++) {
	            newNode = patchOp(patchList[i], domNode, renderOptions)

	            if (domNode === rootNode) {
	                rootNode = newNode
	            }
	        }
	    } else {
	        newNode = patchOp(patchList, domNode, renderOptions)

	        if (domNode === rootNode) {
	            rootNode = newNode
	        }
	    }

	    return rootNode
	}

	function patchIndices(patches) {
	    var indices = []

	    for (var key in patches) {
	        if (key !== "a") {
	            indices.push(Number(key))
	        }
	    }

	    return indices
	}
	});

	var require$$0$6 = (patch$2 && typeof patch$2 === 'object' && 'default' in patch$2 ? patch$2['default'] : patch$2);

	var patch = createCommonjsModule(function (module) {
	var patch = require$$0$6

	module.exports = patch
	});

	var patch$1 = (patch && typeof patch === 'object' && 'default' in patch ? patch['default'] : patch);

	var udc = createCommonjsModule(function (module, exports) {
	(function (root, factory) {
			"use strict";

			if (typeof exports === 'object') {
				module.exports = factory();
			} else if (typeof define === 'function' && define.amd) {
				define(factory);
			} else {
				root.UltraDeepClone = factory();
			}
		}(commonjsGlobal, function () {

			var functionPropertyFilter = [
				"caller",
				"arguments"
			];

			// Node.js has a lot of silly enumeral properties on its "TypedArray" implementation
			var typedArrayPropertyFilter = [
				'BYTES_PER_ELEMENT',
				'get',
				'set',
				'slice',
				'subarray',
				'buffer',
				'length',
				'byteOffset',
				'byteLength'
			];

			var primitiveCloner  = makeCloner(clonePrimitive);
			var typedArrayCloner = makeRecursiveCloner(makeCloner(cloneTypedArray), typedArrayPropertyFilter);

			function typeString (type) {
				return '[object ' + type + ']';
			}

			var cloneFunctions = {};

			cloneFunctions[typeString('RegExp')] = makeCloner(cloneRegExp);
			cloneFunctions[typeString('Date')] = makeCloner(cloneDate);
			cloneFunctions[typeString('Function')] = makeRecursiveCloner(makeCloner(cloneFunction), functionPropertyFilter);
			cloneFunctions[typeString('Object')] = makeRecursiveCloner(makeCloner(cloneObject));
			cloneFunctions[typeString('Array')] = makeRecursiveCloner(makeCloner(cloneArray));

			['Null', 'Undefined', 'Number', 'String', 'Boolean']
				.map(typeString)
				.forEach(function (type) {
					cloneFunctions[type] = primitiveCloner;
				});

			['Int8Array', 'Uint8Array', 'Uint8ClampedArray', 'Int16Array', 'Uint16Array',
			 'Int32Array', 'Uint32Array', 'Float32Array', 'Float64Array']
				.map(typeString)
				.forEach(function (type) {
					cloneFunctions[type] = typedArrayCloner;
				});

			function makeArguments (numberOfArgs) {
				var letters = [];
				for ( var i = 1; i <= numberOfArgs; i++ ) letters.push("arg" + i);
				return letters;
			}

			function wrapFunctionWithArity (callback) {
				var argList = makeArguments(callback.length);
				var functionCode = 'return false || function ';
				functionCode += callback.name + '(';
				functionCode += argList.join(', ') + ') {\n';
				functionCode += 'return fn.apply(this, arguments);\n';
				functionCode += '};'

				return Function("fn", functionCode)(callback);
			}

			function makeCloner (cloneThing) {
				return function(thing, thingStack, copyStack) {
					thingStack.push(thing);
					var copy = cloneThing(thing);
					copyStack.push(copy);
					return copy;
				};
			}

			function clonePrimitive (primitive) {
				return primitive;
			}

			function cloneRegExp (regexp) {
				return new RegExp(regexp);
			}

			function cloneDate (date) {
				return new Date(date.getTime());
			}

			// We can't really clone functions but we can wrap them in a new function that will
			// recieve clones of any properties the original function may have had
			function cloneFunction (fn) {
				return wrapFunctionWithArity(fn);
			}

			// This will not properly clone `constructed` objects because
			// it is impossible to know with what arguments the constructor
			// was originally invoked.
			function cloneObject (object) {
				return Object.create(Object.getPrototypeOf(object));
			}

			function cloneArray (array) {
				return [];
			}

			function cloneTypedArray (typedArray) {
				var len = typedArray.length;
				return new typedArray.constructor(len);
			}

			function makeRecursiveCloner (cloneThing, propertyFilter) {
				return function(thing, thingStack, copyStack) {
					var clone = this;

					return Object.getOwnPropertyNames(thing)
						.filter(function(prop){
							return !propertyFilter || propertyFilter.indexOf(prop) === -1;
						})
						.reduce(function(copy, prop) {
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

			return function _ultraDeepClone (source) {

				var thingStack = [];
				var copyStack = [];

				function clone (thing) {
					var typeOfThing = Object.prototype.toString.call(thing);
					return cloneFunctions[typeOfThing].call(clone, thing, thingStack, copyStack);
				};

				return clone(source);
			};
	}));
	});

	var ultraDeepClone = (udc && typeof udc === 'object' && 'default' in udc ? udc['default'] : udc);

	var Instrument = function () {
	  function Instrument() {
	    classCallCheck(this, Instrument);
	  }

	  createClass(Instrument, [{
	    key: "start",
	    value: function start() {
	      this.started = new Date().getTime();
	    }
	  }, {
	    key: "end",
	    value: function end() {
	      this.ended = new Date().getTime();
	      return this.ended - this.started;
	    }
	  }]);
	  return Instrument;
	}();

	var voidElements = createCommonjsModule(function (module) {
	/**
	 * Void elements.
	 *
	 * https://github.com/facebook/react/blob/v0.12.0/src/browser/ui/ReactDOMComponent.js#L99
	 */

	module.exports = {
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
	});

	var require$$0$13 = (voidElements && typeof voidElements === 'object' && 'default' in voidElements ? voidElements['default'] : voidElements);

	var propertyConfig = createCommonjsModule(function (module) {
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

	var properties = {
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
	  data: true, // For `<object />` acts as `src`.
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

	module.exports = {
	  attributeTypes: types,
	  properties: properties,
	  attributeNames: attributeNames
	};
	});

	var require$$0$14 = (propertyConfig && typeof propertyConfig === 'object' && 'default' in propertyConfig ? propertyConfig['default'] : propertyConfig);

	var index$7 = createCommonjsModule(function (module) {
	/*!
	 * escape-html
	 * Copyright(c) 2012-2013 TJ Holowaychuk
	 * Copyright(c) 2015 Andreas Lubbe
	 * Copyright(c) 2015 Tiancheng "Timothy" Gu
	 * MIT Licensed
	 */

	'use strict';

	/**
	 * Module variables.
	 * @private
	 */

	var matchHtmlRegExp = /["'&<>]/;

	/**
	 * Module exports.
	 * @public
	 */

	module.exports = escapeHtml;

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
	      case 34: // "
	        escape = '&quot;';
	        break;
	      case 38: // &
	        escape = '&amp;';
	        break;
	      case 39: // '
	        escape = '&#39;';
	        break;
	      case 60: // <
	        escape = '&lt;';
	        break;
	      case 62: // >
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

	  return lastIndex !== index
	    ? html + str.substring(lastIndex, index)
	    : html;
	}
	});

	var require$$1$5 = (index$7 && typeof index$7 === 'object' && 'default' in index$7 ? index$7['default'] : index$7);

	var createAttribute = createCommonjsModule(function (module) {
	var escape = require$$1$5;
	var propConfig = require$$0$14;
	var types = propConfig.attributeTypes;
	var properties = propConfig.properties;
	var attributeNames = propConfig.attributeNames;

	var prefixAttribute = memoizeString(function (name) {
	  return escape(name) + '="';
	});

	module.exports = createAttribute;

	/**
	 * Create attribute string.
	 *
	 * @param {String} name The name of the property or attribute
	 * @param {*} value The value
	 * @param {Boolean} [isAttribute] Denotes whether `name` is an attribute.
	 * @return {?String} Attribute string || null if not a valid property or custom attribute.
	 */

	function createAttribute(name, value, isAttribute) {
	  if (properties.hasOwnProperty(name)) {
	    if (shouldSkip(name, value)) return '';
	    name = (attributeNames[name] || name).toLowerCase();
	    var attrType = properties[name];
	    // for BOOLEAN `value` only has to be truthy
	    // for OVERLOADED_BOOLEAN `value` has to be === true
	    if ((attrType === types.BOOLEAN) ||
	        (attrType === types.OVERLOADED_BOOLEAN && value === true)) {
	      return escape(name);
	    }
	    return prefixAttribute(name) + escape(value) + '"';
	  } else if (isAttribute) {
	    if (value == null) return '';
	    return prefixAttribute(name) + escape(value) + '"';
	  }
	  // return null if `name` is neither a valid property nor an attribute
	  return null;
	}

	/**
	 * Should skip false boolean attributes.
	 */

	function shouldSkip(name, value) {
	  var attrType = properties[name];
	  return value == null ||
	    (attrType === types.BOOLEAN && !value) ||
	    (attrType === types.OVERLOADED_BOOLEAN && value === false);
	}

	/**
	 * Memoizes the return value of a function that accepts one string argument.
	 *
	 * @param {function} callback
	 * @return {function}
	 */

	function memoizeString(callback) {
	  var cache = {};
	  return function(string) {
	    if (cache.hasOwnProperty(string)) {
	      return cache[string];
	    } else {
	      return cache[string] = callback.call(this, string);
	    }
	  };
	}
	});

	var require$$1$4 = (createAttribute && typeof createAttribute === 'object' && 'default' in createAttribute ? createAttribute['default'] : createAttribute);

	var trailingDigitRegexp = createCommonjsModule(function (module) {
	module.exports = /([\u0030-\u0039\u00B2\u00B3\u00B9\u00BC-\u00BE\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u09F4-\u09F9\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0B72-\u0B77\u0BE6-\u0BF2\u0C66-\u0C6F\u0C78-\u0C7E\u0CE6-\u0CEF\u0D66-\u0D75\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F33\u1040-\u1049\u1090-\u1099\u1369-\u137C\u16EE-\u16F0\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1946-\u194F\u19D0-\u19DA\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\u2070\u2074-\u2079\u2080-\u2089\u2150-\u2182\u2185-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2CFD\u3007\u3021-\u3029\u3038-\u303A\u3192-\u3195\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\uA620-\uA629\uA6E6-\uA6EF\uA830-\uA835\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19])([^\u0030-\u0039\u00B2\u00B3\u00B9\u00BC-\u00BE\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u09F4-\u09F9\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0B72-\u0B77\u0BE6-\u0BF2\u0C66-\u0C6F\u0C78-\u0C7E\u0CE6-\u0CEF\u0D66-\u0D75\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F33\u1040-\u1049\u1090-\u1099\u1369-\u137C\u16EE-\u16F0\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1946-\u194F\u19D0-\u19DA\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\u2070\u2074-\u2079\u2080-\u2089\u2150-\u2182\u2185-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2CFD\u3007\u3021-\u3029\u3038-\u303A\u3192-\u3195\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\uA620-\uA629\uA6E6-\uA6EF\uA830-\uA835\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19])/g
	});

	var require$$0$16 = (trailingDigitRegexp && typeof trailingDigitRegexp === 'object' && 'default' in trailingDigitRegexp ? trailingDigitRegexp['default'] : trailingDigitRegexp);

	var camelCaseRegexp = createCommonjsModule(function (module) {
	module.exports = /([\u0061-\u007A\u00B5\u00DF-\u00F6\u00F8-\u00FF\u0101\u0103\u0105\u0107\u0109\u010B\u010D\u010F\u0111\u0113\u0115\u0117\u0119\u011B\u011D\u011F\u0121\u0123\u0125\u0127\u0129\u012B\u012D\u012F\u0131\u0133\u0135\u0137\u0138\u013A\u013C\u013E\u0140\u0142\u0144\u0146\u0148\u0149\u014B\u014D\u014F\u0151\u0153\u0155\u0157\u0159\u015B\u015D\u015F\u0161\u0163\u0165\u0167\u0169\u016B\u016D\u016F\u0171\u0173\u0175\u0177\u017A\u017C\u017E-\u0180\u0183\u0185\u0188\u018C\u018D\u0192\u0195\u0199-\u019B\u019E\u01A1\u01A3\u01A5\u01A8\u01AA\u01AB\u01AD\u01B0\u01B4\u01B6\u01B9\u01BA\u01BD-\u01BF\u01C6\u01C9\u01CC\u01CE\u01D0\u01D2\u01D4\u01D6\u01D8\u01DA\u01DC\u01DD\u01DF\u01E1\u01E3\u01E5\u01E7\u01E9\u01EB\u01ED\u01EF\u01F0\u01F3\u01F5\u01F9\u01FB\u01FD\u01FF\u0201\u0203\u0205\u0207\u0209\u020B\u020D\u020F\u0211\u0213\u0215\u0217\u0219\u021B\u021D\u021F\u0221\u0223\u0225\u0227\u0229\u022B\u022D\u022F\u0231\u0233-\u0239\u023C\u023F\u0240\u0242\u0247\u0249\u024B\u024D\u024F-\u0293\u0295-\u02AF\u0371\u0373\u0377\u037B-\u037D\u0390\u03AC-\u03CE\u03D0\u03D1\u03D5-\u03D7\u03D9\u03DB\u03DD\u03DF\u03E1\u03E3\u03E5\u03E7\u03E9\u03EB\u03ED\u03EF-\u03F3\u03F5\u03F8\u03FB\u03FC\u0430-\u045F\u0461\u0463\u0465\u0467\u0469\u046B\u046D\u046F\u0471\u0473\u0475\u0477\u0479\u047B\u047D\u047F\u0481\u048B\u048D\u048F\u0491\u0493\u0495\u0497\u0499\u049B\u049D\u049F\u04A1\u04A3\u04A5\u04A7\u04A9\u04AB\u04AD\u04AF\u04B1\u04B3\u04B5\u04B7\u04B9\u04BB\u04BD\u04BF\u04C2\u04C4\u04C6\u04C8\u04CA\u04CC\u04CE\u04CF\u04D1\u04D3\u04D5\u04D7\u04D9\u04DB\u04DD\u04DF\u04E1\u04E3\u04E5\u04E7\u04E9\u04EB\u04ED\u04EF\u04F1\u04F3\u04F5\u04F7\u04F9\u04FB\u04FD\u04FF\u0501\u0503\u0505\u0507\u0509\u050B\u050D\u050F\u0511\u0513\u0515\u0517\u0519\u051B\u051D\u051F\u0521\u0523\u0525\u0527\u0561-\u0587\u1D00-\u1D2B\u1D6B-\u1D77\u1D79-\u1D9A\u1E01\u1E03\u1E05\u1E07\u1E09\u1E0B\u1E0D\u1E0F\u1E11\u1E13\u1E15\u1E17\u1E19\u1E1B\u1E1D\u1E1F\u1E21\u1E23\u1E25\u1E27\u1E29\u1E2B\u1E2D\u1E2F\u1E31\u1E33\u1E35\u1E37\u1E39\u1E3B\u1E3D\u1E3F\u1E41\u1E43\u1E45\u1E47\u1E49\u1E4B\u1E4D\u1E4F\u1E51\u1E53\u1E55\u1E57\u1E59\u1E5B\u1E5D\u1E5F\u1E61\u1E63\u1E65\u1E67\u1E69\u1E6B\u1E6D\u1E6F\u1E71\u1E73\u1E75\u1E77\u1E79\u1E7B\u1E7D\u1E7F\u1E81\u1E83\u1E85\u1E87\u1E89\u1E8B\u1E8D\u1E8F\u1E91\u1E93\u1E95-\u1E9D\u1E9F\u1EA1\u1EA3\u1EA5\u1EA7\u1EA9\u1EAB\u1EAD\u1EAF\u1EB1\u1EB3\u1EB5\u1EB7\u1EB9\u1EBB\u1EBD\u1EBF\u1EC1\u1EC3\u1EC5\u1EC7\u1EC9\u1ECB\u1ECD\u1ECF\u1ED1\u1ED3\u1ED5\u1ED7\u1ED9\u1EDB\u1EDD\u1EDF\u1EE1\u1EE3\u1EE5\u1EE7\u1EE9\u1EEB\u1EED\u1EEF\u1EF1\u1EF3\u1EF5\u1EF7\u1EF9\u1EFB\u1EFD\u1EFF-\u1F07\u1F10-\u1F15\u1F20-\u1F27\u1F30-\u1F37\u1F40-\u1F45\u1F50-\u1F57\u1F60-\u1F67\u1F70-\u1F7D\u1F80-\u1F87\u1F90-\u1F97\u1FA0-\u1FA7\u1FB0-\u1FB4\u1FB6\u1FB7\u1FBE\u1FC2-\u1FC4\u1FC6\u1FC7\u1FD0-\u1FD3\u1FD6\u1FD7\u1FE0-\u1FE7\u1FF2-\u1FF4\u1FF6\u1FF7\u210A\u210E\u210F\u2113\u212F\u2134\u2139\u213C\u213D\u2146-\u2149\u214E\u2184\u2C30-\u2C5E\u2C61\u2C65\u2C66\u2C68\u2C6A\u2C6C\u2C71\u2C73\u2C74\u2C76-\u2C7B\u2C81\u2C83\u2C85\u2C87\u2C89\u2C8B\u2C8D\u2C8F\u2C91\u2C93\u2C95\u2C97\u2C99\u2C9B\u2C9D\u2C9F\u2CA1\u2CA3\u2CA5\u2CA7\u2CA9\u2CAB\u2CAD\u2CAF\u2CB1\u2CB3\u2CB5\u2CB7\u2CB9\u2CBB\u2CBD\u2CBF\u2CC1\u2CC3\u2CC5\u2CC7\u2CC9\u2CCB\u2CCD\u2CCF\u2CD1\u2CD3\u2CD5\u2CD7\u2CD9\u2CDB\u2CDD\u2CDF\u2CE1\u2CE3\u2CE4\u2CEC\u2CEE\u2CF3\u2D00-\u2D25\u2D27\u2D2D\uA641\uA643\uA645\uA647\uA649\uA64B\uA64D\uA64F\uA651\uA653\uA655\uA657\uA659\uA65B\uA65D\uA65F\uA661\uA663\uA665\uA667\uA669\uA66B\uA66D\uA681\uA683\uA685\uA687\uA689\uA68B\uA68D\uA68F\uA691\uA693\uA695\uA697\uA723\uA725\uA727\uA729\uA72B\uA72D\uA72F-\uA731\uA733\uA735\uA737\uA739\uA73B\uA73D\uA73F\uA741\uA743\uA745\uA747\uA749\uA74B\uA74D\uA74F\uA751\uA753\uA755\uA757\uA759\uA75B\uA75D\uA75F\uA761\uA763\uA765\uA767\uA769\uA76B\uA76D\uA76F\uA771-\uA778\uA77A\uA77C\uA77F\uA781\uA783\uA785\uA787\uA78C\uA78E\uA791\uA793\uA7A1\uA7A3\uA7A5\uA7A7\uA7A9\uA7FA\uFB00-\uFB06\uFB13-\uFB17\uFF41-\uFF5A])([\u0041-\u005A\u00C0-\u00D6\u00D8-\u00DE\u0100\u0102\u0104\u0106\u0108\u010A\u010C\u010E\u0110\u0112\u0114\u0116\u0118\u011A\u011C\u011E\u0120\u0122\u0124\u0126\u0128\u012A\u012C\u012E\u0130\u0132\u0134\u0136\u0139\u013B\u013D\u013F\u0141\u0143\u0145\u0147\u014A\u014C\u014E\u0150\u0152\u0154\u0156\u0158\u015A\u015C\u015E\u0160\u0162\u0164\u0166\u0168\u016A\u016C\u016E\u0170\u0172\u0174\u0176\u0178\u0179\u017B\u017D\u0181\u0182\u0184\u0186\u0187\u0189-\u018B\u018E-\u0191\u0193\u0194\u0196-\u0198\u019C\u019D\u019F\u01A0\u01A2\u01A4\u01A6\u01A7\u01A9\u01AC\u01AE\u01AF\u01B1-\u01B3\u01B5\u01B7\u01B8\u01BC\u01C4\u01C7\u01CA\u01CD\u01CF\u01D1\u01D3\u01D5\u01D7\u01D9\u01DB\u01DE\u01E0\u01E2\u01E4\u01E6\u01E8\u01EA\u01EC\u01EE\u01F1\u01F4\u01F6-\u01F8\u01FA\u01FC\u01FE\u0200\u0202\u0204\u0206\u0208\u020A\u020C\u020E\u0210\u0212\u0214\u0216\u0218\u021A\u021C\u021E\u0220\u0222\u0224\u0226\u0228\u022A\u022C\u022E\u0230\u0232\u023A\u023B\u023D\u023E\u0241\u0243-\u0246\u0248\u024A\u024C\u024E\u0370\u0372\u0376\u0386\u0388-\u038A\u038C\u038E\u038F\u0391-\u03A1\u03A3-\u03AB\u03CF\u03D2-\u03D4\u03D8\u03DA\u03DC\u03DE\u03E0\u03E2\u03E4\u03E6\u03E8\u03EA\u03EC\u03EE\u03F4\u03F7\u03F9\u03FA\u03FD-\u042F\u0460\u0462\u0464\u0466\u0468\u046A\u046C\u046E\u0470\u0472\u0474\u0476\u0478\u047A\u047C\u047E\u0480\u048A\u048C\u048E\u0490\u0492\u0494\u0496\u0498\u049A\u049C\u049E\u04A0\u04A2\u04A4\u04A6\u04A8\u04AA\u04AC\u04AE\u04B0\u04B2\u04B4\u04B6\u04B8\u04BA\u04BC\u04BE\u04C0\u04C1\u04C3\u04C5\u04C7\u04C9\u04CB\u04CD\u04D0\u04D2\u04D4\u04D6\u04D8\u04DA\u04DC\u04DE\u04E0\u04E2\u04E4\u04E6\u04E8\u04EA\u04EC\u04EE\u04F0\u04F2\u04F4\u04F6\u04F8\u04FA\u04FC\u04FE\u0500\u0502\u0504\u0506\u0508\u050A\u050C\u050E\u0510\u0512\u0514\u0516\u0518\u051A\u051C\u051E\u0520\u0522\u0524\u0526\u0531-\u0556\u10A0-\u10C5\u10C7\u10CD\u1E00\u1E02\u1E04\u1E06\u1E08\u1E0A\u1E0C\u1E0E\u1E10\u1E12\u1E14\u1E16\u1E18\u1E1A\u1E1C\u1E1E\u1E20\u1E22\u1E24\u1E26\u1E28\u1E2A\u1E2C\u1E2E\u1E30\u1E32\u1E34\u1E36\u1E38\u1E3A\u1E3C\u1E3E\u1E40\u1E42\u1E44\u1E46\u1E48\u1E4A\u1E4C\u1E4E\u1E50\u1E52\u1E54\u1E56\u1E58\u1E5A\u1E5C\u1E5E\u1E60\u1E62\u1E64\u1E66\u1E68\u1E6A\u1E6C\u1E6E\u1E70\u1E72\u1E74\u1E76\u1E78\u1E7A\u1E7C\u1E7E\u1E80\u1E82\u1E84\u1E86\u1E88\u1E8A\u1E8C\u1E8E\u1E90\u1E92\u1E94\u1E9E\u1EA0\u1EA2\u1EA4\u1EA6\u1EA8\u1EAA\u1EAC\u1EAE\u1EB0\u1EB2\u1EB4\u1EB6\u1EB8\u1EBA\u1EBC\u1EBE\u1EC0\u1EC2\u1EC4\u1EC6\u1EC8\u1ECA\u1ECC\u1ECE\u1ED0\u1ED2\u1ED4\u1ED6\u1ED8\u1EDA\u1EDC\u1EDE\u1EE0\u1EE2\u1EE4\u1EE6\u1EE8\u1EEA\u1EEC\u1EEE\u1EF0\u1EF2\u1EF4\u1EF6\u1EF8\u1EFA\u1EFC\u1EFE\u1F08-\u1F0F\u1F18-\u1F1D\u1F28-\u1F2F\u1F38-\u1F3F\u1F48-\u1F4D\u1F59\u1F5B\u1F5D\u1F5F\u1F68-\u1F6F\u1FB8-\u1FBB\u1FC8-\u1FCB\u1FD8-\u1FDB\u1FE8-\u1FEC\u1FF8-\u1FFB\u2102\u2107\u210B-\u210D\u2110-\u2112\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u2130-\u2133\u213E\u213F\u2145\u2183\u2C00-\u2C2E\u2C60\u2C62-\u2C64\u2C67\u2C69\u2C6B\u2C6D-\u2C70\u2C72\u2C75\u2C7E-\u2C80\u2C82\u2C84\u2C86\u2C88\u2C8A\u2C8C\u2C8E\u2C90\u2C92\u2C94\u2C96\u2C98\u2C9A\u2C9C\u2C9E\u2CA0\u2CA2\u2CA4\u2CA6\u2CA8\u2CAA\u2CAC\u2CAE\u2CB0\u2CB2\u2CB4\u2CB6\u2CB8\u2CBA\u2CBC\u2CBE\u2CC0\u2CC2\u2CC4\u2CC6\u2CC8\u2CCA\u2CCC\u2CCE\u2CD0\u2CD2\u2CD4\u2CD6\u2CD8\u2CDA\u2CDC\u2CDE\u2CE0\u2CE2\u2CEB\u2CED\u2CF2\uA640\uA642\uA644\uA646\uA648\uA64A\uA64C\uA64E\uA650\uA652\uA654\uA656\uA658\uA65A\uA65C\uA65E\uA660\uA662\uA664\uA666\uA668\uA66A\uA66C\uA680\uA682\uA684\uA686\uA688\uA68A\uA68C\uA68E\uA690\uA692\uA694\uA696\uA722\uA724\uA726\uA728\uA72A\uA72C\uA72E\uA732\uA734\uA736\uA738\uA73A\uA73C\uA73E\uA740\uA742\uA744\uA746\uA748\uA74A\uA74C\uA74E\uA750\uA752\uA754\uA756\uA758\uA75A\uA75C\uA75E\uA760\uA762\uA764\uA766\uA768\uA76A\uA76C\uA76E\uA779\uA77B\uA77D\uA77E\uA780\uA782\uA784\uA786\uA78B\uA78D\uA790\uA792\uA7A0\uA7A2\uA7A4\uA7A6\uA7A8\uA7AA\uFF21-\uFF3A\u0030-\u0039\u00B2\u00B3\u00B9\u00BC-\u00BE\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u09F4-\u09F9\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0B72-\u0B77\u0BE6-\u0BF2\u0C66-\u0C6F\u0C78-\u0C7E\u0CE6-\u0CEF\u0D66-\u0D75\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F33\u1040-\u1049\u1090-\u1099\u1369-\u137C\u16EE-\u16F0\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1946-\u194F\u19D0-\u19DA\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\u2070\u2074-\u2079\u2080-\u2089\u2150-\u2182\u2185-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2CFD\u3007\u3021-\u3029\u3038-\u303A\u3192-\u3195\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\uA620-\uA629\uA6E6-\uA6EF\uA830-\uA835\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19])/g
	});

	var require$$1$6 = (camelCaseRegexp && typeof camelCaseRegexp === 'object' && 'default' in camelCaseRegexp ? camelCaseRegexp['default'] : camelCaseRegexp);

	var nonWordRegexp = createCommonjsModule(function (module) {
	module.exports = /[^\u0041-\u005A\u0061-\u007A\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC\u0030-\u0039\u00B2\u00B3\u00B9\u00BC-\u00BE\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u09F4-\u09F9\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0B72-\u0B77\u0BE6-\u0BF2\u0C66-\u0C6F\u0C78-\u0C7E\u0CE6-\u0CEF\u0D66-\u0D75\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F33\u1040-\u1049\u1090-\u1099\u1369-\u137C\u16EE-\u16F0\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1946-\u194F\u19D0-\u19DA\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\u2070\u2074-\u2079\u2080-\u2089\u2150-\u2182\u2185-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2CFD\u3007\u3021-\u3029\u3038-\u303A\u3192-\u3195\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\uA620-\uA629\uA6E6-\uA6EF\uA830-\uA835\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19]+/g
	});

	var require$$2$4 = (nonWordRegexp && typeof nonWordRegexp === 'object' && 'default' in nonWordRegexp ? nonWordRegexp['default'] : nonWordRegexp);

	var lowerCase = createCommonjsModule(function (module) {
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
	}

	/**
	 * Lowercase a string.
	 *
	 * @param  {String} str
	 * @return {String}
	 */
	module.exports = function (str, locale) {
	  var lang = LANGUAGES[locale]

	  str = str == null ? '' : String(str)

	  if (lang) {
	    str = str.replace(lang.regexp, function (m) { return lang.map[m] })
	  }

	  return str.toLowerCase()
	}
	});

	var require$$3$4 = (lowerCase && typeof lowerCase === 'object' && 'default' in lowerCase ? lowerCase['default'] : lowerCase);

	var sentenceCase = createCommonjsModule(function (module) {
	var lowerCase = require$$3$4

	var NON_WORD_REGEXP = require$$2$4
	var CAMEL_CASE_REGEXP = require$$1$6
	var TRAILING_DIGIT_REGEXP = require$$0$16

	/**
	 * Sentence case a string.
	 *
	 * @param  {String} str
	 * @param  {String} locale
	 * @param  {String} replacement
	 * @return {String}
	 */
	module.exports = function (str, locale, replacement) {
	  if (str == null) {
	    return ''
	  }

	  replacement = replacement || ' '

	  function replace (match, index, string) {
	    if (index === 0 || index === (string.length - match.length)) {
	      return ''
	    }

	    return replacement
	  }

	  str = String(str)
	    // Support camel case ("camelCase" -> "camel Case").
	    .replace(CAMEL_CASE_REGEXP, '$1 $2')
	    // Support digit groups ("test2012" -> "test 2012").
	    .replace(TRAILING_DIGIT_REGEXP, '$1 $2')
	    // Remove all non-word characters and replace with a single space.
	    .replace(NON_WORD_REGEXP, replace)

	  // Lower case the entire string.
	  return lowerCase(str, locale)
	}
	});

	var require$$0$15 = (sentenceCase && typeof sentenceCase === 'object' && 'default' in sentenceCase ? sentenceCase['default'] : sentenceCase);

	var paramCase = createCommonjsModule(function (module) {
	var sentenceCase = require$$0$15

	/**
	 * Param case a string.
	 *
	 * @param  {String} string
	 * @param  {String} [locale]
	 * @return {String}
	 */
	module.exports = function (string, locale) {
	  return sentenceCase(string, locale, '-')
	}
	});

	var require$$2$3 = (paramCase && typeof paramCase === 'object' && 'default' in paramCase ? paramCase['default'] : paramCase);

	var attributeHook = createCommonjsModule(function (module) {
	'use strict';

	module.exports = AttributeHook;

	function AttributeHook(namespace, value) {
	    if (!(this instanceof AttributeHook)) {
	        return new AttributeHook(namespace, value);
	    }

	    this.namespace = namespace;
	    this.value = value;
	}

	AttributeHook.prototype.hook = function (node, prop, prev) {
	    if (prev && prev.type === 'AttributeHook' &&
	        prev.value === this.value &&
	        prev.namespace === this.namespace) {
	        return;
	    }

	    node.setAttributeNS(this.namespace, prop, this.value);
	};

	AttributeHook.prototype.unhook = function (node, prop, next) {
	    if (next && next.type === 'AttributeHook' &&
	        next.namespace === this.namespace) {
	        return;
	    }

	    var colonPosition = prop.indexOf(':');
	    var localName = colonPosition > -1 ? prop.substr(colonPosition + 1) : prop;
	    node.removeAttributeNS(this.namespace, localName);
	};

	AttributeHook.prototype.type = 'AttributeHook';
	});

	var require$$3$5 = (attributeHook && typeof attributeHook === 'object' && 'default' in attributeHook ? attributeHook['default'] : attributeHook);

	var softSetHook = createCommonjsModule(function (module) {
	'use strict';

	module.exports = SoftSetHook;

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
	});

	var require$$4$3 = (softSetHook && typeof softSetHook === 'object' && 'default' in softSetHook ? softSetHook['default'] : softSetHook);

	var immutable = createCommonjsModule(function (module) {
	module.exports = extend

	var hasOwnProperty = Object.prototype.hasOwnProperty;

	function extend() {
	    var target = {}

	    for (var i = 0; i < arguments.length; i++) {
	        var source = arguments[i]

	        for (var key in source) {
	            if (hasOwnProperty.call(source, key)) {
	                target[key] = source[key]
	            }
	        }
	    }

	    return target
	}
	});

	var require$$9 = (immutable && typeof immutable === 'object' && 'default' in immutable ? immutable['default'] : immutable);

	var index$6 = createCommonjsModule(function (module) {
	var escape = require$$1$5;
	var extend = require$$9;
	var isVNode = require$$8;
	var isVText = require$$7;
	var isThunk = require$$6;
	var isWidget = require$$5;
	var softHook = require$$4$3;
	var attrHook = require$$3$5;
	var paramCase = require$$2$3;
	var createAttribute = require$$1$4;
	var voidElements = require$$0$13;

	module.exports = toHTML;

	function toHTML(node, parent) {
	  if (!node) return '';

	  if (isThunk(node)) {
	    node = node.render();
	  }

	  if (isWidget(node) && node.render) {
	    node = node.render();
	  }

	  if (isVNode(node)) {
	    return openTag(node) + tagContent(node) + closeTag(node);
	  } else if (isVText(node)) {
	    if (parent && (parent.tagName.toLowerCase() === 'script'
	        || parent.tagName.toLowerCase() === 'style'))
	      return String(node.text);
	    return escape(String(node.text));
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
	      value = extend({}, value);
	      for (var attrProp in value) {
	        ret += ' ' + createAttribute(attrProp, value[attrProp], true);
	      }
	      continue;
	    }

	    if (name == 'dataset') {
	      value = extend({}, value);
	      for (var dataProp in value) {
	        ret += ' ' + createAttribute('data-' + paramCase(dataProp), value[dataProp], true);
	      }
	      continue;
	    }

	    if (name == 'style') {
	      var css = '';
	      value = extend({}, value);
	      for (var styleProp in value) {
	        css += paramCase(styleProp) + ': ' + value[styleProp] + '; ';
	      }
	      value = css.trim();
	    }

	    if (value instanceof softHook || value instanceof attrHook) {
	      ret += ' ' + createAttribute(name, value.value, true);
	      continue;
	    }

	    var attr = createAttribute(name, value);
	    if (attr) ret += ' ' + attr;
	  }

	  return ret + '>';
	}

	function tagContent(node) {
	  var innerHTML = node.properties.innerHTML;
	  if (innerHTML != null) return innerHTML;
	  else {
	    var ret = '';
	    if (node.children && node.children.length) {
	      for (var i = 0, l = node.children.length; i<l; i++) {
	        var child = node.children[i];
	        ret += toHTML(child, node);
	      }
	    }
	    return ret;
	  }
	}

	function closeTag(node) {
	  var tag = node.tagName.toLowerCase();
	  return voidElements[tag] ? '' : '</' + tag + '>';
	}
	});

	var toHTML = (index$6 && typeof index$6 === 'object' && 'default' in index$6 ? index$6['default'] : index$6);

	var namespaceMap = createCommonjsModule(function (module) {
	/**
	 * namespace-map.js
	 *
	 * Necessary to map svg attributes back to their namespace
	 */

	'use strict';

	// extracted from https://github.com/Matt-Esch/virtual-dom/blob/master/virtual-hyperscript/svg-attribute-namespace.js
	var DEFAULT_NAMESPACE = null;
	var EV_NAMESPACE = 'http://www.w3.org/2001/xml-events';
	var XLINK_NAMESPACE = 'http://www.w3.org/1999/xlink';
	var XML_NAMESPACE = 'http://www.w3.org/XML/1998/namespace';

	var namespaces = {
		'about': DEFAULT_NAMESPACE
		, 'accent-height': DEFAULT_NAMESPACE
		, 'accumulate': DEFAULT_NAMESPACE
		, 'additive': DEFAULT_NAMESPACE
		, 'alignment-baseline': DEFAULT_NAMESPACE
		, 'alphabetic': DEFAULT_NAMESPACE
		, 'amplitude': DEFAULT_NAMESPACE
		, 'arabic-form': DEFAULT_NAMESPACE
		, 'ascent': DEFAULT_NAMESPACE
		, 'attributeName': DEFAULT_NAMESPACE
		, 'attributeType': DEFAULT_NAMESPACE
		, 'azimuth': DEFAULT_NAMESPACE
		, 'bandwidth': DEFAULT_NAMESPACE
		, 'baseFrequency': DEFAULT_NAMESPACE
		, 'baseProfile': DEFAULT_NAMESPACE
		, 'baseline-shift': DEFAULT_NAMESPACE
		, 'bbox': DEFAULT_NAMESPACE
		, 'begin': DEFAULT_NAMESPACE
		, 'bias': DEFAULT_NAMESPACE
		, 'by': DEFAULT_NAMESPACE
		, 'calcMode': DEFAULT_NAMESPACE
		, 'cap-height': DEFAULT_NAMESPACE
		, 'class': DEFAULT_NAMESPACE
		, 'clip': DEFAULT_NAMESPACE
		, 'clip-path': DEFAULT_NAMESPACE
		, 'clip-rule': DEFAULT_NAMESPACE
		, 'clipPathUnits': DEFAULT_NAMESPACE
		, 'color': DEFAULT_NAMESPACE
		, 'color-interpolation': DEFAULT_NAMESPACE
		, 'color-interpolation-filters': DEFAULT_NAMESPACE
		, 'color-profile': DEFAULT_NAMESPACE
		, 'color-rendering': DEFAULT_NAMESPACE
		, 'content': DEFAULT_NAMESPACE
		, 'contentScriptType': DEFAULT_NAMESPACE
		, 'contentStyleType': DEFAULT_NAMESPACE
		, 'cursor': DEFAULT_NAMESPACE
		, 'cx': DEFAULT_NAMESPACE
		, 'cy': DEFAULT_NAMESPACE
		, 'd': DEFAULT_NAMESPACE
		, 'datatype': DEFAULT_NAMESPACE
		, 'defaultAction': DEFAULT_NAMESPACE
		, 'descent': DEFAULT_NAMESPACE
		, 'diffuseConstant': DEFAULT_NAMESPACE
		, 'direction': DEFAULT_NAMESPACE
		, 'display': DEFAULT_NAMESPACE
		, 'divisor': DEFAULT_NAMESPACE
		, 'dominant-baseline': DEFAULT_NAMESPACE
		, 'dur': DEFAULT_NAMESPACE
		, 'dx': DEFAULT_NAMESPACE
		, 'dy': DEFAULT_NAMESPACE
		, 'edgeMode': DEFAULT_NAMESPACE
		, 'editable': DEFAULT_NAMESPACE
		, 'elevation': DEFAULT_NAMESPACE
		, 'enable-background': DEFAULT_NAMESPACE
		, 'end': DEFAULT_NAMESPACE
		, 'ev:event': EV_NAMESPACE
		, 'event': DEFAULT_NAMESPACE
		, 'exponent': DEFAULT_NAMESPACE
		, 'externalResourcesRequired': DEFAULT_NAMESPACE
		, 'fill': DEFAULT_NAMESPACE
		, 'fill-opacity': DEFAULT_NAMESPACE
		, 'fill-rule': DEFAULT_NAMESPACE
		, 'filter': DEFAULT_NAMESPACE
		, 'filterRes': DEFAULT_NAMESPACE
		, 'filterUnits': DEFAULT_NAMESPACE
		, 'flood-color': DEFAULT_NAMESPACE
		, 'flood-opacity': DEFAULT_NAMESPACE
		, 'focusHighlight': DEFAULT_NAMESPACE
		, 'focusable': DEFAULT_NAMESPACE
		, 'font-family': DEFAULT_NAMESPACE
		, 'font-size': DEFAULT_NAMESPACE
		, 'font-size-adjust': DEFAULT_NAMESPACE
		, 'font-stretch': DEFAULT_NAMESPACE
		, 'font-style': DEFAULT_NAMESPACE
		, 'font-variant': DEFAULT_NAMESPACE
		, 'font-weight': DEFAULT_NAMESPACE
		, 'format': DEFAULT_NAMESPACE
		, 'from': DEFAULT_NAMESPACE
		, 'fx': DEFAULT_NAMESPACE
		, 'fy': DEFAULT_NAMESPACE
		, 'g1': DEFAULT_NAMESPACE
		, 'g2': DEFAULT_NAMESPACE
		, 'glyph-name': DEFAULT_NAMESPACE
		, 'glyph-orientation-horizontal': DEFAULT_NAMESPACE
		, 'glyph-orientation-vertical': DEFAULT_NAMESPACE
		, 'glyphRef': DEFAULT_NAMESPACE
		, 'gradientTransform': DEFAULT_NAMESPACE
		, 'gradientUnits': DEFAULT_NAMESPACE
		, 'handler': DEFAULT_NAMESPACE
		, 'hanging': DEFAULT_NAMESPACE
		, 'height': DEFAULT_NAMESPACE
		, 'horiz-adv-x': DEFAULT_NAMESPACE
		, 'horiz-origin-x': DEFAULT_NAMESPACE
		, 'horiz-origin-y': DEFAULT_NAMESPACE
		, 'id': DEFAULT_NAMESPACE
		, 'ideographic': DEFAULT_NAMESPACE
		, 'image-rendering': DEFAULT_NAMESPACE
		, 'in': DEFAULT_NAMESPACE
		, 'in2': DEFAULT_NAMESPACE
		, 'initialVisibility': DEFAULT_NAMESPACE
		, 'intercept': DEFAULT_NAMESPACE
		, 'k': DEFAULT_NAMESPACE
		, 'k1': DEFAULT_NAMESPACE
		, 'k2': DEFAULT_NAMESPACE
		, 'k3': DEFAULT_NAMESPACE
		, 'k4': DEFAULT_NAMESPACE
		, 'kernelMatrix': DEFAULT_NAMESPACE
		, 'kernelUnitLength': DEFAULT_NAMESPACE
		, 'kerning': DEFAULT_NAMESPACE
		, 'keyPoints': DEFAULT_NAMESPACE
		, 'keySplines': DEFAULT_NAMESPACE
		, 'keyTimes': DEFAULT_NAMESPACE
		, 'lang': DEFAULT_NAMESPACE
		, 'lengthAdjust': DEFAULT_NAMESPACE
		, 'letter-spacing': DEFAULT_NAMESPACE
		, 'lighting-color': DEFAULT_NAMESPACE
		, 'limitingConeAngle': DEFAULT_NAMESPACE
		, 'local': DEFAULT_NAMESPACE
		, 'marker-end': DEFAULT_NAMESPACE
		, 'marker-mid': DEFAULT_NAMESPACE
		, 'marker-start': DEFAULT_NAMESPACE
		, 'markerHeight': DEFAULT_NAMESPACE
		, 'markerUnits': DEFAULT_NAMESPACE
		, 'markerWidth': DEFAULT_NAMESPACE
		, 'mask': DEFAULT_NAMESPACE
		, 'maskContentUnits': DEFAULT_NAMESPACE
		, 'maskUnits': DEFAULT_NAMESPACE
		, 'mathematical': DEFAULT_NAMESPACE
		, 'max': DEFAULT_NAMESPACE
		, 'media': DEFAULT_NAMESPACE
		, 'mediaCharacterEncoding': DEFAULT_NAMESPACE
		, 'mediaContentEncodings': DEFAULT_NAMESPACE
		, 'mediaSize': DEFAULT_NAMESPACE
		, 'mediaTime': DEFAULT_NAMESPACE
		, 'method': DEFAULT_NAMESPACE
		, 'min': DEFAULT_NAMESPACE
		, 'mode': DEFAULT_NAMESPACE
		, 'name': DEFAULT_NAMESPACE
		, 'nav-down': DEFAULT_NAMESPACE
		, 'nav-down-left': DEFAULT_NAMESPACE
		, 'nav-down-right': DEFAULT_NAMESPACE
		, 'nav-left': DEFAULT_NAMESPACE
		, 'nav-next': DEFAULT_NAMESPACE
		, 'nav-prev': DEFAULT_NAMESPACE
		, 'nav-right': DEFAULT_NAMESPACE
		, 'nav-up': DEFAULT_NAMESPACE
		, 'nav-up-left': DEFAULT_NAMESPACE
		, 'nav-up-right': DEFAULT_NAMESPACE
		, 'numOctaves': DEFAULT_NAMESPACE
		, 'observer': DEFAULT_NAMESPACE
		, 'offset': DEFAULT_NAMESPACE
		, 'opacity': DEFAULT_NAMESPACE
		, 'operator': DEFAULT_NAMESPACE
		, 'order': DEFAULT_NAMESPACE
		, 'orient': DEFAULT_NAMESPACE
		, 'orientation': DEFAULT_NAMESPACE
		, 'origin': DEFAULT_NAMESPACE
		, 'overflow': DEFAULT_NAMESPACE
		, 'overlay': DEFAULT_NAMESPACE
		, 'overline-position': DEFAULT_NAMESPACE
		, 'overline-thickness': DEFAULT_NAMESPACE
		, 'panose-1': DEFAULT_NAMESPACE
		, 'path': DEFAULT_NAMESPACE
		, 'pathLength': DEFAULT_NAMESPACE
		, 'patternContentUnits': DEFAULT_NAMESPACE
		, 'patternTransform': DEFAULT_NAMESPACE
		, 'patternUnits': DEFAULT_NAMESPACE
		, 'phase': DEFAULT_NAMESPACE
		, 'playbackOrder': DEFAULT_NAMESPACE
		, 'pointer-events': DEFAULT_NAMESPACE
		, 'points': DEFAULT_NAMESPACE
		, 'pointsAtX': DEFAULT_NAMESPACE
		, 'pointsAtY': DEFAULT_NAMESPACE
		, 'pointsAtZ': DEFAULT_NAMESPACE
		, 'preserveAlpha': DEFAULT_NAMESPACE
		, 'preserveAspectRatio': DEFAULT_NAMESPACE
		, 'primitiveUnits': DEFAULT_NAMESPACE
		, 'propagate': DEFAULT_NAMESPACE
		, 'property': DEFAULT_NAMESPACE
		, 'r': DEFAULT_NAMESPACE
		, 'radius': DEFAULT_NAMESPACE
		, 'refX': DEFAULT_NAMESPACE
		, 'refY': DEFAULT_NAMESPACE
		, 'rel': DEFAULT_NAMESPACE
		, 'rendering-intent': DEFAULT_NAMESPACE
		, 'repeatCount': DEFAULT_NAMESPACE
		, 'repeatDur': DEFAULT_NAMESPACE
		, 'requiredExtensions': DEFAULT_NAMESPACE
		, 'requiredFeatures': DEFAULT_NAMESPACE
		, 'requiredFonts': DEFAULT_NAMESPACE
		, 'requiredFormats': DEFAULT_NAMESPACE
		, 'resource': DEFAULT_NAMESPACE
		, 'restart': DEFAULT_NAMESPACE
		, 'result': DEFAULT_NAMESPACE
		, 'rev': DEFAULT_NAMESPACE
		, 'role': DEFAULT_NAMESPACE
		, 'rotate': DEFAULT_NAMESPACE
		, 'rx': DEFAULT_NAMESPACE
		, 'ry': DEFAULT_NAMESPACE
		, 'scale': DEFAULT_NAMESPACE
		, 'seed': DEFAULT_NAMESPACE
		, 'shape-rendering': DEFAULT_NAMESPACE
		, 'slope': DEFAULT_NAMESPACE
		, 'snapshotTime': DEFAULT_NAMESPACE
		, 'spacing': DEFAULT_NAMESPACE
		, 'specularConstant': DEFAULT_NAMESPACE
		, 'specularExponent': DEFAULT_NAMESPACE
		, 'spreadMethod': DEFAULT_NAMESPACE
		, 'startOffset': DEFAULT_NAMESPACE
		, 'stdDeviation': DEFAULT_NAMESPACE
		, 'stemh': DEFAULT_NAMESPACE
		, 'stemv': DEFAULT_NAMESPACE
		, 'stitchTiles': DEFAULT_NAMESPACE
		, 'stop-color': DEFAULT_NAMESPACE
		, 'stop-opacity': DEFAULT_NAMESPACE
		, 'strikethrough-position': DEFAULT_NAMESPACE
		, 'strikethrough-thickness': DEFAULT_NAMESPACE
		, 'string': DEFAULT_NAMESPACE
		, 'stroke': DEFAULT_NAMESPACE
		, 'stroke-dasharray': DEFAULT_NAMESPACE
		, 'stroke-dashoffset': DEFAULT_NAMESPACE
		, 'stroke-linecap': DEFAULT_NAMESPACE
		, 'stroke-linejoin': DEFAULT_NAMESPACE
		, 'stroke-miterlimit': DEFAULT_NAMESPACE
		, 'stroke-opacity': DEFAULT_NAMESPACE
		, 'stroke-width': DEFAULT_NAMESPACE
		, 'surfaceScale': DEFAULT_NAMESPACE
		, 'syncBehavior': DEFAULT_NAMESPACE
		, 'syncBehaviorDefault': DEFAULT_NAMESPACE
		, 'syncMaster': DEFAULT_NAMESPACE
		, 'syncTolerance': DEFAULT_NAMESPACE
		, 'syncToleranceDefault': DEFAULT_NAMESPACE
		, 'systemLanguage': DEFAULT_NAMESPACE
		, 'tableValues': DEFAULT_NAMESPACE
		, 'target': DEFAULT_NAMESPACE
		, 'targetX': DEFAULT_NAMESPACE
		, 'targetY': DEFAULT_NAMESPACE
		, 'text-anchor': DEFAULT_NAMESPACE
		, 'text-decoration': DEFAULT_NAMESPACE
		, 'text-rendering': DEFAULT_NAMESPACE
		, 'textLength': DEFAULT_NAMESPACE
		, 'timelineBegin': DEFAULT_NAMESPACE
		, 'title': DEFAULT_NAMESPACE
		, 'to': DEFAULT_NAMESPACE
		, 'transform': DEFAULT_NAMESPACE
		, 'transformBehavior': DEFAULT_NAMESPACE
		, 'type': DEFAULT_NAMESPACE
		, 'typeof': DEFAULT_NAMESPACE
		, 'u1': DEFAULT_NAMESPACE
		, 'u2': DEFAULT_NAMESPACE
		, 'underline-position': DEFAULT_NAMESPACE
		, 'underline-thickness': DEFAULT_NAMESPACE
		, 'unicode': DEFAULT_NAMESPACE
		, 'unicode-bidi': DEFAULT_NAMESPACE
		, 'unicode-range': DEFAULT_NAMESPACE
		, 'units-per-em': DEFAULT_NAMESPACE
		, 'v-alphabetic': DEFAULT_NAMESPACE
		, 'v-hanging': DEFAULT_NAMESPACE
		, 'v-ideographic': DEFAULT_NAMESPACE
		, 'v-mathematical': DEFAULT_NAMESPACE
		, 'values': DEFAULT_NAMESPACE
		, 'version': DEFAULT_NAMESPACE
		, 'vert-adv-y': DEFAULT_NAMESPACE
		, 'vert-origin-x': DEFAULT_NAMESPACE
		, 'vert-origin-y': DEFAULT_NAMESPACE
		, 'viewBox': DEFAULT_NAMESPACE
		, 'viewTarget': DEFAULT_NAMESPACE
		, 'visibility': DEFAULT_NAMESPACE
		, 'width': DEFAULT_NAMESPACE
		, 'widths': DEFAULT_NAMESPACE
		, 'word-spacing': DEFAULT_NAMESPACE
		, 'writing-mode': DEFAULT_NAMESPACE
		, 'x': DEFAULT_NAMESPACE
		, 'x-height': DEFAULT_NAMESPACE
		, 'x1': DEFAULT_NAMESPACE
		, 'x2': DEFAULT_NAMESPACE
		, 'xChannelSelector': DEFAULT_NAMESPACE
		, 'xlink:actuate': XLINK_NAMESPACE
		, 'xlink:arcrole': XLINK_NAMESPACE
		, 'xlink:href': XLINK_NAMESPACE
		, 'xlink:role': XLINK_NAMESPACE
		, 'xlink:show': XLINK_NAMESPACE
		, 'xlink:title': XLINK_NAMESPACE
		, 'xlink:type': XLINK_NAMESPACE
		, 'xml:base': XML_NAMESPACE
		, 'xml:id': XML_NAMESPACE
		, 'xml:lang': XML_NAMESPACE
		, 'xml:space': XML_NAMESPACE
		, 'y': DEFAULT_NAMESPACE
		, 'y1': DEFAULT_NAMESPACE
		, 'y2': DEFAULT_NAMESPACE
		, 'yChannelSelector': DEFAULT_NAMESPACE
		, 'z': DEFAULT_NAMESPACE
		, 'zoomAndPan': DEFAULT_NAMESPACE
	};

	module.exports = namespaces;
	});

	var require$$0$17 = (namespaceMap && typeof namespaceMap === 'object' && 'default' in namespaceMap ? namespaceMap['default'] : namespaceMap);

	var propertyMap = createCommonjsModule(function (module) {
	/**
	 * property-map.js
	 *
	 * Necessary to map dom attributes back to vdom properties
	 */

	'use strict';

	// invert of https://www.npmjs.com/package/html-attributes
	var properties = {
		'abbr': 'abbr'
		, 'accept': 'accept'
		, 'accept-charset': 'acceptCharset'
		, 'accesskey': 'accessKey'
		, 'action': 'action'
		, 'allowfullscreen': 'allowFullScreen'
		, 'allowtransparency': 'allowTransparency'
		, 'alt': 'alt'
		, 'async': 'async'
		, 'autocomplete': 'autoComplete'
		, 'autofocus': 'autoFocus'
		, 'autoplay': 'autoPlay'
		, 'cellpadding': 'cellPadding'
		, 'cellspacing': 'cellSpacing'
		, 'challenge': 'challenge'
		, 'charset': 'charset'
		, 'checked': 'checked'
		, 'cite': 'cite'
		, 'class': 'className'
		, 'cols': 'cols'
		, 'colspan': 'colSpan'
		, 'command': 'command'
		, 'content': 'content'
		, 'contenteditable': 'contentEditable'
		, 'contextmenu': 'contextMenu'
		, 'controls': 'controls'
		, 'coords': 'coords'
		, 'crossorigin': 'crossOrigin'
		, 'data': 'data'
		, 'datetime': 'dateTime'
		, 'default': 'default'
		, 'defer': 'defer'
		, 'dir': 'dir'
		, 'disabled': 'disabled'
		, 'download': 'download'
		, 'draggable': 'draggable'
		, 'dropzone': 'dropzone'
		, 'enctype': 'encType'
		, 'for': 'htmlFor'
		, 'form': 'form'
		, 'formaction': 'formAction'
		, 'formenctype': 'formEncType'
		, 'formmethod': 'formMethod'
		, 'formnovalidate': 'formNoValidate'
		, 'formtarget': 'formTarget'
		, 'frameBorder': 'frameBorder'
		, 'headers': 'headers'
		, 'height': 'height'
		, 'hidden': 'hidden'
		, 'high': 'high'
		, 'href': 'href'
		, 'hreflang': 'hrefLang'
		, 'http-equiv': 'httpEquiv'
		, 'icon': 'icon'
		, 'id': 'id'
		, 'inputmode': 'inputMode'
		, 'ismap': 'isMap'
		, 'itemid': 'itemId'
		, 'itemprop': 'itemProp'
		, 'itemref': 'itemRef'
		, 'itemscope': 'itemScope'
		, 'itemtype': 'itemType'
		, 'kind': 'kind'
		, 'label': 'label'
		, 'lang': 'lang'
		, 'list': 'list'
		, 'loop': 'loop'
		, 'manifest': 'manifest'
		, 'max': 'max'
		, 'maxlength': 'maxLength'
		, 'media': 'media'
		, 'mediagroup': 'mediaGroup'
		, 'method': 'method'
		, 'min': 'min'
		, 'minlength': 'minLength'
		, 'multiple': 'multiple'
		, 'muted': 'muted'
		, 'name': 'name'
		, 'novalidate': 'noValidate'
		, 'open': 'open'
		, 'optimum': 'optimum'
		, 'pattern': 'pattern'
		, 'ping': 'ping'
		, 'placeholder': 'placeholder'
		, 'poster': 'poster'
		, 'preload': 'preload'
		, 'radiogroup': 'radioGroup'
		, 'readonly': 'readOnly'
		, 'rel': 'rel'
		, 'required': 'required'
		, 'role': 'role'
		, 'rows': 'rows'
		, 'rowspan': 'rowSpan'
		, 'sandbox': 'sandbox'
		, 'scope': 'scope'
		, 'scoped': 'scoped'
		, 'scrolling': 'scrolling'
		, 'seamless': 'seamless'
		, 'selected': 'selected'
		, 'shape': 'shape'
		, 'size': 'size'
		, 'sizes': 'sizes'
		, 'sortable': 'sortable'
		, 'span': 'span'
		, 'spellcheck': 'spellCheck'
		, 'src': 'src'
		, 'srcdoc': 'srcDoc'
		, 'srcset': 'srcSet'
		, 'start': 'start'
		, 'step': 'step'
		, 'style': 'style'
		, 'tabindex': 'tabIndex'
		, 'target': 'target'
		, 'title': 'title'
		, 'translate': 'translate'
		, 'type': 'type'
		, 'typemustmatch': 'typeMustMatch'
		, 'usemap': 'useMap'
		, 'value': 'value'
		, 'width': 'width'
		, 'wmode': 'wmode'
		, 'wrap': 'wrap'
	};

	module.exports = properties;
	});

	var require$$1$7 = (propertyMap && typeof propertyMap === 'object' && 'default' in propertyMap ? propertyMap['default'] : propertyMap);

	var index$8 = createCommonjsModule(function (module) {
	/**
	 * index.js
	 *
	 * A client-side DOM to vdom parser based on DOMParser API
	 */

	'use strict';

	var VNode = require$$3;
	var VText = require$$2;
	var domParser;

	var propertyMap = require$$1$7;
	var namespaceMap = require$$0$17;

	var HTML_NAMESPACE = 'http://www.w3.org/1999/xhtml';

	module.exports = parser;

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
			if ( !('DOMParser' in window) ) {
				throw new Error('DOMParser is not available, so parsing string to DOM node is not possible.');
			}
			domParser = domParser || new DOMParser();
			var doc = domParser.parseFromString(el, 'text/html');

			// most tags default to body
			if (doc.body.firstChild) {
				el = doc.getElementsByTagName('body')[0].firstChild;

			// some tags, like script and style, default to head
			} else if (doc.head.firstChild && (doc.head.firstChild.tagName !== 'TITLE' || doc.title)) {
				el = doc.head.firstChild;

			// special case for html comment, cdata, doctype
			} else if (doc.firstChild && doc.firstChild.tagName !== 'HTML') {
				el = doc.firstChild;

			// other element, such as whitespace, or html/body/head tag, fallback to empty text node
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
			return createVirtualTextNode(el);

		// cdata or doctype is not currently supported by virtual-dom
		} else if (el.nodeType === 1 || el.nodeType === 9) {
			return createVirtualDomNode(el, attr);
		}

		// default to empty text node
		return new VText('');
	}

	/**
	 * Create vtext from dom node
	 *
	 * @param   Object  el  Text node
	 * @return  Object      VText
	 */
	function createVirtualTextNode(el) {
		return new VText(el.nodeValue);
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

		return new VNode(
			el.tagName
			, createProperties(el)
			, createChildren(el, attr)
			, key
			, ns
		);
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
		};

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
			if(el.attributes[i].name == 'style'){
				attr = createStyleProperty(el);
			}
			else if (ns) {
				attr = createPropertyNS(el.attributes[i]);
			} else {
				attr = createProperty(el.attributes[i]);
			}

			// special case, namespaced attribute, use properties.foobar
			if (attr.ns) {
				properties[attr.name] = {
					namespace: attr.ns
					, value: attr.value
				};

			// special case, use properties.attributes.foobar
			} else if (attr.isAttr) {
				// init attributes object only when necessary
				if (!properties.attributes) {
					properties.attributes = {}
				}
				properties.attributes[attr.name] = attr.value;

			// default case, use properties.foobar
			} else {
				properties[attr.name] = attr.value;
			}
		};

		return properties;
	}

	/**
	 * Create property from dom attribute
	 *
	 * @param   Object  attr  DOM attribute
	 * @return  Object        Normalized attribute
	 */
	function createProperty(attr) {
		var name, value, isAttr;

		// using a map to find the correct case of property name
		if (propertyMap[attr.name]) {
			name = propertyMap[attr.name];
		} else {
			name = attr.name;
		}
		// special cases for data attribute, we default to properties.attributes.data
		if (name.indexOf('data-') === 0 || name.indexOf('aria-') === 0) {
			value = attr.value;
			isAttr = true;
		} else {
			value = attr.value;
		}

		return {
			name: name
			, value: value
			, isAttr: isAttr || false
		};
	}

	/**
	 * Create namespaced property from dom attribute
	 *
	 * @param   Object  attr  DOM attribute
	 * @return  Object        Normalized attribute
	 */
	function createPropertyNS(attr) {
		var name, value;

		return {
			name: attr.name
			, value: attr.value
			, ns: namespaceMap[attr.name] || ''
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
			output[item] = style[item];
			// hack to workaround browser inconsistency with url()
			if (output[item].indexOf('url') > -1) {
				output[item] = output[item].replace(/\"/g, '')
			}
		}
		return { name: 'style', value: output };
	}
	});

	var parser = (index$8 && typeof index$8 === 'object' && 'default' in index$8 ? index$8['default'] : index$8);

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
	};

	function getAttribute(node, attr) {
		return node.properties && node.properties.attributes && node.properties.attributes[attr];
	}

	function isUnTranslated(node) {
	  return !node.properties || !node.properties.attributes || node.properties.attributes.localized !== '';
	}

	function isNotExcluded(node) {
	  var ret = !node.properties || !node.properties.attributes || node.properties.attributes.translated !== '';

	  if (ret && node.tagName && i18next.options.ignoreTags.indexOf(node.tagName) > -1) ret = false;

	  if (ret && i18next.options.ignoreClasses && node.properties && node.properties.className) {
	    var p = node.properties.className.split(' ');
	    p.forEach(function (cls) {
	      if (!ret) return;
	      if (i18next.options.ignoreClasses.indexOf(cls) > -1) ret = false;
	    });
	  }

	  if (ret && i18next.options.ignoreIds) {
	    if (i18next.options.ignoreIds.indexOf(node.properties && node.properties.id) > -1) ret = false;
	  }

	  return ret;
	}

	function translate(str) {
	  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	  var key = str.trim();
	  if (!options.defaultValue) options.defaultValue = str;
	  if (key) return i18next.t(key, options);
	  return str;
	}

	var toTranslate = ['placeholder', 'title', 'alt'];
	var replaceInside = ['src', 'href'];
	var REGEXP = new RegExp('%7B%7B(.+?)%7D%7D', 'g'); // urlEncoded {{}}
	function translateProps(props) {
	  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	  if (!props) return props;

	  toTranslate.forEach(function (attr) {
	    var value = getPath(props, attr);
	    if (value) setPath(props, attr, translate(value, _extends$6({}, options)));
	  });

	  replaceInside.forEach(function (attr) {
	    var value = getPath(props, attr);
	    if (value) value = value.replace(/\{\{/g, '%7B%7B').replace(/\}\}/g, '%7D%7D'); // fix for safari
	    if (value && value.indexOf('%7B') > -1) {
	      var arr = [];

	      value.split(REGEXP).reduce(function (mem, match, index) {
	        if (match.length === 0) return mem;

	        if (!index || index % 2 === 0) {
	          mem.push(match);
	        } else {
	          mem.push(translate(match, _extends$6({}, options)));
	        }
	        return mem;
	      }, arr);
	      if (arr.length) setPath(props, attr, arr.join(''));
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
	  if (optsOnNode && optsOnNode.inlineTags) optsOnNode.inlineTags = optsOnNode.inlineTags.map(function (s) {
	    return s.toUpperCase();
	  });

	  return _extends$6({}, opts || {}, optsOnNode || {});
	}

	function removeIndent(str, substitution) {
	  if (!i18next.options.cleanIndent) return str;
	  // const p = str.split('\n');
	  // if (str.indexOf('\n') === 0 && p.length === 3) return p[1].replace(/^\s+/, '');
	  // if (str.indexOf('\n') === 0 && p.length === 2) return p[1].replace(/^\s+/, '');
	  // if (str.indexOf('\n') > 0 && p.length === 2) return p[0];
	  var ret = str.replace(/\n +/g, substitution);
	  return ret;
	}

	function canInline(node, tOptions) {
	  if (!node.children || !node.children.length) return false;

	  var baseTags = tOptions.inlineTags || i18next.options.inlineTags;
	  var inlineTags = tOptions.additionalInlineTags ? baseTags.concat(tOptions.additionalInlineTags) : baseTags;

	  var inlineable = true;
	  var hadNonTextNode = false;
	  node.children.forEach(function (child) {
	    if (!child.text && inlineTags.indexOf(child.tagName) < 0) inlineable = false;
	    if (child.tagName) hadNonTextNode = true;
	  });

	  return inlineable && hadNonTextNode;
	}

	function walk(node, tOptions, parent) {
	  var nodeIsNotExcluded = isNotExcluded(node);
	  var nodeIsUnTranslated = isUnTranslated(node);
	  tOptions = getTOptions(tOptions, node);

	  // translate node as one block
	  if (parent && (getAttribute(node, 'merge') === '' || canInline(node, tOptions)) && nodeIsNotExcluded && nodeIsUnTranslated) {
	    var translation = translate(removeIndent(toHTML(node), ''), tOptions);
	    var newNode = parser((translation || '').trim());

	    if (newNode.properties && newNode.properties.attributes) newNode.properties.attributes.localized = '';
	    return newNode;
	  }

	  if (node.children) {
	    node.children.forEach(function (child) {
	      if (nodeIsNotExcluded && nodeIsUnTranslated && child.text || !child.text && isNotExcluded(child)) {
	        walk(child, tOptions, node);
	      }
	    });
	  }

	  // ignore comments
	  if (node.text && !node.properties && node.type === 'Widget') return node;

	  if (nodeIsNotExcluded && nodeIsUnTranslated) {
	    if (node.text) {
	      var match = void 0;
	      var txt = node.text;

	      // exclude whitespace replacement eg on PRE, CODE
	      var ignore = i18next.options.ignoreCleanIndentFor.indexOf(parent.tagName) > -1;

	      if (!ignore) {
	        txt = removeIndent(node.text, '\n');
	        if (i18next.options.cleanWhitespace) {
	          var regex = /^\s*(.*[^\s])\s*$/g;
	          match = regex.exec(txt);
	        }
	      }

	      if (!ignore && match && match.length > 1 && i18next.options.cleanWhitespace) {
	        var _translation = translate(match[1], tOptions);
	        node.text = txt.replace(match[1], _translation);
	      } else {
	        node.text = translate(txt, tOptions);
	      }
	    }
	    if (node.properties) node.properties = translateProps(node.properties, tOptions);
	    if (node.properties && node.properties.attributes) node.properties.attributes.localized = '';
	  }

	  return node;
	}

	function localize(node) {
	  var recurseTime = new Instrument();
	  recurseTime.start();

	  var localized = walk(node);

	  i18next.services.logger.log('localization took: ' + recurseTime.end() + 'ms');

	  return localized;
	}

	function createVdom(node) {
	  var virtualizeTime = new Instrument();
	  virtualizeTime.start();

	  var vNode = virtualize(node);

	  i18next.services.logger.log('virtualization took: ' + virtualizeTime.end() + 'ms');
	  return vNode;
	}

	function renderer (root, observer) {
	  var ret = {};
	  ret.render = function render() {
	    var newNode = createVdom(root);
	    var localized = localize(ultraDeepClone(newNode));

	    var patches = diff$1(newNode, localized);
	    if (patches['0']) observer.reset(); // reset observer if having patches
	    root = patch$1(root, patches);
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

	  lngs.forEach(function (lng) {
	    setPath(missings, [lng, namespace, key], res);
	    debouncedLog();
	  });

	  if (i18next.services.backendConnector && i18next.services.backendConnector.saveMissing) {
	    i18next.services.backendConnector.saveMissing(lngs, namespace, key, res);
	  }
	}

	function getDefaults() {
	  return {
	    autorun: true,
	    ele: document.body,
	    ignoreTags: ['SCRIPT'],
	    ignoreIds: [],
	    ignoreClasses: [],
	    inlineTags: [],
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
	var domReady = false;
	var initialized = false;
	docReady(function () {
	  domReady = true;
	  if (!initialized) init();
	});

	// extend i18next with default extensions
	i18next.use(Backend);
	i18next.use(Browser);

	// log out missings
	// i18next.on('missingKey', missingHandler);

	// store last init options - for case init is called before dom ready
	var lastOptions = {};

	function getPathname() {
	  var path = location.pathname;
	  if (path === '/') return 'root';

	  var parts = path.split('/');
	  var ret = 'root';

	  parts.forEach(function (p) {
	    if (p) ret += '_' + p;
	  });

	  return ret;
	}

	function changeNamespace(ns) {
	  if (!ns && lastOptions.namespaceFromPath) ns = getPathname();
	  lastOptions.ns.push(ns);
	  lastOptions.defaultNS = ns;

	  i18next.loadNamespaces(lastOptions.ns, function () {
	    i18next.setDefaultNamespace(ns);
	  });
	}

	function init() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	  options = _extends$6({}, getDefaults(), lastOptions, options);

	  if (options.namespace) {
	    options.ns.push(options.namespace);
	    options.defaultNS = options.namespace;
	  } else if (options.namespaceFromPath) {
	    var ns = getPathname();
	    options.ns.push(ns);
	    options.defaultNS = ns;
	  }

	  if (!options.ns.length) options.ns = ['translation'];

	  // delay init from domReady
	  if (!options.ele) {
	    delete options.ele;
	    lastOptions = options;
	  }

	  if (options.ignoreTags) options.ignoreTags = options.ignoreTags.map(function (s) {
	    return s.toUpperCase();
	  });
	  if (options.ignoreCleanIndentFor) options.ignoreCleanIndentFor = options.ignoreCleanIndentFor.map(function (s) {
	    return s.toUpperCase();
	  });
	  if (options.inlineTags) options.inlineTags = options.inlineTags.map(function (s) {
	    return s.toUpperCase();
	  });

	  initialized = true;
	  var renderers = [];

	  var observer = void 0;

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
	    setTimeout(function () {
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
	    todo = todo - 1;
	    if (!todo) {
	      (function () {
	        if (!options.ele) options.ele = document.body;
	        var children = options.ele.children;

	        observer = new Observer(options.ele);
	        addRenderers(children);

	        observer.on('changed', function (mutations) {
	          renderers.forEach(function (r) {
	            return r.debouncedRender();
	          });
	          addRenderers(children);
	        });

	        waitForInitialRender(children, 0, function () {
	          if (options.ele.style && options.ele.style.display === 'none') options.ele.style.display = 'block';
	        });
	      })();
	    }
	  }

	  i18next.init(options, done);

	  if (!domReady) {
	    docReady(done);
	  }
	  if (options.autorun === false) return { start: done };
	}

	var index = {
	  init: init,
	  i18next: i18next,
	  changeNamespace: changeNamespace
	};

	return index;

}));