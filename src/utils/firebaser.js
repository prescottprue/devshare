import firebase from 'firebase'
import { typeReducer } from './index'
import { isArray, isString } from 'lodash'
import { firebase as firebaseConfig } from '../config'

/**
 * @description Initialize firebase application
 */
export const init = (config) => {
  const fbConfig = config ? firebaseConfig[config.env] : firebaseConfig.prod

  try {
    firebase.initializeApp(fbConfig)
  } catch (err) {
    console.warn('You only need to initialize Firebase once', JSON.stringify(err))
  }

  return firebase
}

export const storage = () => firebase.storage()

/**
 * @description Handles abnormal characters within paths
 * @param {Array|String} relativePath - Releative path on firebase
 * @return {String} realtive url string for Firebase
 */
export const createFirebaseUrl = (relativePath) => () => {
  if (!isArray(relativePath)) relativePath = [relativePath]
  // TODO: Check for path not being string
  return relativePath.map((loc) => (loc && isString(loc))
        ? loc.replace(/[.]/g, ':')
          .replace(/[#$[\]]/g, '_-_')
        : loc
    ).join('/')
}

/**
 * @description Handles abnormal characters within paths
 * @param {Array|String} relativePath - Releative path
 * @return {Promise}
 */
export const createFirebaseRef = (relativePath) => () =>
  firebase.database().ref(createFirebaseUrl(relativePath)()) // eslint-disable-line new-cap

/**
 * @description Get a location on Firebase
 * @param {Array|String} relativePath - Releative
 * @return {Promise}
 */
export const get = (relativePath) => () =>
  createFirebaseRef(relativePath)()
    .once('value')
    .then((data) => data.val())

/**
 * @description Set data to a Firebase location based on array or string path
 * @param {Array|String} relativePath - Releative
 * @return {Promise}
 */
export const set = (relativePath) => (object, priority) => {
  return createFirebaseRef(relativePath)()[priority ? 'setWithPriority' : 'set'](object)
    .then((data) => data ? data.val() : object)
}

/**
 * @description Set data to a Firebase location based on array or string path
 * @param {Array|String} relativePath - Releative
 * @return {Promise}
 */
export const setWithPriority = (relativePath) => (object, priority) =>
  createFirebaseRef(relativePath)()
    .setWithPriority(object)
    .then((data) => data ? data.val() : object)
/**
 * @description Push data to a Firebase location based on array or string path
 * @param {Array|String} relativePath - Releative
 * @return {Promise}
 */
export const push = (relativePath) => (object, priority) => {
  const pushRef = createFirebaseRef(relativePath)().push()
  return pushRef[priority ? 'setWithPriority' : 'set'](object)
    .then((data) => data
      ? Object.assign({}, { key: pushRef.key }, data)
      : Object.assign(object, { key: pushRef.key })
    )
}

export const add = push

/**
 * @description Update data at a Firebase location based on array or string path
 * @param {Array|String} relativePath - Releative
 * @return {Promise}
 */
export const update = (relativePath) => (object) =>
  createFirebaseRef(relativePath)()
    .update(object)
    .then((data) => data ? data.val() : object)

/**
 * @description Remove data a Firebase location based on array or string path
 * @param {Array|String} relativePath - Releative
 * @return {Promise}
 */
export const remove = (relativePath) => () =>
  createFirebaseRef(relativePath)()
    .remove()
    .then((data) => null)

/**
 * @description Set data to a Firebase location based on array or string path
 * @param {Array|String} relativePath - Path from Firebase root
 * @return {Promise}
 */
 // TODO: Allow passing of type of sync like 'child_added'
export const sync = (relativePath) => (callback) =>
  createFirebaseRef(relativePath)()
    .on('value', (data) =>
      callback(Object.assign(data.val(), { ref: data.ref }))
    )

/**
 * @description Set data to a Firebase location based on array or string path
 * @param {Array|String} relativePath - Path from Firebase root
 * @return {Promise}
 */
export const unsync = (relativePath) => (callback) => {
  createFirebaseRef(relativePath)()
    .off('value', callback, callback)
}

/**
 * @description Search firebase router
 * @param {Array|String} relativePath - Path from Firebase root
 * @return {Promise}
 */
export const search = (relativePath) => (param, q) =>
  createFirebaseRef(relativePath)()
    .orderByChild(param)
    .startAt(q)
    .once('value')
    .then((data) => data.val())

/**
 * @description Resolve the JSON value a Firebase location's child
 * @param {Array|String} relativePath - Path from Firebase root
 * @return {Promise}
 */
export const getChild = (relativePath) => (child) =>
  createFirebaseRef(relativePath)()
    .child(child)
    .once('value')
    .then((data) => data.val())

export default (url, types) => {
  let methods = {
    get,
    getChild,
    set,
    add,
    sync,
    update,
    remove,
    createFirebaseUrl,
    createFirebaseRef
  }
  return typeReducer(url, types, methods, 'firebaser')
}
