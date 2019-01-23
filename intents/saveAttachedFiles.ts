import { SaveState, TOAUTH2AuthContext, TSaveStateCallback } from '@bearer/intents'
import {TFile} from "../views/types";

export default class SaveAttachedFilesIntent {
  static intentType: any = SaveState;
  static intentName: string = 'saveAttachedFiles';


  static action(
      _context: TOAUTH2AuthContext,
      _params: any,
      body: { attachedFiles: TFile[] },
      state: any,
      callback: TSaveStateCallback
  ): void {
    const { attachedFiles } = body;
    callback({
      state: {
        ...state,
        attachedFiles: attachedFiles.map(file => ({
          name: file.name,
          id: file.id,
          mimeType: file.mimeType,
          kind: file.kind,
            size: file.size
        }))
      },
      data: attachedFiles
    })
  }

}
