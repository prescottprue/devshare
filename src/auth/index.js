import { isObject, isArray, capitalize } from 'lodash'
import firebase from 'firebase'
import project from '../project'
import { set, update } from '../utils/firebaser'
import { paths } from '../config'

/**
* @description Login/Authenticate as a user
* @param {String|Object} username - Username or email of user to login as.
* Or object containing username, password, and project (optional)
* @param {String} password - Password of user to login as
* @param {String} project - Name of project to clone to account after login (optional)
*/
export const login = (email, password, projectName) => {
  if (!email) {
    return Promise.reject({ message: 'Username or Email is required to login ' })
  }

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

  // if (isObject(email) && email.provider) return authWithProvider(email.provider)
  return firebase.auth().signInWithEmailAndPassword(email, password)
    .then((response) => {
      const { user } = response
      return !projectName ? response
        : project('anon', projectName)
            .clone(user.username, projectName)
            .then((cloneRes) => response)
            .catch((error) => Object.assign(user, { error }))
    })
    .catch((error) => Promise.reject(error))
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
 * @description Create new user account
 * @param {Object} userInfo - Object containing signup data
 * @param {String} userInfo.username - Username of new user
 * @param {String} userInfo.displayName - Display name of new user
 * @param {String} userInfo.email - Email of new user
 */
export const createUserAccount = (newUser) =>
  set([paths.users, newUser.uid])(newUser)
    .then(() =>
      set([paths.usernames, newUser.username])(newUser.uid)
        .then(() => newUser)
    )
    .catch(error => Promise.reject(error))

/**
 * @description Signup and login as a new user
 * @param {Object} userInfo - Object containing signup data
 * @param {String} userInfo.username - Username of new user
 * @param {String} userInfo.email - Email of new user
 * @param {String} userInfo.displayName - Display name of new user
 * @param {String} userInfo.password - Password of new user
 * @param {String} userInfo.project - Name of project to clone to account after signup (optional)
 */
export const signup = ({ username, email, password, project, name }, projectName) => {
  if (!email || !username || !password) {
    return Promise.reject('Email and Password are required')
  }
  // Handle clone project name as part of first param
  if (project) projectName = project

  // Set name to username if not provided
  if (!name) name = username

  return firebase.auth()
    .createUserWithEmailAndPassword(email, password)
    .then(({ providerData, uid }) =>
      createUserAccount({ username, email, name, providerData, uid })
        .then((newUser) => !projectName ? newUser
          : project('anon', projectName)
              .clone(username, projectName)
              .then((cloneRes) => newUser)
              .catch((error) => Promise.reject(error))
        )
      )
    .catch((error) => Promise.reject(error))
}

/**
 * @description Authenticate using a 3rd party provider
 * @param {String} provider - Oauth Provider (google, github, facebook)
 */
export const authWithProvider = (providerName) => {
  const providerMethod = `${capitalize(providerName)}AuthProvider`
  const provider = new firebase.auth[providerMethod]()
  return firebase.auth().signInWithPopup(provider)
    .then((result) => {
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

/**
 * @description Update user profile in firebase auuth and users path
 * @param {Object} userInfo - Object containing signup data
 * @param {String} userInfo.username - Username of new user
 * @param {String} userInfo.email - Email of new user
 * @param {String} userInfo.displayName - Display name of new user
 */
export const updateUser = (newUserData) => {
  const currentUser = getCurrentUser()
  return currentUser.updateProfile(newUserData)
    .then(() =>
      update([paths.users, currentUser.uid])(newUserData)
        .then(() => currentUser)
    )
    .catch(error => Promise.reject(error))
}

/**
 * @description Update user email
 * @param {String} email - New email for current user
 */
export const updateEmail = (newEmail) => {
  const currentUser = getCurrentUser()
  return currentUser
    .updateEmail(newEmail)
    .then(() =>
      update([paths.users, currentUser.uid])({ email: newEmail })
        .then(() => currentUser)
      )
    .catch(error => Promise.reject(error))
}

export default {
  authWithProvider,
  getCurrentUser,
  updateUser,
  updateEmail,
  login,
  logout,
  signup
}
