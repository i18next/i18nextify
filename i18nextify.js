var i18nextify = (function() {
	//#region \0rolldown/runtime.js
	var __create = Object.create;
	var __defProp = Object.defineProperty;
	var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
	var __getOwnPropNames = Object.getOwnPropertyNames;
	var __getProtoOf = Object.getPrototypeOf;
	var __hasOwnProp = Object.prototype.hasOwnProperty;
	var __commonJSMin = (cb, mod) => () => (mod || (cb((mod = { exports: {} }).exports, mod), cb = null), mod.exports);
	var __copyProps = (to, from, except, desc) => {
		if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
			key = keys[i];
			if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
				get: ((k) => from[k]).bind(null, key),
				enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
			});
		}
		return to;
	};
	var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
		value: mod,
		enumerable: true
	}) : target, mod));
	//#endregion
	//#region node_modules/i18next/dist/esm/i18next.js
	const isString = (obj) => typeof obj === "string";
	const defer = () => {
		let res;
		let rej;
		const promise = new Promise((resolve, reject) => {
			res = resolve;
			rej = reject;
		});
		promise.resolve = res;
		promise.reject = rej;
		return promise;
	};
	const makeString = (object) => {
		if (object == null) return "";
		return String(object);
	};
	const copy = (a, s, t) => {
		a.forEach((m) => {
			if (s[m]) t[m] = s[m];
		});
	};
	const lastOfPathSeparatorRegExp = /###/g;
	const cleanKey = (key) => key && key.includes("###") ? key.replace(lastOfPathSeparatorRegExp, ".") : key;
	const canNotTraverseDeeper = (object) => !object || isString(object);
	const getLastOfPath$1 = (object, path, Empty) => {
		const stack = !isString(path) ? path : path.split(".");
		let stackIndex = 0;
		while (stackIndex < stack.length - 1) {
			if (canNotTraverseDeeper(object)) return {};
			const key = cleanKey(stack[stackIndex]);
			if (!object[key] && Empty) object[key] = new Empty();
			if (Object.prototype.hasOwnProperty.call(object, key)) object = object[key];
			else object = {};
			++stackIndex;
		}
		if (canNotTraverseDeeper(object)) return {};
		return {
			obj: object,
			k: cleanKey(stack[stackIndex])
		};
	};
	const setPath$1 = (object, path, newValue) => {
		const { obj, k } = getLastOfPath$1(object, path, Object);
		if (obj !== void 0 || path.length === 1) {
			obj[k] = newValue;
			return;
		}
		let e = path[path.length - 1];
		let p = path.slice(0, path.length - 1);
		let last = getLastOfPath$1(object, p, Object);
		while (last.obj === void 0 && p.length) {
			e = `${p[p.length - 1]}.${e}`;
			p = p.slice(0, p.length - 1);
			last = getLastOfPath$1(object, p, Object);
			if (last?.obj && typeof last.obj[`${last.k}.${e}`] !== "undefined") last.obj = void 0;
		}
		last.obj[`${last.k}.${e}`] = newValue;
	};
	const pushPath = (object, path, newValue, concat) => {
		const { obj, k } = getLastOfPath$1(object, path, Object);
		obj[k] = obj[k] || [];
		obj[k].push(newValue);
	};
	const getPath$1 = (object, path) => {
		const { obj, k } = getLastOfPath$1(object, path);
		if (!obj) return void 0;
		if (!Object.prototype.hasOwnProperty.call(obj, k)) return void 0;
		return obj[k];
	};
	const getPathWithDefaults = (data, defaultData, key) => {
		const value = getPath$1(data, key);
		if (value !== void 0) return value;
		return getPath$1(defaultData, key);
	};
	const deepExtend = (target, source, overwrite) => {
		for (const prop in source) if (prop !== "__proto__" && prop !== "constructor") if (Object.prototype.hasOwnProperty.call(target, prop)) if (isString(target[prop]) || target[prop] instanceof String || isString(source[prop]) || source[prop] instanceof String) {
			if (overwrite) target[prop] = source[prop];
		} else deepExtend(target[prop], source[prop], overwrite);
		else target[prop] = source[prop];
		return target;
	};
	const regexEscape = (str) => str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
	const _entityMap = {
		"&": "&amp;",
		"<": "&lt;",
		">": "&gt;",
		"\"": "&quot;",
		"'": "&#39;",
		"/": "&#x2F;"
	};
	const escape = (data) => {
		if (isString(data)) return data.replace(/[&<>"'\/]/g, (s) => _entityMap[s]);
		return data;
	};
	var RegExpCache = class {
		constructor(capacity) {
			this.capacity = capacity;
			this.regExpMap = /* @__PURE__ */ new Map();
			this.regExpQueue = [];
		}
		getRegExp(pattern) {
			const regExpFromCache = this.regExpMap.get(pattern);
			if (regExpFromCache !== void 0) return regExpFromCache;
			const regExpNew = new RegExp(pattern);
			if (this.regExpQueue.length === this.capacity) this.regExpMap.delete(this.regExpQueue.shift());
			this.regExpMap.set(pattern, regExpNew);
			this.regExpQueue.push(pattern);
			return regExpNew;
		}
	};
	const chars = [
		" ",
		",",
		"?",
		"!",
		";"
	];
	const looksLikeObjectPathRegExpCache = new RegExpCache(20);
	const looksLikeObjectPath = (key, nsSeparator, keySeparator) => {
		nsSeparator = nsSeparator || "";
		keySeparator = keySeparator || "";
		const possibleChars = chars.filter((c) => !nsSeparator.includes(c) && !keySeparator.includes(c));
		if (possibleChars.length === 0) return true;
		const r = looksLikeObjectPathRegExpCache.getRegExp(`(${possibleChars.map((c) => c === "?" ? "\\?" : c).join("|")})`);
		let matched = !r.test(key);
		if (!matched) {
			const ki = key.indexOf(keySeparator);
			if (ki > 0 && !r.test(key.substring(0, ki))) matched = true;
		}
		return matched;
	};
	const deepFind = (obj, path, keySeparator = ".") => {
		if (!obj) return void 0;
		if (obj[path]) {
			if (!Object.prototype.hasOwnProperty.call(obj, path)) return void 0;
			return obj[path];
		}
		const tokens = path.split(keySeparator);
		let current = obj;
		for (let i = 0; i < tokens.length;) {
			if (!current || typeof current !== "object") return;
			let next;
			let nextPath = "";
			for (let j = i; j < tokens.length; ++j) {
				if (j !== i) nextPath += keySeparator;
				nextPath += tokens[j];
				next = current[nextPath];
				if (next !== void 0) {
					if ([
						"string",
						"number",
						"boolean"
					].includes(typeof next) && j < tokens.length - 1) continue;
					i += j - i + 1;
					break;
				}
			}
			current = next;
		}
		return current;
	};
	const getCleanedCode = (code) => code?.replace(/_/g, "-");
	const consoleLogger = {
		type: "logger",
		log(args) {
			this.output("log", args);
		},
		warn(args) {
			this.output("warn", args);
		},
		error(args) {
			this.output("error", args);
		},
		output(type, args) {
			console?.[type]?.apply?.(console, args);
		}
	};
	var baseLogger = new class Logger {
		constructor(concreteLogger, options = {}) {
			this.init(concreteLogger, options);
		}
		init(concreteLogger, options = {}) {
			this.prefix = options.prefix || "i18next:";
			this.logger = concreteLogger || consoleLogger;
			this.options = options;
			this.debug = options.debug;
		}
		log(...args) {
			return this.forward(args, "log", "", true);
		}
		warn(...args) {
			return this.forward(args, "warn", "", true);
		}
		error(...args) {
			return this.forward(args, "error", "");
		}
		deprecate(...args) {
			return this.forward(args, "warn", "WARNING DEPRECATED: ", true);
		}
		forward(args, lvl, prefix, debugOnly) {
			if (debugOnly && !this.debug) return null;
			args = args.map((a) => isString(a) ? a.replace(/[\r\n\x00-\x1F\x7F]/g, " ") : a);
			if (isString(args[0])) args[0] = `${prefix}${this.prefix} ${args[0]}`;
			return this.logger[lvl](args);
		}
		create(moduleName) {
			return new Logger(this.logger, {
				prefix: `${this.prefix}:${moduleName}:`,
				...this.options
			});
		}
		clone(options) {
			options = options || this.options;
			options.prefix = options.prefix || this.prefix;
			return new Logger(this.logger, options);
		}
	}();
	var EventEmitter$1 = class {
		constructor() {
			this.observers = {};
		}
		on(events, listener) {
			events.split(" ").forEach((event) => {
				if (!this.observers[event]) this.observers[event] = /* @__PURE__ */ new Map();
				const numListeners = this.observers[event].get(listener) || 0;
				this.observers[event].set(listener, numListeners + 1);
			});
			return this;
		}
		off(event, listener) {
			if (!this.observers[event]) return;
			if (!listener) {
				delete this.observers[event];
				return;
			}
			this.observers[event].delete(listener);
		}
		once(event, listener) {
			const wrapper = (...args) => {
				listener(...args);
				this.off(event, wrapper);
			};
			this.on(event, wrapper);
			return this;
		}
		emit(event, ...args) {
			if (this.observers[event]) Array.from(this.observers[event].entries()).forEach(([observer, numTimesAdded]) => {
				for (let i = 0; i < numTimesAdded; i++) observer(...args);
			});
			if (this.observers["*"]) Array.from(this.observers["*"].entries()).forEach(([observer, numTimesAdded]) => {
				for (let i = 0; i < numTimesAdded; i++) observer(event, ...args);
			});
		}
	};
	var ResourceStore = class extends EventEmitter$1 {
		constructor(data, options = {
			ns: ["translation"],
			defaultNS: "translation"
		}) {
			super();
			this.data = data || {};
			this.options = options;
			if (this.options.keySeparator === void 0) this.options.keySeparator = ".";
			if (this.options.ignoreJSONStructure === void 0) this.options.ignoreJSONStructure = true;
		}
		addNamespaces(ns) {
			if (!this.options.ns.includes(ns)) this.options.ns.push(ns);
		}
		removeNamespaces(ns) {
			const index = this.options.ns.indexOf(ns);
			if (index > -1) this.options.ns.splice(index, 1);
		}
		getResource(lng, ns, key, options = {}) {
			const keySeparator = options.keySeparator !== void 0 ? options.keySeparator : this.options.keySeparator;
			const ignoreJSONStructure = options.ignoreJSONStructure !== void 0 ? options.ignoreJSONStructure : this.options.ignoreJSONStructure;
			let path;
			if (lng.includes(".")) path = lng.split(".");
			else {
				path = [lng, ns];
				if (key) if (Array.isArray(key)) path.push(...key);
				else if (isString(key) && keySeparator) path.push(...key.split(keySeparator));
				else path.push(key);
			}
			const result = getPath$1(this.data, path);
			if (!result && !ns && !key && lng.includes(".")) {
				lng = path[0];
				ns = path[1];
				key = path.slice(2).join(".");
			}
			if (result || !ignoreJSONStructure || !isString(key)) return result;
			return deepFind(this.data?.[lng]?.[ns], key, keySeparator);
		}
		addResource(lng, ns, key, value, options = { silent: false }) {
			const keySeparator = options.keySeparator !== void 0 ? options.keySeparator : this.options.keySeparator;
			let path = [lng, ns];
			if (key) path = path.concat(keySeparator ? key.split(keySeparator) : key);
			if (lng.includes(".")) {
				path = lng.split(".");
				value = ns;
				ns = path[1];
			}
			this.addNamespaces(ns);
			setPath$1(this.data, path, value);
			if (!options.silent) this.emit("added", lng, ns, key, value);
		}
		addResources(lng, ns, resources, options = { silent: false }) {
			for (const m in resources) if (isString(resources[m]) || Array.isArray(resources[m])) this.addResource(lng, ns, m, resources[m], { silent: true });
			if (!options.silent) this.emit("added", lng, ns, resources);
		}
		addResourceBundle(lng, ns, resources, deep, overwrite, options = {
			silent: false,
			skipCopy: false
		}) {
			let path = [lng, ns];
			if (lng.includes(".")) {
				path = lng.split(".");
				deep = resources;
				resources = ns;
				ns = path[1];
			}
			this.addNamespaces(ns);
			let pack = getPath$1(this.data, path) || {};
			if (!options.skipCopy) resources = JSON.parse(JSON.stringify(resources));
			if (deep) deepExtend(pack, resources, overwrite);
			else pack = {
				...pack,
				...resources
			};
			setPath$1(this.data, path, pack);
			if (!options.silent) this.emit("added", lng, ns, resources);
		}
		removeResourceBundle(lng, ns) {
			if (this.hasResourceBundle(lng, ns)) delete this.data[lng][ns];
			this.removeNamespaces(ns);
			this.emit("removed", lng, ns);
		}
		hasResourceBundle(lng, ns) {
			return this.getResource(lng, ns) !== void 0;
		}
		getResourceBundle(lng, ns) {
			if (!ns) ns = this.options.defaultNS;
			return this.getResource(lng, ns);
		}
		getDataByLanguage(lng) {
			return this.data[lng];
		}
		hasLanguageSomeTranslations(lng) {
			const data = this.getDataByLanguage(lng);
			return !!(data && Object.keys(data) || []).find((v) => data[v] && Object.keys(data[v]).length > 0);
		}
		toJSON() {
			return this.data;
		}
	};
	var postProcessor = {
		processors: {},
		addPostProcessor(module) {
			this.processors[module.name] = module;
		},
		handle(processors, value, key, options, translator) {
			processors.forEach((processor) => {
				value = this.processors[processor]?.process(value, key, options, translator) ?? value;
			});
			return value;
		}
	};
	const PATH_KEY = Symbol("i18next/PATH_KEY");
	function createProxy() {
		const state = [];
		const handler = Object.create(null);
		let proxy;
		handler.get = (target, key) => {
			proxy?.revoke?.();
			if (key === PATH_KEY) return state;
			state.push(key);
			proxy = Proxy.revocable(target, handler);
			return proxy.proxy;
		};
		return Proxy.revocable(Object.create(null), handler).proxy;
	}
	function keysFromSelector(selector, opts) {
		const { [PATH_KEY]: path } = selector(createProxy());
		const keySeparator = opts?.keySeparator ?? ".";
		const nsSeparator = opts?.nsSeparator ?? ":";
		const strict = opts?.enableSelector === "strict";
		if (path.length > 1 && nsSeparator) {
			const ns = opts?.ns;
			const nsList = strict ? Array.isArray(ns) ? ns : ns ? [ns] : null : Array.isArray(ns) ? ns : null;
			if (nsList) {
				if ((strict ? nsList : nsList.length > 1 ? nsList.slice(1) : []).includes(path[0])) return `${path[0]}${nsSeparator}${path.slice(1).join(keySeparator)}`;
			}
		}
		return path.join(keySeparator);
	}
	const shouldHandleAsObject = (res) => !isString(res) && typeof res !== "boolean" && typeof res !== "number";
	var Translator = class Translator extends EventEmitter$1 {
		constructor(services, options = {}) {
			super();
			copy([
				"resourceStore",
				"languageUtils",
				"pluralResolver",
				"interpolator",
				"backendConnector",
				"i18nFormat",
				"utils"
			], services, this);
			this.options = options;
			if (this.options.keySeparator === void 0) this.options.keySeparator = ".";
			this.logger = baseLogger.create("translator");
			this.checkedLoadedFor = {};
		}
		changeLanguage(lng) {
			if (lng) this.language = lng;
		}
		exists(key, o = { interpolation: {} }) {
			const opt = { ...o };
			if (key == null) return false;
			const resolved = this.resolve(key, opt);
			if (resolved?.res === void 0) return false;
			const isObject = shouldHandleAsObject(resolved.res);
			if (opt.returnObjects === false && isObject) return false;
			return true;
		}
		extractFromKey(key, opt) {
			let nsSeparator = opt.nsSeparator !== void 0 ? opt.nsSeparator : this.options.nsSeparator;
			if (nsSeparator === void 0) nsSeparator = ":";
			const keySeparator = opt.keySeparator !== void 0 ? opt.keySeparator : this.options.keySeparator;
			let namespaces = opt.ns || this.options.defaultNS || [];
			const wouldCheckForNsInKey = nsSeparator && key.includes(nsSeparator);
			const seemsNaturalLanguage = !this.options.userDefinedKeySeparator && !opt.keySeparator && !this.options.userDefinedNsSeparator && !opt.nsSeparator && !looksLikeObjectPath(key, nsSeparator, keySeparator);
			if (wouldCheckForNsInKey && !seemsNaturalLanguage) {
				const m = key.match(this.interpolator.nestingRegexp);
				if (m && m.length > 0) return {
					key,
					namespaces: isString(namespaces) ? [namespaces] : namespaces
				};
				const parts = key.split(nsSeparator);
				if (nsSeparator !== keySeparator || nsSeparator === keySeparator && this.options.ns.includes(parts[0])) namespaces = parts.shift();
				key = parts.join(keySeparator);
			}
			return {
				key,
				namespaces: isString(namespaces) ? [namespaces] : namespaces
			};
		}
		translate(keys, o, lastKey) {
			let opt = typeof o === "object" ? { ...o } : o;
			if (typeof opt !== "object" && this.options.overloadTranslationOptionHandler) opt = this.options.overloadTranslationOptionHandler(arguments);
			if (typeof opt === "object") opt = { ...opt };
			if (!opt) opt = {};
			if (keys == null) return "";
			if (typeof keys === "function") keys = keysFromSelector(keys, {
				...this.options,
				...opt
			});
			if (!Array.isArray(keys)) keys = [String(keys)];
			keys = keys.map((k) => typeof k === "function" ? keysFromSelector(k, {
				...this.options,
				...opt
			}) : String(k));
			const returnDetails = opt.returnDetails !== void 0 ? opt.returnDetails : this.options.returnDetails;
			const keySeparator = opt.keySeparator !== void 0 ? opt.keySeparator : this.options.keySeparator;
			const { key, namespaces } = this.extractFromKey(keys[keys.length - 1], opt);
			const namespace = namespaces[namespaces.length - 1];
			let nsSeparator = opt.nsSeparator !== void 0 ? opt.nsSeparator : this.options.nsSeparator;
			if (nsSeparator === void 0) nsSeparator = ":";
			const lng = opt.lng || this.language;
			const appendNamespaceToCIMode = opt.appendNamespaceToCIMode || this.options.appendNamespaceToCIMode;
			if (lng?.toLowerCase() === "cimode") {
				if (appendNamespaceToCIMode) {
					if (returnDetails) return {
						res: `${namespace}${nsSeparator}${key}`,
						usedKey: key,
						exactUsedKey: key,
						usedLng: lng,
						usedNS: namespace,
						usedParams: this.getUsedParamsDetails(opt)
					};
					return `${namespace}${nsSeparator}${key}`;
				}
				if (returnDetails) return {
					res: key,
					usedKey: key,
					exactUsedKey: key,
					usedLng: lng,
					usedNS: namespace,
					usedParams: this.getUsedParamsDetails(opt)
				};
				return key;
			}
			const resolved = this.resolve(keys, opt);
			let res = resolved?.res;
			const resUsedKey = resolved?.usedKey || key;
			const resExactUsedKey = resolved?.exactUsedKey || key;
			const noObject = [
				"[object Number]",
				"[object Function]",
				"[object RegExp]"
			];
			const joinArrays = opt.joinArrays !== void 0 ? opt.joinArrays : this.options.joinArrays;
			const handleAsObjectInI18nFormat = !this.i18nFormat || this.i18nFormat.handleAsObject;
			const needsPluralHandling = opt.count !== void 0 && !isString(opt.count);
			const hasDefaultValue = Translator.hasDefaultValue(opt);
			const defaultValueSuffix = needsPluralHandling ? this.pluralResolver.getSuffix(lng, opt.count, opt) : "";
			const defaultValueSuffixOrdinalFallback = opt.ordinal && needsPluralHandling ? this.pluralResolver.getSuffix(lng, opt.count, { ordinal: false }) : "";
			const needsZeroSuffixLookup = needsPluralHandling && !opt.ordinal && opt.count === 0;
			const defaultValue = needsZeroSuffixLookup && opt[`defaultValue${this.options.pluralSeparator}zero`] || opt[`defaultValue${defaultValueSuffix}`] || opt[`defaultValue${defaultValueSuffixOrdinalFallback}`] || opt.defaultValue;
			let resForObjHndl = res;
			if (handleAsObjectInI18nFormat && !res && hasDefaultValue) resForObjHndl = defaultValue;
			const handleAsObject = shouldHandleAsObject(resForObjHndl);
			const resType = Object.prototype.toString.apply(resForObjHndl);
			if (handleAsObjectInI18nFormat && resForObjHndl && handleAsObject && !noObject.includes(resType) && !(isString(joinArrays) && Array.isArray(resForObjHndl))) {
				if (!opt.returnObjects && !this.options.returnObjects) {
					if (!this.options.returnedObjectHandler) this.logger.warn("accessing an object - but returnObjects options is not enabled!");
					const r = this.options.returnedObjectHandler ? this.options.returnedObjectHandler(resUsedKey, resForObjHndl, {
						...opt,
						ns: namespaces
					}) : `key '${key} (${this.language})' returned an object instead of string.`;
					if (returnDetails) {
						resolved.res = r;
						resolved.usedParams = this.getUsedParamsDetails(opt);
						return resolved;
					}
					return r;
				}
				if (keySeparator) {
					const resTypeIsArray = Array.isArray(resForObjHndl);
					const copy = resTypeIsArray ? [] : {};
					const newKeyToUse = resTypeIsArray ? resExactUsedKey : resUsedKey;
					for (const m in resForObjHndl) if (Object.prototype.hasOwnProperty.call(resForObjHndl, m)) {
						const deepKey = `${newKeyToUse}${keySeparator}${m}`;
						if (hasDefaultValue && !res) copy[m] = this.translate(deepKey, {
							...opt,
							defaultValue: shouldHandleAsObject(defaultValue) ? defaultValue[m] : void 0,
							joinArrays: false,
							ns: namespaces
						});
						else copy[m] = this.translate(deepKey, {
							...opt,
							joinArrays: false,
							ns: namespaces
						});
						if (copy[m] === deepKey) copy[m] = resForObjHndl[m];
					}
					res = copy;
				}
			} else if (handleAsObjectInI18nFormat && isString(joinArrays) && Array.isArray(res)) {
				res = res.join(joinArrays);
				if (res) res = this.extendTranslation(res, keys, opt, lastKey);
			} else {
				let usedDefault = false;
				let usedKey = false;
				if (!this.isValidLookup(res) && hasDefaultValue) {
					usedDefault = true;
					res = defaultValue;
				}
				if (!this.isValidLookup(res)) {
					usedKey = true;
					res = key;
				}
				const resForMissing = (opt.missingKeyNoValueFallbackToKey || this.options.missingKeyNoValueFallbackToKey) && usedKey ? void 0 : res;
				const updateMissing = hasDefaultValue && defaultValue !== res && this.options.updateMissing;
				if (usedKey || usedDefault || updateMissing) {
					this.logger.log(updateMissing ? "updateKey" : "missingKey", lng, namespace, needsPluralHandling && !updateMissing ? `${key}${this.pluralResolver.getSuffix(lng, opt.count, opt)}` : key, updateMissing ? defaultValue : res);
					if (keySeparator) {
						const fk = this.resolve(key, {
							...opt,
							keySeparator: false
						});
						if (fk && fk.res) this.logger.warn("Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.");
					}
					let lngs = [];
					const fallbackLngs = this.languageUtils.getFallbackCodes(this.options.fallbackLng, opt.lng || this.language);
					if (this.options.saveMissingTo === "fallback" && fallbackLngs && fallbackLngs[0]) for (let i = 0; i < fallbackLngs.length; i++) lngs.push(fallbackLngs[i]);
					else if (this.options.saveMissingTo === "all") lngs = this.languageUtils.toResolveHierarchy(opt.lng || this.language);
					else lngs.push(opt.lng || this.language);
					const send = (l, k, specificDefaultValue) => {
						const defaultForMissing = hasDefaultValue && specificDefaultValue !== res ? specificDefaultValue : resForMissing;
						if (this.options.missingKeyHandler) this.options.missingKeyHandler(l, namespace, k, defaultForMissing, updateMissing, opt);
						else if (this.backendConnector?.saveMissing) this.backendConnector.saveMissing(l, namespace, k, defaultForMissing, updateMissing, opt);
						this.emit("missingKey", l, namespace, k, res);
					};
					if (this.options.saveMissing) if (this.options.saveMissingPlurals && needsPluralHandling) lngs.forEach((language) => {
						const suffixes = this.pluralResolver.getSuffixes(language, opt);
						if (needsZeroSuffixLookup && opt[`defaultValue${this.options.pluralSeparator}zero`] && !suffixes.includes(`${this.options.pluralSeparator}zero`)) suffixes.push(`${this.options.pluralSeparator}zero`);
						suffixes.forEach((suffix) => {
							send([language], key + suffix, opt[`defaultValue${suffix}`] || defaultValue);
						});
					});
					else send(lngs, key, defaultValue);
				}
				res = this.extendTranslation(res, keys, opt, resolved, lastKey);
				if (usedKey && res === key && this.options.appendNamespaceToMissingKey) res = `${namespace}${nsSeparator}${key}`;
				if ((usedKey || usedDefault) && this.options.parseMissingKeyHandler) res = this.options.parseMissingKeyHandler(this.options.appendNamespaceToMissingKey ? `${namespace}${nsSeparator}${key}` : key, usedDefault ? res : void 0, opt);
			}
			if (returnDetails) {
				resolved.res = res;
				resolved.usedParams = this.getUsedParamsDetails(opt);
				return resolved;
			}
			return res;
		}
		extendTranslation(res, key, opt, resolved, lastKey) {
			if (this.i18nFormat?.parse) res = this.i18nFormat.parse(res, {
				...this.options.interpolation.defaultVariables,
				...opt
			}, opt.lng || this.language || resolved.usedLng, resolved.usedNS, resolved.usedKey, { resolved });
			else if (!opt.skipInterpolation) {
				if (opt.interpolation) this.interpolator.init({
					...opt,
					interpolation: {
						...this.options.interpolation,
						...opt.interpolation
					}
				});
				const skipOnVariables = isString(res) && (opt?.interpolation?.skipOnVariables !== void 0 ? opt.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables);
				let nestBef;
				if (skipOnVariables) {
					const nb = res.match(this.interpolator.nestingRegexp);
					nestBef = nb && nb.length;
				}
				let data = opt.replace && !isString(opt.replace) ? opt.replace : opt;
				if (this.options.interpolation.defaultVariables) data = {
					...this.options.interpolation.defaultVariables,
					...data
				};
				res = this.interpolator.interpolate(res, data, opt.lng || this.language || resolved.usedLng, opt);
				if (skipOnVariables) {
					const na = res.match(this.interpolator.nestingRegexp);
					const nestAft = na && na.length;
					if (nestBef < nestAft) opt.nest = false;
				}
				if (!opt.lng && resolved && resolved.res) opt.lng = this.language || resolved.usedLng;
				if (opt.nest !== false) res = this.interpolator.nest(res, (...args) => {
					if (lastKey?.[0] === args[0] && !opt.context) {
						this.logger.warn(`It seems you are nesting recursively key: ${args[0]} in key: ${key[0]}`);
						return null;
					}
					return this.translate(...args, key);
				}, opt);
				if (opt.interpolation) this.interpolator.reset();
			}
			const postProcess = opt.postProcess || this.options.postProcess;
			const postProcessorNames = isString(postProcess) ? [postProcess] : postProcess;
			if (res != null && postProcessorNames?.length && opt.applyPostProcessor !== false) res = postProcessor.handle(postProcessorNames, res, key, this.options && this.options.postProcessPassResolved ? {
				i18nResolved: {
					...resolved,
					usedParams: this.getUsedParamsDetails(opt)
				},
				...opt
			} : opt, this);
			return res;
		}
		resolve(keys, opt = {}) {
			let found;
			let usedKey;
			let exactUsedKey;
			let usedLng;
			let usedNS;
			if (isString(keys)) keys = [keys];
			if (Array.isArray(keys)) keys = keys.map((k) => typeof k === "function" ? keysFromSelector(k, {
				...this.options,
				...opt
			}) : k);
			keys.forEach((k) => {
				if (this.isValidLookup(found)) return;
				const extracted = this.extractFromKey(k, opt);
				const key = extracted.key;
				usedKey = key;
				let namespaces = extracted.namespaces;
				if (this.options.fallbackNS) namespaces = namespaces.concat(this.options.fallbackNS);
				const needsPluralHandling = opt.count !== void 0 && !isString(opt.count);
				const needsZeroSuffixLookup = needsPluralHandling && !opt.ordinal && opt.count === 0;
				const needsContextHandling = opt.context !== void 0 && (isString(opt.context) || typeof opt.context === "number") && opt.context !== "";
				const codes = opt.lngs ? opt.lngs : this.languageUtils.toResolveHierarchy(opt.lng || this.language, opt.fallbackLng);
				namespaces.forEach((ns) => {
					if (this.isValidLookup(found)) return;
					usedNS = ns;
					if (!this.checkedLoadedFor[`${codes[0]}-${ns}`] && this.utils?.hasLoadedNamespace && !this.utils?.hasLoadedNamespace(usedNS)) {
						this.checkedLoadedFor[`${codes[0]}-${ns}`] = true;
						this.logger.warn(`key "${usedKey}" for languages "${codes.join(", ")}" won't get resolved as namespace "${usedNS}" was not yet loaded`, "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!");
					}
					codes.forEach((code) => {
						if (this.isValidLookup(found)) return;
						usedLng = code;
						const finalKeys = [key];
						if (this.i18nFormat?.addLookupKeys) this.i18nFormat.addLookupKeys(finalKeys, key, code, ns, opt);
						else {
							let pluralSuffix;
							if (needsPluralHandling) pluralSuffix = this.pluralResolver.getSuffix(code, opt.count, opt);
							const zeroSuffix = `${this.options.pluralSeparator}zero`;
							const ordinalPrefix = `${this.options.pluralSeparator}ordinal${this.options.pluralSeparator}`;
							if (needsPluralHandling) {
								if (opt.ordinal && pluralSuffix.startsWith(ordinalPrefix)) finalKeys.push(key + pluralSuffix.replace(ordinalPrefix, this.options.pluralSeparator));
								finalKeys.push(key + pluralSuffix);
								if (needsZeroSuffixLookup) finalKeys.push(key + zeroSuffix);
							}
							if (needsContextHandling) {
								const contextKey = `${key}${this.options.contextSeparator || "_"}${opt.context}`;
								finalKeys.push(contextKey);
								if (needsPluralHandling) {
									if (opt.ordinal && pluralSuffix.startsWith(ordinalPrefix)) finalKeys.push(contextKey + pluralSuffix.replace(ordinalPrefix, this.options.pluralSeparator));
									finalKeys.push(contextKey + pluralSuffix);
									if (needsZeroSuffixLookup) finalKeys.push(contextKey + zeroSuffix);
								}
							}
						}
						let possibleKey;
						while (possibleKey = finalKeys.pop()) if (!this.isValidLookup(found)) {
							exactUsedKey = possibleKey;
							found = this.getResource(code, ns, possibleKey, opt);
						}
					});
				});
			});
			return {
				res: found,
				usedKey,
				exactUsedKey,
				usedLng,
				usedNS
			};
		}
		isValidLookup(res) {
			return res !== void 0 && !(!this.options.returnNull && res === null) && !(!this.options.returnEmptyString && res === "");
		}
		getResource(code, ns, key, options = {}) {
			if (this.i18nFormat?.getResource) return this.i18nFormat.getResource(code, ns, key, options);
			return this.resourceStore.getResource(code, ns, key, options);
		}
		getUsedParamsDetails(options = {}) {
			const optionsKeys = [
				"defaultValue",
				"ordinal",
				"context",
				"replace",
				"lng",
				"lngs",
				"fallbackLng",
				"ns",
				"keySeparator",
				"nsSeparator",
				"returnObjects",
				"returnDetails",
				"joinArrays",
				"postProcess",
				"interpolation"
			];
			const useOptionsReplaceForData = options.replace && !isString(options.replace);
			let data = useOptionsReplaceForData ? options.replace : options;
			if (useOptionsReplaceForData && typeof options.count !== "undefined") data = {
				...data,
				count: options.count
			};
			if (this.options.interpolation.defaultVariables) data = {
				...this.options.interpolation.defaultVariables,
				...data
			};
			if (!useOptionsReplaceForData) {
				data = { ...data };
				for (const key of optionsKeys) delete data[key];
			}
			return data;
		}
		static hasDefaultValue(options) {
			const prefix = "defaultValue";
			for (const option in options) if (Object.prototype.hasOwnProperty.call(options, option) && option.startsWith(prefix) && void 0 !== options[option]) return true;
			return false;
		}
	};
	var LanguageUtil = class {
		constructor(options) {
			this.options = options;
			this.supportedLngs = this.options.supportedLngs || false;
			this.logger = baseLogger.create("languageUtils");
			this.resolveHierarchyCache = {};
		}
		clearCache() {
			this.resolveHierarchyCache = {};
		}
		getScriptPartFromCode(code) {
			code = getCleanedCode(code);
			if (!code || !code.includes("-")) return null;
			const p = code.split("-");
			if (p.length === 2) return null;
			p.pop();
			if (p[p.length - 1].toLowerCase() === "x") return null;
			return this.formatLanguageCode(p.join("-"));
		}
		getLanguagePartFromCode(code) {
			code = getCleanedCode(code);
			if (!code || !code.includes("-")) return code;
			const p = code.split("-");
			return this.formatLanguageCode(p[0]);
		}
		formatLanguageCode(code) {
			if (isString(code) && code.includes("-")) {
				let formattedCode;
				try {
					formattedCode = Intl.getCanonicalLocales(code)[0];
				} catch (e) {}
				if (formattedCode && this.options.lowerCaseLng) formattedCode = formattedCode.toLowerCase();
				if (formattedCode) return formattedCode;
				if (this.options.lowerCaseLng) return code.toLowerCase();
				return code;
			}
			return this.options.cleanCode || this.options.lowerCaseLng ? code.toLowerCase() : code;
		}
		isSupportedCode(code) {
			if (this.options.load === "languageOnly" || this.options.nonExplicitSupportedLngs) code = this.getLanguagePartFromCode(code);
			return !this.supportedLngs || !this.supportedLngs.length || this.supportedLngs.includes(code);
		}
		getBestMatchFromCodes(codes) {
			if (!codes) return null;
			let found;
			codes.forEach((code) => {
				if (found) return;
				const cleanedLng = this.formatLanguageCode(code);
				if (!this.options.supportedLngs || this.isSupportedCode(cleanedLng)) found = cleanedLng;
			});
			if (!found && this.options.supportedLngs) codes.forEach((code) => {
				if (found) return;
				const lngScOnly = this.getScriptPartFromCode(code);
				if (this.isSupportedCode(lngScOnly)) return found = lngScOnly;
				const lngOnly = this.getLanguagePartFromCode(code);
				if (this.isSupportedCode(lngOnly)) return found = lngOnly;
				found = this.options.supportedLngs.find((supportedLng) => {
					if (supportedLng === lngOnly) return true;
					if (!supportedLng.includes("-") && !lngOnly.includes("-")) return false;
					if (supportedLng.includes("-") && !lngOnly.includes("-") && supportedLng.slice(0, supportedLng.indexOf("-")) === lngOnly) return true;
					if (supportedLng.startsWith(lngOnly) && lngOnly.length > 1) return true;
					return false;
				});
			});
			if (!found) found = this.getFallbackCodes(this.options.fallbackLng)[0];
			return found;
		}
		getFallbackCodes(fallbacks, code) {
			if (!fallbacks) return [];
			if (typeof fallbacks === "function") fallbacks = fallbacks(code);
			if (isString(fallbacks)) fallbacks = [fallbacks];
			if (Array.isArray(fallbacks)) return fallbacks;
			if (!code) return fallbacks.default || [];
			let found = fallbacks[code];
			if (!found) found = fallbacks[this.getScriptPartFromCode(code)];
			if (!found) found = fallbacks[this.formatLanguageCode(code)];
			if (!found) found = fallbacks[this.getLanguagePartFromCode(code)];
			if (!found) found = fallbacks.default;
			return found || [];
		}
		toResolveHierarchy(code, fallbackCode) {
			const fallbackLng = this.options.fallbackLng;
			const fallbackLngKey = Array.isArray(fallbackLng) ? fallbackLng.join("|") : fallbackLng;
			if (fallbackLngKey !== this._cachedFallbackLng) {
				this.resolveHierarchyCache = {};
				this._cachedFallbackLng = fallbackLngKey;
			}
			const hasCacheableFallback = fallbackCode === void 0 || fallbackCode === false || isString(fallbackCode);
			const usesUncacheableOptionsFallback = fallbackCode === void 0 && typeof this.options.fallbackLng === "function";
			const cacheable = isString(code) && hasCacheableFallback && !usesUncacheableOptionsFallback;
			let cacheKey = null;
			if (cacheable) {
				let fallbackCacheKey;
				if (fallbackCode === void 0) fallbackCacheKey = "undefined";
				else if (fallbackCode === false) fallbackCacheKey = "boolean:false";
				else fallbackCacheKey = `string:${fallbackCode}`;
				cacheKey = `${code.length}:${code}|${fallbackCacheKey}`;
			}
			if (cacheKey !== null) {
				const cached = this.resolveHierarchyCache[cacheKey];
				if (cached !== void 0) return cached.slice();
			}
			const fallbackCodes = this.getFallbackCodes((fallbackCode === false ? [] : fallbackCode) || this.options.fallbackLng || [], code);
			const codes = [];
			const addCode = (c) => {
				if (!c) return;
				if (this.isSupportedCode(c)) codes.push(c);
				else this.logger.warn(`rejecting language code not found in supportedLngs: ${c}`);
			};
			if (isString(code) && (code.includes("-") || code.includes("_"))) {
				if (this.options.load !== "languageOnly") addCode(this.formatLanguageCode(code));
				if (this.options.load !== "languageOnly" && this.options.load !== "currentOnly") addCode(this.getScriptPartFromCode(code));
				if (this.options.load !== "currentOnly") addCode(this.getLanguagePartFromCode(code));
			} else if (isString(code)) addCode(this.formatLanguageCode(code));
			fallbackCodes.forEach((fc) => {
				if (!codes.includes(fc)) addCode(this.formatLanguageCode(fc));
			});
			if (cacheKey !== null) {
				this.resolveHierarchyCache[cacheKey] = codes;
				return codes.slice();
			}
			return codes;
		}
	};
	const suffixesOrder = {
		zero: 0,
		one: 1,
		two: 2,
		few: 3,
		many: 4,
		other: 5
	};
	const dummyRule = {
		select: (count) => count === 1 ? "one" : "other",
		resolvedOptions: () => ({ pluralCategories: ["one", "other"] })
	};
	var PluralResolver = class {
		constructor(languageUtils, options = {}) {
			this.languageUtils = languageUtils;
			this.options = options;
			this.logger = baseLogger.create("pluralResolver");
			this.pluralRulesCache = {};
		}
		clearCache() {
			this.pluralRulesCache = {};
		}
		getRule(code, options = {}) {
			const cleanedCode = getCleanedCode(code === "dev" ? "en" : code);
			const type = options.ordinal ? "ordinal" : "cardinal";
			const cacheKey = JSON.stringify({
				cleanedCode,
				type
			});
			if (cacheKey in this.pluralRulesCache) return this.pluralRulesCache[cacheKey];
			let rule;
			try {
				rule = new Intl.PluralRules(cleanedCode, { type });
			} catch (err) {
				if (typeof Intl === "undefined") {
					this.logger.error("No Intl support, please use an Intl polyfill!");
					return dummyRule;
				}
				if (!code.match(/-|_/)) return dummyRule;
				const lngPart = this.languageUtils.getLanguagePartFromCode(code);
				rule = this.getRule(lngPart, options);
			}
			this.pluralRulesCache[cacheKey] = rule;
			return rule;
		}
		needsPlural(code, options = {}) {
			let rule = this.getRule(code, options);
			if (!rule) rule = this.getRule("dev", options);
			return rule?.resolvedOptions().pluralCategories.length > 1;
		}
		getPluralFormsOfKey(code, key, options = {}) {
			return this.getSuffixes(code, options).map((suffix) => `${key}${suffix}`);
		}
		getSuffixes(code, options = {}) {
			let rule = this.getRule(code, options);
			if (!rule) rule = this.getRule("dev", options);
			if (!rule) return [];
			return rule.resolvedOptions().pluralCategories.sort((pluralCategory1, pluralCategory2) => suffixesOrder[pluralCategory1] - suffixesOrder[pluralCategory2]).map((pluralCategory) => `${this.options.prepend}${options.ordinal ? `ordinal${this.options.prepend}` : ""}${pluralCategory}`);
		}
		getSuffix(code, count, options = {}) {
			const rule = this.getRule(code, options);
			if (rule) return `${this.options.prepend}${options.ordinal ? `ordinal${this.options.prepend}` : ""}${rule.select(count)}`;
			this.logger.warn(`no plural rule found for: ${code}`);
			return this.getSuffix("dev", count, options);
		}
	};
	const deepFindWithDefaults = (data, defaultData, key, keySeparator = ".", ignoreJSONStructure = true) => {
		let path = getPathWithDefaults(data, defaultData, key);
		if (!path && ignoreJSONStructure && isString(key)) {
			path = deepFind(data, key, keySeparator);
			if (path === void 0) path = deepFind(defaultData, key, keySeparator);
		}
		return path;
	};
	const regexSafe = (val) => val.replace(/\$/g, "$$$$");
	var Interpolator = class {
		constructor(options = {}) {
			this.logger = baseLogger.create("interpolator");
			this.options = options;
			this.format = options?.interpolation?.format || ((value) => value);
			this.init(options);
		}
		init(options = {}) {
			if (!options.interpolation) options.interpolation = { escapeValue: true };
			const { escape: escape$1, escapeValue, useRawValueToEscape, prefix, prefixEscaped, suffix, suffixEscaped, formatSeparator, unescapeSuffix, unescapePrefix, nestingPrefix, nestingPrefixEscaped, nestingSuffix, nestingSuffixEscaped, nestingOptionsSeparator, maxReplaces, alwaysFormat } = options.interpolation;
			this.escape = escape$1 !== void 0 ? escape$1 : escape;
			this.escapeValue = escapeValue !== void 0 ? escapeValue : true;
			this.useRawValueToEscape = useRawValueToEscape !== void 0 ? useRawValueToEscape : false;
			this.prefix = prefix ? regexEscape(prefix) : prefixEscaped || "{{";
			this.suffix = suffix ? regexEscape(suffix) : suffixEscaped || "}}";
			this.formatSeparator = formatSeparator || ",";
			this.unescapePrefix = unescapeSuffix ? "" : unescapePrefix ? regexEscape(unescapePrefix) : "-";
			this.unescapeSuffix = this.unescapePrefix ? "" : unescapeSuffix ? regexEscape(unescapeSuffix) : "";
			this.nestingPrefix = nestingPrefix ? regexEscape(nestingPrefix) : nestingPrefixEscaped || regexEscape("$t(");
			this.nestingSuffix = nestingSuffix ? regexEscape(nestingSuffix) : nestingSuffixEscaped || regexEscape(")");
			this.nestingOptionsSeparator = nestingOptionsSeparator || ",";
			this.maxReplaces = maxReplaces || 1e3;
			this.alwaysFormat = alwaysFormat !== void 0 ? alwaysFormat : false;
			this.resetRegExp();
		}
		reset() {
			if (this.options) this.init(this.options);
		}
		resetRegExp() {
			const getOrResetRegExp = (existingRegExp, pattern) => {
				if (existingRegExp?.source === pattern) {
					existingRegExp.lastIndex = 0;
					return existingRegExp;
				}
				return new RegExp(pattern, "g");
			};
			this.regexp = getOrResetRegExp(this.regexp, `${this.prefix}(.+?)${this.suffix}`);
			this.regexpUnescape = getOrResetRegExp(this.regexpUnescape, `${this.prefix}${this.unescapePrefix}(.+?)${this.unescapeSuffix}${this.suffix}`);
			this.nestingRegexp = getOrResetRegExp(this.nestingRegexp, `${this.nestingPrefix}((?:[^()"']+|"[^"]*"|'[^']*'|\\((?:[^()]|"[^"]*"|'[^']*')*\\))*?)${this.nestingSuffix}`);
		}
		interpolate(str, data, lng, options) {
			let match;
			let value;
			let replaces;
			const defaultData = this.options && this.options.interpolation && this.options.interpolation.defaultVariables || {};
			const handleFormat = (key) => {
				if (!key.includes(this.formatSeparator)) {
					const path = deepFindWithDefaults(data, defaultData, key, this.options.keySeparator, this.options.ignoreJSONStructure);
					return this.alwaysFormat ? this.format(path, void 0, lng, {
						...options,
						...data,
						interpolationkey: key
					}) : path;
				}
				const p = key.split(this.formatSeparator);
				const k = p.shift().trim();
				const f = p.join(this.formatSeparator).trim();
				return this.format(deepFindWithDefaults(data, defaultData, k, this.options.keySeparator, this.options.ignoreJSONStructure), f, lng, {
					...options,
					...data,
					interpolationkey: k
				});
			};
			this.resetRegExp();
			if (!this.escapeValue && typeof str === "string" && /\$t\([^)]*\{[^}]*\{\{/.test(str)) this.logger.warn("nesting options string contains interpolated variables with escapeValue: false — if any of those values are attacker-controlled they can inject additional nesting options (e.g. redirect lng/ns). Sanitise untrusted input before passing it to t(), or keep escapeValue: true.");
			const missingInterpolationHandler = options?.missingInterpolationHandler || this.options.missingInterpolationHandler;
			const skipOnVariables = options?.interpolation?.skipOnVariables !== void 0 ? options.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables;
			[{
				regex: this.regexpUnescape,
				safeValue: (val) => val
			}, {
				regex: this.regexp,
				safeValue: (val) => this.escapeValue ? this.escape(val) : val
			}].forEach((todo) => {
				replaces = 0;
				while (match = todo.regex.exec(str)) {
					const matchedVar = match[1].trim();
					value = handleFormat(matchedVar);
					if (value === void 0) if (typeof missingInterpolationHandler === "function") {
						const temp = missingInterpolationHandler(str, match, options);
						value = isString(temp) ? temp : "";
					} else if (options && Object.prototype.hasOwnProperty.call(options, matchedVar)) value = "";
					else if (skipOnVariables) {
						value = match[0];
						continue;
					} else {
						this.logger.warn(`missed to pass in variable ${matchedVar} for interpolating ${str}`);
						value = "";
					}
					else if (!isString(value) && !this.useRawValueToEscape) value = makeString(value);
					const safeValue = todo.safeValue(value);
					str = str.replace(match[0], regexSafe(safeValue));
					if (skipOnVariables) {
						todo.regex.lastIndex += safeValue.length;
						todo.regex.lastIndex -= match[0].length;
					} else todo.regex.lastIndex = 0;
					replaces++;
					if (replaces >= this.maxReplaces) break;
				}
			});
			return str;
		}
		nest(str, fc, options = {}) {
			let match;
			let value;
			let clonedOptions;
			const handleHasOptions = (key, inheritedOptions) => {
				const sep = this.nestingOptionsSeparator;
				if (!key.includes(sep)) return key;
				const c = key.split(new RegExp(`${regexEscape(sep)}[ ]*{`));
				let optionsString = `{${c[1]}`;
				key = c[0];
				optionsString = this.interpolate(optionsString, clonedOptions);
				const matchedSingleQuotes = optionsString.match(/'/g);
				const matchedDoubleQuotes = optionsString.match(/"/g);
				if ((matchedSingleQuotes?.length ?? 0) % 2 === 0 && !matchedDoubleQuotes || (matchedDoubleQuotes?.length ?? 0) % 2 !== 0) optionsString = optionsString.replace(/'/g, "\"");
				try {
					clonedOptions = JSON.parse(optionsString);
					if (inheritedOptions) clonedOptions = {
						...inheritedOptions,
						...clonedOptions
					};
				} catch (e) {
					this.logger.warn(`failed parsing options string in nesting for key ${key}`, e);
					return `${key}${sep}${optionsString}`;
				}
				if (clonedOptions.defaultValue && clonedOptions.defaultValue.includes(this.prefix)) delete clonedOptions.defaultValue;
				return key;
			};
			while (match = this.nestingRegexp.exec(str)) {
				let formatters = [];
				clonedOptions = { ...options };
				clonedOptions = clonedOptions.replace && !isString(clonedOptions.replace) ? clonedOptions.replace : clonedOptions;
				clonedOptions.applyPostProcessor = false;
				delete clonedOptions.defaultValue;
				const keyEndIndex = /{.*}/s.test(match[1]) ? match[1].lastIndexOf("}") + 1 : match[1].indexOf(this.formatSeparator);
				if (keyEndIndex !== -1) {
					formatters = match[1].slice(keyEndIndex).split(this.formatSeparator).map((elem) => elem.trim()).filter(Boolean);
					match[1] = match[1].slice(0, keyEndIndex);
				}
				value = fc(handleHasOptions.call(this, match[1].trim(), clonedOptions), clonedOptions);
				if (value && match[0] === str && !isString(value)) return value;
				if (!isString(value)) value = makeString(value);
				if (!value) {
					this.logger.warn(`missed to resolve ${match[1]} for nesting ${str}`);
					value = "";
				}
				if (formatters.length) value = formatters.reduce((v, f) => this.format(v, f, options.lng, {
					...options,
					interpolationkey: match[1].trim()
				}), value.trim());
				str = str.replace(match[0], value);
				this.regexp.lastIndex = 0;
			}
			return str;
		}
	};
	const parseFormatStr = (formatStr) => {
		let formatName = formatStr.toLowerCase().trim();
		const formatOptions = {};
		if (formatStr.includes("(")) {
			const p = formatStr.split("(");
			formatName = p[0].toLowerCase().trim();
			const optStr = p[1].slice(0, -1);
			if (formatName === "currency" && !optStr.includes(":")) {
				if (!formatOptions.currency) formatOptions.currency = optStr.trim();
			} else if (formatName === "relativetime" && !optStr.includes(":")) {
				if (!formatOptions.range) formatOptions.range = optStr.trim();
			} else optStr.split(";").forEach((opt) => {
				if (opt) {
					const [key, ...rest] = opt.split(":");
					const val = rest.join(":").trim().replace(/^'+|'+$/g, "");
					const trimmedKey = key.trim();
					if (!formatOptions[trimmedKey]) formatOptions[trimmedKey] = val;
					if (val === "false") formatOptions[trimmedKey] = false;
					if (val === "true") formatOptions[trimmedKey] = true;
					if (!isNaN(val)) formatOptions[trimmedKey] = parseInt(val, 10);
				}
			});
		}
		return {
			formatName,
			formatOptions
		};
	};
	const createCachedFormatter = (fn) => {
		const cache = {};
		return (v, l, o) => {
			let optForCache = o;
			if (o && o.interpolationkey && o.formatParams && o.formatParams[o.interpolationkey] && o[o.interpolationkey]) optForCache = {
				...optForCache,
				[o.interpolationkey]: void 0
			};
			const key = l + JSON.stringify(optForCache);
			let frm = cache[key];
			if (!frm) {
				frm = fn(getCleanedCode(l), o);
				cache[key] = frm;
			}
			return frm(v);
		};
	};
	const createNonCachedFormatter = (fn) => (v, l, o) => fn(getCleanedCode(l), o)(v);
	var Formatter = class {
		constructor(options = {}) {
			this.logger = baseLogger.create("formatter");
			this.options = options;
			this.init(options);
		}
		init(services, options = { interpolation: {} }) {
			this.formatSeparator = options.interpolation.formatSeparator || ",";
			const cf = options.cacheInBuiltFormats ? createCachedFormatter : createNonCachedFormatter;
			this.formats = {
				number: cf((lng, opt) => {
					const formatter = new Intl.NumberFormat(lng, { ...opt });
					return (val) => formatter.format(val);
				}),
				currency: cf((lng, opt) => {
					const formatter = new Intl.NumberFormat(lng, {
						...opt,
						style: "currency"
					});
					return (val) => formatter.format(val);
				}),
				datetime: cf((lng, opt) => {
					const formatter = new Intl.DateTimeFormat(lng, { ...opt });
					return (val) => formatter.format(val);
				}),
				relativetime: cf((lng, opt) => {
					const formatter = new Intl.RelativeTimeFormat(lng, { ...opt });
					return (val) => formatter.format(val, opt.range || "day");
				}),
				list: cf((lng, opt) => {
					const formatter = new Intl.ListFormat(lng, { ...opt });
					return (val) => formatter.format(val);
				})
			};
		}
		add(name, fc) {
			this.formats[name.toLowerCase().trim()] = fc;
		}
		addCached(name, fc) {
			this.formats[name.toLowerCase().trim()] = createCachedFormatter(fc);
		}
		format(value, format, lng, options = {}) {
			if (!format) return value;
			if (value == null) return value;
			const rawFormats = format.split(this.formatSeparator);
			const formats = [];
			for (let i = 0; i < rawFormats.length; i++) {
				let f = rawFormats[i];
				while (f.indexOf("(") > -1 && !f.includes(")") && i + 1 < rawFormats.length) f = `${f}${this.formatSeparator}${rawFormats[++i]}`;
				formats.push(f);
			}
			return formats.reduce((mem, f) => {
				const { formatName, formatOptions } = parseFormatStr(f);
				if (this.formats[formatName]) {
					let formatted = mem;
					try {
						const valOptions = options?.formatParams?.[options.interpolationkey] || {};
						const l = valOptions.locale || valOptions.lng || options.locale || options.lng || lng;
						formatted = this.formats[formatName](mem, l, {
							...formatOptions,
							...options,
							...valOptions
						});
					} catch (error) {
						this.logger.warn(error);
					}
					return formatted;
				} else this.logger.warn(`there was no format function for ${formatName}`);
				return mem;
			}, value);
		}
	};
	const removePending = (q, name) => {
		if (q.pending[name] !== void 0) {
			delete q.pending[name];
			q.pendingCount--;
		}
	};
	var Connector = class extends EventEmitter$1 {
		constructor(backend, store, services, options = {}) {
			super();
			this.backend = backend;
			this.store = store;
			this.services = services;
			this.languageUtils = services.languageUtils;
			this.options = options;
			this.logger = baseLogger.create("backendConnector");
			this.waitingReads = [];
			this.maxParallelReads = options.maxParallelReads || 10;
			this.readingCalls = 0;
			this.maxRetries = options.maxRetries >= 0 ? options.maxRetries : 5;
			this.retryTimeout = options.retryTimeout >= 1 ? options.retryTimeout : 350;
			this.state = {};
			this.queue = [];
			this.backend?.init?.(services, options.backend, options);
		}
		queueLoad(languages, namespaces, options, callback) {
			const toLoad = {};
			const pending = {};
			const toLoadLanguages = {};
			const toLoadNamespaces = {};
			languages.forEach((lng) => {
				let hasAllNamespaces = true;
				namespaces.forEach((ns) => {
					const name = `${lng}|${ns}`;
					if (!options.reload && this.store.hasResourceBundle(lng, ns)) this.state[name] = 2;
					else if (this.state[name] < 0);
					else if (this.state[name] === 1) {
						if (pending[name] === void 0) pending[name] = true;
					} else {
						this.state[name] = 1;
						hasAllNamespaces = false;
						if (pending[name] === void 0) pending[name] = true;
						if (toLoad[name] === void 0) toLoad[name] = true;
						if (toLoadNamespaces[ns] === void 0) toLoadNamespaces[ns] = true;
					}
				});
				if (!hasAllNamespaces) toLoadLanguages[lng] = true;
			});
			if (Object.keys(toLoad).length || Object.keys(pending).length) this.queue.push({
				pending,
				pendingCount: Object.keys(pending).length,
				loaded: {},
				errors: [],
				callback
			});
			return {
				toLoad: Object.keys(toLoad),
				pending: Object.keys(pending),
				toLoadLanguages: Object.keys(toLoadLanguages),
				toLoadNamespaces: Object.keys(toLoadNamespaces)
			};
		}
		loaded(name, err, data) {
			const s = name.split("|");
			const lng = s[0];
			const ns = s[1];
			if (err) this.emit("failedLoading", lng, ns, err);
			if (!err && data) this.store.addResourceBundle(lng, ns, data, void 0, void 0, { skipCopy: true });
			this.state[name] = err ? -1 : 2;
			if (err && data) this.state[name] = 0;
			const loaded = {};
			this.queue.forEach((q) => {
				pushPath(q.loaded, [lng], ns);
				removePending(q, name);
				if (err) q.errors.push(err);
				if (q.pendingCount === 0 && !q.done) {
					Object.keys(q.loaded).forEach((l) => {
						if (!loaded[l]) loaded[l] = {};
						const loadedKeys = q.loaded[l];
						if (loadedKeys.length) loadedKeys.forEach((n) => {
							if (loaded[l][n] === void 0) loaded[l][n] = true;
						});
					});
					q.done = true;
					if (q.errors.length) q.callback(q.errors);
					else q.callback();
				}
			});
			this.emit("loaded", loaded);
			this.queue = this.queue.filter((q) => !q.done);
		}
		read(lng, ns, fcName, tried = 0, wait = this.retryTimeout, callback) {
			if (!lng.length) return callback(null, {});
			if (this.readingCalls >= this.maxParallelReads) {
				this.waitingReads.push({
					lng,
					ns,
					fcName,
					tried,
					wait,
					callback
				});
				return;
			}
			this.readingCalls++;
			const resolver = (err, data) => {
				this.readingCalls--;
				if (this.waitingReads.length > 0) {
					const next = this.waitingReads.shift();
					this.read(next.lng, next.ns, next.fcName, next.tried, next.wait, next.callback);
				}
				if (err && data && tried < this.maxRetries) {
					setTimeout(() => {
						this.read(lng, ns, fcName, tried + 1, wait * 2, callback);
					}, wait);
					return;
				}
				callback(err, data);
			};
			const fc = this.backend[fcName].bind(this.backend);
			if (fc.length === 2) {
				try {
					const r = fc(lng, ns);
					if (r && typeof r.then === "function") r.then((data) => resolver(null, data)).catch(resolver);
					else resolver(null, r);
				} catch (err) {
					resolver(err);
				}
				return;
			}
			return fc(lng, ns, resolver);
		}
		prepareLoading(languages, namespaces, options = {}, callback) {
			if (!this.backend) {
				this.logger.warn("No backend was added via i18next.use. Will not load resources.");
				return callback && callback();
			}
			if (isString(languages)) languages = this.languageUtils.toResolveHierarchy(languages);
			if (isString(namespaces)) namespaces = [namespaces];
			const toLoad = this.queueLoad(languages, namespaces, options, callback);
			if (!toLoad.toLoad.length) {
				if (!toLoad.pending.length) callback();
				return null;
			}
			toLoad.toLoad.forEach((name) => {
				this.loadOne(name);
			});
		}
		load(languages, namespaces, callback) {
			this.prepareLoading(languages, namespaces, {}, callback);
		}
		reload(languages, namespaces, callback) {
			this.prepareLoading(languages, namespaces, { reload: true }, callback);
		}
		loadOne(name, prefix = "") {
			const s = name.split("|");
			const lng = s[0];
			const ns = s[1];
			this.read(lng, ns, "read", void 0, void 0, (err, data) => {
				if (err) this.logger.warn(`${prefix}loading namespace ${ns} for language ${lng} failed`, err);
				if (!err && data) this.logger.log(`${prefix}loaded namespace ${ns} for language ${lng}`, data);
				this.loaded(name, err, data);
			});
		}
		saveMissing(languages, namespace, key, fallbackValue, isUpdate, options = {}, clb = () => {}) {
			if (this.services?.utils?.hasLoadedNamespace && !this.services?.utils?.hasLoadedNamespace(namespace)) {
				this.logger.warn(`did not save key "${key}" as the namespace "${namespace}" was not yet loaded`, "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!");
				return;
			}
			if (key === void 0 || key === null || key === "") return;
			if (this.backend?.create) {
				const opts = {
					...options,
					isUpdate
				};
				const fc = this.backend.create.bind(this.backend);
				if (fc.length < 6) try {
					let r;
					if (fc.length === 5) r = fc(languages, namespace, key, fallbackValue, opts);
					else r = fc(languages, namespace, key, fallbackValue);
					if (r && typeof r.then === "function") r.then((data) => clb(null, data)).catch(clb);
					else clb(null, r);
				} catch (err) {
					clb(err);
				}
				else fc(languages, namespace, key, fallbackValue, clb, opts);
			}
			if (!languages || !languages[0]) return;
			this.store.addResource(languages[0], namespace, key, fallbackValue);
		}
	};
	const get = () => ({
		debug: false,
		initAsync: true,
		ns: ["translation"],
		defaultNS: ["translation"],
		fallbackLng: ["dev"],
		fallbackNS: false,
		supportedLngs: false,
		nonExplicitSupportedLngs: false,
		load: "all",
		preload: false,
		keySeparator: ".",
		nsSeparator: ":",
		pluralSeparator: "_",
		contextSeparator: "_",
		enableSelector: false,
		partialBundledLanguages: false,
		saveMissing: false,
		updateMissing: false,
		saveMissingTo: "fallback",
		saveMissingPlurals: true,
		missingKeyHandler: false,
		missingInterpolationHandler: false,
		postProcess: false,
		postProcessPassResolved: false,
		returnNull: false,
		returnEmptyString: true,
		returnObjects: false,
		joinArrays: false,
		returnedObjectHandler: false,
		parseMissingKeyHandler: false,
		appendNamespaceToMissingKey: false,
		appendNamespaceToCIMode: false,
		overloadTranslationOptionHandler: (args) => {
			let ret = {};
			if (typeof args[1] === "object") ret = args[1];
			if (isString(args[1])) ret.defaultValue = args[1];
			if (isString(args[2])) ret.tDescription = args[2];
			if (typeof args[2] === "object" || typeof args[3] === "object") {
				const options = args[3] || args[2];
				Object.keys(options).forEach((key) => {
					ret[key] = options[key];
				});
			}
			return ret;
		},
		interpolation: {
			escapeValue: true,
			prefix: "{{",
			suffix: "}}",
			formatSeparator: ",",
			unescapePrefix: "-",
			nestingPrefix: "$t(",
			nestingSuffix: ")",
			nestingOptionsSeparator: ",",
			maxReplaces: 1e3,
			skipOnVariables: true
		},
		cacheInBuiltFormats: true
	});
	const transformOptions = (options) => {
		if (isString(options.ns)) options.ns = [options.ns];
		if (isString(options.fallbackLng)) options.fallbackLng = [options.fallbackLng];
		if (isString(options.fallbackNS)) options.fallbackNS = [options.fallbackNS];
		if (options.supportedLngs && !options.supportedLngs.includes("cimode")) options.supportedLngs = options.supportedLngs.concat(["cimode"]);
		return options;
	};
	const noop = () => {};
	const bindMemberFunctions = (inst) => {
		Object.getOwnPropertyNames(Object.getPrototypeOf(inst)).forEach((mem) => {
			if (typeof inst[mem] === "function") inst[mem] = inst[mem].bind(inst);
		});
	};
	const instance = class I18n extends EventEmitter$1 {
		constructor(options = {}, callback) {
			super();
			this.options = transformOptions(options);
			this.services = {};
			this.logger = baseLogger;
			this.modules = { external: [] };
			bindMemberFunctions(this);
			if (callback && !this.isInitialized && !options.isClone) {
				if (!this.options.initAsync) {
					this.init(options, callback);
					return this;
				}
				setTimeout(() => {
					this.init(options, callback);
				}, 0);
			}
		}
		init(options = {}, callback) {
			this.isInitializing = true;
			if (typeof options === "function") {
				callback = options;
				options = {};
			}
			if (options.defaultNS == null && options.ns) {
				if (isString(options.ns)) options.defaultNS = options.ns;
				else if (!options.ns.includes("translation")) options.defaultNS = options.ns[0];
			}
			const defOpts = get();
			this.options = {
				...defOpts,
				...this.options,
				...transformOptions(options)
			};
			this.options.interpolation = {
				...defOpts.interpolation,
				...this.options.interpolation
			};
			if (options.keySeparator !== void 0) this.options.userDefinedKeySeparator = options.keySeparator;
			if (options.nsSeparator !== void 0) this.options.userDefinedNsSeparator = options.nsSeparator;
			if (typeof this.options.overloadTranslationOptionHandler !== "function") this.options.overloadTranslationOptionHandler = defOpts.overloadTranslationOptionHandler;
			const createClassOnDemand = (ClassOrObject) => {
				if (!ClassOrObject) return null;
				if (typeof ClassOrObject === "function") return new ClassOrObject();
				return ClassOrObject;
			};
			if (!this.options.isClone) {
				if (this.modules.logger) baseLogger.init(createClassOnDemand(this.modules.logger), this.options);
				else baseLogger.init(null, this.options);
				let formatter;
				if (this.modules.formatter) formatter = this.modules.formatter;
				else formatter = Formatter;
				const lu = new LanguageUtil(this.options);
				this.store = new ResourceStore(this.options.resources, this.options);
				const s = this.services;
				s.logger = baseLogger;
				s.resourceStore = this.store;
				s.languageUtils = lu;
				s.pluralResolver = new PluralResolver(lu, { prepend: this.options.pluralSeparator });
				if (formatter) {
					s.formatter = createClassOnDemand(formatter);
					if (s.formatter.init) s.formatter.init(s, this.options);
					this.options.interpolation.format = s.formatter.format.bind(s.formatter);
				}
				s.interpolator = new Interpolator(this.options);
				s.utils = { hasLoadedNamespace: this.hasLoadedNamespace.bind(this) };
				s.backendConnector = new Connector(createClassOnDemand(this.modules.backend), s.resourceStore, s, this.options);
				s.backendConnector.on("*", (event, ...args) => {
					this.emit(event, ...args);
				});
				if (this.modules.languageDetector) {
					s.languageDetector = createClassOnDemand(this.modules.languageDetector);
					if (s.languageDetector.init) s.languageDetector.init(s, this.options.detection, this.options);
				}
				if (this.modules.i18nFormat) {
					s.i18nFormat = createClassOnDemand(this.modules.i18nFormat);
					if (s.i18nFormat.init) s.i18nFormat.init(this);
				}
				this.translator = new Translator(this.services, this.options);
				this.translator.on("*", (event, ...args) => {
					this.emit(event, ...args);
				});
				this.modules.external.forEach((m) => {
					if (m.init) m.init(this);
				});
			}
			this.format = this.options.interpolation.format;
			if (!callback) callback = noop;
			if (this.options.fallbackLng && !this.services.languageDetector && !this.options.lng) {
				const codes = this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);
				if (codes.length > 0 && codes[0] !== "dev") this.options.lng = codes[0];
			}
			if (!this.services.languageDetector && !this.options.lng) this.logger.warn("init: no languageDetector is used and no lng is defined");
			[
				"getResource",
				"hasResourceBundle",
				"getResourceBundle",
				"getDataByLanguage"
			].forEach((fcName) => {
				this[fcName] = (...args) => this.store[fcName](...args);
			});
			[
				"addResource",
				"addResources",
				"addResourceBundle",
				"removeResourceBundle"
			].forEach((fcName) => {
				this[fcName] = (...args) => {
					this.store[fcName](...args);
					return this;
				};
			});
			const deferred = defer();
			const load = () => {
				const finish = (err, t) => {
					this.isInitializing = false;
					if (this.isInitialized && !this.initializedStoreOnce) this.logger.warn("init: i18next is already initialized. You should call init just once!");
					this.isInitialized = true;
					if (!this.options.isClone) this.logger.log("initialized", this.options);
					this.emit("initialized", this.options);
					deferred.resolve(t);
					callback(err, t);
				};
				if ((this.languages || this.isLanguageChangingTo) && !this.isInitialized) return finish(null, this.t.bind(this));
				this.changeLanguage(this.options.lng, finish);
			};
			if (this.options.resources || !this.options.initAsync) load();
			else setTimeout(load, 0);
			return deferred;
		}
		loadResources(language, callback = noop) {
			let usedCallback = callback;
			const usedLng = isString(language) ? language : this.language;
			if (typeof language === "function") usedCallback = language;
			if (!this.options.resources || this.options.partialBundledLanguages) {
				if (usedLng?.toLowerCase() === "cimode" && (!this.options.preload || this.options.preload.length === 0)) return usedCallback();
				const toLoad = [];
				const append = (lng) => {
					if (!lng) return;
					if (lng === "cimode") return;
					this.services.languageUtils.toResolveHierarchy(lng).forEach((l) => {
						if (l === "cimode") return;
						if (!toLoad.includes(l)) toLoad.push(l);
					});
				};
				if (!usedLng) this.services.languageUtils.getFallbackCodes(this.options.fallbackLng).forEach((l) => append(l));
				else append(usedLng);
				this.options.preload?.forEach?.((l) => append(l));
				this.services.backendConnector.load(toLoad, this.options.ns, (e) => {
					if (!e && !this.resolvedLanguage && this.language) this.setResolvedLanguage(this.language);
					usedCallback(e);
				});
			} else usedCallback(null);
		}
		reloadResources(lngs, ns, callback) {
			const deferred = defer();
			if (typeof lngs === "function") {
				callback = lngs;
				lngs = void 0;
			}
			if (typeof ns === "function") {
				callback = ns;
				ns = void 0;
			}
			if (!lngs) lngs = this.languages;
			if (!ns) ns = this.options.ns;
			if (!callback) callback = noop;
			this.services.backendConnector.reload(lngs, ns, (err) => {
				deferred.resolve();
				callback(err);
			});
			return deferred;
		}
		use(module) {
			if (!module) throw new Error("You are passing an undefined module! Please check the object you are passing to i18next.use()");
			if (!module.type) throw new Error("You are passing a wrong module! Please check the object you are passing to i18next.use()");
			if (module.type === "backend") this.modules.backend = module;
			if (module.type === "logger" || module.log && module.warn && module.error) this.modules.logger = module;
			if (module.type === "languageDetector") this.modules.languageDetector = module;
			if (module.type === "i18nFormat") this.modules.i18nFormat = module;
			if (module.type === "postProcessor") postProcessor.addPostProcessor(module);
			if (module.type === "formatter") this.modules.formatter = module;
			if (module.type === "3rdParty") this.modules.external.push(module);
			return this;
		}
		setResolvedLanguage(l) {
			if (!l || !this.languages) return;
			if (["cimode", "dev"].includes(l)) return;
			for (let li = 0; li < this.languages.length; li++) {
				const lngInLngs = this.languages[li];
				if (["cimode", "dev"].includes(lngInLngs)) continue;
				if (this.store.hasLanguageSomeTranslations(lngInLngs)) {
					this.resolvedLanguage = lngInLngs;
					break;
				}
			}
			if (!this.resolvedLanguage && !this.languages.includes(l) && this.store.hasLanguageSomeTranslations(l)) {
				this.resolvedLanguage = l;
				this.languages.unshift(l);
			}
		}
		changeLanguage(lng, callback) {
			this.isLanguageChangingTo = lng;
			const deferred = defer();
			this.emit("languageChanging", lng);
			const setLngProps = (l) => {
				this.language = l;
				this.languages = this.services.languageUtils.toResolveHierarchy(l);
				this.resolvedLanguage = void 0;
				this.setResolvedLanguage(l);
			};
			const done = (err, l) => {
				if (l) {
					if (this.isLanguageChangingTo === lng) {
						setLngProps(l);
						this.translator.changeLanguage(l);
						this.isLanguageChangingTo = void 0;
						this.emit("languageChanged", l);
						this.logger.log("languageChanged", l);
					}
				} else this.isLanguageChangingTo = void 0;
				deferred.resolve((...args) => this.t(...args));
				if (callback) callback(err, (...args) => this.t(...args));
			};
			const setLng = (lngs) => {
				if (!lng && !lngs && this.services.languageDetector) lngs = [];
				const fl = isString(lngs) ? lngs : lngs && lngs[0];
				const l = this.store.hasLanguageSomeTranslations(fl) ? fl : this.services.languageUtils.getBestMatchFromCodes(isString(lngs) ? [lngs] : lngs);
				if (l) {
					if (!this.language) setLngProps(l);
					if (!this.translator.language) this.translator.changeLanguage(l);
					this.services.languageDetector?.cacheUserLanguage?.(l);
				}
				this.loadResources(l, (err) => {
					done(err, l);
				});
			};
			if (!lng && this.services.languageDetector && !this.services.languageDetector.async) setLng(this.services.languageDetector.detect());
			else if (!lng && this.services.languageDetector && this.services.languageDetector.async) if (this.services.languageDetector.detect.length === 0) this.services.languageDetector.detect().then(setLng);
			else this.services.languageDetector.detect(setLng);
			else setLng(lng);
			return deferred;
		}
		getFixedT(lng, ns, keyPrefix, fixedOpts) {
			const scopeNs = fixedOpts?.scopeNs;
			const fixedT = (key, opts, ...rest) => {
				let o;
				if (typeof opts !== "object") o = this.options.overloadTranslationOptionHandler([key, opts].concat(rest));
				else o = { ...opts };
				o.lng = o.lng || fixedT.lng;
				o.lngs = o.lngs || fixedT.lngs;
				const explicitCallNs = o.ns !== void 0 && o.ns !== null;
				o.ns = o.ns || fixedT.ns;
				if (o.keyPrefix !== "") o.keyPrefix = o.keyPrefix || keyPrefix || fixedT.keyPrefix;
				const selectorOpts = {
					...this.options,
					...o
				};
				if (Array.isArray(scopeNs) && !explicitCallNs) selectorOpts.ns = scopeNs;
				if (typeof o.keyPrefix === "function") o.keyPrefix = keysFromSelector(o.keyPrefix, selectorOpts);
				const keySeparator = this.options.keySeparator || ".";
				let resultKey;
				if (o.keyPrefix && Array.isArray(key)) resultKey = key.map((k) => {
					if (typeof k === "function") k = keysFromSelector(k, selectorOpts);
					return `${o.keyPrefix}${keySeparator}${k}`;
				});
				else {
					if (typeof key === "function") key = keysFromSelector(key, selectorOpts);
					resultKey = o.keyPrefix ? `${o.keyPrefix}${keySeparator}${key}` : key;
				}
				return this.t(resultKey, o);
			};
			if (isString(lng)) fixedT.lng = lng;
			else fixedT.lngs = lng;
			fixedT.ns = ns;
			fixedT.keyPrefix = keyPrefix;
			return fixedT;
		}
		t(...args) {
			return this.translator?.translate(...args);
		}
		exists(...args) {
			return this.translator?.exists(...args);
		}
		setDefaultNamespace(ns) {
			this.options.defaultNS = ns;
		}
		hasLoadedNamespace(ns, options = {}) {
			if (!this.isInitialized) {
				this.logger.warn("hasLoadedNamespace: i18next was not initialized", this.languages);
				return false;
			}
			if (!this.languages || !this.languages.length) {
				this.logger.warn("hasLoadedNamespace: i18n.languages were undefined or empty", this.languages);
				return false;
			}
			const lng = options.lng || this.resolvedLanguage || this.languages[0];
			const fallbackLng = this.options ? this.options.fallbackLng : false;
			const lastLng = this.languages[this.languages.length - 1];
			if (lng.toLowerCase() === "cimode") return true;
			const loadNotPending = (l, n) => {
				const loadState = this.services.backendConnector.state[`${l}|${n}`];
				return loadState === -1 || loadState === 0 || loadState === 2;
			};
			if (options.precheck) {
				const preResult = options.precheck(this, loadNotPending);
				if (preResult !== void 0) return preResult;
			}
			if (this.hasResourceBundle(lng, ns)) return true;
			if (!this.services.backendConnector.backend || this.options.resources && !this.options.partialBundledLanguages) return true;
			if (loadNotPending(lng, ns) && (!fallbackLng || loadNotPending(lastLng, ns))) return true;
			return false;
		}
		loadNamespaces(ns, callback) {
			const deferred = defer();
			if (!this.options.ns) {
				if (callback) callback();
				return Promise.resolve();
			}
			if (isString(ns)) ns = [ns];
			ns.forEach((n) => {
				if (!this.options.ns.includes(n)) this.options.ns.push(n);
			});
			this.loadResources((err) => {
				deferred.resolve();
				if (callback) callback(err);
			});
			return deferred;
		}
		loadLanguages(lngs, callback) {
			const deferred = defer();
			if (isString(lngs)) lngs = [lngs];
			const preloaded = this.options.preload || [];
			const newLngs = lngs.filter((lng) => !preloaded.includes(lng) && this.services.languageUtils.isSupportedCode(lng));
			if (!newLngs.length) {
				if (callback) callback();
				return Promise.resolve();
			}
			this.options.preload = preloaded.concat(newLngs);
			this.loadResources((err) => {
				deferred.resolve();
				if (callback) callback(err);
			});
			return deferred;
		}
		dir(lng) {
			if (!lng) lng = this.resolvedLanguage || (this.languages?.length > 0 ? this.languages[0] : this.language);
			if (!lng) return "rtl";
			try {
				const l = new Intl.Locale(lng);
				if (l && l.getTextInfo) {
					const ti = l.getTextInfo();
					if (ti && ti.direction) return ti.direction;
				}
			} catch (e) {}
			const rtlLngs = [
				"ar",
				"shu",
				"sqr",
				"ssh",
				"xaa",
				"yhd",
				"yud",
				"aao",
				"abh",
				"abv",
				"acm",
				"acq",
				"acw",
				"acx",
				"acy",
				"adf",
				"ads",
				"aeb",
				"aec",
				"afb",
				"ajp",
				"apc",
				"apd",
				"arb",
				"arq",
				"ars",
				"ary",
				"arz",
				"auz",
				"avl",
				"ayh",
				"ayl",
				"ayn",
				"ayp",
				"bbz",
				"pga",
				"he",
				"iw",
				"ps",
				"pbt",
				"pbu",
				"pst",
				"prp",
				"prd",
				"ug",
				"ur",
				"ydd",
				"yds",
				"yih",
				"ji",
				"yi",
				"hbo",
				"men",
				"xmn",
				"fa",
				"jpr",
				"peo",
				"pes",
				"prs",
				"dv",
				"sam",
				"ckb"
			];
			const languageUtils = this.services?.languageUtils || new LanguageUtil(get());
			if (lng.toLowerCase().indexOf("-latn") > 1) return "ltr";
			return rtlLngs.includes(languageUtils.getLanguagePartFromCode(lng)) || lng.toLowerCase().indexOf("-arab") > 1 ? "rtl" : "ltr";
		}
		static createInstance(options = {}, callback) {
			const instance = new I18n(options, callback);
			instance.createInstance = I18n.createInstance;
			return instance;
		}
		cloneInstance(options = {}, callback = noop) {
			const forkResourceStore = options.forkResourceStore;
			if (forkResourceStore) delete options.forkResourceStore;
			const mergedOptions = {
				...this.options,
				...options,
				isClone: true
			};
			const clone = new I18n(mergedOptions);
			if (options.debug !== void 0 || options.prefix !== void 0) clone.logger = clone.logger.clone(options);
			[
				"store",
				"services",
				"language"
			].forEach((m) => {
				clone[m] = this[m];
			});
			clone.services = { ...this.services };
			clone.services.utils = { hasLoadedNamespace: clone.hasLoadedNamespace.bind(clone) };
			if (forkResourceStore) {
				clone.store = new ResourceStore(Object.keys(this.store.data).reduce((prev, l) => {
					prev[l] = { ...this.store.data[l] };
					prev[l] = Object.keys(prev[l]).reduce((acc, n) => {
						acc[n] = { ...prev[l][n] };
						return acc;
					}, prev[l]);
					return prev;
				}, {}), mergedOptions);
				clone.services.resourceStore = clone.store;
			}
			if (options.interpolation) {
				const mergedInterpolation = {
					...get().interpolation,
					...this.options.interpolation,
					...options.interpolation
				};
				const mergedForInterpolator = {
					...mergedOptions,
					interpolation: mergedInterpolation
				};
				clone.services.interpolator = new Interpolator(mergedForInterpolator);
			}
			clone.translator = new Translator(clone.services, mergedOptions);
			clone.translator.on("*", (event, ...args) => {
				clone.emit(event, ...args);
			});
			clone.init(mergedOptions, callback);
			clone.translator.options = mergedOptions;
			clone.translator.backendConnector.services.utils = { hasLoadedNamespace: clone.hasLoadedNamespace.bind(clone) };
			return clone;
		}
		toJSON() {
			return {
				options: this.options,
				store: this.store,
				language: this.language,
				languages: this.languages,
				resolvedLanguage: this.resolvedLanguage
			};
		}
	}.createInstance();
	instance.createInstance;
	instance.dir;
	instance.init;
	instance.loadResources;
	instance.reloadResources;
	instance.use;
	instance.changeLanguage;
	instance.getFixedT;
	instance.t;
	instance.exists;
	instance.setDefaultNamespace;
	instance.hasLoadedNamespace;
	instance.loadNamespaces;
	instance.loadLanguages;
	//#endregion
	//#region node_modules/i18next-http-backend/esm/index.js
	const arr = [];
	arr.forEach;
	arr.slice;
	const UNSAFE_KEYS$1 = [
		"__proto__",
		"constructor",
		"prototype"
	];
	function isSafeUrlSegmentBase(v) {
		if (typeof v !== "string") return false;
		if (v.length === 0 || v.length > 128) return false;
		if (UNSAFE_KEYS$1.indexOf(v) > -1) return false;
		if (v.indexOf("..") > -1) return false;
		if (v.indexOf("\\") > -1) return false;
		if (/[?#%:\s]/.test(v)) return false;
		if (/[\x00-\x1F\x7F]/.test(v)) return false;
		return true;
	}
	function isSafeLangUrlSegment(v) {
		if (!isSafeUrlSegmentBase(v)) return false;
		if (v.indexOf("/") > -1 || v.indexOf("@") > -1) return false;
		return true;
	}
	function isSafeNsUrlSegment(v) {
		if (!isSafeUrlSegmentBase(v)) return false;
		if (v.indexOf("//") > -1) return false;
		return true;
	}
	const SAFETY_CHECK_BY_KEY = {
		lng: isSafeLangUrlSegment,
		ns: isSafeNsUrlSegment
	};
	function sanitizeLogValue(v) {
		if (typeof v !== "string") return v;
		return v.replace(/[\r\n\x00-\x1F\x7F]/g, " ");
	}
	function redactUrlCredentials(u) {
		if (typeof u !== "string" || u.length === 0) return u;
		try {
			const parsed = new URL(u);
			if (parsed.username || parsed.password) {
				parsed.username = "";
				parsed.password = "";
				return parsed.toString();
			}
			return u;
		} catch (e) {
			return u.replace(/(\/\/)[^/@\s]+@/g, "$1");
		}
	}
	function hasXMLHttpRequest() {
		return typeof XMLHttpRequest === "function" || typeof XMLHttpRequest === "object";
	}
	/**
	* Determine whether the given `maybePromise` is a Promise.
	*
	* @param {*} maybePromise
	*
	* @returns {Boolean}
	*/
	function isPromise(maybePromise) {
		return !!maybePromise && typeof maybePromise.then === "function";
	}
	/**
	* Convert any value to a Promise than will resolve to this value.
	*
	* @param {*} maybePromise
	*
	* @returns {Promise}
	*/
	function makePromise(maybePromise) {
		if (isPromise(maybePromise)) return maybePromise;
		return Promise.resolve(maybePromise);
	}
	const interpolationRegexp = /\{\{(.+?)\}\}/g;
	function interpolateUrl(str, data) {
		let unsafe = false;
		const result = str.replace(interpolationRegexp, (match, key) => {
			const k = key.trim();
			if (UNSAFE_KEYS$1.indexOf(k) > -1) return match;
			const value = data[k];
			if (value == null) return match;
			const check = SAFETY_CHECK_BY_KEY[k] || isSafeLangUrlSegment;
			const segments = String(value).split("+");
			for (const seg of segments) if (!check(seg)) {
				unsafe = true;
				return match;
			}
			return segments.join("+");
		});
		return unsafe ? null : result;
	}
	const g = typeof globalThis !== "undefined" ? globalThis : typeof global !== "undefined" ? global : typeof window !== "undefined" ? window : void 0;
	let fetchApi;
	if (typeof fetch === "function") fetchApi = fetch;
	else if (g && typeof g.fetch === "function") fetchApi = g.fetch;
	const XmlHttpRequestApi = hasXMLHttpRequest() && g ? g.XMLHttpRequest : void 0;
	const ActiveXObjectApi = typeof ActiveXObject === "function" && g ? g.ActiveXObject : void 0;
	const UNSAFE_KEYS = [
		"__proto__",
		"constructor",
		"prototype"
	];
	const addQueryString = (url, params) => {
		if (params && typeof params === "object") {
			let queryString = "";
			for (const paramName of Object.keys(params)) {
				if (UNSAFE_KEYS.indexOf(paramName) > -1) continue;
				queryString += "&" + encodeURIComponent(paramName) + "=" + encodeURIComponent(params[paramName]);
			}
			if (!queryString) return url;
			url = url + (url.indexOf("?") !== -1 ? "&" : "?") + queryString.slice(1);
		}
		return url;
	};
	const fetchIt = (url, fetchOptions, callback, altFetch) => {
		const resolver = (response) => {
			if (!response.ok) return callback(response.statusText || "Error", { status: response.status });
			response.text().then((data) => {
				callback(null, {
					status: response.status,
					data
				});
			}).catch(callback);
		};
		if (altFetch) {
			const altResponse = altFetch(url, fetchOptions);
			if (altResponse instanceof Promise) {
				altResponse.then(resolver).catch(callback);
				return;
			}
		}
		if (typeof fetch === "function") fetch(url, fetchOptions).then(resolver).catch(callback);
		else fetchApi(url, fetchOptions).then(resolver).catch(callback);
	};
	const requestWithFetch = (options, url, payload, callback) => {
		if (options.queryStringParams) url = addQueryString(url, options.queryStringParams);
		const headers = { ...typeof options.customHeaders === "function" ? options.customHeaders() : options.customHeaders };
		if (typeof window === "undefined" && typeof global !== "undefined" && typeof global.process !== "undefined" && global.process.versions && global.process.versions.node) headers["User-Agent"] = `i18next-http-backend (node/${global.process.version}; ${global.process.platform} ${global.process.arch})`;
		if (payload) headers["Content-Type"] = "application/json";
		const reqOptions = typeof options.requestOptions === "function" ? options.requestOptions(payload) : options.requestOptions;
		const fetchOptions = {
			method: payload ? "POST" : "GET",
			body: payload ? options.stringify(payload) : void 0,
			headers,
			...options._omitFetchOptions ? {} : reqOptions
		};
		const altFetch = typeof options.alternateFetch === "function" && options.alternateFetch.length >= 1 ? options.alternateFetch : void 0;
		try {
			fetchIt(url, fetchOptions, callback, altFetch);
		} catch (e) {
			if (!reqOptions || Object.keys(reqOptions).length === 0 || !e.message || e.message.indexOf("not implemented") < 0) return callback(e);
			try {
				Object.keys(reqOptions).forEach((opt) => {
					delete fetchOptions[opt];
				});
				fetchIt(url, fetchOptions, callback, altFetch);
				options._omitFetchOptions = true;
			} catch (err) {
				callback(err);
			}
		}
	};
	const requestWithXmlHttpRequest = (options, url, payload, callback) => {
		if (payload && typeof payload === "object") payload = addQueryString("", payload).slice(1);
		if (options.queryStringParams) url = addQueryString(url, options.queryStringParams);
		try {
			const x = XmlHttpRequestApi ? new XmlHttpRequestApi() : new ActiveXObjectApi("MSXML2.XMLHTTP.3.0");
			x.open(payload ? "POST" : "GET", url, 1);
			if (!options.crossDomain) x.setRequestHeader("X-Requested-With", "XMLHttpRequest");
			x.withCredentials = !!options.withCredentials;
			if (payload) x.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			if (x.overrideMimeType) x.overrideMimeType("application/json");
			let h = options.customHeaders;
			h = typeof h === "function" ? h() : h;
			if (h) for (const i of Object.keys(h)) {
				if (UNSAFE_KEYS.indexOf(i) > -1) continue;
				x.setRequestHeader(i, h[i]);
			}
			x.onreadystatechange = () => {
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
	const request = (options, url, payload, callback) => {
		if (typeof payload === "function") {
			callback = payload;
			payload = void 0;
		}
		callback = callback || (() => {});
		if (fetchApi && url.indexOf("file:") !== 0) return requestWithFetch(options, url, payload, callback);
		if (hasXMLHttpRequest() || typeof ActiveXObject === "function") return requestWithXmlHttpRequest(options, url, payload, callback);
		callback(/* @__PURE__ */ new Error("No fetch and no xhr implementation found!"));
	};
	const getDefaults$2 = () => {
		return {
			loadPath: "/locales/{{lng}}/{{ns}}.json",
			addPath: "/locales/add/{{lng}}/{{ns}}",
			parse: (data) => JSON.parse(data),
			stringify: JSON.stringify,
			parsePayload: (namespace, key, fallbackValue) => ({ [key]: fallbackValue || "" }),
			parseLoadPayload: (languages, namespaces) => void 0,
			request,
			reloadInterval: typeof window !== "undefined" ? false : 3600 * 1e3,
			customHeaders: {},
			queryStringParams: {},
			crossDomain: false,
			withCredentials: false,
			overrideMimeType: false,
			requestOptions: {
				mode: "cors",
				credentials: "same-origin",
				cache: "default"
			}
		};
	};
	var Backend = class {
		constructor(services, options = {}, allOptions = {}) {
			this.services = services;
			this.options = options;
			this.allOptions = allOptions;
			this.type = "backend";
			this.init(services, options, allOptions);
		}
		init(services, options = {}, allOptions = {}) {
			this.services = services;
			this.options = {
				...getDefaults$2(),
				...this.options || {},
				...options
			};
			this.allOptions = allOptions;
			if (this.services && this.options.reloadInterval) {
				const timer = setInterval(() => this.reload(), this.options.reloadInterval);
				if (typeof timer === "object" && typeof timer.unref === "function") timer.unref();
			}
		}
		readMulti(languages, namespaces, callback) {
			this._readAny(languages, languages, namespaces, namespaces, callback);
		}
		read(language, namespace, callback) {
			this._readAny([language], language, [namespace], namespace, callback);
		}
		_readAny(languages, loadUrlLanguages, namespaces, loadUrlNamespaces, callback) {
			let loadPath = this.options.loadPath;
			if (typeof this.options.loadPath === "function") loadPath = this.options.loadPath(languages, namespaces);
			loadPath = makePromise(loadPath);
			loadPath.then((resolvedLoadPath) => {
				if (!resolvedLoadPath) return callback(null, {});
				const url = interpolateUrl(resolvedLoadPath, {
					lng: languages.join("+"),
					ns: namespaces.join("+")
				});
				if (url == null) {
					const safeLngs = languages.map(sanitizeLogValue).join(", ");
					const safeNss = namespaces.map(sanitizeLogValue).join(", ");
					return callback(/* @__PURE__ */ new Error("i18next-http-backend: unsafe lng/ns value — refusing to build request URL for languages=[" + safeLngs + "] namespaces=[" + safeNss + "]"), false);
				}
				this.loadUrl(url, callback, loadUrlLanguages, loadUrlNamespaces);
			});
		}
		loadUrl(url, callback, languages, namespaces) {
			const lng = typeof languages === "string" ? [languages] : languages;
			const ns = typeof namespaces === "string" ? [namespaces] : namespaces;
			const payload = this.options.parseLoadPayload(lng, ns);
			const safeUrl = sanitizeLogValue(redactUrlCredentials(url));
			this.options.request(this.options, url, payload, (err, res) => {
				if (res && (res.status >= 500 && res.status < 600 || !res.status)) return callback("failed loading " + safeUrl + "; status code: " + res.status, true);
				if (res && res.status >= 400 && res.status < 500) return callback("failed loading " + safeUrl + "; status code: " + res.status, false);
				if (!res && err && err.message) {
					const errorMessage = err.message.toLowerCase();
					if ([
						"failed",
						"fetch",
						"network",
						"load"
					].find((term) => errorMessage.indexOf(term) > -1)) return callback("failed loading " + safeUrl + ": " + sanitizeLogValue(err.message), true);
				}
				if (err) return callback(err, false);
				let ret, parseErr;
				try {
					if (typeof res.data === "string") ret = this.options.parse(res.data, languages, namespaces);
					else ret = res.data;
				} catch (e) {
					parseErr = "failed parsing " + safeUrl + " to json";
				}
				if (parseErr) return callback(parseErr, false);
				callback(null, ret);
			});
		}
		create(languages, namespace, key, fallbackValue, callback) {
			if (!this.options.addPath) return;
			if (typeof languages === "string") languages = [languages];
			const payload = this.options.parsePayload(namespace, key, fallbackValue);
			let finished = 0;
			const dataArray = [];
			const resArray = [];
			languages.forEach((lng) => {
				let addPath = this.options.addPath;
				if (typeof this.options.addPath === "function") addPath = this.options.addPath(lng, namespace);
				const url = interpolateUrl(addPath, {
					lng,
					ns: namespace
				});
				if (url == null) {
					finished += 1;
					if (callback && finished === languages.length) callback(dataArray, resArray);
					return;
				}
				this.options.request(this.options, url, payload, (data, res) => {
					finished += 1;
					dataArray.push(data);
					resArray.push(res);
					if (finished === languages.length) {
						if (typeof callback === "function") callback(dataArray, resArray);
					}
				});
			});
		}
		reload() {
			const { backendConnector, languageUtils, logger } = this.services;
			const currentLanguage = backendConnector.language;
			if (currentLanguage && currentLanguage.toLowerCase() === "cimode") return;
			const toLoad = [];
			const append = (lng) => {
				languageUtils.toResolveHierarchy(lng).forEach((l) => {
					if (toLoad.indexOf(l) < 0) toLoad.push(l);
				});
			};
			append(currentLanguage);
			if (this.allOptions.preload) this.allOptions.preload.forEach((l) => append(l));
			toLoad.forEach((lng) => {
				this.allOptions.ns.forEach((ns) => {
					backendConnector.read(lng, ns, "read", null, null, (err, data) => {
						if (err) logger.warn(`loading namespace ${ns} for language ${lng} failed`, err);
						if (!err && data) logger.log(`loaded namespace ${ns} for language ${lng}`, data);
						backendConnector.loaded(`${lng}|${ns}`, err, data);
					});
				});
			});
		}
	};
	Backend.type = "backend";
	//#endregion
	//#region node_modules/i18next-browser-languagedetector/dist/esm/i18nextBrowserLanguageDetector.js
	const { slice, forEach } = [];
	function defaults(obj) {
		forEach.call(slice.call(arguments, 1), (source) => {
			if (source) {
				for (const prop in source) if (obj[prop] === void 0) obj[prop] = source[prop];
			}
		});
		return obj;
	}
	function hasXSS(input) {
		if (typeof input !== "string") return false;
		return [
			/<\s*script.*?>/i,
			/<\s*\/\s*script\s*>/i,
			/<\s*img.*?on\w+\s*=/i,
			/<\s*\w+\s*on\w+\s*=.*?>/i,
			/javascript\s*:/i,
			/vbscript\s*:/i,
			/expression\s*\(/i,
			/eval\s*\(/i,
			/alert\s*\(/i,
			/document\.cookie/i,
			/document\.write\s*\(/i,
			/window\.location/i,
			/innerHTML/i
		].some((pattern) => pattern.test(input));
	}
	const fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
	const serializeCookie = function(name, val) {
		const opt = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : { path: "/" };
		let str = `${name}=${encodeURIComponent(val)}`;
		if (opt.maxAge > 0) {
			const maxAge = opt.maxAge - 0;
			if (Number.isNaN(maxAge)) throw new Error("maxAge should be a Number");
			str += `; Max-Age=${Math.floor(maxAge)}`;
		}
		if (opt.domain) {
			if (!fieldContentRegExp.test(opt.domain)) throw new TypeError("option domain is invalid");
			str += `; Domain=${opt.domain}`;
		}
		if (opt.path) {
			if (!fieldContentRegExp.test(opt.path)) throw new TypeError("option path is invalid");
			str += `; Path=${opt.path}`;
		}
		if (opt.expires) {
			if (typeof opt.expires.toUTCString !== "function") throw new TypeError("option expires is invalid");
			str += `; Expires=${opt.expires.toUTCString()}`;
		}
		if (opt.httpOnly) str += "; HttpOnly";
		if (opt.secure) str += "; Secure";
		if (opt.sameSite) switch (typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite) {
			case true:
				str += "; SameSite=Strict";
				break;
			case "lax":
				str += "; SameSite=Lax";
				break;
			case "strict":
				str += "; SameSite=Strict";
				break;
			case "none":
				str += "; SameSite=None";
				break;
			default: throw new TypeError("option sameSite is invalid");
		}
		if (opt.partitioned) str += "; Partitioned";
		return str;
	};
	const cookie = {
		create(name, value, minutes, domain) {
			let cookieOptions = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : {
				path: "/",
				sameSite: "strict"
			};
			if (minutes) {
				cookieOptions.expires = /* @__PURE__ */ new Date();
				cookieOptions.expires.setTime(cookieOptions.expires.getTime() + minutes * 60 * 1e3);
			}
			if (domain) cookieOptions.domain = domain;
			document.cookie = serializeCookie(name, value, cookieOptions);
		},
		read(name) {
			const nameEQ = `${name}=`;
			const ca = document.cookie.split(";");
			for (let i = 0; i < ca.length; i++) {
				let c = ca[i];
				while (c.charAt(0) === " ") c = c.substring(1, c.length);
				if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
			}
			return null;
		},
		remove(name, domain) {
			this.create(name, "", -1, domain);
		}
	};
	var cookie$1 = {
		name: "cookie",
		lookup(_ref) {
			let { lookupCookie } = _ref;
			if (lookupCookie && typeof document !== "undefined") return cookie.read(lookupCookie) || void 0;
		},
		cacheUserLanguage(lng, _ref2) {
			let { lookupCookie, cookieMinutes, cookieDomain, cookieOptions } = _ref2;
			if (lookupCookie && typeof document !== "undefined") cookie.create(lookupCookie, lng, cookieMinutes, cookieDomain, cookieOptions);
		}
	};
	var querystring = {
		name: "querystring",
		lookup(_ref) {
			let { lookupQuerystring } = _ref;
			let found;
			if (typeof window !== "undefined") {
				let { search } = window.location;
				if (!window.location.search && window.location.hash?.indexOf("?") > -1) search = window.location.hash.substring(window.location.hash.indexOf("?"));
				const params = search.substring(1).split("&");
				for (let i = 0; i < params.length; i++) {
					const pos = params[i].indexOf("=");
					if (pos > 0) {
						if (params[i].substring(0, pos) === lookupQuerystring) found = params[i].substring(pos + 1);
					}
				}
			}
			return found;
		}
	};
	var hash = {
		name: "hash",
		lookup(_ref) {
			let { lookupHash, lookupFromHashIndex } = _ref;
			let found;
			if (typeof window !== "undefined") {
				const { hash } = window.location;
				if (hash && hash.length > 2) {
					const query = hash.substring(1);
					if (lookupHash) {
						const params = query.split("&");
						for (let i = 0; i < params.length; i++) {
							const pos = params[i].indexOf("=");
							if (pos > 0) {
								if (params[i].substring(0, pos) === lookupHash) found = params[i].substring(pos + 1);
							}
						}
					}
					if (found) return found;
					if (!found && lookupFromHashIndex > -1) {
						const language = hash.match(/\/([a-zA-Z-]*)/g);
						if (!Array.isArray(language)) return void 0;
						return language[typeof lookupFromHashIndex === "number" ? lookupFromHashIndex : 0]?.replace("/", "");
					}
				}
			}
			return found;
		}
	};
	let hasLocalStorageSupport = null;
	const localStorageAvailable = () => {
		if (hasLocalStorageSupport !== null) return hasLocalStorageSupport;
		try {
			hasLocalStorageSupport = typeof window !== "undefined" && window.localStorage !== null;
			if (!hasLocalStorageSupport) return false;
			const testKey = "i18next.translate.boo";
			window.localStorage.setItem(testKey, "foo");
			window.localStorage.removeItem(testKey);
		} catch (e) {
			hasLocalStorageSupport = false;
		}
		return hasLocalStorageSupport;
	};
	var localStorage = {
		name: "localStorage",
		lookup(_ref) {
			let { lookupLocalStorage } = _ref;
			if (lookupLocalStorage && localStorageAvailable()) return window.localStorage.getItem(lookupLocalStorage) || void 0;
		},
		cacheUserLanguage(lng, _ref2) {
			let { lookupLocalStorage } = _ref2;
			if (lookupLocalStorage && localStorageAvailable()) window.localStorage.setItem(lookupLocalStorage, lng);
		}
	};
	let hasSessionStorageSupport = null;
	const sessionStorageAvailable = () => {
		if (hasSessionStorageSupport !== null) return hasSessionStorageSupport;
		try {
			hasSessionStorageSupport = typeof window !== "undefined" && window.sessionStorage !== null;
			if (!hasSessionStorageSupport) return false;
			const testKey = "i18next.translate.boo";
			window.sessionStorage.setItem(testKey, "foo");
			window.sessionStorage.removeItem(testKey);
		} catch (e) {
			hasSessionStorageSupport = false;
		}
		return hasSessionStorageSupport;
	};
	var sessionStorage = {
		name: "sessionStorage",
		lookup(_ref) {
			let { lookupSessionStorage } = _ref;
			if (lookupSessionStorage && sessionStorageAvailable()) return window.sessionStorage.getItem(lookupSessionStorage) || void 0;
		},
		cacheUserLanguage(lng, _ref2) {
			let { lookupSessionStorage } = _ref2;
			if (lookupSessionStorage && sessionStorageAvailable()) window.sessionStorage.setItem(lookupSessionStorage, lng);
		}
	};
	var navigator$1 = {
		name: "navigator",
		lookup(options) {
			const found = [];
			if (typeof navigator !== "undefined") {
				const { languages, userLanguage, language } = navigator;
				if (languages) for (let i = 0; i < languages.length; i++) found.push(languages[i]);
				if (userLanguage) found.push(userLanguage);
				if (language) found.push(language);
			}
			return found.length > 0 ? found : void 0;
		}
	};
	var htmlTag = {
		name: "htmlTag",
		lookup(_ref) {
			let { htmlTag } = _ref;
			let found;
			const internalHtmlTag = htmlTag || (typeof document !== "undefined" ? document.documentElement : null);
			if (internalHtmlTag && typeof internalHtmlTag.getAttribute === "function") found = internalHtmlTag.getAttribute("lang");
			return found;
		}
	};
	var path = {
		name: "path",
		lookup(_ref) {
			let { lookupFromPathIndex } = _ref;
			if (typeof window === "undefined") return void 0;
			const language = window.location.pathname.match(/\/([a-zA-Z-]*)/g);
			if (!Array.isArray(language)) return void 0;
			return language[typeof lookupFromPathIndex === "number" ? lookupFromPathIndex : 0]?.replace("/", "");
		}
	};
	var subdomain = {
		name: "subdomain",
		lookup(_ref) {
			let { lookupFromSubdomainIndex } = _ref;
			const internalLookupFromSubdomainIndex = typeof lookupFromSubdomainIndex === "number" ? lookupFromSubdomainIndex + 1 : 1;
			const language = typeof window !== "undefined" && window.location?.hostname?.match(/^(\w{2,5})\.(([a-z0-9-]{1,63}\.[a-z]{2,6})|localhost)/i);
			if (!language) return void 0;
			return language[internalLookupFromSubdomainIndex];
		}
	};
	let canCookies = false;
	try {
		document.cookie;
		canCookies = true;
	} catch (e) {}
	const order = [
		"querystring",
		"cookie",
		"localStorage",
		"sessionStorage",
		"navigator",
		"htmlTag"
	];
	if (!canCookies) order.splice(1, 1);
	const getDefaults$1 = () => ({
		order,
		lookupQuerystring: "lng",
		lookupCookie: "i18next",
		lookupLocalStorage: "i18nextLng",
		lookupSessionStorage: "i18nextLng",
		caches: ["localStorage"],
		excludeCacheFor: ["cimode"],
		convertDetectedLanguage: (l) => l
	});
	var Browser = class {
		constructor(services) {
			let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
			this.type = "languageDetector";
			this.detectors = {};
			this.init(services, options);
		}
		init() {
			let services = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : { languageUtils: {} };
			let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
			let i18nOptions = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
			this.services = services;
			this.options = defaults(options, this.options || {}, getDefaults$1());
			if (typeof this.options.convertDetectedLanguage === "string" && this.options.convertDetectedLanguage.indexOf("15897") > -1) this.options.convertDetectedLanguage = (l) => l.replace("-", "_");
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
			this.addDetector(hash);
		}
		addDetector(detector) {
			this.detectors[detector.name] = detector;
			return this;
		}
		detect() {
			let detectionOrder = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.options.order;
			let detected = [];
			detectionOrder.forEach((detectorName) => {
				if (this.detectors[detectorName]) {
					let lookup = this.detectors[detectorName].lookup(this.options);
					if (lookup && typeof lookup === "string") lookup = [lookup];
					if (lookup) detected = detected.concat(lookup);
				}
			});
			detected = detected.filter((d) => d !== void 0 && d !== null && !hasXSS(d)).map((d) => this.options.convertDetectedLanguage(d));
			if (this.services && this.services.languageUtils && this.services.languageUtils.getBestMatchFromCodes) return detected;
			return detected.length > 0 ? detected[0] : null;
		}
		cacheUserLanguage(lng) {
			let caches = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.options.caches;
			if (!caches) return;
			if (this.options.excludeCacheFor && this.options.excludeCacheFor.indexOf(lng) > -1) return;
			caches.forEach((cacheName) => {
				if (this.detectors[cacheName]) this.detectors[cacheName].cacheUserLanguage(lng, this.options);
			});
		}
	};
	Browser.type = "languageDetector";
	//#endregion
	//#region src/EventEmitter.js
	var EventEmitter = class {
		constructor() {
			this.observers = {};
		}
		on(events, listener) {
			events.split(" ").forEach((event) => {
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
			this.observers[event] = this.observers[event].filter((l) => l !== listener);
		}
		emit(event, ...args) {
			if (this.observers[event]) [].concat(this.observers[event]).forEach((observer) => {
				observer(...args);
			});
			if (this.observers["*"]) [].concat(this.observers["*"]).forEach((observer) => {
				observer.apply(observer, [event, ...args]);
			});
		}
	};
	//#endregion
	//#region src/Observer.js
	var Observer = class extends EventEmitter {
		constructor(ele, options = {}) {
			super();
			this.ele = ele;
			this.options = options;
			this.observer = this.create();
			this.internalChange = true;
		}
		create() {
			let lastToggleTimeout;
			const toggleInternal = () => {
				if (lastToggleTimeout) window.clearTimeout(lastToggleTimeout);
				lastToggleTimeout = setTimeout(() => {
					if (this.internalChange) this.internalChange = false;
				}, 200);
			};
			const observer = new MutationObserver((mutations) => {
				if (this.internalChange) toggleInternal();
				if (!this.internalChange) this.emit("changed", mutations);
			});
			observer.observe(this.ele, {
				attributes: true,
				childList: true,
				characterData: true,
				subtree: true
			});
			return observer;
		}
		reset() {
			this.internalChange = true;
		}
	};
	//#endregion
	//#region src/docReady.js
	let readyList = [];
	let readyFired = false;
	let readyEventHandlersInstalled = false;
	function ready() {
		if (!readyFired) {
			readyFired = true;
			for (let i = 0; i < readyList.length; i++) readyList[i].fn.call(window, readyList[i].ctx);
			readyList = [];
		}
	}
	function readyStateChange() {
		if (document.readyState === "complete") ready();
	}
	function docReady_default(callback, context) {
		if (readyFired) {
			setTimeout(function() {
				callback(context);
			}, 1);
			return;
		} else readyList.push({
			fn: callback,
			ctx: context
		});
		if (document.readyState === "complete" || !document.attachEvent && document.readyState === "interactive") setTimeout(ready, 1);
		else if (!readyEventHandlersInstalled) {
			if (document.addEventListener) {
				document.addEventListener("DOMContentLoaded", ready, false);
				window.addEventListener("load", ready, false);
			} else {
				document.attachEvent("onreadystatechange", readyStateChange);
				window.attachEvent("onload", ready);
			}
			readyEventHandlersInstalled = true;
		}
	}
	//#endregion
	//#region node_modules/virtual-dom/vnode/version.js
	var require_version = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		module.exports = "2";
	}));
	//#endregion
	//#region node_modules/virtual-dom/vnode/is-vnode.js
	var require_is_vnode = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var version = require_version();
		module.exports = isVirtualNode;
		function isVirtualNode(x) {
			return x && x.type === "VirtualNode" && x.version === version;
		}
	}));
	//#endregion
	//#region node_modules/virtual-dom/vnode/is-widget.js
	var require_is_widget = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		module.exports = isWidget;
		function isWidget(w) {
			return w && w.type === "Widget";
		}
	}));
	//#endregion
	//#region node_modules/virtual-dom/vnode/is-thunk.js
	var require_is_thunk = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		module.exports = isThunk;
		function isThunk(t) {
			return t && t.type === "Thunk";
		}
	}));
	//#endregion
	//#region node_modules/virtual-dom/vnode/is-vhook.js
	var require_is_vhook = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		module.exports = isHook;
		function isHook(hook) {
			return hook && (typeof hook.hook === "function" && !hook.hasOwnProperty("hook") || typeof hook.unhook === "function" && !hook.hasOwnProperty("unhook"));
		}
	}));
	//#endregion
	//#region node_modules/virtual-dom/vnode/vnode.js
	var require_vnode = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var version = require_version();
		var isVNode = require_is_vnode();
		var isWidget = require_is_widget();
		var isThunk = require_is_thunk();
		var isVHook = require_is_vhook();
		module.exports = VirtualNode;
		var noProperties = {};
		var noChildren = [];
		function VirtualNode(tagName, properties, children, key, namespace) {
			this.tagName = tagName;
			this.properties = properties || noProperties;
			this.children = children || noChildren;
			this.key = key != null ? String(key) : void 0;
			this.namespace = typeof namespace === "string" ? namespace : null;
			var count = children && children.length || 0;
			var descendants = 0;
			var hasWidgets = false;
			var hasThunks = false;
			var descendantHooks = false;
			var hooks;
			for (var propName in properties) if (properties.hasOwnProperty(propName)) {
				var property = properties[propName];
				if (isVHook(property) && property.unhook) {
					if (!hooks) hooks = {};
					hooks[propName] = property;
				}
			}
			for (var i = 0; i < count; i++) {
				var child = children[i];
				if (isVNode(child)) {
					descendants += child.count || 0;
					if (!hasWidgets && child.hasWidgets) hasWidgets = true;
					if (!hasThunks && child.hasThunks) hasThunks = true;
					if (!descendantHooks && (child.hooks || child.descendantHooks)) descendantHooks = true;
				} else if (!hasWidgets && isWidget(child)) {
					if (typeof child.destroy === "function") hasWidgets = true;
				} else if (!hasThunks && isThunk(child)) hasThunks = true;
			}
			this.count = count + descendants;
			this.hasWidgets = hasWidgets;
			this.hasThunks = hasThunks;
			this.hooks = hooks;
			this.descendantHooks = descendantHooks;
		}
		VirtualNode.prototype.version = version;
		VirtualNode.prototype.type = "VirtualNode";
	}));
	//#endregion
	//#region node_modules/virtual-dom/vnode/vtext.js
	var require_vtext = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var version = require_version();
		module.exports = VirtualText;
		function VirtualText(text) {
			this.text = String(text);
		}
		VirtualText.prototype.version = version;
		VirtualText.prototype.type = "VirtualText";
	}));
	//#endregion
	//#region node_modules/vdom-virtualize/vcomment.js
	var require_vcomment = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		module.exports = VirtualComment;
		function VirtualComment(text) {
			this.text = String(text);
		}
		VirtualComment.prototype.type = "Widget";
		VirtualComment.prototype.init = function() {
			return document.createComment(this.text);
		};
		VirtualComment.prototype.update = function(previous, domNode) {
			if (this.text === previous.text) return;
			domNode.nodeValue = this.text;
		};
	}));
	//#endregion
	//#region node_modules/vdom-virtualize/index.js
	var require_vdom_virtualize = /* @__PURE__ */ __commonJSMin(((exports, module) => {
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
		var VNode = require_vnode(), VText = require_vtext(), VComment = require_vcomment();
		module.exports = createVNode;
		function createVNode(domNode, key) {
			key = key || null;
			if (domNode.nodeType == 1) return createFromElement(domNode, key);
			if (domNode.nodeType == 3) return createFromTextNode(domNode, key);
			if (domNode.nodeType == 8) return createFromCommentNode(domNode, key);
		}
		function createFromTextNode(tNode) {
			return new VText(tNode.nodeValue);
		}
		function createFromCommentNode(cNode) {
			return new VComment(cNode.nodeValue);
		}
		function createFromElement(el) {
			var tagName = el.tagName, namespace = el.namespaceURI == "http://www.w3.org/1999/xhtml" ? null : el.namespaceURI, properties = getElementProperties(el), children = [];
			for (var i = 0; i < el.childNodes.length; i++) children.push(createVNode(el.childNodes[i]));
			return new VNode(tagName, properties, children, null, namespace);
		}
		function getElementProperties(el) {
			var obj = {};
			for (var i = 0; i < props.length; i++) {
				var propName = props[i];
				if (!el[propName]) continue;
				if ("style" == propName) {
					var css = {}, styleProp;
					if ("undefined" !== typeof el.style.length) for (var j = 0; j < el.style.length; j++) {
						styleProp = el.style[j];
						css[styleProp] = el.style.getPropertyValue(styleProp);
					}
					else for (var styleProp in el.style) if (el.style[styleProp] && el.style.hasOwnProperty(styleProp)) css[styleProp] = el.style[styleProp];
					if (Object.keys(css).length) obj[propName] = css;
					continue;
				}
				if (el.tagName.toLowerCase() === "img" && propName === "href") continue;
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
				if ("tabIndex" == propName && el.tabIndex === -1) continue;
				if ("contentEditable" == propName && el[propName] === "inherit") continue;
				if ("object" === typeof el[propName]) continue;
				obj[propName] = el[propName];
			}
			return obj;
		}
		/**
		* DOMNode property white list
		* Taken from https://github.com/Raynos/react/blob/dom-property-config/src/browser/ui/dom/DefaultDOMPropertyConfig.js
		*/
		var props = module.exports.properties = [
			"accept",
			"accessKey",
			"action",
			"alt",
			"async",
			"autoComplete",
			"autoPlay",
			"cellPadding",
			"cellSpacing",
			"checked",
			"className",
			"colSpan",
			"content",
			"contentEditable",
			"controls",
			"crossOrigin",
			"data",
			"defer",
			"dir",
			"download",
			"draggable",
			"encType",
			"formNoValidate",
			"href",
			"hrefLang",
			"htmlFor",
			"httpEquiv",
			"icon",
			"id",
			"label",
			"lang",
			"list",
			"loop",
			"max",
			"mediaGroup",
			"method",
			"min",
			"multiple",
			"muted",
			"name",
			"noValidate",
			"pattern",
			"placeholder",
			"poster",
			"preload",
			"radioGroup",
			"readOnly",
			"rel",
			"required",
			"rowSpan",
			"sandbox",
			"scope",
			"scrollLeft",
			"scrolling",
			"scrollTop",
			"selected",
			"span",
			"spellCheck",
			"src",
			"srcDoc",
			"srcSet",
			"start",
			"step",
			"style",
			"tabIndex",
			"target",
			"title",
			"type",
			"value",
			"autoCapitalize",
			"autoCorrect",
			"property",
			"attributes"
		];
		var attrBlacklist = module.exports.attrBlacklist = { "class": "className" };
	}));
	//#endregion
	//#region node_modules/x-is-array/index.js
	var require_x_is_array = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var nativeIsArray = Array.isArray;
		var toString = Object.prototype.toString;
		module.exports = nativeIsArray || isArray;
		function isArray(obj) {
			return toString.call(obj) === "[object Array]";
		}
	}));
	//#endregion
	//#region node_modules/virtual-dom/vnode/vpatch.js
	var require_vpatch = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var version = require_version();
		VirtualPatch.NONE = 0;
		VirtualPatch.VTEXT = 1;
		VirtualPatch.VNODE = 2;
		VirtualPatch.WIDGET = 3;
		VirtualPatch.PROPS = 4;
		VirtualPatch.ORDER = 5;
		VirtualPatch.INSERT = 6;
		VirtualPatch.REMOVE = 7;
		VirtualPatch.THUNK = 8;
		module.exports = VirtualPatch;
		function VirtualPatch(type, vNode, patch) {
			this.type = Number(type);
			this.vNode = vNode;
			this.patch = patch;
		}
		VirtualPatch.prototype.version = version;
		VirtualPatch.prototype.type = "VirtualPatch";
	}));
	//#endregion
	//#region node_modules/virtual-dom/vnode/is-vtext.js
	var require_is_vtext = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var version = require_version();
		module.exports = isVirtualText;
		function isVirtualText(x) {
			return x && x.type === "VirtualText" && x.version === version;
		}
	}));
	//#endregion
	//#region node_modules/virtual-dom/vnode/handle-thunk.js
	var require_handle_thunk = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var isVNode = require_is_vnode();
		var isVText = require_is_vtext();
		var isWidget = require_is_widget();
		var isThunk = require_is_thunk();
		module.exports = handleThunk;
		function handleThunk(a, b) {
			var renderedA = a;
			var renderedB = b;
			if (isThunk(b)) renderedB = renderThunk(b, a);
			if (isThunk(a)) renderedA = renderThunk(a, null);
			return {
				a: renderedA,
				b: renderedB
			};
		}
		function renderThunk(thunk, previous) {
			var renderedThunk = thunk.vnode;
			if (!renderedThunk) renderedThunk = thunk.vnode = thunk.render(previous);
			if (!(isVNode(renderedThunk) || isVText(renderedThunk) || isWidget(renderedThunk))) throw new Error("thunk did not return a valid node");
			return renderedThunk;
		}
	}));
	//#endregion
	//#region node_modules/is-object/index.js
	var require_is_object = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		module.exports = function isObject(x) {
			return typeof x === "object" && x !== null;
		};
	}));
	//#endregion
	//#region node_modules/virtual-dom/vtree/diff-props.js
	var require_diff_props = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var isObject = require_is_object();
		var isHook = require_is_vhook();
		module.exports = diffProps;
		function diffProps(a, b) {
			var diff;
			for (var aKey in a) {
				if (!(aKey in b)) {
					diff = diff || {};
					diff[aKey] = void 0;
				}
				var aValue = a[aKey];
				var bValue = b[aKey];
				if (aValue === bValue) continue;
				else if (isObject(aValue) && isObject(bValue)) if (getPrototype(bValue) !== getPrototype(aValue)) {
					diff = diff || {};
					diff[aKey] = bValue;
				} else if (isHook(bValue)) {
					diff = diff || {};
					diff[aKey] = bValue;
				} else {
					var objectDiff = diffProps(aValue, bValue);
					if (objectDiff) {
						diff = diff || {};
						diff[aKey] = objectDiff;
					}
				}
				else {
					diff = diff || {};
					diff[aKey] = bValue;
				}
			}
			for (var bKey in b) if (!(bKey in a)) {
				diff = diff || {};
				diff[bKey] = b[bKey];
			}
			return diff;
		}
		function getPrototype(value) {
			if (Object.getPrototypeOf) return Object.getPrototypeOf(value);
			else if (value.__proto__) return value.__proto__;
			else if (value.constructor) return value.constructor.prototype;
		}
	}));
	//#endregion
	//#region node_modules/virtual-dom/vtree/diff.js
	var require_diff$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var isArray = require_x_is_array();
		var VPatch = require_vpatch();
		var isVNode = require_is_vnode();
		var isVText = require_is_vtext();
		var isWidget = require_is_widget();
		var isThunk = require_is_thunk();
		var handleThunk = require_handle_thunk();
		var diffProps = require_diff_props();
		module.exports = diff;
		function diff(a, b) {
			var patch = { a };
			walk(a, b, patch, 0);
			return patch;
		}
		function walk(a, b, patch, index) {
			if (a === b) return;
			var apply = patch[index];
			var applyClear = false;
			if (isThunk(a) || isThunk(b)) thunks(a, b, patch, index);
			else if (b == null) {
				if (!isWidget(a)) {
					clearState(a, patch, index);
					apply = patch[index];
				}
				apply = appendPatch(apply, new VPatch(VPatch.REMOVE, a, b));
			} else if (isVNode(b)) if (isVNode(a)) if (a.tagName === b.tagName && a.namespace === b.namespace && a.key === b.key) {
				var propsPatch = diffProps(a.properties, b.properties);
				if (propsPatch) apply = appendPatch(apply, new VPatch(VPatch.PROPS, a, propsPatch));
				apply = diffChildren(a, b, patch, apply, index);
			} else {
				apply = appendPatch(apply, new VPatch(VPatch.VNODE, a, b));
				applyClear = true;
			}
			else {
				apply = appendPatch(apply, new VPatch(VPatch.VNODE, a, b));
				applyClear = true;
			}
			else if (isVText(b)) {
				if (!isVText(a)) {
					apply = appendPatch(apply, new VPatch(VPatch.VTEXT, a, b));
					applyClear = true;
				} else if (a.text !== b.text) apply = appendPatch(apply, new VPatch(VPatch.VTEXT, a, b));
			} else if (isWidget(b)) {
				if (!isWidget(a)) applyClear = true;
				apply = appendPatch(apply, new VPatch(VPatch.WIDGET, a, b));
			}
			if (apply) patch[index] = apply;
			if (applyClear) clearState(a, patch, index);
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
					if (rightNode) apply = appendPatch(apply, new VPatch(VPatch.INSERT, null, rightNode));
				} else walk(leftNode, rightNode, patch, index);
				if (isVNode(leftNode) && leftNode.count) index += leftNode.count;
			}
			if (orderedSet.moves) apply = appendPatch(apply, new VPatch(VPatch.ORDER, a, orderedSet.moves));
			return apply;
		}
		function clearState(vNode, patch, index) {
			unhook(vNode, patch, index);
			destroyWidgets(vNode, patch, index);
		}
		function destroyWidgets(vNode, patch, index) {
			if (isWidget(vNode)) {
				if (typeof vNode.destroy === "function") patch[index] = appendPatch(patch[index], new VPatch(VPatch.REMOVE, vNode, null));
			} else if (isVNode(vNode) && (vNode.hasWidgets || vNode.hasThunks)) {
				var children = vNode.children;
				var len = children.length;
				for (var i = 0; i < len; i++) {
					var child = children[i];
					index += 1;
					destroyWidgets(child, patch, index);
					if (isVNode(child) && child.count) index += child.count;
				}
			} else if (isThunk(vNode)) thunks(vNode, null, patch, index);
		}
		function thunks(a, b, patch, index) {
			var nodes = handleThunk(a, b);
			var thunkPatch = diff(nodes.a, nodes.b);
			if (hasPatches(thunkPatch)) patch[index] = new VPatch(VPatch.THUNK, null, thunkPatch);
		}
		function hasPatches(patch) {
			for (var index in patch) if (index !== "a") return true;
			return false;
		}
		function unhook(vNode, patch, index) {
			if (isVNode(vNode)) {
				if (vNode.hooks) patch[index] = appendPatch(patch[index], new VPatch(VPatch.PROPS, vNode, undefinedKeys(vNode.hooks)));
				if (vNode.descendantHooks || vNode.hasThunks) {
					var children = vNode.children;
					var len = children.length;
					for (var i = 0; i < len; i++) {
						var child = children[i];
						index += 1;
						unhook(child, patch, index);
						if (isVNode(child) && child.count) index += child.count;
					}
				}
			} else if (isThunk(vNode)) thunks(vNode, null, patch, index);
		}
		function undefinedKeys(obj) {
			var result = {};
			for (var key in obj) result[key] = void 0;
			return result;
		}
		function reorder(aChildren, bChildren) {
			var bChildIndex = keyIndex(bChildren);
			var bKeys = bChildIndex.keys;
			var bFree = bChildIndex.free;
			if (bFree.length === bChildren.length) return {
				children: bChildren,
				moves: null
			};
			var aChildIndex = keyIndex(aChildren);
			var aKeys = aChildIndex.keys;
			if (aChildIndex.free.length === aChildren.length) return {
				children: bChildren,
				moves: null
			};
			var newChildren = [];
			var freeIndex = 0;
			var freeCount = bFree.length;
			var deletedItems = 0;
			for (var i = 0; i < aChildren.length; i++) {
				var aItem = aChildren[i];
				var itemIndex;
				if (aItem.key) if (bKeys.hasOwnProperty(aItem.key)) {
					itemIndex = bKeys[aItem.key];
					newChildren.push(bChildren[itemIndex]);
				} else {
					itemIndex = i - deletedItems++;
					newChildren.push(null);
				}
				else if (freeIndex < freeCount) {
					itemIndex = bFree[freeIndex++];
					newChildren.push(bChildren[itemIndex]);
				} else {
					itemIndex = i - deletedItems++;
					newChildren.push(null);
				}
			}
			var lastFreeIndex = freeIndex >= bFree.length ? bChildren.length : bFree[freeIndex];
			for (var j = 0; j < bChildren.length; j++) {
				var newItem = bChildren[j];
				if (newItem.key) {
					if (!aKeys.hasOwnProperty(newItem.key)) newChildren.push(newItem);
				} else if (j >= lastFreeIndex) newChildren.push(newItem);
			}
			var simulate = newChildren.slice();
			var simulateIndex = 0;
			var removes = [];
			var inserts = [];
			var simulateItem;
			for (var k = 0; k < bChildren.length;) {
				var wantedItem = bChildren[k];
				simulateItem = simulate[simulateIndex];
				while (simulateItem === null && simulate.length) {
					removes.push(remove(simulate, simulateIndex, null));
					simulateItem = simulate[simulateIndex];
				}
				if (!simulateItem || simulateItem.key !== wantedItem.key) {
					if (wantedItem.key) {
						if (simulateItem && simulateItem.key) if (bKeys[simulateItem.key] !== k + 1) {
							removes.push(remove(simulate, simulateIndex, simulateItem.key));
							simulateItem = simulate[simulateIndex];
							if (!simulateItem || simulateItem.key !== wantedItem.key) inserts.push({
								key: wantedItem.key,
								to: k
							});
							else simulateIndex++;
						} else inserts.push({
							key: wantedItem.key,
							to: k
						});
						else inserts.push({
							key: wantedItem.key,
							to: k
						});
						k++;
					} else if (simulateItem && simulateItem.key) removes.push(remove(simulate, simulateIndex, simulateItem.key));
				} else {
					simulateIndex++;
					k++;
				}
			}
			while (simulateIndex < simulate.length) {
				simulateItem = simulate[simulateIndex];
				removes.push(remove(simulate, simulateIndex, simulateItem && simulateItem.key));
			}
			if (removes.length === deletedItems && !inserts.length) return {
				children: newChildren,
				moves: null
			};
			return {
				children: newChildren,
				moves: {
					removes,
					inserts
				}
			};
		}
		function remove(arr, index, key) {
			arr.splice(index, 1);
			return {
				from: index,
				key
			};
		}
		function keyIndex(children) {
			var keys = {};
			var free = [];
			var length = children.length;
			for (var i = 0; i < length; i++) {
				var child = children[i];
				if (child.key) keys[child.key] = i;
				else free.push(i);
			}
			return {
				keys,
				free
			};
		}
		function appendPatch(apply, patch) {
			if (apply) {
				if (isArray(apply)) apply.push(patch);
				else apply = [apply, patch];
				return apply;
			} else return patch;
		}
	}));
	//#endregion
	//#region node_modules/virtual-dom/diff.js
	var require_diff = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		module.exports = require_diff$1();
	}));
	//#endregion
	//#region node_modules/dom-walk/index.js
	var require_dom_walk = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var slice = Array.prototype.slice;
		module.exports = iterativelyWalk;
		function iterativelyWalk(nodes, cb) {
			if (!("length" in nodes)) nodes = [nodes];
			nodes = slice.call(nodes);
			while (nodes.length) {
				var node = nodes.shift(), ret = cb(node);
				if (ret) return ret;
				if (node.childNodes && node.childNodes.length) nodes = slice.call(node.childNodes).concat(nodes);
			}
		}
	}));
	//#endregion
	//#region node_modules/min-document/dom-comment.js
	var require_dom_comment = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		module.exports = Comment;
		function Comment(data, owner) {
			if (!(this instanceof Comment)) return new Comment(data, owner);
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
	}));
	//#endregion
	//#region node_modules/min-document/dom-text.js
	var require_dom_text = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		module.exports = DOMText;
		function DOMText(value, owner) {
			if (!(this instanceof DOMText)) return new DOMText(value);
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
	}));
	//#endregion
	//#region node_modules/min-document/event/dispatch-event.js
	var require_dispatch_event = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		module.exports = dispatchEvent;
		function dispatchEvent(ev) {
			var elem = this;
			var type = ev.type;
			if (!ev.target) ev.target = elem;
			if (!elem.listeners) elem.listeners = {};
			var listeners = elem.listeners[type];
			if (listeners) return listeners.forEach(function(listener) {
				ev.currentTarget = elem;
				if (typeof listener === "function") listener(ev);
				else listener.handleEvent(ev);
			});
			if (elem.parentNode) elem.parentNode.dispatchEvent(ev);
		}
	}));
	//#endregion
	//#region node_modules/min-document/event/add-event-listener.js
	var require_add_event_listener = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		module.exports = addEventListener;
		function addEventListener(type, listener) {
			var elem = this;
			if (!elem.listeners) elem.listeners = {};
			if (!elem.listeners[type]) elem.listeners[type] = [];
			if (elem.listeners[type].indexOf(listener) === -1) elem.listeners[type].push(listener);
		}
	}));
	//#endregion
	//#region node_modules/min-document/event/remove-event-listener.js
	var require_remove_event_listener = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		module.exports = removeEventListener;
		function removeEventListener(type, listener) {
			var elem = this;
			if (!elem.listeners) return;
			if (!elem.listeners[type]) return;
			var list = elem.listeners[type];
			var index = list.indexOf(listener);
			if (index !== -1) list.splice(index, 1);
		}
	}));
	//#endregion
	//#region node_modules/min-document/serialize.js
	var require_serialize = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		module.exports = serializeNode;
		var voidElements = [
			"area",
			"base",
			"br",
			"col",
			"embed",
			"hr",
			"img",
			"input",
			"keygen",
			"link",
			"menuitem",
			"meta",
			"param",
			"source",
			"track",
			"wbr"
		];
		function serializeNode(node) {
			switch (node.nodeType) {
				case 3: return escapeText(node.data);
				case 8: return "<!--" + node.data + "-->";
				default: return serializeElement(node);
			}
		}
		function serializeElement(elem) {
			var strings = [];
			var tagname = elem.tagName;
			if (elem.namespaceURI === "http://www.w3.org/1999/xhtml") tagname = tagname.toLowerCase();
			strings.push("<" + tagname + properties(elem) + datasetify(elem));
			if (voidElements.indexOf(tagname) > -1) strings.push(" />");
			else {
				strings.push(">");
				if (elem.childNodes.length) strings.push.apply(strings, elem.childNodes.map(serializeNode));
				else if (elem.textContent || elem.innerText) strings.push(escapeText(elem.textContent || elem.innerText));
				else if (elem.innerHTML) strings.push(elem.innerHTML);
				strings.push("</" + tagname + ">");
			}
			return strings.join("");
		}
		function isProperty(elem, key) {
			var type = typeof elem[key];
			if (key === "style" && Object.keys(elem.style).length > 0) return true;
			return elem.hasOwnProperty(key) && (type === "string" || type === "boolean" || type === "number") && key !== "nodeName" && key !== "className" && key !== "tagName" && key !== "textContent" && key !== "innerText" && key !== "namespaceURI" && key !== "innerHTML";
		}
		function stylify(styles) {
			if (typeof styles === "string") return styles;
			var attr = "";
			Object.keys(styles).forEach(function(key) {
				var value = styles[key];
				key = key.replace(/[A-Z]/g, function(c) {
					return "-" + c.toLowerCase();
				});
				attr += key + ":" + value + ";";
			});
			return attr;
		}
		function datasetify(elem) {
			var ds = elem.dataset;
			var props = [];
			for (var key in ds) props.push({
				name: "data-" + key,
				value: ds[key]
			});
			return props.length ? stringify(props) : "";
		}
		function stringify(list) {
			var attributes = [];
			list.forEach(function(tuple) {
				var name = tuple.name;
				var value = tuple.value;
				if (name === "style") value = stylify(value);
				attributes.push(name + "=\"" + escapeAttributeValue(value) + "\"");
			});
			return attributes.length ? " " + attributes.join(" ") : "";
		}
		function properties(elem) {
			var props = [];
			for (var key in elem) if (isProperty(elem, key)) props.push({
				name: key,
				value: elem[key]
			});
			for (var ns in elem._attributes) for (var attribute in elem._attributes[ns]) {
				var prop = elem._attributes[ns][attribute];
				var name = (prop.prefix ? prop.prefix + ":" : "") + attribute;
				props.push({
					name,
					value: prop.value
				});
			}
			if (elem.className) props.push({
				name: "class",
				value: elem.className
			});
			return props.length ? stringify(props) : "";
		}
		function escapeText(s) {
			var str = "";
			if (typeof s === "string") str = s;
			else if (s) str = s.toString();
			return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
		}
		function escapeAttributeValue(str) {
			return escapeText(str).replace(/"/g, "&quot;");
		}
	}));
	//#endregion
	//#region node_modules/min-document/dom-element.js
	var require_dom_element = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var domWalk = require_dom_walk();
		var dispatchEvent = require_dispatch_event();
		var addEventListener = require_add_event_listener();
		var removeEventListener = require_remove_event_listener();
		var serializeNode = require_serialize();
		var htmlns = "http://www.w3.org/1999/xhtml";
		module.exports = DOMElement;
		function DOMElement(tagName, owner, namespace) {
			if (!(this instanceof DOMElement)) return new DOMElement(tagName);
			var ns = namespace === void 0 ? htmlns : namespace || null;
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
			if (this.tagName === "INPUT") this.type = "text";
		}
		DOMElement.prototype.type = "DOMElement";
		DOMElement.prototype.nodeType = 1;
		DOMElement.prototype.appendChild = function _Element_appendChild(child) {
			if (child.parentNode) child.parentNode.removeChild(child);
			this.childNodes.push(child);
			child.parentNode = this;
			return child;
		};
		DOMElement.prototype.replaceChild = function _Element_replaceChild(elem, needle) {
			if (elem.parentNode) elem.parentNode.removeChild(elem);
			var index = this.childNodes.indexOf(needle);
			needle.parentNode = null;
			this.childNodes[index] = elem;
			elem.parentNode = this;
			return needle;
		};
		DOMElement.prototype.removeChild = function _Element_removeChild(elem) {
			var index = this.childNodes.indexOf(elem);
			this.childNodes.splice(index, 1);
			elem.parentNode = null;
			return elem;
		};
		DOMElement.prototype.insertBefore = function _Element_insertBefore(elem, needle) {
			if (elem.parentNode) elem.parentNode.removeChild(elem);
			var index = needle === null || needle === void 0 ? -1 : this.childNodes.indexOf(needle);
			if (index > -1) this.childNodes.splice(index, 0, elem);
			else this.childNodes.push(elem);
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
			if (this.tagName === "INPUT" && name === "type") this.type = value;
			else {
				var attributes = this._attributes[namespace] || (this._attributes[namespace] = {});
				attributes[localName] = {
					value,
					prefix
				};
			}
		};
		DOMElement.prototype.getAttributeNS = function _Element_getAttributeNS(namespace, name) {
			var attributes = this._attributes[namespace];
			var value = attributes && attributes[name] && attributes[name].value;
			if (this.tagName === "INPUT" && name === "type") return this.type;
			if (typeof value !== "string") return null;
			return value;
		};
		DOMElement.prototype.removeAttributeNS = function _Element_removeAttributeNS(namespace, name) {
			if (!Object.prototype.hasOwnProperty.call(this._attributes, namespace)) return;
			var attributes = this._attributes[namespace];
			if (attributes && Object.prototype.hasOwnProperty.call(attributes, name)) delete attributes[name];
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
		DOMElement.prototype.removeEventListener = removeEventListener;
		DOMElement.prototype.addEventListener = addEventListener;
		DOMElement.prototype.dispatchEvent = dispatchEvent;
		DOMElement.prototype.focus = function _Element_focus() {};
		DOMElement.prototype.toString = function _Element_toString() {
			return serializeNode(this);
		};
		DOMElement.prototype.getElementsByClassName = function _Element_getElementsByClassName(classNames) {
			var classes = classNames.split(" ");
			var elems = [];
			domWalk(this, function(node) {
				if (node.nodeType === 1) {
					var nodeClasses = (node.className || "").split(" ");
					if (classes.every(function(item) {
						return nodeClasses.indexOf(item) !== -1;
					})) elems.push(node);
				}
			});
			return elems;
		};
		DOMElement.prototype.getElementsByTagName = function _Element_getElementsByTagName(tagName) {
			tagName = tagName.toLowerCase();
			var elems = [];
			domWalk(this.childNodes, function(node) {
				if (node.nodeType === 1 && (tagName === "*" || node.tagName.toLowerCase() === tagName)) elems.push(node);
			});
			return elems;
		};
		DOMElement.prototype.contains = function _Element_contains(element) {
			return domWalk(this, function(node) {
				return element === node;
			}) || false;
		};
	}));
	//#endregion
	//#region node_modules/min-document/dom-fragment.js
	var require_dom_fragment = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var DOMElement = require_dom_element();
		module.exports = DocumentFragment;
		function DocumentFragment(owner) {
			if (!(this instanceof DocumentFragment)) return new DocumentFragment();
			this.childNodes = [];
			this.parentNode = null;
			this.ownerDocument = owner || null;
		}
		DocumentFragment.prototype.type = "DocumentFragment";
		DocumentFragment.prototype.nodeType = 11;
		DocumentFragment.prototype.nodeName = "#document-fragment";
		DocumentFragment.prototype.appendChild = DOMElement.prototype.appendChild;
		DocumentFragment.prototype.replaceChild = DOMElement.prototype.replaceChild;
		DocumentFragment.prototype.removeChild = DOMElement.prototype.removeChild;
		DocumentFragment.prototype.toString = function _DocumentFragment_toString() {
			return this.childNodes.map(function(node) {
				return String(node);
			}).join("");
		};
	}));
	//#endregion
	//#region node_modules/min-document/event.js
	var require_event = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		module.exports = Event;
		function Event(family) {}
		Event.prototype.initEvent = function _Event_initEvent(type, bubbles, cancelable) {
			this.type = type;
			this.bubbles = bubbles;
			this.cancelable = cancelable;
		};
		Event.prototype.preventDefault = function _Event_preventDefault() {};
	}));
	//#endregion
	//#region node_modules/min-document/document.js
	var require_document$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var domWalk = require_dom_walk();
		var Comment = require_dom_comment();
		var DOMText = require_dom_text();
		var DOMElement = require_dom_element();
		var DocumentFragment = require_dom_fragment();
		var Event = require_event();
		var dispatchEvent = require_dispatch_event();
		var addEventListener = require_add_event_listener();
		var removeEventListener = require_remove_event_listener();
		module.exports = Document;
		function Document() {
			if (!(this instanceof Document)) return new Document();
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
			return new DOMText(value, this);
		};
		proto.createElementNS = function createElementNS(namespace, tagName) {
			var ns = namespace === null ? null : String(namespace);
			return new DOMElement(tagName, this, ns);
		};
		proto.createElement = function createElement(tagName) {
			return new DOMElement(tagName, this);
		};
		proto.createDocumentFragment = function createDocumentFragment() {
			return new DocumentFragment(this);
		};
		proto.createEvent = function createEvent(family) {
			return new Event(family);
		};
		proto.createComment = function createComment(data) {
			return new Comment(data, this);
		};
		proto.getElementById = function getElementById(id) {
			id = String(id);
			return domWalk(this.childNodes, function(node) {
				if (String(node.id) === id) return node;
			}) || null;
		};
		proto.getElementsByClassName = DOMElement.prototype.getElementsByClassName;
		proto.getElementsByTagName = DOMElement.prototype.getElementsByTagName;
		proto.contains = DOMElement.prototype.contains;
		proto.removeEventListener = removeEventListener;
		proto.addEventListener = addEventListener;
		proto.dispatchEvent = dispatchEvent;
	}));
	//#endregion
	//#region node_modules/min-document/index.js
	var require_min_document = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		module.exports = new (require_document$1())();
	}));
	//#endregion
	//#region node_modules/global/document.js
	var require_document = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var topLevel = typeof global !== "undefined" ? global : typeof window !== "undefined" ? window : {};
		var minDoc = require_min_document();
		var doccy;
		if (typeof document !== "undefined") doccy = document;
		else {
			doccy = topLevel["__GLOBAL_DOCUMENT_CACHE@4"];
			if (!doccy) doccy = topLevel["__GLOBAL_DOCUMENT_CACHE@4"] = minDoc;
		}
		module.exports = doccy;
	}));
	//#endregion
	//#region node_modules/virtual-dom/vdom/apply-properties.js
	var require_apply_properties = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var isObject = require_is_object();
		var isHook = require_is_vhook();
		module.exports = applyProperties;
		function applyProperties(node, props, previous) {
			for (var propName in props) {
				var propValue = props[propName];
				if (propValue === void 0) removeProperty(node, propName, propValue, previous);
				else if (isHook(propValue)) {
					removeProperty(node, propName, propValue, previous);
					if (propValue.hook) propValue.hook(node, propName, previous ? previous[propName] : void 0);
				} else if (isObject(propValue)) patchObject(node, props, previous, propName, propValue);
				else node[propName] = propValue;
			}
		}
		function removeProperty(node, propName, propValue, previous) {
			if (previous) {
				var previousValue = previous[propName];
				if (!isHook(previousValue)) if (propName === "attributes") for (var attrName in previousValue) node.removeAttribute(attrName);
				else if (propName === "style") for (var i in previousValue) node.style[i] = "";
				else if (typeof previousValue === "string") node[propName] = "";
				else node[propName] = null;
				else if (previousValue.unhook) previousValue.unhook(node, propName, propValue);
			}
		}
		function patchObject(node, props, previous, propName, propValue) {
			var previousValue = previous ? previous[propName] : void 0;
			if (propName === "attributes") {
				for (var attrName in propValue) {
					var attrValue = propValue[attrName];
					if (attrValue === void 0) node.removeAttribute(attrName);
					else node.setAttribute(attrName, attrValue);
				}
				return;
			}
			if (previousValue && isObject(previousValue) && getPrototype(previousValue) !== getPrototype(propValue)) {
				node[propName] = propValue;
				return;
			}
			if (!isObject(node[propName])) node[propName] = {};
			var replacer = propName === "style" ? "" : void 0;
			for (var k in propValue) {
				var value = propValue[k];
				node[propName][k] = value === void 0 ? replacer : value;
			}
		}
		function getPrototype(value) {
			if (Object.getPrototypeOf) return Object.getPrototypeOf(value);
			else if (value.__proto__) return value.__proto__;
			else if (value.constructor) return value.constructor.prototype;
		}
	}));
	//#endregion
	//#region node_modules/virtual-dom/vdom/create-element.js
	var require_create_element = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var document = require_document();
		var applyProperties = require_apply_properties();
		var isVNode = require_is_vnode();
		var isVText = require_is_vtext();
		var isWidget = require_is_widget();
		var handleThunk = require_handle_thunk();
		module.exports = createElement;
		function createElement(vnode, opts) {
			var doc = opts ? opts.document || document : document;
			var warn = opts ? opts.warn : null;
			vnode = handleThunk(vnode).a;
			if (isWidget(vnode)) return vnode.init();
			else if (isVText(vnode)) return doc.createTextNode(vnode.text);
			else if (!isVNode(vnode)) {
				if (warn) warn("Item is not a valid virtual dom node", vnode);
				return null;
			}
			var node = vnode.namespace === null ? doc.createElement(vnode.tagName) : doc.createElementNS(vnode.namespace, vnode.tagName);
			var props = vnode.properties;
			applyProperties(node, props);
			var children = vnode.children;
			for (var i = 0; i < children.length; i++) {
				var childNode = createElement(children[i], opts);
				if (childNode) node.appendChild(childNode);
			}
			return node;
		}
	}));
	//#endregion
	//#region node_modules/virtual-dom/vdom/dom-index.js
	var require_dom_index = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var noChild = {};
		module.exports = domIndex;
		function domIndex(rootNode, tree, indices, nodes) {
			if (!indices || indices.length === 0) return {};
			else {
				indices.sort(ascending);
				return recurse(rootNode, tree, indices, nodes, 0);
			}
		}
		function recurse(rootNode, tree, indices, nodes, rootIndex) {
			nodes = nodes || {};
			if (rootNode) {
				if (indexInRange(indices, rootIndex, rootIndex)) nodes[rootIndex] = rootNode;
				var vChildren = tree.children;
				if (vChildren) {
					var childNodes = rootNode.childNodes;
					for (var i = 0; i < tree.children.length; i++) {
						rootIndex += 1;
						var vChild = vChildren[i] || noChild;
						var nextIndex = rootIndex + (vChild.count || 0);
						if (indexInRange(indices, rootIndex, nextIndex)) recurse(childNodes[i], vChild, indices, nodes, rootIndex);
						rootIndex = nextIndex;
					}
				}
			}
			return nodes;
		}
		function indexInRange(indices, left, right) {
			if (indices.length === 0) return false;
			var minIndex = 0;
			var maxIndex = indices.length - 1;
			var currentIndex;
			var currentItem;
			while (minIndex <= maxIndex) {
				currentIndex = (maxIndex + minIndex) / 2 >> 0;
				currentItem = indices[currentIndex];
				if (minIndex === maxIndex) return currentItem >= left && currentItem <= right;
				else if (currentItem < left) minIndex = currentIndex + 1;
				else if (currentItem > right) maxIndex = currentIndex - 1;
				else return true;
			}
			return false;
		}
		function ascending(a, b) {
			return a > b ? 1 : -1;
		}
	}));
	//#endregion
	//#region node_modules/virtual-dom/vdom/update-widget.js
	var require_update_widget = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var isWidget = require_is_widget();
		module.exports = updateWidget;
		function updateWidget(a, b) {
			if (isWidget(a) && isWidget(b)) if ("name" in a && "name" in b) return a.id === b.id;
			else return a.init === b.init;
			return false;
		}
	}));
	//#endregion
	//#region node_modules/virtual-dom/vdom/patch-op.js
	var require_patch_op = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var applyProperties = require_apply_properties();
		var isWidget = require_is_widget();
		var VPatch = require_vpatch();
		var updateWidget = require_update_widget();
		module.exports = applyPatch;
		function applyPatch(vpatch, domNode, renderOptions) {
			var type = vpatch.type;
			var vNode = vpatch.vNode;
			var patch = vpatch.patch;
			switch (type) {
				case VPatch.REMOVE: return removeNode(domNode, vNode);
				case VPatch.INSERT: return insertNode(domNode, patch, renderOptions);
				case VPatch.VTEXT: return stringPatch(domNode, vNode, patch, renderOptions);
				case VPatch.WIDGET: return widgetPatch(domNode, vNode, patch, renderOptions);
				case VPatch.VNODE: return vNodePatch(domNode, vNode, patch, renderOptions);
				case VPatch.ORDER:
					reorderChildren(domNode, patch);
					return domNode;
				case VPatch.PROPS:
					applyProperties(domNode, patch, vNode.properties);
					return domNode;
				case VPatch.THUNK: return replaceRoot(domNode, renderOptions.patch(domNode, patch, renderOptions));
				default: return domNode;
			}
		}
		function removeNode(domNode, vNode) {
			var parentNode = domNode.parentNode;
			if (parentNode) parentNode.removeChild(domNode);
			destroyWidget(domNode, vNode);
			return null;
		}
		function insertNode(parentNode, vNode, renderOptions) {
			var newNode = renderOptions.render(vNode, renderOptions);
			if (parentNode) parentNode.appendChild(newNode);
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
				if (parentNode && newNode !== domNode) parentNode.replaceChild(newNode, domNode);
			}
			return newNode;
		}
		function widgetPatch(domNode, leftVNode, widget, renderOptions) {
			var updating = updateWidget(leftVNode, widget);
			var newNode;
			if (updating) newNode = widget.update(leftVNode, domNode) || domNode;
			else newNode = renderOptions.render(widget, renderOptions);
			var parentNode = domNode.parentNode;
			if (parentNode && newNode !== domNode) parentNode.replaceChild(newNode, domNode);
			if (!updating) destroyWidget(domNode, leftVNode);
			return newNode;
		}
		function vNodePatch(domNode, leftVNode, vNode, renderOptions) {
			var parentNode = domNode.parentNode;
			var newNode = renderOptions.render(vNode, renderOptions);
			if (parentNode && newNode !== domNode) parentNode.replaceChild(newNode, domNode);
			return newNode;
		}
		function destroyWidget(domNode, w) {
			if (typeof w.destroy === "function" && isWidget(w)) w.destroy(domNode);
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
				if (remove.key) keyMap[remove.key] = node;
				domNode.removeChild(node);
			}
			var length = childNodes.length;
			for (var j = 0; j < moves.inserts.length; j++) {
				insert = moves.inserts[j];
				node = keyMap[insert.key];
				domNode.insertBefore(node, insert.to >= length++ ? null : childNodes[insert.to]);
			}
		}
		function replaceRoot(oldRoot, newRoot) {
			if (oldRoot && newRoot && oldRoot !== newRoot && oldRoot.parentNode) oldRoot.parentNode.replaceChild(newRoot, oldRoot);
			return newRoot;
		}
	}));
	//#endregion
	//#region node_modules/virtual-dom/vdom/patch.js
	var require_patch$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var document = require_document();
		var isArray = require_x_is_array();
		var render = require_create_element();
		var domIndex = require_dom_index();
		var patchOp = require_patch_op();
		module.exports = patch;
		function patch(rootNode, patches, renderOptions) {
			renderOptions = renderOptions || {};
			renderOptions.patch = renderOptions.patch && renderOptions.patch !== patch ? renderOptions.patch : patchRecursive;
			renderOptions.render = renderOptions.render || render;
			return renderOptions.patch(rootNode, patches, renderOptions);
		}
		function patchRecursive(rootNode, patches, renderOptions) {
			var indices = patchIndices(patches);
			if (indices.length === 0) return rootNode;
			var index = domIndex(rootNode, patches.a, indices);
			var ownerDocument = rootNode.ownerDocument;
			if (!renderOptions.document && ownerDocument !== document) renderOptions.document = ownerDocument;
			for (var i = 0; i < indices.length; i++) {
				var nodeIndex = indices[i];
				rootNode = applyPatch(rootNode, index[nodeIndex], patches[nodeIndex], renderOptions);
			}
			return rootNode;
		}
		function applyPatch(rootNode, domNode, patchList, renderOptions) {
			if (!domNode) return rootNode;
			var newNode;
			if (isArray(patchList)) for (var i = 0; i < patchList.length; i++) {
				newNode = patchOp(patchList[i], domNode, renderOptions);
				if (domNode === rootNode) rootNode = newNode;
			}
			else {
				newNode = patchOp(patchList, domNode, renderOptions);
				if (domNode === rootNode) rootNode = newNode;
			}
			return rootNode;
		}
		function patchIndices(patches) {
			var indices = [];
			for (var key in patches) if (key !== "a") indices.push(Number(key));
			return indices;
		}
	}));
	//#endregion
	//#region node_modules/virtual-dom/patch.js
	var require_patch = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		module.exports = require_patch$1();
	}));
	//#endregion
	//#region node_modules/udc/udc.js
	var require_udc = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		(function(root, factory) {
			"use strict";
			if (typeof exports === "object") module.exports = factory();
			else if (typeof define === "function" && define.amd) define(factory);
			else root.UltraDeepClone = factory();
		})(exports, function() {
			var functionPropertyFilter = ["caller", "arguments"];
			var typedArrayPropertyFilter = [
				"BYTES_PER_ELEMENT",
				"get",
				"set",
				"slice",
				"subarray",
				"buffer",
				"length",
				"byteOffset",
				"byteLength"
			];
			var primitiveCloner = makeCloner(clonePrimitive);
			var typedArrayCloner = makeRecursiveCloner(makeCloner(cloneTypedArray), typedArrayPropertyFilter);
			function typeString(type) {
				return "[object " + type + "]";
			}
			var cloneFunctions = {};
			cloneFunctions[typeString("RegExp")] = makeCloner(cloneRegExp);
			cloneFunctions[typeString("Date")] = makeCloner(cloneDate);
			cloneFunctions[typeString("Function")] = makeRecursiveCloner(makeCloner(cloneFunction), functionPropertyFilter);
			cloneFunctions[typeString("Object")] = makeRecursiveCloner(makeCloner(cloneObject));
			cloneFunctions[typeString("Array")] = makeRecursiveCloner(makeCloner(cloneArray));
			[
				"Null",
				"Undefined",
				"Number",
				"String",
				"Boolean"
			].map(typeString).forEach(function(type) {
				cloneFunctions[type] = primitiveCloner;
			});
			[
				"Int8Array",
				"Uint8Array",
				"Uint8ClampedArray",
				"Int16Array",
				"Uint16Array",
				"Int32Array",
				"Uint32Array",
				"Float32Array",
				"Float64Array"
			].map(typeString).forEach(function(type) {
				cloneFunctions[type] = typedArrayCloner;
			});
			function makeArguments(numberOfArgs) {
				var letters = [];
				for (var i = 1; i <= numberOfArgs; i++) letters.push("arg" + i);
				return letters;
			}
			function wrapFunctionWithArity(callback) {
				var argList = makeArguments(callback.length);
				var functionCode = "return false || function ";
				functionCode += callback.name + "(";
				functionCode += argList.join(", ") + ") {\n";
				functionCode += "return fn.apply(this, arguments);\n";
				functionCode += "};";
				return Function("fn", functionCode)(callback);
			}
			function makeCloner(cloneThing) {
				return function(thing, thingStack, copyStack) {
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
			}
			function cloneFunction(fn) {
				return wrapFunctionWithArity(fn);
			}
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
				return function(thing, thingStack, copyStack) {
					var clone = this;
					return Object.getOwnPropertyNames(thing).filter(function(prop) {
						return !propertyFilter || propertyFilter.indexOf(prop) === -1;
					}).reduce(function(copy, prop) {
						var thingOffset = thingStack.indexOf(thing[prop]);
						if (thingOffset === -1) copy[prop] = clone(thing[prop]);
						else copy[prop] = copyStack[thingOffset];
						return copy;
					}, cloneThing(thing, thingStack, copyStack));
				};
			}
			return function _ultraDeepClone(source) {
				var thingStack = [];
				var copyStack = [];
				function clone(thing) {
					return cloneFunctions[Object.prototype.toString.call(thing)].call(clone, thing, thingStack, copyStack);
				}
				return clone(source);
			};
		});
	}));
	//#endregion
	//#region src/Instrument.js
	var import_vdom_virtualize = /* @__PURE__ */ __toESM(require_vdom_virtualize(), 1);
	var import_diff = /* @__PURE__ */ __toESM(require_diff(), 1);
	var import_patch = /* @__PURE__ */ __toESM(require_patch(), 1);
	var import_udc = /* @__PURE__ */ __toESM(require_udc(), 1);
	var Instrument = class {
		start() {
			this.started = (/* @__PURE__ */ new Date()).getTime();
		}
		end() {
			this.ended = (/* @__PURE__ */ new Date()).getTime();
			return this.ended - this.started;
		}
	};
	//#endregion
	//#region node_modules/escape-html/index.js
	/*!
	* escape-html
	* Copyright(c) 2012-2013 TJ Holowaychuk
	* Copyright(c) 2015 Andreas Lubbe
	* Copyright(c) 2015 Tiancheng "Timothy" Gu
	* MIT Licensed
	*/
	var require_escape_html = /* @__PURE__ */ __commonJSMin(((exports, module) => {
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
			var str = "" + string;
			var match = matchHtmlRegExp.exec(str);
			if (!match) return str;
			var escape;
			var html = "";
			var index = 0;
			var lastIndex = 0;
			for (index = match.index; index < str.length; index++) {
				switch (str.charCodeAt(index)) {
					case 34:
						escape = "&quot;";
						break;
					case 38:
						escape = "&amp;";
						break;
					case 39:
						escape = "&#39;";
						break;
					case 60:
						escape = "&lt;";
						break;
					case 62:
						escape = "&gt;";
						break;
					default: continue;
				}
				if (lastIndex !== index) html += str.substring(lastIndex, index);
				lastIndex = index + 1;
				html += escape;
			}
			return lastIndex !== index ? html + str.substring(lastIndex, index) : html;
		}
	}));
	//#endregion
	//#region node_modules/xtend/immutable.js
	var require_immutable = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		module.exports = extend;
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		function extend() {
			var target = {};
			for (var i = 0; i < arguments.length; i++) {
				var source = arguments[i];
				for (var key in source) if (hasOwnProperty.call(source, key)) target[key] = source[key];
			}
			return target;
		}
	}));
	//#endregion
	//#region node_modules/virtual-dom/virtual-hyperscript/hooks/soft-set-hook.js
	var require_soft_set_hook = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		module.exports = SoftSetHook;
		function SoftSetHook(value) {
			if (!(this instanceof SoftSetHook)) return new SoftSetHook(value);
			this.value = value;
		}
		SoftSetHook.prototype.hook = function(node, propertyName) {
			if (node[propertyName] !== this.value) node[propertyName] = this.value;
		};
	}));
	//#endregion
	//#region node_modules/virtual-dom/virtual-hyperscript/hooks/attribute-hook.js
	var require_attribute_hook = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		module.exports = AttributeHook;
		function AttributeHook(namespace, value) {
			if (!(this instanceof AttributeHook)) return new AttributeHook(namespace, value);
			this.namespace = namespace;
			this.value = value;
		}
		AttributeHook.prototype.hook = function(node, prop, prev) {
			if (prev && prev.type === "AttributeHook" && prev.value === this.value && prev.namespace === this.namespace) return;
			node.setAttributeNS(this.namespace, prop, this.value);
		};
		AttributeHook.prototype.unhook = function(node, prop, next) {
			if (next && next.type === "AttributeHook" && next.namespace === this.namespace) return;
			var colonPosition = prop.indexOf(":");
			var localName = colonPosition > -1 ? prop.substr(colonPosition + 1) : prop;
			node.removeAttributeNS(this.namespace, localName);
		};
		AttributeHook.prototype.type = "AttributeHook";
	}));
	//#endregion
	//#region node_modules/lower-case/lower-case.js
	var require_lower_case = /* @__PURE__ */ __commonJSMin(((exports, module) => {
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
					"İ": "i",
					"I": "ı",
					"İ": "i"
				}
			},
			az: {
				regexp: /[\u0130]/g,
				map: {
					"İ": "i",
					"I": "ı",
					"İ": "i"
				}
			},
			lt: {
				regexp: /[\u0049\u004A\u012E\u00CC\u00CD\u0128]/g,
				map: {
					"I": "i̇",
					"J": "j̇",
					"Į": "į̇",
					"Ì": "i̇̀",
					"Í": "i̇́",
					"Ĩ": "i̇̃"
				}
			}
		};
		/**
		* Lowercase a string.
		*
		* @param  {String} str
		* @return {String}
		*/
		module.exports = function(str, locale) {
			var lang = LANGUAGES[locale];
			str = str == null ? "" : String(str);
			if (lang) str = str.replace(lang.regexp, function(m) {
				return lang.map[m];
			});
			return str.toLowerCase();
		};
	}));
	//#endregion
	//#region node_modules/sentence-case/vendor/non-word-regexp.js
	var require_non_word_regexp = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		module.exports = /[^\u0041-\u005A\u0061-\u007A\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC\u0030-\u0039\u00B2\u00B3\u00B9\u00BC-\u00BE\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u09F4-\u09F9\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0B72-\u0B77\u0BE6-\u0BF2\u0C66-\u0C6F\u0C78-\u0C7E\u0CE6-\u0CEF\u0D66-\u0D75\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F33\u1040-\u1049\u1090-\u1099\u1369-\u137C\u16EE-\u16F0\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1946-\u194F\u19D0-\u19DA\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\u2070\u2074-\u2079\u2080-\u2089\u2150-\u2182\u2185-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2CFD\u3007\u3021-\u3029\u3038-\u303A\u3192-\u3195\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\uA620-\uA629\uA6E6-\uA6EF\uA830-\uA835\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19]+/g;
	}));
	//#endregion
	//#region node_modules/sentence-case/vendor/camel-case-regexp.js
	var require_camel_case_regexp = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		module.exports = /([\u0061-\u007A\u00B5\u00DF-\u00F6\u00F8-\u00FF\u0101\u0103\u0105\u0107\u0109\u010B\u010D\u010F\u0111\u0113\u0115\u0117\u0119\u011B\u011D\u011F\u0121\u0123\u0125\u0127\u0129\u012B\u012D\u012F\u0131\u0133\u0135\u0137\u0138\u013A\u013C\u013E\u0140\u0142\u0144\u0146\u0148\u0149\u014B\u014D\u014F\u0151\u0153\u0155\u0157\u0159\u015B\u015D\u015F\u0161\u0163\u0165\u0167\u0169\u016B\u016D\u016F\u0171\u0173\u0175\u0177\u017A\u017C\u017E-\u0180\u0183\u0185\u0188\u018C\u018D\u0192\u0195\u0199-\u019B\u019E\u01A1\u01A3\u01A5\u01A8\u01AA\u01AB\u01AD\u01B0\u01B4\u01B6\u01B9\u01BA\u01BD-\u01BF\u01C6\u01C9\u01CC\u01CE\u01D0\u01D2\u01D4\u01D6\u01D8\u01DA\u01DC\u01DD\u01DF\u01E1\u01E3\u01E5\u01E7\u01E9\u01EB\u01ED\u01EF\u01F0\u01F3\u01F5\u01F9\u01FB\u01FD\u01FF\u0201\u0203\u0205\u0207\u0209\u020B\u020D\u020F\u0211\u0213\u0215\u0217\u0219\u021B\u021D\u021F\u0221\u0223\u0225\u0227\u0229\u022B\u022D\u022F\u0231\u0233-\u0239\u023C\u023F\u0240\u0242\u0247\u0249\u024B\u024D\u024F-\u0293\u0295-\u02AF\u0371\u0373\u0377\u037B-\u037D\u0390\u03AC-\u03CE\u03D0\u03D1\u03D5-\u03D7\u03D9\u03DB\u03DD\u03DF\u03E1\u03E3\u03E5\u03E7\u03E9\u03EB\u03ED\u03EF-\u03F3\u03F5\u03F8\u03FB\u03FC\u0430-\u045F\u0461\u0463\u0465\u0467\u0469\u046B\u046D\u046F\u0471\u0473\u0475\u0477\u0479\u047B\u047D\u047F\u0481\u048B\u048D\u048F\u0491\u0493\u0495\u0497\u0499\u049B\u049D\u049F\u04A1\u04A3\u04A5\u04A7\u04A9\u04AB\u04AD\u04AF\u04B1\u04B3\u04B5\u04B7\u04B9\u04BB\u04BD\u04BF\u04C2\u04C4\u04C6\u04C8\u04CA\u04CC\u04CE\u04CF\u04D1\u04D3\u04D5\u04D7\u04D9\u04DB\u04DD\u04DF\u04E1\u04E3\u04E5\u04E7\u04E9\u04EB\u04ED\u04EF\u04F1\u04F3\u04F5\u04F7\u04F9\u04FB\u04FD\u04FF\u0501\u0503\u0505\u0507\u0509\u050B\u050D\u050F\u0511\u0513\u0515\u0517\u0519\u051B\u051D\u051F\u0521\u0523\u0525\u0527\u0561-\u0587\u1D00-\u1D2B\u1D6B-\u1D77\u1D79-\u1D9A\u1E01\u1E03\u1E05\u1E07\u1E09\u1E0B\u1E0D\u1E0F\u1E11\u1E13\u1E15\u1E17\u1E19\u1E1B\u1E1D\u1E1F\u1E21\u1E23\u1E25\u1E27\u1E29\u1E2B\u1E2D\u1E2F\u1E31\u1E33\u1E35\u1E37\u1E39\u1E3B\u1E3D\u1E3F\u1E41\u1E43\u1E45\u1E47\u1E49\u1E4B\u1E4D\u1E4F\u1E51\u1E53\u1E55\u1E57\u1E59\u1E5B\u1E5D\u1E5F\u1E61\u1E63\u1E65\u1E67\u1E69\u1E6B\u1E6D\u1E6F\u1E71\u1E73\u1E75\u1E77\u1E79\u1E7B\u1E7D\u1E7F\u1E81\u1E83\u1E85\u1E87\u1E89\u1E8B\u1E8D\u1E8F\u1E91\u1E93\u1E95-\u1E9D\u1E9F\u1EA1\u1EA3\u1EA5\u1EA7\u1EA9\u1EAB\u1EAD\u1EAF\u1EB1\u1EB3\u1EB5\u1EB7\u1EB9\u1EBB\u1EBD\u1EBF\u1EC1\u1EC3\u1EC5\u1EC7\u1EC9\u1ECB\u1ECD\u1ECF\u1ED1\u1ED3\u1ED5\u1ED7\u1ED9\u1EDB\u1EDD\u1EDF\u1EE1\u1EE3\u1EE5\u1EE7\u1EE9\u1EEB\u1EED\u1EEF\u1EF1\u1EF3\u1EF5\u1EF7\u1EF9\u1EFB\u1EFD\u1EFF-\u1F07\u1F10-\u1F15\u1F20-\u1F27\u1F30-\u1F37\u1F40-\u1F45\u1F50-\u1F57\u1F60-\u1F67\u1F70-\u1F7D\u1F80-\u1F87\u1F90-\u1F97\u1FA0-\u1FA7\u1FB0-\u1FB4\u1FB6\u1FB7\u1FBE\u1FC2-\u1FC4\u1FC6\u1FC7\u1FD0-\u1FD3\u1FD6\u1FD7\u1FE0-\u1FE7\u1FF2-\u1FF4\u1FF6\u1FF7\u210A\u210E\u210F\u2113\u212F\u2134\u2139\u213C\u213D\u2146-\u2149\u214E\u2184\u2C30-\u2C5E\u2C61\u2C65\u2C66\u2C68\u2C6A\u2C6C\u2C71\u2C73\u2C74\u2C76-\u2C7B\u2C81\u2C83\u2C85\u2C87\u2C89\u2C8B\u2C8D\u2C8F\u2C91\u2C93\u2C95\u2C97\u2C99\u2C9B\u2C9D\u2C9F\u2CA1\u2CA3\u2CA5\u2CA7\u2CA9\u2CAB\u2CAD\u2CAF\u2CB1\u2CB3\u2CB5\u2CB7\u2CB9\u2CBB\u2CBD\u2CBF\u2CC1\u2CC3\u2CC5\u2CC7\u2CC9\u2CCB\u2CCD\u2CCF\u2CD1\u2CD3\u2CD5\u2CD7\u2CD9\u2CDB\u2CDD\u2CDF\u2CE1\u2CE3\u2CE4\u2CEC\u2CEE\u2CF3\u2D00-\u2D25\u2D27\u2D2D\uA641\uA643\uA645\uA647\uA649\uA64B\uA64D\uA64F\uA651\uA653\uA655\uA657\uA659\uA65B\uA65D\uA65F\uA661\uA663\uA665\uA667\uA669\uA66B\uA66D\uA681\uA683\uA685\uA687\uA689\uA68B\uA68D\uA68F\uA691\uA693\uA695\uA697\uA723\uA725\uA727\uA729\uA72B\uA72D\uA72F-\uA731\uA733\uA735\uA737\uA739\uA73B\uA73D\uA73F\uA741\uA743\uA745\uA747\uA749\uA74B\uA74D\uA74F\uA751\uA753\uA755\uA757\uA759\uA75B\uA75D\uA75F\uA761\uA763\uA765\uA767\uA769\uA76B\uA76D\uA76F\uA771-\uA778\uA77A\uA77C\uA77F\uA781\uA783\uA785\uA787\uA78C\uA78E\uA791\uA793\uA7A1\uA7A3\uA7A5\uA7A7\uA7A9\uA7FA\uFB00-\uFB06\uFB13-\uFB17\uFF41-\uFF5A])([\u0041-\u005A\u00C0-\u00D6\u00D8-\u00DE\u0100\u0102\u0104\u0106\u0108\u010A\u010C\u010E\u0110\u0112\u0114\u0116\u0118\u011A\u011C\u011E\u0120\u0122\u0124\u0126\u0128\u012A\u012C\u012E\u0130\u0132\u0134\u0136\u0139\u013B\u013D\u013F\u0141\u0143\u0145\u0147\u014A\u014C\u014E\u0150\u0152\u0154\u0156\u0158\u015A\u015C\u015E\u0160\u0162\u0164\u0166\u0168\u016A\u016C\u016E\u0170\u0172\u0174\u0176\u0178\u0179\u017B\u017D\u0181\u0182\u0184\u0186\u0187\u0189-\u018B\u018E-\u0191\u0193\u0194\u0196-\u0198\u019C\u019D\u019F\u01A0\u01A2\u01A4\u01A6\u01A7\u01A9\u01AC\u01AE\u01AF\u01B1-\u01B3\u01B5\u01B7\u01B8\u01BC\u01C4\u01C7\u01CA\u01CD\u01CF\u01D1\u01D3\u01D5\u01D7\u01D9\u01DB\u01DE\u01E0\u01E2\u01E4\u01E6\u01E8\u01EA\u01EC\u01EE\u01F1\u01F4\u01F6-\u01F8\u01FA\u01FC\u01FE\u0200\u0202\u0204\u0206\u0208\u020A\u020C\u020E\u0210\u0212\u0214\u0216\u0218\u021A\u021C\u021E\u0220\u0222\u0224\u0226\u0228\u022A\u022C\u022E\u0230\u0232\u023A\u023B\u023D\u023E\u0241\u0243-\u0246\u0248\u024A\u024C\u024E\u0370\u0372\u0376\u0386\u0388-\u038A\u038C\u038E\u038F\u0391-\u03A1\u03A3-\u03AB\u03CF\u03D2-\u03D4\u03D8\u03DA\u03DC\u03DE\u03E0\u03E2\u03E4\u03E6\u03E8\u03EA\u03EC\u03EE\u03F4\u03F7\u03F9\u03FA\u03FD-\u042F\u0460\u0462\u0464\u0466\u0468\u046A\u046C\u046E\u0470\u0472\u0474\u0476\u0478\u047A\u047C\u047E\u0480\u048A\u048C\u048E\u0490\u0492\u0494\u0496\u0498\u049A\u049C\u049E\u04A0\u04A2\u04A4\u04A6\u04A8\u04AA\u04AC\u04AE\u04B0\u04B2\u04B4\u04B6\u04B8\u04BA\u04BC\u04BE\u04C0\u04C1\u04C3\u04C5\u04C7\u04C9\u04CB\u04CD\u04D0\u04D2\u04D4\u04D6\u04D8\u04DA\u04DC\u04DE\u04E0\u04E2\u04E4\u04E6\u04E8\u04EA\u04EC\u04EE\u04F0\u04F2\u04F4\u04F6\u04F8\u04FA\u04FC\u04FE\u0500\u0502\u0504\u0506\u0508\u050A\u050C\u050E\u0510\u0512\u0514\u0516\u0518\u051A\u051C\u051E\u0520\u0522\u0524\u0526\u0531-\u0556\u10A0-\u10C5\u10C7\u10CD\u1E00\u1E02\u1E04\u1E06\u1E08\u1E0A\u1E0C\u1E0E\u1E10\u1E12\u1E14\u1E16\u1E18\u1E1A\u1E1C\u1E1E\u1E20\u1E22\u1E24\u1E26\u1E28\u1E2A\u1E2C\u1E2E\u1E30\u1E32\u1E34\u1E36\u1E38\u1E3A\u1E3C\u1E3E\u1E40\u1E42\u1E44\u1E46\u1E48\u1E4A\u1E4C\u1E4E\u1E50\u1E52\u1E54\u1E56\u1E58\u1E5A\u1E5C\u1E5E\u1E60\u1E62\u1E64\u1E66\u1E68\u1E6A\u1E6C\u1E6E\u1E70\u1E72\u1E74\u1E76\u1E78\u1E7A\u1E7C\u1E7E\u1E80\u1E82\u1E84\u1E86\u1E88\u1E8A\u1E8C\u1E8E\u1E90\u1E92\u1E94\u1E9E\u1EA0\u1EA2\u1EA4\u1EA6\u1EA8\u1EAA\u1EAC\u1EAE\u1EB0\u1EB2\u1EB4\u1EB6\u1EB8\u1EBA\u1EBC\u1EBE\u1EC0\u1EC2\u1EC4\u1EC6\u1EC8\u1ECA\u1ECC\u1ECE\u1ED0\u1ED2\u1ED4\u1ED6\u1ED8\u1EDA\u1EDC\u1EDE\u1EE0\u1EE2\u1EE4\u1EE6\u1EE8\u1EEA\u1EEC\u1EEE\u1EF0\u1EF2\u1EF4\u1EF6\u1EF8\u1EFA\u1EFC\u1EFE\u1F08-\u1F0F\u1F18-\u1F1D\u1F28-\u1F2F\u1F38-\u1F3F\u1F48-\u1F4D\u1F59\u1F5B\u1F5D\u1F5F\u1F68-\u1F6F\u1FB8-\u1FBB\u1FC8-\u1FCB\u1FD8-\u1FDB\u1FE8-\u1FEC\u1FF8-\u1FFB\u2102\u2107\u210B-\u210D\u2110-\u2112\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u2130-\u2133\u213E\u213F\u2145\u2183\u2C00-\u2C2E\u2C60\u2C62-\u2C64\u2C67\u2C69\u2C6B\u2C6D-\u2C70\u2C72\u2C75\u2C7E-\u2C80\u2C82\u2C84\u2C86\u2C88\u2C8A\u2C8C\u2C8E\u2C90\u2C92\u2C94\u2C96\u2C98\u2C9A\u2C9C\u2C9E\u2CA0\u2CA2\u2CA4\u2CA6\u2CA8\u2CAA\u2CAC\u2CAE\u2CB0\u2CB2\u2CB4\u2CB6\u2CB8\u2CBA\u2CBC\u2CBE\u2CC0\u2CC2\u2CC4\u2CC6\u2CC8\u2CCA\u2CCC\u2CCE\u2CD0\u2CD2\u2CD4\u2CD6\u2CD8\u2CDA\u2CDC\u2CDE\u2CE0\u2CE2\u2CEB\u2CED\u2CF2\uA640\uA642\uA644\uA646\uA648\uA64A\uA64C\uA64E\uA650\uA652\uA654\uA656\uA658\uA65A\uA65C\uA65E\uA660\uA662\uA664\uA666\uA668\uA66A\uA66C\uA680\uA682\uA684\uA686\uA688\uA68A\uA68C\uA68E\uA690\uA692\uA694\uA696\uA722\uA724\uA726\uA728\uA72A\uA72C\uA72E\uA732\uA734\uA736\uA738\uA73A\uA73C\uA73E\uA740\uA742\uA744\uA746\uA748\uA74A\uA74C\uA74E\uA750\uA752\uA754\uA756\uA758\uA75A\uA75C\uA75E\uA760\uA762\uA764\uA766\uA768\uA76A\uA76C\uA76E\uA779\uA77B\uA77D\uA77E\uA780\uA782\uA784\uA786\uA78B\uA78D\uA790\uA792\uA7A0\uA7A2\uA7A4\uA7A6\uA7A8\uA7AA\uFF21-\uFF3A\u0030-\u0039\u00B2\u00B3\u00B9\u00BC-\u00BE\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u09F4-\u09F9\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0B72-\u0B77\u0BE6-\u0BF2\u0C66-\u0C6F\u0C78-\u0C7E\u0CE6-\u0CEF\u0D66-\u0D75\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F33\u1040-\u1049\u1090-\u1099\u1369-\u137C\u16EE-\u16F0\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1946-\u194F\u19D0-\u19DA\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\u2070\u2074-\u2079\u2080-\u2089\u2150-\u2182\u2185-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2CFD\u3007\u3021-\u3029\u3038-\u303A\u3192-\u3195\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\uA620-\uA629\uA6E6-\uA6EF\uA830-\uA835\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19])/g;
	}));
	//#endregion
	//#region node_modules/sentence-case/vendor/trailing-digit-regexp.js
	var require_trailing_digit_regexp = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		module.exports = /([\u0030-\u0039\u00B2\u00B3\u00B9\u00BC-\u00BE\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u09F4-\u09F9\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0B72-\u0B77\u0BE6-\u0BF2\u0C66-\u0C6F\u0C78-\u0C7E\u0CE6-\u0CEF\u0D66-\u0D75\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F33\u1040-\u1049\u1090-\u1099\u1369-\u137C\u16EE-\u16F0\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1946-\u194F\u19D0-\u19DA\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\u2070\u2074-\u2079\u2080-\u2089\u2150-\u2182\u2185-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2CFD\u3007\u3021-\u3029\u3038-\u303A\u3192-\u3195\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\uA620-\uA629\uA6E6-\uA6EF\uA830-\uA835\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19])([^\u0030-\u0039\u00B2\u00B3\u00B9\u00BC-\u00BE\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u09F4-\u09F9\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0B72-\u0B77\u0BE6-\u0BF2\u0C66-\u0C6F\u0C78-\u0C7E\u0CE6-\u0CEF\u0D66-\u0D75\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F33\u1040-\u1049\u1090-\u1099\u1369-\u137C\u16EE-\u16F0\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1946-\u194F\u19D0-\u19DA\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\u2070\u2074-\u2079\u2080-\u2089\u2150-\u2182\u2185-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2CFD\u3007\u3021-\u3029\u3038-\u303A\u3192-\u3195\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\uA620-\uA629\uA6E6-\uA6EF\uA830-\uA835\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19])/g;
	}));
	//#endregion
	//#region node_modules/sentence-case/sentence-case.js
	var require_sentence_case = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var lowerCase = require_lower_case();
		var NON_WORD_REGEXP = require_non_word_regexp();
		var CAMEL_CASE_REGEXP = require_camel_case_regexp();
		var TRAILING_DIGIT_REGEXP = require_trailing_digit_regexp();
		/**
		* Sentence case a string.
		*
		* @param  {String} str
		* @param  {String} locale
		* @param  {String} replacement
		* @return {String}
		*/
		module.exports = function(str, locale, replacement) {
			if (str == null) return "";
			replacement = replacement || " ";
			function replace(match, index, string) {
				if (index === 0 || index === string.length - match.length) return "";
				return replacement;
			}
			str = String(str).replace(CAMEL_CASE_REGEXP, "$1 $2").replace(TRAILING_DIGIT_REGEXP, "$1 $2").replace(NON_WORD_REGEXP, replace);
			return lowerCase(str, locale);
		};
	}));
	//#endregion
	//#region node_modules/param-case/param-case.js
	var require_param_case = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var sentenceCase = require_sentence_case();
		/**
		* Param case a string.
		*
		* @param  {String} string
		* @param  {String} [locale]
		* @return {String}
		*/
		module.exports = function(string, locale) {
			return sentenceCase(string, locale, "-");
		};
	}));
	//#endregion
	//#region node_modules/vdom-to-html/property-config.js
	var require_property_config = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		/**
		* Attribute types.
		*/
		var types = {
			BOOLEAN: 1,
			OVERLOADED_BOOLEAN: 2
		};
		/**
		* Exports.
		*/
		module.exports = {
			attributeTypes: types,
			properties: {
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
				autocapitalize: true,
				autocorrect: true,
				itemProp: true,
				itemScope: types.BOOLEAN,
				itemType: true,
				property: true
			},
			attributeNames: {
				acceptCharset: "accept-charset",
				className: "class",
				htmlFor: "for",
				httpEquiv: "http-equiv"
			}
		};
	}));
	//#endregion
	//#region node_modules/vdom-to-html/create-attribute.js
	var require_create_attribute = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var escape = require_escape_html();
		var propConfig = require_property_config();
		var types = propConfig.attributeTypes;
		var properties = propConfig.properties;
		var attributeNames = propConfig.attributeNames;
		var prefixAttribute = memoizeString(function(name) {
			return escape(name) + "=\"";
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
				if (shouldSkip(name, value)) return "";
				name = (attributeNames[name] || name).toLowerCase();
				var attrType = properties[name];
				if (attrType === types.BOOLEAN || attrType === types.OVERLOADED_BOOLEAN && value === true) return escape(name);
				return prefixAttribute(name) + escape(value) + "\"";
			} else if (isAttribute) {
				if (value == null) return "";
				return prefixAttribute(name) + escape(value) + "\"";
			}
			return null;
		}
		/**
		* Should skip false boolean attributes.
		*/
		function shouldSkip(name, value) {
			var attrType = properties[name];
			return value == null || attrType === types.BOOLEAN && !value || attrType === types.OVERLOADED_BOOLEAN && value === false;
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
				if (cache.hasOwnProperty(string)) return cache[string];
				else return cache[string] = callback.call(this, string);
			};
		}
	}));
	//#endregion
	//#region node_modules/vdom-to-html/void-elements.js
	var require_void_elements = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		/**
		* Void elements.
		*
		* https://github.com/facebook/react/blob/v0.12.0/src/browser/ui/ReactDOMComponent.js#L99
		*/
		module.exports = {
			"area": true,
			"base": true,
			"br": true,
			"col": true,
			"embed": true,
			"hr": true,
			"img": true,
			"input": true,
			"keygen": true,
			"link": true,
			"meta": true,
			"param": true,
			"source": true,
			"track": true,
			"wbr": true
		};
	}));
	//#endregion
	//#region node_modules/vdom-to-html/index.js
	var require_vdom_to_html = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var escape = require_escape_html();
		var extend = require_immutable();
		var isVNode = require_is_vnode();
		var isVText = require_is_vtext();
		var isThunk = require_is_thunk();
		var isWidget = require_is_widget();
		var softHook = require_soft_set_hook();
		var attrHook = require_attribute_hook();
		var paramCase = require_param_case();
		var createAttribute = require_create_attribute();
		var voidElements = require_void_elements();
		module.exports = toHTML;
		function toHTML(node, parent) {
			if (!node) return "";
			if (isThunk(node)) node = node.render();
			if (isWidget(node) && node.render) node = node.render();
			if (isVNode(node)) return openTag(node) + tagContent(node) + closeTag(node);
			else if (isVText(node)) {
				if (parent && (parent.tagName.toLowerCase() === "script" || parent.tagName.toLowerCase() === "style")) return String(node.text);
				return escape(String(node.text));
			}
			return "";
		}
		function openTag(node) {
			var props = node.properties;
			var ret = "<" + node.tagName.toLowerCase();
			for (var name in props) {
				var value = props[name];
				if (value == null) continue;
				if (name == "attributes") {
					value = extend({}, value);
					for (var attrProp in value) ret += " " + createAttribute(attrProp, value[attrProp], true);
					continue;
				}
				if (name == "dataset") {
					value = extend({}, value);
					for (var dataProp in value) ret += " " + createAttribute("data-" + paramCase(dataProp), value[dataProp], true);
					continue;
				}
				if (name == "style") {
					var css = "";
					value = extend({}, value);
					for (var styleProp in value) css += paramCase(styleProp) + ": " + value[styleProp] + "; ";
					value = css.trim();
				}
				if (value instanceof softHook || value instanceof attrHook) {
					ret += " " + createAttribute(name, value.value, true);
					continue;
				}
				var attr = createAttribute(name, value);
				if (attr) ret += " " + attr;
			}
			return ret + ">";
		}
		function tagContent(node) {
			var innerHTML = node.properties.innerHTML;
			if (innerHTML != null) return innerHTML;
			else {
				var ret = "";
				if (node.children && node.children.length) for (var i = 0, l = node.children.length; i < l; i++) {
					var child = node.children[i];
					ret += toHTML(child, node);
				}
				return ret;
			}
		}
		function closeTag(node) {
			var tag = node.tagName.toLowerCase();
			return voidElements[tag] ? "" : "</" + tag + ">";
		}
	}));
	//#endregion
	//#region node_modules/vdom-parser/property-map.js
	/**
	* property-map.js
	*
	* Necessary to map dom attributes back to vdom properties
	*/
	var require_property_map = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		module.exports = {
			"abbr": "abbr",
			"accept": "accept",
			"accept-charset": "acceptCharset",
			"accesskey": "accessKey",
			"action": "action",
			"allowfullscreen": "allowFullScreen",
			"allowtransparency": "allowTransparency",
			"alt": "alt",
			"async": "async",
			"autocomplete": "autoComplete",
			"autofocus": "autoFocus",
			"autoplay": "autoPlay",
			"cellpadding": "cellPadding",
			"cellspacing": "cellSpacing",
			"challenge": "challenge",
			"charset": "charset",
			"checked": "checked",
			"cite": "cite",
			"class": "className",
			"cols": "cols",
			"colspan": "colSpan",
			"command": "command",
			"content": "content",
			"contenteditable": "contentEditable",
			"contextmenu": "contextMenu",
			"controls": "controls",
			"coords": "coords",
			"crossorigin": "crossOrigin",
			"data": "data",
			"datetime": "dateTime",
			"default": "default",
			"defer": "defer",
			"dir": "dir",
			"disabled": "disabled",
			"download": "download",
			"draggable": "draggable",
			"dropzone": "dropzone",
			"enctype": "encType",
			"for": "htmlFor",
			"form": "form",
			"formaction": "formAction",
			"formenctype": "formEncType",
			"formmethod": "formMethod",
			"formnovalidate": "formNoValidate",
			"formtarget": "formTarget",
			"frameBorder": "frameBorder",
			"headers": "headers",
			"height": "height",
			"hidden": "hidden",
			"high": "high",
			"href": "href",
			"hreflang": "hrefLang",
			"http-equiv": "httpEquiv",
			"icon": "icon",
			"id": "id",
			"inputmode": "inputMode",
			"ismap": "isMap",
			"itemid": "itemId",
			"itemprop": "itemProp",
			"itemref": "itemRef",
			"itemscope": "itemScope",
			"itemtype": "itemType",
			"kind": "kind",
			"label": "label",
			"lang": "lang",
			"list": "list",
			"loop": "loop",
			"manifest": "manifest",
			"max": "max",
			"maxlength": "maxLength",
			"media": "media",
			"mediagroup": "mediaGroup",
			"method": "method",
			"min": "min",
			"minlength": "minLength",
			"multiple": "multiple",
			"muted": "muted",
			"name": "name",
			"novalidate": "noValidate",
			"open": "open",
			"optimum": "optimum",
			"pattern": "pattern",
			"ping": "ping",
			"placeholder": "placeholder",
			"poster": "poster",
			"preload": "preload",
			"radiogroup": "radioGroup",
			"readonly": "readOnly",
			"rel": "rel",
			"required": "required",
			"role": "role",
			"rows": "rows",
			"rowspan": "rowSpan",
			"sandbox": "sandbox",
			"scope": "scope",
			"scoped": "scoped",
			"scrolling": "scrolling",
			"seamless": "seamless",
			"selected": "selected",
			"shape": "shape",
			"size": "size",
			"sizes": "sizes",
			"sortable": "sortable",
			"span": "span",
			"spellcheck": "spellCheck",
			"src": "src",
			"srcdoc": "srcDoc",
			"srcset": "srcSet",
			"start": "start",
			"step": "step",
			"style": "style",
			"tabindex": "tabIndex",
			"target": "target",
			"title": "title",
			"translate": "translate",
			"type": "type",
			"typemustmatch": "typeMustMatch",
			"usemap": "useMap",
			"value": "value",
			"width": "width",
			"wmode": "wmode",
			"wrap": "wrap"
		};
	}));
	//#endregion
	//#region node_modules/vdom-parser/namespace-map.js
	/**
	* namespace-map.js
	*
	* Necessary to map svg attributes back to their namespace
	*/
	var require_namespace_map = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var DEFAULT_NAMESPACE = null;
		var EV_NAMESPACE = "http://www.w3.org/2001/xml-events";
		var XLINK_NAMESPACE = "http://www.w3.org/1999/xlink";
		var XML_NAMESPACE = "http://www.w3.org/XML/1998/namespace";
		module.exports = {
			"about": DEFAULT_NAMESPACE,
			"accent-height": DEFAULT_NAMESPACE,
			"accumulate": DEFAULT_NAMESPACE,
			"additive": DEFAULT_NAMESPACE,
			"alignment-baseline": DEFAULT_NAMESPACE,
			"alphabetic": DEFAULT_NAMESPACE,
			"amplitude": DEFAULT_NAMESPACE,
			"arabic-form": DEFAULT_NAMESPACE,
			"ascent": DEFAULT_NAMESPACE,
			"attributeName": DEFAULT_NAMESPACE,
			"attributeType": DEFAULT_NAMESPACE,
			"azimuth": DEFAULT_NAMESPACE,
			"bandwidth": DEFAULT_NAMESPACE,
			"baseFrequency": DEFAULT_NAMESPACE,
			"baseProfile": DEFAULT_NAMESPACE,
			"baseline-shift": DEFAULT_NAMESPACE,
			"bbox": DEFAULT_NAMESPACE,
			"begin": DEFAULT_NAMESPACE,
			"bias": DEFAULT_NAMESPACE,
			"by": DEFAULT_NAMESPACE,
			"calcMode": DEFAULT_NAMESPACE,
			"cap-height": DEFAULT_NAMESPACE,
			"class": DEFAULT_NAMESPACE,
			"clip": DEFAULT_NAMESPACE,
			"clip-path": DEFAULT_NAMESPACE,
			"clip-rule": DEFAULT_NAMESPACE,
			"clipPathUnits": DEFAULT_NAMESPACE,
			"color": DEFAULT_NAMESPACE,
			"color-interpolation": DEFAULT_NAMESPACE,
			"color-interpolation-filters": DEFAULT_NAMESPACE,
			"color-profile": DEFAULT_NAMESPACE,
			"color-rendering": DEFAULT_NAMESPACE,
			"content": DEFAULT_NAMESPACE,
			"contentScriptType": DEFAULT_NAMESPACE,
			"contentStyleType": DEFAULT_NAMESPACE,
			"cursor": DEFAULT_NAMESPACE,
			"cx": DEFAULT_NAMESPACE,
			"cy": DEFAULT_NAMESPACE,
			"d": DEFAULT_NAMESPACE,
			"datatype": DEFAULT_NAMESPACE,
			"defaultAction": DEFAULT_NAMESPACE,
			"descent": DEFAULT_NAMESPACE,
			"diffuseConstant": DEFAULT_NAMESPACE,
			"direction": DEFAULT_NAMESPACE,
			"display": DEFAULT_NAMESPACE,
			"divisor": DEFAULT_NAMESPACE,
			"dominant-baseline": DEFAULT_NAMESPACE,
			"dur": DEFAULT_NAMESPACE,
			"dx": DEFAULT_NAMESPACE,
			"dy": DEFAULT_NAMESPACE,
			"edgeMode": DEFAULT_NAMESPACE,
			"editable": DEFAULT_NAMESPACE,
			"elevation": DEFAULT_NAMESPACE,
			"enable-background": DEFAULT_NAMESPACE,
			"end": DEFAULT_NAMESPACE,
			"ev:event": EV_NAMESPACE,
			"event": DEFAULT_NAMESPACE,
			"exponent": DEFAULT_NAMESPACE,
			"externalResourcesRequired": DEFAULT_NAMESPACE,
			"fill": DEFAULT_NAMESPACE,
			"fill-opacity": DEFAULT_NAMESPACE,
			"fill-rule": DEFAULT_NAMESPACE,
			"filter": DEFAULT_NAMESPACE,
			"filterRes": DEFAULT_NAMESPACE,
			"filterUnits": DEFAULT_NAMESPACE,
			"flood-color": DEFAULT_NAMESPACE,
			"flood-opacity": DEFAULT_NAMESPACE,
			"focusHighlight": DEFAULT_NAMESPACE,
			"focusable": DEFAULT_NAMESPACE,
			"font-family": DEFAULT_NAMESPACE,
			"font-size": DEFAULT_NAMESPACE,
			"font-size-adjust": DEFAULT_NAMESPACE,
			"font-stretch": DEFAULT_NAMESPACE,
			"font-style": DEFAULT_NAMESPACE,
			"font-variant": DEFAULT_NAMESPACE,
			"font-weight": DEFAULT_NAMESPACE,
			"format": DEFAULT_NAMESPACE,
			"from": DEFAULT_NAMESPACE,
			"fx": DEFAULT_NAMESPACE,
			"fy": DEFAULT_NAMESPACE,
			"g1": DEFAULT_NAMESPACE,
			"g2": DEFAULT_NAMESPACE,
			"glyph-name": DEFAULT_NAMESPACE,
			"glyph-orientation-horizontal": DEFAULT_NAMESPACE,
			"glyph-orientation-vertical": DEFAULT_NAMESPACE,
			"glyphRef": DEFAULT_NAMESPACE,
			"gradientTransform": DEFAULT_NAMESPACE,
			"gradientUnits": DEFAULT_NAMESPACE,
			"handler": DEFAULT_NAMESPACE,
			"hanging": DEFAULT_NAMESPACE,
			"height": DEFAULT_NAMESPACE,
			"horiz-adv-x": DEFAULT_NAMESPACE,
			"horiz-origin-x": DEFAULT_NAMESPACE,
			"horiz-origin-y": DEFAULT_NAMESPACE,
			"id": DEFAULT_NAMESPACE,
			"ideographic": DEFAULT_NAMESPACE,
			"image-rendering": DEFAULT_NAMESPACE,
			"in": DEFAULT_NAMESPACE,
			"in2": DEFAULT_NAMESPACE,
			"initialVisibility": DEFAULT_NAMESPACE,
			"intercept": DEFAULT_NAMESPACE,
			"k": DEFAULT_NAMESPACE,
			"k1": DEFAULT_NAMESPACE,
			"k2": DEFAULT_NAMESPACE,
			"k3": DEFAULT_NAMESPACE,
			"k4": DEFAULT_NAMESPACE,
			"kernelMatrix": DEFAULT_NAMESPACE,
			"kernelUnitLength": DEFAULT_NAMESPACE,
			"kerning": DEFAULT_NAMESPACE,
			"keyPoints": DEFAULT_NAMESPACE,
			"keySplines": DEFAULT_NAMESPACE,
			"keyTimes": DEFAULT_NAMESPACE,
			"lang": DEFAULT_NAMESPACE,
			"lengthAdjust": DEFAULT_NAMESPACE,
			"letter-spacing": DEFAULT_NAMESPACE,
			"lighting-color": DEFAULT_NAMESPACE,
			"limitingConeAngle": DEFAULT_NAMESPACE,
			"local": DEFAULT_NAMESPACE,
			"marker-end": DEFAULT_NAMESPACE,
			"marker-mid": DEFAULT_NAMESPACE,
			"marker-start": DEFAULT_NAMESPACE,
			"markerHeight": DEFAULT_NAMESPACE,
			"markerUnits": DEFAULT_NAMESPACE,
			"markerWidth": DEFAULT_NAMESPACE,
			"mask": DEFAULT_NAMESPACE,
			"maskContentUnits": DEFAULT_NAMESPACE,
			"maskUnits": DEFAULT_NAMESPACE,
			"mathematical": DEFAULT_NAMESPACE,
			"max": DEFAULT_NAMESPACE,
			"media": DEFAULT_NAMESPACE,
			"mediaCharacterEncoding": DEFAULT_NAMESPACE,
			"mediaContentEncodings": DEFAULT_NAMESPACE,
			"mediaSize": DEFAULT_NAMESPACE,
			"mediaTime": DEFAULT_NAMESPACE,
			"method": DEFAULT_NAMESPACE,
			"min": DEFAULT_NAMESPACE,
			"mode": DEFAULT_NAMESPACE,
			"name": DEFAULT_NAMESPACE,
			"nav-down": DEFAULT_NAMESPACE,
			"nav-down-left": DEFAULT_NAMESPACE,
			"nav-down-right": DEFAULT_NAMESPACE,
			"nav-left": DEFAULT_NAMESPACE,
			"nav-next": DEFAULT_NAMESPACE,
			"nav-prev": DEFAULT_NAMESPACE,
			"nav-right": DEFAULT_NAMESPACE,
			"nav-up": DEFAULT_NAMESPACE,
			"nav-up-left": DEFAULT_NAMESPACE,
			"nav-up-right": DEFAULT_NAMESPACE,
			"numOctaves": DEFAULT_NAMESPACE,
			"observer": DEFAULT_NAMESPACE,
			"offset": DEFAULT_NAMESPACE,
			"opacity": DEFAULT_NAMESPACE,
			"operator": DEFAULT_NAMESPACE,
			"order": DEFAULT_NAMESPACE,
			"orient": DEFAULT_NAMESPACE,
			"orientation": DEFAULT_NAMESPACE,
			"origin": DEFAULT_NAMESPACE,
			"overflow": DEFAULT_NAMESPACE,
			"overlay": DEFAULT_NAMESPACE,
			"overline-position": DEFAULT_NAMESPACE,
			"overline-thickness": DEFAULT_NAMESPACE,
			"panose-1": DEFAULT_NAMESPACE,
			"path": DEFAULT_NAMESPACE,
			"pathLength": DEFAULT_NAMESPACE,
			"patternContentUnits": DEFAULT_NAMESPACE,
			"patternTransform": DEFAULT_NAMESPACE,
			"patternUnits": DEFAULT_NAMESPACE,
			"phase": DEFAULT_NAMESPACE,
			"playbackOrder": DEFAULT_NAMESPACE,
			"pointer-events": DEFAULT_NAMESPACE,
			"points": DEFAULT_NAMESPACE,
			"pointsAtX": DEFAULT_NAMESPACE,
			"pointsAtY": DEFAULT_NAMESPACE,
			"pointsAtZ": DEFAULT_NAMESPACE,
			"preserveAlpha": DEFAULT_NAMESPACE,
			"preserveAspectRatio": DEFAULT_NAMESPACE,
			"primitiveUnits": DEFAULT_NAMESPACE,
			"propagate": DEFAULT_NAMESPACE,
			"property": DEFAULT_NAMESPACE,
			"r": DEFAULT_NAMESPACE,
			"radius": DEFAULT_NAMESPACE,
			"refX": DEFAULT_NAMESPACE,
			"refY": DEFAULT_NAMESPACE,
			"rel": DEFAULT_NAMESPACE,
			"rendering-intent": DEFAULT_NAMESPACE,
			"repeatCount": DEFAULT_NAMESPACE,
			"repeatDur": DEFAULT_NAMESPACE,
			"requiredExtensions": DEFAULT_NAMESPACE,
			"requiredFeatures": DEFAULT_NAMESPACE,
			"requiredFonts": DEFAULT_NAMESPACE,
			"requiredFormats": DEFAULT_NAMESPACE,
			"resource": DEFAULT_NAMESPACE,
			"restart": DEFAULT_NAMESPACE,
			"result": DEFAULT_NAMESPACE,
			"rev": DEFAULT_NAMESPACE,
			"role": DEFAULT_NAMESPACE,
			"rotate": DEFAULT_NAMESPACE,
			"rx": DEFAULT_NAMESPACE,
			"ry": DEFAULT_NAMESPACE,
			"scale": DEFAULT_NAMESPACE,
			"seed": DEFAULT_NAMESPACE,
			"shape-rendering": DEFAULT_NAMESPACE,
			"slope": DEFAULT_NAMESPACE,
			"snapshotTime": DEFAULT_NAMESPACE,
			"spacing": DEFAULT_NAMESPACE,
			"specularConstant": DEFAULT_NAMESPACE,
			"specularExponent": DEFAULT_NAMESPACE,
			"spreadMethod": DEFAULT_NAMESPACE,
			"startOffset": DEFAULT_NAMESPACE,
			"stdDeviation": DEFAULT_NAMESPACE,
			"stemh": DEFAULT_NAMESPACE,
			"stemv": DEFAULT_NAMESPACE,
			"stitchTiles": DEFAULT_NAMESPACE,
			"stop-color": DEFAULT_NAMESPACE,
			"stop-opacity": DEFAULT_NAMESPACE,
			"strikethrough-position": DEFAULT_NAMESPACE,
			"strikethrough-thickness": DEFAULT_NAMESPACE,
			"string": DEFAULT_NAMESPACE,
			"stroke": DEFAULT_NAMESPACE,
			"stroke-dasharray": DEFAULT_NAMESPACE,
			"stroke-dashoffset": DEFAULT_NAMESPACE,
			"stroke-linecap": DEFAULT_NAMESPACE,
			"stroke-linejoin": DEFAULT_NAMESPACE,
			"stroke-miterlimit": DEFAULT_NAMESPACE,
			"stroke-opacity": DEFAULT_NAMESPACE,
			"stroke-width": DEFAULT_NAMESPACE,
			"surfaceScale": DEFAULT_NAMESPACE,
			"syncBehavior": DEFAULT_NAMESPACE,
			"syncBehaviorDefault": DEFAULT_NAMESPACE,
			"syncMaster": DEFAULT_NAMESPACE,
			"syncTolerance": DEFAULT_NAMESPACE,
			"syncToleranceDefault": DEFAULT_NAMESPACE,
			"systemLanguage": DEFAULT_NAMESPACE,
			"tableValues": DEFAULT_NAMESPACE,
			"target": DEFAULT_NAMESPACE,
			"targetX": DEFAULT_NAMESPACE,
			"targetY": DEFAULT_NAMESPACE,
			"text-anchor": DEFAULT_NAMESPACE,
			"text-decoration": DEFAULT_NAMESPACE,
			"text-rendering": DEFAULT_NAMESPACE,
			"textLength": DEFAULT_NAMESPACE,
			"timelineBegin": DEFAULT_NAMESPACE,
			"title": DEFAULT_NAMESPACE,
			"to": DEFAULT_NAMESPACE,
			"transform": DEFAULT_NAMESPACE,
			"transformBehavior": DEFAULT_NAMESPACE,
			"type": DEFAULT_NAMESPACE,
			"typeof": DEFAULT_NAMESPACE,
			"u1": DEFAULT_NAMESPACE,
			"u2": DEFAULT_NAMESPACE,
			"underline-position": DEFAULT_NAMESPACE,
			"underline-thickness": DEFAULT_NAMESPACE,
			"unicode": DEFAULT_NAMESPACE,
			"unicode-bidi": DEFAULT_NAMESPACE,
			"unicode-range": DEFAULT_NAMESPACE,
			"units-per-em": DEFAULT_NAMESPACE,
			"v-alphabetic": DEFAULT_NAMESPACE,
			"v-hanging": DEFAULT_NAMESPACE,
			"v-ideographic": DEFAULT_NAMESPACE,
			"v-mathematical": DEFAULT_NAMESPACE,
			"values": DEFAULT_NAMESPACE,
			"version": DEFAULT_NAMESPACE,
			"vert-adv-y": DEFAULT_NAMESPACE,
			"vert-origin-x": DEFAULT_NAMESPACE,
			"vert-origin-y": DEFAULT_NAMESPACE,
			"viewBox": DEFAULT_NAMESPACE,
			"viewTarget": DEFAULT_NAMESPACE,
			"visibility": DEFAULT_NAMESPACE,
			"width": DEFAULT_NAMESPACE,
			"widths": DEFAULT_NAMESPACE,
			"word-spacing": DEFAULT_NAMESPACE,
			"writing-mode": DEFAULT_NAMESPACE,
			"x": DEFAULT_NAMESPACE,
			"x-height": DEFAULT_NAMESPACE,
			"x1": DEFAULT_NAMESPACE,
			"x2": DEFAULT_NAMESPACE,
			"xChannelSelector": DEFAULT_NAMESPACE,
			"xlink:actuate": XLINK_NAMESPACE,
			"xlink:arcrole": XLINK_NAMESPACE,
			"xlink:href": XLINK_NAMESPACE,
			"xlink:role": XLINK_NAMESPACE,
			"xlink:show": XLINK_NAMESPACE,
			"xlink:title": XLINK_NAMESPACE,
			"xlink:type": XLINK_NAMESPACE,
			"xml:base": XML_NAMESPACE,
			"xml:id": XML_NAMESPACE,
			"xml:lang": XML_NAMESPACE,
			"xml:space": XML_NAMESPACE,
			"y": DEFAULT_NAMESPACE,
			"y1": DEFAULT_NAMESPACE,
			"y2": DEFAULT_NAMESPACE,
			"yChannelSelector": DEFAULT_NAMESPACE,
			"z": DEFAULT_NAMESPACE,
			"zoomAndPan": DEFAULT_NAMESPACE
		};
	}));
	//#endregion
	//#region node_modules/vdom-parser/index.js
	/**
	* index.js
	*
	* A client-side DOM to vdom parser based on DOMParser API
	*/
	var require_vdom_parser = /* @__PURE__ */ __commonJSMin(((exports, module) => {
		var VNode = require_vnode();
		var VText = require_vtext();
		var domParser;
		var propertyMap = require_property_map();
		var namespaceMap = require_namespace_map();
		var HTML_NAMESPACE = "http://www.w3.org/1999/xhtml";
		module.exports = parser;
		/**
		* DOM/html string to vdom parser
		*
		* @param   Mixed   el    DOM element or html string
		* @param   String  attr  Attribute name that contains vdom key
		* @return  Object        VNode or VText
		*/
		function parser(el, attr) {
			if (!el) return createNode(document.createTextNode(""));
			if (typeof el === "string") {
				if (!("DOMParser" in window)) throw new Error("DOMParser is not available, so parsing string to DOM node is not possible.");
				domParser = domParser || new DOMParser();
				var doc = domParser.parseFromString(el, "text/html");
				if (doc.body.firstChild) el = doc.getElementsByTagName("body")[0].firstChild;
				else if (doc.head.firstChild && (doc.head.firstChild.tagName !== "TITLE" || doc.title)) el = doc.head.firstChild;
				else if (doc.firstChild && doc.firstChild.tagName !== "HTML") el = doc.firstChild;
				else el = document.createTextNode("");
			}
			if (typeof el !== "object" || !el || !el.nodeType) throw new Error("invalid dom node", el);
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
			if (el.nodeType === 3) return createVirtualTextNode(el);
			else if (el.nodeType === 1 || el.nodeType === 9) return createVirtualDomNode(el, attr);
			return new VText("");
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
			return new VNode(el.tagName, createProperties(el), createChildren(el, attr), key, ns);
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
			for (var i = 0; i < el.childNodes.length; i++) children.push(createNode(el.childNodes[i], attr));
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
			if (!el.hasAttributes()) return properties;
			var ns;
			if (el.namespaceURI && el.namespaceURI !== HTML_NAMESPACE) ns = el.namespaceURI;
			var attr;
			for (var i = 0; i < el.attributes.length; i++) {
				if (el.attributes[i].name == "style") attr = createStyleProperty(el);
				else if (ns) attr = createPropertyNS(el.attributes[i]);
				else attr = createProperty(el.attributes[i]);
				if (attr.ns) properties[attr.name] = {
					namespace: attr.ns,
					value: attr.value
				};
				else if (attr.isAttr) {
					if (!properties.attributes) properties.attributes = {};
					properties.attributes[attr.name] = attr.value;
				} else properties[attr.name] = attr.value;
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
			var name, value, isAttr;
			if (propertyMap[attr.name]) name = propertyMap[attr.name];
			else name = attr.name;
			if (name.indexOf("data-") === 0 || name.indexOf("aria-") === 0) {
				value = attr.value;
				isAttr = true;
			} else value = attr.value;
			return {
				name,
				value,
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
				ns: namespaceMap[attr.name] || ""
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
				output[item] = String(style[item]);
				if (output[item].indexOf("url") > -1) output[item] = output[item].replace(/\"/g, "");
			}
			return {
				name: "style",
				value: output
			};
		}
	}));
	//#endregion
	//#region src/utils.js
	var import_vnode = /* @__PURE__ */ __toESM(require_vnode(), 1);
	var import_vdom_to_html = /* @__PURE__ */ __toESM(require_vdom_to_html(), 1);
	var import_vdom_parser = /* @__PURE__ */ __toESM(require_vdom_parser(), 1);
	function debounce(func, wait, immediate) {
		let timeout;
		return function() {
			const context = this;
			const args = arguments;
			const later = function() {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			const callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	}
	function getAttribute(node, attr) {
		return node.properties && node.properties.attributes && node.properties.attributes[attr];
	}
	function getLastOfPath(object, path, Empty) {
		function cleanKey(key) {
			return key && key.indexOf("###") > -1 ? key.replace(/###/g, ".") : key;
		}
		function canNotTraverseDeeper() {
			return !object || typeof object === "string";
		}
		const stack = typeof path !== "string" ? [].concat(path) : path.split(".");
		while (stack.length > 1) {
			if (canNotTraverseDeeper()) return {};
			const key = cleanKey(stack.shift());
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
		const { obj, k } = getLastOfPath(object, path, Object);
		obj[k] = newValue;
	}
	function getPath(object, path) {
		const { obj, k } = getLastOfPath(object, path);
		if (!obj) return void 0;
		return obj[k];
	}
	function getPathname() {
		const path = location.pathname;
		if (path === "/") return "root";
		const parts = path.split("/");
		let ret = "root";
		parts.forEach((p) => {
			if (p) ret += `_${p}`;
		});
		return ret;
	}
	const lowerCaseTags = [
		"SVG",
		"RECT",
		"PATH"
	];
	const parseOptions = (options) => {
		if (options.namespace) {
			options.ns.push(options.namespace);
			options.defaultNS = options.namespace;
		} else if (options.namespaceFromPath) {
			const ns = getPathname();
			options.ns.push(ns);
			options.defaultNS = ns;
		}
		if (!options.ns.length) options.ns = ["translation"];
		if (options.ignoreTags) options.ignoreTags = options.ignoreTags.map((s) => {
			if (lowerCaseTags.indexOf(s) > -1) return s.toLowerCase();
			return s.toUpperCase();
		});
		if (options.ignoreCleanIndentFor) options.ignoreCleanIndentFor = options.ignoreCleanIndentFor.map((s) => s.toUpperCase());
		if (options.inlineTags) options.inlineTags = options.inlineTags.map((s) => s.toUpperCase());
		if (options.ignoreInlineOn) options.ignoreInlineOn = options.ignoreInlineOn.map((s) => s.toUpperCase());
		if (options.mergeTags) options.mergeTags = options.mergeTags.map((s) => s.toUpperCase());
		options.translateAttributes = options.translateAttributes.reduce((mem, attr) => {
			const res = { attr };
			if (attr.indexOf("#") > -1) {
				const [a, c] = attr.split("#");
				res.attr = a;
				if (c.indexOf(".") > -1) {
					const [e, b] = c.split(".");
					res.ele = e.toUpperCase();
					res.cond = b.toLowerCase().split("=");
				} else if (c.indexOf("=") > -1) res.cond = c.toLowerCase().split("=");
				else res.ele = c.toUpperCase();
			}
			mem.push(res);
			return mem;
		}, []);
		return options;
	};
	//#endregion
	//#region src/localize.js
	function isUnTranslated(node, opts = { retranslate: false }) {
		if (opts && opts.retranslate) return true;
		return !node.properties || !node.properties.attributes || node.properties.attributes.localized !== "";
	}
	function isNotExcluded(node) {
		let ret = !node.properties || !node.properties.attributes || node.properties.attributes.translated !== "";
		if (ret && node.tagName && instance.options.ignoreTags.indexOf(node.tagName) > -1) ret = false;
		if (ret && instance.options.ignoreClasses && node.properties && node.properties.className) node.properties.className.split(" ").forEach((cls) => {
			if (!ret) return;
			if (instance.options.ignoreClasses.indexOf(cls) > -1) ret = false;
		});
		if (ret && instance.options.ignoreIds) {
			if (instance.options.ignoreIds.indexOf(node.properties && node.properties.id) > -1) ret = false;
		}
		return ret;
	}
	function translate(str, options = {}, overrideKey) {
		const hasContent = str.trim();
		const key = overrideKey || str.trim();
		if (!options.defaultValue) options.defaultValue = str;
		if (hasContent && !instance.options.ignoreWithoutKey || hasContent && instance.options.ignoreWithoutKey && overrideKey) return instance.t(key, options);
		return str;
	}
	const replaceInside = ["src", "href"];
	const REGEXP = /%7B%7B(.+?)%7D%7D/g;
	const DANGEROUS_URL_SCHEMES = /^\s*(javascript|data|vbscript|file)\s*:/i;
	function isDangerousUrl(value) {
		return typeof value === "string" && DANGEROUS_URL_SCHEMES.test(value);
	}
	function translateProps(node, props, tOptions = {}, overrideKey, realNodeIsUnTranslated, opts) {
		if (!props) return props;
		instance.options.translateAttributes.forEach((item) => {
			if (item.ele && node.tagName !== item.ele) return;
			if (item.cond && item.cond.length === 2) {
				const condValue = getPath(props, item.cond[0]) || getPath(props.attributes, item.cond[0]);
				if (!condValue || condValue !== item.cond[1]) return;
			}
			let wasOnAttr = false;
			let value = getPath(props, item.attr);
			if (!value) {
				value = getPath(props.attributes, item.attr);
				if (value) wasOnAttr = true;
			}
			if (opts.retranslate) {
				let usedValue = node.properties && node.properties && node.properties.attributes[`${item.attr}-i18next-orgval`];
				if (!usedValue) usedValue = value;
				value = usedValue;
			}
			if (value) {
				if (realNodeIsUnTranslated) node.properties.attributes[`${item.attr}-i18next-orgval`] = value;
				setPath(wasOnAttr ? props.attributes : props, item.attr, translate(value, { ...tOptions }, overrideKey ? `${overrideKey}.${item.attr}` : ""));
			}
		});
		replaceInside.forEach((attr) => {
			let value = getPath(props, attr);
			if (value) value = value.replace(/\{\{/g, "%7B%7B").replace(/\}\}/g, "%7D%7D");
			if (value && value.indexOf("%7B") > -1) {
				const arr = [];
				value.split(REGEXP).reduce((mem, match, index) => {
					if (match.length === 0) return mem;
					if (!index || index % 2 === 0) mem.push(match);
					else {
						const tr = translate(match, { ...tOptions }, overrideKey ? `${overrideKey}.${attr}` : "");
						if (tr && tr.indexOf("http") === 0) {
							if (mem[index - 1] && mem[index - 1].indexOf("http") === 0) mem.splice(index - 1, 1);
						}
						if (isDangerousUrl(tr)) mem.push("");
						else mem.push(tr);
					}
					return mem;
				}, arr);
				if (arr.length) setPath(props, attr, arr.join(""));
			}
		});
		return props;
	}
	function getTOptions(opts, node) {
		let optsOnNode = getAttribute(node, "i18next-options");
		if (optsOnNode) try {
			optsOnNode = JSON.parse(optsOnNode);
		} catch (e) {
			console.warn("failed parsing options on node", node);
		}
		if (optsOnNode && optsOnNode.inlineTags) optsOnNode.inlineTags = optsOnNode.inlineTags.map((s) => s.toUpperCase());
		return {
			...opts || {},
			...optsOnNode || {}
		};
	}
	function removeIndent(str, substitution) {
		if (!instance.options.cleanIndent) return str;
		return str.replace(/\n +/g, substitution);
	}
	function canInline(node, tOptions) {
		if (!node.children || !node.children.length || instance.options.ignoreInlineOn.indexOf(node.tagName) > -1) return false;
		if (instance.options.mergeTags.indexOf(node.tagName) > -1) return true;
		const baseTags = tOptions.inlineTags || instance.options.inlineTags;
		const inlineTags = tOptions.additionalInlineTags ? baseTags.concat(tOptions.additionalInlineTags) : baseTags;
		let inlineable = true;
		let hadNonTextNode = false;
		node.children.forEach((child) => {
			if (!child.text && child.tagName && inlineTags.indexOf(child.tagName.toUpperCase()) < 0) inlineable = false;
			if (child.tagName) hadNonTextNode = true;
		});
		return inlineable && hadNonTextNode;
	}
	function walk(node, tOptions, parent, parentOverrideKey, currentDepth = 0, opts) {
		const nodeIsNotExcluded = isNotExcluded(node);
		const nodeIsUnTranslated = isUnTranslated(node, opts);
		const realNodeIsUnTranslated = isUnTranslated(node);
		tOptions = getTOptions(tOptions, node);
		let parentKey = currentDepth === 0 ? parentOverrideKey : "";
		if (currentDepth > 0 && parentOverrideKey && !instance.options.ignoreWithoutKey) parentKey = `${parentOverrideKey}.${currentDepth}`;
		const overrideKey = getAttribute(node, instance.options.keyAttr) || parentKey;
		const mergeFlag = getAttribute(node, "merge");
		if (mergeFlag !== "false" && (mergeFlag === "" || canInline(node, tOptions))) {
			if (nodeIsNotExcluded && nodeIsUnTranslated) {
				let key = removeIndent((0, import_vdom_to_html.default)(new import_vnode.default("I18NEXTIFYDUMMY", null, node.children)), "").replace("<i18nextifydummy>", "").replace("</i18nextifydummy>", "");
				if (opts.retranslate) {
					let usedKey = node.properties && node.properties.attributes && node.properties.attributes["i18next-orgval"];
					if (!usedKey) usedKey = parent && parent.properties && parent.properties.attributes && parent.properties.attributes[`i18next-orgval-${currentDepth}`];
					if (!usedKey) usedKey = key;
					key = usedKey;
				}
				let translated = translate(key, tOptions, overrideKey);
				if (typeof instance.options.sanitize === "function") translated = instance.options.sanitize(translated, {
					key,
					attribute: null
				});
				node.children = (0, import_vdom_parser.default)((`<i18nextifydummy>${translated}</i18nextifydummy>` || "").trim()).children;
				if (realNodeIsUnTranslated && node.properties && node.properties.attributes) node.properties.attributes["i18next-orgval"] = key;
				else if (realNodeIsUnTranslated && parent && parent.properties && parent.properties.attributes) parent.properties.attributes[`i18next-orgval-${currentDepth}`] = key;
				if (node.properties && node.properties.attributes) node.properties.attributes.localized = "";
			}
			return node;
		}
		if (node.children) node.children.forEach((child, i) => {
			if (nodeIsNotExcluded && nodeIsUnTranslated && child.text || !child.text && isNotExcluded(child)) walk(child, tOptions, node, overrideKey, node.children.length > 1 ? i + 1 : i, opts);
		});
		if (node.text && !node.properties && node.type === "Widget") return node;
		if (nodeIsNotExcluded && nodeIsUnTranslated) {
			if (node.text) {
				let match;
				let txt = node.text;
				let originalText = node.text;
				if (opts.retranslate) {
					let usedText = node.properties && node.properties.attributes && node.properties.attributes["i18next-orgval"];
					if (!usedText) usedText = parent && parent.properties && parent.properties.attributes && parent.properties.attributes[`i18next-orgval-${currentDepth}`];
					if (!usedText) usedText = node.text;
					txt = usedText;
					originalText = usedText;
				}
				const ignore = instance.options.ignoreCleanIndentFor.indexOf(parent.tagName) > -1;
				if (!ignore) {
					txt = removeIndent(txt, "\n");
					if (instance.options.cleanWhitespace) match = /^\s*(.*[^\s])\s*$/g.exec(txt);
				}
				if (!ignore && match && match.length > 1 && instance.options.cleanWhitespace) {
					const translation = translate(match[1], tOptions, overrideKey || "");
					node.text = txt.replace(match[1], translation);
				} else node.text = translate(txt, tOptions, overrideKey || "");
				if (realNodeIsUnTranslated && node.properties && node.properties.attributes) {
					if (originalText) node.properties.attributes["i18next-orgval"] = originalText;
				} else if (realNodeIsUnTranslated && parent && parent.properties && parent.properties.attributes) {
					if (originalText) parent.properties.attributes[`i18next-orgval-${currentDepth}`] = originalText;
				}
			}
			if (node.properties) node.properties = translateProps(node, node.properties, tOptions, overrideKey, realNodeIsUnTranslated, opts);
			if (node.properties && node.properties.attributes) node.properties.attributes.localized = "";
		}
		return node;
	}
	function localize(node, retranslate) {
		const recurseTime = new Instrument();
		recurseTime.start();
		const localized = walk(node, null, null, null, null, { retranslate });
		instance.services.logger.log(`localization took: ${recurseTime.end()}ms`);
		return localized;
	}
	//#endregion
	//#region src/renderer.js
	function createVdom(node) {
		const virtualizeTime = new Instrument();
		virtualizeTime.start();
		const vNode = (0, import_vdom_virtualize.default)(node);
		instance.services.logger.log(`virtualization took: ${virtualizeTime.end()}ms`);
		return vNode;
	}
	function renderer_default(root, observer) {
		const ret = {};
		ret.render = function render(retranslate) {
			const newNode = createVdom(root);
			const patches = (0, import_diff.default)(newNode, localize((0, import_udc.default)(newNode), retranslate));
			if (patches["0"]) observer.reset();
			root = (0, import_patch.default)(root, patches);
		};
		ret.debouncedRender = debounce(ret.render, 200);
		return ret;
	}
	//#endregion
	//#region src/missingHandler.js
	const missings = {};
	function log() {
		instance.services.logger.log("missing resources: \n" + JSON.stringify(missings, null, 2));
	}
	const debouncedLog = debounce(log, 2e3);
	function missingHandler(lngs, namespace, key, res) {
		if (typeof lngs === "string") lngs = [lngs];
		if (!lngs) lngs = [];
		lngs.forEach((lng) => {
			setPath(missings, [
				lng,
				namespace,
				key
			], res);
			debouncedLog();
		});
		if (instance.services.backendConnector && instance.services.backendConnector.saveMissing) instance.services.backendConnector.saveMissing(lngs, namespace, key, res);
	}
	//#endregion
	//#region src/index.js
	function getDefaults() {
		const scriptEle = document.getElementById("i18nextify");
		let supportedLngs = scriptEle && (scriptEle.getAttribute("supportedlngs") || scriptEle.getAttribute("supportedLngs")) || void 0;
		if (typeof supportedLngs === "string") supportedLngs = supportedLngs.split(",").map((lng) => lng.trim());
		const opt = {
			autorun: true,
			ele: document.body,
			keyAttr: "i18next-key",
			ignoreWithoutKey: false,
			ignoreTags: ["SCRIPT"],
			ignoreIds: [],
			ignoreClasses: [],
			translateAttributes: [
				"placeholder",
				"title",
				"alt",
				"value#input.type=button",
				"value#input.type=submit"
			],
			mergeTags: [],
			inlineTags: [],
			ignoreInlineOn: [],
			cleanIndent: true,
			ignoreCleanIndentFor: ["PRE", "CODE"],
			cleanWhitespace: true,
			nsSeparator: "#||#",
			keySeparator: "#|#",
			debug: (() => {
				try {
					return new URLSearchParams(window.location.search).get("debug") === "true";
				} catch (e) {
					return false;
				}
			})(),
			saveMissing: (() => {
				try {
					return new URLSearchParams(window.location.search).get("saveMissing") === "true";
				} catch (e) {
					return false;
				}
			})(),
			namespace: scriptEle && scriptEle.getAttribute("namespace") || false,
			namespaceFromPath: scriptEle && (scriptEle.getAttribute("namespacefrompath") || scriptEle.getAttribute("namespaceFromPath")) || false,
			missingKeyHandler: missingHandler,
			ns: [],
			supportedLngs,
			load: scriptEle && scriptEle.getAttribute("load") || void 0,
			fallbackLng: scriptEle && (scriptEle.getAttribute("fallbacklng") || scriptEle.getAttribute("fallbackLng")) || void 0,
			onInitialTranslate: () => {}
		};
		const loadPath = scriptEle && (scriptEle.getAttribute("loadpath") || scriptEle.getAttribute("loadPath")) || void 0;
		const addPath = scriptEle && (scriptEle.getAttribute("addpath") || scriptEle.getAttribute("addPath")) || void 0;
		if (loadPath || addPath) {
			opt.backend = {};
			if (loadPath) opt.backend.loadPath = loadPath;
			if (addPath) opt.backend.addPath = addPath;
		}
		return opt;
	}
	let domReady = false;
	let initialized = false;
	docReady_default(() => {
		domReady = true;
		if (!initialized) init();
	});
	instance.use(Backend);
	instance.use(Browser);
	let lastOptions = {};
	function changeNamespace(ns) {
		if (!ns && lastOptions.namespaceFromPath) ns = getPathname();
		lastOptions.ns.push(ns);
		lastOptions.defaultNS = ns;
		instance.loadNamespaces(lastOptions.ns, () => {
			instance.setDefaultNamespace(ns);
		});
	}
	const renderers = [];
	function init(options = {}) {
		options = {
			...getDefaults(),
			...lastOptions,
			...options
		};
		options = parseOptions(options);
		if (!options.ele) {
			delete options.ele;
			lastOptions = options;
		}
		initialized = true;
		let observer;
		function addRenderers(children) {
			for (let i = 0; i < children.length; i++) {
				const c = children[i];
				if (options.ignoreTags.indexOf(c.tagName) < 0 && options.ignoreIds.indexOf(c.id) < 0 && options.ignoreClasses.indexOf(c.className) < 0 && !c.attributes.localized && !c.attributes.translated) {
					const r = renderer_default(c, observer);
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
					if (options.ignoreTags.indexOf(c.tagName) < 0 && options.ignoreIds.indexOf(c.id) < 0 && options.ignoreClasses.indexOf(c.className) < 0 && !c.attributes.localized && !c.attributes.translated) {
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
				observer.on("changed", (mutations) => {
					renderers.forEach((r) => r.debouncedRender());
					addRenderers(children);
				});
				waitForInitialRender(children, 0, () => {
					if (options.ele.style && options.ele.style.display === "none") options.ele.style.display = "block";
					if (window.document.title) {
						const keyTitle = window.document.getElementsByTagName("title").length > 0 && window.document.getElementsByTagName("title")[0].getAttribute(instance.options.keyAttr);
						window.document.title = instance.t(keyTitle || window.document.title);
					}
					if (window.document.querySelector("meta[name=\"description\"]") && window.document.querySelector("meta[name=\"description\"]").content) {
						const keyDescr = window.document.querySelector("meta[name=\"description\"]").getAttribute(instance.options.keyAttr) || window.document.querySelector("meta[name=\"description\"]").content;
						window.document.querySelector("meta[name=\"description\"]").setAttribute("content", instance.t(keyDescr));
					}
					options.onInitialTranslate();
				});
			}
		}
		instance.on("languageChanged", (lng) => {
			window.document.documentElement.lang = lng;
		});
		instance.init(options, done);
		if (!domReady) docReady_default(done);
		if (options.autorun === false) return { start: done };
	}
	function forceRerender() {
		renderers.forEach((r) => {
			r.render(true);
		});
	}
	//#endregion
	return {
		init,
		i18next: instance,
		changeNamespace,
		forceRerender
	};
})();
