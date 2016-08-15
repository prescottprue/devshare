import firebase from 'firebase'
import { typeReducer } from './index'
import { isArray, isString } from 'lodash'
import { firebase as firebaseConfig } from '../config'

/**
 * @description Initialize firebase application
 */
export const init = () => {
  try {
    firebase.initializeApp(firebaseConfig)
  } catch (err) {
    console.warn('You only need to initialize Firebase once', JSON.stringify(err))
  }
}

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
          .replace(/[#$\[\]]/g, '_-_')
        : loc
    ).join('/')
}

/**
 * @description Handles abnormal characters within paths
 * @param {Array|String} relativePath - Releative path
 * @return {Promise}
 */
export const createFirebaseRef = (relativePath) => () =>
  new firebase.database().ref(createFirebaseUrl(relativePath)()) // eslint-disable-line new-cap

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
export const set = (relativePath) => (object) =>
  createFirebaseRef(relativePath)()
    .set(object)
    .then((data) => data ? data.val() : object)

/**
 * @description Push data to a Firebase location based on array or string path
 * @param {Array|String} relativePath - Releative
 * @return {Promise}
 */
export const push = (relativePath) => (object) => {
  const pushRef = createFirebaseRef(relativePath)().push()
  return pushRef.set(object)
  .then((data) => data ? Object.assign({}, { key: pushRef.key }, data) : Object.assign(object, { key: pushRef.key }))
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
export const sync = (relativePath) => (callback) =>
  createFirebaseRef(relativePath)()
    .on('value', (data) => callback(data.val()))

/**
 * @description Search firebase router
 * @param {Array|String} relativePath - Path from Firebase root
 * @return {Promise}
 */
export const search = (relativePath) => (callback) =>
  createFirebaseRef(relativePath)()
    .orderByChild({})
    .on('value', (data) => callback(data.val()))

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
