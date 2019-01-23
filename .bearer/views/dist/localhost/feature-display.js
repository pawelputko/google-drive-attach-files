/*! Built with http://stenciljs.com */
const { h } = window.localhost;

import { e as Intent } from './chunk-db1ab781.js';

/*
  The purpose of this component is to be the result of your scenario.
  Its responsibility is to retrieve the scenario state from a previous action
  of a user.
*/
class FeatureDisplay {
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
    static get style() { return ".attach-files-button {\n    border: none;\n    background: #fff;\n    cursor: pointer;\n    font-size: 50px;\n}\n\n#my-modal {\n    height: 360px;\n    z-index: 1;\n    width: 320px;\n    border-radius: 3%;\n    border: 1px;\n    position: absolute;\n    padding: 16px 32px;\n    top: 0;\n    margin: 0 15%;\n    overflow-y: scroll;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n    -ms-flex-direction: column;\n    flex-direction: column;\n    -webkit-box-pack: justify;\n    -ms-flex-pack: justify;\n    justify-content: space-between;\n    line-height: 30px;\n    -webkit-box-shadow: 10px 10px 24px -5px rgba(221,223,228,1);\n    -moz-box-shadow: 10px 10px 24px -5px rgba(221,223,228,1);\n    box-shadow: 10px 10px 24px -5px rgba(221,223,228,1);\n}\n\n::-webkit-scrollbar {\n    display: none;\n}\n\n.root {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -ms-flex-align: center;\n    align-items: center;\n}\n\nsvg {\n    margin-right: 5px;\n}\n\n.header {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n}\n\n.back-button {\n    border: none;\n    background: #fff;\n    cursor: pointer;\n    font-size: 50px;\n    color: #B3B6C6;\n}\n\n.header-message {\n    margin: 18px 0 0 0;\n}\n\n.close-button {\n    border: none;\n    margin: 22px 7px;\n    background: #fff;\n    cursor: pointer;\n    position: absolute;\n    right: 0;\n    top: 0;\n    font-size: 25px;\n    color: #B3B6C6;\n}\n\n.search-input {\n    border: none;\n    background: #F6F8FF;\n    height: 30px;\n    width: 100%;\n    font-size: 12px;\n}\n\n.search-input::-webkit-input-placeholder {\n    color: #CACEDB;\n}\n\n.search-input:-ms-input-placeholder {\n    color: #CACEDB;\n}\n\n.search-input::-ms-input-placeholder {\n    color: #CACEDB;\n}\n\n.search-input::placeholder {\n    color: #CACEDB;\n}\n\n.list {\n    height: 60%;\n    overflow: auto;\n}\n\n.folder > .folder-arrow {\n    font-size: 30px;\n    color: #B3B6C6;\n}\n\n.folder-arrow {\n    cursor: pointer;\n    float: right;\n}\n\n.file-checkbox {\n    float: right;\n    border: #F1F1F6;\n    background: #fff;\n    border-radius: 50%;\n}\n\n.no-folder {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -ms-flex-align: center;\n    align-items: center;\n    -webkit-box-pack: center;\n    -ms-flex-pack: center;\n    justify-content: center;\n    height: 65%;\n}\n\n.save-button {\n    width: 100px;\n    background: #0FE49B;\n    border-radius: 5px;\n    border: none;\n    color: #fff;\n    height: 30px;\n    cursor: pointer;\n    font-weight: bold;\n    font-size: 1em;\n    position: absolute;\n    right: 5%;\n}\n\n.attached-file {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -ms-flex-align: center;\n    align-items: center;\n}\n\n.footer {\n    height: 40px;\n    position: absolute;\n    width: 345px;\n    bottom: 0;\n    background: #fff;\n}\n\n.delete-button {\n    border: none;\n    margin: 22px 7px;\n    background: #fff;\n    cursor: pointer;\n    font-size: 25px;\n}"; }
}

export { FeatureDisplay };
