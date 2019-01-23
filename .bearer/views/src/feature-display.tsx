/*
  The purpose of this component is to be the result of your scenario.
  Its responsibility is to retrieve the scenario state from a previous action
  of a user.
*/
import { Component, Listen, State, Intent, Watch, Prop, BearerFetch, EventEmitter, Event } from '@bearer/core';
import '@bearer/ui';
import { TFile } from "./types";
@Component({
    tag: "feature-display",
    styleUrl: "feature.css",
    shadow: true
})
export class FeatureDisplay {
    removeFile = file => {
        this.files = this.attachedFiles = this.files.filter(item => item != file);
    };
    render() {
        this.attachedFiles = this.files;
        if (!this.files.length) {
            return <bearer-alert>No Files attached</bearer-alert>;
        }
        return (this.files.map(file => (<div class="attached-file">{file.name} {file.mimeType} {file.size}
                    <button class="delete-button" onClick={() => this.removeFile(file)}> &#215; </button>
                </div>)));
    }
    @State()
    files: TFile[] = [];
    @Listen("body:bearer|607e36-poc-google-attach-file|feature|filesSaved")
    filesRefIdChanged(event) {
        if (this.filesRefId !== event.detail.referenceId) {
            this.filesRefId = event.detail.referenceId;
        }
        else {
            this._loadFiles();
        }
    }
    _loadFiles = () => {
        this.fetcherRetrieveFiles({ referenceId: this.filesRefId }).then(({ data }: {
            data: TFile[];
        }) => {
            this.files = data;
        });
    };
    private fetcherRetrieveFiles;
    @Watch("filesRefId")
    _watchFiles(newValueName: string) {
        if (newValueName) {
            this._loadFiles();
        }
    }
    @Prop({ "mutable": true })
    filesRefId: string;
    private saveAttachedFiles: BearerFetch<TFile[]>;
    @Event({ eventName: "bearer|607e36-poc-google-attach-file|feature|attachedFilesSaved" })
    attachedFilesSaved: EventEmitter;
    @State()
    attachedFiles: TFile[] = [];
    @Prop({ "mutable": true })
    attachedFilesRefId: string;
    @Watch("attachedFiles")
    attachedFilesSavedWatcher(newValue) {
        this.saveAttachedFiles({ body: { attachedFiles: newValue }, referenceId: this.attachedFilesRefId }).then(({ referenceId, data }) => {
            this.attachedFilesSaved.emit({ referenceId, attachedFiles: data || this.attachedFiles });
            this.attachedFilesRefId = referenceId;
        });
    }
    constructor() {
        Intent("retrieveFiles")(this, "fetcherRetrieveFiles");
        Intent("saveAttachedFiles")(this, "saveAttachedFiles");
    }
    get SCENARIO_ID() { return "607e36-poc-google-attach-file"; }
    @Prop({ "context": "bearer" })
    bearerContext: any;
    @Prop()
    setupId: string;
    componentDidLoad() {
        if (this.setupId) {
            this.bearerContext.setupId = this.setupId;
        }
        if (this.filesRefId) {
            this._loadFiles();
        }
    }
}
