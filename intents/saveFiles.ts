import { SaveState, TOAUTH2AuthContext, TSaveStateCallback } from '@bearer/intents'
import {TFile} from "../views/types";

export default class SaveFilesIntent {
  static intentType: any = SaveState;
  static intentName: string = 'saveFiles';


  static action(
      _context: TOAUTH2AuthContext,
      _params: any,
      body: { files: TFile[] },
      state: any,
      callback: TSaveStateCallback
  ): void {
    const { files } = body;
    callback({
      state: {
        ...state,
        files: files.map(file => ({
          name: file.name,
          id: file.id,
          mimeType: file.mimeType,
          kind: file.kind,
          size: file.size
        }))
      },
      data: files
    })
  }

}
