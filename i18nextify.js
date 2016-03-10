(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define('i18nextify', factory) :
	(global.i18nextify = factory());
}(this, function () { 'use strict';

	var babelHelpers = {};

	babelHelpers.classCallCheck = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

	babelHelpers.createClass = function () {
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

	babelHelpers.extends = Object.assign || function (target) {
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

	babelHelpers.inherits = function (subClass, superClass) {
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

	babelHelpers.possibleConstructorReturn = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return call && (typeof call === "object" || typeof call === "function") ? call : self;
	};

	babelHelpers;


	var __commonjs_global = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : this;
	function __commonjs(fn, module) { return module = { exports: {} }, fn(module, module.exports, __commonjs_global), module.exports; }

	var _extends$1 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass$1 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

	  _createClass$1(Logger, [{
	    key: 'init',
	    value: function init(concreteLogger) {
	      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	      this.prefix = options.prefix || 'i18next:';
	      this.logger = concreteLogger || consoleLogger;
	      this.options = options;
	      this.debug = options.debug === false ? false : true;
	    }
	  }, {
	    key: 'setDebug',
	    value: function setDebug(bool) {
	      this.debug = bool;
	      this.subs.forEach(function (sub) {
	        sub.setDebug(bool);
	      });
	    }
	  }, {
	    key: 'log',
	    value: function log() {
	      this.forward(arguments, 'log', '', true);
	    }
	  }, {
	    key: 'warn',
	    value: function warn() {
	      this.forward(arguments, 'warn', '', true);
	    }
	  }, {
	    key: 'error',
	    value: function error() {
	      this.forward(arguments, 'error', '');
	    }
	  }, {
	    key: 'deprecate',
	    value: function deprecate() {
	      this.forward(arguments, 'warn', 'WARNING DEPRECATED: ', true);
	    }
	  }, {
	    key: 'forward',
	    value: function forward(args, lvl, prefix, debugOnly) {
	      if (debugOnly && !this.debug) return;
	      if (typeof args[0] === 'string') args[0] = prefix + this.prefix + ' ' + args[0];
	      this.logger[lvl](args);
	    }
	  }, {
	    key: 'create',
	    value: function create(moduleName) {
	      var sub = new Logger(this.logger, _extends$1({ prefix: this.prefix + ':' + moduleName + ':' }, this.options));
	      this.subs.push(sub);

	      return sub;
	    }

	    // createInstance(options = {}) {
	    //   return new Logger(options, callback);
	    // }

	  }]);

	  return Logger;
	}();

	;

	var baseLogger = new Logger();

	var _createClass$2 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck$2(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var EventEmitter = function () {
		function EventEmitter() {
			_classCallCheck$2(this, EventEmitter);

			this.observers = {};
		}

		_createClass$2(EventEmitter, [{
			key: 'on',
			value: function on(events, listener) {
				var _this = this;

				events.split(' ').forEach(function (event) {
					_this.observers[event] = _this.observers[event] || [];
					_this.observers[event].push(listener);
				});
			}
		}, {
			key: 'off',
			value: function off(event, listener) {
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
			}
		}, {
			key: 'emit',
			value: function emit(event) {
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
			}
		}]);

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

	var _createClass$3 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck$3(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn$1(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits$1(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ResourceStore = function (_EventEmitter) {
	  _inherits$1(ResourceStore, _EventEmitter);

	  function ResourceStore() {
	    var data = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var options = arguments.length <= 1 || arguments[1] === undefined ? { ns: ['translation'], defaultNS: 'translation' } : arguments[1];

	    _classCallCheck$3(this, ResourceStore);

	    var _this = _possibleConstructorReturn$1(this, Object.getPrototypeOf(ResourceStore).call(this));

	    _this.data = data;
	    _this.options = options;
	    return _this;
	  }

	  _createClass$3(ResourceStore, [{
	    key: 'addNamespaces',
	    value: function addNamespaces(ns) {
	      if (this.options.ns.indexOf(ns) < 0) {
	        this.options.ns.push(ns);
	      }
	    }
	  }, {
	    key: 'removeNamespaces',
	    value: function removeNamespaces(ns) {
	      var index = this.options.ns.indexOf(ns);
	      if (index > -1) {
	        this.options.ns.splice(index, 1);
	      }
	    }
	  }, {
	    key: 'getResource',
	    value: function getResource(lng, ns, key) {
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
	    }
	  }, {
	    key: 'addResource',
	    value: function addResource(lng, ns, key, value) {
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
	    }
	  }, {
	    key: 'addResources',
	    value: function addResources(lng, ns, resources) {
	      for (var m in resources) {
	        if (typeof resources[m] === 'string') this.addResource(lng, ns, m, resources[m], { silent: true });
	      }
	      this.emit('added', lng, ns, resources);
	    }
	  }, {
	    key: 'addResourceBundle',
	    value: function addResourceBundle(lng, ns, resources, deep, overwrite) {
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
	    }
	  }, {
	    key: 'removeResourceBundle',
	    value: function removeResourceBundle(lng, ns) {
	      if (this.hasResourceBundle(lng, ns)) {
	        delete this.data[lng][ns];
	      }
	      this.removeNamespaces(ns);

	      this.emit('removed', lng, ns);
	    }
	  }, {
	    key: 'hasResourceBundle',
	    value: function hasResourceBundle(lng, ns) {
	      return this.getResource(lng, ns) !== undefined;
	    }
	  }, {
	    key: 'getResourceBundle',
	    value: function getResourceBundle(lng, ns) {
	      if (!ns) ns = this.options.defaultNS;

	      // TODO: COMPATIBILITY remove extend in v2.1.0
	      if (this.options.compatibilityAPI === 'v1') return _extends$2({}, this.getResource(lng, ns));

	      return this.getResource(lng, ns);
	    }
	  }, {
	    key: 'toJSON',
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

	var _createClass$4 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck$4(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn$2(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits$2(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Translator = function (_EventEmitter) {
	  _inherits$2(Translator, _EventEmitter);

	  function Translator(services) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    _classCallCheck$4(this, Translator);

	    var _this = _possibleConstructorReturn$2(this, Object.getPrototypeOf(Translator).call(this));

	    copy(['resourceStore', 'languageUtils', 'pluralResolver', 'interpolator', 'backendConnector'], services, _this);

	    _this.options = options;
	    _this.logger = baseLogger.create('translator');
	    return _this;
	  }

	  _createClass$4(Translator, [{
	    key: 'changeLanguage',
	    value: function changeLanguage(lng) {
	      if (lng) this.language = lng;
	    }
	  }, {
	    key: 'exists',
	    value: function exists(key) {
	      var options = arguments.length <= 1 || arguments[1] === undefined ? { interpolation: {} } : arguments[1];

	      if (this.options.compatibilityAPI === 'v1') {
	        options = convertTOptions(options);
	      }

	      return this.resolve(key, options) !== undefined;
	    }
	  }, {
	    key: 'extractFromKey',
	    value: function extractFromKey(key, options) {
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
	    }
	  }, {
	    key: 'translate',
	    value: function translate(keys) {
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
	            if (!this.isValidLookup(res) && options.defaultValue) {
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

	              if (this.options.saveMissing) {
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

	                if (this.options.missingKeyHandler) {
	                  this.options.missingKeyHandler(lngs, namespace, key, res);
	                } else if (this.backendConnector && this.backendConnector.saveMissing) {
	                  this.backendConnector.saveMissing(lngs, namespace, key, res);
	                }

	                this.emit('missingKey', lngs, namespace, key, res);
	              }
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
	    }
	  }, {
	    key: 'extendTranslation',
	    value: function extendTranslation(res, key, options) {
	      var _this2 = this;

	      if (options.interpolation) this.interpolator.init(options);

	      // interpolate
	      var data = options.replace && typeof options.replace !== 'string' ? options.replace : options;
	      if (this.options.interpolation.defaultVariables) data = _extends$3({}, this.options.interpolation.defaultVariables, data);
	      res = this.interpolator.interpolate(res, data);

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
	    }
	  }, {
	    key: 'resolve',
	    value: function resolve(keys) {
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
	    }
	  }, {
	    key: 'isValidLookup',
	    value: function isValidLookup(res) {
	      return res !== undefined && !(!this.options.returnNull && res === null) && !(!this.options.returnEmptyString && res === '');
	    }
	  }, {
	    key: 'getResource',
	    value: function getResource(code, ns, key) {
	      var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

	      return this.resourceStore.getResource(code, ns, key, options);
	    }
	  }]);

	  return Translator;
	}(EventEmitter);

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _createClass$5 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck$5(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var LanguageUtil = function () {
	  function LanguageUtil(options) {
	    _classCallCheck$5(this, LanguageUtil);

	    this.options = options;

	    this.whitelist = this.options.whitelist || false;
	    this.logger = baseLogger.create('languageUtils');
	  }

	  _createClass$5(LanguageUtil, [{
	    key: 'getLanguagePartFromCode',
	    value: function getLanguagePartFromCode(code) {
	      if (code.indexOf('-') < 0) return code;

	      var specialCases = ['nb-NO', 'nn-NO', 'nb-no', 'nn-no'];
	      var p = code.split('-');
	      return this.formatLanguageCode(specialCases.indexOf(code) > -1 ? p[1].toLowerCase() : p[0]);
	    }
	  }, {
	    key: 'formatLanguageCode',
	    value: function formatLanguageCode(code) {
	      if (typeof code === 'string' && code.indexOf('-') > -1) {
	        var _code$split = code.split('-');

	        var _code$split2 = _slicedToArray(_code$split, 2);

	        var head = _code$split2[0];
	        var tail = _code$split2[1];

	        return this.options.lowerCaseLng ? head.toLowerCase() + '-' + tail.toLowerCase() : head.toLowerCase() + '-' + tail.toUpperCase();
	      } else {
	        return this.options.cleanCode || this.options.lowerCaseLng ? code.toLowerCase() : code;
	      }
	    }
	  }, {
	    key: 'isWhitelisted',
	    value: function isWhitelisted(code) {
	      if (this.options.load === 'languageOnly') code = this.getLanguagePartFromCode(code);
	      return !this.whitelist || !this.whitelist.length || this.whitelist.indexOf(code) > -1 ? true : false;
	    }
	  }, {
	    key: 'toResolveHierarchy',
	    value: function toResolveHierarchy(code, fallbackCode) {
	      var _this = this;

	      fallbackCode = fallbackCode || this.options.fallbackLng || [];
	      if (typeof fallbackCode === 'string') fallbackCode = [fallbackCode];

	      var codes = [];
	      var addCode = function addCode(code) {
	        if (_this.isWhitelisted(code)) {
	          codes.push(code);
	        } else {
	          _this.logger.warn('rejecting non-whitelisted language code: ' + code);
	        }
	      };

	      if (typeof code === 'string' && code.indexOf('-') > -1) {
	        if (this.options.load !== 'languageOnly') addCode(this.formatLanguageCode(code));
	        if (this.options.load !== 'currentOnly') addCode(this.getLanguagePartFromCode(code));
	      } else if (typeof code === 'string') {
	        addCode(this.formatLanguageCode(code));
	      }

	      fallbackCode.forEach(function (fc) {
	        if (codes.indexOf(fc) < 0) addCode(_this.formatLanguageCode(fc));
	      });

	      return codes;
	    }
	  }]);

	  return LanguageUtil;
	}();

	;

	var _createClass$6 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

	var PluralResolver = function () {
	  function PluralResolver(languageUtils) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    _classCallCheck$6(this, PluralResolver);

	    this.rules = function () {
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
	    }();

	    this.languageUtils = languageUtils;
	    this.options = options;

	    this.logger = baseLogger.create('pluralResolver');
	  }

	  _createClass$6(PluralResolver, [{
	    key: 'addRule',
	    value: function addRule(lng, obj) {
	      this.rules[lng] = obj;
	    }
	  }, {
	    key: 'getRule',
	    value: function getRule(code) {
	      return this.rules[this.languageUtils.getLanguagePartFromCode(code)];
	    }
	  }, {
	    key: 'needsPlural',
	    value: function needsPlural(code) {
	      var rule = this.getRule(code);

	      return rule && rule.numbers.length <= 1 ? false : true;
	    }
	  }, {
	    key: 'getSuffix',
	    value: function getSuffix(code, count) {
	      var rule = this.getRule(code);

	      if (rule) {
	        if (rule.numbers.length === 1) return ''; // only singular

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

	        // COMPATIBILITY JSON
	        if (this.options.compatibilityJSON === 'v1') {
	          if (suffix === 1) return '';
	          if (typeof suffix === 'number') return '_plural_' + suffix.toString();
	        }

	        return this.options.prepend && suffix.toString() ? this.options.prepend + suffix.toString() : suffix.toString();
	      } else {
	        this.logger.warn('no plural rule found for: ' + code);
	        return '';
	      }
	    }
	  }]);

	  return PluralResolver;
	}();

	;

	var _createClass$7 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck$7(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Interpolator = function () {
	  function Interpolator() {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    _classCallCheck$7(this, Interpolator);

	    this.logger = baseLogger.create('interpolator');

	    this.init(options, true);
	  }

	  _createClass$7(Interpolator, [{
	    key: 'init',
	    value: function init() {
	      var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	      var reset = arguments[1];

	      if (reset) this.options = options;
	      if (!options.interpolation) options.interpolation = { escapeValue: true };

	      var iOpts = options.interpolation;

	      this.escapeValue = iOpts.escapeValue;

	      this.prefix = iOpts.prefix ? regexEscape(iOpts.prefix) : iOpts.prefixEscaped || '{{';
	      this.suffix = iOpts.suffix ? regexEscape(iOpts.suffix) : iOpts.suffixEscaped || '}}';

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
	    }
	  }, {
	    key: 'reset',
	    value: function reset() {
	      if (this.options) this.init(this.options);
	    }
	  }, {
	    key: 'interpolate',
	    value: function interpolate(str, data) {
	      var match = void 0,
	          value = void 0;

	      function regexSafe(val) {
	        return val.replace(/\$/g, '$$$$');
	      }

	      // unescape if has unescapePrefix/Suffix
	      while (match = this.regexpUnescape.exec(str)) {
	        var _value = getPath(data, match[1].trim());
	        str = str.replace(match[0], _value);
	      }

	      // regular escape on demand
	      while (match = this.regexp.exec(str)) {
	        value = getPath(data, match[1].trim());
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
	    }
	  }, {
	    key: 'nest',
	    value: function nest(str, fc) {
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
	    }
	  }]);

	  return Interpolator;
	}();

	var _extends$4 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _slicedToArray$1 = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _createClass$8 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck$8(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn$3(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits$3(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

	    var _this = _possibleConstructorReturn$3(this, Object.getPrototypeOf(Connector).call(this));

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

	  _createClass$8(Connector, [{
	    key: 'queueLoad',
	    value: function queueLoad(languages, namespaces, callback) {
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
	    }
	  }, {
	    key: 'loaded',
	    value: function loaded(name, err, data) {
	      var _this3 = this;

	      var _name$split = name.split('|');

	      var _name$split2 = _slicedToArray$1(_name$split, 2);

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
	    }
	  }, {
	    key: 'read',
	    value: function read(lng, ns, fcName, tried, wait, callback) {
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
	    }
	  }, {
	    key: 'load',
	    value: function load(languages, namespaces, callback) {
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

	            var _name$split4 = _slicedToArray$1(_name$split3, 2);

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
	            var read = function read(name) {
	              var _this6 = this;

	              var _name$split5 = name.split('|');

	              var _name$split6 = _slicedToArray$1(_name$split5, 2);

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
	              read.call(_this5, name);
	            });
	          })();
	        }
	    }
	  }, {
	    key: 'saveMissing',
	    value: function saveMissing(languages, namespace, key, fallbackValue) {
	      if (this.backend && this.backend.create) this.backend.create(languages, namespace, key, fallbackValue);

	      // write to store to avoid resending
	      this.store.addResource(languages[0], namespace, key, fallbackValue);
	    }
	  }]);

	  return Connector;
	}(EventEmitter);

	var _extends$5 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass$9 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck$9(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn$4(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits$4(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Connector$1 = function (_EventEmitter) {
	  _inherits$4(Connector, _EventEmitter);

	  function Connector(cache, store, services) {
	    var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

	    _classCallCheck$9(this, Connector);

	    var _this = _possibleConstructorReturn$4(this, Object.getPrototypeOf(Connector).call(this));

	    _this.cache = cache;
	    _this.store = store;
	    _this.services = services;
	    _this.options = options;
	    _this.logger = baseLogger.create('cacheConnector');

	    _this.cache && _this.cache.init && _this.cache.init(services, options.cache, options);
	    return _this;
	  }

	  _createClass$9(Connector, [{
	    key: 'load',
	    value: function load(languages, namespaces, callback) {
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
	    }
	  }, {
	    key: 'save',
	    value: function save() {
	      if (this.cache && this.options.cache && this.options.cache.enabled) this.cache.save(this.store.data);
	    }
	  }]);

	  return Connector;
	}(EventEmitter);

	function get() {
	  return {
	    debug: false,

	    ns: ['translation'],
	    defaultNS: ['translation'],
	    fallbackLng: ['dev'],
	    fallbackNS: false, // string or array of namespaces

	    whitelist: false, // array with whitelisted languages
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
	      prefix: '{{',
	      suffix: '}}',
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

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var I18n = function (_EventEmitter) {
	  _inherits(I18n, _EventEmitter);

	  function I18n() {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var callback = arguments[1];

	    _classCallCheck(this, I18n);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(I18n).call(this));

	    _this.options = transformOptions(options);
	    _this.services = {};
	    _this.logger = baseLogger;
	    _this.modules = {};

	    if (callback && !_this.isInitialized) _this.init(options, callback);
	    return _this;
	  }

	  _createClass(I18n, [{
	    key: 'init',
	    value: function init(options, callback) {
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

	      this.changeLanguage(this.options.lng, function (err, t) {
	        _this2.emit('initialized', _this2.options);
	        _this2.logger.log('initialized', _this2.options);

	        callback(err, t);
	      });

	      return this;
	    }
	  }, {
	    key: 'loadResources',
	    value: function loadResources(callback) {
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
	    }
	  }, {
	    key: 'use',
	    value: function use(module) {
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
	    }
	  }, {
	    key: 'changeLanguage',
	    value: function changeLanguage(lng, callback) {
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
	    }
	  }, {
	    key: 'getFixedT',
	    value: function getFixedT(lng, ns) {
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
	    }
	  }, {
	    key: 't',
	    value: function t() {
	      return this.translator && this.translator.translate.apply(this.translator, arguments);
	    }
	  }, {
	    key: 'exists',
	    value: function exists() {
	      return this.translator && this.translator.exists.apply(this.translator, arguments);
	    }
	  }, {
	    key: 'setDefaultNamespace',
	    value: function setDefaultNamespace(ns) {
	      this.options.defaultNS = ns;
	    }
	  }, {
	    key: 'loadNamespaces',
	    value: function loadNamespaces(ns, callback) {
	      var _this6 = this;

	      if (!this.options.ns) return callback && callback();
	      if (typeof ns === 'string') ns = [ns];

	      ns.forEach(function (n) {
	        if (_this6.options.ns.indexOf(n) < 0) _this6.options.ns.push(n);
	      });

	      this.loadResources(callback);
	    }
	  }, {
	    key: 'loadLanguages',
	    value: function loadLanguages(lngs, callback) {
	      if (typeof lngs === 'string') lngs = [lngs];
	      this.options.preload = this.options.preload ? this.options.preload.concat(lngs) : lngs;

	      this.loadResources(callback);
	    }
	  }, {
	    key: 'dir',
	    value: function dir(lng) {
	      if (!lng) lng = this.language;

	      var ltrLngs = ['ar', 'shu', 'sqr', 'ssh', 'xaa', 'yhd', 'yud', 'aao', 'abh', 'abv', 'acm', 'acq', 'acw', 'acx', 'acy', 'adf', 'ads', 'aeb', 'aec', 'afb', 'ajp', 'apc', 'apd', 'arb', 'arq', 'ars', 'ary', 'arz', 'auz', 'avl', 'ayh', 'ayl', 'ayn', 'ayp', 'bbz', 'pga', 'he', 'iw', 'ps', 'pbt', 'pbu', 'pst', 'prp', 'prd', 'ur', 'ydd', 'yds', 'yih', 'ji', 'yi', 'hbo', 'men', 'xmn', 'fa', 'jpr', 'peo', 'pes', 'prs', 'dv', 'sam'];

	      return ltrLngs.indexOf(this.services.languageUtils.getLanguagePartFromCode(lng)) ? 'ltr' : 'rtl';
	    }
	  }, {
	    key: 'createInstance',
	    value: function createInstance() {
	      var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	      var callback = arguments[1];

	      return new I18n(options, callback);
	    }
	  }, {
	    key: 'cloneInstance',
	    value: function cloneInstance() {
	      var _this7 = this;

	      var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	      var callback = arguments[1];

	      var clone = new I18n(_extends({}, options, this.options, { isClone: true }), callback);
	      var membersToCopy = ['store', 'translator', 'services', 'language'];
	      membersToCopy.forEach(function (m) {
	        clone[m] = _this7[m];
	      });

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

	var _createClass$10 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _typeof$2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	function _classCallCheck$10(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// https://gist.github.com/Xeoncross/7663273
	function ajax(url, options, callback, data, cache) {
	  // Must encode data
	  if (data && (typeof data === 'undefined' ? 'undefined' : _typeof$2(data)) === 'object') {
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
	    x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
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

	  _createClass$10(Backend, [{
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
	        var statusCode = xhr.status.toString();
	        if (statusCode.indexOf('5') === 0) return callback('failed loading ' + url, true /* retry */);
	        if (statusCode.indexOf('4') === 0) return callback('failed loading ' + url, false /* no retry */);

	        var ret = void 0,
	            err = void 0;
	        try {
	          ret = _this.options.parse(data);
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

	var _createClass$11 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck$11(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function getDefaults$2() {
	  return {
	    order: ['querystring', 'cookie', 'localStorage', 'navigator'],
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

	  _createClass$11(Browser, [{
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

	var Observer = function (_EventEmitter) {
	  babelHelpers.inherits(Observer, _EventEmitter);

	  function Observer(ele) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	    babelHelpers.classCallCheck(this, Observer);

	    var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Observer).call(this));

	    _this.ele = ele;
	    _this.options = options;
	    _this.observer = _this.create();
	    _this.internalChange = true;
	    return _this;
	  }

	  babelHelpers.createClass(Observer, [{
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

	var vcomment = __commonjs(function (module) {
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

	var version = __commonjs(function (module) {
	module.exports = "2"
	});

	var require$$0$1 = (version && typeof version === 'object' && 'default' in version ? version['default'] : version);

	var vtext = __commonjs(function (module) {
	var version = require$$0$1

	module.exports = VirtualText

	function VirtualText(text) {
	    this.text = String(text)
	}

	VirtualText.prototype.version = version
	VirtualText.prototype.type = "VirtualText"
	});

	var require$$1 = (vtext && typeof vtext === 'object' && 'default' in vtext ? vtext['default'] : vtext);

	var isVhook = __commonjs(function (module) {
	module.exports = isHook

	function isHook(hook) {
	    return hook &&
	      (typeof hook.hook === "function" && !hook.hasOwnProperty("hook") ||
	       typeof hook.unhook === "function" && !hook.hasOwnProperty("unhook"))
	}
	});

	var require$$0$2 = (isVhook && typeof isVhook === 'object' && 'default' in isVhook ? isVhook['default'] : isVhook);

	var isThunk = __commonjs(function (module) {
	module.exports = isThunk

	function isThunk(t) {
	    return t && t.type === "Thunk"
	}
	});

	var require$$0$3 = (isThunk && typeof isThunk === 'object' && 'default' in isThunk ? isThunk['default'] : isThunk);

	var isWidget = __commonjs(function (module) {
	module.exports = isWidget

	function isWidget(w) {
	    return w && w.type === "Widget"
	}
	});

	var require$$1$1 = (isWidget && typeof isWidget === 'object' && 'default' in isWidget ? isWidget['default'] : isWidget);

	var isVnode = __commonjs(function (module) {
	var version = require$$0$1

	module.exports = isVirtualNode

	function isVirtualNode(x) {
	    return x && x.type === "VirtualNode" && x.version === version
	}
	});

	var require$$3 = (isVnode && typeof isVnode === 'object' && 'default' in isVnode ? isVnode['default'] : isVnode);

	var vnode = __commonjs(function (module) {
	var version = require$$0$1
	var isVNode = require$$3
	var isWidget = require$$1$1
	var isThunk = require$$0$3
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

	var require$$2 = (vnode && typeof vnode === 'object' && 'default' in vnode ? vnode['default'] : vnode);

	var index$1 = __commonjs(function (module) {
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
	var VNode = require$$2
	  , VText = require$$1
	  , VComment = require$$0

	module.exports = createVNode

	function createVNode(domNode, key) {
	  key = key || null // XXX: Leave out `key` for now... merely used for (re-)ordering

	  if(domNode.nodeType == 1) return createFromElement(domNode, key)
	  if(domNode.nodeType == 3) return createFromTextNode(domNode, key)
	  if(domNode.nodeType == 8) return createFromCommentNode(domNode, key)
	  return
	}

	createVNode.fromHTML = function(html, key) {
	  var rootNode = null;

	  try {
	    // Everything except iOS 7 Safari, IE 8/9, Andriod Browser 4.1/4.3
	    var parser = new DOMParser();
	    var doc = parser.parseFromString(html, 'text/html');
	    rootNode = doc.documentElement;
	  } catch(e) {
	    // Old browsers
	    var ifr = document.createElement('iframe');
	    ifr.setAttribute('data-content', html);
	    ifr.src = 'javascript: window.frameElement.getAttribute("data-content");';
	    document.head.appendChild(ifr);
	    rootNode = ifr.contentDocument.documentElement;
	    setTimeout(function() {
	      ifr.remove(); // Garbage collection
	    }, 0);
	  }

	  return createVNode(rootNode, key);
	};

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

	  props.forEach(function(propName) {
	    if(!el[propName]) return

	    // Special case: style
	    // .style is a DOMStyleDeclaration, thus we need to iterate over all
	    // rules to create a hash of applied css properties.
	    //
	    // You can directly set a specific .style[prop] = value so patching with vdom
	    // is possible.
	    if("style" == propName) {
	      var css = {}
	        , styleProp
	      if (el.style.length) {
	        for(var i=0; i<el.style.length; i++) {
	          styleProp = el.style[i]
	          css[styleProp] = el.style.getPropertyValue(styleProp) // XXX: add support for "!important" via getPropertyPriority()!
	        }
	      } else { // IE8
	        for (var styleProp in el.style) {
	          if (el.style[styleProp] && el.style.hasOwnProperty(styleProp)) {
	            css[styleProp] = el.style[styleProp];
	          }
	        }
	      }

	      obj[propName] = css
	      return
	    }

	    // https://msdn.microsoft.com/en-us/library/cc848861%28v=vs.85%29.aspx
	    // The img element does not support the HREF content attribute.
	    // In addition, the href property is read-only for the img Document Object Model (DOM) object
	    if (el.tagName.toLowerCase() === 'img' && propName === 'href') {
	      return;
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
	      var hash = atts.reduce(function(o,a){
	        var name = a.name;
	        if(obj[name]) return o;
	        o[name] = el.getAttribute(a.name);
	        return o;
	      },{});
	      return obj[propName] = hash;
	    }
	    if("tabIndex" == propName && el.tabIndex === -1) return

	    // Special case: contentEditable
	    // browser use 'inherit' by default on all nodes, but does not allow setting it to ''
	    // diffing virtualize dom will trigger error
	    // ref: https://github.com/Matt-Esch/virtual-dom/issues/176
	    if("contentEditable" == propName && el[propName] === 'inherit') return

	    if('object' === typeof el[propName]) return

	    // default: just copy the property
	    obj[propName] = el[propName]
	    return
	  })

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

	var attrs =
	module.exports.attrs = [
	 "allowFullScreen"
	,"allowTransparency"
	,"charSet"
	,"cols"
	,"contextMenu"
	,"dateTime"
	,"disabled"
	,"form"
	,"frameBorder"
	,"height"
	,"hidden"
	,"maxLength"
	,"role"
	,"rows"
	,"seamless"
	,"size"
	,"width"
	,"wmode"

	// SVG Properties
	,"cx"
	,"cy"
	,"d"
	,"dx"
	,"dy"
	,"fill"
	,"fx"
	,"fy"
	,"gradientTransform"
	,"gradientUnits"
	,"offset"
	,"points"
	,"r"
	,"rx"
	,"ry"
	,"spreadMethod"
	,"stopColor"
	,"stopOpacity"
	,"stroke"
	,"strokeLinecap"
	,"strokeWidth"
	,"textAnchor"
	,"transform"
	,"version"
	,"viewBox"
	,"x1"
	,"x2"
	,"x"
	,"y1"
	,"y2"
	,"y"
	]
	});

	var virtualize = (index$1 && typeof index$1 === 'object' && 'default' in index$1 ? index$1['default'] : index$1);

	var index$2 = __commonjs(function (module) {
	"use strict";

	module.exports = function isObject(x) {
		return typeof x === "object" && x !== null;
	};
	});

	var require$$1$2 = (index$2 && typeof index$2 === 'object' && 'default' in index$2 ? index$2['default'] : index$2);

	var diffProps = __commonjs(function (module) {
	var isObject = require$$1$2
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

	var require$$0$5 = (diffProps && typeof diffProps === 'object' && 'default' in diffProps ? diffProps['default'] : diffProps);

	var isVtext = __commonjs(function (module) {
	var version = require$$0$1

	module.exports = isVirtualText

	function isVirtualText(x) {
	    return x && x.type === "VirtualText" && x.version === version
	}
	});

	var require$$2$1 = (isVtext && typeof isVtext === 'object' && 'default' in isVtext ? isVtext['default'] : isVtext);

	var handleThunk = __commonjs(function (module) {
	var isVNode = require$$3
	var isVText = require$$2$1
	var isWidget = require$$1$1
	var isThunk = require$$0$3

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

	var require$$0$6 = (handleThunk && typeof handleThunk === 'object' && 'default' in handleThunk ? handleThunk['default'] : handleThunk);

	var vpatch = __commonjs(function (module) {
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

	var require$$1$3 = (vpatch && typeof vpatch === 'object' && 'default' in vpatch ? vpatch['default'] : vpatch);

	var index$3 = __commonjs(function (module) {
	var nativeIsArray = Array.isArray
	var toString = Object.prototype.toString

	module.exports = nativeIsArray || isArray

	function isArray(obj) {
	    return toString.call(obj) === "[object Array]"
	}
	});

	var require$$3$1 = (index$3 && typeof index$3 === 'object' && 'default' in index$3 ? index$3['default'] : index$3);

	var diff$2 = __commonjs(function (module) {
	var isArray = require$$3$1

	var VPatch = require$$1$3
	var isVNode = require$$3
	var isVText = require$$2$1
	var isWidget = require$$1$1
	var isThunk = require$$0$3
	var handleThunk = require$$0$6

	var diffProps = require$$0$5

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

	var require$$0$4 = (diff$2 && typeof diff$2 === 'object' && 'default' in diff$2 ? diff$2['default'] : diff$2);

	var diff = __commonjs(function (module) {
	var diff = require$$0$4

	module.exports = diff
	});

	var diff$1 = (diff && typeof diff === 'object' && 'default' in diff ? diff['default'] : diff);

	var updateWidget = __commonjs(function (module) {
	var isWidget = require$$1$1

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

	var require$$0$9 = (updateWidget && typeof updateWidget === 'object' && 'default' in updateWidget ? updateWidget['default'] : updateWidget);

	var applyProperties = __commonjs(function (module) {
	var isObject = require$$1$2
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

	var patchOp = __commonjs(function (module) {
	var applyProperties = require$$4

	var isWidget = require$$1$1
	var VPatch = require$$1$3

	var updateWidget = require$$0$9

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

	var require$$0$8 = (patchOp && typeof patchOp === 'object' && 'default' in patchOp ? patchOp['default'] : patchOp);

	var domIndex = __commonjs(function (module) {
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

	var require$$1$4 = (domIndex && typeof domIndex === 'object' && 'default' in domIndex ? domIndex['default'] : domIndex);

	var removeEventListener = __commonjs(function (module) {
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

	var require$$1$5 = (removeEventListener && typeof removeEventListener === 'object' && 'default' in removeEventListener ? removeEventListener['default'] : removeEventListener);

	var addEventListener = __commonjs(function (module) {
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

	var require$$2$3 = (addEventListener && typeof addEventListener === 'object' && 'default' in addEventListener ? addEventListener['default'] : addEventListener);

	var dispatchEvent = __commonjs(function (module) {
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

	var event = __commonjs(function (module) {
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

	var serialize = __commonjs(function (module) {
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

	var require$$0$13 = (serialize && typeof serialize === 'object' && 'default' in serialize ? serialize['default'] : serialize);

	var index$5 = __commonjs(function (module) {
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

	var domElement = __commonjs(function (module) {
	var domWalk = require$$4$2
	var dispatchEvent = require$$3$2
	var addEventListener = require$$2$3
	var removeEventListener = require$$1$5
	var serializeNode = require$$0$13

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

	var require$$0$12 = (domElement && typeof domElement === 'object' && 'default' in domElement ? domElement['default'] : domElement);

	var domFragment = __commonjs(function (module) {
	var DOMElement = require$$0$12

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

	var domText = __commonjs(function (module) {
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

	var require$$6 = (domText && typeof domText === 'object' && 'default' in domText ? domText['default'] : domText);

	var domComment = __commonjs(function (module) {
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

	var require$$7 = (domComment && typeof domComment === 'object' && 'default' in domComment ? domComment['default'] : domComment);

	var document$2 = __commonjs(function (module) {
	var domWalk = require$$4$2

	var Comment = require$$7
	var DOMText = require$$6
	var DOMElement = require$$0$12
	var DocumentFragment = require$$4$1
	var Event = require$$3$3
	var dispatchEvent = require$$3$2
	var addEventListener = require$$2$3
	var removeEventListener = require$$1$5

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

	var require$$0$11 = (document$2 && typeof document$2 === 'object' && 'default' in document$2 ? document$2['default'] : document$2);

	var index$4 = __commonjs(function (module) {
	var Document = require$$0$11;

	module.exports = new Document();
	});

	var require$$0$10 = (index$4 && typeof index$4 === 'object' && 'default' in index$4 ? index$4['default'] : index$4);

	var document$1 = __commonjs(function (module, exports, global) {
	var topLevel = typeof global !== 'undefined' ? global :
	    typeof window !== 'undefined' ? window : {}
	var minDoc = require$$0$10;

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

	var require$$5 = (document$1 && typeof document$1 === 'object' && 'default' in document$1 ? document$1['default'] : document$1);

	var createElement = __commonjs(function (module) {
	var document = require$$5

	var applyProperties = require$$4

	var isVNode = require$$3
	var isVText = require$$2$1
	var isWidget = require$$1$1
	var handleThunk = require$$0$6

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

	var require$$2$2 = (createElement && typeof createElement === 'object' && 'default' in createElement ? createElement['default'] : createElement);

	var patch$2 = __commonjs(function (module) {
	var document = require$$5
	var isArray = require$$3$1

	var render = require$$2$2
	var domIndex = require$$1$4
	var patchOp = require$$0$8
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

	var require$$0$7 = (patch$2 && typeof patch$2 === 'object' && 'default' in patch$2 ? patch$2['default'] : patch$2);

	var patch = __commonjs(function (module) {
	var patch = require$$0$7

	module.exports = patch
	});

	var patch$1 = (patch && typeof patch === 'object' && 'default' in patch ? patch['default'] : patch);

	var udc = __commonjs(function (module, exports, global) {
	(function (root, factory) {
			"use strict";

			if (typeof exports === 'object') {
				module.exports = factory();
			} else if (typeof define === 'function' && define.amd) {
				define(factory);
			} else {
				root.UltraDeepClone = factory();
			}
		}(__commonjs_global, function () {

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
	    babelHelpers.classCallCheck(this, Instrument);
	  }

	  babelHelpers.createClass(Instrument, [{
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

	function isUnTranslated(node) {
	  return !node.properties || !node.properties.attributes || node.properties.attributes.translated !== '';
	}

	function translate(str) {
	  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	  var key = str.trim();
	  if (!options.defaultValue) options.defaultValue = str;
	  if (key) return i18next.t(key, options);
	  return str;
	}

	var toTranslate = ['placeholder', 'title'];
	function translateProps(props) {
	  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	  if (!props) return props;

	  toTranslate.forEach(function (attr) {
	    var value = getPath(props, attr);
	    if (value) setPath(props, attr, translate(value, options));
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

	  return babelHelpers.extends({}, optsOnNode || {}, opts || {});
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
	  var recurseTime = new Instrument();
	  recurseTime.start();

	  var localized = walk(node);

	  i18next.services.logger.log('localization took: ' + recurseTime.end() + 'ms');

	  return localized;
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
	};

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
	  console.warn('here');
	  setPath(missings, [namespace, key], res);
	  console.warn('there');
	  debouncedLog();
	}

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
	docReady(function () {
	  domReady = true;
	  if (!initialized) init();
	});

	// extend i18next with default extensions
	i18next.use(Backend);
	i18next.use(Browser);

	// log out missings
	i18next.on('missingKey', missingHandler);

	// store last init options - for case init is called before dom ready
	var lastOptions = {};

	function init() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	  options = babelHelpers.extends({}, getDefaults(), lastOptions, options);

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
	        var r = renderer(c, observer);
	        renderers.push(r);
	        r.render();
	      }
	    }
	  }

	  var observer = new Observer(options.ele);

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

	  i18next.init(options, done);

	  if (options.autorun !== false && !domReady) {
	    docReady(done);
	  }
	  if (options.autorun === false) return { start: done };
	}

	var index = {
	  init: init,
	  i18next: i18next
	};

	return index;

}));