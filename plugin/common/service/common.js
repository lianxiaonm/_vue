let arr = [],
    slice = arr.slice,
    indexOf = arr.indexOf,
    hasOwnProperty = Object.prototype.hasOwnProperty,
    undefined = undefined;

export const isBrowser = !!(typeof window !== 'undefined' && window.document);

export const isArray = Array.isArray;

export function isFunction(object) {
    return typeof object === 'function';
}

export function isString(object) {
    return typeof object === 'string';
}

export function isNumber(object) {
    return typeof object === 'number';
}

export function isObject(object) {
    return typeof object === 'object';
}

export function isWindow(object) {
    return object && object.window === object;
}

export function isArrayLike(object) {
    if (object == null || isWindow(object))return false;
    var length = object.length;
    return isString(object) || isArray(object) || length === 0 || isNumber(length) && length > 0 && (length - 1) in object;
}

export function includes(array, object) {
    return indexOf.call(array, object) != -1;
}

export function toJsonReplacer(key, val) {
    return /^\$\$/.test(key) ? undefined : isWindow(val) ? '$WINDOW' : document === val ? '$DOCUMENT' : val;
}

export function toJson(obj, pretty) {
    return isUndefined(obj) ? undefined : JSON.stringify(obj, toJsonReplacer, pretty ? '  ' : null);
}

export function trim(val) {
    return isString(val) ? val.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '') : val;
}

export function sliceArgs(args, startIndex) {
    return slice.call(args, startIndex || 0);
}

export function valueFn(value) {
    return function () {return value;}
}

export function forEach(obj, iterator, context) {
    var key, length;
    if (isFunction(obj)) {
        var noneKeys = ['prototype', 'length', 'name'];
        for (key in obj) {
            includes(noneKeys, key) || (!obj.hasOwnProperty || obj.hasOwnProperty(key)) && iterator.call(context, obj[key], key, obj);
        }
    } else if (isArray(obj) || isArrayLike(obj)) {
        var isPrimitive = !isObject(obj);
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

export function extend(dst) { //浅复制 TXDX
    for (var i = 1, ii = arguments.length; i < ii; i++) {
        var obj = arguments[i];
        if (obj) {
            var keys = Object.keys(obj);
            for (var j = 0, jj = keys.length; j < jj; j++) {
                var key = keys[j];
                dst[key] = obj[key];
            }
        }
    }
    return dst;
}

export function createElement(tagName, attrMap) {
    var element = document.createElement(tagName);
    forEach(attrMap, function (val, key) {
        element[key] = val;
    });
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

export const noop = function () {};

let body = isBrowser ? document.body : {appendChild: noop, removeChild: noop};

export function isVNode(node) {
    return typeof node === 'object' && hasOwnProperty.call(node, 'componentOptions');
};

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

export const $body = {
    addClass: function () {
        toggleClass(body, sliceArgs(arguments).join(' '), true);
        return this;
    },
    removeClass: function () {
        toggleClass(body, sliceArgs(arguments).join(' '));
        return this;
    },
    enableClass: function (shouldEnableClass) {
        return this[shouldEnableClass ? 'addClass' : 'removeClass'].apply(this, sliceArgs(arguments, 1));
    },
    append: function (ele) {
        body.appendChild(ele.length ? ele[0] : ele);
        return this;
    },
    remove: function (ele) {
        body.removeChild(ele.length ? ele[0] : ele);
        return this;
    },
    locked: function (remove) {
        return this.enableClass(!remove, 'drop-open')
    },
    _body: body
};

let dropElement = createElement('div', {className: 'backdrop-container'}),
    dropHolds = 0;
$body.append(dropElement);
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