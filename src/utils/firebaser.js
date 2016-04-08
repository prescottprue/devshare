import config from '../config'
import Firebase from 'firebase'
import { typeReducer } from './index'

export const createFirebaseUrl = relativePath => _ =>
  [config.firebaseRoot]
    .concat(
      relativePath.map(loc =>
        loc.replace(/[.]/g, ':')
        .replace(/[#$\[\]]/g, '_-_')
      )
    )
    .join('/')

export const createFirebaseRef = relativePath => _ =>
  new Firebase(createFirebaseUrl(relativePath)())

export const get = relativePath => _ =>
  createFirebaseRef(relativePath)()
    .once('value')
    .then(data => data.val())

export const set = relativePath => object =>
  createFirebaseRef(relativePath)()
    .set(object)
    .then(data => data ? data.val() : object)

export const update = relativePath => object =>
  createFirebaseRef(relativePath)()
    .update(object)
    .then(data => data.val())

export const remove = relativePath => _ =>
  createFirebaseRef(relativePath)()
    .remove()
    .then(data => null)

export const sync = ref => callback =>
  ref.on('value', data => callback(data.val()))

export const getChild = relativePath => child =>
  createFirebaseRef(relativePath)()
    .child(child)
    .once('value')
    .then(data => data.val())

export const auth = token =>
  createFirebaseRef([])()
    .authWithCustomToken(token)

export const unauth = () =>
  createFirebaseRef([])()
    .unauth()

export default (url, types) => {
  let methods = {
    get,
    getChild,
    set,
    sync,
    update,
    remove,
    createFirebaseUrl,
    createFirebaseRef
  }
  return typeReducer(url, types, methods, 'firebaser')
}
