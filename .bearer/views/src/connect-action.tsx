import Bearer, { Event, EventEmitter, Prop, Element, State, Events, Component } from "@bearer/core";
import GoogleDrive from './components/GoogleDriveLogo';
export type TAuthorizedPayload = {
    authId: string;
};
@Component({
    tag: "connect-action",
    styleUrl: "connect.css",
    shadow: false
})
export class ConnectAction {
    @Event({ eventName: "bearer|607e36-poc-google-attach-file|connect|authorized" })
    authorized: EventEmitter;
    @Event({ eventName: "bearer|607e36-poc-google-attach-file|connect|revoked" })
    revoked: EventEmitter;
    @State()
    authIdInternal: string;
    @Prop({ mutable: true })
    authId: string = null;
    @Element()
    el: HTMLElement;
    renderUnauthorized = ({ authenticate }) => (<bearer-button kind="light" onClick={authenticate}>
      <span class="root">
          <GoogleDrive />
        <span>Connect your Google Drive</span>
      </span>
        </bearer-button>);
    authenticate = () => {
        this.el.querySelector('bearer-authorized').authenticate();
    };
    render() {
        return [
            <bearer-authorized renderUnauthorized={this.renderUnauthorized} renderAuthorized={({ revoke }) => this.authIdInternal && (<bearer-button kind="danger" onClick={revoke}>
                        <span>Revoke access to your Google Drive</span>
                    </bearer-button>)} scenarioId="607e36-poc-google-attach-file"/>
        ];
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
        this.authIdInternal = this.authId;
        Bearer.emitter.addListener(Events.AUTHORIZED, ({ data }: {
            data: TAuthorizedPayload;
        }) => {
            const authId = data.authId || (data as any).authIdentifier;
            this.authId = this.authIdInternal = authId;
            this.authorized.emit({ authId });
        });
        Bearer.emitter.addListener(Events.REVOKED, (_payload: {
            data: TAuthorizedPayload;
        }) => {
            this.authIdInternal = this.authId = null;
            this.revoked.emit({ authId: this.authId });
        });
    }
}
