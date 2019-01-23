import { FetchData, TOAUTH2AuthContext, TFetchDataCallback } from '@bearer/intents'
import Client from './client'

export default class ListDeeperFilesIntent {
  static intentType: any = FetchData;
  static intentName: string = 'ListDeeperFiles';

  
  static action(context: TOAUTH2AuthContext, params: any, body: any, callback: TFetchDataCallback) {
    Client(context.authAccess.accessToken).get('', {
      params: {
        pageSize: 500,
        orderBy: 'folder',
        q: `"${params.folderId}" in parents`,
        fields: '*'
      }
    }).then(({ data }) => {
        callback({ data: data.files })
      })
      .catch((error) => {
        callback({ error: error.toString() })
      })
  }
}
