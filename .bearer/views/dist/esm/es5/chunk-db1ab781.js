var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var global$1 = (typeof global !== "undefined" ? global :
    typeof self !== "undefined" ? self :
        typeof window !== "undefined" ? window : {});
if (typeof global$1.setTimeout === 'function')
    ;
if (typeof global$1.clearTimeout === 'function')
    ;
// from https://github.com/kumavis/browser-process-hrtime/blob/master/index.js
var performance = global$1.performance || {};
var performanceNow = performance.now ||
    performance.mozNow ||
    performance.msNow ||
    performance.oNow ||
    performance.webkitNow ||
    function () { return (new Date()).getTime(); };
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule EventSubscription
 * @typechecks
 */
/**
 * EventSubscription represents a subscription to a particular event. It can
 * remove its own subscription.
 */
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
} }
var EventSubscription = (function () {
    /**
     * @param {EventSubscriptionVendor} subscriber the subscriber that controls
     *   this subscription.
     */
    function EventSubscription(subscriber) {
        _classCallCheck(this, EventSubscription);
        this.subscriber = subscriber;
    }
    /**
     * Removes this subscription from the subscriber that controls it.
     */
    EventSubscription.prototype.remove = function remove() {
        if (this.subscriber) {
            this.subscriber.removeSubscription(this);
            this.subscriber = null;
        }
    };
    return EventSubscription;
})();
var EventSubscription_1 = EventSubscription;
function _classCallCheck$1(instance, Constructor) { if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
} }
function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
} subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass)
    Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
/**
 * EmitterSubscription represents a subscription with listener and context data.
 */
var EmitterSubscription = (function (_EventSubscription) {
    _inherits(EmitterSubscription, _EventSubscription);
    /**
     * @param {EventSubscriptionVendor} subscriber - The subscriber that controls
     *   this subscription
     * @param {function} listener - Function to invoke when the specified event is
     *   emitted
     * @param {*} context - Optional context object to use when invoking the
     *   listener
     */
    function EmitterSubscription(subscriber, listener, context) {
        _classCallCheck$1(this, EmitterSubscription);
        _EventSubscription.call(this, subscriber);
        this.listener = listener;
        this.context = context;
    }
    return EmitterSubscription;
})(EventSubscription_1);
var EmitterSubscription_1 = EmitterSubscription;
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */
var validateFormat = function validateFormat(format) { };
{
    validateFormat = function validateFormat(format) {
        if (format === undefined) {
            throw new Error('invariant requires an error message argument');
        }
    };
}
function invariant(condition, format, a, b, c, d, e, f) {
    validateFormat(format);
    if (!condition) {
        var error;
        if (format === undefined) {
            error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
        }
        else {
            var args = [a, b, c, d, e, f];
            var argIndex = 0;
            error = new Error(format.replace(/%s/g, function () {
                return args[argIndex++];
            }));
            error.name = 'Invariant Violation';
        }
        error.framesToPop = 1; // we don't care about invariant's own frame
        throw error;
    }
}
var invariant_1 = invariant;
function _classCallCheck$2(instance, Constructor) { if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
} }
/**
 * EventSubscriptionVendor stores a set of EventSubscriptions that are
 * subscribed to a particular event type.
 */
var EventSubscriptionVendor = (function () {
    function EventSubscriptionVendor() {
        _classCallCheck$2(this, EventSubscriptionVendor);
        this._subscriptionsForType = {};
        this._currentSubscription = null;
    }
    /**
     * Adds a subscription keyed by an event type.
     *
     * @param {string} eventType
     * @param {EventSubscription} subscription
     */
    EventSubscriptionVendor.prototype.addSubscription = function addSubscription(eventType, subscription) {
        !(subscription.subscriber === this) ? invariant_1(false, 'The subscriber of the subscription is incorrectly set.') : undefined;
        if (!this._subscriptionsForType[eventType]) {
            this._subscriptionsForType[eventType] = [];
        }
        var key = this._subscriptionsForType[eventType].length;
        this._subscriptionsForType[eventType].push(subscription);
        subscription.eventType = eventType;
        subscription.key = key;
        return subscription;
    };
    /**
     * Removes a bulk set of the subscriptions.
     *
     * @param {?string} eventType - Optional name of the event type whose
     *   registered supscriptions to remove, if null remove all subscriptions.
     */
    EventSubscriptionVendor.prototype.removeAllSubscriptions = function removeAllSubscriptions(eventType) {
        if (eventType === undefined) {
            this._subscriptionsForType = {};
        }
        else {
            delete this._subscriptionsForType[eventType];
        }
    };
    /**
     * Removes a specific subscription. Instead of calling this function, call
     * `subscription.remove()` directly.
     *
     * @param {object} subscription
     */
    EventSubscriptionVendor.prototype.removeSubscription = function removeSubscription(subscription) {
        var eventType = subscription.eventType;
        var key = subscription.key;
        var subscriptionsForType = this._subscriptionsForType[eventType];
        if (subscriptionsForType) {
            delete subscriptionsForType[key];
        }
    };
    /**
     * Returns the array of subscriptions that are currently registered for the
     * given event type.
     *
     * Note: This array can be potentially sparse as subscriptions are deleted
     * from it when they are removed.
     *
     * TODO: This returns a nullable array. wat?
     *
     * @param {string} eventType
     * @return {?array}
     */
    EventSubscriptionVendor.prototype.getSubscriptionsForType = function getSubscriptionsForType(eventType) {
        return this._subscriptionsForType[eventType];
    };
    return EventSubscriptionVendor;
})();
var EventSubscriptionVendor_1 = EventSubscriptionVendor;
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */
function makeEmptyFunction(arg) {
    return function () {
        return arg;
    };
}
/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() { };
emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
    return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
    return arg;
};
var emptyFunction_1 = emptyFunction;
function _classCallCheck$3(instance, Constructor) { if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
} }
/**
 * @class BaseEventEmitter
 * @description
 * An EventEmitter is responsible for managing a set of listeners and publishing
 * events to them when it is told that such events happened. In addition to the
 * data for the given event it also sends a event control object which allows
 * the listeners/handlers to prevent the default behavior of the given event.
 *
 * The emitter is designed to be generic enough to support all the different
 * contexts in which one might want to emit events. It is a simple multicast
 * mechanism on top of which extra functionality can be composed. For example, a
 * more advanced emitter may use an EventHolder and EventFactory.
 */
var BaseEventEmitter = (function () {
    /**
     * @constructor
     */
    function BaseEventEmitter() {
        _classCallCheck$3(this, BaseEventEmitter);
        this._subscriber = new EventSubscriptionVendor_1();
        this._currentSubscription = null;
    }
    /**
     * Adds a listener to be invoked when events of the specified type are
     * emitted. An optional calling context may be provided. The data arguments
     * emitted will be passed to the listener function.
     *
     * TODO: Annotate the listener arg's type. This is tricky because listeners
     *       can be invoked with varargs.
     *
     * @param {string} eventType - Name of the event to listen to
     * @param {function} listener - Function to invoke when the specified event is
     *   emitted
     * @param {*} context - Optional context object to use when invoking the
     *   listener
     */
    BaseEventEmitter.prototype.addListener = function addListener$$1(eventType, listener, context) {
        return this._subscriber.addSubscription(eventType, new EmitterSubscription_1(this._subscriber, listener, context));
    };
    /**
     * Similar to addListener, except that the listener is removed after it is
     * invoked once.
     *
     * @param {string} eventType - Name of the event to listen to
     * @param {function} listener - Function to invoke only once when the
     *   specified event is emitted
     * @param {*} context - Optional context object to use when invoking the
     *   listener
     */
    BaseEventEmitter.prototype.once = function once$$1(eventType, listener, context) {
        var emitter = this;
        return this.addListener(eventType, function () {
            emitter.removeCurrentListener();
            listener.apply(context, arguments);
        });
    };
    /**
     * Removes all of the registered listeners, including those registered as
     * listener maps.
     *
     * @param {?string} eventType - Optional name of the event whose registered
     *   listeners to remove
     */
    BaseEventEmitter.prototype.removeAllListeners = function removeAllListeners$$1(eventType) {
        this._subscriber.removeAllSubscriptions(eventType);
    };
    /**
     * Provides an API that can be called during an eventing cycle to remove the
     * last listener that was invoked. This allows a developer to provide an event
     * object that can remove the listener (or listener map) during the
     * invocation.
     *
     * If it is called when not inside of an emitting cycle it will throw.
     *
     * @throws {Error} When called not during an eventing cycle
     *
     * @example
     *   var subscription = emitter.addListenerMap({
     *     someEvent: function(data, event) {
     *       console.log(data);
     *       emitter.removeCurrentListener();
     *     }
     *   });
     *
     *   emitter.emit('someEvent', 'abc'); // logs 'abc'
     *   emitter.emit('someEvent', 'def'); // does not log anything
     */
    BaseEventEmitter.prototype.removeCurrentListener = function removeCurrentListener() {
        !!!this._currentSubscription ? invariant_1(false, 'Not in an emitting cycle; there is no current subscription') : undefined;
        this._subscriber.removeSubscription(this._currentSubscription);
    };
    /**
     * Returns an array of listeners that are currently registered for the given
     * event.
     *
     * @param {string} eventType - Name of the event to query
     * @return {array}
     */
    BaseEventEmitter.prototype.listeners = function listeners(eventType) {
        var subscriptions = this._subscriber.getSubscriptionsForType(eventType);
        return subscriptions ? subscriptions.filter(emptyFunction_1.thatReturnsTrue).map(function (subscription) {
            return subscription.listener;
        }) : [];
    };
    /**
     * Emits an event of the given type with the given data. All handlers of that
     * particular type will be notified.
     *
     * @param {string} eventType - Name of the event to emit
     * @param {*} Arbitrary arguments to be passed to each registered listener
     *
     * @example
     *   emitter.addListener('someEvent', function(message) {
     *     console.log(message);
     *   });
     *
     *   emitter.emit('someEvent', 'abc'); // logs 'abc'
     */
    BaseEventEmitter.prototype.emit = function emit$$1(eventType) {
        var subscriptions = this._subscriber.getSubscriptionsForType(eventType);
        if (subscriptions) {
            var keys = Object.keys(subscriptions);
            for (var ii = 0; ii < keys.length; ii++) {
                var key = keys[ii];
                var subscription = subscriptions[key];
                // The subscription may have been removed during this event loop.
                if (subscription) {
                    this._currentSubscription = subscription;
                    this.__emitToSubscription.apply(this, [subscription].concat(Array.prototype.slice.call(arguments)));
                }
            }
            this._currentSubscription = null;
        }
    };
    /**
     * Provides a hook to override how the emitter emits an event to a specific
     * subscription. This allows you to set up logging and error boundaries
     * specific to your environment.
     *
     * @param {EmitterSubscription} subscription
     * @param {string} eventType
     * @param {*} Arbitrary arguments to be passed to each registered listener
     */
    BaseEventEmitter.prototype.__emitToSubscription = function __emitToSubscription(subscription, eventType) {
        var args = Array.prototype.slice.call(arguments, 2);
        subscription.listener.apply(subscription.context, args);
    };
    return BaseEventEmitter;
})();
var BaseEventEmitter_1 = BaseEventEmitter;
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
var fbemitter = {
    EventEmitter: BaseEventEmitter_1,
    EmitterSubscription: EmitterSubscription_1
};
var fbemitter_1 = fbemitter;
var fbemitter_2 = fbemitter_1.EventEmitter;
var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global$1 !== 'undefined' ? global$1 : typeof self !== 'undefined' ? self : {};
function unwrapExports(x) {
    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x.default : x;
}
function createCommonjsModule(fn, module) {
    return module = { exports: {} }, fn(module, module.exports), module.exports;
}
var postRobot = createCommonjsModule(function (module, exports) {
    !function (root, factory) {
        module.exports = factory();
    }("undefined" != typeof self ? self : commonjsGlobal, function () {
        return function (modules) {
            var installedModules = {};
            function __webpack_require__(moduleId) {
                if (installedModules[moduleId])
                    return installedModules[moduleId].exports;
                var module = installedModules[moduleId] = {
                    i: moduleId,
                    l: !1,
                    exports: {}
                };
                modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
                module.l = !0;
                return module.exports;
            }
            __webpack_require__.m = modules;
            __webpack_require__.c = installedModules;
            __webpack_require__.d = function (exports, name, getter) {
                __webpack_require__.o(exports, name) || Object.defineProperty(exports, name, {
                    configurable: !1,
                    enumerable: !0,
                    get: getter
                });
            };
            __webpack_require__.n = function (module) {
                var getter = module && module.__esModule ? function () {
                    return module.default;
                } : function () {
                    return module;
                };
                __webpack_require__.d(getter, "a", getter);
                return getter;
            };
            __webpack_require__.o = function (object, property) {
                return Object.prototype.hasOwnProperty.call(object, property);
            };
            __webpack_require__.p = "";
            return __webpack_require__(__webpack_require__.s = "./src/index.js");
        }({
            "./node_modules/cross-domain-safe-weakmap/src/index.js": function (module, exports, __webpack_require__) {
                exports.__esModule = !0;
                var _interface = __webpack_require__("./node_modules/cross-domain-safe-weakmap/src/interface.js");
                Object.keys(_interface).forEach(function (key) {
                    "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                        enumerable: !0,
                        get: function () {
                            return _interface[key];
                        }
                    });
                });
                var INTERFACE = function (obj) {
                    if (obj && obj.__esModule)
                        return obj;
                    var newObj = {};
                    if (null != obj)
                        for (var key in obj)
                            Object.prototype.hasOwnProperty.call(obj, key) && (newObj[key] = obj[key]);
                    newObj.default = obj;
                    return newObj;
                }(_interface);
                exports.default = INTERFACE;
            },
            "./node_modules/cross-domain-safe-weakmap/src/interface.js": function (module, exports, __webpack_require__) {
                exports.__esModule = !0;
                var _weakmap = __webpack_require__("./node_modules/cross-domain-safe-weakmap/src/weakmap.js");
                Object.defineProperty(exports, "WeakMap", {
                    enumerable: !0,
                    get: function () {
                        return _weakmap.CrossDomainSafeWeakMap;
                    }
                });
            },
            "./node_modules/cross-domain-safe-weakmap/src/native.js": function (module, exports, __webpack_require__) {
                exports.__esModule = !0;
                exports.hasNativeWeakMap = function () {
                    if (!window.WeakMap)
                        return !1;
                    if (!window.Object.freeze)
                        return !1;
                    try {
                        var testWeakMap = new window.WeakMap(), testKey = {};
                        window.Object.freeze(testKey);
                        testWeakMap.set(testKey, "__testvalue__");
                        return "__testvalue__" === testWeakMap.get(testKey);
                    }
                    catch (err) {
                        return !1;
                    }
                };
            },
            "./node_modules/cross-domain-safe-weakmap/src/util.js": function (module, exports, __webpack_require__) {
                exports.__esModule = !0;
                exports.safeIndexOf = function (collection, item) {
                    for (var i = 0; i < collection.length; i++)
                        try {
                            if (collection[i] === item)
                                return i;
                        }
                        catch (err) { }
                    return -1;
                };
                exports.noop = function () { };
            },
            "./node_modules/cross-domain-safe-weakmap/src/weakmap.js": function (module, exports, __webpack_require__) {
                exports.__esModule = !0;
                exports.CrossDomainSafeWeakMap = void 0;
                var _src = __webpack_require__("./node_modules/cross-domain-utils/src/index.js"), _native = __webpack_require__("./node_modules/cross-domain-safe-weakmap/src/native.js"), _util = __webpack_require__("./node_modules/cross-domain-safe-weakmap/src/util.js");
                var defineProperty = Object.defineProperty, counter = Date.now() % 1e9;
                exports.CrossDomainSafeWeakMap = function () {
                    function CrossDomainSafeWeakMap() {
                        !function (instance, Constructor) {
                            if (!(instance instanceof Constructor))
                                throw new TypeError("Cannot call a class as a function");
                        }(this, CrossDomainSafeWeakMap);
                        counter += 1;
                        this.name = "__weakmap_" + (1e9 * Math.random() >>> 0) + "__" + counter;
                        if ((0, _native.hasNativeWeakMap)())
                            try {
                                this.weakmap = new window.WeakMap();
                            }
                            catch (err) { }
                        this.keys = [];
                        this.values = [];
                    }
                    CrossDomainSafeWeakMap.prototype._cleanupClosedWindows = function () {
                        for (var weakmap = this.weakmap, keys = this.keys, i = 0; i < keys.length; i++) {
                            var value = keys[i];
                            if ((0, _src.isWindow)(value) && (0, _src.isWindowClosed)(value)) {
                                if (weakmap)
                                    try {
                                        weakmap.delete(value);
                                    }
                                    catch (err) { }
                                keys.splice(i, 1);
                                this.values.splice(i, 1);
                                i -= 1;
                            }
                        }
                    };
                    CrossDomainSafeWeakMap.prototype.isSafeToReadWrite = function (key) {
                        if ((0, _src.isWindow)(key))
                            return !1;
                        try {
                            (0, _util.noop)(key && key.self);
                            (0, _util.noop)(key && key[this.name]);
                        }
                        catch (err) {
                            return !1;
                        }
                        return !0;
                    };
                    CrossDomainSafeWeakMap.prototype.set = function (key, value) {
                        if (!key)
                            throw new Error("WeakMap expected key");
                        var weakmap = this.weakmap;
                        if (weakmap)
                            try {
                                weakmap.set(key, value);
                            }
                            catch (err) {
                                delete this.weakmap;
                            }
                        if (this.isSafeToReadWrite(key)) {
                            var name = this.name, entry = key[name];
                            entry && entry[0] === key ? entry[1] = value : defineProperty(key, name, {
                                value: [key, value],
                                writable: !0
                            });
                        }
                        else {
                            this._cleanupClosedWindows();
                            var keys = this.keys, values = this.values, index = (0, _util.safeIndexOf)(keys, key);
                            if (-1 === index) {
                                keys.push(key);
                                values.push(value);
                            }
                            else
                                values[index] = value;
                        }
                    };
                    CrossDomainSafeWeakMap.prototype.get = function (key) {
                        if (!key)
                            throw new Error("WeakMap expected key");
                        var weakmap = this.weakmap;
                        if (weakmap)
                            try {
                                if (weakmap.has(key))
                                    return weakmap.get(key);
                            }
                            catch (err) {
                                delete this.weakmap;
                            }
                        if (!this.isSafeToReadWrite(key)) {
                            this._cleanupClosedWindows();
                            var keys = this.keys, index = (0, _util.safeIndexOf)(keys, key);
                            if (-1 === index)
                                return;
                            return this.values[index];
                        }
                        var entry = key[this.name];
                        if (entry && entry[0] === key)
                            return entry[1];
                    };
                    CrossDomainSafeWeakMap.prototype.delete = function (key) {
                        if (!key)
                            throw new Error("WeakMap expected key");
                        var weakmap = this.weakmap;
                        if (weakmap)
                            try {
                                weakmap.delete(key);
                            }
                            catch (err) {
                                delete this.weakmap;
                            }
                        if (this.isSafeToReadWrite(key)) {
                            var entry = key[this.name];
                            entry && entry[0] === key && (entry[0] = entry[1] = void 0);
                        }
                        else {
                            this._cleanupClosedWindows();
                            var keys = this.keys, index = (0, _util.safeIndexOf)(keys, key);
                            if (-1 !== index) {
                                keys.splice(index, 1);
                                this.values.splice(index, 1);
                            }
                        }
                    };
                    CrossDomainSafeWeakMap.prototype.has = function (key) {
                        if (!key)
                            throw new Error("WeakMap expected key");
                        var weakmap = this.weakmap;
                        if (weakmap)
                            try {
                                return weakmap.has(key);
                            }
                            catch (err) {
                                delete this.weakmap;
                            }
                        if (this.isSafeToReadWrite(key)) {
                            var entry = key[this.name];
                            return !(!entry || entry[0] !== key);
                        }
                        this._cleanupClosedWindows();
                        return -1 !== (0, _util.safeIndexOf)(this.keys, key);
                    };
                    return CrossDomainSafeWeakMap;
                }();
            },
            "./node_modules/cross-domain-utils/src/index.js": function (module, exports, __webpack_require__) {
                exports.__esModule = !0;
                var _utils = __webpack_require__("./node_modules/cross-domain-utils/src/utils.js");
                Object.keys(_utils).forEach(function (key) {
                    "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                        enumerable: !0,
                        get: function () {
                            return _utils[key];
                        }
                    });
                });
                var _types = __webpack_require__("./node_modules/cross-domain-utils/src/types.js");
                Object.keys(_types).forEach(function (key) {
                    "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                        enumerable: !0,
                        get: function () {
                            return _types[key];
                        }
                    });
                });
            },
            "./node_modules/cross-domain-utils/src/types.js": function (module, exports, __webpack_require__) {
            },
            "./node_modules/cross-domain-utils/src/util.js": function (module, exports, __webpack_require__) {
                exports.__esModule = !0;
                exports.isRegex = function (item) {
                    return "[object RegExp]" === Object.prototype.toString.call(item);
                };
                exports.noop = function () { };
            },
            "./node_modules/cross-domain-utils/src/utils.js": function (module, exports, __webpack_require__) {
                exports.__esModule = !0;
                exports.isFileProtocol = function () {
                    return (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window).location.protocol === CONSTANTS.FILE_PROTOCOL;
                };
                exports.isAboutProtocol = isAboutProtocol;
                exports.getParent = getParent;
                exports.getOpener = getOpener;
                exports.canReadFromWindow = canReadFromWindow;
                exports.getActualDomain = getActualDomain;
                exports.getDomain = getDomain;
                exports.isBlankDomain = function (win) {
                    try {
                        if (!win.location.href)
                            return !0;
                        if ("about:blank" === win.location.href)
                            return !0;
                    }
                    catch (err) { }
                    return !1;
                };
                exports.isActuallySameDomain = isActuallySameDomain;
                exports.isSameDomain = isSameDomain;
                exports.getParents = getParents;
                exports.isAncestorParent = isAncestorParent;
                exports.getFrames = getFrames;
                exports.getAllChildFrames = getAllChildFrames;
                exports.getTop = getTop;
                exports.getAllFramesInWindow = getAllFramesInWindow;
                exports.isTop = function (win) {
                    return win === getTop(win);
                };
                exports.isFrameWindowClosed = isFrameWindowClosed;
                exports.isWindowClosed = isWindowClosed;
                exports.linkFrameWindow = function (frame) {
                    !function () {
                        for (var i = 0; i < iframeFrames.length; i++)
                            if (isFrameWindowClosed(iframeFrames[i])) {
                                iframeFrames.splice(i, 1);
                                iframeWindows.splice(i, 1);
                            }
                        for (var _i5 = 0; _i5 < iframeWindows.length; _i5++)
                            if (isWindowClosed(iframeWindows[_i5])) {
                                iframeFrames.splice(_i5, 1);
                                iframeWindows.splice(_i5, 1);
                            }
                    }();
                    if (frame && frame.contentWindow)
                        try {
                            iframeWindows.push(frame.contentWindow);
                            iframeFrames.push(frame);
                        }
                        catch (err) { }
                };
                exports.getUserAgent = function (win) {
                    return (win = win || window).navigator.mockUserAgent || win.navigator.userAgent;
                };
                exports.getFrameByName = getFrameByName;
                exports.findChildFrameByName = findChildFrameByName;
                exports.findFrameByName = function (win, name) {
                    var frame = void 0;
                    if (frame = getFrameByName(win, name))
                        return frame;
                    return findChildFrameByName(getTop(win) || win, name);
                };
                exports.isParent = function (win, frame) {
                    var frameParent = getParent(frame);
                    if (frameParent)
                        return frameParent === win;
                    for (var _iterator6 = getFrames(win), _isArray6 = Array.isArray(_iterator6), _i8 = 0, _iterator6 = _isArray6 ? _iterator6 : _iterator6[Symbol.iterator]();;) {
                        var _ref6;
                        if (_isArray6) {
                            if (_i8 >= _iterator6.length)
                                break;
                            _ref6 = _iterator6[_i8++];
                        }
                        else {
                            if ((_i8 = _iterator6.next()).done)
                                break;
                            _ref6 = _i8.value;
                        }
                        var childFrame = _ref6;
                        if (childFrame === frame)
                            return !0;
                    }
                    return !1;
                };
                exports.isOpener = function (parent, child) {
                    return parent === getOpener(child);
                };
                exports.getAncestor = getAncestor;
                exports.getAncestors = function (win) {
                    var results = [], ancestor = win;
                    for (; ancestor;)
                        (ancestor = getAncestor(ancestor)) && results.push(ancestor);
                    return results;
                };
                exports.isAncestor = function (parent, child) {
                    var actualParent = getAncestor(child);
                    if (actualParent)
                        return actualParent === parent;
                    if (child === parent)
                        return !1;
                    if (getTop(child) === child)
                        return !1;
                    for (var _iterator7 = getFrames(parent), _isArray7 = Array.isArray(_iterator7), _i9 = 0, _iterator7 = _isArray7 ? _iterator7 : _iterator7[Symbol.iterator]();;) {
                        var _ref7;
                        if (_isArray7) {
                            if (_i9 >= _iterator7.length)
                                break;
                            _ref7 = _iterator7[_i9++];
                        }
                        else {
                            if ((_i9 = _iterator7.next()).done)
                                break;
                            _ref7 = _i9.value;
                        }
                        var frame = _ref7;
                        if (frame === child)
                            return !0;
                    }
                    return !1;
                };
                exports.isPopup = isPopup;
                exports.isIframe = isIframe;
                exports.isFullpage = function () {
                    return Boolean(!isIframe() && !isPopup());
                };
                exports.getDistanceFromTop = getDistanceFromTop;
                exports.getNthParent = getNthParent;
                exports.getNthParentFromTop = function (win) {
                    var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
                    return getNthParent(win, getDistanceFromTop(win) - n);
                };
                exports.isSameTopWindow = function (win1, win2) {
                    var top1 = getTop(win1) || win1, top2 = getTop(win2) || win2;
                    try {
                        if (top1 && top2)
                            return top1 === top2;
                    }
                    catch (err) { }
                    var allFrames1 = getAllFramesInWindow(win1), allFrames2 = getAllFramesInWindow(win2);
                    if (anyMatch(allFrames1, allFrames2))
                        return !0;
                    var opener1 = getOpener(top1), opener2 = getOpener(top2);
                    if (opener1 && anyMatch(getAllFramesInWindow(opener1), allFrames2))
                        return !1;
                    if (opener2 && anyMatch(getAllFramesInWindow(opener2), allFrames1))
                        return !1;
                    return !1;
                };
                exports.matchDomain = function matchDomain(pattern, origin) {
                    if ("string" == typeof pattern) {
                        if ("string" == typeof origin)
                            return pattern === CONSTANTS.WILDCARD || origin === pattern;
                        if ((0, _util.isRegex)(origin))
                            return !1;
                        if (Array.isArray(origin))
                            return !1;
                    }
                    if ((0, _util.isRegex)(pattern))
                        return (0, _util.isRegex)(origin) ? pattern.toString() === origin.toString() : !Array.isArray(origin) && Boolean(origin.match(pattern));
                    if (Array.isArray(pattern))
                        return Array.isArray(origin) ? JSON.stringify(pattern) === JSON.stringify(origin) : !(0, _util.isRegex)(origin) && pattern.some(function (subpattern) {
                            return matchDomain(subpattern, origin);
                        });
                    return !1;
                };
                exports.stringifyDomainPattern = function (pattern) {
                    return Array.isArray(pattern) ? "(" + pattern.join(" | ") + ")" : (0, _util.isRegex)(pattern) ? "RegExp(" + pattern.toString() : pattern.toString();
                };
                exports.getDomainFromUrl = function (url) {
                    var domain = void 0;
                    if (!url.match(/^(https?|mock|file):\/\//))
                        return getDomain();
                    domain = url;
                    return domain = domain.split("/").slice(0, 3).join("/");
                };
                exports.onCloseWindow = function (win, callback) {
                    var delay = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1e3, maxtime = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1 / 0, timeout = void 0;
                    !function check() {
                        if (isWindowClosed(win)) {
                            timeout && clearTimeout(timeout);
                            return callback();
                        }
                        if (maxtime <= 0)
                            clearTimeout(timeout);
                        else {
                            maxtime -= delay;
                            timeout = setTimeout(check, delay);
                        }
                    }();
                    return {
                        cancel: function () {
                            timeout && clearTimeout(timeout);
                        }
                    };
                };
                exports.isWindow = function (obj) {
                    try {
                        if (obj === window)
                            return !0;
                    }
                    catch (err) {
                        if (err && err.message === IE_WIN_ACCESS_ERROR)
                            return !0;
                    }
                    try {
                        if ("[object Window]" === Object.prototype.toString.call(obj))
                            return !0;
                    }
                    catch (err) {
                        if (err && err.message === IE_WIN_ACCESS_ERROR)
                            return !0;
                    }
                    try {
                        if (window.Window && obj instanceof window.Window)
                            return !0;
                    }
                    catch (err) {
                        if (err && err.message === IE_WIN_ACCESS_ERROR)
                            return !0;
                    }
                    try {
                        if (obj && obj.self === obj)
                            return !0;
                    }
                    catch (err) {
                        if (err && err.message === IE_WIN_ACCESS_ERROR)
                            return !0;
                    }
                    try {
                        if (obj && obj.parent === obj)
                            return !0;
                    }
                    catch (err) {
                        if (err && err.message === IE_WIN_ACCESS_ERROR)
                            return !0;
                    }
                    try {
                        if (obj && obj.top === obj)
                            return !0;
                    }
                    catch (err) {
                        if (err && err.message === IE_WIN_ACCESS_ERROR)
                            return !0;
                    }
                    try {
                        (0, _util.noop)(obj == obj);
                    }
                    catch (err) {
                        return !0;
                    }
                    try {
                        (0, _util.noop)(obj && obj.__cross_domain_utils_window_check__);
                    }
                    catch (err) {
                        return !0;
                    }
                    return !1;
                };
                var _util = __webpack_require__("./node_modules/cross-domain-utils/src/util.js"), CONSTANTS = {
                    MOCK_PROTOCOL: "mock:",
                    FILE_PROTOCOL: "file:",
                    ABOUT_PROTOCOL: "about:",
                    WILDCARD: "*"
                }, IE_WIN_ACCESS_ERROR = "Call was rejected by callee.\r\n";
                function isAboutProtocol() {
                    return (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window).location.protocol === CONSTANTS.ABOUT_PROTOCOL;
                }
                function getParent(win) {
                    if (win)
                        try {
                            if (win.parent && win.parent !== win)
                                return win.parent;
                        }
                        catch (err) { }
                }
                function getOpener(win) {
                    if (win && !getParent(win))
                        try {
                            return win.opener;
                        }
                        catch (err) { }
                }
                function canReadFromWindow(win) {
                    try {
                        (0, _util.noop)(win && win.location && win.location.href);
                        return !0;
                    }
                    catch (err) { }
                    return !1;
                }
                function getActualDomain(win) {
                    var location = win.location;
                    if (!location)
                        throw new Error("Can not read window location");
                    var protocol = location.protocol;
                    if (!protocol)
                        throw new Error("Can not read window protocol");
                    if (protocol === CONSTANTS.FILE_PROTOCOL)
                        return CONSTANTS.FILE_PROTOCOL + "//";
                    if (protocol === CONSTANTS.ABOUT_PROTOCOL) {
                        var parent = getParent(win);
                        return parent && canReadFromWindow(win) ? getActualDomain(parent) : CONSTANTS.ABOUT_PROTOCOL + "//";
                    }
                    var host = location.host;
                    if (!host)
                        throw new Error("Can not read window host");
                    return protocol + "//" + host;
                }
                function getDomain(win) {
                    var domain = getActualDomain(win = win || window);
                    return domain && win.mockDomain && 0 === win.mockDomain.indexOf(CONSTANTS.MOCK_PROTOCOL) ? win.mockDomain : domain;
                }
                function isActuallySameDomain(win) {
                    try {
                        if (win === window)
                            return !0;
                    }
                    catch (err) { }
                    try {
                        var desc = Object.getOwnPropertyDescriptor(win, "location");
                        if (desc && !1 === desc.enumerable)
                            return !1;
                    }
                    catch (err) { }
                    try {
                        if (isAboutProtocol(win) && canReadFromWindow(win))
                            return !0;
                    }
                    catch (err) { }
                    try {
                        if (getActualDomain(win) === getActualDomain(window))
                            return !0;
                    }
                    catch (err) { }
                    return !1;
                }
                function isSameDomain(win) {
                    if (!isActuallySameDomain(win))
                        return !1;
                    try {
                        if (win === window)
                            return !0;
                        if (isAboutProtocol(win) && canReadFromWindow(win))
                            return !0;
                        if (getDomain(window) === getDomain(win))
                            return !0;
                    }
                    catch (err) { }
                    return !1;
                }
                function getParents(win) {
                    var result = [];
                    try {
                        for (; win.parent !== win;) {
                            result.push(win.parent);
                            win = win.parent;
                        }
                    }
                    catch (err) { }
                    return result;
                }
                function isAncestorParent(parent, child) {
                    if (!parent || !child)
                        return !1;
                    var childParent = getParent(child);
                    return childParent ? childParent === parent : -1 !== getParents(child).indexOf(parent);
                }
                function getFrames(win) {
                    var result = [], frames = void 0;
                    try {
                        frames = win.frames;
                    }
                    catch (err) {
                        frames = win;
                    }
                    var len = void 0;
                    try {
                        len = frames.length;
                    }
                    catch (err) { }
                    if (0 === len)
                        return result;
                    if (len) {
                        for (var i = 0; i < len; i++) {
                            var frame = void 0;
                            try {
                                frame = frames[i];
                            }
                            catch (err) {
                                continue;
                            }
                            result.push(frame);
                        }
                        return result;
                    }
                    for (var _i = 0; _i < 100; _i++) {
                        var _frame = void 0;
                        try {
                            _frame = frames[_i];
                        }
                        catch (err) {
                            return result;
                        }
                        if (!_frame)
                            return result;
                        result.push(_frame);
                    }
                    return result;
                }
                function getAllChildFrames(win) {
                    var result = [], _iterator = getFrames(win), _isArray = Array.isArray(_iterator), _i2 = 0;
                    for (_iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
                        var _ref;
                        if (_isArray) {
                            if (_i2 >= _iterator.length)
                                break;
                            _ref = _iterator[_i2++];
                        }
                        else {
                            if ((_i2 = _iterator.next()).done)
                                break;
                            _ref = _i2.value;
                        }
                        var frame = _ref;
                        result.push(frame);
                        var _iterator2 = getAllChildFrames(frame), _isArray2 = Array.isArray(_iterator2), _i3 = 0;
                        for (_iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
                            var _ref2;
                            if (_isArray2) {
                                if (_i3 >= _iterator2.length)
                                    break;
                                _ref2 = _iterator2[_i3++];
                            }
                            else {
                                if ((_i3 = _iterator2.next()).done)
                                    break;
                                _ref2 = _i3.value;
                            }
                            var childFrame = _ref2;
                            result.push(childFrame);
                        }
                    }
                    return result;
                }
                function getTop(win) {
                    if (win) {
                        try {
                            if (win.top)
                                return win.top;
                        }
                        catch (err) { }
                        if (getParent(win) === win)
                            return win;
                        try {
                            if (isAncestorParent(window, win) && window.top)
                                return window.top;
                        }
                        catch (err) { }
                        try {
                            if (isAncestorParent(win, window) && window.top)
                                return window.top;
                        }
                        catch (err) { }
                        var _iterator3 = getAllChildFrames(win), _isArray3 = Array.isArray(_iterator3), _i4 = 0;
                        for (_iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
                            var _ref3;
                            if (_isArray3) {
                                if (_i4 >= _iterator3.length)
                                    break;
                                _ref3 = _iterator3[_i4++];
                            }
                            else {
                                if ((_i4 = _iterator3.next()).done)
                                    break;
                                _ref3 = _i4.value;
                            }
                            var frame = _ref3;
                            try {
                                if (frame.top)
                                    return frame.top;
                            }
                            catch (err) { }
                            if (getParent(frame) === frame)
                                return frame;
                        }
                    }
                }
                function getAllFramesInWindow(win) {
                    var top = getTop(win);
                    return getAllChildFrames(top).concat(top);
                }
                function isFrameWindowClosed(frame) {
                    if (!frame.contentWindow)
                        return !0;
                    if (!frame.parentNode)
                        return !0;
                    var doc = frame.ownerDocument;
                    return !(!doc || !doc.body || doc.body.contains(frame));
                }
                var iframeWindows = [], iframeFrames = [];
                function isWindowClosed(win) {
                    var allowMock = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                    try {
                        if (win === window)
                            return !1;
                    }
                    catch (err) {
                        return !0;
                    }
                    try {
                        if (!win)
                            return !0;
                    }
                    catch (err) {
                        return !0;
                    }
                    try {
                        if (win.closed)
                            return !0;
                    }
                    catch (err) {
                        return !err || err.message !== IE_WIN_ACCESS_ERROR;
                    }
                    if (allowMock && isSameDomain(win))
                        try {
                            if (win.mockclosed)
                                return !0;
                        }
                        catch (err) { }
                    try {
                        if (!win.parent || !win.top)
                            return !0;
                    }
                    catch (err) { }
                    try {
                        (0, _util.noop)(win == win);
                    }
                    catch (err) {
                        return !0;
                    }
                    var iframeIndex = function (collection, item) {
                        for (var i = 0; i < collection.length; i++)
                            try {
                                if (collection[i] === item)
                                    return i;
                            }
                            catch (err) { }
                        return -1;
                    }(iframeWindows, win);
                    if (-1 !== iframeIndex) {
                        var frame = iframeFrames[iframeIndex];
                        if (frame && isFrameWindowClosed(frame))
                            return !0;
                    }
                    return !1;
                }
                function getFrameByName(win, name) {
                    var winFrames = getFrames(win), _iterator4 = winFrames, _isArray4 = Array.isArray(_iterator4), _i6 = 0;
                    for (_iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
                        var _ref4;
                        if (_isArray4) {
                            if (_i6 >= _iterator4.length)
                                break;
                            _ref4 = _iterator4[_i6++];
                        }
                        else {
                            if ((_i6 = _iterator4.next()).done)
                                break;
                            _ref4 = _i6.value;
                        }
                        var childFrame = _ref4;
                        try {
                            if (isSameDomain(childFrame) && childFrame.name === name && -1 !== winFrames.indexOf(childFrame))
                                return childFrame;
                        }
                        catch (err) { }
                    }
                    try {
                        if (-1 !== winFrames.indexOf(win.frames[name]))
                            return win.frames[name];
                    }
                    catch (err) { }
                    try {
                        if (-1 !== winFrames.indexOf(win[name]))
                            return win[name];
                    }
                    catch (err) { }
                }
                function findChildFrameByName(win, name) {
                    var frame = getFrameByName(win, name);
                    if (frame)
                        return frame;
                    var _iterator5 = getFrames(win), _isArray5 = Array.isArray(_iterator5), _i7 = 0;
                    for (_iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator]();;) {
                        var _ref5;
                        if (_isArray5) {
                            if (_i7 >= _iterator5.length)
                                break;
                            _ref5 = _iterator5[_i7++];
                        }
                        else {
                            if ((_i7 = _iterator5.next()).done)
                                break;
                            _ref5 = _i7.value;
                        }
                        var namedFrame = findChildFrameByName(_ref5, name);
                        if (namedFrame)
                            return namedFrame;
                    }
                }
                function getAncestor(win) {
                    var opener = getOpener(win = win || window);
                    if (opener)
                        return opener;
                    var parent = getParent(win);
                    return parent || void 0;
                }
                function isPopup() {
                    return Boolean(getOpener(window));
                }
                function isIframe() {
                    return Boolean(getParent(window));
                }
                function anyMatch(collection1, collection2) {
                    var _iterator8 = collection1, _isArray8 = Array.isArray(_iterator8), _i10 = 0;
                    for (_iterator8 = _isArray8 ? _iterator8 : _iterator8[Symbol.iterator]();;) {
                        var _ref8;
                        if (_isArray8) {
                            if (_i10 >= _iterator8.length)
                                break;
                            _ref8 = _iterator8[_i10++];
                        }
                        else {
                            if ((_i10 = _iterator8.next()).done)
                                break;
                            _ref8 = _i10.value;
                        }
                        var item1 = _ref8, _iterator9 = collection2, _isArray9 = Array.isArray(_iterator9), _i11 = 0;
                        for (_iterator9 = _isArray9 ? _iterator9 : _iterator9[Symbol.iterator]();;) {
                            var _ref9;
                            if (_isArray9) {
                                if (_i11 >= _iterator9.length)
                                    break;
                                _ref9 = _iterator9[_i11++];
                            }
                            else {
                                if ((_i11 = _iterator9.next()).done)
                                    break;
                                _ref9 = _i11.value;
                            }
                            if (item1 === _ref9)
                                return !0;
                        }
                    }
                    return !1;
                }
                function getDistanceFromTop() {
                    for (var distance = 0, parent = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window; parent;)
                        (parent = getParent(parent)) && (distance += 1);
                    return distance;
                }
                function getNthParent(win) {
                    for (var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1, parent = win, i = 0; i < n; i++) {
                        if (!parent)
                            return;
                        parent = getParent(parent);
                    }
                    return parent;
                }
            },
            "./node_modules/webpack/buildin/global.js": function (module, exports, __webpack_require__) {
                var g, _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
                    return typeof obj;
                } : function (obj) {
                    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
                };
                g = function () {
                    return this;
                }();
                try {
                    g = g || Function("return this")() || (0, eval)("this");
                }
                catch (e) {
                    "object" === ("undefined" == typeof window ? "undefined" : _typeof(window)) && (g = window);
                }
                module.exports = g;
            },
            "./node_modules/zalgo-promise/src/exceptions.js": function (module, exports, __webpack_require__) {
                exports.__esModule = !0;
                exports.dispatchPossiblyUnhandledError = function (err) {
                    if (-1 !== (0, _global.getGlobal)().dispatchedErrors.indexOf(err))
                        return;
                    (0, _global.getGlobal)().dispatchedErrors.push(err);
                    setTimeout(function () {
                        throw err;
                    }, 1);
                    for (var j = 0; j < (0, _global.getGlobal)().possiblyUnhandledPromiseHandlers.length; j++)
                        (0, _global.getGlobal)().possiblyUnhandledPromiseHandlers[j](err);
                };
                exports.onPossiblyUnhandledException = function (handler) {
                    (0, _global.getGlobal)().possiblyUnhandledPromiseHandlers.push(handler);
                    return {
                        cancel: function () {
                            (0, _global.getGlobal)().possiblyUnhandledPromiseHandlers.splice((0, _global.getGlobal)().possiblyUnhandledPromiseHandlers.indexOf(handler), 1);
                        }
                    };
                };
                var _global = __webpack_require__("./node_modules/zalgo-promise/src/global.js");
            },
            "./node_modules/zalgo-promise/src/global.js": function (module, exports, __webpack_require__) {
                (function (global) {
                    exports.__esModule = !0;
                    exports.getGlobal = function () {
                        var glob = void 0;
                        if ("undefined" != typeof window)
                            glob = window;
                        else {
                            if (void 0 === global)
                                throw new TypeError("Can not find global");
                            glob = global;
                        }
                        var zalgoGlobal = glob.__zalgopromise__ = glob.__zalgopromise__ || {};
                        zalgoGlobal.flushPromises = zalgoGlobal.flushPromises || [];
                        zalgoGlobal.activeCount = zalgoGlobal.activeCount || 0;
                        zalgoGlobal.possiblyUnhandledPromiseHandlers = zalgoGlobal.possiblyUnhandledPromiseHandlers || [];
                        zalgoGlobal.dispatchedErrors = zalgoGlobal.dispatchedErrors || [];
                        return zalgoGlobal;
                    };
                }).call(exports, __webpack_require__("./node_modules/webpack/buildin/global.js"));
            },
            "./node_modules/zalgo-promise/src/index.js": function (module, exports, __webpack_require__) {
                exports.__esModule = !0;
                var _promise = __webpack_require__("./node_modules/zalgo-promise/src/promise.js");
                Object.defineProperty(exports, "ZalgoPromise", {
                    enumerable: !0,
                    get: function () {
                        return _promise.ZalgoPromise;
                    }
                });
            },
            "./node_modules/zalgo-promise/src/promise.js": function (module, exports, __webpack_require__) {
                exports.__esModule = !0;
                exports.ZalgoPromise = void 0;
                var _utils = __webpack_require__("./node_modules/zalgo-promise/src/utils.js"), _exceptions = __webpack_require__("./node_modules/zalgo-promise/src/exceptions.js"), _global = __webpack_require__("./node_modules/zalgo-promise/src/global.js");
                var ZalgoPromise = function () {
                    function ZalgoPromise(handler) {
                        var _this = this;
                        !function (instance, Constructor) {
                            if (!(instance instanceof Constructor))
                                throw new TypeError("Cannot call a class as a function");
                        }(this, ZalgoPromise);
                        this.resolved = !1;
                        this.rejected = !1;
                        this.errorHandled = !1;
                        this.handlers = [];
                        if (handler) {
                            var _result = void 0, _error = void 0, resolved = !1, rejected = !1, isAsync = !1;
                            try {
                                handler(function (res) {
                                    if (isAsync)
                                        _this.resolve(res);
                                    else {
                                        resolved = !0;
                                        _result = res;
                                    }
                                }, function (err) {
                                    if (isAsync)
                                        _this.reject(err);
                                    else {
                                        rejected = !0;
                                        _error = err;
                                    }
                                });
                            }
                            catch (err) {
                                this.reject(err);
                                return;
                            }
                            isAsync = !0;
                            resolved ? this.resolve(_result) : rejected && this.reject(_error);
                        }
                    }
                    ZalgoPromise.prototype.resolve = function (result) {
                        if (this.resolved || this.rejected)
                            return this;
                        if ((0, _utils.isPromise)(result))
                            throw new Error("Can not resolve promise with another promise");
                        this.resolved = !0;
                        this.value = result;
                        this.dispatch();
                        return this;
                    };
                    ZalgoPromise.prototype.reject = function (error) {
                        var _this2 = this;
                        if (this.resolved || this.rejected)
                            return this;
                        if ((0, _utils.isPromise)(error))
                            throw new Error("Can not reject promise with another promise");
                        if (!error) {
                            var _err = error && "function" == typeof error.toString ? error.toString() : Object.prototype.toString.call(error);
                            error = new Error("Expected reject to be called with Error, got " + _err);
                        }
                        this.rejected = !0;
                        this.error = error;
                        this.errorHandled || setTimeout(function () {
                            _this2.errorHandled || (0, _exceptions.dispatchPossiblyUnhandledError)(error);
                        }, 1);
                        this.dispatch();
                        return this;
                    };
                    ZalgoPromise.prototype.asyncReject = function (error) {
                        this.errorHandled = !0;
                        this.reject(error);
                    };
                    ZalgoPromise.prototype.dispatch = function () {
                        var _this3 = this, dispatching = this.dispatching, resolved = this.resolved, rejected = this.rejected, handlers = this.handlers;
                        if (!dispatching && (resolved || rejected)) {
                            this.dispatching = !0;
                            (0, _global.getGlobal)().activeCount += 1;
                            for (var _loop = function (i) {
                                var _handlers$i = handlers[i], onSuccess = _handlers$i.onSuccess, onError = _handlers$i.onError, promise = _handlers$i.promise, result = void 0;
                                if (resolved)
                                    try {
                                        result = onSuccess ? onSuccess(_this3.value) : _this3.value;
                                    }
                                    catch (err) {
                                        promise.reject(err);
                                        return "continue";
                                    }
                                else if (rejected) {
                                    if (!onError) {
                                        promise.reject(_this3.error);
                                        return "continue";
                                    }
                                    try {
                                        result = onError(_this3.error);
                                    }
                                    catch (err) {
                                        promise.reject(err);
                                        return "continue";
                                    }
                                }
                                if (result instanceof ZalgoPromise && (result.resolved || result.rejected)) {
                                    result.resolved ? promise.resolve(result.value) : promise.reject(result.error);
                                    result.errorHandled = !0;
                                }
                                else
                                    (0, _utils.isPromise)(result) ? result instanceof ZalgoPromise && (result.resolved || result.rejected) ? result.resolved ? promise.resolve(result.value) : promise.reject(result.error) : result.then(function (res) {
                                        promise.resolve(res);
                                    }, function (err) {
                                        promise.reject(err);
                                    }) : promise.resolve(result);
                            }, i = 0; i < handlers.length; i++)
                                _loop(i);
                            handlers.length = 0;
                            this.dispatching = !1;
                            (0, _global.getGlobal)().activeCount -= 1;
                            0 === (0, _global.getGlobal)().activeCount && ZalgoPromise.flushQueue();
                        }
                    };
                    ZalgoPromise.prototype.then = function (onSuccess, onError) {
                        if (onSuccess && "function" != typeof onSuccess && !onSuccess.call)
                            throw new Error("Promise.then expected a function for success handler");
                        if (onError && "function" != typeof onError && !onError.call)
                            throw new Error("Promise.then expected a function for error handler");
                        var promise = new ZalgoPromise();
                        this.handlers.push({
                            promise: promise,
                            onSuccess: onSuccess,
                            onError: onError
                        });
                        this.errorHandled = !0;
                        this.dispatch();
                        return promise;
                    };
                    ZalgoPromise.prototype.catch = function (onError) {
                        return this.then(void 0, onError);
                    };
                    ZalgoPromise.prototype.finally = function (handler) {
                        return this.then(function (result) {
                            return ZalgoPromise.try(handler).then(function () {
                                return result;
                            });
                        }, function (err) {
                            return ZalgoPromise.try(handler).then(function () {
                                throw err;
                            });
                        });
                    };
                    ZalgoPromise.prototype.timeout = function (time, err) {
                        var _this4 = this;
                        if (this.resolved || this.rejected)
                            return this;
                        var timeout = setTimeout(function () {
                            _this4.resolved || _this4.rejected || _this4.reject(err || new Error("Promise timed out after " + time + "ms"));
                        }, time);
                        return this.then(function (result) {
                            clearTimeout(timeout);
                            return result;
                        });
                    };
                    ZalgoPromise.prototype.toPromise = function () {
                        if ("undefined" == typeof Promise)
                            throw new TypeError("Could not find Promise");
                        return Promise.resolve(this);
                    };
                    ZalgoPromise.resolve = function (value) {
                        return value instanceof ZalgoPromise ? value : (0, _utils.isPromise)(value) ? new ZalgoPromise(function (resolve, reject) {
                            return value.then(resolve, reject);
                        }) : new ZalgoPromise().resolve(value);
                    };
                    ZalgoPromise.reject = function (error) {
                        return new ZalgoPromise().reject(error);
                    };
                    ZalgoPromise.all = function (promises) {
                        var promise = new ZalgoPromise(), count = promises.length, results = [];
                        if (!count) {
                            promise.resolve(results);
                            return promise;
                        }
                        for (var _loop2 = function (i) {
                            var prom = promises[i];
                            if (prom instanceof ZalgoPromise) {
                                if (prom.resolved) {
                                    results[i] = prom.value;
                                    count -= 1;
                                    return "continue";
                                }
                            }
                            else if (!(0, _utils.isPromise)(prom)) {
                                results[i] = prom;
                                count -= 1;
                                return "continue";
                            }
                            ZalgoPromise.resolve(prom).then(function (result) {
                                results[i] = result;
                                0 === (count -= 1) && promise.resolve(results);
                            }, function (err) {
                                promise.reject(err);
                            });
                        }, i = 0; i < promises.length; i++)
                            _loop2(i);
                        0 === count && promise.resolve(results);
                        return promise;
                    };
                    ZalgoPromise.hash = function (promises) {
                        var result = {};
                        return ZalgoPromise.all(Object.keys(promises).map(function (key) {
                            return ZalgoPromise.resolve(promises[key]).then(function (value) {
                                result[key] = value;
                            });
                        })).then(function () {
                            return result;
                        });
                    };
                    ZalgoPromise.map = function (items, method) {
                        return ZalgoPromise.all(items.map(method));
                    };
                    ZalgoPromise.onPossiblyUnhandledException = function (handler) {
                        return (0, _exceptions.onPossiblyUnhandledException)(handler);
                    };
                    ZalgoPromise.try = function (method, context, args) {
                        var result = void 0;
                        try {
                            result = method.apply(context, args || []);
                        }
                        catch (err) {
                            return ZalgoPromise.reject(err);
                        }
                        return ZalgoPromise.resolve(result);
                    };
                    ZalgoPromise.delay = function (_delay) {
                        return new ZalgoPromise(function (resolve) {
                            setTimeout(resolve, _delay);
                        });
                    };
                    ZalgoPromise.isPromise = function (value) {
                        return !!(value && value instanceof ZalgoPromise) || (0, _utils.isPromise)(value);
                    };
                    ZalgoPromise.flush = function () {
                        var promise = new ZalgoPromise();
                        (0, _global.getGlobal)().flushPromises.push(promise);
                        0 === (0, _global.getGlobal)().activeCount && ZalgoPromise.flushQueue();
                        return promise;
                    };
                    ZalgoPromise.flushQueue = function () {
                        var promisesToFlush = (0, _global.getGlobal)().flushPromises;
                        (0, _global.getGlobal)().flushPromises = [];
                        var _iterator = promisesToFlush, _isArray = Array.isArray(_iterator), _i = 0;
                        for (_iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
                            var _ref;
                            if (_isArray) {
                                if (_i >= _iterator.length)
                                    break;
                                _ref = _iterator[_i++];
                            }
                            else {
                                if ((_i = _iterator.next()).done)
                                    break;
                                _ref = _i.value;
                            }
                            _ref.resolve();
                        }
                    };
                    return ZalgoPromise;
                }();
                exports.ZalgoPromise = ZalgoPromise;
            },
            "./node_modules/zalgo-promise/src/utils.js": function (module, exports, __webpack_require__) {
                exports.__esModule = !0;
                exports.isPromise = function (item) {
                    try {
                        if (!item)
                            return !1;
                        if ("undefined" != typeof Promise && item instanceof Promise)
                            return !0;
                        if ("undefined" != typeof window && window.Window && item instanceof window.Window)
                            return !1;
                        if ("undefined" != typeof window && window.constructor && item instanceof window.constructor)
                            return !1;
                        if ("function" == typeof item.then)
                            return !0;
                    }
                    catch (err) {
                        return !1;
                    }
                    return !1;
                };
            },
            "./src/clean.js": function (module, exports, __webpack_require__) {
                exports.__esModule = !0;
                exports.cleanUpWindow = function (win) {
                    var requestPromises = _global.global.requestPromises.get(win);
                    if (requestPromises)
                        for (var _iterator = requestPromises, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
                            var _ref;
                            if (_isArray) {
                                if (_i >= _iterator.length)
                                    break;
                                _ref = _iterator[_i++];
                            }
                            else {
                                if ((_i = _iterator.next()).done)
                                    break;
                                _ref = _i.value;
                            }
                            var promise = _ref;
                            promise.reject(new Error("No response from window - cleaned up"));
                        }
                    _global.global.popupWindowsByWin && _global.global.popupWindowsByWin.delete(win);
                    _global.global.remoteWindows && _global.global.remoteWindows.delete(win);
                    _global.global.requestPromises.delete(win);
                    _global.global.methods.delete(win);
                    _global.global.readyPromises.delete(win);
                };
                __webpack_require__("./node_modules/cross-domain-utils/src/index.js");
                var _global = __webpack_require__("./src/global.js");
            },
            "./src/conf/config.js": function (module, exports, __webpack_require__) {
                exports.__esModule = !0;
                exports.CONFIG = void 0;
                var _ALLOWED_POST_MESSAGE, _constants = __webpack_require__("./src/conf/constants.js"), CONFIG = exports.CONFIG = {
                    ALLOW_POSTMESSAGE_POPUP: !("__ALLOW_POSTMESSAGE_POPUP__" in window) || window.__ALLOW_POSTMESSAGE_POPUP__,
                    LOG_LEVEL: "info",
                    BRIDGE_TIMEOUT: 5e3,
                    CHILD_WINDOW_TIMEOUT: 5e3,
                    ACK_TIMEOUT: -1 !== window.navigator.userAgent.match(/MSIE/i) ? 2e3 : 1e3,
                    RES_TIMEOUT: -1,
                    LOG_TO_PAGE: !1,
                    ALLOWED_POST_MESSAGE_METHODS: (_ALLOWED_POST_MESSAGE = {}, _ALLOWED_POST_MESSAGE[_constants.CONSTANTS.SEND_STRATEGIES.POST_MESSAGE] = !0,
                        _ALLOWED_POST_MESSAGE[_constants.CONSTANTS.SEND_STRATEGIES.BRIDGE] = !0, _ALLOWED_POST_MESSAGE[_constants.CONSTANTS.SEND_STRATEGIES.GLOBAL] = !0,
                        _ALLOWED_POST_MESSAGE),
                    ALLOW_SAME_ORIGIN: !1
                };
                0 === window.location.href.indexOf(_constants.CONSTANTS.FILE_PROTOCOL) && (CONFIG.ALLOW_POSTMESSAGE_POPUP = !0);
            },
            "./src/conf/constants.js": function (module, exports, __webpack_require__) {
                exports.__esModule = !0;
                exports.CONSTANTS = {
                    POST_MESSAGE_TYPE: {
                        REQUEST: "postrobot_message_request",
                        RESPONSE: "postrobot_message_response",
                        ACK: "postrobot_message_ack"
                    },
                    POST_MESSAGE_ACK: {
                        SUCCESS: "success",
                        ERROR: "error"
                    },
                    POST_MESSAGE_NAMES: {
                        METHOD: "postrobot_method",
                        HELLO: "postrobot_ready",
                        OPEN_TUNNEL: "postrobot_open_tunnel"
                    },
                    WINDOW_TYPES: {
                        FULLPAGE: "fullpage",
                        POPUP: "popup",
                        IFRAME: "iframe"
                    },
                    WINDOW_PROPS: {
                        POSTROBOT: "__postRobot__"
                    },
                    SERIALIZATION_TYPES: {
                        METHOD: "postrobot_method",
                        ERROR: "postrobot_error",
                        PROMISE: "postrobot_promise",
                        ZALGO_PROMISE: "postrobot_zalgo_promise",
                        REGEX: "regex"
                    },
                    SEND_STRATEGIES: {
                        POST_MESSAGE: "postrobot_post_message",
                        BRIDGE: "postrobot_bridge",
                        GLOBAL: "postrobot_global"
                    },
                    MOCK_PROTOCOL: "mock:",
                    FILE_PROTOCOL: "file:",
                    BRIDGE_NAME_PREFIX: "__postrobot_bridge__",
                    POSTROBOT_PROXY: "__postrobot_proxy__",
                    WILDCARD: "*"
                };
                var POST_MESSAGE_NAMES = exports.POST_MESSAGE_NAMES = {
                    METHOD: "postrobot_method",
                    HELLO: "postrobot_hello",
                    OPEN_TUNNEL: "postrobot_open_tunnel"
                };
                exports.POST_MESSAGE_NAMES_LIST = Object.keys(POST_MESSAGE_NAMES).map(function (key) {
                    return POST_MESSAGE_NAMES[key];
                });
            },
            "./src/conf/index.js": function (module, exports, __webpack_require__) {
                exports.__esModule = !0;
                var _config = __webpack_require__("./src/conf/config.js");
                Object.keys(_config).forEach(function (key) {
                    "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                        enumerable: !0,
                        get: function () {
                            return _config[key];
                        }
                    });
                });
                var _constants = __webpack_require__("./src/conf/constants.js");
                Object.keys(_constants).forEach(function (key) {
                    "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                        enumerable: !0,
                        get: function () {
                            return _constants[key];
                        }
                    });
                });
            },
            "./src/drivers/index.js": function (module, exports, __webpack_require__) {
                exports.__esModule = !0;
                var _receive = __webpack_require__("./src/drivers/receive/index.js");
                Object.keys(_receive).forEach(function (key) {
                    "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                        enumerable: !0,
                        get: function () {
                            return _receive[key];
                        }
                    });
                });
                var _send = __webpack_require__("./src/drivers/send/index.js");
                Object.keys(_send).forEach(function (key) {
                    "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                        enumerable: !0,
                        get: function () {
                            return _send[key];
                        }
                    });
                });
                var _listeners = __webpack_require__("./src/drivers/listeners.js");
                Object.keys(_listeners).forEach(function (key) {
                    "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                        enumerable: !0,
                        get: function () {
                            return _listeners[key];
                        }
                    });
                });
            },
            "./src/drivers/listeners.js": function (module, exports, __webpack_require__) {
                exports.__esModule = !0;
                exports.resetListeners = function () {
                    _global.global.responseListeners = {};
                    _global.global.requestListeners = {};
                };
                exports.addResponseListener = function (hash, listener) {
                    _global.global.responseListeners[hash] = listener;
                };
                exports.getResponseListener = function (hash) {
                    return _global.global.responseListeners[hash];
                };
                exports.deleteResponseListener = function (hash) {
                    delete _global.global.responseListeners[hash];
                };
                exports.markResponseListenerErrored = function (hash) {
                    _global.global.erroredResponseListeners[hash] = !0;
                };
                exports.isResponseListenerErrored = function (hash) {
                    return Boolean(_global.global.erroredResponseListeners[hash]);
                };
                exports.getRequestListener = getRequestListener;
                exports.addRequestListener = function addRequestListener(_ref5, listener) {
                    var name = _ref5.name, win = _ref5.win, domain = _ref5.domain;
                    if (!name || "string" != typeof name)
                        throw new Error("Name required to add request listener");
                    if (Array.isArray(win)) {
                        for (var listenersCollection = [], _iterator2 = win, _isArray2 = Array.isArray(_iterator2), _i3 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
                            var _ref6;
                            if (_isArray2) {
                                if (_i3 >= _iterator2.length)
                                    break;
                                _ref6 = _iterator2[_i3++];
                            }
                            else {
                                if ((_i3 = _iterator2.next()).done)
                                    break;
                                _ref6 = _i3.value;
                            }
                            var item = _ref6;
                            listenersCollection.push(addRequestListener({
                                name: name,
                                domain: domain,
                                win: item
                            }, listener));
                        }
                        return {
                            cancel: function () {
                                for (var _iterator3 = listenersCollection, _isArray3 = Array.isArray(_iterator3), _i4 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
                                    var _ref7;
                                    if (_isArray3) {
                                        if (_i4 >= _iterator3.length)
                                            break;
                                        _ref7 = _iterator3[_i4++];
                                    }
                                    else {
                                        if ((_i4 = _iterator3.next()).done)
                                            break;
                                        _ref7 = _i4.value;
                                    }
                                    var cancelListener = _ref7;
                                    cancelListener.cancel();
                                }
                            }
                        };
                    }
                    if (Array.isArray(domain)) {
                        for (var _listenersCollection = [], _iterator4 = domain, _isArray4 = Array.isArray(_iterator4), _i5 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
                            var _ref8;
                            if (_isArray4) {
                                if (_i5 >= _iterator4.length)
                                    break;
                                _ref8 = _iterator4[_i5++];
                            }
                            else {
                                if ((_i5 = _iterator4.next()).done)
                                    break;
                                _ref8 = _i5.value;
                            }
                            var _item = _ref8;
                            _listenersCollection.push(addRequestListener({
                                name: name,
                                win: win,
                                domain: _item
                            }, listener));
                        }
                        return {
                            cancel: function () {
                                for (var _iterator5 = _listenersCollection, _isArray5 = Array.isArray(_iterator5), _i6 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator]();;) {
                                    var _ref9;
                                    if (_isArray5) {
                                        if (_i6 >= _iterator5.length)
                                            break;
                                        _ref9 = _iterator5[_i6++];
                                    }
                                    else {
                                        if ((_i6 = _iterator5.next()).done)
                                            break;
                                        _ref9 = _i6.value;
                                    }
                                    var cancelListener = _ref9;
                                    cancelListener.cancel();
                                }
                            }
                        };
                    }
                    var existingListener = getRequestListener({
                        name: name,
                        win: win,
                        domain: domain
                    });
                    win && win !== _conf.CONSTANTS.WILDCARD || (win = _global.global.WINDOW_WILDCARD);
                    domain = domain || _conf.CONSTANTS.WILDCARD;
                    if (existingListener)
                        throw win && domain ? new Error("Request listener already exists for " + name + " on domain " + domain.toString() + " for " + (win === _global.global.WINDOW_WILDCARD ? "wildcard" : "specified") + " window") : win ? new Error("Request listener already exists for " + name + " for " + (win === _global.global.WINDOW_WILDCARD ? "wildcard" : "specified") + " window") : domain ? new Error("Request listener already exists for " + name + " on domain " + domain.toString()) : new Error("Request listener already exists for " + name);
                    var requestListeners = _global.global.requestListeners;
                    var nameListeners = requestListeners[name];
                    if (!nameListeners) {
                        nameListeners = new _src.WeakMap();
                        requestListeners[name] = nameListeners;
                    }
                    var winListeners = nameListeners.get(win);
                    if (!winListeners) {
                        winListeners = {};
                        nameListeners.set(win, winListeners);
                    }
                    var strDomain = domain.toString();
                    var regexListeners = winListeners[__DOMAIN_REGEX__];
                    var regexListener = void 0;
                    if ((0, _lib.isRegex)(domain)) {
                        if (!regexListeners) {
                            regexListeners = [];
                            winListeners[__DOMAIN_REGEX__] = regexListeners;
                        }
                        regexListener = {
                            regex: domain,
                            listener: listener
                        };
                        regexListeners.push(regexListener);
                    }
                    else
                        winListeners[strDomain] = listener;
                    return {
                        cancel: function () {
                            if (winListeners) {
                                delete winListeners[strDomain];
                                win && 0 === Object.keys(winListeners).length && nameListeners.delete(win);
                                regexListener && regexListeners.splice(regexListeners.indexOf(regexListener, 1));
                            }
                        }
                    };
                };
                __webpack_require__("./node_modules/zalgo-promise/src/index.js");
                var _src = __webpack_require__("./node_modules/cross-domain-safe-weakmap/src/index.js"), _src2 = __webpack_require__("./node_modules/cross-domain-utils/src/index.js"), _global = __webpack_require__("./src/global.js"), _lib = __webpack_require__("./src/lib/index.js"), _conf = __webpack_require__("./src/conf/index.js");
                _global.global.responseListeners = _global.global.responseListeners || {};
                _global.global.requestListeners = _global.global.requestListeners || {};
                _global.global.WINDOW_WILDCARD = _global.global.WINDOW_WILDCARD || new function () { }();
                _global.global.erroredResponseListeners = _global.global.erroredResponseListeners || {};
                var __DOMAIN_REGEX__ = "__domain_regex__";
                function getRequestListener(_ref) {
                    var name = _ref.name, win = _ref.win, domain = _ref.domain;
                    win === _conf.CONSTANTS.WILDCARD && (win = null);
                    domain === _conf.CONSTANTS.WILDCARD && (domain = null);
                    if (!name)
                        throw new Error("Name required to get request listener");
                    var nameListeners = _global.global.requestListeners[name];
                    if (nameListeners)
                        for (var _arr = [win, _global.global.WINDOW_WILDCARD], _i = 0; _i < _arr.length; _i++) {
                            var winQualifier = _arr[_i], winListeners = winQualifier && nameListeners.get(winQualifier);
                            if (winListeners) {
                                if (domain && "string" == typeof domain) {
                                    if (winListeners[domain])
                                        return winListeners[domain];
                                    if (winListeners[__DOMAIN_REGEX__]) {
                                        var _iterator = winListeners[__DOMAIN_REGEX__], _isArray = Array.isArray(_iterator), _i2 = 0;
                                        for (_iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
                                            var _ref3;
                                            if (_isArray) {
                                                if (_i2 >= _iterator.length)
                                                    break;
                                                _ref3 = _iterator[_i2++];
                                            }
                                            else {
                                                if ((_i2 = _iterator.next()).done)
                                                    break;
                                                _ref3 = _i2.value;
                                            }
                                            var _ref4 = _ref3, regex = _ref4.regex, listener = _ref4.listener;
                                            if ((0, _src2.matchDomain)(regex, domain))
                                                return listener;
                                        }
                                    }
                                }
                                if (winListeners[_conf.CONSTANTS.WILDCARD])
                                    return winListeners[_conf.CONSTANTS.WILDCARD];
                            }
                        }
                }
            },
            "./src/drivers/receive/index.js": function (module, exports, __webpack_require__) {
                exports.__esModule = !0;
                var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
                    return typeof obj;
                } : function (obj) {
                    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
                };
                exports.receiveMessage = receiveMessage;
                exports.messageListener = messageListener;
                exports.listenForMessages = function () {
                    (0, _lib.addEventListener)(window, "message", messageListener);
                };
                var _src = __webpack_require__("./node_modules/cross-domain-utils/src/index.js"), _conf = __webpack_require__("./src/conf/index.js"), _lib = __webpack_require__("./src/lib/index.js"), _global = __webpack_require__("./src/global.js"), _types = __webpack_require__("./src/drivers/receive/types.js");
                _global.global.receivedMessages = _global.global.receivedMessages || [];
                function receiveMessage(event) {
                    if (!window || window.closed)
                        throw new Error("Message recieved in closed window");
                    try {
                        if (!event.source)
                            return;
                    }
                    catch (err) {
                        return;
                    }
                    var source = event.source, origin = event.origin, message = function (message) {
                        var parsedMessage = void 0;
                        try {
                            parsedMessage = (0, _lib.jsonParse)(message);
                        }
                        catch (err) {
                            return;
                        }
                        if (parsedMessage && "object" === (void 0 === parsedMessage ? "undefined" : _typeof(parsedMessage)) && null !== parsedMessage && (parsedMessage = parsedMessage[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT]) && "object" === (void 0 === parsedMessage ? "undefined" : _typeof(parsedMessage)) && null !== parsedMessage && parsedMessage.type && "string" == typeof parsedMessage.type && _types.RECEIVE_MESSAGE_TYPES[parsedMessage.type])
                            return parsedMessage;
                    }(event.data);
                    if (message) {
                        if (!message.sourceDomain || "string" != typeof message.sourceDomain)
                            throw new Error("Expected message to have sourceDomain");
                        0 !== message.sourceDomain.indexOf(_conf.CONSTANTS.MOCK_PROTOCOL) && 0 !== message.sourceDomain.indexOf(_conf.CONSTANTS.FILE_PROTOCOL) || (origin = message.sourceDomain);
                        if (-1 === _global.global.receivedMessages.indexOf(message.id)) {
                            _global.global.receivedMessages.push(message.id);
                            var level = void 0;
                            level = -1 !== _conf.POST_MESSAGE_NAMES_LIST.indexOf(message.name) || message.type === _conf.CONSTANTS.POST_MESSAGE_TYPE.ACK ? "debug" : "error" === message.ack ? "error" : "info";
                            _lib.log.logLevel(level, ["\n\n\t", "#receive", message.type.replace(/^postrobot_message_/, ""), "::", message.name, "::", origin, "\n\n", message]);
                            if (!(0, _src.isWindowClosed)(source) || message.fireAndForget) {
                                message.data && (message.data = (0, _lib.deserializeMethods)(source, origin, message.data));
                                _types.RECEIVE_MESSAGE_TYPES[message.type](source, origin, message);
                            }
                            else
                                _lib.log.debug("Source window is closed - can not send " + message.type + " " + message.name);
                        }
                    }
                }
                function messageListener(event) {
                    try {
                        (0, _lib.noop)(event.source);
                    }
                    catch (err) {
                        return;
                    }
                    var messageEvent = {
                        source: event.source || event.sourceElement,
                        origin: event.origin || event.originalEvent && event.originalEvent.origin,
                        data: event.data
                    };
                    receiveMessage(messageEvent);
                }
                _global.global.receiveMessage = receiveMessage;
            },
            "./src/drivers/receive/types.js": function (module, exports, __webpack_require__) {
                exports.__esModule = !0;
                exports.RECEIVE_MESSAGE_TYPES = void 0;
                var _RECEIVE_MESSAGE_TYPE, _extends = Object.assign || function (target) {
                    for (var i = 1; i < arguments.length; i++) {
                        var source = arguments[i];
                        for (var key in source)
                            Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
                    }
                    return target;
                }, _src = __webpack_require__("./node_modules/zalgo-promise/src/index.js"), _src2 = __webpack_require__("./node_modules/cross-domain-utils/src/index.js"), _conf = __webpack_require__("./src/conf/index.js"), _lib = __webpack_require__("./src/lib/index.js"), _send = __webpack_require__("./src/drivers/send/index.js"), _listeners = __webpack_require__("./src/drivers/listeners.js");
                exports.RECEIVE_MESSAGE_TYPES = ((_RECEIVE_MESSAGE_TYPE = {})[_conf.CONSTANTS.POST_MESSAGE_TYPE.ACK] = function (source, origin, message) {
                    if (!(0, _listeners.isResponseListenerErrored)(message.hash)) {
                        var options = (0, _listeners.getResponseListener)(message.hash);
                        if (!options)
                            throw new Error("No handler found for post message ack for message: " + message.name + " from " + origin + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                        if (!(0, _src2.matchDomain)(options.domain, origin))
                            throw new Error("Ack origin " + origin + " does not match domain " + options.domain.toString());
                        options.ack = !0;
                    }
                }, _RECEIVE_MESSAGE_TYPE[_conf.CONSTANTS.POST_MESSAGE_TYPE.REQUEST] = function (source, origin, message) {
                    var options = (0, _listeners.getRequestListener)({
                        name: message.name,
                        win: source,
                        domain: origin
                    });
                    function respond(data) {
                        return message.fireAndForget || (0, _src2.isWindowClosed)(source) ? _src.ZalgoPromise.resolve() : (0, _send.sendMessage)(source, _extends({
                            target: message.originalSource,
                            hash: message.hash,
                            name: message.name
                        }, data), origin);
                    }
                    return _src.ZalgoPromise.all([respond({
                            type: _conf.CONSTANTS.POST_MESSAGE_TYPE.ACK
                        }), _src.ZalgoPromise.try(function () {
                            if (!options)
                                throw new Error("No handler found for post message: " + message.name + " from " + origin + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                            if (!(0, _src2.matchDomain)(options.domain, origin))
                                throw new Error("Request origin " + origin + " does not match domain " + options.domain.toString());
                            var data = message.data;
                            return options.handler({
                                source: source,
                                origin: origin,
                                data: data
                            });
                        }).then(function (data) {
                            return respond({
                                type: _conf.CONSTANTS.POST_MESSAGE_TYPE.RESPONSE,
                                ack: _conf.CONSTANTS.POST_MESSAGE_ACK.SUCCESS,
                                data: data
                            });
                        }, function (err) {
                            var error = (0, _lib.stringifyError)(err).replace(/^Error: /, ""), code = err.code;
                            return respond({
                                type: _conf.CONSTANTS.POST_MESSAGE_TYPE.RESPONSE,
                                ack: _conf.CONSTANTS.POST_MESSAGE_ACK.ERROR,
                                error: error,
                                code: code
                            });
                        })]).then(_lib.noop).catch(function (err) {
                        if (options && options.handleError)
                            return options.handleError(err);
                        _lib.log.error((0, _lib.stringifyError)(err));
                    });
                }, _RECEIVE_MESSAGE_TYPE[_conf.CONSTANTS.POST_MESSAGE_TYPE.RESPONSE] = function (source, origin, message) {
                    if (!(0, _listeners.isResponseListenerErrored)(message.hash)) {
                        var options = (0, _listeners.getResponseListener)(message.hash);
                        if (!options)
                            throw new Error("No handler found for post message response for message: " + message.name + " from " + origin + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                        if (!(0, _src2.matchDomain)(options.domain, origin))
                            throw new Error("Response origin " + origin + " does not match domain " + (0, _src2.stringifyDomainPattern)(options.domain));
                        (0, _listeners.deleteResponseListener)(message.hash);
                        if (message.ack === _conf.CONSTANTS.POST_MESSAGE_ACK.ERROR) {
                            var err = new Error(message.error);
                            message.code && (err.code = message.code);
                            return options.respond(err, null);
                        }
                        if (message.ack === _conf.CONSTANTS.POST_MESSAGE_ACK.SUCCESS) {
                            var data = message.data || message.response;
                            return options.respond(null, {
                                source: source,
                                origin: origin,
                                data: data
                            });
                        }
                    }
                }, _RECEIVE_MESSAGE_TYPE);
            },
            "./src/drivers/send/index.js": function (module, exports, __webpack_require__) {
                exports.__esModule = !0;
                var _extends = Object.assign || function (target) {
                    for (var i = 1; i < arguments.length; i++) {
                        var source = arguments[i];
                        for (var key in source)
                            Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
                    }
                    return target;
                };
                exports.sendMessage = function (win, message, domain) {
                    return _src2.ZalgoPromise.try(function () {
                        var _jsonStringify;
                        message = function (win, message) {
                            var options = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, id = (0, _lib.uniqueID)(), type = (0, _lib.getWindowType)(), sourceDomain = (0, _src.getDomain)(window);
                            return _extends({}, message, options, {
                                sourceDomain: sourceDomain,
                                id: message.id || id,
                                windowType: type
                            });
                        }(win, message, {
                            data: (0, _lib.serializeMethods)(win, domain, message.data),
                            domain: domain
                        });
                        var level = void 0;
                        level = -1 !== _conf.POST_MESSAGE_NAMES_LIST.indexOf(message.name) || message.type === _conf.CONSTANTS.POST_MESSAGE_TYPE.ACK ? "debug" : "error" === message.ack ? "error" : "info";
                        _lib.log.logLevel(level, ["\n\n\t", "#send", message.type.replace(/^postrobot_message_/, ""), "::", message.name, "::", domain || _conf.CONSTANTS.WILDCARD, "\n\n", message]);
                        if (win === window && !_conf.CONFIG.ALLOW_SAME_ORIGIN)
                            throw new Error("Attemping to send message to self");
                        if ((0, _src.isWindowClosed)(win))
                            throw new Error("Window is closed");
                        _lib.log.debug("Running send message strategies", message);
                        var messages = [], serializedMessage = (0, _lib.jsonStringify)(((_jsonStringify = {})[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT] = message,
                            _jsonStringify), null, 2);
                        return _src2.ZalgoPromise.map(Object.keys(_strategies.SEND_MESSAGE_STRATEGIES), function (strategyName) {
                            return _src2.ZalgoPromise.try(function () {
                                if (!_conf.CONFIG.ALLOWED_POST_MESSAGE_METHODS[strategyName])
                                    throw new Error("Strategy disallowed: " + strategyName);
                                return _strategies.SEND_MESSAGE_STRATEGIES[strategyName](win, serializedMessage, domain);
                            }).then(function () {
                                messages.push(strategyName + ": success");
                                return !0;
                            }, function (err) {
                                messages.push(strategyName + ": " + (0, _lib.stringifyError)(err) + "\n");
                                return !1;
                            });
                        }).then(function (results) {
                            var success = results.some(Boolean), status = message.type + " " + message.name + " " + (success ? "success" : "error") + ":\n  - " + messages.join("\n  - ") + "\n";
                            _lib.log.debug(status);
                            if (!success)
                                throw new Error(status);
                        });
                    });
                };
                var _src = __webpack_require__("./node_modules/cross-domain-utils/src/index.js"), _src2 = __webpack_require__("./node_modules/zalgo-promise/src/index.js"), _conf = __webpack_require__("./src/conf/index.js"), _lib = __webpack_require__("./src/lib/index.js"), _strategies = __webpack_require__("./src/drivers/send/strategies.js");
            },
            "./src/drivers/send/strategies.js": function (module, exports, __webpack_require__) {
                exports.__esModule = !0;
                exports.SEND_MESSAGE_STRATEGIES = void 0;
                var _src = __webpack_require__("./node_modules/cross-domain-utils/src/index.js"), _conf = __webpack_require__("./src/conf/index.js"), SEND_MESSAGE_STRATEGIES = (__webpack_require__("./src/lib/index.js"),
                    exports.SEND_MESSAGE_STRATEGIES = {});
                SEND_MESSAGE_STRATEGIES[_conf.CONSTANTS.SEND_STRATEGIES.POST_MESSAGE] = function (win, serializedMessage, domain) {
                    (Array.isArray(domain) ? domain : "string" == typeof domain ? [domain] : [_conf.CONSTANTS.WILDCARD]).map(function (dom) {
                        if (0 === dom.indexOf(_conf.CONSTANTS.MOCK_PROTOCOL)) {
                            if (window.location.protocol === _conf.CONSTANTS.FILE_PROTOCOL)
                                return _conf.CONSTANTS.WILDCARD;
                            if (!(0, _src.isActuallySameDomain)(win))
                                throw new Error("Attempting to send messsage to mock domain " + dom + ", but window is actually cross-domain");
                            return (0, _src.getActualDomain)(win);
                        }
                        return 0 === dom.indexOf(_conf.CONSTANTS.FILE_PROTOCOL) ? _conf.CONSTANTS.WILDCARD : dom;
                    }).forEach(function (dom) {
                        return win.postMessage(serializedMessage, dom);
                    });
                };
            },
            "./src/global.js": function (module, exports, __webpack_require__) {
                exports.__esModule = !0;
                exports.global = void 0;
                var _conf = __webpack_require__("./src/conf/index.js");
                (exports.global = window[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT] = window[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT] || {}).registerSelf = function () { };
            },
            "./src/index.js": function (module, exports, __webpack_require__) {
                exports.__esModule = !0;
                var _interface = __webpack_require__("./src/interface.js");
                Object.keys(_interface).forEach(function (key) {
                    "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                        enumerable: !0,
                        get: function () {
                            return _interface[key];
                        }
                    });
                });
                var INTERFACE = function (obj) {
                    if (obj && obj.__esModule)
                        return obj;
                    var newObj = {};
                    if (null != obj)
                        for (var key in obj)
                            Object.prototype.hasOwnProperty.call(obj, key) && (newObj[key] = obj[key]);
                    newObj.default = obj;
                    return newObj;
                }(_interface);
                exports.default = INTERFACE;
            },
            "./src/interface.js": function (module, exports, __webpack_require__) {
                exports.__esModule = !0;
                exports.bridge = exports.Promise = exports.cleanUpWindow = void 0;
                var _public = __webpack_require__("./src/public/index.js");
                Object.keys(_public).forEach(function (key) {
                    "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                        enumerable: !0,
                        get: function () {
                            return _public[key];
                        }
                    });
                });
                var _clean = __webpack_require__("./src/clean.js");
                Object.defineProperty(exports, "cleanUpWindow", {
                    enumerable: !0,
                    get: function () {
                        return _clean.cleanUpWindow;
                    }
                });
                var _src = __webpack_require__("./node_modules/zalgo-promise/src/index.js");
                Object.defineProperty(exports, "Promise", {
                    enumerable: !0,
                    get: function () {
                        return _src.ZalgoPromise;
                    }
                });
                exports.init = init;
                var _lib = __webpack_require__("./src/lib/index.js"), _drivers = __webpack_require__("./src/drivers/index.js"), _global = __webpack_require__("./src/global.js");
                exports.bridge = null;
                function init() {
                    if (!_global.global.initialized) {
                        (0, _drivers.listenForMessages)();
                        (0, _lib.initOnReady)();
                        (0, _lib.listenForMethods)({
                            on: _public.on,
                            send: _public.send
                        });
                    }
                    _global.global.initialized = !0;
                }
                init();
            },
            "./src/lib/index.js": function (module, exports, __webpack_require__) {
                exports.__esModule = !0;
                var _util = __webpack_require__("./src/lib/util.js");
                Object.keys(_util).forEach(function (key) {
                    "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                        enumerable: !0,
                        get: function () {
                            return _util[key];
                        }
                    });
                });
                var _log = __webpack_require__("./src/lib/log.js");
                Object.keys(_log).forEach(function (key) {
                    "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                        enumerable: !0,
                        get: function () {
                            return _log[key];
                        }
                    });
                });
                var _serialize = __webpack_require__("./src/lib/serialize.js");
                Object.keys(_serialize).forEach(function (key) {
                    "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                        enumerable: !0,
                        get: function () {
                            return _serialize[key];
                        }
                    });
                });
                var _ready = __webpack_require__("./src/lib/ready.js");
                Object.keys(_ready).forEach(function (key) {
                    "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                        enumerable: !0,
                        get: function () {
                            return _ready[key];
                        }
                    });
                });
            },
            "./src/lib/log.js": function (module, exports, __webpack_require__) {
                exports.__esModule = !0;
                exports.log = void 0;
                var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
                    return typeof obj;
                } : function (obj) {
                    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
                }, _conf = __webpack_require__("./src/conf/index.js"), _util = __webpack_require__("./src/lib/util.js"), LOG_LEVELS = ["debug", "info", "warn", "error"];
                Function.prototype.bind && window.console && "object" === _typeof(console.log) && ["log", "info", "warn", "error"].forEach(function (method) {
                    console[method] = this.bind(console[method], console);
                }, Function.prototype.call);
                var log = exports.log = {
                    clearLogs: function () {
                        window.console && window.console.clear && window.console.clear();
                        if (_conf.CONFIG.LOG_TO_PAGE) {
                            var container = document.getElementById("postRobotLogs");
                            container && container.parentNode && container.parentNode.removeChild(container);
                        }
                    },
                    writeToPage: function (level, args) {
                        setTimeout(function () {
                            var container = document.getElementById("postRobotLogs");
                            if (!container) {
                                (container = document.createElement("div")).id = "postRobotLogs";
                                container.style.cssText = "width: 800px; font-family: monospace; white-space: pre-wrap;";
                                document.body && document.body.appendChild(container);
                            }
                            var el = document.createElement("div"), date = new Date().toString().split(" ")[4], payload = Array.prototype.slice.call(args).map(function (item) {
                                if ("string" == typeof item)
                                    return item;
                                if (!item)
                                    return Object.prototype.toString.call(item);
                                var json = void 0;
                                try {
                                    json = (0, _util.jsonStringify)(item, null, 2);
                                }
                                catch (err) {
                                    json = "[object]";
                                }
                                return "\n\n" + json + "\n\n";
                            }).join(" "), msg = date + " " + level + " " + payload;
                            el.innerHTML = msg;
                            var color = {
                                log: "#ddd",
                                warn: "orange",
                                error: "red",
                                info: "blue",
                                debug: "#aaa"
                            }[level];
                            el.style.cssText = "margin-top: 10px; color: " + color + ";";
                            container.childNodes.length ? container.insertBefore(el, container.childNodes[0]) : container.appendChild(el);
                        });
                    },
                    logLevel: function (level, args) {
                        setTimeout(function () {
                            try {
                                var logLevel = window.LOG_LEVEL || _conf.CONFIG.LOG_LEVEL;
                                if ("disabled" === logLevel || LOG_LEVELS.indexOf(level) < LOG_LEVELS.indexOf(logLevel))
                                    return;
                                (args = Array.prototype.slice.call(args)).unshift("" + window.location.host + window.location.pathname);
                                args.unshift("::");
                                args.unshift("" + (0, _util.getWindowType)().toLowerCase());
                                args.unshift("[post-robot]");
                                _conf.CONFIG.LOG_TO_PAGE && log.writeToPage(level, args);
                                if (!window.console)
                                    return;
                                window.console[level] || (level = "log");
                                if (!window.console[level])
                                    return;
                                window.console[level].apply(window.console, args);
                            }
                            catch (err) { }
                        }, 1);
                    },
                    debug: function () {
                        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++)
                            args[_key] = arguments[_key];
                        log.logLevel("debug", args);
                    },
                    info: function () {
                        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++)
                            args[_key2] = arguments[_key2];
                        log.logLevel("info", args);
                    },
                    warn: function () {
                        for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++)
                            args[_key3] = arguments[_key3];
                        log.logLevel("warn", args);
                    },
                    error: function () {
                        for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++)
                            args[_key4] = arguments[_key4];
                        log.logLevel("error", args);
                    }
                };
            },
            "./src/lib/ready.js": function (module, exports, __webpack_require__) {
                exports.__esModule = !0;
                exports.onHello = onHello;
                exports.sayHello = sayHello;
                exports.initOnReady = function () {
                    onHello(function (_ref3) {
                        var source = _ref3.source, origin = _ref3.origin, promise = _global.global.readyPromises.get(source) || new _src3.ZalgoPromise();
                        promise.resolve({
                            origin: origin
                        });
                        _global.global.readyPromises.set(source, promise);
                    });
                    var parent = (0, _src2.getAncestor)();
                    parent && sayHello(parent).catch(function (err) {
                        _log.log.debug((0, _util.stringifyError)(err));
                    });
                };
                exports.onChildWindowReady = function (win) {
                    var timeout = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 5e3, name = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "Window", promise = _global.global.readyPromises.get(win);
                    if (promise)
                        return promise;
                    promise = new _src3.ZalgoPromise();
                    _global.global.readyPromises.set(win, promise);
                    -1 !== timeout && setTimeout(function () {
                        return promise.reject(new Error(name + " did not load after " + timeout + "ms"));
                    }, timeout);
                    return promise;
                };
                var _src = __webpack_require__("./node_modules/cross-domain-safe-weakmap/src/index.js"), _src2 = __webpack_require__("./node_modules/cross-domain-utils/src/index.js"), _src3 = __webpack_require__("./node_modules/zalgo-promise/src/index.js"), _conf = __webpack_require__("./src/conf/index.js"), _global = __webpack_require__("./src/global.js"), _log = __webpack_require__("./src/lib/log.js"), _util = __webpack_require__("./src/lib/util.js");
                _global.global.readyPromises = _global.global.readyPromises || new _src.WeakMap();
                function onHello(handler) {
                    _global.global.on(_conf.CONSTANTS.POST_MESSAGE_NAMES.HELLO, {
                        domain: _conf.CONSTANTS.WILDCARD
                    }, function (_ref) {
                        var source = _ref.source, origin = _ref.origin;
                        return handler({
                            source: source,
                            origin: origin
                        });
                    });
                }
                function sayHello(win) {
                    return _global.global.send(win, _conf.CONSTANTS.POST_MESSAGE_NAMES.HELLO, {}, {
                        domain: _conf.CONSTANTS.WILDCARD,
                        timeout: -1
                    }).then(function (_ref2) {
                        return {
                            origin: _ref2.origin
                        };
                    });
                }
            },
            "./src/lib/serialize.js": function (module, exports, __webpack_require__) {
                exports.__esModule = !0;
                exports.listenForMethods = void 0;
                var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
                    return typeof obj;
                } : function (obj) {
                    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
                };
                exports.serializeMethod = serializeMethod;
                exports.serializeMethods = function (destination, domain, obj) {
                    return (0, _util.replaceObject)({
                        obj: obj
                    }, function (item, key) {
                        return "function" == typeof item ? serializeMethod(destination, domain, item, key.toString()) : item instanceof Error ? (err = item,
                            {
                                __type__: _conf.CONSTANTS.SERIALIZATION_TYPES.ERROR,
                                __message__: (0, _util.stringifyError)(err),
                                __code__: err.code
                            }) : window.Promise && item instanceof window.Promise ? function (destination, domain, promise, name) {
                            return {
                                __type__: _conf.CONSTANTS.SERIALIZATION_TYPES.PROMISE,
                                __then__: serializeMethod(destination, domain, function (resolve, reject) {
                                    return promise.then(resolve, reject);
                                }, name + ".then")
                            };
                        }(destination, domain, item, key.toString()) : _src3.ZalgoPromise.isPromise(item) ? function (destination, domain, promise, name) {
                            return {
                                __type__: _conf.CONSTANTS.SERIALIZATION_TYPES.ZALGO_PROMISE,
                                __then__: serializeMethod(destination, domain, function (resolve, reject) {
                                    return promise.then(resolve, reject);
                                }, name + ".then")
                            };
                        }(destination, domain, item, key.toString()) : (0, _util.isRegex)(item) ? (regex = item,
                            {
                                __type__: _conf.CONSTANTS.SERIALIZATION_TYPES.REGEX,
                                __source__: regex.source
                            }) : void 0;
                        var err, regex;
                    }).obj;
                };
                exports.deserializeMethod = deserializeMethod;
                exports.deserializeError = deserializeError;
                exports.deserializeZalgoPromise = deserializeZalgoPromise;
                exports.deserializePromise = deserializePromise;
                exports.deserializeRegex = deserializeRegex;
                exports.deserializeMethods = function (source, origin, obj) {
                    return (0, _util.replaceObject)({
                        obj: obj
                    }, function (item) {
                        if ("object" === (void 0 === item ? "undefined" : _typeof(item)) && null !== item)
                            return isSerialized(item, _conf.CONSTANTS.SERIALIZATION_TYPES.METHOD) ? deserializeMethod(source, origin, item) : isSerialized(item, _conf.CONSTANTS.SERIALIZATION_TYPES.ERROR) ? deserializeError(source, origin, item) : isSerialized(item, _conf.CONSTANTS.SERIALIZATION_TYPES.PROMISE) ? deserializePromise(source, origin, item) : isSerialized(item, _conf.CONSTANTS.SERIALIZATION_TYPES.ZALGO_PROMISE) ? deserializeZalgoPromise(source, origin, item) : isSerialized(item, _conf.CONSTANTS.SERIALIZATION_TYPES.REGEX) ? deserializeRegex(source, origin, item) : void 0;
                    }).obj;
                };
                var _src = __webpack_require__("./node_modules/cross-domain-safe-weakmap/src/index.js"), _src2 = __webpack_require__("./node_modules/cross-domain-utils/src/index.js"), _src3 = __webpack_require__("./node_modules/zalgo-promise/src/index.js"), _conf = __webpack_require__("./src/conf/index.js"), _global = __webpack_require__("./src/global.js"), _util = __webpack_require__("./src/lib/util.js"), _log = __webpack_require__("./src/lib/log.js");
                _global.global.methods = _global.global.methods || new _src.WeakMap();
                exports.listenForMethods = (0, _util.once)(function () {
                    _global.global.on(_conf.CONSTANTS.POST_MESSAGE_NAMES.METHOD, {
                        origin: _conf.CONSTANTS.WILDCARD
                    }, function (_ref) {
                        var source = _ref.source, origin = _ref.origin, data = _ref.data, methods = _global.global.methods.get(source);
                        if (!methods)
                            throw new Error("Could not find any methods this window has privileges to call");
                        var meth = methods[data.id];
                        if (!meth)
                            throw new Error("Could not find method with id: " + data.id);
                        if (!(0, _src2.matchDomain)(meth.domain, origin))
                            throw new Error("Method domain " + meth.domain + " does not match origin " + origin);
                        _log.log.debug("Call local method", data.name, data.args);
                        return _src3.ZalgoPromise.try(function () {
                            return meth.method.apply({
                                source: source,
                                origin: origin,
                                data: data
                            }, data.args);
                        }).then(function (result) {
                            return {
                                result: result,
                                id: data.id,
                                name: data.name
                            };
                        });
                    });
                });
                function isSerialized(item, type) {
                    return "object" === (void 0 === item ? "undefined" : _typeof(item)) && null !== item && item.__type__ === type;
                }
                function serializeMethod(destination, domain, method, name) {
                    var id = (0, _util.uniqueID)(), methods = _global.global.methods.get(destination);
                    if (!methods) {
                        methods = {};
                        _global.global.methods.set(destination, methods);
                    }
                    methods[id] = {
                        domain: domain,
                        method: method
                    };
                    return {
                        __type__: _conf.CONSTANTS.SERIALIZATION_TYPES.METHOD,
                        __id__: id,
                        __name__: name
                    };
                }
                function deserializeMethod(source, origin, obj) {
                    function wrapper() {
                        var args = Array.prototype.slice.call(arguments);
                        _log.log.debug("Call foreign method", obj.__name__, args);
                        return _global.global.send(source, _conf.CONSTANTS.POST_MESSAGE_NAMES.METHOD, {
                            id: obj.__id__,
                            name: obj.__name__,
                            args: args
                        }, {
                            domain: origin,
                            timeout: -1
                        }).then(function (_ref2) {
                            var data = _ref2.data;
                            _log.log.debug("Got foreign method result", obj.__name__, data.result);
                            return data.result;
                        }, function (err) {
                            _log.log.debug("Got foreign method error", (0, _util.stringifyError)(err));
                            throw err;
                        });
                    }
                    wrapper.__name__ = obj.__name__;
                    wrapper.__xdomain__ = !0;
                    wrapper.source = source;
                    wrapper.origin = origin;
                    return wrapper;
                }
                function deserializeError(source, origin, obj) {
                    var err = new Error(obj.__message__);
                    obj.__code__ && (err.code = obj.__code__);
                    return err;
                }
                function deserializeZalgoPromise(source, origin, prom) {
                    return new _src3.ZalgoPromise(function (resolve, reject) {
                        return deserializeMethod(source, origin, prom.__then__)(resolve, reject);
                    });
                }
                function deserializePromise(source, origin, prom) {
                    return window.Promise ? new window.Promise(function (resolve, reject) {
                        return deserializeMethod(source, origin, prom.__then__)(resolve, reject);
                    }) : deserializeZalgoPromise(source, origin, prom);
                }
                function deserializeRegex(source, origin, item) {
                    return new RegExp(item.__source__);
                }
            },
            "./src/lib/util.js": function (module, exports, __webpack_require__) {
                exports.__esModule = !0;
                exports.weakMapMemoize = exports.once = void 0;
                var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
                    return typeof obj;
                } : function (obj) {
                    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
                };
                exports.stringifyError = function stringifyError(err) {
                    var level = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
                    if (level >= 3)
                        return "stringifyError stack overflow";
                    try {
                        if (!err)
                            return "<unknown error: " + Object.prototype.toString.call(err) + ">";
                        if ("string" == typeof err)
                            return err;
                        if (err instanceof Error) {
                            var stack = err && err.stack, message = err && err.message;
                            if (stack && message)
                                return -1 !== stack.indexOf(message) ? stack : message + "\n" + stack;
                            if (stack)
                                return stack;
                            if (message)
                                return message;
                        }
                        return "function" == typeof err.toString ? err.toString() : Object.prototype.toString.call(err);
                    }
                    catch (newErr) {
                        return "Error while stringifying error: " + stringifyError(newErr, level + 1);
                    }
                };
                exports.noop = function () { };
                exports.addEventListener = function (obj, event, handler) {
                    obj.addEventListener ? obj.addEventListener(event, handler) : obj.attachEvent("on" + event, handler);
                    return {
                        cancel: function () {
                            obj.removeEventListener ? obj.removeEventListener(event, handler) : obj.detachEvent("on" + event, handler);
                        }
                    };
                };
                exports.uniqueID = function () {
                    var chars = "0123456789abcdef";
                    return "xxxxxxxxxx".replace(/./g, function () {
                        return chars.charAt(Math.floor(Math.random() * chars.length));
                    });
                };
                exports.eachArray = eachArray;
                exports.eachObject = eachObject;
                exports.each = each;
                exports.replaceObject = function replaceObject(item, callback) {
                    var depth = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1;
                    if (depth >= 100)
                        throw new Error("Self-referential object passed, or object contained too many layers");
                    var newobj = void 0;
                    if ("object" !== (void 0 === item ? "undefined" : _typeof(item)) || null === item || Array.isArray(item)) {
                        if (!Array.isArray(item))
                            throw new TypeError("Invalid type: " + (void 0 === item ? "undefined" : _typeof(item)));
                        newobj = [];
                    }
                    else
                        newobj = {};
                    each(item, function (childItem, key) {
                        var result = callback(childItem, key);
                        void 0 !== result ? newobj[key] = result : "object" === (void 0 === childItem ? "undefined" : _typeof(childItem)) && null !== childItem ? newobj[key] = replaceObject(childItem, callback, depth + 1) : newobj[key] = childItem;
                    });
                    return newobj;
                };
                exports.safeInterval = function (method, time) {
                    var timeout = void 0;
                    timeout = setTimeout(function runInterval() {
                        timeout = setTimeout(runInterval, time);
                        method.call();
                    }, time);
                    return {
                        cancel: function () {
                            clearTimeout(timeout);
                        }
                    };
                };
                exports.isRegex = function (item) {
                    return "[object RegExp]" === Object.prototype.toString.call(item);
                };
                exports.getWindowType = function () {
                    if ((0, _src2.isPopup)())
                        return _conf.CONSTANTS.WINDOW_TYPES.POPUP;
                    if ((0, _src2.isIframe)())
                        return _conf.CONSTANTS.WINDOW_TYPES.IFRAME;
                    return _conf.CONSTANTS.WINDOW_TYPES.FULLPAGE;
                };
                exports.jsonStringify = function (obj, replacer, indent) {
                    var objectToJSON = void 0, arrayToJSON = void 0;
                    try {
                        if ("{}" !== JSON.stringify({})) {
                            objectToJSON = Object.prototype.toJSON;
                            delete Object.prototype.toJSON;
                        }
                        if ("{}" !== JSON.stringify({}))
                            throw new Error("Can not correctly serialize JSON objects");
                        if ("[]" !== JSON.stringify([])) {
                            arrayToJSON = Array.prototype.toJSON;
                            delete Array.prototype.toJSON;
                        }
                        if ("[]" !== JSON.stringify([]))
                            throw new Error("Can not correctly serialize JSON objects");
                    }
                    catch (err) {
                        throw new Error("Can not repair JSON.stringify: " + err.message);
                    }
                    var result = JSON.stringify.call(this, obj, replacer, indent);
                    try {
                        objectToJSON && (Object.prototype.toJSON = objectToJSON);
                        arrayToJSON && (Array.prototype.toJSON = arrayToJSON);
                    }
                    catch (err) {
                        throw new Error("Can not repair JSON.stringify: " + err.message);
                    }
                    return result;
                };
                exports.jsonParse = function (item) {
                    return JSON.parse(item);
                };
                exports.needsGlobalMessagingForBrowser = function () {
                    if ((0, _src2.getUserAgent)(window).match(/MSIE|trident|edge\/12|edge\/13/i))
                        return !0;
                    if (!_conf.CONFIG.ALLOW_POSTMESSAGE_POPUP)
                        return !0;
                    return !1;
                };
                var _src = __webpack_require__("./node_modules/cross-domain-safe-weakmap/src/index.js"), _src2 = __webpack_require__("./node_modules/cross-domain-utils/src/index.js"), _conf = __webpack_require__("./src/conf/index.js");
                exports.once = function (method) {
                    if (!method)
                        return method;
                    var called = !1;
                    return function () {
                        if (!called) {
                            called = !0;
                            return method.apply(this, arguments);
                        }
                    };
                };
                function eachArray(item, callback) {
                    for (var i = 0; i < item.length; i++)
                        callback(item[i], i);
                }
                function eachObject(item, callback) {
                    for (var _key in item)
                        item.hasOwnProperty(_key) && callback(item[_key], _key);
                }
                function each(item, callback) {
                    Array.isArray(item) ? eachArray(item, callback) : "object" === (void 0 === item ? "undefined" : _typeof(item)) && null !== item && eachObject(item, callback);
                }
                exports.weakMapMemoize = function (method) {
                    var weakmap = new _src.WeakMap();
                    return function (arg) {
                        var result = weakmap.get(arg);
                        if (void 0 !== result)
                            return result;
                        void 0 !== (result = method.call(this, arg)) && weakmap.set(arg, result);
                        return result;
                    };
                };
            },
            "./src/public/client.js": function (module, exports, __webpack_require__) {
                exports.__esModule = !0;
                exports.send = void 0;
                exports.request = request;
                exports.sendToParent = function (name, data, options) {
                    var win = (0, _src3.getAncestor)();
                    if (!win)
                        return new _src2.ZalgoPromise(function (resolve, reject) {
                            return reject(new Error("Window does not have a parent"));
                        });
                    return _send(win, name, data, options);
                };
                exports.client = function () {
                    var options = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    if (!options.window)
                        throw new Error("Expected options.window");
                    var win = options.window;
                    return {
                        send: function (name, data) {
                            return _send(win, name, data, options);
                        }
                    };
                };
                var _src = __webpack_require__("./node_modules/cross-domain-safe-weakmap/src/index.js"), _src2 = __webpack_require__("./node_modules/zalgo-promise/src/index.js"), _src3 = __webpack_require__("./node_modules/cross-domain-utils/src/index.js"), _conf = __webpack_require__("./src/conf/index.js"), _drivers = __webpack_require__("./src/drivers/index.js"), _lib = __webpack_require__("./src/lib/index.js"), _global = __webpack_require__("./src/global.js");
                _global.global.requestPromises = _global.global.requestPromises || new _src.WeakMap();
                function request(options) {
                    return _src2.ZalgoPromise.try(function () {
                        if (!options.name)
                            throw new Error("Expected options.name");
                        var name = options.name, targetWindow = void 0, domain = void 0;
                        if ("string" == typeof options.window) {
                            var el = document.getElementById(options.window);
                            if (!el)
                                throw new Error("Expected options.window " + Object.prototype.toString.call(options.window) + " to be a valid element id");
                            if ("iframe" !== el.tagName.toLowerCase())
                                throw new Error("Expected options.window " + Object.prototype.toString.call(options.window) + " to be an iframe");
                            if (!el.contentWindow)
                                throw new Error("Iframe must have contentWindow.  Make sure it has a src attribute and is in the DOM.");
                            targetWindow = el.contentWindow;
                        }
                        else if (options.window instanceof HTMLIFrameElement) {
                            if ("iframe" !== options.window.tagName.toLowerCase())
                                throw new Error("Expected options.window " + Object.prototype.toString.call(options.window) + " to be an iframe");
                            if (options.window && !options.window.contentWindow)
                                throw new Error("Iframe must have contentWindow.  Make sure it has a src attribute and is in the DOM.");
                            options.window && options.window.contentWindow && (targetWindow = options.window.contentWindow);
                        }
                        else
                            targetWindow = options.window;
                        if (!targetWindow)
                            throw new Error("Expected options.window to be a window object, iframe, or iframe element id.");
                        var win = targetWindow;
                        domain = options.domain || _conf.CONSTANTS.WILDCARD;
                        var hash = options.name + "_" + (0, _lib.uniqueID)();
                        if ((0, _src3.isWindowClosed)(win))
                            throw new Error("Target window is closed");
                        var hasResult = !1, requestPromises = _global.global.requestPromises.get(win);
                        if (!requestPromises) {
                            requestPromises = [];
                            _global.global.requestPromises.set(win, requestPromises);
                        }
                        var requestPromise = _src2.ZalgoPromise.try(function () {
                            if ((0, _src3.isAncestor)(window, win))
                                return (0, _lib.onChildWindowReady)(win, options.timeout || _conf.CONFIG.CHILD_WINDOW_TIMEOUT);
                        }).then(function () {
                            var origin = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).origin;
                            if ((0, _lib.isRegex)(domain) && !origin)
                                return (0, _lib.sayHello)(win);
                        }).then(function () {
                            var origin = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).origin;
                            if ((0, _lib.isRegex)(domain)) {
                                if (!(0, _src3.matchDomain)(domain, origin))
                                    throw new Error("Remote window domain " + origin + " does not match regex: " + domain.toString());
                                domain = origin;
                            }
                            if ("string" != typeof domain && !Array.isArray(domain))
                                throw new TypeError("Expected domain to be a string or array");
                            var actualDomain = domain;
                            return new _src2.ZalgoPromise(function (resolve, reject) {
                                var responseListener = void 0;
                                if (!options.fireAndForget) {
                                    responseListener = {
                                        name: name,
                                        window: win,
                                        domain: actualDomain,
                                        respond: function (err, result) {
                                            if (!err) {
                                                hasResult = !0;
                                                requestPromises.splice(requestPromises.indexOf(requestPromise, 1));
                                            }
                                            err ? reject(err) : resolve(result);
                                        }
                                    };
                                    (0, _drivers.addResponseListener)(hash, responseListener);
                                }
                                (0, _drivers.sendMessage)(win, {
                                    type: _conf.CONSTANTS.POST_MESSAGE_TYPE.REQUEST,
                                    hash: hash,
                                    name: name,
                                    data: options.data,
                                    fireAndForget: options.fireAndForget
                                }, actualDomain).catch(reject);
                                if (options.fireAndForget)
                                    return resolve();
                                var ackTimeout = _conf.CONFIG.ACK_TIMEOUT, resTimeout = options.timeout || _conf.CONFIG.RES_TIMEOUT, cycleTime = 100;
                                setTimeout(function cycle() {
                                    if (!hasResult) {
                                        if ((0, _src3.isWindowClosed)(win))
                                            return responseListener.ack ? reject(new Error("Window closed for " + name + " before response")) : reject(new Error("Window closed for " + name + " before ack"));
                                        ackTimeout = Math.max(ackTimeout - cycleTime, 0);
                                        -1 !== resTimeout && (resTimeout = Math.max(resTimeout - cycleTime, 0));
                                        if (responseListener.ack) {
                                            if (-1 === resTimeout)
                                                return;
                                            cycleTime = Math.min(resTimeout, 2e3);
                                        }
                                        else {
                                            if (0 === ackTimeout)
                                                return reject(new Error("No ack for postMessage " + name + " in " + (0, _src3.getDomain)() + " in " + _conf.CONFIG.ACK_TIMEOUT + "ms"));
                                            if (0 === resTimeout)
                                                return reject(new Error("No response for postMessage " + name + " in " + (0, _src3.getDomain)() + " in " + (options.timeout || _conf.CONFIG.RES_TIMEOUT) + "ms"));
                                        }
                                        setTimeout(cycle, cycleTime);
                                    }
                                }, cycleTime);
                            });
                        });
                        requestPromise.catch(function () {
                            (0, _drivers.markResponseListenerErrored)(hash);
                            (0, _drivers.deleteResponseListener)(hash);
                        });
                        requestPromises.push(requestPromise);
                        return requestPromise;
                    });
                }
                function _send(window, name, data, options) {
                    (options = options || {}).window = window;
                    options.name = name;
                    options.data = data;
                    return request(options);
                }
                exports.send = _send;
                _global.global.send = _send;
            },
            "./src/public/config.js": function (module, exports, __webpack_require__) {
                exports.__esModule = !0;
                exports.CONSTANTS = exports.CONFIG = void 0;
                var _conf = __webpack_require__("./src/conf/index.js");
                Object.defineProperty(exports, "CONFIG", {
                    enumerable: !0,
                    get: function () {
                        return _conf.CONFIG;
                    }
                });
                Object.defineProperty(exports, "CONSTANTS", {
                    enumerable: !0,
                    get: function () {
                        return _conf.CONSTANTS;
                    }
                });
                exports.disable = function () {
                    delete window[_conf.CONSTANTS.WINDOW_PROPS.POSTROBOT];
                    window.removeEventListener("message", _drivers.messageListener);
                };
                var _drivers = __webpack_require__("./src/drivers/index.js");
            },
            "./src/public/index.js": function (module, exports, __webpack_require__) {
                exports.__esModule = !0;
                exports.parent = void 0;
                var _client = __webpack_require__("./src/public/client.js");
                Object.keys(_client).forEach(function (key) {
                    "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                        enumerable: !0,
                        get: function () {
                            return _client[key];
                        }
                    });
                });
                var _server = __webpack_require__("./src/public/server.js");
                Object.keys(_server).forEach(function (key) {
                    "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                        enumerable: !0,
                        get: function () {
                            return _server[key];
                        }
                    });
                });
                var _config = __webpack_require__("./src/public/config.js");
                Object.keys(_config).forEach(function (key) {
                    "default" !== key && "__esModule" !== key && Object.defineProperty(exports, key, {
                        enumerable: !0,
                        get: function () {
                            return _config[key];
                        }
                    });
                });
                var _src = __webpack_require__("./node_modules/cross-domain-utils/src/index.js");
                exports.parent = (0, _src.getAncestor)();
            },
            "./src/public/server.js": function (module, exports, __webpack_require__) {
                exports.__esModule = !0;
                exports.on = void 0;
                var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
                    return typeof obj;
                } : function (obj) {
                    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
                };
                exports.listen = listen;
                exports.once = function (name) {
                    var options = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, handler = arguments[2];
                    if ("function" == typeof options) {
                        handler = options;
                        options = {};
                    }
                    options = options || {};
                    handler = handler || options.handler;
                    var errorHandler = options.errorHandler, promise = new _src2.ZalgoPromise(function (resolve, reject) {
                        (options = options || {}).name = name;
                        options.once = !0;
                        options.handler = function (event) {
                            resolve(event);
                            if (handler)
                                return handler(event);
                        };
                        options.errorHandler = function (err) {
                            reject(err);
                            if (errorHandler)
                                return errorHandler(err);
                        };
                    }), onceListener = listen(options);
                    promise.cancel = onceListener.cancel;
                    return promise;
                };
                exports.listener = function () {
                    var options = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    return {
                        on: function (name, handler) {
                            return _on(name, options, handler);
                        }
                    };
                };
                var _src = __webpack_require__("./node_modules/cross-domain-utils/src/index.js"), _src2 = __webpack_require__("./node_modules/zalgo-promise/src/index.js"), _lib = __webpack_require__("./src/lib/index.js"), _drivers = __webpack_require__("./src/drivers/index.js"), _conf = __webpack_require__("./src/conf/index.js"), _global = __webpack_require__("./src/global.js");
                function listen(options) {
                    if (!options.name)
                        throw new Error("Expected options.name");
                    if (!options.handler)
                        throw new Error("Expected options.handler");
                    var name = options.name, win = options.window, domain = options.domain, listenerOptions = {
                        handler: options.handler,
                        handleError: options.errorHandler || function (err) {
                            throw err;
                        },
                        window: win,
                        domain: domain || _conf.CONSTANTS.WILDCARD,
                        name: name
                    }, requestListener = (0, _drivers.addRequestListener)({
                        name: name,
                        win: win,
                        domain: domain
                    }, listenerOptions);
                    if (options.once) {
                        var _handler = listenerOptions.handler;
                        listenerOptions.handler = (0, _lib.once)(function () {
                            requestListener.cancel();
                            return _handler.apply(this, arguments);
                        });
                    }
                    if (listenerOptions.window && options.errorOnClose)
                        var interval = (0, _lib.safeInterval)(function () {
                            if (win && "object" === (void 0 === win ? "undefined" : _typeof(win)) && (0, _src.isWindowClosed)(win)) {
                                interval.cancel();
                                listenerOptions.handleError(new Error("Post message target window is closed"));
                            }
                        }, 50);
                    return {
                        cancel: function () {
                            requestListener.cancel();
                        }
                    };
                }
                function _on(name, options, handler) {
                    if ("function" == typeof options) {
                        handler = options;
                        options = {};
                    }
                    (options = options || {}).name = name;
                    options.handler = handler || options.handler;
                    return listen(options);
                }
                exports.on = _on;
                _global.global.on = _on;
            }
        });
    });
});
unwrapExports(postRobot);
var postRobot_1 = postRobot.postRobot;
var postRobot$2 = createCommonjsModule(function (module) {
    /* @flow */
    // eslint-disable-next-line import/no-commonjs
    module.exports = postRobot;
    // eslint-disable-next-line import/no-commonjs
    module.exports.default = module.exports;
});
var BearerConfig = /** @class */ (function () {
    function BearerConfig(options) {
        if (options === void 0) { options = {}; }
        this.integrationHost = 'http://localhost:3000/';
        this.authorizationHost = 'http://localhost:3000/';
        this.postRobotLogLevel = 'error';
        this.update(options);
    }
    Object.defineProperty(BearerConfig.prototype, "clientId", {
        get: function () {
            return window.bearer && window.bearer.clientId;
        },
        enumerable: true,
        configurable: true
    });
    BearerConfig.prototype.update = function (options) {
        var _this_1 = this;
        Object.keys(options).forEach(function (key) {
            _this_1[key] = options[key];
        });
    };
    return BearerConfig;
}());
var Events;
(function (Events) {
    Events["SESSION_INITIALIZED"] = "BEARER_SESSION_INITIALIZED";
    Events["COOKIE_SETUP"] = "BEARER_COOKIE_SETUP";
    Events["HAS_AUTHORIZED"] = "BEARER_HAS_AUTHORIZED";
    Events["AUTHORIZED"] = "BEARER_AUTHORIZED";
    Events["REVOKE"] = "BEARER_REVOKE";
    Events["REVOKED"] = "BEARER_REVOKED";
})(Events || (Events = {}));
var Events$1 = Events;
var BEARER_WINDOW_INSTANCE_KEY = 'BEARER_INSTANCE';
var BEARER_EMITTER = 'BEARER_EMITTER';
var BEARER_WINDOW_KEY = 'BEARER';
var BEARER_CONFIG_KEY = 'BEARER_CONFIG';
var IFRAME_NAME = 'BEARER-IFRAME';
var LOG_LEVEL_KEY = 'LOG_LEVEL';
var Bearer = /** @class */ (function () {
    function Bearer(args) {
        var _this_1 = this;
        this.isSessionInitialized = false;
        this.authorized = function (data) {
            Bearer.emitter.emit(Events$1.AUTHORIZED, data);
        };
        this.revoked = function (data) {
            Bearer.emitter.emit(Events$1.REVOKED, data);
        };
        this.hasAuthorized = function (scenarioId) { return new Promise(function (resolve, reject) {
            postRobot$2
                .send(_this_1.iframe, Events$1.HAS_AUTHORIZED, {
                scenarioId: scenarioId,
                clientId: Bearer.config.clientId
            })
                .then(function (_a) {
                var data = _a.data, authorized = _a.data.authorized;
                console.debug('[BEARER]', 'HAS_AUTHORIZED response', data);
                authorized ? resolve(true) : reject(false);
            })
                .catch(iframeError);
        }); };
        this.revokeAuthorization = function (scenarioId) {
            postRobot$2
                .send(_this_1.iframe, Events$1.REVOKE, {
                scenarioId: scenarioId,
                clientId: Bearer.config.clientId
            })
                .then(function () {
                console.debug('[BEARER]', 'Signing out');
            })
                .catch(iframeError);
        };
        this.askAuthorizations = function (_a) {
            var scenarioId = _a.scenarioId, setupId = _a.setupId, _b = _a.authRefId, authRefId = _b === void 0 ? '' : _b;
            if (_this_1.isSessionInitialized) {
                var AUTHORIZED_URL = Bearer.config.integrationHost + "v1/auth/" + scenarioId + "?setupId=" + setupId + "&authId=" + authRefId;
                window.open(AUTHORIZED_URL, '', 'resizable,scrollbars,status,centerscreen=yes,width=500,height=600');
                return true;
            }
            return false;
        };
        this.bearerConfig = new BearerConfig(args || {});
        this.maybeInitialized = new Promise(function (resolve, _reject) {
            _this_1.allowIntegrationRequests = resolve;
        });
        window[LOG_LEVEL_KEY] = this.bearerConfig.postRobotLogLevel;
        this.initSession();
    }
    Object.defineProperty(Bearer, "_instance", {
        get: function () {
            return window[BEARER_WINDOW_INSTANCE_KEY];
        },
        set: function (bearerInstance) {
            if (window[BEARER_WINDOW_INSTANCE_KEY]) {
                console.warn('[BEARER]', 'Replacing bearer instance');
            }
            window[BEARER_WINDOW_INSTANCE_KEY] = bearerInstance;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bearer, "emitter", {
        get: function () {
            if (!window[BEARER_EMITTER]) {
                window[BEARER_EMITTER] = new fbemitter_2();
            }
            return window[BEARER_EMITTER];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bearer, "instance", {
        get: function () {
            return window[BEARER_WINDOW_INSTANCE_KEY] || this.init({});
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bearer, "config", {
        get: function () {
            return this.instance.bearerConfig;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bearer, "version", {
        get: function () {
            return '0.75.0';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bearer.prototype, "bearerConfig", {
        get: function () {
            return window[BEARER_WINDOW_KEY];
        },
        set: function (config$$1) {
            window[BEARER_WINDOW_KEY] = config$$1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bearer.prototype, "maybeInitialized", {
        get: function () {
            if (!this.isSessionInitialized) {
                console.warn('[BEARER]', 'Waiting Bearer to be initialized');
            }
            return this._maybeInitialized;
        },
        set: function (promise) {
            this._maybeInitialized = promise;
        },
        enumerable: true,
        configurable: true
    });
    Bearer.init = function (config$$1) {
        if (config$$1 === void 0) { config$$1 = {}; }
        if (this._instance) {
            console.warn('One instance is already configured, reaplacing it');
        }
        this._instance = new Bearer(Object.assign({}, config$$1, (window[BEARER_CONFIG_KEY] || {})));
        return this._instance;
    };
    Bearer.prototype.initSession = function () {
        var _this_1 = this;
        if (window !== undefined && !document.querySelector("#" + IFRAME_NAME)) {
            postRobot$2.on(Events$1.SESSION_INITIALIZED, function (event) {
                _this_1.sessionInitialized(event);
            });
            postRobot$2.on(Events$1.AUTHORIZED, this.authorized);
            postRobot$2.on(Events$1.REVOKED, this.revoked);
            this.iframe = document.createElement('iframe');
            this.iframe.src = this.bearerConfig.authorizationHost + "v1/user/initialize";
            this.iframe.id = IFRAME_NAME;
            this.iframe.width = '0';
            this.iframe.height = '0';
            this.iframe.frameBorder = '0';
            this.iframe.style.display = 'none';
            document.body.appendChild(this.iframe);
        }
    };
    Bearer.prototype.sessionInitialized = function (_event) {
        console.debug('[BEARER]', 'session initialized');
        this.isSessionInitialized = true;
        this.allowIntegrationRequests(true);
    };
    return Bearer;
}());
Bearer.onAuthorized = function (scenarioId, callback) {
    console.debug('[BEARER]', 'onAuthorized', 'register', scenarioId);
    return Bearer.emitter.addListener(Events$1.AUTHORIZED, function (data) {
        if (data.data.scenarioId === scenarioId) {
            console.debug('[BEARER]', 'onAuthorized', 'authorized', scenarioId);
            callback(true);
        }
        else {
            console.debug('[BEARER]', 'onAuthorized', 'different scenarioId', scenarioId);
        }
    });
};
Bearer.onRevoked = function (scenarioId, callback) {
    console.debug('[BEARER]', 'register onRevoked', scenarioId);
    return Bearer.emitter.addListener(Events$1.REVOKED, function (data) {
        if (data.data.scenarioId === scenarioId) {
            console.debug('[BEARER]', 'onRevoked', 'revoked', scenarioId);
            callback(false);
        }
        else {
            console.debug('[BEARER]', 'onRevoked', 'different scenarioId', scenarioId);
        }
    });
};
function iframeError(e) {
    console.error('[BEARER]', 'Error contacting iframe', e);
}
var hasOwn = {}.hasOwnProperty;
function classNames() {
    var args = [];
    for (var _a = 0; _a < arguments.length; _a++) {
        args[_a] = arguments[_a];
    }
    var classes = [];
    for (var i = 0; i < args.length; i++) {
        var arg = args[i];
        if (!arg)
            continue;
        var argType = typeof arg;
        if (argType === 'string' || argType === 'number') {
            classes.push(arg);
        }
        else if (Array.isArray(arg) && arg.length) {
            var inner = classNames.apply(null, arg);
            if (inner) {
                classes.push(inner);
            }
        }
        else if (argType === 'object') {
            for (var key in arg) {
                if (hasOwn.call(arg, key) && arg[key]) {
                    classes.push(key);
                }
            }
        }
    }
    return classes.join(' ');
}
var Logger = /** @class */ (function () {
    function Logger(namespace) {
        this.namespace = namespace;
    }
    Logger.prototype.log = function () {
        var args = [];
        for (var _a = 0; _a < arguments.length; _a++) {
            args[_a] = arguments[_a];
        }
        if (console) {
            console.log.apply(null, ["[" + this.namespace + "]"].concat(args));
        }
    };
    return Logger;
}());
// const logger = namespace => new Logger(namespace)
function logger(namespace) {
    return new Logger(namespace);
}
var Debug = /*#__PURE__*/ Object.freeze({
    default: logger
});
// global fetch
var defaultInit = {
    headers: {
        'user-agent': 'Bearer',
        'content-type': 'application/json'
    },
    credentials: 'include'
};
function getClientId() {
    var clientId = Bearer.config.clientId;
    {
        console.debug('[BEARER]', 'No clientId provided, intent');
    }
    return clientId;
}
function bearerRequest(uri, baseParams) {
    if (baseParams === void 0) { baseParams = {}; }
    var url = Bearer.config.integrationHost + "api/v1/" + uri;
    return function (params, init) {
        if (params === void 0) { params = {}; }
        if (init === void 0) { init = {}; }
        return new Promise(function (resolve, reject) {
            Bearer.instance.maybeInitialized
                .then(function () {
                var sentParams = Object.assign({}, params, baseParams, { clientId: getClientId() });
                var query = Object.keys(sentParams).map(function (key) { return [key, sentParams[key]].join('='); });
                var uri = url + "?" + query.join('&');
                fetch
                    .apply(null, [uri, Object.assign({}, defaultInit, init)])
                    .then(function (response) {
                    var data = response.json();
                    if (response.status > 399) {
                        console.debug('[BEARER]', 'failing request', response);
                        reject(data);
                    }
                    else {
                        console.debug('[BEARER]', 'successful request', response);
                        resolve(data);
                    }
                })
                    .catch(function (e) { return console.error('Unexpected error 😞', e); });
            })
                .catch(function () { return console.error('[BEARER', 'Erro while waiting for authentication'); });
        });
    };
}
function itemRequest() {
    return bearerRequest('items');
}
function intentRequest(_a) {
    var intentName = _a.intentName, scenarioId = _a.scenarioId, setupId = _a.setupId;
    return bearerRequest(scenarioId + "/" + intentName, { setupId: setupId });
}
var requests = {
    intentRequest: intentRequest,
    itemRequest: itemRequest
};
var Requests = /*#__PURE__*/ Object.freeze({
    bearerRequest: bearerRequest,
    itemRequest: itemRequest,
    intentRequest: intentRequest,
    default: requests
});
function storeSetup(payload) {
    return postSetup(Object.assign({}, payload, { ReadAllowed: false }));
}
function storeSecret(referenceId, payload) {
    return putItem(referenceId, Object.assign({}, payload, { ReadAllowed: false }));
}
function storeData(referenceId, payload) {
    return putItem(referenceId, Object.assign({}, payload, { ReadAllowed: true }));
}
function getData(referenceId) {
    var request = intentRequest({
        intentName: referenceId,
        scenarioId: 'items',
        setupId: 'TODO'
    });
    return request({}, {});
}
function removeData(referenceId) {
    var request = intentRequest({
        intentName: referenceId,
        scenarioId: 'items',
        setupId: 'TODO'
    });
    return request({}, {
        method: 'DELETE'
    });
}
function postSetup(payload) {
    var request = itemRequest();
    return request({}, {
        method: 'POST',
        body: JSON.stringify(payload)
    });
}
function putItem(referenceId, payload) {
    var request = intentRequest({
        intentName: referenceId,
        scenarioId: 'items',
        setupId: 'TODO'
    });
    return request({}, {
        method: 'PUT',
        body: JSON.stringify(payload)
    });
}
var bearerState = /*#__PURE__*/ Object.freeze({
    storeSetup: storeSetup,
    storeSecret: storeSecret,
    storeData: storeData,
    getData: getData,
    removeData: removeData
});
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
function __rest(s, e) {
    var t = {};
    for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++)
            if (e.indexOf(p[i]) < 0)
                t[p[i]] = s[p[i]];
    return t;
}
/**
 * Declarations
 */
var IntentType;
(function (IntentType) {
    IntentType["RetrieveState"] = "RetrieveState";
    IntentType["SaveState"] = "SaveState";
    IntentType["FetchData"] = "FetchData";
})(IntentType || (IntentType = {}));
/**
 * Constants
 */
var BearerContext = 'bearerContext';
var setupId = 'setupId';
/**
 * Intent
 */
// Usage
// @Intent('intentName') propertyName: BearerFetch
// or
// @Intent('intentNameResource', IntentType.FetchData) propertyName: BearerFetch
function Intent(intentName, type) {
    if (type === void 0) { type = IntentType.FetchData; }
    return function (target, key) {
        var getter = function () {
            return function (params) {
                if (params === void 0) { params = {}; }
                var _a;
                // NOTE: here we have to use target. Not sure why
                var scenarioId = target.SCENARIO_ID;
                if (!scenarioId) {
                    return missingScenarioId();
                }
                var intent = intentRequest((_a = {
                        intentName: intentName,
                        scenarioId: scenarioId
                    },
                    _a[setupId] = retrieveSetupId(target),
                    _a));
                // prepare params and body
                var referenceId = retrieveReferenceId(this);
                if (type === IntentType.RetrieveState && !referenceId) {
                    return missingReferenceId();
                }
                var body = params.body, queryParams = __rest(params, ["body"]);
                var baseQuery = referenceId ? { referenceId: referenceId } : {};
                var query = Object.assign({}, baseQuery, queryParams);
                var init = { method: 'POST', body: JSON.stringify(body || {}) };
                // Build promise
                return IntentPromise(intent(query, init));
            };
        };
        defineIntentProp(target, key, getter);
    };
}
function IntentPromise(promise) {
    return new Promise(function (resolve, reject) {
        promise
            .then(function (payload) {
            if (payload.error) {
                reject({ error: payload.error });
            }
            else {
                var data = payload.data, _a = payload.meta, referenceId = (_a === void 0 ? { referenceId: null } : _a).referenceId;
                resolve({ data: data, referenceId: referenceId });
            }
        })
            .catch(function (error) {
            reject({ error: error });
        });
    });
}
/**
 * Helpers
 */
function missingScenarioId() {
    console.info('[BEARER]', 'Missing scenarioId, skipping api call');
    return Promise.reject(new BearerMissingScenarioId());
}
function missingReferenceId() {
    console.info('[BEARER]', 'Missing referenceId, skipping RetrieveState api call');
    return Promise.reject(new BearerMissingReferenceId());
}
function retrieveSetupId(target) {
    return target.setupId || (target[BearerContext] && target[BearerContext][setupId]);
}
function retrieveReferenceId(target) {
    return target.referenceId;
}
function defineIntentProp(target, key, getter) {
    var setter = function () { };
    if (delete target[key]) {
        Object.defineProperty(target, key, {
            get: getter,
            set: setter
        });
    }
}
/**
 * Custom Errors
 */
var BearerMissingReferenceId = /** @class */ (function (_super) {
    __extends(BearerMissingReferenceId, _super);
    function BearerMissingReferenceId(group) {
        if (group === void 0) { group = 'feature'; }
        var _this_1 = _super.call(this) || this;
        _this_1.group = group;
        _this_1.message = "Attribute " + _this_1.group + "ReferenceId is missing. Cannot fetch data without any reference";
        return _this_1;
    }
    return BearerMissingReferenceId;
}(Error));
var BearerMissingScenarioId = /** @class */ (function (_super) {
    __extends(BearerMissingScenarioId, _super);
    function BearerMissingScenarioId() {
        var _this_1 = _super.apply(this, arguments) || this;
        _this_1.message = 'Scenario ID is missing. Please add @RootComponent decorator above your class definition';
        return _this_1;
    }
    return BearerMissingScenarioId;
}(Error));
var StateManager = bearerState;
var Events$2 = Events$1;
var classnames = classNames;
{
    console.warn("[BEARER] Running non production Bearer Core lib | version " + Bearer.version);
}
export { classnames as a, Bearer as b, StateManager as c, Events$2 as d, Intent as e };
