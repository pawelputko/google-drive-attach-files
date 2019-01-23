/*
  The purpose of this component is to be the result of your scenario.
  Its responsibility is to retrieve the scenario state from a previous action
  of a user.
*/
import { Component, Listen, State, Intent, Watch, Prop, Event } from '@bearer/core';
export class FeatureDisplay {
    constructor() {
        this.removeFile = file => {
            this.files = this.attachedFiles = this.files.filter(item => item != file);
        };
        this.files = [];
        this._loadFiles = () => {
            this.fetcherRetrieveFiles({ referenceId: this.filesRefId }).then(({ data }) => {
                this.files = data;
            });
        };
        this.attachedFiles = [];
        Intent("retrieveFiles")(this, "fetcherRetrieveFiles");
        Intent("saveAttachedFiles")(this, "saveAttachedFiles");
    }
    render() {
        this.attachedFiles = this.files;
        if (!this.files.length) {
            return h("bearer-alert", null, "No Files attached");
        }
        return (this.files.map(file => (h("div", { class: "attached-file" },
            file.name,
            " ",
            file.mimeType,
            " ",
            file.size,
            h("button", { class: "delete-button", onClick: () => this.removeFile(file) }, " \u00D7 ")))));
    }
    filesRefIdChanged(event) {
        if (this.filesRefId !== event.detail.referenceId) {
            this.filesRefId = event.detail.referenceId;
        }
        else {
            this._loadFiles();
        }
    }
    _watchFiles(newValueName) {
        if (newValueName) {
            this._loadFiles();
        }
    }
    attachedFilesSavedWatcher(newValue) {
        this.saveAttachedFiles({ body: { attachedFiles: newValue }, referenceId: this.attachedFilesRefId }).then(({ referenceId, data }) => {
            this.attachedFilesSaved.emit({ referenceId, attachedFiles: data || this.attachedFiles });
            this.attachedFilesRefId = referenceId;
        });
    }
    get SCENARIO_ID() { return "607e36-poc-google-attach-file"; }
    componentDidLoad() {
        if (this.setupId) {
            this.bearerContext.setupId = this.setupId;
        }
        if (this.filesRefId) {
            this._loadFiles();
        }
    }
    static get is() { return "feature-display"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "attachedFiles": {
            "state": true,
            "watchCallbacks": ["attachedFilesSavedWatcher"]
        },
        "attachedFilesRefId": {
            "type": String,
            "attr": "attached-files-ref-id",
            "mutable": true
        },
        "bearerContext": {
            "context": "bearer"
        },
        "files": {
            "state": true
        },
        "filesRefId": {
            "type": String,
            "attr": "files-ref-id",
            "mutable": true,
            "watchCallbacks": ["_watchFiles"]
        },
        "setupId": {
            "type": String,
            "attr": "setup-id"
        }
    }; }
    static get events() { return [{
            "name": "bearer|607e36-poc-google-attach-file|feature|attachedFilesSaved",
            "method": "attachedFilesSaved",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get listeners() { return [{
            "name": "body:bearer|607e36-poc-google-attach-file|feature|filesSaved",
            "method": "filesRefIdChanged"
        }]; }
    static get style() { return "/**style-placeholder:feature-display:**/"; }
}
