import './stencil.core';
import { EventEmitter } from "@bearer/core";
export declare type TAuthorizedPayload = {
    authId: string;
};
export declare class ConnectAction {
    authorized: EventEmitter;
    revoked: EventEmitter;
    authIdInternal: string;
    authId: string;
    el: HTMLElement;
    renderUnauthorized: ({ authenticate }: {
        authenticate: any;
    }) => JSX.Element;
    authenticate: () => void;
    render(): JSX.Element[];
    constructor();
    readonly SCENARIO_ID: string;
    bearerContext: any;
    setupId: string;
    componentDidLoad(): void;
}
