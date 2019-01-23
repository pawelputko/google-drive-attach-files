/*
  The purpose of this component is to save scenario credentials.
  This file has been generated automatically and should not be edited.
*/
import { State, Prop, Component } from '@bearer/core';
import '@bearer/ui';
@Component({
    tag: "setup-action",
    styleUrl: "setup.css",
    shadow: true
})
export class SetupAction {
    @Prop()
    onSetupSuccess: (detail: any) => void = (_any: any) => { };
    @State()
    fields = [{ "type": "text", "label": "Client ID", "controlName": "clientID" }, { "type": "password", "label": "Client Secret", "controlName": "clientSecret" }];
    @State()
    innerListener = `setup_success:BEARER_SCENARIO_ID`;
    render() {
        return (<bearer-dropdown-button innerListener={this.innerListener} btnProps={{ content: "Setup component" }}>
        <bearer-setup onSetupSuccess={this.onSetupSuccess} scenarioId="BEARER_SCENARIO_ID" fields={this.fields}/>
      </bearer-dropdown-button>);
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
