exports.id = 306;
exports.ids = [306];
exports.modules = {

/***/ 58235:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
var __webpack_unused_export__;
__webpack_unused_export__ = ({value: true});var s={0:8203,1:8204,2:8205,3:8290,4:8291,5:8288,6:65279,7:8289,8:119155,9:119156,a:119157,b:119158,c:119159,d:119160,e:119161,f:119162},c={0:8203,1:8204,2:8205,3:65279},d=new Array(4).fill(String.fromCodePoint(c[0])).join(""),m=String.fromCharCode(0);function E(t){let e=JSON.stringify(t);return`${d}${Array.from(e).map(r=>{let n=r.charCodeAt(0);if(n>255)throw new Error(`Only ASCII edit info can be encoded. Error attempting to encode ${e} on character ${r} (${n})`);return Array.from(n.toString(4).padStart(4,"0")).map(o=>String.fromCodePoint(c[o])).join("")}).join("")}`}function P(t){let e=JSON.stringify(t);return Array.from(e).map(r=>{let n=r.charCodeAt(0);if(n>255)throw new Error(`Only ASCII edit info can be encoded. Error attempting to encode ${e} on character ${r} (${n})`);return Array.from(n.toString(16).padStart(2,"0")).map(o=>String.fromCodePoint(s[o])).join("")}).join("")}function I(t){return Number.isNaN(Number(t))?Boolean(Date.parse(t)):!1}function x(t){try{new URL(t,t.startsWith("/")?"https://acme.com":void 0)}catch (e2){return!1}return!0}function b(t,e,r="auto"){return r===!0||r==="auto"&&(I(t)||x(t))?t:`${t}${E(e)}`}var A=Object.fromEntries(Object.entries(c).map(t=>t.reverse())),g=Object.fromEntries(Object.entries(s).map(t=>t.reverse())),S=`${Object.values(s).map(t=>`\\u{${t.toString(16)}}`).join("")}`,f= __webpack_unused_export__ =new RegExp(`[${S}]{4,}`,"gu");function R(t){let e=t.match(f);if(!!e)return h(e[0],!0)[0]}function G(t){let e=t.match(f);if(!!e)return e.map(r=>h(r)).flat()}function h(t,e=!1){let r=Array.from(t);if(r.length%2===0){if(r.length%4||!t.startsWith(d))return T(r,e)}else throw new Error("Encoded data has invalid length");let n=[];for(let o=r.length*.25;o--;){let p=r.slice(o*4,o*4+4).map(u=>A[u.codePointAt(0)]).join("");n.unshift(String.fromCharCode(parseInt(p,4)))}if(e){n.shift();let o=n.indexOf(m);return o===-1&&(o=n.length),[JSON.parse(n.slice(0,o).join(""))]}return n.join("").split(m).filter(Boolean).map(o=>JSON.parse(o))}function T(t,e){var u;let r=[];for(let i=t.length*.5;i--;){let a=`${g[t[i*2].codePointAt(0)]}${g[t[i*2+1].codePointAt(0)]}`;r.unshift(String.fromCharCode(parseInt(a,16)))}let n=[],o=[r.join("")],p=10;for(;o.length;){let i=o.shift();try{if(n.push(JSON.parse(i)),e)return n}catch(a){if(!p--)throw a;let l=+((u=a.message.match(/\sposition\s(\d+)$/))==null?void 0:u[1]);if(!l)throw a;o.unshift(i.substring(0,l),i.substring(l))}}return n}function X(t){var e;return{cleaned:t.replace(f,""),encoded:((e=t.match(f))==null?void 0:e[0])||""}}__webpack_unused_export__ = f; __webpack_unused_export__ = P; exports.n8 = b; __webpack_unused_export__ = R; __webpack_unused_export__ = G; __webpack_unused_export__ = E; __webpack_unused_export__ = X;


/***/ }),

/***/ 12418:
/***/ ((module) => {

"use strict";


function groq(strings) {
  for (var _len = arguments.length, keys = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    keys[_key - 1] = arguments[_key];
  }
  const lastIndex = strings.length - 1;
  return strings.slice(0, lastIndex).reduce((acc, str, i) => {
    return acc + str + keys[i];
  }, "") + strings[lastIndex];
}
module.exports = groq;
//# sourceMappingURL=groq.js.map


/***/ }),

/***/ 78348:
/***/ ((module) => {

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!isObjectLike(value) ||
      objectToString.call(value) != objectTag || isHostObject(value)) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return (typeof Ctor == 'function' &&
    Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString);
}

module.exports = isPlainObject;


/***/ }),

/***/ 91669:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _lib_groq_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12418);
// eslint-disable-next-line import/extensions


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_lib_groq_js__WEBPACK_IMPORTED_MODULE_0__);


/***/ }),

/***/ 35123:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  e: () => (/* binding */ client_createClient)
});

// EXTERNAL MODULE: external "http"
var external_http_ = __webpack_require__(13685);
// EXTERNAL MODULE: external "https"
var external_https_ = __webpack_require__(95687);
// EXTERNAL MODULE: ./node_modules/debug/src/index.js
var src = __webpack_require__(17783);
;// CONCATENATED MODULE: ./node_modules/is-plain-object/dist/is-plain-object.mjs
/*!
 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

function isObject(o) {
  return Object.prototype.toString.call(o) === '[object Object]';
}

function is_plain_object_isPlainObject(o) {
  var ctor,prot;

  if (isObject(o) === false) return false;

  // If has modified constructor
  ctor = o.constructor;
  if (ctor === undefined) return true;

  // If has modified prototype
  prot = ctor.prototype;
  if (isObject(prot) === false) return false;

  // If constructor does not have an Object-specific method
  if (prot.hasOwnProperty('isPrototypeOf') === false) {
    return false;
  }

  // Most likely a plain Object
  return true;
}



// EXTERNAL MODULE: ./node_modules/progress-stream/index.js
var progress_stream = __webpack_require__(29306);
// EXTERNAL MODULE: ./node_modules/is-retry-allowed/index.js
var is_retry_allowed = __webpack_require__(83102);
;// CONCATENATED MODULE: ./node_modules/get-it/dist/middleware.js







const isHttpsProto = /^https:/i;
function agent(opts) {
  const httpAgent = new external_http_.Agent(opts);
  const httpsAgent = new external_https_.Agent(opts);
  const agents = {
    http: httpAgent,
    https: httpsAgent
  };
  return {
    finalizeOptions: options => {
      if (options.agent) {
        return options;
      }
      if (options.maxRedirects > 0) {
        return {
          ...options,
          agents
        };
      }
      const isHttps = isHttpsProto.test(options.href || options.protocol);
      return {
        ...options,
        agent: isHttps ? httpsAgent : httpAgent
      };
    }
  };
}
const leadingSlash = /^\//;
const trailingSlash = /\/$/;
function base(baseUrl) {
  const baseUri = baseUrl.replace(trailingSlash, "");
  return {
    processOptions: options => {
      if (/^https?:\/\//i.test(options.url)) {
        return options;
      }
      const url = [baseUri, options.url.replace(leadingSlash, "")].join("/");
      return Object.assign({}, options, {
        url
      });
    }
  };
}
const SENSITIVE_HEADERS = ["cookie", "authorization"];
const hasOwn = Object.prototype.hasOwnProperty;
const redactKeys = (source, redacted) => {
  const target = {};
  for (const key in source) {
    if (hasOwn.call(source, key)) {
      target[key] = redacted.indexOf(key.toLowerCase()) > -1 ? "<redacted>" : source[key];
    }
  }
  return target;
};
function debug() {
  let opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const verbose = opts.verbose;
  const namespace = opts.namespace || "get-it";
  const defaultLogger = src(namespace);
  const log = opts.log || defaultLogger;
  const shortCircuit = log === defaultLogger && !src.enabled(namespace);
  let requestId = 0;
  return {
    processOptions: options => {
      options.debug = log;
      options.requestId = options.requestId || ++requestId;
      return options;
    },
    onRequest: event => {
      if (shortCircuit || !event) {
        return event;
      }
      const options = event.options;
      log("[%s] HTTP %s %s", options.requestId, options.method, options.url);
      if (verbose && options.body && typeof options.body === "string") {
        log("[%s] Request body: %s", options.requestId, options.body);
      }
      if (verbose && options.headers) {
        const headers = opts.redactSensitiveHeaders === false ? options.headers : redactKeys(options.headers, SENSITIVE_HEADERS);
        log("[%s] Request headers: %s", options.requestId, JSON.stringify(headers, null, 2));
      }
      return event;
    },
    onResponse: (res, context) => {
      if (shortCircuit || !res) {
        return res;
      }
      const reqId = context.options.requestId;
      log("[%s] Response code: %s %s", reqId, res.statusCode, res.statusMessage);
      if (verbose && res.body) {
        log("[%s] Response body: %s", reqId, stringifyBody(res));
      }
      return res;
    },
    onError: (err, context) => {
      const reqId = context.options.requestId;
      if (!err) {
        log("[%s] Error encountered, but handled by an earlier middleware", reqId);
        return err;
      }
      log("[%s] ERROR: %s", reqId, err.message);
      return err;
    }
  };
}
function stringifyBody(res) {
  const contentType = (res.headers["content-type"] || "").toLowerCase();
  const isJson = contentType.indexOf("application/json") !== -1;
  return isJson ? tryFormat(res.body) : res.body;
}
function tryFormat(body) {
  try {
    const parsed = typeof body === "string" ? JSON.parse(body) : body;
    return JSON.stringify(parsed, null, 2);
  } catch (err) {
    return body;
  }
}
function headers(_headers) {
  let opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return {
    processOptions: options => {
      const existing = options.headers || {};
      options.headers = opts.override ? Object.assign({}, existing, _headers) : Object.assign({}, _headers, existing);
      return options;
    }
  };
}
var __defProp$1 = Object.defineProperty;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, {
  enumerable: true,
  configurable: true,
  writable: true,
  value
}) : obj[key] = value;
var __publicField$1 = (obj, key, value) => {
  __defNormalProp$1(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class HttpError extends (/* unused pure expression or super */ null && (Error)) {
  constructor(res, ctx) {
    super();
    __publicField$1(this, "response");
    __publicField$1(this, "request");
    const truncatedUrl = res.url.length > 400 ? "".concat(res.url.slice(0, 399), "\u2026") : res.url;
    let msg = "".concat(res.method, "-request to ").concat(truncatedUrl, " resulted in ");
    msg += "HTTP ".concat(res.statusCode, " ").concat(res.statusMessage);
    this.message = msg.trim();
    this.response = res;
    this.request = ctx.options;
  }
}
function httpErrors() {
  return {
    onResponse: (res, ctx) => {
      const isHttpError = res.statusCode >= 400;
      if (!isHttpError) {
        return res;
      }
      throw new HttpError(res, ctx);
    }
  };
}
function injectResponse() {
  let opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  if (typeof opts.inject !== "function") {
    throw new Error("`injectResponse` middleware requires a `inject` function");
  }
  const inject = function inject2(prevValue, event) {
    const response = opts.inject(event, prevValue);
    if (!response) {
      return prevValue;
    }
    const options = event.context.options;
    return {
      body: "",
      url: options.url,
      method: options.method,
      headers: {},
      statusCode: 200,
      statusMessage: "OK",
      ...response
    };
  };
  return {
    interceptRequest: inject
  };
}
const isBuffer = typeof Buffer === "undefined" ? () => false : obj => Buffer.isBuffer(obj);
const serializeTypes = ["boolean", "string", "number"];
function jsonRequest() {
  return {
    processOptions: options => {
      const body = options.body;
      if (!body) {
        return options;
      }
      const isStream = typeof body.pipe === "function";
      const shouldSerialize = !isStream && !isBuffer(body) && (serializeTypes.indexOf(typeof body) !== -1 || Array.isArray(body) || is_plain_object_isPlainObject(body));
      if (!shouldSerialize) {
        return options;
      }
      return Object.assign({}, options, {
        body: JSON.stringify(options.body),
        headers: Object.assign({}, options.headers, {
          "Content-Type": "application/json"
        })
      });
    }
  };
}
function jsonResponse(opts) {
  return {
    onResponse: response => {
      const contentType = response.headers["content-type"] || "";
      const shouldDecode = opts && opts.force || contentType.indexOf("application/json") !== -1;
      if (!response.body || !contentType || !shouldDecode) {
        return response;
      }
      return Object.assign({}, response, {
        body: tryParse(response.body)
      });
    },
    processOptions: options => Object.assign({}, options, {
      headers: Object.assign({
        Accept: "application/json"
      }, options.headers)
    })
  };
  function tryParse(body) {
    try {
      return JSON.parse(body);
    } catch (err) {
      err.message = "Failed to parsed response body as JSON: ".concat(err.message);
      throw err;
    }
  }
}
function isBrowserOptions(options) {
  return typeof options === "object" && options !== null && !("protocol" in options);
}
function mtls() {
  let config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  if (!config.ca) {
    throw new Error('Required mtls option "ca" is missing');
  }
  if (!config.cert) {
    throw new Error('Required mtls option "cert" is missing');
  }
  if (!config.key) {
    throw new Error('Required mtls option "key" is missing');
  }
  return {
    finalizeOptions: options => {
      if (isBrowserOptions(options)) {
        return options;
      }
      const mtlsOpts = {
        cert: config.cert,
        key: config.key,
        ca: config.ca
      };
      return Object.assign({}, options, mtlsOpts);
    }
  };
}
let actualGlobal = {};
if (typeof globalThis !== "undefined") {
  actualGlobal = globalThis;
} else if (typeof window !== "undefined") {
  actualGlobal = window;
} else if (typeof global !== "undefined") {
  actualGlobal = global;
} else if (typeof self !== "undefined") {
  actualGlobal = self;
}
var global$1 = actualGlobal;
function observable() {
  let opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const Observable =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- @TODO consider dropping checking for a global Observable since it's not on a standards track
  opts.implementation || global$1.Observable;
  if (!Observable) {
    throw new Error("`Observable` is not available in global scope, and no implementation was passed");
  }
  return {
    onReturn: (channels, context) => new Observable(observer => {
      channels.error.subscribe(err => observer.error(err));
      channels.progress.subscribe(event => observer.next(Object.assign({
        type: "progress"
      }, event)));
      channels.response.subscribe(response => {
        observer.next(Object.assign({
          type: "response"
        }, response));
        observer.complete();
      });
      channels.request.publish(context);
      return () => channels.abort.publish();
    })
  };
}
function normalizer(stage) {
  return prog => ({
    stage,
    percent: prog.percentage,
    total: prog.length,
    loaded: prog.transferred,
    lengthComputable: !(prog.length === 0 && prog.percentage === 0)
  });
}
function progress() {
  return {
    onHeaders: (response, evt) => {
      const _progress = progress_stream({
        time: 16
      });
      const normalize = normalizer("download");
      const contentLength = response.headers["content-length"];
      const length = contentLength ? Number(contentLength) : 0;
      if (!isNaN(length) && length > 0) {
        _progress.setLength(length);
      }
      _progress.on("progress", prog => evt.context.channels.progress.publish(normalize(prog)));
      return response.pipe(_progress);
    },
    onRequest: evt => {
      if (!evt.progress) {
        return;
      }
      const normalize = normalizer("upload");
      evt.progress.on("progress", prog => evt.context.channels.progress.publish(normalize(prog)));
    }
  };
}
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, {
  enumerable: true,
  configurable: true,
  writable: true,
  value
}) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const promise = function () {
  let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const PromiseImplementation = options.implementation || Promise;
  if (!PromiseImplementation) {
    throw new Error("`Promise` is not available in global scope, and no implementation was passed");
  }
  return {
    onReturn: (channels, context) => new PromiseImplementation((resolve, reject) => {
      const cancel = context.options.cancelToken;
      if (cancel) {
        cancel.promise.then(reason => {
          channels.abort.publish(reason);
          reject(reason);
        });
      }
      channels.error.subscribe(reject);
      channels.response.subscribe(response => {
        resolve(options.onlyBody ? response.body : response);
      });
      setTimeout(() => {
        try {
          channels.request.publish(context);
        } catch (err) {
          reject(err);
        }
      }, 0);
    })
  };
};
class Cancel {
  constructor(message) {
    __publicField(this, "__CANCEL__", true);
    __publicField(this, "message");
    this.message = message;
  }
  toString() {
    return "Cancel".concat(this.message ? ": ".concat(this.message) : "");
  }
}
const _CancelToken = class _CancelToken {
  constructor(executor) {
    __publicField(this, "promise");
    __publicField(this, "reason");
    if (typeof executor !== "function") {
      throw new TypeError("executor must be a function.");
    }
    let resolvePromise = null;
    this.promise = new Promise(resolve => {
      resolvePromise = resolve;
    });
    executor(message => {
      if (this.reason) {
        return;
      }
      this.reason = new Cancel(message);
      resolvePromise(this.reason);
    });
  }
};
__publicField(_CancelToken, "source", () => {
  let cancel;
  const token = new _CancelToken(can => {
    cancel = can;
  });
  return {
    token,
    cancel
  };
});
let CancelToken = _CancelToken;
const isCancel = value => !!(value && (value == null ? void 0 : value.__CANCEL__));
promise.Cancel = Cancel;
promise.CancelToken = CancelToken;
promise.isCancel = isCancel;
function proxy(_proxy) {
  if (_proxy !== false && (!_proxy || !_proxy.host)) {
    throw new Error("Proxy middleware takes an object of host, port and auth properties");
  }
  return {
    processOptions: options => Object.assign({
      proxy: _proxy
    }, options)
  };
}
var defaultShouldRetry = (err, num, options) => {
  if (options.method !== "GET" && options.method !== "HEAD") {
    return false;
  }
  if (err.response && err.response.statusCode) {
    return false;
  }
  return is_retry_allowed(err);
};
const isStream = stream => stream !== null && typeof stream === "object" && typeof stream.pipe === "function";
var sharedRetry = opts => {
  const maxRetries = opts.maxRetries || 5;
  const retryDelay = opts.retryDelay || getRetryDelay;
  const allowRetry = opts.shouldRetry;
  return {
    onError: (err, context) => {
      const options = context.options;
      const max = options.maxRetries || maxRetries;
      const shouldRetry = options.shouldRetry || allowRetry;
      const attemptNumber = options.attemptNumber || 0;
      if (isStream(options.body)) {
        return err;
      }
      if (!shouldRetry(err, attemptNumber, options) || attemptNumber >= max) {
        return err;
      }
      const newContext = Object.assign({}, context, {
        options: Object.assign({}, options, {
          attemptNumber: attemptNumber + 1
        })
      });
      setTimeout(() => context.channels.request.publish(newContext), retryDelay(attemptNumber));
      return null;
    }
  };
};
function getRetryDelay(attemptNum) {
  return 100 * Math.pow(2, attemptNum) + Math.random() * 100;
}
const retry = function () {
  let opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return sharedRetry({
    shouldRetry: defaultShouldRetry,
    ...opts
  });
};
retry.shouldRetry = defaultShouldRetry;
function encode(data) {
  const query = new URLSearchParams();
  const nest = (name, _value) => {
    const value = _value instanceof Set ? Array.from(_value) : _value;
    if (Array.isArray(value)) {
      if (value.length) {
        for (const index in value) {
          nest("".concat(name, "[").concat(index, "]"), value[index]);
        }
      } else {
        query.append("".concat(name, "[]"), "");
      }
    } else if (typeof value === "object" && value !== null) {
      for (const [key, obj] of Object.entries(value)) {
        nest("".concat(name, "[").concat(key, "]"), obj);
      }
    } else {
      query.append(name, value);
    }
  };
  for (const [key, value] of Object.entries(data)) {
    nest(key, value);
  }
  return query.toString();
}
function urlEncoded() {
  return {
    processOptions: options => {
      const body = options.body;
      if (!body) {
        return options;
      }
      const isStream = typeof body.pipe === "function";
      const shouldSerialize = !isStream && !isBuffer(body) && isPlainObject(body);
      if (!shouldSerialize) {
        return options;
      }
      return {
        ...options,
        body: encode(options.body),
        headers: {
          ...options.headers,
          "Content-Type": "application/x-www-form-urlencoded"
        }
      };
    }
  };
}
function buildKeepAlive(agent) {
  return function keepAlive() {
    let config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    const ms = config.ms || 1e3;
    const maxFree = config.maxFree || 256;
    const agentOptions = {
      keepAlive: true,
      keepAliveMsecs: ms,
      maxFreeSockets: maxFree
    };
    return agent(agentOptions);
  };
}
const keepAlive = buildKeepAlive(agent);

//# sourceMappingURL=middleware.js.map

;// CONCATENATED MODULE: ./node_modules/get-it/dist/_chunks/defaultOptionsValidator-733a091f.js
const isReactNative = typeof navigator === "undefined" ? false : navigator.product === "ReactNative";
const defaultOptions = {
  timeout: isReactNative ? 6e4 : 12e4
};
const processOptions = function processOptions2(opts) {
  const options = {
    ...defaultOptions,
    ...(typeof opts === "string" ? {
      url: opts
    } : opts)
  };
  const {
    searchParams
  } = new URL(options.url, "http://localhost");
  options.timeout = normalizeTimeout(options.timeout);
  if (options.query) {
    for (const [key, value] of Object.entries(options.query)) {
      if (value !== void 0) {
        if (Array.isArray(value)) {
          for (const v of value) {
            searchParams.append(key, v);
          }
        } else {
          searchParams.append(key, value);
        }
      }
    }
  }
  const [url] = options.url.split("?");
  const search = searchParams.toString();
  if (search) {
    options.url = "".concat(url, "?").concat(search);
  }
  options.method = options.body && !options.method ? "POST" : (options.method || "GET").toUpperCase();
  return options;
};
function normalizeTimeout(time) {
  if (time === false || time === 0) {
    return false;
  }
  if (time.connect || time.socket) {
    return time;
  }
  const delay = Number(time);
  if (isNaN(delay)) {
    return normalizeTimeout(defaultOptions.timeout);
  }
  return {
    connect: delay,
    socket: delay
  };
}
const validUrl = /^https?:\/\//i;
const validateOptions = function validateOptions2(options) {
  if (!validUrl.test(options.url)) {
    throw new Error('"'.concat(options.url, '" is not a valid URL'));
  }
};

//# sourceMappingURL=defaultOptionsValidator-733a091f.js.map

;// CONCATENATED MODULE: ./node_modules/get-it/dist/_chunks/createRequester-99d9f284.js

const middlewareReducer = middleware => function applyMiddleware(hook, defaultValue) {
  const bailEarly = hook === "onError";
  let value = defaultValue;
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }
  for (let i = 0; i < middleware[hook].length; i++) {
    const handler = middleware[hook][i];
    value = handler(value, ...args);
    if (bailEarly && !value) {
      break;
    }
  }
  return value;
};
function createPubSub() {
  const subscribers = /* @__PURE__ */Object.create(null);
  let nextId = 0;
  function subscribe(subscriber) {
    const id = nextId++;
    subscribers[id] = subscriber;
    return function unsubscribe() {
      delete subscribers[id];
    };
  }
  function publish(event) {
    for (const id in subscribers) {
      subscribers[id](event);
    }
  }
  return {
    publish,
    subscribe
  };
}
const channelNames = ["request", "response", "progress", "error", "abort"];
const middlehooks = ["processOptions", "validateOptions", "interceptRequest", "finalizeOptions", "onRequest", "onResponse", "onError", "onReturn", "onHeaders"];
function createRequester(initMiddleware, httpRequest) {
  const loadedMiddleware = [];
  const middleware = middlehooks.reduce((ware, name) => {
    ware[name] = ware[name] || [];
    return ware;
  }, {
    processOptions: [processOptions],
    validateOptions: [validateOptions]
  });
  function request(opts) {
    const onResponse = (reqErr, res, ctx) => {
      let error = reqErr;
      let response = res;
      if (!error) {
        try {
          response = applyMiddleware("onResponse", res, ctx);
        } catch (err) {
          response = null;
          error = err;
        }
      }
      error = error && applyMiddleware("onError", error, ctx);
      if (error) {
        channels.error.publish(error);
      } else if (response) {
        channels.response.publish(response);
      }
    };
    const channels = channelNames.reduce((target, name) => {
      target[name] = createPubSub();
      return target;
    }, {});
    const applyMiddleware = middlewareReducer(middleware);
    const options = applyMiddleware("processOptions", opts);
    applyMiddleware("validateOptions", options);
    const context = {
      options,
      channels,
      applyMiddleware
    };
    let ongoingRequest;
    const unsubscribe = channels.request.subscribe(ctx => {
      ongoingRequest = httpRequest(ctx, (err, res) => onResponse(err, res, ctx));
    });
    channels.abort.subscribe(() => {
      unsubscribe();
      if (ongoingRequest) {
        ongoingRequest.abort();
      }
    });
    const returnValue = applyMiddleware("onReturn", channels, context);
    if (returnValue === channels) {
      channels.request.publish(context);
    }
    return returnValue;
  }
  request.use = function use(newMiddleware) {
    if (!newMiddleware) {
      throw new Error("Tried to add middleware that resolved to falsey value");
    }
    if (typeof newMiddleware === "function") {
      throw new Error("Tried to add middleware that was a function. It probably expects you to pass options to it.");
    }
    if (newMiddleware.onReturn && middleware.onReturn.length > 0) {
      throw new Error("Tried to add new middleware with `onReturn` handler, but another handler has already been registered for this event");
    }
    middlehooks.forEach(key => {
      if (newMiddleware[key]) {
        middleware[key].push(newMiddleware[key]);
      }
    });
    loadedMiddleware.push(newMiddleware);
    return request;
  };
  request.clone = () => createRequester(loadedMiddleware, httpRequest);
  initMiddleware.forEach(request.use);
  return request;
}

//# sourceMappingURL=createRequester-99d9f284.js.map

// EXTERNAL MODULE: ./node_modules/decompress-response/index.js
var decompress_response = __webpack_require__(75200);
// EXTERNAL MODULE: ./node_modules/follow-redirects/index.js
var follow_redirects = __webpack_require__(71794);
// EXTERNAL MODULE: ./node_modules/into-stream/index.js
var into_stream = __webpack_require__(72070);
// EXTERNAL MODULE: ./node_modules/is-stream/index.js
var is_stream = __webpack_require__(51750);
// EXTERNAL MODULE: external "querystring"
var external_querystring_ = __webpack_require__(63477);
// EXTERNAL MODULE: external "url"
var external_url_ = __webpack_require__(57310);
// EXTERNAL MODULE: ./node_modules/tunnel-agent/index.js
var tunnel_agent = __webpack_require__(57524);
var tunnel_agent_namespaceObject = /*#__PURE__*/__webpack_require__.t(tunnel_agent, 2);
;// CONCATENATED MODULE: ./node_modules/get-it/dist/index.js











function lowerCaseHeaders(headers) {
  return Object.keys(headers || {}).reduce((acc, header) => {
    acc[header.toLowerCase()] = headers[header];
    return acc;
  }, {});
}
function formatHostname(hostname) {
  return hostname.replace(/^\.*/, ".").toLowerCase();
}
function parseNoProxyZone(zoneStr) {
  const zone = zoneStr.trim().toLowerCase();
  const zoneParts = zone.split(":", 2);
  const zoneHost = formatHostname(zoneParts[0]);
  const zonePort = zoneParts[1];
  const hasPort = zone.indexOf(":") > -1;
  return {
    hostname: zoneHost,
    port: zonePort,
    hasPort
  };
}
function uriInNoProxy(uri, noProxy) {
  const port = uri.port || (uri.protocol === "https:" ? "443" : "80");
  const hostname = formatHostname(uri.hostname);
  const noProxyList = noProxy.split(",");
  return noProxyList.map(parseNoProxyZone).some(noProxyZone => {
    const isMatchedAt = hostname.indexOf(noProxyZone.hostname);
    const hostnameMatched = isMatchedAt > -1 && isMatchedAt === hostname.length - noProxyZone.hostname.length;
    if (noProxyZone.hasPort) {
      return port === noProxyZone.port && hostnameMatched;
    }
    return hostnameMatched;
  });
}
function getProxyFromUri(uri) {
  const noProxy = process.env.NO_PROXY || process.env.no_proxy || "";
  if (noProxy === "*") {
    return null;
  }
  if (noProxy !== "" && uriInNoProxy(uri, noProxy)) {
    return null;
  }
  if (uri.protocol === "http:") {
    return process.env.HTTP_PROXY || process.env.http_proxy || null;
  }
  if (uri.protocol === "https:") {
    return process.env.HTTPS_PROXY || process.env.https_proxy || process.env.HTTP_PROXY || process.env.http_proxy || null;
  }
  return null;
}
function getHostFromUri(uri) {
  let host = uri.host;
  if (uri.port) {
    if (uri.port === "80" && uri.protocol === "http:" || uri.port === "443" && uri.protocol === "https:") {
      host = uri.hostname;
    }
  }
  return host;
}
function getHostHeaderWithPort(uri) {
  const port = uri.port || (uri.protocol === "https:" ? "443" : "80");
  return "".concat(uri.hostname, ":").concat(port);
}
function rewriteUriForProxy(reqOpts, uri, proxy) {
  const headers = reqOpts.headers || {};
  const options = Object.assign({}, reqOpts, {
    headers
  });
  headers.host = headers.host || getHostHeaderWithPort(uri);
  options.protocol = proxy.protocol || options.protocol;
  options.hostname = proxy.host.replace(/:\d+/, "");
  options.port = proxy.port;
  options.host = getHostFromUri(Object.assign({}, uri, proxy));
  options.href = "".concat(options.protocol, "//").concat(options.host).concat(options.path);
  options.path = external_url_.format(uri);
  return options;
}
function getProxyOptions(options) {
  let proxy;
  if (options.hasOwnProperty("proxy")) {
    proxy = options.proxy;
  } else {
    const uri = external_url_.parse(options.url);
    proxy = getProxyFromUri(uri);
  }
  return typeof proxy === "string" ? external_url_.parse(proxy) : proxy;
}

/*! simple-concat. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
function concat(stream, cb) {
  const chunks = [];
  stream.on("data", function (chunk) {
    chunks.push(chunk);
  });
  stream.once("end", function () {
    if (cb) cb(null, Buffer.concat(chunks));
    cb = null;
  });
  stream.once("error", function (err) {
    if (cb) cb(err);
    cb = null;
  });
}
function timedOut(req, time) {
  if (req.timeoutTimer) {
    return req;
  }
  const delays = isNaN(time) ? time : {
    socket: time,
    connect: time
  };
  const hostHeader = req.getHeader("host");
  const host = hostHeader ? " to " + hostHeader : "";
  if (delays.connect !== void 0) {
    req.timeoutTimer = setTimeout(function timeoutHandler() {
      req.abort();
      const e = new Error("Connection timed out on request" + host);
      e.code = "ETIMEDOUT";
      req.emit("error", e);
    }, delays.connect);
  }
  req.on("socket", function assign(socket) {
    if (!(socket.connecting || socket._connecting)) {
      connect();
      return;
    }
    socket.once("connect", connect);
  });
  function clear() {
    if (req.timeoutTimer) {
      clearTimeout(req.timeoutTimer);
      req.timeoutTimer = null;
    }
  }
  function connect() {
    clear();
    if (delays.socket !== void 0) {
      req.setTimeout(delays.socket, function socketTimeoutHandler() {
        req.abort();
        const e = new Error("Socket timed out on request" + host);
        e.code = "ESOCKETTIMEDOUT";
        req.emit("error", e);
      });
    }
  }
  return req.on("error", clear);
}
const uriParts = ["protocol", "slashes", "auth", "host", "port", "hostname", "hash", "search", "query", "pathname", "path", "href"];
const defaultProxyHeaderWhiteList = ["accept", "accept-charset", "accept-encoding", "accept-language", "accept-ranges", "cache-control", "content-encoding", "content-language", "content-location", "content-md5", "content-range", "content-type", "connection", "date", "expect", "max-forwards", "pragma", "referer", "te", "user-agent", "via"];
const defaultProxyHeaderExclusiveList = ["proxy-authorization"];
function shouldEnable(options) {
  if (typeof options.tunnel !== "undefined") {
    return Boolean(options.tunnel);
  }
  const uri = external_url_.parse(options.url);
  if (uri.protocol === "https:") {
    return true;
  }
  return false;
}
function applyAgent() {
  let opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  let proxy = arguments.length > 1 ? arguments[1] : undefined;
  const options = Object.assign({}, opts);
  const proxyHeaderWhiteList = defaultProxyHeaderWhiteList.concat(options.proxyHeaderWhiteList || []).map(header => header.toLowerCase());
  const proxyHeaderExclusiveList = defaultProxyHeaderExclusiveList.concat(options.proxyHeaderExclusiveList || []).map(header => header.toLowerCase());
  const proxyHeaders = getAllowedProxyHeaders(options.headers, proxyHeaderWhiteList);
  proxyHeaders.host = constructProxyHost(options);
  options.headers = Object.keys(options.headers || {}).reduce((headers, header) => {
    const isAllowed = proxyHeaderExclusiveList.indexOf(header.toLowerCase()) === -1;
    if (isAllowed) {
      headers[header] = options.headers[header];
    }
    return headers;
  }, {});
  const tunnelFn = getTunnelFn(options, proxy);
  const tunnelOptions = constructTunnelOptions(options, proxy, proxyHeaders);
  options.agent = tunnelFn(tunnelOptions);
  return options;
}
function getTunnelFn(options, proxy) {
  const uri = getUriParts(options);
  const tunnelFnName = constructTunnelFnName(uri, proxy);
  return tunnel_agent_namespaceObject[tunnelFnName];
}
function getUriParts(options) {
  return uriParts.reduce((uri, part) => {
    uri[part] = options[part];
    return uri;
  }, {});
}
function constructTunnelFnName(uri, proxy) {
  const uriProtocol = uri.protocol === "https:" ? "https" : "http";
  const proxyProtocol = proxy.protocol === "https:" ? "Https" : "Http";
  return "".concat(uriProtocol, "Over").concat(proxyProtocol);
}
function constructProxyHost(uri) {
  const port = uri.port;
  const protocol = uri.protocol;
  let proxyHost = "".concat(uri.hostname, ":");
  if (port) {
    proxyHost += port;
  } else if (protocol === "https:") {
    proxyHost += "443";
  } else {
    proxyHost += "80";
  }
  return proxyHost;
}
function getAllowedProxyHeaders(headers, whiteList) {
  return Object.keys(headers).filter(header => whiteList.indexOf(header.toLowerCase()) !== -1).reduce((set, header) => {
    set[header] = headers[header];
    return set;
  }, {});
}
function constructTunnelOptions(options, proxy, proxyHeaders) {
  return {
    proxy: {
      host: proxy.hostname,
      port: +proxy.port,
      proxyAuth: proxy.auth,
      headers: proxyHeaders
    },
    headers: options.headers,
    ca: options.ca,
    cert: options.cert,
    key: options.key,
    passphrase: options.passphrase,
    pfx: options.pfx,
    ciphers: options.ciphers,
    rejectUnauthorized: options.rejectUnauthorized,
    secureOptions: options.secureOptions,
    secureProtocol: options.secureProtocol
  };
}
const adapter = "node";
const reduceResponse = (res, reqUrl, method, body) => ({
  body,
  url: reqUrl,
  method,
  headers: res.headers,
  statusCode: res.statusCode,
  statusMessage: res.statusMessage
});
const httpRequester = (context, cb) => {
  const {
    options
  } = context;
  const uri = Object.assign({}, external_url_.parse(options.url));
  if (typeof fetch === "function" && options.fetch) {
    const controller = new AbortController();
    const reqOpts2 = context.applyMiddleware("finalizeOptions", {
      ...uri,
      method: options.method,
      headers: {
        ...(typeof options.fetch === "object" && options.fetch.headers ? lowerCaseHeaders(options.fetch.headers) : {}),
        ...lowerCaseHeaders(options.headers)
      },
      maxRedirects: options.maxRedirects
    });
    const fetchOpts = {
      credentials: options.withCredentials ? "include" : "omit",
      ...(typeof options.fetch === "object" ? options.fetch : {}),
      method: reqOpts2.method,
      headers: reqOpts2.headers,
      body: options.body,
      signal: controller.signal
    };
    const injectedResponse2 = context.applyMiddleware("interceptRequest", void 0, {
      adapter,
      context
    });
    if (injectedResponse2) {
      const cbTimer = setTimeout(cb, 0, null, injectedResponse2);
      const cancel = () => clearTimeout(cbTimer);
      return {
        abort: cancel
      };
    }
    const request2 = fetch(options.url, fetchOpts);
    context.applyMiddleware("onRequest", {
      options,
      adapter,
      request: request2,
      context
    });
    request2.then(async res => {
      const body = options.rawBody ? res.body : await res.text();
      const headers = {};
      res.headers.forEach((value, key) => {
        headers[key] = value;
      });
      cb(null, {
        body,
        url: res.url,
        method: options.method,
        headers,
        statusCode: res.status,
        statusMessage: res.statusText
      });
    }).catch(err => {
      if (err.name == "AbortError") return;
      cb(err);
    });
    return {
      abort: () => controller.abort()
    };
  }
  const bodyType = is_stream(options.body) ? "stream" : typeof options.body;
  if (bodyType !== "undefined" && bodyType !== "stream" && bodyType !== "string" && !Buffer.isBuffer(options.body)) {
    throw new Error("Request body must be a string, buffer or stream, got ".concat(bodyType));
  }
  const lengthHeader = {};
  if (options.bodySize) {
    lengthHeader["content-length"] = options.bodySize;
  } else if (options.body && bodyType !== "stream") {
    lengthHeader["content-length"] = Buffer.byteLength(options.body);
  }
  let aborted = false;
  const callback = (err, res) => !aborted && cb(err, res);
  context.channels.abort.subscribe(() => {
    aborted = true;
  });
  let reqOpts = Object.assign({}, uri, {
    method: options.method,
    headers: Object.assign({}, lowerCaseHeaders(options.headers), lengthHeader),
    maxRedirects: options.maxRedirects
  });
  const proxy = getProxyOptions(options);
  const tunnel = proxy && shouldEnable(options);
  const injectedResponse = context.applyMiddleware("interceptRequest", void 0, {
    adapter,
    context
  });
  if (injectedResponse) {
    const cbTimer = setImmediate(callback, null, injectedResponse);
    const abort = () => clearImmediate(cbTimer);
    return {
      abort
    };
  }
  if (options.maxRedirects !== 0) {
    reqOpts.maxRedirects = options.maxRedirects || 5;
  }
  if (proxy && tunnel) {
    reqOpts = applyAgent(reqOpts, proxy);
  } else if (proxy && !tunnel) {
    reqOpts = rewriteUriForProxy(reqOpts, uri, proxy);
  }
  if (!tunnel && proxy && proxy.auth && !reqOpts.headers["proxy-authorization"]) {
    const [username, password] = proxy.auth.username ? [proxy.auth.username, proxy.auth.password] : proxy.auth.split(":").map(item => external_querystring_.unescape(item));
    const auth = Buffer.from("".concat(username, ":").concat(password), "utf8");
    const authBase64 = auth.toString("base64");
    reqOpts.headers["proxy-authorization"] = "Basic ".concat(authBase64);
  }
  const transport = getRequestTransport(reqOpts, proxy, tunnel);
  if (typeof options.debug === "function" && proxy) {
    options.debug("Proxying using %s", reqOpts.agent ? "tunnel agent" : "".concat(reqOpts.host, ":").concat(reqOpts.port));
  }
  const tryCompressed = reqOpts.method !== "HEAD";
  if (tryCompressed && !reqOpts.headers["accept-encoding"] && options.compress !== false) {
    reqOpts.headers["accept-encoding"] = "br, gzip, deflate";
  }
  const finalOptions = context.applyMiddleware("finalizeOptions", reqOpts);
  const request = transport.request(finalOptions, response => {
    const res = tryCompressed ? decompress_response(response) : response;
    const resStream = context.applyMiddleware("onHeaders", res, {
      headers: response.headers,
      adapter,
      context
    });
    const reqUrl = "responseUrl" in response ? response.responseUrl : options.url;
    if (options.stream) {
      callback(null, reduceResponse(res, reqUrl, reqOpts.method, resStream));
      return;
    }
    concat(resStream, (err, data) => {
      if (err) {
        return callback(err);
      }
      const body = options.rawBody ? data : data.toString();
      const reduced = reduceResponse(res, reqUrl, reqOpts.method, body);
      return callback(null, reduced);
    });
  });
  if (options.timeout) {
    timedOut(request, options.timeout);
  }
  request.once("error", callback);
  const {
    bodyStream,
    progress
  } = getProgressStream(options);
  context.applyMiddleware("onRequest", {
    options,
    adapter,
    request,
    context,
    progress
  });
  if (bodyStream) {
    bodyStream.pipe(request);
  } else {
    request.end(options.body);
  }
  return {
    abort: () => request.abort()
  };
};
function getProgressStream(options) {
  if (!options.body) {
    return {};
  }
  const bodyIsStream = is_stream(options.body);
  const length = options.bodySize || (bodyIsStream ? null : Buffer.byteLength(options.body));
  if (!length) {
    return bodyIsStream ? {
      bodyStream: options.body
    } : {};
  }
  const progress = progress_stream({
    time: 16,
    length
  });
  const bodyStream = bodyIsStream ? options.body : into_stream(options.body);
  return {
    bodyStream: bodyStream.pipe(progress),
    progress
  };
}
function getRequestTransport(reqOpts, proxy, tunnel) {
  const isHttpsRequest = reqOpts.protocol === "https:";
  const transports = reqOpts.maxRedirects === 0 ? {
    http: external_http_,
    https: external_https_
  } : {
    http: follow_redirects.http,
    https: follow_redirects.https
  };
  if (!proxy || tunnel) {
    return isHttpsRequest ? transports.https : transports.http;
  }
  let isHttpsProxy = proxy.port === 443;
  if (proxy.protocol) {
    isHttpsProxy = /^https:?/.test(proxy.protocol);
  }
  return isHttpsProxy ? transports.https : transports.http;
}
const getIt = function () {
  let initMiddleware = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  let httpRequest = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : httpRequester;
  return createRequester(initMiddleware, httpRequest);
};
const environment = "node";

//# sourceMappingURL=index.js.map

// EXTERNAL MODULE: ./node_modules/rxjs/dist/cjs/index.js
var cjs = __webpack_require__(70556);
// EXTERNAL MODULE: ./node_modules/rxjs/dist/cjs/operators/index.js
var operators = __webpack_require__(60741);
;// CONCATENATED MODULE: ./node_modules/@sanity/client/dist/index.js





var dist_name = "@sanity/client";
var version = "6.4.9";
const middleware = [debug({
  verbose: true,
  namespace: "sanity:client"
}), headers({
  "User-Agent": "".concat(dist_name, " ").concat(version)
}),
// Enable keep-alive, and in addition limit the number of sockets that can be opened.
// This avoids opening too many connections to the server if someone tries to execute
// a bunch of requests in parallel. It's recommended to have a concurrency limit
// at a "higher limit" (i.e. you shouldn't actually execute hundreds of requests in parallel),
// and this is mainly to minimize the impact for the network and server.
//
// We're currently matching the same defaults as browsers:
// https://stackoverflow.com/questions/26003756/is-there-a-limit-practical-or-otherwise-to-the-number-of-web-sockets-a-page-op
agent({
  keepAlive: true,
  maxSockets: 30,
  maxTotalSockets: 256
})];
var __defProp$3 = Object.defineProperty;
var __defNormalProp$3 = (obj, key, value) => key in obj ? __defProp$3(obj, key, {
  enumerable: true,
  configurable: true,
  writable: true,
  value
}) : obj[key] = value;
var __publicField$3 = (obj, key, value) => {
  __defNormalProp$3(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const MAX_ITEMS_IN_ERROR_MESSAGE = 5;
class ClientError extends Error {
  constructor(res) {
    const props = extractErrorProps(res);
    super(props.message);
    __publicField$3(this, "response");
    __publicField$3(this, "statusCode", 400);
    __publicField$3(this, "responseBody");
    __publicField$3(this, "details");
    Object.assign(this, props);
  }
}
class ServerError extends Error {
  constructor(res) {
    const props = extractErrorProps(res);
    super(props.message);
    __publicField$3(this, "response");
    __publicField$3(this, "statusCode", 500);
    __publicField$3(this, "responseBody");
    __publicField$3(this, "details");
    Object.assign(this, props);
  }
}
function extractErrorProps(res) {
  const body = res.body;
  const props = {
    response: res,
    statusCode: res.statusCode,
    responseBody: dist_stringifyBody(body, res),
    message: "",
    details: void 0
  };
  if (body.error && body.message) {
    props.message = "".concat(body.error, " - ").concat(body.message);
    return props;
  }
  if (isMutationError(body)) {
    const allItems = body.error.items || [];
    const items = allItems.slice(0, MAX_ITEMS_IN_ERROR_MESSAGE).map(item => {
      var _a;
      return (_a = item.error) == null ? void 0 : _a.description;
    }).filter(Boolean);
    let itemsStr = items.length ? ":\n- ".concat(items.join("\n- ")) : "";
    if (allItems.length > MAX_ITEMS_IN_ERROR_MESSAGE) {
      itemsStr += "\n...and ".concat(allItems.length - MAX_ITEMS_IN_ERROR_MESSAGE, " more");
    }
    props.message = "".concat(body.error.description).concat(itemsStr);
    props.details = body.error;
    return props;
  }
  if (body.error && body.error.description) {
    props.message = body.error.description;
    props.details = body.error;
    return props;
  }
  props.message = body.error || body.message || httpErrorMessage(res);
  return props;
}
function isMutationError(body) {
  return dist_isPlainObject(body) && dist_isPlainObject(body.error) && body.error.type === "mutationError" && typeof body.error.description === "string";
}
function dist_isPlainObject(obj) {
  return typeof obj === "object" && obj !== null && !Array.isArray(obj);
}
function httpErrorMessage(res) {
  const statusMessage = res.statusMessage ? " ".concat(res.statusMessage) : "";
  return "".concat(res.method, "-request to ").concat(res.url, " resulted in HTTP ").concat(res.statusCode).concat(statusMessage);
}
function dist_stringifyBody(body, res) {
  const contentType = (res.headers["content-type"] || "").toLowerCase();
  const isJson = contentType.indexOf("application/json") !== -1;
  return isJson ? JSON.stringify(body, null, 2) : body;
}
const httpError = {
  onResponse: res => {
    if (res.statusCode >= 500) {
      throw new ServerError(res);
    } else if (res.statusCode >= 400) {
      throw new ClientError(res);
    }
    return res;
  }
};
const printWarnings = {
  onResponse: res => {
    const warn = res.headers["x-sanity-warning"];
    const warnings = Array.isArray(warn) ? warn : [warn];
    warnings.filter(Boolean).forEach(msg => console.warn(msg));
    return res;
  }
};
function defineHttpRequest(envMiddleware, _ref) {
  let {
    maxRetries = 5,
    retryDelay
  } = _ref;
  const request = getIt([maxRetries > 0 ? retry({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    retryDelay,
    // This option is typed incorrectly in get-it.
    maxRetries,
    shouldRetry
  }) : {}, ...envMiddleware, printWarnings, jsonRequest(), jsonResponse(), progress(), httpError, observable({
    implementation: cjs.Observable
  })]);
  function httpRequest(options) {
    let requester = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : request;
    return requester({
      maxRedirects: 0,
      ...options
    });
  }
  httpRequest.defaultRequester = request;
  return httpRequest;
}
function shouldRetry(err, attempt, options) {
  const isSafe = options.method === "GET" || options.method === "HEAD";
  const uri = options.uri || options.url;
  const isQuery = uri.startsWith("/data/query");
  const isRetriableResponse = err.response && (err.response.statusCode === 429 || err.response.statusCode === 502 || err.response.statusCode === 503);
  if ((isSafe || isQuery) && isRetriableResponse) return true;
  return retry.shouldRetry(err, attempt, options);
}
const BASE_URL = "https://www.sanity.io/help/";
function generateHelpUrl(slug) {
  return BASE_URL + slug;
}
const VALID_ASSET_TYPES = ["image", "file"];
const VALID_INSERT_LOCATIONS = ["before", "after", "replace"];
const dataset = name => {
  if (!/^(~[a-z0-9]{1}[-\w]{0,63}|[a-z0-9]{1}[-\w]{0,63})$/.test(name)) {
    throw new Error("Datasets can only contain lowercase characters, numbers, underscores and dashes, and start with tilde, and be maximum 64 characters");
  }
};
const projectId = id => {
  if (!/^[-a-z0-9]+$/i.test(id)) {
    throw new Error("`projectId` can only contain only a-z, 0-9 and dashes");
  }
};
const validateAssetType = type => {
  if (VALID_ASSET_TYPES.indexOf(type) === -1) {
    throw new Error("Invalid asset type: ".concat(type, ". Must be one of ").concat(VALID_ASSET_TYPES.join(", ")));
  }
};
const validateObject = (op, val) => {
  if (val === null || typeof val !== "object" || Array.isArray(val)) {
    throw new Error("".concat(op, "() takes an object of properties"));
  }
};
const validateDocumentId = (op, id) => {
  if (typeof id !== "string" || !/^[a-z0-9_][a-z0-9_.-]{0,127}$/i.test(id) || id.includes("..")) {
    throw new Error("".concat(op, '(): "').concat(id, '" is not a valid document ID'));
  }
};
const requireDocumentId = (op, doc) => {
  if (!doc._id) {
    throw new Error("".concat(op, '() requires that the document contains an ID ("_id" property)'));
  }
  validateDocumentId(op, doc._id);
};
const validateInsert = (at, selector, items) => {
  const signature = "insert(at, selector, items)";
  if (VALID_INSERT_LOCATIONS.indexOf(at) === -1) {
    const valid = VALID_INSERT_LOCATIONS.map(loc => '"'.concat(loc, '"')).join(", ");
    throw new Error("".concat(signature, ' takes an "at"-argument which is one of: ').concat(valid));
  }
  if (typeof selector !== "string") {
    throw new Error("".concat(signature, ' takes a "selector"-argument which must be a string'));
  }
  if (!Array.isArray(items)) {
    throw new Error("".concat(signature, ' takes an "items"-argument which must be an array'));
  }
};
const hasDataset = config => {
  if (!config.dataset) {
    throw new Error("`dataset` must be provided to perform queries");
  }
  return config.dataset || "";
};
const requestTag = tag => {
  if (typeof tag !== "string" || !/^[a-z0-9._-]{1,75}$/i.test(tag)) {
    throw new Error("Tag can only contain alphanumeric characters, underscores, dashes and dots, and be between one and 75 characters long.");
  }
  return tag;
};
function once(fn) {
  let didCall = false;
  let returnValue;
  return function () {
    if (didCall) {
      return returnValue;
    }
    returnValue = fn(...arguments);
    didCall = true;
    return returnValue;
  };
}
const createWarningPrinter = message =>
// eslint-disable-next-line no-console
once(function () {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return console.warn(message.join(" "), ...args);
});
const printCdnWarning = createWarningPrinter(["Since you haven't set a value for `useCdn`, we will deliver content using our", "global, edge-cached API-CDN. If you wish to have content delivered faster, set", "`useCdn: false` to use the Live API. Note: You may incur higher costs using the live API."]);
const printCdnPreviewDraftsWarning = createWarningPrinter(["The Sanity client is configured with the `perspective` set to `previewDrafts`, which doesn't support the API-CDN.", "The Live API will be used instead. Set `useCdn: false` in your configuration to hide this warning."]);
const printBrowserTokenWarning = createWarningPrinter(["You have configured Sanity client to use a token in the browser. This may cause unintentional security issues.", "See ".concat(generateHelpUrl("js-client-browser-token"), " for more information and how to hide this warning.")]);
const printNoApiVersionSpecifiedWarning = createWarningPrinter(["Using the Sanity client without specifying an API version is deprecated.", "See ".concat(generateHelpUrl("js-client-api-version"))]);
const printNoDefaultExport = createWarningPrinter(["The default export of @sanity/client has been deprecated. Use the named export `createClient` instead."]);
const defaultCdnHost = "apicdn.sanity.io";
const defaultConfig = {
  apiHost: "https://api.sanity.io",
  apiVersion: "1",
  useProjectHostname: true
};
const LOCALHOSTS = ["localhost", "127.0.0.1", "0.0.0.0"];
const isLocal = host => LOCALHOSTS.indexOf(host) !== -1;
const validateApiVersion = function validateApiVersion2(apiVersion) {
  if (apiVersion === "1" || apiVersion === "X") {
    return;
  }
  const apiDate = new Date(apiVersion);
  const apiVersionValid = /^\d{4}-\d{2}-\d{2}$/.test(apiVersion) && apiDate instanceof Date && apiDate.getTime() > 0;
  if (!apiVersionValid) {
    throw new Error("Invalid API version string, expected `1` or date in format `YYYY-MM-DD`");
  }
};
const validateApiPerspective = function validateApiPerspective2(perspective) {
  switch (perspective) {
    case "previewDrafts":
    case "published":
    case "raw":
      return;
    default:
      throw new TypeError("Invalid API perspective string, expected `published`, `previewDrafts` or `raw`");
  }
};
const initConfig = (config, prevConfig) => {
  const specifiedConfig = Object.assign({}, prevConfig, config);
  if (!specifiedConfig.apiVersion) {
    printNoApiVersionSpecifiedWarning();
  }
  const newConfig = Object.assign({}, defaultConfig, specifiedConfig);
  const projectBased = newConfig.useProjectHostname;
  if (typeof Promise === "undefined") {
    const helpUrl = generateHelpUrl("js-client-promise-polyfill");
    throw new Error("No native Promise-implementation found, polyfill needed - see ".concat(helpUrl));
  }
  if (projectBased && !newConfig.projectId) {
    throw new Error("Configuration must contain `projectId`");
  }
  if (typeof newConfig.perspective === "string") {
    validateApiPerspective(newConfig.perspective);
  }
  if ("encodeSourceMapAtPath" in newConfig || "encodeSourceMap" in newConfig || "studioUrl" in newConfig || "logger" in newConfig) {
    throw new Error("It looks like you're using options meant for '@sanity/preview-kit/client', such as 'encodeSourceMapAtPath', 'encodeSourceMap', 'studioUrl' and 'logger'. Make sure you're using the right import.");
  }
  const isBrowser = typeof window !== "undefined" && window.location && window.location.hostname;
  const isLocalhost = isBrowser && isLocal(window.location.hostname);
  if (isBrowser && isLocalhost && newConfig.token && newConfig.ignoreBrowserTokenWarning !== true) {
    printBrowserTokenWarning();
  } else if (typeof newConfig.useCdn === "undefined") {
    printCdnWarning();
  }
  if (projectBased) {
    projectId(newConfig.projectId);
  }
  if (newConfig.dataset) {
    dataset(newConfig.dataset);
  }
  if ("requestTagPrefix" in newConfig) {
    newConfig.requestTagPrefix = newConfig.requestTagPrefix ? requestTag(newConfig.requestTagPrefix).replace(/\.+$/, "") : void 0;
  }
  newConfig.apiVersion = "".concat(newConfig.apiVersion).replace(/^v/, "");
  newConfig.isDefaultApi = newConfig.apiHost === defaultConfig.apiHost;
  newConfig.useCdn = newConfig.useCdn !== false && !newConfig.withCredentials;
  validateApiVersion(newConfig.apiVersion);
  const hostParts = newConfig.apiHost.split("://", 2);
  const protocol = hostParts[0];
  const host = hostParts[1];
  const cdnHost = newConfig.isDefaultApi ? defaultCdnHost : host;
  if (newConfig.useProjectHostname) {
    newConfig.url = "".concat(protocol, "://").concat(newConfig.projectId, ".").concat(host, "/v").concat(newConfig.apiVersion);
    newConfig.cdnUrl = "".concat(protocol, "://").concat(newConfig.projectId, ".").concat(cdnHost, "/v").concat(newConfig.apiVersion);
  } else {
    newConfig.url = "".concat(newConfig.apiHost, "/v").concat(newConfig.apiVersion);
    newConfig.cdnUrl = newConfig.url;
  }
  return newConfig;
};
const projectHeader = "X-Sanity-Project-ID";
function requestOptions(config) {
  let overrides = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const headers = {};
  const token = overrides.token || config.token;
  if (token) {
    headers.Authorization = "Bearer ".concat(token);
  }
  if (!overrides.useGlobalApi && !config.useProjectHostname && config.projectId) {
    headers[projectHeader] = config.projectId;
  }
  const withCredentials = Boolean(typeof overrides.withCredentials === "undefined" ? config.token || config.withCredentials : overrides.withCredentials);
  const timeout = typeof overrides.timeout === "undefined" ? config.timeout : overrides.timeout;
  return Object.assign({}, overrides, {
    headers: Object.assign({}, headers, overrides.headers || {}),
    timeout: typeof timeout === "undefined" ? 5 * 60 * 1e3 : timeout,
    proxy: overrides.proxy || config.proxy,
    json: true,
    withCredentials,
    fetch: typeof overrides.fetch === "object" && typeof config.fetch === "object" ? {
      ...config.fetch,
      ...overrides.fetch
    } : overrides.fetch || config.fetch
  });
}
function getSelection(sel) {
  if (typeof sel === "string" || Array.isArray(sel)) {
    return {
      id: sel
    };
  }
  if (typeof sel === "object" && sel !== null && "query" in sel && typeof sel.query === "string") {
    return "params" in sel && typeof sel.params === "object" && sel.params !== null ? {
      query: sel.query,
      params: sel.params
    } : {
      query: sel.query
    };
  }
  const selectionOpts = ["* Document ID (<docId>)", "* Array of document IDs", "* Object containing `query`"].join("\n");
  throw new Error("Unknown selection - must be one of:\n\n".concat(selectionOpts));
}
const encodeQueryString = _ref2 => {
  let {
    query,
    params = {},
    options = {}
  } = _ref2;
  const searchParams = new URLSearchParams();
  const {
    tag,
    ...opts
  } = options;
  if (tag) searchParams.append("tag", tag);
  searchParams.append("query", query);
  for (const [key, value] of Object.entries(params)) {
    searchParams.append("$".concat(key), JSON.stringify(value));
  }
  for (const [key, value] of Object.entries(opts)) {
    if (value) searchParams.append(key, "".concat(value));
  }
  return "?".concat(searchParams);
};
var __defProp$2 = Object.defineProperty;
var __defNormalProp$2 = (obj, key, value) => key in obj ? __defProp$2(obj, key, {
  enumerable: true,
  configurable: true,
  writable: true,
  value
}) : obj[key] = value;
var __publicField$2 = (obj, key, value) => {
  __defNormalProp$2(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var __accessCheck$6 = (obj, member, msg) => {
  if (!member.has(obj)) throw TypeError("Cannot " + msg);
};
var __privateGet$6 = (obj, member, getter) => {
  __accessCheck$6(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd$6 = (obj, member, value) => {
  if (member.has(obj)) throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet$6 = (obj, member, value, setter) => {
  __accessCheck$6(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var _client$5, _client2$5;
class BasePatch {
  constructor(selection) {
    let operations = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    __publicField$2(this, "selection");
    __publicField$2(this, "operations");
    this.selection = selection;
    this.operations = operations;
  }
  /**
   * Sets the given attributes to the document. Does NOT merge objects.
   * The operation is added to the current patch, ready to be commited by `commit()`
   *
   * @param attrs - Attributes to set. To set a deep attribute, use JSONMatch, eg: \{"nested.prop": "value"\}
   */
  set(attrs) {
    return this._assign("set", attrs);
  }
  /**
   * Sets the given attributes to the document if they are not currently set. Does NOT merge objects.
   * The operation is added to the current patch, ready to be commited by `commit()`
   *
   * @param attrs - Attributes to set. To set a deep attribute, use JSONMatch, eg: \{"nested.prop": "value"\}
   */
  setIfMissing(attrs) {
    return this._assign("setIfMissing", attrs);
  }
  /**
   * Performs a "diff-match-patch" operation on the string attributes provided.
   * The operation is added to the current patch, ready to be commited by `commit()`
   *
   * @param attrs - Attributes to perform operation on. To set a deep attribute, use JSONMatch, eg: \{"nested.prop": "dmp"\}
   */
  diffMatchPatch(attrs) {
    validateObject("diffMatchPatch", attrs);
    return this._assign("diffMatchPatch", attrs);
  }
  /**
   * Unsets the attribute paths provided.
   * The operation is added to the current patch, ready to be commited by `commit()`
   *
   * @param attrs - Attribute paths to unset.
   */
  unset(attrs) {
    if (!Array.isArray(attrs)) {
      throw new Error("unset(attrs) takes an array of attributes to unset, non-array given");
    }
    this.operations = Object.assign({}, this.operations, {
      unset: attrs
    });
    return this;
  }
  /**
   * Increment a numeric value. Each entry in the argument is either an attribute or a JSON path. The value may be a positive or negative integer or floating-point value. The operation will fail if target value is not a numeric value, or doesn't exist.
   *
   * @param attrs - Object of attribute paths to increment, values representing the number to increment by.
   */
  inc(attrs) {
    return this._assign("inc", attrs);
  }
  /**
   * Decrement a numeric value. Each entry in the argument is either an attribute or a JSON path. The value may be a positive or negative integer or floating-point value. The operation will fail if target value is not a numeric value, or doesn't exist.
   *
   * @param attrs - Object of attribute paths to decrement, values representing the number to decrement by.
   */
  dec(attrs) {
    return this._assign("dec", attrs);
  }
  /**
   * Provides methods for modifying arrays, by inserting, appending and replacing elements via a JSONPath expression.
   *
   * @param at - Location to insert at, relative to the given selector, or 'replace' the matched path
   * @param selector - JSONPath expression, eg `comments[-1]` or `blocks[_key=="abc123"]`
   * @param items - Array of items to insert/replace
   */
  insert(at, selector, items) {
    validateInsert(at, selector, items);
    return this._assign("insert", {
      [at]: selector,
      items
    });
  }
  /**
   * Append the given items to the array at the given JSONPath
   *
   * @param selector - Attribute/path to append to, eg `comments` or `person.hobbies`
   * @param items - Array of items to append to the array
   */
  append(selector, items) {
    return this.insert("after", "".concat(selector, "[-1]"), items);
  }
  /**
   * Prepend the given items to the array at the given JSONPath
   *
   * @param selector - Attribute/path to prepend to, eg `comments` or `person.hobbies`
   * @param items - Array of items to prepend to the array
   */
  prepend(selector, items) {
    return this.insert("before", "".concat(selector, "[0]"), items);
  }
  /**
   * Change the contents of an array by removing existing elements and/or adding new elements.
   *
   * @param selector - Attribute or JSONPath expression for array
   * @param start - Index at which to start changing the array (with origin 0). If greater than the length of the array, actual starting index will be set to the length of the array. If negative, will begin that many elements from the end of the array (with origin -1) and will be set to 0 if absolute value is greater than the length of the array.x
   * @param deleteCount - An integer indicating the number of old array elements to remove.
   * @param items - The elements to add to the array, beginning at the start index. If you don't specify any elements, splice() will only remove elements from the array.
   */
  splice(selector, start, deleteCount, items) {
    const delAll = typeof deleteCount === "undefined" || deleteCount === -1;
    const startIndex = start < 0 ? start - 1 : start;
    const delCount = delAll ? -1 : Math.max(0, start + deleteCount);
    const delRange = startIndex < 0 && delCount >= 0 ? "" : delCount;
    const rangeSelector = "".concat(selector, "[").concat(startIndex, ":").concat(delRange, "]");
    return this.insert("replace", rangeSelector, items || []);
  }
  /**
   * Adds a revision clause, preventing the document from being patched if the `_rev` property does not match the given value
   *
   * @param rev - Revision to lock the patch to
   */
  ifRevisionId(rev) {
    this.operations.ifRevisionID = rev;
    return this;
  }
  /**
   * Return a plain JSON representation of the patch
   */
  serialize() {
    return {
      ...getSelection(this.selection),
      ...this.operations
    };
  }
  /**
   * Return a plain JSON representation of the patch
   */
  toJSON() {
    return this.serialize();
  }
  /**
   * Clears the patch of all operations
   */
  reset() {
    this.operations = {};
    return this;
  }
  _assign(op, props) {
    let merge = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    validateObject(op, props);
    this.operations = Object.assign({}, this.operations, {
      [op]: Object.assign({}, merge && this.operations[op] || {}, props)
    });
    return this;
  }
  _set(op, props) {
    return this._assign(op, props, false);
  }
}
const _ObservablePatch = class _ObservablePatch extends BasePatch {
  constructor(selection, operations, client) {
    super(selection, operations);
    __privateAdd$6(this, _client$5, void 0);
    __privateSet$6(this, _client$5, client);
  }
  /**
   * Clones the patch
   */
  clone() {
    return new _ObservablePatch(this.selection, {
      ...this.operations
    }, __privateGet$6(this, _client$5));
  }
  commit(options) {
    if (!__privateGet$6(this, _client$5)) {
      throw new Error("No `client` passed to patch, either provide one or pass the patch to a clients `mutate()` method");
    }
    const returnFirst = typeof this.selection === "string";
    const opts = Object.assign({
      returnFirst,
      returnDocuments: true
    }, options);
    return __privateGet$6(this, _client$5).mutate({
      patch: this.serialize()
    }, opts);
  }
};
_client$5 = new WeakMap();
let ObservablePatch = _ObservablePatch;
const _Patch = class _Patch extends BasePatch {
  constructor(selection, operations, client) {
    super(selection, operations);
    __privateAdd$6(this, _client2$5, void 0);
    __privateSet$6(this, _client2$5, client);
  }
  /**
   * Clones the patch
   */
  clone() {
    return new _Patch(this.selection, {
      ...this.operations
    }, __privateGet$6(this, _client2$5));
  }
  commit(options) {
    if (!__privateGet$6(this, _client2$5)) {
      throw new Error("No `client` passed to patch, either provide one or pass the patch to a clients `mutate()` method");
    }
    const returnFirst = typeof this.selection === "string";
    const opts = Object.assign({
      returnFirst,
      returnDocuments: true
    }, options);
    return __privateGet$6(this, _client2$5).mutate({
      patch: this.serialize()
    }, opts);
  }
};
_client2$5 = new WeakMap();
let Patch = _Patch;
var dist_defProp$1 = Object.defineProperty;
var dist_defNormalProp$1 = (obj, key, value) => key in obj ? dist_defProp$1(obj, key, {
  enumerable: true,
  configurable: true,
  writable: true,
  value
}) : obj[key] = value;
var dist_publicField$1 = (obj, key, value) => {
  dist_defNormalProp$1(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var __accessCheck$5 = (obj, member, msg) => {
  if (!member.has(obj)) throw TypeError("Cannot " + msg);
};
var __privateGet$5 = (obj, member, getter) => {
  __accessCheck$5(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd$5 = (obj, member, value) => {
  if (member.has(obj)) throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet$5 = (obj, member, value, setter) => {
  __accessCheck$5(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var _client$4, _client2$4;
const defaultMutateOptions = {
  returnDocuments: false
};
class BaseTransaction {
  constructor() {
    let operations = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    let transactionId = arguments.length > 1 ? arguments[1] : undefined;
    dist_publicField$1(this, "operations");
    dist_publicField$1(this, "trxId");
    this.operations = operations;
    this.trxId = transactionId;
  }
  /**
   * Creates a new Sanity document. If `_id` is provided and already exists, the mutation will fail. If no `_id` is given, one will automatically be generated by the database.
   * The operation is added to the current transaction, ready to be commited by `commit()`
   *
   * @param doc - Document to create. Requires a `_type` property.
   */
  create(doc) {
    validateObject("create", doc);
    return this._add({
      create: doc
    });
  }
  /**
   * Creates a new Sanity document. If a document with the same `_id` already exists, the create operation will be ignored.
   * The operation is added to the current transaction, ready to be commited by `commit()`
   *
   * @param doc - Document to create if it does not already exist. Requires `_id` and `_type` properties.
   */
  createIfNotExists(doc) {
    const op = "createIfNotExists";
    validateObject(op, doc);
    requireDocumentId(op, doc);
    return this._add({
      [op]: doc
    });
  }
  /**
   * Creates a new Sanity document, or replaces an existing one if the same `_id` is already used.
   * The operation is added to the current transaction, ready to be commited by `commit()`
   *
   * @param doc - Document to create or replace. Requires `_id` and `_type` properties.
   */
  createOrReplace(doc) {
    const op = "createOrReplace";
    validateObject(op, doc);
    requireDocumentId(op, doc);
    return this._add({
      [op]: doc
    });
  }
  /**
   * Deletes the document with the given document ID
   * The operation is added to the current transaction, ready to be commited by `commit()`
   *
   * @param documentId - Document ID to delete
   */
  delete(documentId) {
    validateDocumentId("delete", documentId);
    return this._add({
      delete: {
        id: documentId
      }
    });
  }
  transactionId(id) {
    if (!id) {
      return this.trxId;
    }
    this.trxId = id;
    return this;
  }
  /**
   * Return a plain JSON representation of the transaction
   */
  serialize() {
    return [...this.operations];
  }
  /**
   * Return a plain JSON representation of the transaction
   */
  toJSON() {
    return this.serialize();
  }
  /**
   * Clears the transaction of all operations
   */
  reset() {
    this.operations = [];
    return this;
  }
  _add(mut) {
    this.operations.push(mut);
    return this;
  }
}
const _Transaction = class _Transaction extends BaseTransaction {
  constructor(operations, client, transactionId) {
    super(operations, transactionId);
    __privateAdd$5(this, _client$4, void 0);
    __privateSet$5(this, _client$4, client);
  }
  /**
   * Clones the transaction
   */
  clone() {
    return new _Transaction([...this.operations], __privateGet$5(this, _client$4), this.trxId);
  }
  commit(options) {
    if (!__privateGet$5(this, _client$4)) {
      throw new Error("No `client` passed to transaction, either provide one or pass the transaction to a clients `mutate()` method");
    }
    return __privateGet$5(this, _client$4).mutate(this.serialize(), Object.assign({
      transactionId: this.trxId
    }, defaultMutateOptions, options || {}));
  }
  patch(patchOrDocumentId, patchOps) {
    const isBuilder = typeof patchOps === "function";
    const isPatch = typeof patchOrDocumentId !== "string" && patchOrDocumentId instanceof Patch;
    if (isPatch) {
      return this._add({
        patch: patchOrDocumentId.serialize()
      });
    }
    if (isBuilder) {
      const patch = patchOps(new Patch(patchOrDocumentId, {}, __privateGet$5(this, _client$4)));
      if (!(patch instanceof Patch)) {
        throw new Error("function passed to `patch()` must return the patch");
      }
      return this._add({
        patch: patch.serialize()
      });
    }
    return this._add({
      patch: {
        id: patchOrDocumentId,
        ...patchOps
      }
    });
  }
};
_client$4 = new WeakMap();
let Transaction = _Transaction;
const _ObservableTransaction = class _ObservableTransaction extends BaseTransaction {
  constructor(operations, client, transactionId) {
    super(operations, transactionId);
    __privateAdd$5(this, _client2$4, void 0);
    __privateSet$5(this, _client2$4, client);
  }
  /**
   * Clones the transaction
   */
  clone() {
    return new _ObservableTransaction([...this.operations], __privateGet$5(this, _client2$4), this.trxId);
  }
  commit(options) {
    if (!__privateGet$5(this, _client2$4)) {
      throw new Error("No `client` passed to transaction, either provide one or pass the transaction to a clients `mutate()` method");
    }
    return __privateGet$5(this, _client2$4).mutate(this.serialize(), Object.assign({
      transactionId: this.trxId
    }, defaultMutateOptions, options || {}));
  }
  patch(patchOrDocumentId, patchOps) {
    const isBuilder = typeof patchOps === "function";
    const isPatch = typeof patchOrDocumentId !== "string" && patchOrDocumentId instanceof ObservablePatch;
    if (isPatch) {
      return this._add({
        patch: patchOrDocumentId.serialize()
      });
    }
    if (isBuilder) {
      const patch = patchOps(new ObservablePatch(patchOrDocumentId, {}, __privateGet$5(this, _client2$4)));
      if (!(patch instanceof ObservablePatch)) {
        throw new Error("function passed to `patch()` must return the patch");
      }
      return this._add({
        patch: patch.serialize()
      });
    }
    return this._add({
      patch: {
        id: patchOrDocumentId,
        ...patchOps
      }
    });
  }
};
_client2$4 = new WeakMap();
let ObservableTransaction = _ObservableTransaction;
const excludeFalsey = (param, defValue) => {
  const value = typeof param === "undefined" ? defValue : param;
  return param === false ? void 0 : value;
};
const getMutationQuery = function () {
  let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return {
    dryRun: options.dryRun,
    returnIds: true,
    returnDocuments: excludeFalsey(options.returnDocuments, true),
    visibility: options.visibility || "sync",
    autoGenerateArrayKeys: options.autoGenerateArrayKeys,
    skipCrossDatasetReferenceValidation: options.skipCrossDatasetReferenceValidation
  };
};
const isResponse = event => event.type === "response";
const getBody = event => event.body;
const indexBy = (docs, attr) => docs.reduce((indexed, doc) => {
  indexed[attr(doc)] = doc;
  return indexed;
}, /* @__PURE__ */Object.create(null));
const getQuerySizeLimit = 11264;
function _fetch(client, httpRequest, query, params) {
  let options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
  const mapResponse = options.filterResponse === false ? res => res : res => res.result;
  const {
    cache,
    next,
    ...opts
  } = {
    // Opt out of setting a `signal` on an internal `fetch` if one isn't provided.
    // This is necessary in React Server Components to avoid opting out of Request Memoization.
    useAbortSignal: typeof options.signal !== "undefined",
    ...options
  };
  const reqOpts = typeof cache !== "undefined" || typeof next !== "undefined" ? {
    ...opts,
    fetch: {
      cache,
      next
    }
  } : opts;
  return _dataRequest(client, httpRequest, "query", {
    query,
    params
  }, reqOpts).pipe((0,operators.map)(mapResponse));
}
function _getDocument(client, httpRequest, id) {
  let opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  const options = {
    uri: _getDataUrl(client, "doc", id),
    json: true,
    tag: opts.tag
  };
  return _requestObservable(client, httpRequest, options).pipe((0,operators.filter)(isResponse), (0,operators.map)(event => event.body.documents && event.body.documents[0]));
}
function _getDocuments(client, httpRequest, ids) {
  let opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  const options = {
    uri: _getDataUrl(client, "doc", ids.join(",")),
    json: true,
    tag: opts.tag
  };
  return _requestObservable(client, httpRequest, options).pipe((0,operators.filter)(isResponse), (0,operators.map)(event => {
    const indexed = indexBy(event.body.documents || [], doc => doc._id);
    return ids.map(id => indexed[id] || null);
  }));
}
function _createIfNotExists(client, httpRequest, doc, options) {
  requireDocumentId("createIfNotExists", doc);
  return _create(client, httpRequest, doc, "createIfNotExists", options);
}
function _createOrReplace(client, httpRequest, doc, options) {
  requireDocumentId("createOrReplace", doc);
  return _create(client, httpRequest, doc, "createOrReplace", options);
}
function _delete(client, httpRequest, selection, options) {
  return _dataRequest(client, httpRequest, "mutate", {
    mutations: [{
      delete: getSelection(selection)
    }]
  }, options);
}
function _mutate(client, httpRequest, mutations, options) {
  let mut;
  if (mutations instanceof Patch || mutations instanceof ObservablePatch) {
    mut = {
      patch: mutations.serialize()
    };
  } else if (mutations instanceof Transaction || mutations instanceof ObservableTransaction) {
    mut = mutations.serialize();
  } else {
    mut = mutations;
  }
  const muts = Array.isArray(mut) ? mut : [mut];
  const transactionId = options && options.transactionId || void 0;
  return _dataRequest(client, httpRequest, "mutate", {
    mutations: muts,
    transactionId
  }, options);
}
function _dataRequest(client, httpRequest, endpoint, body) {
  let options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
  const isMutation = endpoint === "mutate";
  const isQuery = endpoint === "query";
  const strQuery = isMutation ? "" : encodeQueryString(body);
  const useGet = !isMutation && strQuery.length < getQuerySizeLimit;
  const stringQuery = useGet ? strQuery : "";
  const returnFirst = options.returnFirst;
  const {
    timeout,
    token,
    tag,
    headers
  } = options;
  const uri = _getDataUrl(client, endpoint, stringQuery);
  const reqOptions = {
    method: useGet ? "GET" : "POST",
    uri,
    json: true,
    body: useGet ? void 0 : body,
    query: isMutation && getMutationQuery(options),
    timeout,
    headers,
    token,
    tag,
    perspective: options.perspective,
    resultSourceMap: options.resultSourceMap,
    canUseCdn: isQuery,
    signal: options.signal,
    fetch: options.fetch,
    useAbortSignal: options.useAbortSignal
  };
  return _requestObservable(client, httpRequest, reqOptions).pipe((0,operators.filter)(isResponse), (0,operators.map)(getBody), (0,operators.map)(res => {
    if (!isMutation) {
      return res;
    }
    const results = res.results || [];
    if (options.returnDocuments) {
      return returnFirst ? results[0] && results[0].document : results.map(mut => mut.document);
    }
    const key = returnFirst ? "documentId" : "documentIds";
    const ids = returnFirst ? results[0] && results[0].id : results.map(mut => mut.id);
    return {
      transactionId: res.transactionId,
      results,
      [key]: ids
    };
  }));
}
function _create(client, httpRequest, doc, op) {
  let options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
  const mutation = {
    [op]: doc
  };
  const opts = Object.assign({
    returnFirst: true,
    returnDocuments: true
  }, options);
  return _dataRequest(client, httpRequest, "mutate", {
    mutations: [mutation]
  }, opts);
}
function _requestObservable(client, httpRequest, options) {
  var _a;
  const uri = options.url || options.uri;
  const config = client.config();
  const canUseCdn = typeof options.canUseCdn === "undefined" ? ["GET", "HEAD"].indexOf(options.method || "GET") >= 0 && uri.indexOf("/data/") === 0 : options.canUseCdn;
  let useCdn = config.useCdn && canUseCdn;
  const tag = options.tag && config.requestTagPrefix ? [config.requestTagPrefix, options.tag].join(".") : options.tag || config.requestTagPrefix;
  if (tag) {
    options.query = {
      tag: requestTag(tag),
      ...options.query
    };
  }
  if (["GET", "HEAD", "POST"].indexOf(options.method || "GET") >= 0 && uri.indexOf("/data/query/") === 0) {
    if ((_a = options.resultSourceMap) != null ? _a : config.resultSourceMap) {
      options.query = {
        resultSourceMap: true,
        ...options.query
      };
    }
    const perspective = options.perspective || config.perspective;
    if (typeof perspective === "string" && perspective !== "raw") {
      validateApiPerspective(perspective);
      options.query = {
        perspective,
        ...options.query
      };
      if (perspective === "previewDrafts" && useCdn) {
        useCdn = false;
        printCdnPreviewDraftsWarning();
      }
    }
  }
  const reqOptions = requestOptions(config, Object.assign({}, options, {
    url: _getUrl(client, uri, useCdn)
  }));
  const request = new cjs.Observable(subscriber => httpRequest(reqOptions, config.requester).subscribe(subscriber));
  return options.signal ? request.pipe(_withAbortSignal(options.signal)) : request;
}
function _request(client, httpRequest, options) {
  const observable = _requestObservable(client, httpRequest, options).pipe((0,operators.filter)(event => event.type === "response"), (0,operators.map)(event => event.body));
  return observable;
}
function _getDataUrl(client, operation, path) {
  const config = client.config();
  const catalog = hasDataset(config);
  const baseUri = "/".concat(operation, "/").concat(catalog);
  const uri = path ? "".concat(baseUri, "/").concat(path) : baseUri;
  return "/data".concat(uri).replace(/\/($|\?)/, "$1");
}
function _getUrl(client, uri) {
  let canUseCdn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  const {
    url,
    cdnUrl
  } = client.config();
  const base = canUseCdn ? cdnUrl : url;
  return "".concat(base, "/").concat(uri.replace(/^\//, ""));
}
function _withAbortSignal(signal) {
  return input => {
    return new cjs.Observable(observer => {
      const abort = () => observer.error(_createAbortError(signal));
      if (signal && signal.aborted) {
        abort();
        return;
      }
      const subscription = input.subscribe(observer);
      signal.addEventListener("abort", abort);
      return () => {
        signal.removeEventListener("abort", abort);
        subscription.unsubscribe();
      };
    });
  };
}
const isDomExceptionSupported = Boolean(globalThis.DOMException);
function _createAbortError(signal) {
  var _a, _b;
  if (isDomExceptionSupported) {
    return new DOMException((_a = signal == null ? void 0 : signal.reason) != null ? _a : "The operation was aborted.", "AbortError");
  }
  const error = new Error((_b = signal == null ? void 0 : signal.reason) != null ? _b : "The operation was aborted.");
  error.name = "AbortError";
  return error;
}
var __accessCheck$4 = (obj, member, msg) => {
  if (!member.has(obj)) throw TypeError("Cannot " + msg);
};
var __privateGet$4 = (obj, member, getter) => {
  __accessCheck$4(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd$4 = (obj, member, value) => {
  if (member.has(obj)) throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet$4 = (obj, member, value, setter) => {
  __accessCheck$4(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var _client$3, _httpRequest$4, _client2$3, _httpRequest2$4;
class ObservableAssetsClient {
  constructor(client, httpRequest) {
    __privateAdd$4(this, _client$3, void 0);
    __privateAdd$4(this, _httpRequest$4, void 0);
    __privateSet$4(this, _client$3, client);
    __privateSet$4(this, _httpRequest$4, httpRequest);
  }
  upload(assetType, body, options) {
    return _upload(__privateGet$4(this, _client$3), __privateGet$4(this, _httpRequest$4), assetType, body, options);
  }
}
_client$3 = new WeakMap();
_httpRequest$4 = new WeakMap();
class AssetsClient {
  constructor(client, httpRequest) {
    __privateAdd$4(this, _client2$3, void 0);
    __privateAdd$4(this, _httpRequest2$4, void 0);
    __privateSet$4(this, _client2$3, client);
    __privateSet$4(this, _httpRequest2$4, httpRequest);
  }
  upload(assetType, body, options) {
    const observable = _upload(__privateGet$4(this, _client2$3), __privateGet$4(this, _httpRequest2$4), assetType, body, options);
    return (0,cjs.lastValueFrom)(observable.pipe((0,operators.filter)(event => event.type === "response"), (0,operators.map)(event => event.body.document)));
  }
}
_client2$3 = new WeakMap();
_httpRequest2$4 = new WeakMap();
function _upload(client, httpRequest, assetType, body) {
  let opts = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
  validateAssetType(assetType);
  let meta = opts.extract || void 0;
  if (meta && !meta.length) {
    meta = ["none"];
  }
  const dataset = hasDataset(client.config());
  const assetEndpoint = assetType === "image" ? "images" : "files";
  const options = optionsFromFile(opts, body);
  const {
    tag,
    label,
    title,
    description,
    creditLine,
    filename,
    source
  } = options;
  const query = {
    label,
    title,
    description,
    filename,
    meta,
    creditLine
  };
  if (source) {
    query.sourceId = source.id;
    query.sourceName = source.name;
    query.sourceUrl = source.url;
  }
  return _requestObservable(client, httpRequest, {
    tag,
    method: "POST",
    timeout: options.timeout || 0,
    uri: "/assets/".concat(assetEndpoint, "/").concat(dataset),
    headers: options.contentType ? {
      "Content-Type": options.contentType
    } : {},
    query,
    body
  });
}
function optionsFromFile(opts, file) {
  if (typeof File === "undefined" || !(file instanceof File)) {
    return opts;
  }
  return Object.assign({
    filename: opts.preserveFilename === false ? void 0 : file.name,
    contentType: file.type
  }, opts);
}
var defaults = (obj, defaults) => Object.keys(defaults).concat(Object.keys(obj)).reduce((target, prop) => {
  target[prop] = typeof obj[prop] === "undefined" ? defaults[prop] : obj[prop];
  return target;
}, {});
const pick = (obj, props) => props.reduce((selection, prop) => {
  if (typeof obj[prop] === "undefined") {
    return selection;
  }
  selection[prop] = obj[prop];
  return selection;
}, {});
const MAX_URL_LENGTH = 16e3 - 1200;
const possibleOptions = ["includePreviousRevision", "includeResult", "visibility", "effectFormat", "tag"];
const dist_defaultOptions = {
  includeResult: true
};
function _listen(query, params) {
  let opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  const {
    url,
    token,
    withCredentials,
    requestTagPrefix
  } = this.config();
  const tag = opts.tag && requestTagPrefix ? [requestTagPrefix, opts.tag].join(".") : opts.tag;
  const options = {
    ...defaults(opts, dist_defaultOptions),
    tag
  };
  const listenOpts = pick(options, possibleOptions);
  const qs = encodeQueryString({
    query,
    params,
    options: {
      tag,
      ...listenOpts
    }
  });
  const uri = "".concat(url).concat(_getDataUrl(this, "listen", qs));
  if (uri.length > MAX_URL_LENGTH) {
    return new cjs.Observable(observer => observer.error(new Error("Query too large for listener")));
  }
  const listenFor = options.events ? options.events : ["mutation"];
  const shouldEmitReconnect = listenFor.indexOf("reconnect") !== -1;
  const esOptions = {};
  if (token || withCredentials) {
    esOptions.withCredentials = true;
  }
  if (token) {
    esOptions.headers = {
      Authorization: "Bearer ".concat(token)
    };
  }
  return new cjs.Observable(observer => {
    let es;
    getEventSource().then(eventSource => {
      es = eventSource;
    }).catch(reason => {
      observer.error(reason);
      stop();
    });
    let reconnectTimer;
    let stopped = false;
    function onError() {
      if (stopped) {
        return;
      }
      emitReconnect();
      if (stopped) {
        return;
      }
      if (es.readyState === es.CLOSED) {
        unsubscribe();
        clearTimeout(reconnectTimer);
        reconnectTimer = setTimeout(open, 100);
      }
    }
    function onChannelError(err) {
      observer.error(cooerceError(err));
    }
    function onMessage(evt) {
      const event = parseEvent(evt);
      return event instanceof Error ? observer.error(event) : observer.next(event);
    }
    function onDisconnect() {
      stopped = true;
      unsubscribe();
      observer.complete();
    }
    function unsubscribe() {
      if (!es) return;
      es.removeEventListener("error", onError);
      es.removeEventListener("channelError", onChannelError);
      es.removeEventListener("disconnect", onDisconnect);
      listenFor.forEach(type => es.removeEventListener(type, onMessage));
      es.close();
    }
    function emitReconnect() {
      if (shouldEmitReconnect) {
        observer.next({
          type: "reconnect"
        });
      }
    }
    async function getEventSource() {
      const {
        default: EventSource
      } = await __webpack_require__.e(/* import() */ 856).then(__webpack_require__.t.bind(__webpack_require__, 23856, 19));
      const evs = new EventSource(uri, esOptions);
      evs.addEventListener("error", onError);
      evs.addEventListener("channelError", onChannelError);
      evs.addEventListener("disconnect", onDisconnect);
      listenFor.forEach(type => evs.addEventListener(type, onMessage));
      return evs;
    }
    function open() {
      getEventSource().then(eventSource => {
        es = eventSource;
      }).catch(reason => {
        observer.error(reason);
        stop();
      });
    }
    function stop() {
      stopped = true;
      unsubscribe();
    }
    return stop;
  });
}
function parseEvent(event) {
  try {
    const data = event.data && JSON.parse(event.data) || {};
    return Object.assign({
      type: event.type
    }, data);
  } catch (err) {
    return err;
  }
}
function cooerceError(err) {
  if (err instanceof Error) {
    return err;
  }
  const evt = parseEvent(err);
  return evt instanceof Error ? evt : new Error(extractErrorMessage(evt));
}
function extractErrorMessage(err) {
  if (!err.error) {
    return err.message || "Unknown listener error";
  }
  if (err.error.description) {
    return err.error.description;
  }
  return typeof err.error === "string" ? err.error : JSON.stringify(err.error, null, 2);
}
var __accessCheck$3 = (obj, member, msg) => {
  if (!member.has(obj)) throw TypeError("Cannot " + msg);
};
var __privateGet$3 = (obj, member, getter) => {
  __accessCheck$3(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd$3 = (obj, member, value) => {
  if (member.has(obj)) throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet$3 = (obj, member, value, setter) => {
  __accessCheck$3(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var _client$2, _httpRequest$3, _client2$2, _httpRequest2$3;
class ObservableDatasetsClient {
  constructor(client, httpRequest) {
    __privateAdd$3(this, _client$2, void 0);
    __privateAdd$3(this, _httpRequest$3, void 0);
    __privateSet$3(this, _client$2, client);
    __privateSet$3(this, _httpRequest$3, httpRequest);
  }
  /**
   * Create a new dataset with the given name
   *
   * @param name - Name of the dataset to create
   * @param options - Options for the dataset
   */
  create(name, options) {
    return _modify(__privateGet$3(this, _client$2), __privateGet$3(this, _httpRequest$3), "PUT", name, options);
  }
  /**
   * Edit a dataset with the given name
   *
   * @param name - Name of the dataset to edit
   * @param options - New options for the dataset
   */
  edit(name, options) {
    return _modify(__privateGet$3(this, _client$2), __privateGet$3(this, _httpRequest$3), "PATCH", name, options);
  }
  /**
   * Delete a dataset with the given name
   *
   * @param name - Name of the dataset to delete
   */
  delete(name) {
    return _modify(__privateGet$3(this, _client$2), __privateGet$3(this, _httpRequest$3), "DELETE", name);
  }
  /**
   * Fetch a list of datasets for the configured project
   */
  list() {
    return _request(__privateGet$3(this, _client$2), __privateGet$3(this, _httpRequest$3), {
      uri: "/datasets"
    });
  }
}
_client$2 = new WeakMap();
_httpRequest$3 = new WeakMap();
class DatasetsClient {
  constructor(client, httpRequest) {
    __privateAdd$3(this, _client2$2, void 0);
    __privateAdd$3(this, _httpRequest2$3, void 0);
    __privateSet$3(this, _client2$2, client);
    __privateSet$3(this, _httpRequest2$3, httpRequest);
  }
  /**
   * Create a new dataset with the given name
   *
   * @param name - Name of the dataset to create
   * @param options - Options for the dataset
   */
  create(name, options) {
    return (0,cjs.lastValueFrom)(_modify(__privateGet$3(this, _client2$2), __privateGet$3(this, _httpRequest2$3), "PUT", name, options));
  }
  /**
   * Edit a dataset with the given name
   *
   * @param name - Name of the dataset to edit
   * @param options - New options for the dataset
   */
  edit(name, options) {
    return (0,cjs.lastValueFrom)(_modify(__privateGet$3(this, _client2$2), __privateGet$3(this, _httpRequest2$3), "PATCH", name, options));
  }
  /**
   * Delete a dataset with the given name
   *
   * @param name - Name of the dataset to delete
   */
  delete(name) {
    return (0,cjs.lastValueFrom)(_modify(__privateGet$3(this, _client2$2), __privateGet$3(this, _httpRequest2$3), "DELETE", name));
  }
  /**
   * Fetch a list of datasets for the configured project
   */
  list() {
    return (0,cjs.lastValueFrom)(_request(__privateGet$3(this, _client2$2), __privateGet$3(this, _httpRequest2$3), {
      uri: "/datasets"
    }));
  }
}
_client2$2 = new WeakMap();
_httpRequest2$3 = new WeakMap();
function _modify(client, httpRequest, method, name, options) {
  dataset(name);
  return _request(client, httpRequest, {
    method,
    uri: "/datasets/".concat(name),
    body: options
  });
}
var __accessCheck$2 = (obj, member, msg) => {
  if (!member.has(obj)) throw TypeError("Cannot " + msg);
};
var __privateGet$2 = (obj, member, getter) => {
  __accessCheck$2(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd$2 = (obj, member, value) => {
  if (member.has(obj)) throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet$2 = (obj, member, value, setter) => {
  __accessCheck$2(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var _client$1, _httpRequest$2, _client2$1, _httpRequest2$2;
class ObservableProjectsClient {
  constructor(client, httpRequest) {
    __privateAdd$2(this, _client$1, void 0);
    __privateAdd$2(this, _httpRequest$2, void 0);
    __privateSet$2(this, _client$1, client);
    __privateSet$2(this, _httpRequest$2, httpRequest);
  }
  list(options) {
    const uri = (options == null ? void 0 : options.includeMembers) === false ? "/projects?includeMembers=false" : "/projects";
    return _request(__privateGet$2(this, _client$1), __privateGet$2(this, _httpRequest$2), {
      uri
    });
  }
  /**
   * Fetch a project by project ID
   *
   * @param projectId - ID of the project to fetch
   */
  getById(projectId) {
    return _request(__privateGet$2(this, _client$1), __privateGet$2(this, _httpRequest$2), {
      uri: "/projects/".concat(projectId)
    });
  }
}
_client$1 = new WeakMap();
_httpRequest$2 = new WeakMap();
class ProjectsClient {
  constructor(client, httpRequest) {
    __privateAdd$2(this, _client2$1, void 0);
    __privateAdd$2(this, _httpRequest2$2, void 0);
    __privateSet$2(this, _client2$1, client);
    __privateSet$2(this, _httpRequest2$2, httpRequest);
  }
  list(options) {
    const uri = (options == null ? void 0 : options.includeMembers) === false ? "/projects?includeMembers=false" : "/projects";
    return (0,cjs.lastValueFrom)(_request(__privateGet$2(this, _client2$1), __privateGet$2(this, _httpRequest2$2), {
      uri
    }));
  }
  /**
   * Fetch a project by project ID
   *
   * @param projectId - ID of the project to fetch
   */
  getById(projectId) {
    return (0,cjs.lastValueFrom)(_request(__privateGet$2(this, _client2$1), __privateGet$2(this, _httpRequest2$2), {
      uri: "/projects/".concat(projectId)
    }));
  }
}
_client2$1 = new WeakMap();
_httpRequest2$2 = new WeakMap();
var __accessCheck$1 = (obj, member, msg) => {
  if (!member.has(obj)) throw TypeError("Cannot " + msg);
};
var __privateGet$1 = (obj, member, getter) => {
  __accessCheck$1(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd$1 = (obj, member, value) => {
  if (member.has(obj)) throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet$1 = (obj, member, value, setter) => {
  __accessCheck$1(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var _client, _httpRequest$1, _client2, _httpRequest2$1;
class ObservableUsersClient {
  constructor(client, httpRequest) {
    __privateAdd$1(this, _client, void 0);
    __privateAdd$1(this, _httpRequest$1, void 0);
    __privateSet$1(this, _client, client);
    __privateSet$1(this, _httpRequest$1, httpRequest);
  }
  /**
   * Fetch a user by user ID
   *
   * @param id - User ID of the user to fetch. If `me` is provided, a minimal response including the users role is returned.
   */
  getById(id) {
    return _request(__privateGet$1(this, _client), __privateGet$1(this, _httpRequest$1), {
      uri: "/users/".concat(id)
    });
  }
}
_client = new WeakMap();
_httpRequest$1 = new WeakMap();
class UsersClient {
  constructor(client, httpRequest) {
    __privateAdd$1(this, _client2, void 0);
    __privateAdd$1(this, _httpRequest2$1, void 0);
    __privateSet$1(this, _client2, client);
    __privateSet$1(this, _httpRequest2$1, httpRequest);
  }
  /**
   * Fetch a user by user ID
   *
   * @param id - User ID of the user to fetch. If `me` is provided, a minimal response including the users role is returned.
   */
  getById(id) {
    return (0,cjs.lastValueFrom)(_request(__privateGet$1(this, _client2), __privateGet$1(this, _httpRequest2$1), {
      uri: "/users/".concat(id)
    }));
  }
}
_client2 = new WeakMap();
_httpRequest2$1 = new WeakMap();
var dist_defProp = Object.defineProperty;
var dist_defNormalProp = (obj, key, value) => key in obj ? dist_defProp(obj, key, {
  enumerable: true,
  configurable: true,
  writable: true,
  value
}) : obj[key] = value;
var dist_publicField = (obj, key, value) => {
  dist_defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj)) throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj)) throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var _clientConfig, _httpRequest, _clientConfig2, _httpRequest2;
const _ObservableSanityClient = class _ObservableSanityClient {
  constructor(httpRequest) {
    let config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultConfig;
    dist_publicField(this, "assets");
    dist_publicField(this, "datasets");
    dist_publicField(this, "projects");
    dist_publicField(this, "users");
    /**
     * Private properties
     */
    __privateAdd(this, _clientConfig, void 0);
    __privateAdd(this, _httpRequest, void 0);
    /**
     * Instance properties
     */
    dist_publicField(this, "listen", _listen);
    this.config(config);
    __privateSet(this, _httpRequest, httpRequest);
    this.assets = new ObservableAssetsClient(this, __privateGet(this, _httpRequest));
    this.datasets = new ObservableDatasetsClient(this, __privateGet(this, _httpRequest));
    this.projects = new ObservableProjectsClient(this, __privateGet(this, _httpRequest));
    this.users = new ObservableUsersClient(this, __privateGet(this, _httpRequest));
  }
  /**
   * Clone the client - returns a new instance
   */
  clone() {
    return new _ObservableSanityClient(__privateGet(this, _httpRequest), this.config());
  }
  config(newConfig) {
    if (newConfig === void 0) {
      return {
        ...__privateGet(this, _clientConfig)
      };
    }
    if (__privateGet(this, _clientConfig) && __privateGet(this, _clientConfig).allowReconfigure === false) {
      throw new Error("Existing client instance cannot be reconfigured - use `withConfig(newConfig)` to return a new client");
    }
    __privateSet(this, _clientConfig, initConfig(newConfig, __privateGet(this, _clientConfig) || {}));
    return this;
  }
  /**
   * Clone the client with a new (partial) configuration.
   *
   * @param newConfig - New client configuration properties, shallowly merged with existing configuration
   */
  withConfig(newConfig) {
    return new _ObservableSanityClient(__privateGet(this, _httpRequest), {
      ...this.config(),
      ...newConfig
    });
  }
  fetch(query, params) {
    let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    return _fetch(this, __privateGet(this, _httpRequest), query, params, options);
  }
  /**
   * Fetch a single document with the given ID.
   *
   * @param id - Document ID to fetch
   * @param options - Request options
   */
  getDocument(id, options) {
    return _getDocument(this, __privateGet(this, _httpRequest), id, options);
  }
  /**
   * Fetch multiple documents in one request.
   * Should be used sparingly - performing a query is usually a better option.
   * The order/position of documents is preserved based on the original array of IDs.
   * If any of the documents are missing, they will be replaced by a `null` entry in the returned array
   *
   * @param ids - Document IDs to fetch
   * @param options - Request options
   */
  getDocuments(ids, options) {
    return _getDocuments(this, __privateGet(this, _httpRequest), ids, options);
  }
  create(document, options) {
    return _create(this, __privateGet(this, _httpRequest), document, "create", options);
  }
  createIfNotExists(document, options) {
    return _createIfNotExists(this, __privateGet(this, _httpRequest), document, options);
  }
  createOrReplace(document, options) {
    return _createOrReplace(this, __privateGet(this, _httpRequest), document, options);
  }
  delete(selection, options) {
    return _delete(this, __privateGet(this, _httpRequest), selection, options);
  }
  mutate(operations, options) {
    return _mutate(this, __privateGet(this, _httpRequest), operations, options);
  }
  /**
   * Create a new buildable patch of operations to perform
   *
   * @param documentId - Document ID(s) to patch
   * @param operations - Optional object of patch operations to initialize the patch instance with
   */
  patch(documentId, operations) {
    return new ObservablePatch(documentId, operations, this);
  }
  /**
   * Create a new transaction of mutations
   *
   * @param operations - Optional array of mutation operations to initialize the transaction instance with
   */
  transaction(operations) {
    return new ObservableTransaction(operations, this);
  }
  /**
   * DEPRECATED: Perform an HTTP request against the Sanity API
   *
   * @deprecated Use your own request library!
   * @param options - Request options
   */
  request(options) {
    return _request(this, __privateGet(this, _httpRequest), options);
  }
  /**
   * Get a Sanity API URL for the URI provided
   *
   * @param uri - URI/path to build URL for
   * @param canUseCdn - Whether or not to allow using the API CDN for this route
   */
  getUrl(uri, canUseCdn) {
    return _getUrl(this, uri, canUseCdn);
  }
  /**
   * Get a Sanity API URL for the data operation and path provided
   *
   * @param operation - Data operation (eg `query`, `mutate`, `listen` or similar)
   * @param path - Path to append after the operation
   */
  getDataUrl(operation, path) {
    return _getDataUrl(this, operation, path);
  }
};
_clientConfig = new WeakMap();
_httpRequest = new WeakMap();
let ObservableSanityClient = _ObservableSanityClient;
const _SanityClient = class _SanityClient {
  constructor(httpRequest) {
    let config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultConfig;
    dist_publicField(this, "assets");
    dist_publicField(this, "datasets");
    dist_publicField(this, "projects");
    dist_publicField(this, "users");
    /**
     * Observable version of the Sanity client, with the same configuration as the promise-based one
     */
    dist_publicField(this, "observable");
    /**
     * Private properties
     */
    __privateAdd(this, _clientConfig2, void 0);
    __privateAdd(this, _httpRequest2, void 0);
    /**
     * Instance properties
     */
    dist_publicField(this, "listen", _listen);
    this.config(config);
    __privateSet(this, _httpRequest2, httpRequest);
    this.assets = new AssetsClient(this, __privateGet(this, _httpRequest2));
    this.datasets = new DatasetsClient(this, __privateGet(this, _httpRequest2));
    this.projects = new ProjectsClient(this, __privateGet(this, _httpRequest2));
    this.users = new UsersClient(this, __privateGet(this, _httpRequest2));
    this.observable = new ObservableSanityClient(httpRequest, config);
  }
  /**
   * Clone the client - returns a new instance
   */
  clone() {
    return new _SanityClient(__privateGet(this, _httpRequest2), this.config());
  }
  config(newConfig) {
    if (newConfig === void 0) {
      return {
        ...__privateGet(this, _clientConfig2)
      };
    }
    if (__privateGet(this, _clientConfig2) && __privateGet(this, _clientConfig2).allowReconfigure === false) {
      throw new Error("Existing client instance cannot be reconfigured - use `withConfig(newConfig)` to return a new client");
    }
    if (this.observable) {
      this.observable.config(newConfig);
    }
    __privateSet(this, _clientConfig2, initConfig(newConfig, __privateGet(this, _clientConfig2) || {}));
    return this;
  }
  /**
   * Clone the client with a new (partial) configuration.
   *
   * @param newConfig - New client configuration properties, shallowly merged with existing configuration
   */
  withConfig(newConfig) {
    return new _SanityClient(__privateGet(this, _httpRequest2), {
      ...this.config(),
      ...newConfig
    });
  }
  fetch(query, params) {
    let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    return (0,cjs.lastValueFrom)(_fetch(this, __privateGet(this, _httpRequest2), query, params, options));
  }
  /**
   * Fetch a single document with the given ID.
   *
   * @param id - Document ID to fetch
   * @param options - Request options
   */
  getDocument(id, options) {
    return (0,cjs.lastValueFrom)(_getDocument(this, __privateGet(this, _httpRequest2), id, options));
  }
  /**
   * Fetch multiple documents in one request.
   * Should be used sparingly - performing a query is usually a better option.
   * The order/position of documents is preserved based on the original array of IDs.
   * If any of the documents are missing, they will be replaced by a `null` entry in the returned array
   *
   * @param ids - Document IDs to fetch
   * @param options - Request options
   */
  getDocuments(ids, options) {
    return (0,cjs.lastValueFrom)(_getDocuments(this, __privateGet(this, _httpRequest2), ids, options));
  }
  create(document, options) {
    return (0,cjs.lastValueFrom)(_create(this, __privateGet(this, _httpRequest2), document, "create", options));
  }
  createIfNotExists(document, options) {
    return (0,cjs.lastValueFrom)(_createIfNotExists(this, __privateGet(this, _httpRequest2), document, options));
  }
  createOrReplace(document, options) {
    return (0,cjs.lastValueFrom)(_createOrReplace(this, __privateGet(this, _httpRequest2), document, options));
  }
  delete(selection, options) {
    return (0,cjs.lastValueFrom)(_delete(this, __privateGet(this, _httpRequest2), selection, options));
  }
  mutate(operations, options) {
    return (0,cjs.lastValueFrom)(_mutate(this, __privateGet(this, _httpRequest2), operations, options));
  }
  /**
   * Create a new buildable patch of operations to perform
   *
   * @param documentId - Document ID(s)to patch
   * @param operations - Optional object of patch operations to initialize the patch instance with
   */
  patch(documentId, operations) {
    return new Patch(documentId, operations, this);
  }
  /**
   * Create a new transaction of mutations
   *
   * @param operations - Optional array of mutation operations to initialize the transaction instance with
   */
  transaction(operations) {
    return new Transaction(operations, this);
  }
  /**
   * Perform a request against the Sanity API
   * NOTE: Only use this for Sanity API endpoints, not for your own APIs!
   *
   * @param options - Request options
   * @returns Promise resolving to the response body
   */
  request(options) {
    return (0,cjs.lastValueFrom)(_request(this, __privateGet(this, _httpRequest2), options));
  }
  /**
   * Perform an HTTP request a `/data` sub-endpoint
   * NOTE: Considered internal, thus marked as deprecated. Use `request` instead.
   *
   * @deprecated - Use `request()` or your own HTTP library instead
   * @param endpoint - Endpoint to hit (mutate, query etc)
   * @param body - Request body
   * @param options - Request options
   * @internal
   */
  dataRequest(endpoint, body, options) {
    return (0,cjs.lastValueFrom)(_dataRequest(this, __privateGet(this, _httpRequest2), endpoint, body, options));
  }
  /**
   * Get a Sanity API URL for the URI provided
   *
   * @param uri - URI/path to build URL for
   * @param canUseCdn - Whether or not to allow using the API CDN for this route
   */
  getUrl(uri, canUseCdn) {
    return _getUrl(this, uri, canUseCdn);
  }
  /**
   * Get a Sanity API URL for the data operation and path provided
   *
   * @param operation - Data operation (eg `query`, `mutate`, `listen` or similar)
   * @param path - Path to append after the operation
   */
  getDataUrl(operation, path) {
    return _getDataUrl(this, operation, path);
  }
};
_clientConfig2 = new WeakMap();
_httpRequest2 = new WeakMap();
let SanityClient = _SanityClient;
const httpRequest = defineHttpRequest(middleware, {});
const requester = httpRequest.defaultRequester;
const createClient = config => new SanityClient(defineHttpRequest(middleware, {
  maxRetries: config.maxRetries,
  retryDelay: config.retryDelay
}), config);
function deprecatedCreateClient(config) {
  printNoDefaultExport();
  return new SanityClient(httpRequest, config);
}

//# sourceMappingURL=index.js.map

// EXTERNAL MODULE: ./node_modules/lodash.isplainobject/index.js
var lodash_isplainobject = __webpack_require__(78348);
// EXTERNAL MODULE: ./node_modules/@vercel/stega/dist/index.js
var dist = __webpack_require__(58235);
;// CONCATENATED MODULE: ./node_modules/@sanity/preview-kit/dist/csm/jsonpath.js
const ESCAPE = {
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "'": "\\'",
  "\\": "\\\\"
};
const UNESCAPE = {
  "\\f": "\f",
  "\\n": "\n",
  "\\r": "\r",
  "\\t": "	",
  "\\'": "'",
  "\\\\": "\\"
};
function normalisedJsonPath(path) {
  return "$".concat(path.map(key => {
    if (typeof key === "string") {
      const escapedKey = key.replace(/[\f\n\r\t'\\]/g, match => {
        return ESCAPE[match];
      });
      return "['".concat(escapedKey, "']");
    }
    return "[".concat(key, "]");
  }).join(""));
}
function parseNormalisedJsonPath(path) {
  const parsed = [];
  const parseRe = /\['(.*?)'\]|\[(\d+)\]/g;
  let match;
  while ((match = parseRe.exec(path)) !== null) {
    if (match[1] !== void 0) {
      const key = match[1].replace(/\\(\\|f|n|r|t|')/g, m => {
        return UNESCAPE[m];
      });
      parsed.push(key);
      continue;
    }
    if (match[2] !== void 0) {
      parsed.push(parseInt(match[2], 10));
      continue;
    }
  }
  return parsed;
}

//# sourceMappingURL=jsonpath.js.map

;// CONCATENATED MODULE: ./node_modules/@sanity/preview-kit/dist/csm/editIntent.js

function defineEditLink(_studioUrl) {
  const studioUrl = _studioUrl.replace(/\/$/, "");
  return (sourceDocument, path) => "".concat(studioUrl, "/intent/edit/id=").concat(sourceDocument._id, ";path=").concat(encodeJsonPathToUriComponent(path));
}
function encodeJsonPathToUriComponent(path) {
  const sourcePath = Array.isArray(path) ? path : parseNormalisedJsonPath(path);
  return encodeURIComponent(sourcePath.map((key, i) =>
  // eslint-disable-next-line no-nested-ternary
  typeof key === "number" ? "[".concat(key, "]") : i > 0 ? ".".concat(key) : key).join(""));
}

//# sourceMappingURL=editIntent.js.map

;// CONCATENATED MODULE: ./node_modules/@sanity/preview-kit/dist/csm/sourcemap.js

function isRecord(value) {
  return typeof value === "object" && value !== null;
}
function isArray(value) {
  return value !== null && Array.isArray(value);
}
function sourcemap_encode(result, csm, encoder) {
  return encodeIntoResult(result, csm, encoder);
}
function encodeIntoResult(result, csm, encoder) {
  return walkMap(result, (value, path) => {
    if (typeof value !== "string") {
      return value;
    }
    const resolveMappingResult = resolveMapping(path, csm);
    if (!resolveMappingResult) {
      return value;
    }
    const [mapping,, pathSuffix] = resolveMappingResult;
    if (mapping.type !== "value") {
      return value;
    }
    if (mapping.source.type !== "documentValue") {
      return value;
    }
    const sourceDocument =
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    csm.documents[mapping.source.document];
    const sourcePath = csm.paths[mapping.source.path];
    return encoder(value, sourceDocument, parseNormalisedJsonPath(sourcePath + pathSuffix));
  });
}
function walkMap(value, mappingFn) {
  let path = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  if (isArray(value)) {
    return value.map((v, idx) => walkMap(v, mappingFn, path.concat(idx)));
  }
  if (isRecord(value)) {
    return Object.fromEntries(Object.entries(value).map(_ref => {
      let [k, v] = _ref;
      return [k, walkMap(v, mappingFn, path.concat(k))];
    }));
  }
  return mappingFn(value, path);
}
function resolveMapping(resultPath, csm, logger) {
  var _a;
  const resultJsonPath = normalisedJsonPath(resultPath);
  if (!csm.mappings) {
    (_a = logger == null ? void 0 : logger.error) == null ? void 0 : _a.call(logger, "Missing mappings", {
      resultSourceMap: csm
    });
    return void 0;
  }
  if (csm.mappings[resultJsonPath] !== void 0) {
    return [csm.mappings[resultJsonPath], resultJsonPath, ""];
  }
  const mappings = Object.entries(csm.mappings).filter(_ref2 => {
    let [key] = _ref2;
    return resultJsonPath.startsWith(key);
  }).sort((_ref3, _ref4) => {
    let [key1] = _ref3;
    let [key2] = _ref4;
    return key2.length - key1.length;
  });
  if (mappings.length == 0) {
    return void 0;
  }
  const [matchedPath, mapping] = mappings[0];
  const pathSuffix = resultJsonPath.substring(matchedPath.length);
  return [mapping, matchedPath, pathSuffix];
}

//# sourceMappingURL=sourcemap.js.map

;// CONCATENATED MODULE: ./node_modules/@sanity/preview-kit/dist/csm/transcode.js



const filterDefault = _ref => {
  let {
    path
  } = _ref;
  const endPath = path.at(-1);
  if (path.at(-2) === "slug" && endPath === "current") {
    return false;
  }
  if (typeof endPath === "string" && endPath.startsWith("_")) {
    return false;
  }
  if (typeof endPath === "number" && path.at(-2) === "marks" && typeof path.at(-3) === "number" && path.at(-4) === "children" && typeof path.at(-5) === "number") {
    return false;
  }
  if (endPath === "href" && typeof path.at(-2) === "number" && path.at(-3) === "markDefs" && typeof path.at(-4) === "number") {
    return false;
  }
  if (typeof endPath === "string" && typeof path.at(-2) === "number") {
    if (endPath === "style" || endPath === "listItem") {
      return false;
    }
  }
  return true;
};
const TRUNCATE_LENGTH = 20;
function createTranscoder(config) {
  const {
    studioUrl,
    encodeSourceMapAtPath,
    logger
  } = config;
  const createEditLink = defineEditLink(studioUrl);
  const report = {
    encoded: [],
    skipped: []
  };
  const transcode = (input, sourceDocument, sourcePath) => {
    if ((typeof encodeSourceMapAtPath === "function" ? encodeSourceMapAtPath({
      path: sourcePath,
      filterDefault
    }) : filterDefault({
      path: sourcePath,
      filterDefault
    })) === false) {
      if (logger) {
        report.skipped.push({
          path: prettyPathForLogging(sourcePath),
          value: "".concat(input.slice(0, TRUNCATE_LENGTH)).concat(input.length > TRUNCATE_LENGTH ? "..." : ""),
          length: input.length
        });
      }
      return input;
    }
    if (logger) {
      report.encoded.push({
        path: prettyPathForLogging(sourcePath),
        value: "".concat(input.slice(0, TRUNCATE_LENGTH)).concat(input.length > TRUNCATE_LENGTH ? "..." : ""),
        length: input.length
      });
    }
    return (0,dist/* vercelStegaCombine */.n8)(input, {
      origin: "sanity.io",
      href: createEditLink(sourceDocument, sourcePath)
    }, "auto");
  };
  return (result, csm) => {
    report.encoded.length = 0;
    report.skipped.length = 0;
    return {
      result: sourcemap_encode(result, csm, (value, sourceDocument, path) => transcode(value, sourceDocument, path)),
      report
    };
  };
}
function prettyPathForLogging(path) {
  return path.map((segment, index) => typeof segment === "number" ? "[".concat(segment, "]") : index > 0 ? ".".concat(segment) : segment).join("");
}

//# sourceMappingURL=transcode.js.map

;// CONCATENATED MODULE: ./node_modules/@sanity/preview-kit/dist/client/request.js



function transcodeResponse(_ref) {
  let {
    studioUrl,
    encodeSourceMapAtPath,
    logger
  } = _ref;
  const transcoder = createTranscoder({
    studioUrl,
    encodeSourceMapAtPath,
    logger
  });
  return {
    onResponse: response => {
      var _a, _b, _c, _d, _e, _f, _g;
      if (!isBodyResponse(response)) {
        return response;
      }
      if (Array.isArray(response.body) || typeof response.body === "string" || lodash_isplainobject(response.body)) {
        if (!isContentSourceMapBody(response.body)) {
          if (logger && isResultBody(response.body)) {
            (_a = logger == null ? void 0 : logger.error) == null ? void 0 : _a.call(logger, "[@sanity/preview-kit]: Missing Content Source Map from response body", response.body);
          }
          return response;
        }
        const transcoderResult = transcoder(response.body.result, response.body.resultSourceMap);
        if (logger) {
          const isSkipping = transcoderResult.report.skipped.length;
          const isEncoding = transcoderResult.report.encoded.length;
          if (isSkipping || isEncoding) {
            (_b = (logger == null ? void 0 : logger.groupCollapsed) || logger.log) == null ? void 0 : _b("[@sanity/preview-kit]: Stega encoding source map into result");
            (_c = logger.log) == null ? void 0 : _c.call(logger, "[@sanity/preview-kit]: Paths encoded: ".concat(transcoderResult.report.encoded.length, ", skipped: ").concat(transcoderResult.report.skipped.length));
          }
          if (transcoderResult.report.encoded.length > 0) {
            (_d = logger == null ? void 0 : logger.log) == null ? void 0 : _d.call(logger, "[@sanity/preview-kit]: Table of encoded paths");
            (_e = (logger == null ? void 0 : logger.table) || logger.log) == null ? void 0 : _e(transcoderResult.report.encoded);
          }
          if (transcoderResult.report.skipped.length > 0) {
            const skipped = /* @__PURE__ */new Set();
            for (const {
              path
            } of transcoderResult.report.skipped) {
              skipped.add(path.replace(/\[\d+\]/g, "[]"));
            }
            (_f = logger == null ? void 0 : logger.log) == null ? void 0 : _f.call(logger, "[@sanity/preview-kit]: List of skipped paths", [...skipped.values()]);
          }
          if (isSkipping || isEncoding) {
            (_g = logger == null ? void 0 : logger.groupEnd) == null ? void 0 : _g.call(logger);
          }
        }
        const body = {
          ...response.body,
          result: transcoderResult.result
        };
        return {
          ...response,
          body
        };
      }
      return response;
    }
  };
}
function createHttpRequest(_ref2) {
  let {
    studioUrl,
    encodeSourceMapAtPath,
    logger
  } = _ref2;
  const superRequester = requester.clone();
  superRequester.use(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- support the improved get-it typings
  transcodeResponse({
    studioUrl,
    encodeSourceMapAtPath,
    logger
  }));
  function httpRequest(options) {
    let requester = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : superRequester;
    return requester({
      maxRedirects: 0,
      ...options
    });
  }
  httpRequest.defaultRequester = superRequester;
  return httpRequest;
}
function isBodyResponse(response) {
  return typeof response === "object" && response !== null;
}
function isResultBody(body) {
  return typeof body === "object" && body !== null && "result" in body;
}
function isContentSourceMapBody(body) {
  return typeof body === "object" && body !== null && "resultSourceMap" in body;
}

//# sourceMappingURL=request.js.map

;// CONCATENATED MODULE: ./node_modules/@sanity/preview-kit/dist/client/createClient.js


const createClient_createClient = config => {
  var _a, _b;
  const {
    encodeSourceMap = detectEnableSourceMap(),
    encodeSourceMapAtPath,
    studioUrl = detectStudioUrl(),
    logger,
    ...options
  } = config;
  let shouldEncodeSourceMap = encodeSourceMap === true;
  if (encodeSourceMap === "auto") {
    shouldEncodeSourceMap = isVercelPreviewEnvironment();
  }
  if (typeof encodeSourceMap === "string" && encodeSourceMap !== "auto") {
    throw new Error("Invalid value for encodeSourceMap: ".concat(encodeSourceMap, ". Did you mean 'auto'?"));
  }
  try {
    if (shouldEncodeSourceMap && config.resultSourceMap !== false) {
      if (!studioUrl) {
        (_a = logger == null ? void 0 : logger.error) == null ? void 0 : _a.call(logger, "[@sanity/preview-kit]: Content source map enabled client is enabled, but no studioUrl is provided. Falling back to @sanity/client");
        return createClient(options);
      }
      (_b = logger == null ? void 0 : logger.debug) == null ? void 0 : _b.call(logger, "[@sanity/preview-kit]: Creating source map enabled client");
      const httpRequest = createHttpRequest({
        encodeSourceMapAtPath,
        studioUrl,
        logger
      });
      return new SanityClient(httpRequest, {
        ...options,
        // Source maps by Content Lake are required in order to know where to insert the encoded source maps into strings
        resultSourceMap: true
      });
    }
  } catch (err) {
    console.error("[@sanity/preview-kit]: Error creating client", err, "falling back to non-embedded sourcemap mode");
  }
  return createClient(options);
};
function isVercelPreviewEnvironment() {
  try {
    return /* unsupported import.meta.env.VERCEL_ENV */ undefined.VERCEL_ENV === "preview";
  } catch {}
  try {
    return process.env.VERCEL_ENV === "preview";
  } catch {}
  return false;
}
function detectEnableSourceMap() {
  try {
    return /* unsupported import.meta.env.SANITY_SOURCE_MAP */ undefined.SANITY_SOURCE_MAP === "true" || "auto";
  } catch {}
  try {
    return process.env.SANITY_SOURCE_MAP === "true" || "auto";
  } catch {}
  return "auto";
}
function detectStudioUrl() {
  try {
    return /* unsupported import.meta.env.SANITY_STUDIO_URL */ undefined.SANITY_STUDIO_URL;
  } catch {}
  try {
    return process.env.SANITY_STUDIO_URL;
  } catch {}
}

//# sourceMappingURL=createClient.js.map

;// CONCATENATED MODULE: ./node_modules/next-sanity/dist/client.js

function client_createClient(config) {
  let {
    // eslint-disable-next-line prefer-const, no-process-env
    studioUrl = process.env.NEXT_PUBLIC_SANITY_STUDIO_URL,
    encodeSourceMap = studioUrl ? "auto" : false
  } = config;
  if (encodeSourceMap === "auto" && process.env.NEXT_PUBLIC_VERCEL_ENV === "preview") {
    encodeSourceMap = true;
  }
  return createClient_createClient({
    ...config,
    studioUrl,
    encodeSourceMap
  });
}

//# sourceMappingURL=client.js.map


/***/ }),

/***/ 97146:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  ZP: () => (/* binding */ useSWR)
});

// UNUSED EXPORTS: SWRConfig, mutate, preload, unstable_serialize, useSWRConfig

// EXTERNAL MODULE: external "next/dist/compiled/react"
var react_ = __webpack_require__(18038);
// EXTERNAL MODULE: ./node_modules/use-sync-external-store/shim/index.js
var shim = __webpack_require__(61928);
;// CONCATENATED MODULE: ./node_modules/swr/_internal/dist/index.mjs


// Shared state between server components and client components
const noop = ()=>{};
// Using noop() as the undefined value as undefined can be replaced
// by something else. Prettier ignore and extra parentheses are necessary here
// to ensure that tsc doesn't remove the __NOINLINE__ comment.
// prettier-ignore
const UNDEFINED = /*#__NOINLINE__*/ noop();
const OBJECT = Object;
const isUndefined = (v)=>v === UNDEFINED;
const isFunction = (v)=>typeof v == 'function';
const mergeObjects = (a, b)=>({
        ...a,
        ...b
    });
const isPromiseLike = (x)=>isFunction(x.then);

// use WeakMap to store the object->key mapping
// so the objects can be garbage collected.
// WeakMap uses a hashtable under the hood, so the lookup
// complexity is almost O(1).
const table = new WeakMap();
// counter of the key
let counter = 0;
// A stable hash implementation that supports:
// - Fast and ensures unique hash properties
// - Handles unserializable values
// - Handles object key ordering
// - Generates short results
//
// This is not a serialization function, and the result is not guaranteed to be
// parsable.
const stableHash = (arg)=>{
    const type = typeof arg;
    const constructor = arg && arg.constructor;
    const isDate = constructor == Date;
    let result;
    let index;
    if (OBJECT(arg) === arg && !isDate && constructor != RegExp) {
        // Object/function, not null/date/regexp. Use WeakMap to store the id first.
        // If it's already hashed, directly return the result.
        result = table.get(arg);
        if (result) return result;
        // Store the hash first for circular reference detection before entering the
        // recursive `stableHash` calls.
        // For other objects like set and map, we use this id directly as the hash.
        result = ++counter + '~';
        table.set(arg, result);
        if (constructor == Array) {
            // Array.
            result = '@';
            for(index = 0; index < arg.length; index++){
                result += stableHash(arg[index]) + ',';
            }
            table.set(arg, result);
        }
        if (constructor == OBJECT) {
            // Object, sort keys.
            result = '#';
            const keys = OBJECT.keys(arg).sort();
            while(!isUndefined(index = keys.pop())){
                if (!isUndefined(arg[index])) {
                    result += index + ':' + stableHash(arg[index]) + ',';
                }
            }
            table.set(arg, result);
        }
    } else {
        result = isDate ? arg.toJSON() : type == 'symbol' ? arg.toString() : type == 'string' ? JSON.stringify(arg) : '' + arg;
    }
    return result;
};

// Global state used to deduplicate requests and store listeners
const SWRGlobalState = new WeakMap();

const EMPTY_CACHE = {};
const INITIAL_CACHE = {};
const STR_UNDEFINED = 'undefined';
// NOTE: Use the function to guarantee it's re-evaluated between jsdom and node runtime for tests.
const isWindowDefined = typeof window != STR_UNDEFINED;
const isDocumentDefined = typeof document != STR_UNDEFINED;
const hasRequestAnimationFrame = ()=>isWindowDefined && typeof window['requestAnimationFrame'] != STR_UNDEFINED;
const createCacheHelper = (cache, key)=>{
    const state = SWRGlobalState.get(cache);
    return [
        // Getter
        ()=>!isUndefined(key) && cache.get(key) || EMPTY_CACHE,
        // Setter
        (info)=>{
            if (!isUndefined(key)) {
                const prev = cache.get(key);
                // Before writing to the store, we keep the value in the initial cache
                // if it's not there yet.
                if (!(key in INITIAL_CACHE)) {
                    INITIAL_CACHE[key] = prev;
                }
                state[5](key, mergeObjects(prev, info), prev || EMPTY_CACHE);
            }
        },
        // Subscriber
        state[6],
        // Get server cache snapshot
        ()=>{
            if (!isUndefined(key)) {
                // If the cache was updated on the client, we return the stored initial value.
                if (key in INITIAL_CACHE) return INITIAL_CACHE[key];
            }
            // If we haven't done any client-side updates, we return the current value.
            return !isUndefined(key) && cache.get(key) || EMPTY_CACHE;
        }
    ];
} // export { UNDEFINED, OBJECT, isUndefined, isFunction, mergeObjects, isPromiseLike }
;

/**
 * Due to the bug https://bugs.chromium.org/p/chromium/issues/detail?id=678075,
 * it's not reliable to detect if the browser is currently online or offline
 * based on `navigator.onLine`.
 * As a workaround, we always assume it's online on the first load, and change
 * the status upon `online` or `offline` events.
 */ let online = true;
const isOnline = ()=>online;
// For node and React Native, `add/removeEventListener` doesn't exist on window.
const [onWindowEvent, offWindowEvent] = isWindowDefined && window.addEventListener ? [
    window.addEventListener.bind(window),
    window.removeEventListener.bind(window)
] : [
    noop,
    noop
];
const isVisible = ()=>{
    const visibilityState = isDocumentDefined && document.visibilityState;
    return isUndefined(visibilityState) || visibilityState !== 'hidden';
};
const initFocus = (callback)=>{
    // focus revalidate
    if (isDocumentDefined) {
        document.addEventListener('visibilitychange', callback);
    }
    onWindowEvent('focus', callback);
    return ()=>{
        if (isDocumentDefined) {
            document.removeEventListener('visibilitychange', callback);
        }
        offWindowEvent('focus', callback);
    };
};
const initReconnect = (callback)=>{
    // revalidate on reconnected
    const onOnline = ()=>{
        online = true;
        callback();
    };
    // nothing to revalidate, just update the status
    const onOffline = ()=>{
        online = false;
    };
    onWindowEvent('online', onOnline);
    onWindowEvent('offline', onOffline);
    return ()=>{
        offWindowEvent('online', onOnline);
        offWindowEvent('offline', onOffline);
    };
};
const preset = {
    isOnline,
    isVisible
};
const defaultConfigOptions = {
    initFocus,
    initReconnect
};

const IS_REACT_LEGACY = !react_.useId;
const IS_SERVER = !isWindowDefined || 'Deno' in window;
// Polyfill requestAnimationFrame
const rAF = (f)=>hasRequestAnimationFrame() ? window['requestAnimationFrame'](f) : setTimeout(f, 1);
// React currently throws a warning when using useLayoutEffect on the server.
// To get around it, we can conditionally useEffect on the server (no-op) and
// useLayoutEffect in the browser.
const useIsomorphicLayoutEffect = IS_SERVER ? react_.useEffect : react_.useLayoutEffect;
// This assignment is to extend the Navigator type to use effectiveType.
const navigatorConnection = typeof navigator !== 'undefined' && navigator.connection;
// Adjust the config based on slow connection status (<= 70Kbps).
const slowConnection = !IS_SERVER && navigatorConnection && ([
    'slow-2g',
    '2g'
].includes(navigatorConnection.effectiveType) || navigatorConnection.saveData);

const dist_serialize = (key)=>{
    if (isFunction(key)) {
        try {
            key = key();
        } catch (err) {
            // dependencies not ready
            key = '';
        }
    }
    // Use the original key as the argument of fetcher. This can be a string or an
    // array of values.
    const args = key;
    // If key is not falsy, or not an empty array, hash it.
    key = typeof key == 'string' ? key : (Array.isArray(key) ? key.length : key) ? stableHash(key) : '';
    return [
        key,
        args
    ];
};

// Global timestamp.
let __timestamp = 0;
const getTimestamp = ()=>++__timestamp;

const FOCUS_EVENT = 0;
const RECONNECT_EVENT = 1;
const MUTATE_EVENT = 2;
const ERROR_REVALIDATE_EVENT = 3;

var events = {
  __proto__: null,
  ERROR_REVALIDATE_EVENT: ERROR_REVALIDATE_EVENT,
  FOCUS_EVENT: FOCUS_EVENT,
  MUTATE_EVENT: MUTATE_EVENT,
  RECONNECT_EVENT: RECONNECT_EVENT
};

async function internalMutate(...args) {
    const [cache, _key, _data, _opts] = args;
    // When passing as a boolean, it's explicitly used to disable/enable
    // revalidation.
    const options = mergeObjects({
        populateCache: true,
        throwOnError: true
    }, typeof _opts === 'boolean' ? {
        revalidate: _opts
    } : _opts || {});
    let populateCache = options.populateCache;
    const rollbackOnErrorOption = options.rollbackOnError;
    let optimisticData = options.optimisticData;
    const revalidate = options.revalidate !== false;
    const rollbackOnError = (error)=>{
        return typeof rollbackOnErrorOption === 'function' ? rollbackOnErrorOption(error) : rollbackOnErrorOption !== false;
    };
    const throwOnError = options.throwOnError;
    // If the second argument is a key filter, return the mutation results for all
    // filtered keys.
    if (isFunction(_key)) {
        const keyFilter = _key;
        const matchedKeys = [];
        const it = cache.keys();
        for (const key of it){
            if (// Skip the special useSWRInfinite and useSWRSubscription keys.
            !/^\$(inf|sub)\$/.test(key) && keyFilter(cache.get(key)._k)) {
                matchedKeys.push(key);
            }
        }
        return Promise.all(matchedKeys.map(mutateByKey));
    }
    return mutateByKey(_key);
    async function mutateByKey(_k) {
        // Serialize key
        const [key] = dist_serialize(_k);
        if (!key) return;
        const [get, set] = createCacheHelper(cache, key);
        const [EVENT_REVALIDATORS, MUTATION, FETCH, PRELOAD] = SWRGlobalState.get(cache);
        const startRevalidate = ()=>{
            const revalidators = EVENT_REVALIDATORS[key];
            if (revalidate) {
                // Invalidate the key by deleting the concurrent request markers so new
                // requests will not be deduped.
                delete FETCH[key];
                delete PRELOAD[key];
                if (revalidators && revalidators[0]) {
                    return revalidators[0](MUTATE_EVENT).then(()=>get().data);
                }
            }
            return get().data;
        };
        // If there is no new data provided, revalidate the key with current state.
        if (args.length < 3) {
            // Revalidate and broadcast state.
            return startRevalidate();
        }
        let data = _data;
        let error;
        // Update global timestamps.
        const beforeMutationTs = getTimestamp();
        MUTATION[key] = [
            beforeMutationTs,
            0
        ];
        const hasOptimisticData = !isUndefined(optimisticData);
        const state = get();
        // `displayedData` is the current value on screen. It could be the optimistic value
        // that is going to be overridden by a `committedData`, or get reverted back.
        // `committedData` is the validated value that comes from a fetch or mutation.
        const displayedData = state.data;
        const currentData = state._c;
        const committedData = isUndefined(currentData) ? displayedData : currentData;
        // Do optimistic data update.
        if (hasOptimisticData) {
            optimisticData = isFunction(optimisticData) ? optimisticData(committedData, displayedData) : optimisticData;
            // When we set optimistic data, backup the current committedData data in `_c`.
            set({
                data: optimisticData,
                _c: committedData
            });
        }
        if (isFunction(data)) {
            // `data` is a function, call it passing current cache value.
            try {
                data = data(committedData);
            } catch (err) {
                // If it throws an error synchronously, we shouldn't update the cache.
                error = err;
            }
        }
        // `data` is a promise/thenable, resolve the final data first.
        if (data && isPromiseLike(data)) {
            // This means that the mutation is async, we need to check timestamps to
            // avoid race conditions.
            data = await data.catch((err)=>{
                error = err;
            });
            // Check if other mutations have occurred since we've started this mutation.
            // If there's a race we don't update cache or broadcast the change,
            // just return the data.
            if (beforeMutationTs !== MUTATION[key][0]) {
                if (error) throw error;
                return data;
            } else if (error && hasOptimisticData && rollbackOnError(error)) {
                // Rollback. Always populate the cache in this case but without
                // transforming the data.
                populateCache = true;
                // Reset data to be the latest committed data, and clear the `_c` value.
                set({
                    data: committedData,
                    _c: UNDEFINED
                });
            }
        }
        // If we should write back the cache after request.
        if (populateCache) {
            if (!error) {
                // Transform the result into data.
                if (isFunction(populateCache)) {
                    const populateCachedData = populateCache(data, committedData);
                    set({
                        data: populateCachedData,
                        error: UNDEFINED,
                        _c: UNDEFINED
                    });
                } else {
                    // Only update cached data and reset the error if there's no error. Data can be `undefined` here.
                    set({
                        data,
                        error: UNDEFINED,
                        _c: UNDEFINED
                    });
                }
            }
        }
        // Reset the timestamp to mark the mutation has ended.
        MUTATION[key][1] = getTimestamp();
        // Update existing SWR Hooks' internal states:
        Promise.resolve(startRevalidate()).then(()=>{
            // The mutation and revalidation are ended, we can clear it since the data is
            // not an optimistic value anymore.
            set({
                _c: UNDEFINED
            });
        });
        // Throw error or return data
        if (error) {
            if (throwOnError) throw error;
            return;
        }
        return data;
    }
}

const revalidateAllKeys = (revalidators, type)=>{
    for(const key in revalidators){
        if (revalidators[key][0]) revalidators[key][0](type);
    }
};
const initCache = (provider, options)=>{
    // The global state for a specific provider will be used to deduplicate
    // requests and store listeners. As well as a mutate function that is bound to
    // the cache.
    // The provider's global state might be already initialized. Let's try to get the
    // global state associated with the provider first.
    if (!SWRGlobalState.has(provider)) {
        const opts = mergeObjects(defaultConfigOptions, options);
        // If there's no global state bound to the provider, create a new one with the
        // new mutate function.
        const EVENT_REVALIDATORS = {};
        const mutate = internalMutate.bind(UNDEFINED, provider);
        let unmount = noop;
        const subscriptions = {};
        const subscribe = (key, callback)=>{
            const subs = subscriptions[key] || [];
            subscriptions[key] = subs;
            subs.push(callback);
            return ()=>subs.splice(subs.indexOf(callback), 1);
        };
        const setter = (key, value, prev)=>{
            provider.set(key, value);
            const subs = subscriptions[key];
            if (subs) {
                for (const fn of subs){
                    fn(value, prev);
                }
            }
        };
        const initProvider = ()=>{
            if (!SWRGlobalState.has(provider)) {
                // Update the state if it's new, or if the provider has been extended.
                SWRGlobalState.set(provider, [
                    EVENT_REVALIDATORS,
                    {},
                    {},
                    {},
                    mutate,
                    setter,
                    subscribe
                ]);
                if (!IS_SERVER) {
                    // When listening to the native events for auto revalidations,
                    // we intentionally put a delay (setTimeout) here to make sure they are
                    // fired after immediate JavaScript executions, which can be
                    // React's state updates.
                    // This avoids some unnecessary revalidations such as
                    // https://github.com/vercel/swr/issues/1680.
                    const releaseFocus = opts.initFocus(setTimeout.bind(UNDEFINED, revalidateAllKeys.bind(UNDEFINED, EVENT_REVALIDATORS, FOCUS_EVENT)));
                    const releaseReconnect = opts.initReconnect(setTimeout.bind(UNDEFINED, revalidateAllKeys.bind(UNDEFINED, EVENT_REVALIDATORS, RECONNECT_EVENT)));
                    unmount = ()=>{
                        releaseFocus && releaseFocus();
                        releaseReconnect && releaseReconnect();
                        // When un-mounting, we need to remove the cache provider from the state
                        // storage too because it's a side-effect. Otherwise, when re-mounting we
                        // will not re-register those event listeners.
                        SWRGlobalState.delete(provider);
                    };
                }
            }
        };
        initProvider();
        // This is a new provider, we need to initialize it and setup DOM events
        // listeners for `focus` and `reconnect` actions.
        // We might want to inject an extra layer on top of `provider` in the future,
        // such as key serialization, auto GC, etc.
        // For now, it's just a `Map` interface without any modifications.
        return [
            provider,
            mutate,
            initProvider,
            unmount
        ];
    }
    return [
        provider,
        SWRGlobalState.get(provider)[4]
    ];
};

// error retry
const onErrorRetry = (_, __, config, revalidate, opts)=>{
    const maxRetryCount = config.errorRetryCount;
    const currentRetryCount = opts.retryCount;
    // Exponential backoff
    const timeout = ~~((Math.random() + 0.5) * (1 << (currentRetryCount < 8 ? currentRetryCount : 8))) * config.errorRetryInterval;
    if (!isUndefined(maxRetryCount) && currentRetryCount > maxRetryCount) {
        return;
    }
    setTimeout(revalidate, timeout, opts);
};
const compare = (currentData, newData)=>stableHash(currentData) == stableHash(newData);
// Default cache provider
const [cache, mutate] = initCache(new Map());
// Default config
const defaultConfig = mergeObjects({
    // events
    onLoadingSlow: noop,
    onSuccess: noop,
    onError: noop,
    onErrorRetry,
    onDiscarded: noop,
    // switches
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    revalidateIfStale: true,
    shouldRetryOnError: true,
    // timeouts
    errorRetryInterval: slowConnection ? 10000 : 5000,
    focusThrottleInterval: 5 * 1000,
    dedupingInterval: 2 * 1000,
    loadingTimeout: slowConnection ? 5000 : 3000,
    // providers
    compare,
    isPaused: ()=>false,
    cache,
    mutate,
    fallback: {}
}, // use web preset by default
preset);

const mergeConfigs = (a, b)=>{
    // Need to create a new object to avoid mutating the original here.
    const v = mergeObjects(a, b);
    // If two configs are provided, merge their `use` and `fallback` options.
    if (b) {
        const { use: u1, fallback: f1 } = a;
        const { use: u2, fallback: f2 } = b;
        if (u1 && u2) {
            v.use = u1.concat(u2);
        }
        if (f1 && f2) {
            v.fallback = mergeObjects(f1, f2);
        }
    }
    return v;
};

const SWRConfigContext = (0,react_.createContext)({});
const SWRConfig = (props)=>{
    const { value } = props;
    const parentConfig = (0,react_.useContext)(SWRConfigContext);
    const isFunctionalConfig = isFunction(value);
    const config = (0,react_.useMemo)(()=>isFunctionalConfig ? value(parentConfig) : value, [
        isFunctionalConfig,
        parentConfig,
        value
    ]);
    // Extend parent context values and middleware.
    const extendedConfig = (0,react_.useMemo)(()=>isFunctionalConfig ? config : mergeConfigs(parentConfig, config), [
        isFunctionalConfig,
        parentConfig,
        config
    ]);
    // Should not use the inherited provider.
    const provider = config && config.provider;
    // initialize the cache only on first access.
    const cacheContextRef = (0,react_.useRef)(UNDEFINED);
    if (provider && !cacheContextRef.current) {
        cacheContextRef.current = initCache(provider(extendedConfig.cache || cache), config);
    }
    const cacheContext = cacheContextRef.current;
    // Override the cache if a new provider is given.
    if (cacheContext) {
        extendedConfig.cache = cacheContext[0];
        extendedConfig.mutate = cacheContext[1];
    }
    // Unsubscribe events.
    useIsomorphicLayoutEffect(()=>{
        if (cacheContext) {
            cacheContext[2] && cacheContext[2]();
            return cacheContext[3];
        }
    }, []);
    return (0,react_.createElement)(SWRConfigContext.Provider, mergeObjects(props, {
        value: extendedConfig
    }));
};

const INFINITE_PREFIX = '$inf$';

// @ts-expect-error
const enableDevtools = isWindowDefined && window.__SWR_DEVTOOLS_USE__;
const use = enableDevtools ? window.__SWR_DEVTOOLS_USE__ : [];
const setupDevTools = ()=>{
    if (enableDevtools) {
        // @ts-expect-error
        window.__SWR_DEVTOOLS_REACT__ = react_;
    }
};

const normalize = (args)=>{
    return isFunction(args[1]) ? [
        args[0],
        args[1],
        args[2] || {}
    ] : [
        args[0],
        null,
        (args[1] === null ? args[2] : args[1]) || {}
    ];
};

const useSWRConfig = ()=>{
    return mergeObjects(defaultConfig, (0,react_.useContext)(SWRConfigContext));
};

const preload = (key_, fetcher)=>{
    const [key, fnArg] = dist_serialize(key_);
    const [, , , PRELOAD] = SWRGlobalState.get(cache);
    // Prevent preload to be called multiple times before used.
    if (PRELOAD[key]) return PRELOAD[key];
    const req = fetcher(fnArg);
    PRELOAD[key] = req;
    return req;
};
const middleware = (useSWRNext)=>(key_, fetcher_, config)=>{
        // fetcher might be a sync function, so this should not be an async function
        const fetcher = fetcher_ && ((...args)=>{
            const [key] = dist_serialize(key_);
            const [, , , PRELOAD] = SWRGlobalState.get(cache);
            if (key.startsWith(INFINITE_PREFIX)) {
                // we want the infinite fetcher to be called.
                // handling of the PRELOAD cache happens there.
                return fetcher_(...args);
            }
            const req = PRELOAD[key];
            if (isUndefined(req)) return fetcher_(...args);
            delete PRELOAD[key];
            return req;
        });
        return useSWRNext(key_, fetcher, config);
    };

const BUILT_IN_MIDDLEWARE = use.concat(middleware);

// It's tricky to pass generic types as parameters, so we just directly override
// the types here.
const withArgs = (hook)=>{
    return function useSWRArgs(...args) {
        // Get the default and inherited configuration.
        const fallbackConfig = useSWRConfig();
        // Normalize arguments.
        const [key, fn, _config] = normalize(args);
        // Merge configurations.
        const config = mergeConfigs(fallbackConfig, _config);
        // Apply middleware
        let next = hook;
        const { use } = config;
        const middleware = (use || []).concat(BUILT_IN_MIDDLEWARE);
        for(let i = middleware.length; i--;){
            next = middleware[i](next);
        }
        return next(key, fn || config.fetcher || null, config);
    };
};

// Add a callback function to a list of keyed callback functions and return
// the unsubscribe function.
const subscribeCallback = (key, callbacks, callback)=>{
    const keyedRevalidators = callbacks[key] || (callbacks[key] = []);
    keyedRevalidators.push(callback);
    return ()=>{
        const index = keyedRevalidators.indexOf(callback);
        if (index >= 0) {
            // O(1): faster than splice
            keyedRevalidators[index] = keyedRevalidators[keyedRevalidators.length - 1];
            keyedRevalidators.pop();
        }
    };
};

// Create a custom hook with a middleware
const withMiddleware = (useSWR, middleware)=>{
    return (...args)=>{
        const [key, fn, config] = normalize(args);
        const uses = (config.use || []).concat(middleware);
        return useSWR(key, fn, {
            ...config,
            use: uses
        });
    };
};

setupDevTools();



;// CONCATENATED MODULE: ./node_modules/swr/core/dist/index.mjs






const unstable_serialize = (key)=>serialize(key)[0];

/// <reference types="react/experimental" />
const dist_use = react_.use || ((promise)=>{
    if (promise.status === 'pending') {
        throw promise;
    } else if (promise.status === 'fulfilled') {
        return promise.value;
    } else if (promise.status === 'rejected') {
        throw promise.reason;
    } else {
        promise.status = 'pending';
        promise.then((v)=>{
            promise.status = 'fulfilled';
            promise.value = v;
        }, (e)=>{
            promise.status = 'rejected';
            promise.reason = e;
        });
        throw promise;
    }
});
const WITH_DEDUPE = {
    dedupe: true
};
const useSWRHandler = (_key, fetcher, config)=>{
    const { cache, compare, suspense, fallbackData, revalidateOnMount, revalidateIfStale, refreshInterval, refreshWhenHidden, refreshWhenOffline, keepPreviousData } = config;
    const [EVENT_REVALIDATORS, MUTATION, FETCH, PRELOAD] = SWRGlobalState.get(cache);
    // `key` is the identifier of the SWR internal state,
    // `fnArg` is the argument/arguments parsed from the key, which will be passed
    // to the fetcher.
    // All of them are derived from `_key`.
    const [key, fnArg] = dist_serialize(_key);
    // If it's the initial render of this hook.
    const initialMountedRef = (0,react_.useRef)(false);
    // If the hook is unmounted already. This will be used to prevent some effects
    // to be called after unmounting.
    const unmountedRef = (0,react_.useRef)(false);
    // Refs to keep the key and config.
    const keyRef = (0,react_.useRef)(key);
    const fetcherRef = (0,react_.useRef)(fetcher);
    const configRef = (0,react_.useRef)(config);
    const getConfig = ()=>configRef.current;
    const isActive = ()=>getConfig().isVisible() && getConfig().isOnline();
    const [getCache, setCache, subscribeCache, getInitialCache] = createCacheHelper(cache, key);
    const stateDependencies = (0,react_.useRef)({}).current;
    const fallback = isUndefined(fallbackData) ? config.fallback[key] : fallbackData;
    const isEqual = (prev, current)=>{
        for(const _ in stateDependencies){
            const t = _;
            if (t === 'data') {
                if (!compare(prev[t], current[t])) {
                    if (!isUndefined(prev[t])) {
                        return false;
                    }
                    if (!compare(returnedData, current[t])) {
                        return false;
                    }
                }
            } else {
                if (current[t] !== prev[t]) {
                    return false;
                }
            }
        }
        return true;
    };
    const getSnapshot = (0,react_.useMemo)(()=>{
        const shouldStartRequest = (()=>{
            if (!key) return false;
            if (!fetcher) return false;
            // If `revalidateOnMount` is set, we take the value directly.
            if (!isUndefined(revalidateOnMount)) return revalidateOnMount;
            // If it's paused, we skip revalidation.
            if (getConfig().isPaused()) return false;
            if (suspense) return false;
            if (!isUndefined(revalidateIfStale)) return revalidateIfStale;
            return true;
        })();
        // Get the cache and merge it with expected states.
        const getSelectedCache = (state)=>{
            // We only select the needed fields from the state.
            const snapshot = mergeObjects(state);
            delete snapshot._k;
            if (!shouldStartRequest) {
                return snapshot;
            }
            return {
                isValidating: true,
                isLoading: true,
                ...snapshot
            };
        };
        const cachedData = getCache();
        const initialData = getInitialCache();
        const clientSnapshot = getSelectedCache(cachedData);
        const serverSnapshot = cachedData === initialData ? clientSnapshot : getSelectedCache(initialData);
        // To make sure that we are returning the same object reference to avoid
        // unnecessary re-renders, we keep the previous snapshot and use deep
        // comparison to check if we need to return a new one.
        let memorizedSnapshot = clientSnapshot;
        return [
            ()=>{
                const newSnapshot = getSelectedCache(getCache());
                const compareResult = isEqual(newSnapshot, memorizedSnapshot);
                if (compareResult) {
                    // Mentally, we should always return the `memorizedSnapshot` here
                    // as there's no change between the new and old snapshots.
                    // However, since the `isEqual` function only compares selected fields,
                    // the values of the unselected fields might be changed. That's
                    // simply because we didn't track them.
                    // To support the case in https://github.com/vercel/swr/pull/2576,
                    // we need to update these fields in the `memorizedSnapshot` too
                    // with direct mutations to ensure the snapshot is always up-to-date
                    // even for the unselected fields, but only trigger re-renders when
                    // the selected fields are changed.
                    memorizedSnapshot.data = newSnapshot.data;
                    memorizedSnapshot.isLoading = newSnapshot.isLoading;
                    memorizedSnapshot.isValidating = newSnapshot.isValidating;
                    memorizedSnapshot.error = newSnapshot.error;
                    return memorizedSnapshot;
                } else {
                    memorizedSnapshot = newSnapshot;
                    return newSnapshot;
                }
            },
            ()=>serverSnapshot
        ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        cache,
        key
    ]);
    // Get the current state that SWR should return.
    const cached = (0,shim.useSyncExternalStore)((0,react_.useCallback)((callback)=>subscribeCache(key, (current, prev)=>{
            if (!isEqual(prev, current)) callback();
        }), // eslint-disable-next-line react-hooks/exhaustive-deps
    [
        cache,
        key
    ]), getSnapshot[0], getSnapshot[1]);
    const isInitialMount = !initialMountedRef.current;
    const hasRevalidator = EVENT_REVALIDATORS[key] && EVENT_REVALIDATORS[key].length > 0;
    const cachedData = cached.data;
    const data = isUndefined(cachedData) ? fallback : cachedData;
    const error = cached.error;
    // Use a ref to store previously returned data. Use the initial data as its initial value.
    const laggyDataRef = (0,react_.useRef)(data);
    const returnedData = keepPreviousData ? isUndefined(cachedData) ? laggyDataRef.current : cachedData : data;
    // - Suspense mode and there's stale data for the initial render.
    // - Not suspense mode and there is no fallback data and `revalidateIfStale` is enabled.
    // - `revalidateIfStale` is enabled but `data` is not defined.
    const shouldDoInitialRevalidation = (()=>{
        // if a key already has revalidators and also has error, we should not trigger revalidation
        if (hasRevalidator && !isUndefined(error)) return false;
        // If `revalidateOnMount` is set, we take the value directly.
        if (isInitialMount && !isUndefined(revalidateOnMount)) return revalidateOnMount;
        // If it's paused, we skip revalidation.
        if (getConfig().isPaused()) return false;
        // Under suspense mode, it will always fetch on render if there is no
        // stale data so no need to revalidate immediately mount it again.
        // If data exists, only revalidate if `revalidateIfStale` is true.
        if (suspense) return isUndefined(data) ? false : revalidateIfStale;
        // If there is no stale data, we need to revalidate when mount;
        // If `revalidateIfStale` is set to true, we will always revalidate.
        return isUndefined(data) || revalidateIfStale;
    })();
    // Resolve the default validating state:
    // If it's able to validate, and it should revalidate when mount, this will be true.
    const defaultValidatingState = !!(key && fetcher && isInitialMount && shouldDoInitialRevalidation);
    const isValidating = isUndefined(cached.isValidating) ? defaultValidatingState : cached.isValidating;
    const isLoading = isUndefined(cached.isLoading) ? defaultValidatingState : cached.isLoading;
    // The revalidation function is a carefully crafted wrapper of the original
    // `fetcher`, to correctly handle the many edge cases.
    const revalidate = (0,react_.useCallback)(async (revalidateOpts)=>{
        const currentFetcher = fetcherRef.current;
        if (!key || !currentFetcher || unmountedRef.current || getConfig().isPaused()) {
            return false;
        }
        let newData;
        let startAt;
        let loading = true;
        const opts = revalidateOpts || {};
        // If there is no ongoing concurrent request, or `dedupe` is not set, a
        // new request should be initiated.
        const shouldStartNewRequest = !FETCH[key] || !opts.dedupe;
        /*
         For React 17
         Do unmount check for calls:
         If key has changed during the revalidation, or the component has been
         unmounted, old dispatch and old event callbacks should not take any
         effect

        For React 18
        only check if key has changed
        https://github.com/reactwg/react-18/discussions/82
      */ const callbackSafeguard = ()=>{
            if (IS_REACT_LEGACY) {
                return !unmountedRef.current && key === keyRef.current && initialMountedRef.current;
            }
            return key === keyRef.current;
        };
        // The final state object when the request finishes.
        const finalState = {
            isValidating: false,
            isLoading: false
        };
        const finishRequestAndUpdateState = ()=>{
            setCache(finalState);
        };
        const cleanupState = ()=>{
            // Check if it's still the same request before deleting it.
            const requestInfo = FETCH[key];
            if (requestInfo && requestInfo[1] === startAt) {
                delete FETCH[key];
            }
        };
        // Start fetching. Change the `isValidating` state, update the cache.
        const initialState = {
            isValidating: true
        };
        // It is in the `isLoading` state, if and only if there is no cached data.
        // This bypasses fallback data and laggy data.
        if (isUndefined(getCache().data)) {
            initialState.isLoading = true;
        }
        try {
            if (shouldStartNewRequest) {
                setCache(initialState);
                // If no cache is being rendered currently (it shows a blank page),
                // we trigger the loading slow event.
                if (config.loadingTimeout && isUndefined(getCache().data)) {
                    setTimeout(()=>{
                        if (loading && callbackSafeguard()) {
                            getConfig().onLoadingSlow(key, config);
                        }
                    }, config.loadingTimeout);
                }
                // Start the request and save the timestamp.
                // Key must be truthy if entering here.
                FETCH[key] = [
                    currentFetcher(fnArg),
                    getTimestamp()
                ];
            }
            [newData, startAt] = FETCH[key];
            newData = await newData;
            if (shouldStartNewRequest) {
                // If the request isn't interrupted, clean it up after the
                // deduplication interval.
                setTimeout(cleanupState, config.dedupingInterval);
            }
            // If there're other ongoing request(s), started after the current one,
            // we need to ignore the current one to avoid possible race conditions:
            //   req1------------------>res1        (current one)
            //        req2---------------->res2
            // the request that fired later will always be kept.
            // The timestamp maybe be `undefined` or a number
            if (!FETCH[key] || FETCH[key][1] !== startAt) {
                if (shouldStartNewRequest) {
                    if (callbackSafeguard()) {
                        getConfig().onDiscarded(key);
                    }
                }
                return false;
            }
            // Clear error.
            finalState.error = UNDEFINED;
            // If there're other mutations(s), that overlapped with the current revalidation:
            // case 1:
            //   req------------------>res
            //       mutate------>end
            // case 2:
            //         req------------>res
            //   mutate------>end
            // case 3:
            //   req------------------>res
            //       mutate-------...---------->
            // we have to ignore the revalidation result (res) because it's no longer fresh.
            // meanwhile, a new revalidation should be triggered when the mutation ends.
            const mutationInfo = MUTATION[key];
            if (!isUndefined(mutationInfo) && // case 1
            (startAt <= mutationInfo[0] || // case 2
            startAt <= mutationInfo[1] || // case 3
            mutationInfo[1] === 0)) {
                finishRequestAndUpdateState();
                if (shouldStartNewRequest) {
                    if (callbackSafeguard()) {
                        getConfig().onDiscarded(key);
                    }
                }
                return false;
            }
            // Deep compare with the latest state to avoid extra re-renders.
            // For local state, compare and assign.
            const cacheData = getCache().data;
            // Since the compare fn could be custom fn
            // cacheData might be different from newData even when compare fn returns True
            finalState.data = compare(cacheData, newData) ? cacheData : newData;
            // Trigger the successful callback if it's the original request.
            if (shouldStartNewRequest) {
                if (callbackSafeguard()) {
                    getConfig().onSuccess(newData, key, config);
                }
            }
        } catch (err) {
            cleanupState();
            const currentConfig = getConfig();
            const { shouldRetryOnError } = currentConfig;
            // Not paused, we continue handling the error. Otherwise, discard it.
            if (!currentConfig.isPaused()) {
                // Get a new error, don't use deep comparison for errors.
                finalState.error = err;
                // Error event and retry logic. Only for the actual request, not
                // deduped ones.
                if (shouldStartNewRequest && callbackSafeguard()) {
                    currentConfig.onError(err, key, currentConfig);
                    if (shouldRetryOnError === true || isFunction(shouldRetryOnError) && shouldRetryOnError(err)) {
                        if (isActive()) {
                            // If it's inactive, stop. It will auto-revalidate when
                            // refocusing or reconnecting.
                            // When retrying, deduplication is always enabled.
                            currentConfig.onErrorRetry(err, key, currentConfig, (_opts)=>{
                                const revalidators = EVENT_REVALIDATORS[key];
                                if (revalidators && revalidators[0]) {
                                    revalidators[0](events.ERROR_REVALIDATE_EVENT, _opts);
                                }
                            }, {
                                retryCount: (opts.retryCount || 0) + 1,
                                dedupe: true
                            });
                        }
                    }
                }
            }
        }
        // Mark loading as stopped.
        loading = false;
        // Update the current hook's state.
        finishRequestAndUpdateState();
        return true;
    }, // `setState` is immutable, and `eventsCallback`, `fnArg`, and
    // `keyValidating` are depending on `key`, so we can exclude them from
    // the deps array.
    //
    // FIXME:
    // `fn` and `config` might be changed during the lifecycle,
    // but they might be changed every render like this.
    // `useSWR('key', () => fetch('/api/'), { suspense: true })`
    // So we omit the values from the deps array
    // even though it might cause unexpected behaviors.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
        key,
        cache
    ]);
    // Similar to the global mutate but bound to the current cache and key.
    // `cache` isn't allowed to change during the lifecycle.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const boundMutate = (0,react_.useCallback)(// Use callback to make sure `keyRef.current` returns latest result every time
    (...args)=>{
        return internalMutate(cache, keyRef.current, ...args);
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    []);
    // The logic for updating refs.
    useIsomorphicLayoutEffect(()=>{
        fetcherRef.current = fetcher;
        configRef.current = config;
        // Handle laggy data updates. If there's cached data of the current key,
        // it'll be the correct reference.
        if (!isUndefined(cachedData)) {
            laggyDataRef.current = cachedData;
        }
    });
    // After mounted or key changed.
    useIsomorphicLayoutEffect(()=>{
        if (!key) return;
        const softRevalidate = revalidate.bind(UNDEFINED, WITH_DEDUPE);
        // Expose revalidators to global event listeners. So we can trigger
        // revalidation from the outside.
        let nextFocusRevalidatedAt = 0;
        const onRevalidate = (type, opts = {})=>{
            if (type == events.FOCUS_EVENT) {
                const now = Date.now();
                if (getConfig().revalidateOnFocus && now > nextFocusRevalidatedAt && isActive()) {
                    nextFocusRevalidatedAt = now + getConfig().focusThrottleInterval;
                    softRevalidate();
                }
            } else if (type == events.RECONNECT_EVENT) {
                if (getConfig().revalidateOnReconnect && isActive()) {
                    softRevalidate();
                }
            } else if (type == events.MUTATE_EVENT) {
                return revalidate();
            } else if (type == events.ERROR_REVALIDATE_EVENT) {
                return revalidate(opts);
            }
            return;
        };
        const unsubEvents = subscribeCallback(key, EVENT_REVALIDATORS, onRevalidate);
        // Mark the component as mounted and update corresponding refs.
        unmountedRef.current = false;
        keyRef.current = key;
        initialMountedRef.current = true;
        // Keep the original key in the cache.
        setCache({
            _k: fnArg
        });
        // Trigger a revalidation
        if (shouldDoInitialRevalidation) {
            if (isUndefined(data) || IS_SERVER) {
                // Revalidate immediately.
                softRevalidate();
            } else {
                // Delay the revalidate if we have data to return so we won't block
                // rendering.
                rAF(softRevalidate);
            }
        }
        return ()=>{
            // Mark it as unmounted.
            unmountedRef.current = true;
            unsubEvents();
        };
    }, [
        key
    ]);
    // Polling
    useIsomorphicLayoutEffect(()=>{
        let timer;
        function next() {
            // Use the passed interval
            // ...or invoke the function with the updated data to get the interval
            const interval = isFunction(refreshInterval) ? refreshInterval(getCache().data) : refreshInterval;
            // We only start the next interval if `refreshInterval` is not 0, and:
            // - `force` is true, which is the start of polling
            // - or `timer` is not 0, which means the effect wasn't canceled
            if (interval && timer !== -1) {
                timer = setTimeout(execute, interval);
            }
        }
        function execute() {
            // Check if it's OK to execute:
            // Only revalidate when the page is visible, online, and not errored.
            if (!getCache().error && (refreshWhenHidden || getConfig().isVisible()) && (refreshWhenOffline || getConfig().isOnline())) {
                revalidate(WITH_DEDUPE).then(next);
            } else {
                // Schedule the next interval to check again.
                next();
            }
        }
        next();
        return ()=>{
            if (timer) {
                clearTimeout(timer);
                timer = -1;
            }
        };
    }, [
        refreshInterval,
        refreshWhenHidden,
        refreshWhenOffline,
        key
    ]);
    // Display debug info in React DevTools.
    (0,react_.useDebugValue)(returnedData);
    // In Suspense mode, we can't return the empty `data` state.
    // If there is an `error`, the `error` needs to be thrown to the error boundary.
    // If there is no `error`, the `revalidation` promise needs to be thrown to
    // the suspense boundary.
    if (suspense && isUndefined(data) && key) {
        // SWR should throw when trying to use Suspense on the server with React 18,
        // without providing any initial data. See:
        // https://github.com/vercel/swr/issues/1832
        if (!IS_REACT_LEGACY && IS_SERVER) {
            throw new Error('Fallback data is required when using suspense in SSR.');
        }
        // Always update fetcher and config refs even with the Suspense mode.
        fetcherRef.current = fetcher;
        configRef.current = config;
        unmountedRef.current = false;
        const req = PRELOAD[key];
        if (!isUndefined(req)) {
            const promise = boundMutate(req);
            dist_use(promise);
        }
        if (isUndefined(error)) {
            const promise = revalidate(WITH_DEDUPE);
            if (!isUndefined(returnedData)) {
                promise.status = 'fulfilled';
                promise.value = true;
            }
            dist_use(promise);
        } else {
            throw error;
        }
    }
    return {
        mutate: boundMutate,
        get data () {
            stateDependencies.data = true;
            return returnedData;
        },
        get error () {
            stateDependencies.error = true;
            return error;
        },
        get isValidating () {
            stateDependencies.isValidating = true;
            return isValidating;
        },
        get isLoading () {
            stateDependencies.isLoading = true;
            return isLoading;
        }
    };
};
const dist_SWRConfig = OBJECT.defineProperty(SWRConfig, 'defaultValue', {
    value: defaultConfig
});
/**
 * A hook to fetch data.
 *
 * @link https://swr.vercel.app
 * @example
 * ```jsx
 * import useSWR from 'swr'
 * function Profile() {
 *   const { data, error, isLoading } = useSWR('/api/user', fetcher)
 *   if (error) return <div>failed to load</div>
 *   if (isLoading) return <div>loading...</div>
 *   return <div>hello {data.name}!</div>
 * }
 * ```
 */ const useSWR = withArgs(useSWRHandler);




/***/ })

};
;