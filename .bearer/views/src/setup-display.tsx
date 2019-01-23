/*
  The purpose of this component is to save scenario credentials.
*/
import { Component, Prop } from "@bearer/core";
import "@bearer/ui";
@Component({
    tag: "setup-display",
    styleUrl: "setup.css",
    shadow: true
})
export class SetupDisplay {
    render() {
        return (<bearer-setup-display scenarioId="BEARER_SCENARIO_ID" setupId={this.setupId}/>);
    }
    constructor() {
    }
    get SCENARIO_ID() { return "607e36-poc-google-attach-file"; }
    @Prop({ "context": "bearer" })
    bearerContext: any;
    @Prop()
    setupId: string;
    componentDidLoad() {
        if (this.setupId) {
            this.bearerContext.setupId = this.setupId;
        }
    }
}
