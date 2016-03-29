import config from '../config'
import Firebase from 'firebase'

export const createFirebaseUrl = relativePath => _ =>
  [config.firebaseRoot]
    .concat(relativePath)
    .join('/')

const createFirebaseRef = relativePath =>
  new Firebase(createFirebaseUrl(relativePath))

export const get = relativePath => _ =>
  createFirebaseRef(relativePath)
    .once('value')
    .then(data => data.val())

export const set = ref => object =>
  ref.set(object)

export const sync = ref => callback =>
  ref.on('value', data => callback(data.val()))

export const getRef = relativePath => _ =>
  createFirebaseRef(relativePath)

export default (url, types) => {
  let methods = {
    get,
    set,
    sync,
    createFirebaseUrl
  }

  return types
    .reduce((returnedMethods, type) => {
      let method = {}
      method[type] = methods[type].call(this, url)
      return Object.assign({}, returnedMethods, method)
    }, {})
}
