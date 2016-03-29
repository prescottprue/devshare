import config from '../config'
import Firebase from 'firebase'

export const createFirebaseUrl = relativePath => _ =>
  [config.firebaseRoot]
    .concat(relativePath)
    .join('/')

export const createFirebaseRef = relativePath => _ =>
  new Firebase(createFirebaseUrl(relativePath)())

export const get = relativePath => _ =>
  createFirebaseRef(relativePath)()
    .once('value')
    .then(data => data.val())

export const set = ref => object =>
  ref.set(object)

export const update = relativePath => _ =>
  createFirebaseRef(relativePath)().update()

export const remove = relativePath => _ =>
  createFirebaseRef(relativePath)().remove()

export const sync = ref => callback =>
  ref.on('value', data => callback(data.val()))

export const getChild = relativePath => child =>
  createFirebaseRef(relativePath)()
    .child(child)
    .once('value')
    .then(data => data.val())

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

  return types
    .reduce((returnedMethods, type) => {
      let method = {}
      if (typeof methods[type] === 'undefined') throw Error(`${type} is not a valid method of firebaser`)
      method[type] = methods[type].call(this, url)
      return Object.assign({}, returnedMethods, method)
    }, {})
}
