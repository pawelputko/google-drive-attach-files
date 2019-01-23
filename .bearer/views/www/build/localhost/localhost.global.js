/*! Built with http://stenciljs.com */
(function(namespace,resourcesUrl){"use strict";
(function(resourcesUrl){
    /** localhost global **/

    class BearerContext {
        constructor() {
            this.state = {};
            this.subscribers = [];
            this.subscribe = (component) => {
                this.subscribers.push(component);
            };
            this.unsubscribe = (component) => {
                this.subscribers.filter(subscriber => subscriber === component);
            };
            this.update = (field, value) => {
                this.state[field] = value;
                this.subscribers.map(component => {
                    component.bearerUpdateFromState(this.state);
                });
            };
        }
        get setupId() {
            return this._setupId;
        }
        set setupId(setupId) {
            this._setupId = setupId;
        }
    }
    var BearerContext$1 = new BearerContext();

    Context.bearer = BearerContext$1;
})(resourcesUrl);
})("localhost");