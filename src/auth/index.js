import { isObject, isArray, capitalize } from 'lodash'
import firebase from 'firebase'
import project from '../project'

/**
* @description Login/Authenticate as a user
* @param {String|Object} username - Username or email of user to login as.
* Or object containing username, password, and project (optional)
* @param {String} password - Password of user to login as
* @param {String} project - Name of project to clone to account after login (optional)
*/
export const login = (email, password, projectName) => {
  if (!email) return Promise.reject({ message: 'Username or Email is required to login ' })
  // First param as and object containing email and password
  if (isObject(email) && email.password) {
    password = email.password
    email = email.email
    if (email.project) projectName = email.project
  }
  // Handle Array as first param
  if (isArray(email)) {
    if (email.length > 2) {
      projectName = email[2]
    }
    password = email[1]
    email = email[0]
  }
  // console.log('login', { email, password, projectName })
  // if (isObject(email) && email.provider) return authWithProvider(email.provider)
  // firebase.auth.signInWithEmailAndPassword(email, password)
  return firebase.auth().signInWithEmailAndPassword(email, password)
    .then((response) => {
      const { user } = response
      return !projectName ? response
        : project('anon', projectName)
            .clone(user.username, projectName)
            .then((cloneRes) => response)
            .catch((error) => Object.assign(user, { error }))
    })
}

/**
* @description Logout of currently logged in user
*/
export const logout = () =>
  firebase.auth().signOut()
    .catch((error) => {
      console.error('error logging out of firebase', error)
      return Promise.reject(error)
    })

/**
* @description Signup and login as a new user
* @param {Object} userInfo - Object containing signup data
* @param {String} userInfo.username - Username of new user
* @param {String} userInfo.email - Email of new user
* @param {String} userInfo.password - Password of new user
* @param {String} userInfo.project - Name of project to clone to account after signup (optional)
*/
export const signup = (userInfo) => {
  if (!userInfo.email || userInfo.password) {
    return Promise.reject('Email and Password are required')
  }
  return firebase.auth()
    .createUserWithEmailAndPassword(userInfo.email, userInfo.password)
    .then((response) => {
      !userInfo.project ? response
        : project('anon', userInfo.project)
            .clone(userInfo.username, userInfo.project)
            .then((cloneRes) => response)
            .catch((error) => Promise.reject(Object.assign(userInfo, { error })))
    })
    .catch(({ code, message }) => {
      if (code === 'auth/weak-password') {
        return Promise.reject('The password is too weak.')
      }
      console.log({code, message})
      return Promise.reject(message)
    })
}

/**
 * @description Authenticate using a token generated from the server (so
 * server and client are both aware of auth state)
 * @param {String} provider - Oauth Provider (google, github, facebook)
 */
export const authWithProvider = (providerName) => {
  // console.log('auth with provider:', providerName)
  const providerMethod = `${capitalize(providerName)}AuthProvider`
  const provider = new firebase.auth[providerMethod]()
  return firebase.auth().signInWithPopup(provider)
    .then((result) => {
      console.log('auth with popup', result)
      const accessToken = result.credential.accessToken
      const { user } = result
      console.log('auth with popup', { accessToken, user })
    })
    .catch((error) => {
      console.error('Error signing in with popup', error)
      return Promise.reject(error)
    })
}

export const getCurrentUser = () => firebase.auth().currentUser

export default {
  authWithProvider,
  getCurrentUser,
  login,
  logout,
  signup
}
