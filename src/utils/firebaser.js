import firebase from 'firebase'
import { typeReducer } from './index'
import { isArray } from 'lodash'
import { firebase as firebaseConfig } from '../config'

export const init = () => {
  try {
    firebase.initializeApp(firebaseConfig)
  } catch (err) {
    console.warn('Firebase init error:', err)
  }
}

// Handles abnormal characters within paths
export const createFirebaseUrl = (relativePath) => () => {
  if (!isArray(relativePath)) relativePath = [relativePath]
  return relativePath.map((loc) => loc
        ? loc.replace(/[.]/g, ':')
        .replace(/[#$\[\]]/g, '_-_')
        : ''
    ).join('/')
}

export const createFirebaseRef = (relativePath) => () =>
  new firebase.database().ref(createFirebaseUrl(relativePath)()) // eslint-disable-line new-cap

export const get = (relativePath) => () =>
  createFirebaseRef(relativePath)()
    .once('value')
    .then((data) => data.val())

export const set = (relativePath) => (object) =>
  createFirebaseRef(relativePath)()
    .set(object)
    .then((data) => data ? data.val() : object)

export const update = (relativePath) => (object) =>
  createFirebaseRef(relativePath)()
    .update(object)
    .then((data) => data.val())

export const remove = (relativePath) => () =>
  createFirebaseRef(relativePath)()
    .remove()
    .then((data) => null)

export const sync = (relativePath) => (callback) =>
  createFirebaseRef(relativePath)()
    .on('value', (data) => callback(data.val()))

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
    sync,
    update,
    remove,
    createFirebaseUrl,
    createFirebaseRef
  }
  return typeReducer(url, types, methods, 'firebaser')
}
