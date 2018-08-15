import * as WebHelper from './helper/webhelper'
import * as AdminHelper from './helper/adminhelper'
import * as Model from './model'

const permissionDeniedError = { code: 'permission-denied' }

describe('post document rules', () => {
  jest.setTimeout(10000)

  let postCollectionRef: WebHelper.firebase.firestore.CollectionReference
  beforeAll(() => {
    postCollectionRef = WebHelper.firestore.collection(Model.Path.Post)
  })

  describe('read', () => {
    describe('get', () => {
      afterEach(async () => {
        await WebHelper.auth.signOut()
      })

      describe('when user is authenticated', () => {
        describe('try to get valid document', () => {
          test('should be succeeded', async () => {
            await WebHelper.auth.signInAnonymously()
            const mockPostRef = await AdminHelper.savePostDocument(true)
            await expect(postCollectionRef.doc(mockPostRef.id).get()).resolves.toBeDefined()
          })
        })

        describe('try to get invalid document', () => {
          test('should be failed', async () => {
            expect.assertions(1)
            await WebHelper.auth.signInAnonymously()
            const mockPostRef = await AdminHelper.savePostDocument(false)
            await expect(postCollectionRef.doc(mockPostRef.id).get()).rejects.toMatchObject(permissionDeniedError)
          })
        })
      })

      describe('when user is not authenticated', () => {
        test('should be failed', async () => {
          expect.assertions(1)
          const mockPostRef = await AdminHelper.savePostDocument(true)
          await expect(postCollectionRef.doc(mockPostRef.id).get()).rejects.toMatchObject(permissionDeniedError)
        })
      })
    })
  })

  describe('write', () => {
    describe('create', async () => {
      let authUser: any

      beforeEach(async () => {
        authUser = await WebHelper.auth.signInAnonymously()
      })

      afterEach(async () => {
        await WebHelper.auth.signOut()
      })

      describe('when authorID is equal to auth.uid', () => {
        test('should be succeeded', async () => {
          const post = WebHelper.makePostDocument(authUser.user.uid)
          await expect(postCollectionRef.doc().set(post)).resolves.toBeUndefined()
        })
      })

      describe('when authorID is not equal to auth.uid', () => {
        test('should be failed', async () => {
          expect.assertions(1)
          const post = WebHelper.makePostDocument('xxxxxxxxxxx')
          await expect(postCollectionRef.doc().set(post)).rejects.toMatchObject(permissionDeniedError)
        })
      })
    })
  })
})
