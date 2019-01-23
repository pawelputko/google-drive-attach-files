import Bearer, {RootComponent, Event, EventEmitter, Prop, Element, State, Events} from "@bearer/core";
import GoogleDrive from './components/GoogleDriveLogo';

export type TAuthorizedPayload = {
    authId: string
}

@RootComponent({
    role: 'action',
    group: 'connect',
    shadow: false
})
export class ConnectAction {
    @Event()
    authorized: EventEmitter<TAuthorizedPayload>;

    @Event()
    revoked: EventEmitter<TAuthorizedPayload>;

    @State()
    authIdInternal: string;

    @Prop({mutable: true})
    authId: string = null;

    @Element()
    el: HTMLElement;

    componentDidLoad() {
        this.authIdInternal = this.authId;

        Bearer.emitter.addListener(Events.AUTHORIZED, ({data}: {data: TAuthorizedPayload}) => {
            const authId = data.authId || (data as any).authIdentifier;
            this.authId = this.authIdInternal = authId;
            this.authorized.emit({authId});
        });

        Bearer.emitter.addListener(Events.REVOKED, (_payload: {data: TAuthorizedPayload}) => {
            this.authIdInternal = this.authId = null;
            this.revoked.emit({authId: this.authId});
        });
    }

    renderUnauthorized = ({ authenticate }) => (
        <bearer-button kind="light" onClick={authenticate}>
      <span class="root">
          <GoogleDrive />
        <span>Connect your Google Drive</span>
      </span>
        </bearer-button>
    );

    authenticate = () => {
        this.el.querySelector('bearer-authorized').authenticate();
    };

    render() {
        return [
            <bearer-authorized
                renderUnauthorized={this.renderUnauthorized}
                renderAuthorized={({revoke}) =>
                this.authIdInternal && (
                    <bearer-button kind="danger" onClick={revoke}>
                        <span>Revoke access to your Google Drive</span>
                    </bearer-button>
                )
            }/>
        ]
    }
}
