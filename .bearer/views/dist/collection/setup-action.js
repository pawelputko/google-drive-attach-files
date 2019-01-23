/*
  The purpose of this component is to save scenario credentials.
  This file has been generated automatically and should not be edited.
*/
import { State, Prop, Component } from '@bearer/core';
export class SetupAction {
    constructor() {
        this.onSetupSuccess = (_any) => { };
        this.fields = [{ "type": "text", "label": "Client ID", "controlName": "clientID" }, { "type": "password", "label": "Client Secret", "controlName": "clientSecret" }];
        this.innerListener = `setup_success:BEARER_SCENARIO_ID`;
    }
    render() {
        return (h("bearer-dropdown-button", { innerListener: this.innerListener, btnProps: { content: "Setup component" } },
            h("bearer-setup", { onSetupSuccess: this.onSetupSuccess, scenarioId: "BEARER_SCENARIO_ID", fields: this.fields })));
    }
    get SCENARIO_ID() { return "607e36-poc-google-attach-file"; }
    componentDidLoad() {
        if (this.setupId) {
            this.bearerContext.setupId = this.setupId;
        }
    }
    static get is() { return "setup-action"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "bearerContext": {
            "context": "bearer"
        },
        "fields": {
            "state": true
        },
        "innerListener": {
            "state": true
        },
        "onSetupSuccess": {
            "type": "Any",
            "attr": "on-setup-success"
        },
        "setupId": {
            "type": String,
            "attr": "setup-id"
        }
    }; }
    static get style() { return "/**style-placeholder:setup-action:**/"; }
}
