import { RetrieveState, TOAUTH2AuthContext, TRetrieveStateCallback } from '@bearer/intents'
import Client from "./client";

export default class RetrieveAttachedFilesIntent {
  static intentType: any = RetrieveState;


  static action(context: TOAUTH2AuthContext, _params: any, state: any, callback: TRetrieveStateCallback) {
    const attachedFilesFetcher = (savedFile: any): Promise<any> =>
        Client(context.authAccess.accessToken)
            .get(`${savedFile.id}`)
            .then(response => response.data)
            .catch(error => ({ error: error.response }));

    Promise.all((state.attachedFiles || []).map(attachedFilesFetcher)).then(files => {
      callback({ data: files });
    })
  }
  
}
