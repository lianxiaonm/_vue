let arr                         = [],
	slice                       = arr.slice,
	indexOf                     = arr.indexOf,
	getProto                    = Object.getPrototypeOf,
	hasOwnProperty              = Object.prototype.hasOwnProperty,
	toString                    = Object.prototype.toString,
	undefined                   = undefined,
	class2type                  = {},
	_ARR                        = 'array',
	_STR                        = 'string',
	_FUN                        = 'function',
	_BOO                        = 'boolean',
	_OBJ                        = 'object',
	_NUM                        = 'number',
	_DAT                        = 'date',
	_REG                        = 'regexp',
	NODE_TYPE_ELEMENT           = 1,
	NODE_TYPE_TEXT              = 3,
	NODE_TYPE_COMMENT           = 8,
	NODE_TYPE_DOCUMENT          = 9,
	NODE_TYPE_DOCUMENT_FRAGMENT = 11;

export const isBrowser = !!(typeof window !== 'undefined' && window.document);

export function lowercase(string) { return isString(string) ? string.toLowerCase() : string }
export function uppercase(string) { return isString(string) ? string.toUpperCase() : string }
export function hasOwnprop(obj, key) { return obj && hasOwnProperty.call(obj, key) }
export function isWindow(object) { return object && object.window === object }

export function isType(obj) { return typeof obj == _OBJ || typeof obj == _FUN ? class2type[toString.call(obj)] || _OBJ : typeof obj;}
export function isArray(obj) { return isType(obj) == _ARR }
export function isString(obj) { return isType(obj) === _STR }
export function isFunction(obj) { return isType(obj) === _FUN }
export function isBoolean(obj) { return isType(obj) === _BOO }
export function isObject(obj) { return typeof obj === _OBJ }
export function isNumber(obj) { return isType(obj) === _NUM }
export function isDate(obj) { return isType(obj) === _DAT}
export function isRegExp(obj) { return isType(obj) === _REG }
export function isUndefined(obj) { return obj === undefined }
export function isDefined(obj) { return obj !== undefined }
export function isObjectEmpty(obj) { return !(obj && Object.keys(obj).length) }

export function each(obj, callback) {
	let length, i = 0;
	if (isArrayLike(obj)) {
		for (length = obj.length; i < length; i++) {
			if (callback.call(obj[i], i, obj[i]) === false)
				break;
		}
	} else {
		for (i in obj) {
			if (obj.hasOwnProperty(i) && callback.call(obj[i], i, obj[i]) === false)
				break;
		}
	}
	return obj;
}
each('Boolean Number String Function Array Date RegExp Object Error Symbol'.split(' '),
	function (i, name) {
		class2type["[object " + name + "]"] = name.toLowerCase();
	});

export function isArrayLike(object) {
	if (object == null || isWindow(object))
		return false;
	let length = object.length, type = isType(object);
	if (object.nodeType === NODE_TYPE_ELEMENT && length)
		return true;
	return type === _STR || type === _ARR || length === 0
		|| isNumber(length) && length > 0 && (length - 1) in object;
}


export function trim(val) {
	return isString(val) ? val.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '') : val;
}

export function includes(array, object) { return indexOf.call(array, object) != -1 }

export function toJsonReplacer(key, val) {
	return /^\$\$/.test(key) ? undefined : isWindow(val) ?
		'$WINDOW' : document === val ? '$DOCUMENT' : val;
}

export function toJson(obj, pretty) {
	return isUndefined(obj) ? undefined :
		JSON.stringify(obj, toJsonReplacer, pretty ? '  ' : null);
}

export function fromJson(json) { return isString(json) ? JSON.parse(json) : json }

export function sliceArgs(args, startIndex) { return slice.call(args, startIndex || 0) }

export function valueFn(value) { return function () {return value} }

export function forEach(obj, iterator, context) {
	var key, length;
	if (isFunction(obj)) {
		let noneKeys = ['prototype', 'length', 'name'];
		for (key in obj) {
			includes(noneKeys, key) || (!obj.hasOwnProperty || obj.hasOwnProperty(key)) && iterator.call(context, obj[key], key, obj);
		}
	} else if (isArray(obj) || isArrayLike(obj)) {
		let isPrimitive = !isObject(obj);
		for (key = 0, length = obj.length; key < length; key++) {
			if (isPrimitive || key in obj) iterator.call(context, obj[key], key, obj);
		}
	} else if (obj) {
		if (obj.forEach && obj.forEach !== forEach) obj.forEach(iterator, context, obj);
		else {
			for (key in obj) obj.hasOwnProperty(key) && iterator.call(context, obj[key], key, obj);
		}
	}
	return obj;
}

export function extend(dst) {
	for (var i = 1, ii = arguments.length; i < ii; i++) {
		var obj = arguments[i];
		if (obj) {
			var keys = Object.keys(obj);
			for (var j = 0, jj = keys.length; j < jj; j++) {
				var key  = keys[j];
				dst[key] = obj[key];
			}
		}
	}
	return dst;
}

if (!hasOwnProperty.call(Object, 'assign')) Object.assign = extend;

export function copy(source, dest, stackSource, stackDest) {
	var type, result, i, ii, _source;
	if (isWindow(source) || (!dest && source === dest))
		throw Error('Can\'t copy! Window instances is not supported or Source and destination are identical');
	else if (!dest) {
		type = isType(dest = source);
		if (type === _ARR) {
			dest = copy(source, [], stackSource, stackDest);
		} else if (type === _DAT) {
			dest = new Date(source.getTime());
		} else if (type === _REG) {
			dest = new RegExp(source.source, source.toString().match(/[^\/]*$/)[0]);
		} else if (type === _OBJ) {
			dest = copy(source, Object.create(getProto(source)), stackSource, stackDest);
		}
	} else {
		stackSource = stackSource || [];
		stackDest   = stackDest || [];
		if (isObject(source)) {
			if (-1 !== (i = stackSource.indexOf(source)))
				return stackDest[i];
			stackSource.push(source), stackDest.push(dest);
		}
		if (isArray(source)) {
			dest.length = 0;
			for (i = 0, ii = source.length; i < ii; i++) {
				result = copy(_source = source[i], null, stackSource, stackDest);
				if (isObject(_source)) {
					stackSource.push(_source);
					stackDest.push(result);
				}
				dest.push(result);
			}
		} else {
			isArray(dest) ? dest.length = 0 :
				forEach(dest, function (value, key) {
					delete dest[key];
				});
			for (i in source) {
				if (source.hasOwnProperty(i)) {
					result = copy(_source = source[i], null, stackSource, stackDest);
					if (isObject(_source)) {
						stackSource.push(_source);
						stackDest.push(result);
					}
					dest[i] = result;
				}
			}
		}
	}
	return dest;
}

//拓展方法
export function makeMap(str, obj, val) {
	var items = isArray(str) ? str : str.split(","),
		i     = 0,
		ii    = items.length;
	for (; i < ii; i++) obj[items[i]] = val == null ? true : val;
	return obj;
}

export function hashCode(str) {
	let hash = 0, i, chr, len;
	if (str.length == 0) return hash;
	for (i = 0, len = str.length; i < len; i++) {
		chr  = str.charCodeAt(i);
		hash = (hash << 5) - hash + chr;
		hash |= 0;
	}
	return hash;
}

export const noop = function () {};

function forEachSorted(obj, iterator, context) {
	var keys = Object.keys(obj).sort();
	for (var i = 0; i < keys.length; i++) {
		iterator.call(context, obj[keys[i]], keys[i]);
	}
	return keys;
}
export function toQueryString(params) {
	var parts = [];
	forEachSorted(params, function (value, key) {
		if (value == null) return;
		if (!isArray(value)) value = [value];
		forEach(value, function (v) {
			isObject(v) ? v = v instanceof Date ? v.toISOString() : toJson(v) : '';
			parts.push(encodeURIComponent(key) + '=' + encodeURIComponent(v));
		});
	});
	return parts.join("&");
}
export function buildUrl(url, params) {
	if (!params) return url;
	var parts = toQueryString(params);
	if (parts.length > 0) url += (url.indexOf('?') == -1 ? '?' : '&') + parts;
	return url;
}

/**
 *
 */
let F = function () {}
export function inherit(C, P) {
	F.prototype             = P.prototype;
	C.prototype             = new F();
	C.uber                  = P.prototype;
	C.prototype.constructor = C;
}

let body = isBrowser ? document.body : {appendChild: noop, removeChild: noop};

export function createElement(tagName, attrMap) {
	if (!isBrowser) return {};
	let element = document.createElement(tagName);
	forEach(attrMap, function (val, key) { element[key] = val });
	return element;
}

export function toggleClass(el, clazz, isAdd) {
	isBrowser && el instanceof Element && (function (clazz) {
		var odClazz = (el.className || '').split(/\s+/).filter((item) => item);
		forEach(clazz, function (val) {
			var index = odClazz.indexOf(val);
			isAdd ? index == -1 && odClazz.push(val) : index != -1 && odClazz.splice(index, 1);
		});
		el.className = odClazz.join(' ');
	})(isArray(clazz) ? clazz : clazz.split(' '));
}

export function isVNode(node) {
	return typeof node === 'object' && hasOwnProperty.call(node, 'componentOptions');
}

export const $body = {
	addClass   : function () {
		toggleClass(body, sliceArgs(arguments).join(' '), true);
		return this;
	},
	removeClass: function () {
		toggleClass(body, sliceArgs(arguments).join(' '));
		return this;
	},
	enableClass: function (shouldEnableClass) {
		return this[shouldEnableClass ? 'addClass' : 'removeClass']
			.apply(this, sliceArgs(arguments, 1));
	},
	append     : function (ele) {
		body.appendChild(ele.length ? ele[0] : ele);
		return this;
	},
	remove     : function (ele) {
		body.removeChild(ele.length ? ele[0] : ele);
		return this;
	},
	locked     : function (remove) {
		return this.enableClass(!remove, 'drop-open')
	},
	_body      : body
};

let dropElement = createElement('div', {className: 'backdrop-container'}),
	dropHolds   = 0;
isBrowser && $body.append(dropElement);

export const $backdrop = {
	retain (){
		++dropHolds && setTimeout(function () {
			toggleClass(dropElement, 'active', true), $body.locked();
		}, 16.7);
	},
	release (){
		--dropHolds || setTimeout(function () {
			toggleClass(dropElement, 'active'), $body.locked(true);
		}, 16.7);
	}
};

let timer = null;
export function routeConfig(router) {
	if (!isBrowser) return;
	router.beforeEach((to, from, next) => {
		if (from.matched.length)
			timer = setTimeout(function () {
				$body.addClass('transition'), timer = null;
			}, 300);
		next();
	});
	router.afterEach((to, from) => {
		if (timer) clearTimeout(timer);
		else {
			$body.addClass('on');
			setTimeout(function () {
				$body.removeClass('on transition')
			}, 400);
		}
	});
	return router;
}

