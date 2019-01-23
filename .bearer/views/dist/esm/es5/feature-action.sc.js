/*! Built with http://stenciljs.com */
import { h } from './localhost.core.js';
import { e as Intent } from './chunk-db1ab781.js';
import { a as GoogleDrive } from './chunk-5aa181c9.js';
function fuzzysearch(needle, haystack) {
    var hlen = haystack.length;
    var nlen = needle.length;
    if (nlen > hlen) {
        return false;
    }
    if (nlen === hlen) {
        return needle === haystack;
    }
    outer: for (var i = 0, j = 0; i < nlen; i++) {
        var nch = needle.charCodeAt(i);
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
var FeatureAction = /** @class */ (function () {
    function FeatureAction() {
        var _this = this;
        this.fileItems = [];
        this.folders = [];
        this.data = null;
        this.storedFiles = [];
        this.path = ['GDrive'];
        this.message = 'Explore';
        this.selectedFolder = null;
        this.fetchFiles = function () {
            if (!_this.authId) {
                return;
            }
            _this.path = ['GDrive'];
            _this.selectedFolder = null;
            _this.openModal();
            _this.clearData();
            _this.fetchingFiles = true;
            _this.listFiles({ authId: _this.authId }).then(function (_a) {
                var data = _a.data;
                if (!data.length) {
                    _this.data = null;
                }
                else {
                    _this.data = data;
                }
                _this.message = 'Explore';
                _this.sortData(_this.data);
            })
                .catch(console.error)
                .then(function () { return _this.fetchingFiles = false; });
        };
        this.fetchFileInFolder = function (folder) {
            if (!_this.authId) {
                return;
            }
            _this.clearData();
            _this.selectedFolder = folder;
            _this.path.push(_this.selectedFolder.name);
            _this.fetchingFiles = true;
            _this.listDeeperFiles({ authId: _this.authId, folderId: folder.id }).then(function (_a) {
                var data = _a.data;
                if (!data.length) {
                    _this.data = null;
                }
                else {
                    _this.data = data;
                }
                _this.message = 'Select files';
                _this.sortData(_this.data);
            })
                .catch(console.error)
                .then(function () { return _this.fetchingFiles = false; });
        };
        this.filter = function (event) {
            _this.input = event.target.value;
            var matcher = _this.input.toLocaleLowerCase();
            _this.sortData(_this.data.filter(function (c) { return fuzzysearch(matcher, c.name.toLocaleLowerCase()); }).slice());
        };
        this.attachFile = function (file, event) {
            if (event.path[0].checked) {
                _this.storedFiles.push(file);
            }
            else {
                _this.storedFiles = _this.storedFiles.filter(function (item) { return item != file; });
            }
        };
        this.clearData = function () {
            _this.data = null;
            _this.folders = [];
            _this.fileItems = [];
        };
        this.sortData = function (data) {
            _this.folders = data.filter(function (item) { return item.mimeType === 'application/vnd.google-apps.folder'; });
            _this.fileItems = data.filter(function (item) { return item.mimeType !== 'application/vnd.google-apps.folder'; });
        };
        this.openModal = function () {
            var modal = _this.el.shadowRoot.getElementById('my-modal');
            modal['open'] = true;
        };
        this.save = function () {
            if (_this.attachedFiles.length) {
                _this.files = _this.attachedFiles.concat(_this.storedFiles);
            }
            else {
                _this.files = _this.files.concat(_this.storedFiles);
            }
            _this.storedFiles = [];
            _this.close();
        };
        this.close = function () {
            var modal = _this.el.shadowRoot.getElementById('my-modal');
            modal['open'] = false;
        };
        this.attachedFiles = [];
        this._loadAttachedFiles = function () {
            _this.fetcherRetrieveAttachedFiles({ referenceId: _this.attachedFilesRefId }).then(function (_a) {
                var data = _a.data;
                _this.attachedFiles = data;
            });
        };
        this.files = [];
        Intent('ListFiles')(this, "listFiles");
        Intent('ListDeeperFiles')(this, "listDeeperFiles");
        Intent("retrieveAttachedFiles")(this, "fetcherRetrieveAttachedFiles");
        Intent("saveFiles")(this, "saveFiles");
    }
    FeatureAction.prototype.authorizedHandler = function (event) {
        this.authId = event.detail.authId;
    };
    FeatureAction.prototype.revokedHandler = function (event) {
        this.authId = event.detail.authId;
    };
    FeatureAction.prototype.render = function () {
        var _this = this;
        return [h("bearer-button", { kind: "light", disabled: !Boolean(this.authId), onClick: this.fetchFiles }, h("span", { class: "root" }, h(GoogleDrive, null), h("span", null, "Attach file"))),
            h("dialog", { id: "my-modal" }, h("div", { class: "header" }, this.path.length !== 1 && h("button", { class: "back-button", onClick: this.fetchFiles }, " ", h("span", null, " \u2039 "), " "), h("h4", { class: "header-message" }, this.message), h("button", { class: "close-button", onClick: this.close }, " \u00D7 ")), this.data && h("input", { class: "search-input", autoComplete: "off", id: "input", placeholder: "\u26B2 Search for file or folder", onKeyUp: this.filter, value: this.input }), h("h4", null, this.path.join('/')), this.fetchingFiles && h("bearer-loading", null), !this.data && !this.fetchingFiles && h("div", { class: "no-folder" }, h("span", null, "No subfolder")), this.data &&
                h("div", { class: "list" }, this.folders.map(function (item) { return h("div", { class: "folder" }, item.name, " ", h("span", { onClick: function () {
                        _this.fetchFileInFolder(item);
                    }, class: "folder-arrow" }, " \u203A ")); }), this.fileItems.map(function (item) { return h("div", null, item.name, " ", h("input", { class: "file-checkbox", type: "checkbox", onChange: function (event) {
                        _this.attachFile(item, event);
                    } })); })), h("footer", { class: "footer" }, h("button", { class: "save-button", onClick: this.save }, "Save")))
        ];
    };
    FeatureAction.prototype.attachedFilesRefIdChanged = function (event) {
        if (this.attachedFilesRefId !== event.detail.referenceId) {
            this.attachedFilesRefId = event.detail.referenceId;
        }
        else {
            this._loadAttachedFiles();
        }
    };
    FeatureAction.prototype._watchAttachedFiles = function (newValueName) {
        if (newValueName) {
            this._loadAttachedFiles();
        }
    };
    FeatureAction.prototype.filesSavedWatcher = function (newValue) {
        var _this = this;
        this.saveFiles({ body: { files: newValue }, referenceId: this.filesRefId }).then(function (_a) {
            var referenceId = _a.referenceId, data = _a.data;
            _this.filesSaved.emit({ referenceId: referenceId, files: data || _this.files });
            _this.filesRefId = referenceId;
        });
    };
    Object.defineProperty(FeatureAction.prototype, "SCENARIO_ID", {
        get: function () { return "607e36-poc-google-attach-file"; },
        enumerable: true,
        configurable: true
    });
    FeatureAction.prototype.componentDidLoad = function () {
        if (this.setupId) {
            this.bearerContext.setupId = this.setupId;
        }
        if (this.attachedFilesRefId) {
            this._loadAttachedFiles();
        }
    };
    Object.defineProperty(FeatureAction, "is", {
        get: function () { return "feature-action"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FeatureAction, "encapsulation", {
        get: function () { return "shadow"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FeatureAction, "properties", {
        get: function () {
            return {
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
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FeatureAction, "events", {
        get: function () {
            return [{
                    "name": "bearer|607e36-poc-google-attach-file|feature|filesSaved",
                    "method": "filesSaved",
                    "bubbles": true,
                    "cancelable": true,
                    "composed": true
                }];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FeatureAction, "listeners", {
        get: function () {
            return [{
                    "name": "body:bearer|607e36-poc-google-attach-file|connect|authorized",
                    "method": "authorizedHandler"
                }, {
                    "name": "body:bearer|607e36-poc-google-attach-file|connect|revoked",
                    "method": "revokedHandler"
                }, {
                    "name": "body:bearer|607e36-poc-google-attach-file|feature|attachedFilesSaved",
                    "method": "attachedFilesRefIdChanged"
                }];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FeatureAction, "style", {
        get: function () { return "\n.attach-files-button.sc-feature-action {\n    border: none;\n    background: #fff;\n    cursor: pointer;\n    font-size: 50px;\n}\n\n#my-modal.sc-feature-action {\n    height: 360px;\n    z-index: 1;\n    width: 320px;\n    border-radius: 3%;\n    border: 1px;\n    position: absolute;\n    padding: 16px 32px;\n    top: 0;\n    margin: 0 15%;\n    overflow-y: scroll;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n    -ms-flex-direction: column;\n    flex-direction: column;\n    -webkit-box-pack: justify;\n    -ms-flex-pack: justify;\n    justify-content: space-between;\n    line-height: 30px;\n    -webkit-box-shadow: 10px 10px 24px -5px rgba(221,223,228,1);\n    -moz-box-shadow: 10px 10px 24px -5px rgba(221,223,228,1);\n    box-shadow: 10px 10px 24px -5px rgba(221,223,228,1);\n}\n\n.sc-feature-action::-webkit-scrollbar {\n    display: none;\n}\n\n.root.sc-feature-action {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -ms-flex-align: center;\n    align-items: center;\n}\n\nsvg.sc-feature-action {\n    margin-right: 5px;\n}\n\n.header.sc-feature-action {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n}\n\n.back-button.sc-feature-action {\n    border: none;\n    background: #fff;\n    cursor: pointer;\n    font-size: 50px;\n    color: #B3B6C6;\n}\n\n.header-message.sc-feature-action {\n    margin: 18px 0 0 0;\n}\n\n.close-button.sc-feature-action {\n    border: none;\n    margin: 22px 7px;\n    background: #fff;\n    cursor: pointer;\n    position: absolute;\n    right: 0;\n    top: 0;\n    font-size: 25px;\n    color: #B3B6C6;\n}\n\n.search-input.sc-feature-action {\n    border: none;\n    background: #F6F8FF;\n    height: 30px;\n    width: 100%;\n    font-size: 12px;\n}\n\n.search-input.sc-feature-action::-webkit-input-placeholder {\n    color: #CACEDB;\n}\n\n.search-input.sc-feature-action:-ms-input-placeholder {\n    color: #CACEDB;\n}\n\n.search-input.sc-feature-action::-ms-input-placeholder {\n    color: #CACEDB;\n}\n\n.search-input.sc-feature-action::placeholder {\n    color: #CACEDB;\n}\n\n.list.sc-feature-action {\n    height: 60%;\n    overflow: auto;\n}\n\n.folder.sc-feature-action    > .folder-arrow.sc-feature-action {\n    font-size: 30px;\n    color: #B3B6C6;\n}\n\n.folder-arrow.sc-feature-action {\n    cursor: pointer;\n    float: right;\n}\n\n.file-checkbox.sc-feature-action {\n    float: right;\n    border: #F1F1F6;\n    background: #fff;\n    border-radius: 50%;\n}\n\n.no-folder.sc-feature-action {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -ms-flex-align: center;\n    align-items: center;\n    -webkit-box-pack: center;\n    -ms-flex-pack: center;\n    justify-content: center;\n    height: 65%;\n}\n\n.save-button.sc-feature-action {\n    width: 100px;\n    background: #0FE49B;\n    border-radius: 5px;\n    border: none;\n    color: #fff;\n    height: 30px;\n    cursor: pointer;\n    font-weight: bold;\n    font-size: 1em;\n    position: absolute;\n    right: 5%;\n}\n\n.attached-file.sc-feature-action {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -ms-flex-align: center;\n    align-items: center;\n}\n\n.footer.sc-feature-action {\n    height: 40px;\n    position: absolute;\n    width: 345px;\n    bottom: 0;\n    background: #fff;\n}\n\n.delete-button.sc-feature-action {\n    border: none;\n    margin: 22px 7px;\n    background: #fff;\n    cursor: pointer;\n    font-size: 25px;\n}\n"; },
        enumerable: true,
        configurable: true
    });
    return FeatureAction;
}());
export { FeatureAction };
