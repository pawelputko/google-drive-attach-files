declare class BearerContext {
    private state;
    private subscribers;
    private _setupId;
    setupId: string;
    subscribe: (component: any) => void;
    unsubscribe: (component: any) => void;
    update: (field: any, value: any) => void;
}
declare const _default: BearerContext;
export default _default;
