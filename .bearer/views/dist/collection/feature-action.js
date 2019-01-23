/*
  The purpose of this component is to deal with scenario navigation between each views.

*/
import { Element, Intent, Listen, Prop, State, Component, Watch, Event } from '@bearer/core';
import fuzzysearch from "./fuzzy";
import GoogleDrive from './components/GoogleDriveLogo';
export class FeatureAction {
    constructor() {
        this.fileItems = [];
        this.folders = [];
        this.data = null;
        this.storedFiles = [];
        this.path = ['GDrive'];
        this.message = 'Explore';
        this.selectedFolder = null;
        this.fetchFiles = () => {
            if (!this.authId) {
                return;
            }
            this.path = ['GDrive'];
            this.selectedFolder = null;
            this.openModal();
            this.clearData();
            this.fetchingFiles = true;
            this.listFiles({ authId: this.authId }).then(({ data }) => {
                if (!data.length) {
                    this.data = null;
                }
                else {
                    this.data = data;
                }
                this.message = 'Explore';
                this.sortData(this.data);
            })
                .catch(console.error)
                .then(() => this.fetchingFiles = false);
        };
        this.fetchFileInFolder = folder => {
            if (!this.authId) {
                return;
            }
            this.clearData();
            this.selectedFolder = folder;
            this.path.push(this.selectedFolder.name);
            this.fetchingFiles = true;
            this.listDeeperFiles({ authId: this.authId, folderId: folder.id }).then(({ data }) => {
                if (!data.length) {
                    this.data = null;
                }
                else {
                    this.data = data;
                }
                this.message = 'Select files';
                this.sortData(this.data);
            })
                .catch(console.error)
                .then(() => this.fetchingFiles = false);
        };
        this.filter = event => {
            this.input = event.target.value;
            const matcher = this.input.toLocaleLowerCase();
            this.sortData([...this.data.filter(c => fuzzysearch(matcher, c.name.toLocaleLowerCase()))]);
        };
        this.attachFile = (file, event) => {
            if (event.path[0].checked) {
                this.storedFiles.push(file);
            }
            else {
                this.storedFiles = this.storedFiles.filter(item => item != file);
            }
        };
        this.clearData = () => {
            this.data = null;
            this.folders = [];
            this.fileItems = [];
        };
        this.sortData = data => {
            this.folders = data.filter(item => item.mimeType === 'application/vnd.google-apps.folder');
            this.fileItems = data.filter(item => item.mimeType !== 'application/vnd.google-apps.folder');
        };
        this.openModal = () => {
            const modal = this.el.shadowRoot.getElementById('my-modal');
            modal['open'] = true;
        };
        this.save = () => {
            if (this.attachedFiles.length) {
                this.files = [...this.attachedFiles, ...this.storedFiles];
            }
            else {
                this.files = [...this.files, ...this.storedFiles];
            }
            this.storedFiles = [];
            this.close();
        };
        this.close = () => {
            const modal = this.el.shadowRoot.getElementById('my-modal');
            modal['open'] = false;
        };
        this.attachedFiles = [];
        this._loadAttachedFiles = () => {
            this.fetcherRetrieveAttachedFiles({ referenceId: this.attachedFilesRefId }).then(({ data }) => {
                this.attachedFiles = data;
            });
        };
        this.files = [];
        Intent('ListFiles')(this, "listFiles");
        Intent('ListDeeperFiles')(this, "listDeeperFiles");
        Intent("retrieveAttachedFiles")(this, "fetcherRetrieveAttachedFiles");
        Intent("saveFiles")(this, "saveFiles");
    }
    authorizedHandler(event) {
        this.authId = event.detail.authId;
    }
    revokedHandler(event) {
        this.authId = event.detail.authId;
    }
    render() {
        return [h("bearer-button", { kind: "light", disabled: !Boolean(this.authId), onClick: this.fetchFiles },
                h("span", { class: "root" },
                    h(GoogleDrive, null),
                    h("span", null, "Attach file"))),
            h("dialog", { id: "my-modal" },
                h("div", { class: "header" },
                    this.path.length !== 1 && h("button", { class: "back-button", onClick: this.fetchFiles },
                        " ",
                        h("span", null, " \u2039 "),
                        " "),
                    h("h4", { class: "header-message" }, this.message),
                    h("button", { class: "close-button", onClick: this.close }, " \u00D7 ")),
                this.data && h("input", { class: "search-input", autoComplete: "off", id: "input", placeholder: "\u26B2 Search for file or folder", onKeyUp: this.filter, value: this.input }),
                h("h4", null, this.path.join('/')),
                this.fetchingFiles && h("bearer-loading", null),
                !this.data && !this.fetchingFiles && h("div", { class: "no-folder" },
                    h("span", null, "No subfolder")),
                this.data &&
                    h("div", { class: "list" },
                        this.folders.map(item => h("div", { class: "folder" },
                            item.name,
                            " ",
                            h("span", { onClick: () => {
                                    this.fetchFileInFolder(item);
                                }, class: "folder-arrow" }, " \u203A "))),
                        this.fileItems.map(item => h("div", null,
                            item.name,
                            " ",
                            h("input", { class: "file-checkbox", type: "checkbox", onChange: (event) => {
                                    this.attachFile(item, event);
                                } })))),
                h("footer", { class: "footer" },
                    h("button", { class: "save-button", onClick: this.save }, "Save")))
        ];
    }
    attachedFilesRefIdChanged(event) {
        if (this.attachedFilesRefId !== event.detail.referenceId) {
            this.attachedFilesRefId = event.detail.referenceId;
        }
        else {
            this._loadAttachedFiles();
        }
    }
    _watchAttachedFiles(newValueName) {
        if (newValueName) {
            this._loadAttachedFiles();
        }
    }
    filesSavedWatcher(newValue) {
        this.saveFiles({ body: { files: newValue }, referenceId: this.filesRefId }).then(({ referenceId, data }) => {
            this.filesSaved.emit({ referenceId, files: data || this.files });
            this.filesRefId = referenceId;
        });
    }
    get SCENARIO_ID() { return "607e36-poc-google-attach-file"; }
    componentDidLoad() {
        if (this.setupId) {
            this.bearerContext.setupId = this.setupId;
        }
        if (this.attachedFilesRefId) {
            this._loadAttachedFiles();
        }
    }
    static get is() { return "feature-action"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "attachedFiles": {
            "state": true
        },
        "attachedFilesRefId": {
            "type": String,
            "attr": "attached-files-ref-id",
            "mutable": true,
            "watchCallbacks": ["_watchAttachedFiles"]
        },
        "authId": {
            "type": String,
            "attr": "auth-id",
            "mutable": true
        },
        "bearerContext": {
            "context": "bearer"
        },
        "data": {
            "state": true
        },
        "el": {
            "elementRef": true
        },
        "fetchingFiles": {
            "state": true
        },
        "fileItems": {
            "state": true
        },
        "files": {
            "state": true,
            "watchCallbacks": ["filesSavedWatcher"]
        },
        "filesRefId": {
            "type": String,
            "attr": "files-ref-id",
            "mutable": true
        },
        "folders": {
            "state": true
        },
        "input": {
            "state": true
        },
        "message": {
            "state": true
        },
        "path": {
            "state": true
        },
        "selectedFolder": {
            "state": true
        },
        "setupId": {
            "type": String,
            "attr": "setup-id"
        },
        "storedFiles": {
            "state": true
        }
    }; }
    static get events() { return [{
            "name": "bearer|607e36-poc-google-attach-file|feature|filesSaved",
            "method": "filesSaved",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get listeners() { return [{
            "name": "body:bearer|607e36-poc-google-attach-file|connect|authorized",
            "method": "authorizedHandler"
        }, {
            "name": "body:bearer|607e36-poc-google-attach-file|connect|revoked",
            "method": "revokedHandler"
        }, {
            "name": "body:bearer|607e36-poc-google-attach-file|feature|attachedFilesSaved",
            "method": "attachedFilesRefIdChanged"
        }]; }
    static get style() { return "/**style-placeholder:feature-action:**/"; }
}
