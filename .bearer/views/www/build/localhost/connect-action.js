/*! Built with http://stenciljs.com */
const { h } = window.localhost;

import { b as Bearer, d as Events$2 } from './chunk-db1ab781.js';
import { a as GoogleDrive } from './chunk-5aa181c9.js';

class ConnectAction {
    constructor() {
        this.authId = null;
        this.renderUnauthorized = ({ authenticate }) => (h("bearer-button", { kind: "light", onClick: authenticate },
            h("span", { class: "root" },
                h(GoogleDrive, null),
                h("span", null, "Connect your Google Drive"))));
        this.authenticate = () => {
            this.el.querySelector('bearer-authorized').authenticate();
        };
    }
    render() {
        return [
            h("bearer-authorized", { renderUnauthorized: this.renderUnauthorized, renderAuthorized: ({ revoke }) => this.authIdInternal && (h("bearer-button", { kind: "danger", onClick: revoke },
                    h("span", null, "Revoke access to your Google Drive"))), scenarioId: "607e36-poc-google-attach-file" })
        ];
    }
    get SCENARIO_ID() { return "607e36-poc-google-attach-file"; }
    componentDidLoad() {
        if (this.setupId) {
            this.bearerContext.setupId = this.setupId;
        }
        this.authIdInternal = this.authId;
        Bearer.emitter.addListener(Events$2.AUTHORIZED, ({ data }) => {
            const authId = data.authId || data.authIdentifier;
            this.authId = this.authIdInternal = authId;
            this.authorized.emit({ authId });
        });
        Bearer.emitter.addListener(Events$2.REVOKED, (_payload) => {
            this.authIdInternal = this.authId = null;
            this.revoked.emit({ authId: this.authId });
        });
    }
    static get is() { return "connect-action"; }
    static get properties() { return {
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
    }; }
    static get events() { return [{
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
        }]; }
    static get style() { return ".root {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n}\n\nsvg {\n  margin-right: 5px;\n}"; }
}

class AuthenticationListener {
    constructor() {
        this.askAuthorization = (authRefId) => {
            console.debug('[BEARER]', 'authenticate', this.SCENARIO_ID, this.bearerContext.setupId);
            Bearer.instance.askAuthorizations({
                scenarioId: this.SCENARIO_ID,
                setupId: this.bearerContext.setupId,
                authRefId
            });
        };
        this.revokeAuthorization = () => {
            Bearer.instance.revokeAuthorization(this.SCENARIO_ID);
        };
        this.componentDidUnload = () => {
            if (this.authorizedListener) {
                this.authorizedListener.remove();
                this.authorizedListener = null;
            }
            if (this.revokedListener) {
                this.revokedListener.remove();
                this.revokedListener = null;
            }
        };
    }
    componentDidLoad() {
        Bearer.instance.maybeInitialized
            .then(() => {
            if (this.onSessionInitialized) {
                this.onSessionInitialized();
            }
            this.authorizedListener = Bearer.onAuthorized(this.SCENARIO_ID, this.onAuthorized);
            this.revokedListener = Bearer.onRevoked(this.SCENARIO_ID, this.onRevoked);
            Bearer.instance
                .hasAuthorized(this.SCENARIO_ID)
                .then(() => {
                console.debug('[BEARER]', 'authorized');
                this.onAuthorized();
            })
                .catch(error => {
                console.debug('[BEARER]', 'unauthorized', { error });
                this.onRevoked();
            });
        })
            .catch(error => {
            console.error('[BEARER]', 'Could not initialize session', { error });
        });
    }
}

// TODO: scope  authenticatePromise per scenario/setup
// @WithAuthentication()
class BearerAuthorized extends AuthenticationListener {
    constructor() {
        super(...arguments);
        this.isAuthorized = null;
        this.sessionInitialized = false;
        this.onAuthorized = () => {
            console.debug('[BEARER]', 'onAuthorized', !!this.pendingAuthorizationResolve);
            this.isAuthorized = true;
            if (this.pendingAuthorizationResolve) {
                this.pendingAuthorizationResolve(true);
            }
            this.resetPendingPromises();
        };
        this.onRevoked = () => {
            this.isAuthorized = false;
            console.debug('[BEARER]', 'onRevoked', !!this.pendingAuthorizationReject);
            if (this.pendingAuthorizationReject) {
                this.pendingAuthorizationReject(false);
            }
            this.resetPendingPromises();
        };
        this.onSessionInitialized = () => {
            this.sessionInitialized = true;
        };
        this.authenticatePromise = (authRefId) => {
            const promise = new Promise((resolve, reject) => {
                this.pendingAuthorizationResolve = resolve;
                this.pendingAuthorizationReject = reject;
            });
            this.askAuthorization(authRefId);
            return promise;
        };
        this.revokePromise = () => {
            this.revokeAuthorization();
            return Promise.resolve(true);
        };
        this.resetPendingPromises = () => {
            this.pendingAuthorizationResolve = null;
            this.pendingAuthorizationReject = null;
        };
    }
    get SCENARIO_ID() {
        return this.scenarioId;
    }
    authenticate(authRefId) {
        this.authenticatePromise(authRefId)
            .then(data => {
            console.debug('[BEARER]', 'bearer-authorized', 'authenticated', data);
        })
            .catch(error => {
            console.debug('[BEARER]', 'bearer-authenticated', 'error', error);
        });
    }
    revoke() {
        this.revokePromise();
    }
    render() {
        if (!this.sessionInitialized || this.isAuthorized === null) {
            return null;
        }
        if (!this.isAuthorized) {
            return this.renderUnauthorized
                ? this.renderUnauthorized({ authenticate: this.authenticatePromise })
                : 'Unauthorized';
        }
        return this.renderAuthorized ? this.renderAuthorized({ revoke: this.revokePromise }) : h("slot", null);
    }
    static get is() { return "bearer-authorized"; }
    static get properties() { return {
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
    }; }
}

export { ConnectAction, BearerAuthorized };
