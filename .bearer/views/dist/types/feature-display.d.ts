import './stencil.core';
import { EventEmitter } from '@bearer/core';
import '@bearer/ui';
import { TFile } from "./types";
export declare class FeatureDisplay {
    removeFile: (file: any) => void;
    render(): JSX.Element;
    files: TFile[];
    filesRefIdChanged(event: any): void;
    _loadFiles: () => void;
    private fetcherRetrieveFiles;
    _watchFiles(newValueName: string): void;
    filesRefId: string;
    private saveAttachedFiles;
    attachedFilesSaved: EventEmitter;
    attachedFiles: TFile[];
    attachedFilesRefId: string;
    attachedFilesSavedWatcher(newValue: any): void;
    constructor();
    readonly SCENARIO_ID: string;
    bearerContext: any;
    setupId: string;
    componentDidLoad(): void;
}
