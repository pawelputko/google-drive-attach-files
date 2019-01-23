/*! Built with http://stenciljs.com */
import { h } from './localhost.core.js';
import { b as Bearer } from './chunk-db1ab781.js';
/*
  The purpose of this component is to save scenario credentials.
*/
var SetupDisplay = /** @class */ (function () {
    function SetupDisplay() {
    }
    SetupDisplay.prototype.render = function () {
        return (h("bearer-setup-display", { scenarioId: "607e36-poc-google-attach-file", setupId: this.setupId }));
    };
    Object.defineProperty(SetupDisplay.prototype, "SCENARIO_ID", {
        get: function () { return "607e36-poc-google-attach-file"; },
        enumerable: true,
        configurable: true
    });
    SetupDisplay.prototype.componentDidLoad = function () {
        if (this.setupId) {
            this.bearerContext.setupId = this.setupId;
        }
    };
    Object.defineProperty(SetupDisplay, "is", {
        get: function () { return "setup-display"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SetupDisplay, "encapsulation", {
        get: function () { return "shadow"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SetupDisplay, "properties", {
        get: function () {
            return {
                "bearerContext": {
                    "context": "bearer"
                },
                "setupId": {
                    "type": String,
                    "attr": "setup-id"
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SetupDisplay, "style", {
        get: function () { return "\n\n"; },
        enumerable: true,
        configurable: true
    });
    return SetupDisplay;
}());
var BearerBadge = /** @class */ (function () {
    function BearerBadge() {
    }
    BearerBadge.prototype.render = function () {
        return h("span", { class: "badge badge-" + this.kind }, this.content || h("slot", null));
    };
    Object.defineProperty(BearerBadge, "is", {
        get: function () { return "bearer-badge"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BearerBadge, "encapsulation", {
        get: function () { return "shadow"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BearerBadge, "properties", {
        get: function () {
            return {
                "content": {
                    "type": "Any",
                    "attr": "content"
                },
                "kind": {
                    "type": String,
                    "attr": "kind"
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BearerBadge, "style", {
        get: function () { return "\n.badge.sc-bearer-badge {\n  display: inline-block;\n  padding: 0.25em 0.4em;\n  font-size: 75%;\n  font-weight: 700;\n  line-height: 1;\n  text-align: center;\n  white-space: nowrap;\n  vertical-align: baseline;\n  border-radius: 0.25rem; }\n  .badge.sc-bearer-badge:empty {\n    display: none; }\n\n.btn.sc-bearer-badge   .badge.sc-bearer-badge {\n  position: relative;\n  top: -1px; }\n\n.badge-pill.sc-bearer-badge {\n  padding-right: 0.6em;\n  padding-left: 0.6em;\n  border-radius: 10rem; }\n\n.badge-primary.sc-bearer-badge {\n  color: #fff;\n  background-color: #007bff; }\n  .badge-primary[href].sc-bearer-badge:hover, .badge-primary[href].sc-bearer-badge:focus {\n    color: #fff;\n    text-decoration: none;\n    background-color: #0062cc; }\n\n.badge-secondary.sc-bearer-badge {\n  color: #fff;\n  background-color: #6c757d; }\n  .badge-secondary[href].sc-bearer-badge:hover, .badge-secondary[href].sc-bearer-badge:focus {\n    color: #fff;\n    text-decoration: none;\n    background-color: #545b62; }\n\n.badge-success.sc-bearer-badge {\n  color: #fff;\n  background-color: #28a745; }\n  .badge-success[href].sc-bearer-badge:hover, .badge-success[href].sc-bearer-badge:focus {\n    color: #fff;\n    text-decoration: none;\n    background-color: #1e7e34; }\n\n.badge-info.sc-bearer-badge {\n  color: #fff;\n  background-color: #17a2b8; }\n  .badge-info[href].sc-bearer-badge:hover, .badge-info[href].sc-bearer-badge:focus {\n    color: #fff;\n    text-decoration: none;\n    background-color: #117a8b; }\n\n.badge-warning.sc-bearer-badge {\n  color: #212529;\n  background-color: #ffc107; }\n  .badge-warning[href].sc-bearer-badge:hover, .badge-warning[href].sc-bearer-badge:focus {\n    color: #212529;\n    text-decoration: none;\n    background-color: #d39e00; }\n\n.badge-danger.sc-bearer-badge {\n  color: #fff;\n  background-color: #dc3545; }\n  .badge-danger[href].sc-bearer-badge:hover, .badge-danger[href].sc-bearer-badge:focus {\n    color: #fff;\n    text-decoration: none;\n    background-color: #bd2130; }\n\n.badge-light.sc-bearer-badge {\n  color: #212529;\n  background-color: #f8f9fa; }\n  .badge-light[href].sc-bearer-badge:hover, .badge-light[href].sc-bearer-badge:focus {\n    color: #212529;\n    text-decoration: none;\n    background-color: #dae0e5; }\n\n.badge-dark.sc-bearer-badge {\n  color: #fff;\n  background-color: #343a40; }\n  .badge-dark[href].sc-bearer-badge:hover, .badge-dark[href].sc-bearer-badge:focus {\n    color: #fff;\n    text-decoration: none;\n    background-color: #1d2124; }\n"; },
        enumerable: true,
        configurable: true
    });
    return BearerBadge;
}());
var BearerSetupDisplay = /** @class */ (function () {
    function BearerSetupDisplay() {
        this.scenarioId = '';
        this.isSetup = false;
        this.setupId = '';
    }
    BearerSetupDisplay.prototype.componentDidLoad = function () {
        var _this = this;
        Bearer.emitter.addListener("setup_success:" + this.scenarioId, function (data) {
            _this.setupId = data.referenceId;
            _this.isSetup = true;
        });
    };
    BearerSetupDisplay.prototype.render = function () {
        if (this.isSetup || this.setupId) {
            return (h("p", null, "Scenario is currently setup with Setup ID:\u00A0", h("bearer-badge", { kind: "info" }, this.setupId)));
        }
        else {
            return (h("p", null, h("p", null, "Scenario hasn't been setup yet")));
        }
    };
    Object.defineProperty(BearerSetupDisplay, "is", {
        get: function () { return "bearer-setup-display"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BearerSetupDisplay, "encapsulation", {
        get: function () { return "shadow"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BearerSetupDisplay, "properties", {
        get: function () {
            return {
                "isSetup": {
                    "state": true
                },
                "scenarioId": {
                    "type": String,
                    "attr": "scenario-id"
                },
                "setupId": {
                    "type": String,
                    "attr": "setup-id",
                    "mutable": true
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    return BearerSetupDisplay;
}());
export { SetupDisplay, BearerBadge, BearerSetupDisplay };
