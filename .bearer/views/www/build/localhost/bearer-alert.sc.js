/*! Built with http://stenciljs.com */
const { h } = window.localhost;

import { a as classnames } from './chunk-db1ab781.js';

class Alert {
    constructor() {
        this.kind = 'primary';
    }
    render() {
        const classes = classnames({
            alert: true,
            [`alert-${this.kind}`]: true,
            'alert-dismissible': this.onDismiss
        });
        return (h("div", { class: classes },
            this.content || h("slot", null),
            this.onDismiss && (h("button", { type: "button", class: "close", "data-dismiss": "alert", "aria-label": "Close", onClick: this.onDismiss },
                h("span", { "aria-hidden": "true" }, "\u00D7")))));
    }
    static get is() { return "bearer-alert"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "content": {
            "type": "Any",
            "attr": "content"
        },
        "kind": {
            "type": String,
            "attr": "kind"
        },
        "onDismiss": {
            "type": "Any",
            "attr": "on-dismiss"
        }
    }; }
    static get style() { return "\n.sc-bearer-alert-s > hr {\n  margin-top: 1rem;\n  margin-bottom: 1rem;\n  border: 0;\n  border-top: 1px solid rgba(0, 0, 0, 0.1); }\n\n.alert.sc-bearer-alert {\n  position: relative;\n  padding: 0.75rem 1.25rem;\n  margin-bottom: 1rem;\n  border: 1px solid transparent;\n  border-radius: 0.25rem; }\n\n.alert-heading.sc-bearer-alert {\n  color: inherit; }\n\n.alert-link.sc-bearer-alert {\n  font-weight: 700; }\n\n.alert-dismissible.sc-bearer-alert {\n  padding-right: 4rem; }\n  .alert-dismissible.sc-bearer-alert   .close.sc-bearer-alert {\n    position: absolute;\n    top: 0;\n    right: 0;\n    padding: 0.75rem 1.25rem;\n    color: inherit; }\n\n.alert-primary.sc-bearer-alert {\n  color: #004085;\n  background-color: #cce5ff;\n  border-color: #b8daff; }\n  .alert-primary .sc-bearer-alert-s > hr {\n    border-top-color: #9fcdff; }\n  .alert-primary .sc-bearer-alert-s > .alert-link {\n    color: #002752; }\n\n.alert-secondary.sc-bearer-alert {\n  color: #383d41;\n  background-color: #e2e3e5;\n  border-color: #d6d8db; }\n  .alert-secondary .sc-bearer-alert-s > hr {\n    border-top-color: #c8cbcf; }\n  .alert-secondary .sc-bearer-alert-s > .alert-link {\n    color: #202326; }\n\n.alert-success.sc-bearer-alert {\n  color: #155724;\n  background-color: #d4edda;\n  border-color: #c3e6cb; }\n  .alert-success .sc-bearer-alert-s > hr {\n    border-top-color: #b1dfbb; }\n  .alert-success .sc-bearer-alert-s > .alert-link {\n    color: #0b2e13; }\n\n.alert-info.sc-bearer-alert {\n  color: #0c5460;\n  background-color: #d1ecf1;\n  border-color: #bee5eb; }\n  .alert-info .sc-bearer-alert-s > hr {\n    border-top-color: #abdde5; }\n  .alert-info .sc-bearer-alert-s > .alert-link {\n    color: #062c33; }\n\n.alert-warning.sc-bearer-alert {\n  color: #856404;\n  background-color: #fff3cd;\n  border-color: #ffeeba; }\n  .alert-warning .sc-bearer-alert-s > hr {\n    border-top-color: #ffe8a1; }\n  .alert-warning .sc-bearer-alert-s > .alert-link {\n    color: #533f03; }\n\n.alert-danger.sc-bearer-alert {\n  color: #721c24;\n  background-color: #f8d7da;\n  border-color: #f5c6cb; }\n  .alert-danger .sc-bearer-alert-s > hr {\n    border-top-color: #f1b0b7; }\n  .alert-danger .sc-bearer-alert-s > .alert-link {\n    color: #491217; }\n\n.alert-light.sc-bearer-alert {\n  color: #818182;\n  background-color: #fefefe;\n  border-color: #fdfdfe; }\n  .alert-light .sc-bearer-alert-s > hr {\n    border-top-color: #ececf6; }\n  .alert-light .sc-bearer-alert-s > .alert-link {\n    color: #686868; }\n\n.alert-dark.sc-bearer-alert {\n  color: #1b1e21;\n  background-color: #d6d8d9;\n  border-color: #c6c8ca; }\n  .alert-dark .sc-bearer-alert-s > hr {\n    border-top-color: #b9bbbe; }\n  .alert-dark .sc-bearer-alert-s > .alert-link {\n    color: #040505; }\n\n.close.sc-bearer-alert {\n  float: right;\n  font-size: 1.5rem;\n  font-weight: 700;\n  line-height: 1;\n  color: #000;\n  text-shadow: 0 1px 0 #fff;\n  opacity: .5; }\n  .close.sc-bearer-alert:not(:disabled):not(.disabled) {\n    cursor: pointer; }\n    .close.sc-bearer-alert:not(:disabled):not(.disabled):hover, .close.sc-bearer-alert:not(:disabled):not(.disabled):focus {\n      color: #000;\n      text-decoration: none;\n      opacity: .75; }\n\nbutton.close.sc-bearer-alert {\n  padding: 0;\n  background-color: transparent;\n  border: 0;\n  -webkit-appearance: none; }\n"; }
}

export { Alert as BearerAlert };