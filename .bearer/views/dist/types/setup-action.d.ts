import './stencil.core';
import '@bearer/ui';
export declare class SetupAction {
    onSetupSuccess: (detail: any) => void;
    fields: {
        "type": string;
        "label": string;
        "controlName": string;
    }[];
    innerListener: string;
    render(): JSX.Element;
    constructor();
    readonly SCENARIO_ID: string;
    bearerContext: any;
    setupId: string;
    componentDidLoad(): void;
}
