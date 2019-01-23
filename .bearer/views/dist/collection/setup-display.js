/*
  The purpose of this component is to save scenario credentials.
*/
import { Component, Prop } from "@bearer/core";
export class SetupDisplay {
    constructor() {
    }
    render() {
        return (h("bearer-setup-display", { scenarioId: "BEARER_SCENARIO_ID", setupId: this.setupId }));
    }
    get SCENARIO_ID() { return "607e36-poc-google-attach-file"; }
    componentDidLoad() {
        if (this.setupId) {
            this.bearerContext.setupId = this.setupId;
        }
    }
    static get is() { return "setup-display"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "bearerContext": {
            "context": "bearer"
        },
        "setupId": {
            "type": String,
            "attr": "setup-id"
        }
    }; }
    static get style() { return "/**style-placeholder:setup-display:**/"; }
}
