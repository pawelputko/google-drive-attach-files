/*
  The purpose of this component is to deal with scenario navigation between each views.

*/

import {BearerFetch, Element, Input, Intent, Listen, Output, Prop, RootComponent, State} from '@bearer/core'
import '@bearer/ui'
import {TFile} from "./types";
import fuzzysearch from "./fuzzy";
import GoogleDrive from './components/GoogleDriveLogo';

@RootComponent({
  role: 'action',
  group: 'feature'
})
export class FeatureAction {
    @Output() files: TFile[] = [];
    @Input() attachedFiles: TFile[] = [];
    @Intent('ListFiles')
    listFiles: BearerFetch;

    @Intent('ListDeeperFiles')
    listDeeperFiles: BearerFetch;

    @Prop({mutable: true})
    authId: string;

    @State()
    fileItems: TFile[] = [];

    @State()
    folders: TFile[] = [];

    @State()
    data: TFile[] = null;

    @State()
    storedFiles: TFile[] = [];

    @State()
    fetchingFiles: boolean;

    @State()
    input: string;

    @State()
    path: string[] = ['GDrive'];

    @State()
    message = 'Explore';

    @State()
    selectedFolder: TFile = null;

    @Element()
    el: HTMLElement;

    @Listen('body:connect:authorized')
    authorizedHandler(event) {
        this.authId = event.detail.authId;
    }

    @Listen('body:connect:revoked')
    revokedHandler(event) {
        this.authId = event.detail.authId;
    }

    fetchFiles = () => {
        if (!this.authId) {
            return;
        }
        this.path = ['GDrive'];
        this.selectedFolder = null;
        this.openModal();
        this.clearData();
        this.fetchingFiles = true;
        this.listFiles({authId: this.authId}).then(({data}) => {
            if (!data.length){
                this.data = null;
            } else {
                this.data = data;
            }
            this.message = 'Explore';
            this.sortData(this.data);
        })
            .catch(console.error)
            .then(() => this.fetchingFiles = false)
    };

    fetchFileInFolder = folder => {
        if (!this.authId) {
            return;
        }
        this.clearData();
        this.selectedFolder = folder;
        this.path.push(this.selectedFolder.name);
        this.fetchingFiles = true;
        this.listDeeperFiles({authId: this.authId, folderId: folder.id}).then(({data}) => {
            if (!data.length){
                this.data = null;
            } else {
                this.data = data;
            }
            this.message = 'Select files';
            this.sortData(this.data);
        })
            .catch(console.error)
            .then(() => this.fetchingFiles = false)
    };

    filter = event => {
        this.input = event.target.value;
        const matcher = this.input.toLocaleLowerCase();
        this.sortData([...this.data.filter(c => fuzzysearch(matcher, c.name.toLocaleLowerCase()))]);
    };

    attachFile = (file, event) => {
        if(event.path[0].checked) {
            this.storedFiles.push(file);
        } else {
            this.storedFiles = this.storedFiles.filter(item => item != file);
        }
    };

    clearData = () => {
        this.data = null;
        this.folders = [];
        this.fileItems = [];
    };

    sortData = data => {
        this.folders = data.filter(item => item.mimeType === 'application/vnd.google-apps.folder');
        this.fileItems = data.filter(item => item.mimeType !== 'application/vnd.google-apps.folder');
    };

    openModal = () => {
        const modal = this.el.shadowRoot.getElementById('my-modal');
        modal['open'] = true;
    };

    save =  () => {
        if (this.attachedFiles.length) {
            this.files = [...this.attachedFiles, ...this.storedFiles];
        } else {
            this.files = [...this.files, ...this.storedFiles];
        }
        this.storedFiles = [];
        this.close();
    };

    close = () => {
        const modal = this.el.shadowRoot.getElementById('my-modal');
        modal['open'] = false;
    };

  render() {
    return [<bearer-button kind="light" disabled={!Boolean(this.authId)} onClick={this.fetchFiles}>
          <span class="root">
          <GoogleDrive/>
        <span>Attach file</span>
      </span>
      </bearer-button>,
        <dialog id="my-modal">
            {<div class="header">
                {this.path.length !== 1 && <button class="back-button" onClick={this.fetchFiles}> <span> &#8249; </span> </button>}
                <h4 class="header-message">{this.message}</h4>
                <button class="close-button" onClick={this.close}> &#215; </button>
            </div>}
            {this.data && <input class="search-input"
            autoComplete="off"
            id="input"
            placeholder="&#9906; Search for file or folder"
            onKeyUp={this.filter}
            value={this.input}
        />}
            <h4>{this.path.join('/')}</h4>
            {this.fetchingFiles && <bearer-loading></bearer-loading>}
            {!this.data && !this.fetchingFiles && <div class="no-folder">
                <span>No subfolder</span>
            </div>}
            {this.data &&
            <div class="list">
                {this.folders.map(item => <div class="folder">{item.name} <span onClick={() => {
                    this.fetchFileInFolder(item)
                }} class="folder-arrow"> &#8250; </span></div>)}
                {this.fileItems.map(item => <div>{item.name} <input class="file-checkbox"
                                                                    type="checkbox" onChange={(event) => {
                    this.attachFile(item, event)
                }}/></div>)}
            </div>}
            <footer class="footer">
                <button class="save-button" onClick={this.save}>Save</button>
            </footer>
        </dialog>
  ]
  }
}
