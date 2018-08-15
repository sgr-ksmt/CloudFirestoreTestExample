import * as firebase from 'firebase'
import * as Model from '../model'

const config = {
  apiKey: 'API_KEY',
  authDomain: 'AUTH_DOMAIN',
  databaseURL: 'DATABASE_URL',
  projectId: 'PROJECT_ID',
  storageBucket: 'STORAGE_BUCKET',
  messagingSenderId: 'SERNDER_ID'
}

firebase.initializeApp(config)

const auth = firebase.auth()
const firestore = firebase.firestore()
const settings = { timestampsInSnapshots: true }
firestore.settings(settings)

export { firebase, auth, firestore }

export const makePostDocument = (authorID: string) => {
  return <Model.Post>{
    title: 'test post',
    body: 'test post body',
    authorID: authorID,
    isPublished: true
  }
}
