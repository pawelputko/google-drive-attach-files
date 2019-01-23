/*! Built with http://stenciljs.com */
const { h } = window.localhost;

import { e as Intent } from './chunk-db1ab781.js';
import { a as GoogleDrive } from './chunk-5aa181c9.js';

function fuzzysearch(needle, haystack) {
    const hlen = haystack.length;
    const nlen = needle.length;
    if (nlen > hlen) {
        return false;
    }
    if (nlen === hlen) {
        return needle === haystack;
    }
    outer: for (let i = 0, j = 0; i < nlen; i++) {
        const nch = needle.charCodeAt(i);
        while (j < hlen) {
            if (haystack.charCodeAt(j++) === nch) {
                continue outer;
            }
        }
        return false;
    }
    return true;
}

/*
  The purpose of this component is to deal with scenario navigation between each views.

*/
class FeatureAction {
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
    static get style() { return ".attach-files-button {\n    border: none;\n    background: #fff;\n    cursor: pointer;\n    font-size: 50px;\n}\n\n#my-modal {\n    height: 360px;\n    z-index: 1;\n    width: 320px;\n    border-radius: 3%;\n    border: 1px;\n    position: absolute;\n    padding: 16px 32px;\n    top: 0;\n    margin: 0 15%;\n    overflow-y: scroll;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n    -ms-flex-direction: column;\n    flex-direction: column;\n    -webkit-box-pack: justify;\n    -ms-flex-pack: justify;\n    justify-content: space-between;\n    line-height: 30px;\n    -webkit-box-shadow: 10px 10px 24px -5px rgba(221,223,228,1);\n    -moz-box-shadow: 10px 10px 24px -5px rgba(221,223,228,1);\n    box-shadow: 10px 10px 24px -5px rgba(221,223,228,1);\n}\n\n::-webkit-scrollbar {\n    display: none;\n}\n\n.root {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -ms-flex-align: center;\n    align-items: center;\n}\n\nsvg {\n    margin-right: 5px;\n}\n\n.header {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n}\n\n.back-button {\n    border: none;\n    background: #fff;\n    cursor: pointer;\n    font-size: 50px;\n    color: #B3B6C6;\n}\n\n.header-message {\n    margin: 18px 0 0 0;\n}\n\n.close-button {\n    border: none;\n    margin: 22px 7px;\n    background: #fff;\n    cursor: pointer;\n    position: absolute;\n    right: 0;\n    top: 0;\n    font-size: 25px;\n    color: #B3B6C6;\n}\n\n.search-input {\n    border: none;\n    background: #F6F8FF;\n    height: 30px;\n    width: 100%;\n    font-size: 12px;\n}\n\n.search-input::-webkit-input-placeholder {\n    color: #CACEDB;\n}\n\n.search-input:-ms-input-placeholder {\n    color: #CACEDB;\n}\n\n.search-input::-ms-input-placeholder {\n    color: #CACEDB;\n}\n\n.search-input::placeholder {\n    color: #CACEDB;\n}\n\n.list {\n    height: 60%;\n    overflow: auto;\n}\n\n.folder > .folder-arrow {\n    font-size: 30px;\n    color: #B3B6C6;\n}\n\n.folder-arrow {\n    cursor: pointer;\n    float: right;\n}\n\n.file-checkbox {\n    float: right;\n    border: #F1F1F6;\n    background: #fff;\n    border-radius: 50%;\n}\n\n.no-folder {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -ms-flex-align: center;\n    align-items: center;\n    -webkit-box-pack: center;\n    -ms-flex-pack: center;\n    justify-content: center;\n    height: 65%;\n}\n\n.save-button {\n    width: 100px;\n    background: #0FE49B;\n    border-radius: 5px;\n    border: none;\n    color: #fff;\n    height: 30px;\n    cursor: pointer;\n    font-weight: bold;\n    font-size: 1em;\n    position: absolute;\n    right: 5%;\n}\n\n.attached-file {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -ms-flex-align: center;\n    align-items: center;\n}\n\n.footer {\n    height: 40px;\n    position: absolute;\n    width: 345px;\n    bottom: 0;\n    background: #fff;\n}\n\n.delete-button {\n    border: none;\n    margin: 22px 7px;\n    background: #fff;\n    cursor: pointer;\n    font-size: 25px;\n}"; }
}

export { FeatureAction };
