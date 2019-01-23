/*
  The purpose of this component is to be the result of your scenario.
  Its responsibility is to retrieve the scenario state from a previous action
  of a user.
*/
import {Input, Output, RootComponent} from '@bearer/core'
import '@bearer/ui'
import {TFile} from "./types";

@RootComponent({
    role: 'display',
    group: 'feature'
})
export class FeatureDisplay {
    @Input() files: TFile[] = [];
    @Output() attachedFiles: TFile[] = [];

    removeFile = file => {
        this.files = this.attachedFiles = this.files.filter(item => item != file);
    };

    render() {
        this.attachedFiles = this.files;
        if (!this.files.length) {
            return <bearer-alert>No Files attached</bearer-alert>
        }

        return (
            this.files.map(file => (
                <div class="attached-file">{file.name} {file.mimeType} {file.size}
                    <button class="delete-button" onClick={() => this.removeFile(file)}> &#215; </button>
                </div>
            ))
        )
    }
}
