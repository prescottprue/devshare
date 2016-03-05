import config from '../config'
import Firebase from 'firebase'
import { thru } from 'lodash'

const createFirebaseRef = relativePath =>
  new Firebase(
    [config.firebaseRoot]
      .concat(relativePath)
      .join('/')
  )

export const get = relativePath => _ =>
  createFirebaseRef(relativePath)
    .once('value')
    .then(data => data.val())

export const set = ref => object =>
  ref.set(object)

export const sync = ref => callback =>
  ref.on('value', data => callback(data.val()))

export default (url, types) => {
  let methods = {
    get,
    set,
    sync
  }

  return types
    .reduce((returnedMethods, type) => {
      let method = {}
      method[type] = methods[type].call(this, url)
      return Object.assign({}, returnedMethods, method)
    }, {})
}
