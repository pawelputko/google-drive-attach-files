import Bearer, { Event, Prop, Element, State, Events, Component } from "@bearer/core";
import GoogleDrive from './components/GoogleDriveLogo';
export class ConnectAction {
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
        Bearer.emitter.addListener(Events.AUTHORIZED, ({ data }) => {
            const authId = data.authId || data.authIdentifier;
            this.authId = this.authIdInternal = authId;
            this.authorized.emit({ authId });
        });
        Bearer.emitter.addListener(Events.REVOKED, (_payload) => {
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
    static get style() { return "/**style-placeholder:connect-action:**/"; }
}
