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
/*! Built with http://stenciljs.com */
import { h } from './localhost.core.js';
import { b as Bearer, d as Events$2 } from './chunk-db1ab781.js';
import { a as GoogleDrive } from './chunk-5aa181c9.js';
var ConnectAction = /** @class */ (function () {
    function ConnectAction() {
        var _this = this;
        this.authId = null;
        this.renderUnauthorized = function (_a) {
            var authenticate = _a.authenticate;
            return (h("bearer-button", { kind: "light", onClick: authenticate }, h("span", { class: "root" }, h(GoogleDrive, null), h("span", null, "Connect your Google Drive"))));
        };
        this.authenticate = function () {
            _this.el.querySelector('bearer-authorized').authenticate();
        };
    }
    ConnectAction.prototype.render = function () {
        var _this = this;
        return [
            h("bearer-authorized", { renderUnauthorized: this.renderUnauthorized, renderAuthorized: function (_a) {
                    var revoke = _a.revoke;
                    return _this.authIdInternal && (h("bearer-button", { kind: "danger", onClick: revoke }, h("span", null, "Revoke access to your Google Drive")));
                }, scenarioId: "607e36-poc-google-attach-file" })
        ];
    };
    Object.defineProperty(ConnectAction.prototype, "SCENARIO_ID", {
        get: function () { return "607e36-poc-google-attach-file"; },
        enumerable: true,
        configurable: true
    });
    ConnectAction.prototype.componentDidLoad = function () {
        var _this = this;
        if (this.setupId) {
            this.bearerContext.setupId = this.setupId;
        }
        this.authIdInternal = this.authId;
        Bearer.emitter.addListener(Events$2.AUTHORIZED, function (_a) {
            var data = _a.data;
            var authId = data.authId || data.authIdentifier;
            _this.authId = _this.authIdInternal = authId;
            _this.authorized.emit({ authId: authId });
        });
        Bearer.emitter.addListener(Events$2.REVOKED, function (_payload) {
            _this.authIdInternal = _this.authId = null;
            _this.revoked.emit({ authId: _this.authId });
        });
    };
    Object.defineProperty(ConnectAction, "is", {
        get: function () { return "connect-action"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectAction, "properties", {
        get: function () {
            return {
                "authId": {
                    "type": String,
                    "attr": "auth-id",
                    "mutable": true
                },
                "authIdInternal": {
                    "state": true
                },
                "bearerContext": {
                    "context": "bearer"
                },
                "el": {
                    "elementRef": true
                },
                "setupId": {
                    "type": String,
                    "attr": "setup-id"
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectAction, "events", {
        get: function () {
            return [{
                    "name": "bearer|607e36-poc-google-attach-file|connect|authorized",
                    "method": "authorized",
                    "bubbles": true,
                    "cancelable": true,
                    "composed": true
                }, {
                    "name": "bearer|607e36-poc-google-attach-file|connect|revoked",
                    "method": "revoked",
                    "bubbles": true,
                    "cancelable": true,
                    "composed": true
                }];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConnectAction, "style", {
        get: function () { return ".root {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n}\n\nsvg {\n  margin-right: 5px;\n}"; },
        enumerable: true,
        configurable: true
    });
    return ConnectAction;
}());
var AuthenticationListener = /** @class */ (function () {
    function AuthenticationListener() {
        var _this = this;
        this.askAuthorization = function (authRefId) {
            console.debug('[BEARER]', 'authenticate', _this.SCENARIO_ID, _this.bearerContext.setupId);
            Bearer.instance.askAuthorizations({
                scenarioId: _this.SCENARIO_ID,
                setupId: _this.bearerContext.setupId,
                authRefId: authRefId
            });
        };
        this.revokeAuthorization = function () {
            Bearer.instance.revokeAuthorization(_this.SCENARIO_ID);
        };
        this.componentDidUnload = function () {
            if (_this.authorizedListener) {
                _this.authorizedListener.remove();
                _this.authorizedListener = null;
            }
            if (_this.revokedListener) {
                _this.revokedListener.remove();
                _this.revokedListener = null;
            }
        };
    }
    AuthenticationListener.prototype.componentDidLoad = function () {
        var _this = this;
        Bearer.instance.maybeInitialized
            .then(function () {
            if (_this.onSessionInitialized) {
                _this.onSessionInitialized();
            }
            _this.authorizedListener = Bearer.onAuthorized(_this.SCENARIO_ID, _this.onAuthorized);
            _this.revokedListener = Bearer.onRevoked(_this.SCENARIO_ID, _this.onRevoked);
            Bearer.instance
                .hasAuthorized(_this.SCENARIO_ID)
                .then(function () {
                console.debug('[BEARER]', 'authorized');
                _this.onAuthorized();
            })
                .catch(function (error) {
                console.debug('[BEARER]', 'unauthorized', { error: error });
                _this.onRevoked();
            });
        })
            .catch(function (error) {
            console.error('[BEARER]', 'Could not initialize session', { error: error });
        });
    };
    return AuthenticationListener;
}());
// TODO: scope  authenticatePromise per scenario/setup
// @WithAuthentication()
var BearerAuthorized = /** @class */ (function (_super) {
    __extends(BearerAuthorized, _super);
    function BearerAuthorized() {
        var _this = _super.apply(this, arguments) || this;
        _this.isAuthorized = null;
        _this.sessionInitialized = false;
        _this.onAuthorized = function () {
            console.debug('[BEARER]', 'onAuthorized', !!_this.pendingAuthorizationResolve);
            _this.isAuthorized = true;
            if (_this.pendingAuthorizationResolve) {
                _this.pendingAuthorizationResolve(true);
            }
            _this.resetPendingPromises();
        };
        _this.onRevoked = function () {
            _this.isAuthorized = false;
            console.debug('[BEARER]', 'onRevoked', !!_this.pendingAuthorizationReject);
            if (_this.pendingAuthorizationReject) {
                _this.pendingAuthorizationReject(false);
            }
            _this.resetPendingPromises();
        };
        _this.onSessionInitialized = function () {
            _this.sessionInitialized = true;
        };
        _this.authenticatePromise = function (authRefId) {
            var promise = new Promise(function (resolve, reject) {
                _this.pendingAuthorizationResolve = resolve;
                _this.pendingAuthorizationReject = reject;
            });
            _this.askAuthorization(authRefId);
            return promise;
        };
        _this.revokePromise = function () {
            _this.revokeAuthorization();
            return Promise.resolve(true);
        };
        _this.resetPendingPromises = function () {
            _this.pendingAuthorizationResolve = null;
            _this.pendingAuthorizationReject = null;
        };
        return _this;
    }
    Object.defineProperty(BearerAuthorized.prototype, "SCENARIO_ID", {
        get: function () {
            return this.scenarioId;
        },
        enumerable: true,
        configurable: true
    });
    BearerAuthorized.prototype.authenticate = function (authRefId) {
        this.authenticatePromise(authRefId)
            .then(function (data) {
            console.debug('[BEARER]', 'bearer-authorized', 'authenticated', data);
        })
            .catch(function (error) {
            console.debug('[BEARER]', 'bearer-authenticated', 'error', error);
        });
    };
    BearerAuthorized.prototype.revoke = function () {
        this.revokePromise();
    };
    BearerAuthorized.prototype.render = function () {
        if (!this.sessionInitialized || this.isAuthorized === null) {
            return null;
        }
        if (!this.isAuthorized) {
            return this.renderUnauthorized
                ? this.renderUnauthorized({ authenticate: this.authenticatePromise })
                : 'Unauthorized';
        }
        return this.renderAuthorized ? this.renderAuthorized({ revoke: this.revokePromise }) : h("slot", null);
    };
    Object.defineProperty(BearerAuthorized, "is", {
        get: function () { return "bearer-authorized"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BearerAuthorized, "properties", {
        get: function () {
            return {
                "authenticate": {
                    "method": true
                },
                "bearerContext": {
                    "context": "bearer"
                },
                "isAuthorized": {
                    "state": true
                },
                "renderAuthorized": {
                    "type": "Any",
                    "attr": "render-authorized"
                },
                "renderUnauthorized": {
                    "type": "Any",
                    "attr": "render-unauthorized"
                },
                "revoke": {
                    "method": true
                },
                "scenarioId": {
                    "type": String,
                    "attr": "scenario-id"
                },
                "sessionInitialized": {
                    "state": true
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    return BearerAuthorized;
}(AuthenticationListener));
export { ConnectAction, BearerAuthorized };
