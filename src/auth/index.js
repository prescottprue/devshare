import { isObject, isArray, capitalize } from 'lodash'
import config from '../config'
import firebase from 'firebase'
import {
  auth as authWithFirebase,
  unauth as unauthFromFirebase
} from '../utils/firebaser'
import { put, post } from '../utils/cruder'
import { isBrowser } from '../utils'
import project from '../project'

let token
let currentUser

export const createHeaders = () => {
  let header = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
  if (isBrowser()) return header /* istanbul ignore next  */
  header.Authorization = `Bearer ${token}` /* istanbul ignore next */
  return header
}

export const getCurrentUser = () => {
  if (isBrowser()) currentUser = window.sessionStorage.getItem('currentUser')
  /* istanbul ignore next  */
  return JSON.parse(currentUser)
}

const setCurrentUser = (nextCurrentUser) => {
  if (isBrowser()) window.sessionStorage.setItem('currentUser', JSON.stringify(nextCurrentUser))
  currentUser = nextCurrentUser
}

const removeCurrentUser = () => {
  if (isBrowser()) window.sessionStorage.removeItem('currentUser')
  currentUser = null
}

/**
* @description Login/Authenticate as a user
* @param {String|Object} username - Username or email of user to login as.
* Or object containing username, password, and project (optional)
* @param {String} password - Password of user to login as
* @param {String} project - Name of project to clone to account after login (optional)
*/
export const login = (username, password, projectName) => {
  if (!username) return Promise.reject({ message: 'Username or Email is required to login ' })
  if (isObject(username) && username.password) {
    password = username.password
    username = username.username
    if (username.project) projectName = username.project
  }
  // Handle Array as first param
  if (isArray(username)) {
    if (username.length > 2) {
      projectName = username[2]
    }
    password = username[1]
    username = username[0]
  }
  // console.log('login', { username, password, projectName })
  if (isObject(username) && username.provider) return authWithProvider(username)
  // firebase.auth.signInWithEmailAndPassword(email, password)
  return put(`${config.tessellateRoot}/login`)({ username, password })
    .then((response) => {
      const { user, firebaseToken } = response
      if (user) setCurrentUser(user)
      if (!firebaseToken) return response
      return authWithFirebase(firebaseToken)
        .then((firebaseData) => projectName
          ? project('anon', projectName)
            .clone(user.username, projectName)
            .then((cloneRes) => response)
            .catch((error) => Object.assign(user, { error }))
          : response
        )
    })
}

/**
* @description Logout of currently logged in user
*/
export const logout = () =>
  put(`${config.tessellateRoot}/logout`)()
    .then((response) => {
      removeCurrentUser()
      unauthFromFirebase()
      return response
    })

/**
* @description Signup and login as a new user
* @param {Object} userInfo - Object containing signup data
* @param {String} userInfo.username - Username of new user
* @param {String} userInfo.email - Email of new user
* @param {String} userInfo.password - Password of new user
* @param {String} userInfo.project - Name of project to clone to account after signup (optional)
*/
export const signup = (userInfo) =>
  post(`${config.tessellateRoot}/signup`)(userInfo)
    .then((response) => {
      const { user, firebaseToken } = response
      if (user) setCurrentUser(user)
      if (!firebaseToken) return response
      return authWithFirebase(firebaseToken)
        .then((firebaseData) => userInfo.project
          ? project('anon', userInfo.project)
            .clone(user.username, userInfo.project)
            .then((cloneRes) => response)
            .catch((error) => Object.assign(user, { error }))
          : response
        )
    })

/**
 * @description Authenticate using a token generated from the server (so
 * server and client are both aware of auth state)
 * @param {String} provider - Oauth Provider (google, github, facebook)
 */
export const authWithProvider = (providerName) => {
  // console.log('auth with provider:', providerName)
  const providerMethod = `${capitalize(providerName)}AuthProvider`
  const provider = new firebase.auth[providerMethod]()
  return firebase.auth.signInWithPopup(provider)
    .then((result) => {
      console.log('auth with popup', result)
      const accessToken = result.credential.accessToken
      console.log('auth with popup', accessToken)
    })
    .catch((error) => {
      console.error('Error signing in with popup', error)
      return Promise.reject(error)
    })
}

export default {
  getCurrentUser,
  authWithProvider,
  login,
  logout,
  signup
}
