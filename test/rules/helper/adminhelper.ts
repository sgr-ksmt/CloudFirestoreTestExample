import * as admin from 'firebase-admin'
import * as Model from '../model'

admin.initializeApp({ credential: admin.credential.cert(require('admin sdk jsonのpath')) })
const auth = admin.auth()
const firestore = admin.firestore()
const settings = { timestampsInSnapshots: true }
firestore.settings(settings)

export { admin, auth, firestore }

export const savePostDocument = async (isPublished: boolean) => {
  const postRef = firestore.collection(Model.Path.Post).doc()
  await postRef.set({
    title: 'test post',
    body: 'test post body',
    authorID: 'xxxxxxxx',
    isPublished: isPublished
  })
  return postRef
}