import { capitalize } from 'lodash'
import firebase from 'firebase'
import project from '../project'
import { set, get, update } from '../utils/firebaser'
import { paths } from '../config'

/**
 * @description Get correct login method and params order based on provided credentials
 * @param {Object} credentials - Login credentials
 * @param {String} credentials.email - Email to login with (only needed for email login)
 * @param {String} credentials.password - Password to login with (only needed for email login)
 * @param {String} credentials.provider - Provider name such as google, twitter
 * @param {String} credentials.type - Popup or redirect (only needed for 3rd party provider login)
 * @param {String} credentials.token - Custom or provider token
 */
const getLoginMethodAndParams = ({email, password, provider, type, token}) => {
  if (provider) {
    if (token) {
      return {
        method: 'signInWithCredential',
        params: [ provider, token ]
      }
    }
    const authProvider = new firebase.auth[`${capitalize(provider)}AuthProvider`]()
    authProvider.addScope('email')
    if (type === 'popup') {
      return {
        method: 'signInWithPopup',
        params: [ authProvider ]
      }
    }
    return {
      method: 'signInWithRedirect',
      params: [ authProvider ]
    }
  }
  if (token) {
    return {
      method: 'signInWithCustomToken',
      params: [ token ]
    }
  }
  return {
    method: 'signInWithEmailAndPassword',
    params: [ email, password ]
  }
}

/**
 * @description Create new user account
 * @param {Object} userInfo - Object containing signup data
 * @param {String} userInfo.username - Username of new user
 * @param {String} userInfo.displayName - Display name of new user
 * @param {String} userInfo.email - Email of new user
 * @param {String} userInfo.avatarUrl - Url of avatar image
 * @param {String} userInfo.uid - User's uid
 * @param {Array} userInfo.providerData - Data from external provider accounts
 */
const profileFromUserData = ({ email, username, avatarUrl, providerData, uid }) => {
  const data = providerData && providerData[0]
  if (!username) username = data.email.split('@')[0]
  if (data.photoURL) {
    avatarUrl = data.photoURL
  }
  const profile = { email, username }
  if (providerData) profile.providerData = providerData
  if (avatarUrl) profile.avatarUrl = avatarUrl
  profile.uid = uid
  return profile
}

/**
 * @description Create new user account
 * @param {Object} userInfo - Object containing signup data
 * @param {String} userInfo.username - Username of new user
 * @param {String} userInfo.displayName - Display name of new user
 * @param {String} userInfo.email - Email of new user
 */
export const createUserProfile = (newUser) => {
  // TODO: Verify that username does not already exist
  const profile = profileFromUserData(newUser)
  return get([paths.users, newUser.uid])()
    .then((loadedProfile) =>
      // Only write profile if it does not already exist
      loadedProfile || Promise.all([
        set([paths.users, newUser.uid])(profile),
        set([paths.usernames, newUser.uid])(profile.username),
        set([paths.uids, profile.username])(newUser.uid)
      ])
      .then(() => profile)
    )
}

/**
* @description Login/Authenticate as a user
* @param {String|Object} username - Username or email of user to login as.
* Or object containing username, password, and project (optional)
* @param {String} password - Password of user to login as
* @param {String} project - Name of project to clone to account after login (optional)
*/
export const login = (credentials, projectName) => {
  if (!credentials.email && !credentials.username && !credentials.provider) {
    return Promise.reject({ message: 'Username/Email or Provider is required to login ' })
  }

  const { method, params } = getLoginMethodAndParams(credentials)
  // TODO: Username login
  // if (method === 'signInWithEmailAndPassword' && !credentials.email) {
  //   devshare.firebase.database().ref().child(devshare._.config.usernames)
  // }
  return firebase.auth()[method](...params)
    .then((userData) =>
      // For email auth return uid (createUser is used for creating a profile)
      userData.email
        ? userData
        : createUserProfile(userData.user)
    )
    .then(user =>
      // If project name is included, clone project
      !projectName
        ? user
        : project('anon', projectName)
            .clone(user.username, projectName)
            .then((cloneRes) => user)
            .catch((error) => Object.assign(user, { error }))
    )
}

/**
 * @description Logout of currently logged in user
 */
export const logout = () =>
  firebase.auth().signOut()

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

  // TODO: Handle external provider signup (call login)
  // TODO: Login before creating user profile
  return firebase.auth()
    .createUserWithEmailAndPassword(email, password)
    .then(({ providerData, uid }) =>
      createUserProfile({ username, email, name, providerData, uid })
        .then((newUser) => !projectName ? newUser
          : project('anon', projectName)
              .clone(username, projectName)
              .then((cloneRes) => newUser)
        )
    )
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
  getCurrentUser,
  updateUser,
  updateEmail,
  login,
  logout,
  signup
}
