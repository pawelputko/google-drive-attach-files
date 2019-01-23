import { RetrieveState, TOAUTH2AuthContext, TRetrieveStateCallback } from '@bearer/intents'
import Client from './client'

export default class RetrieveFileIntent {
  static intentType: any = RetrieveState;
  static intentName: string = 'retrieveFiles';


  static action(context: TOAUTH2AuthContext, _params: any, state: any, callback: TRetrieveStateCallback) {
    const filesFetcher = (savedFile: any): Promise<any> =>
        Client(context.authAccess.accessToken)
            .get(`${savedFile.id}`)
            .then(response => response.data)
            .catch(error => ({ error: error.response }));

    Promise.all((state.files || []).map(filesFetcher)).then(files => {
      callback({ data: files });
    })
  }
}
