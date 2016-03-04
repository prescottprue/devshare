import cookie from 'cookie'
import config from '../../config.json'
import { put, post } from '../utils/cruder'
import { isBrowser } from '../utils/env'

let token
let currentUser

export const createHeaders = _ => {
  let header = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
  if (isBrowser()) {
    return header
  }
  header.Authorization = `Bearer ${token}`
  return header
}

const setToken = nextToken => {
  if (isBrowser()) {
    document.cookie = cookie.serialize('token', nextToken)
  }
  token = nextToken
}

const removeToken = _ => {
  if (isBrowser()) {
    document.cookie = 'token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;'
  }
}

export const getCurrentUser = _ => {
  if (isBrowser()) {
    currentUser = window.sessionStorage.getItem('currentUser')
  }
  return JSON.parse(currentUser)
}

const setCurrentUser = nextCurrentUser => {
  if (isBrowser()) {
    window.sessionStorage.setItem('currentUser', JSON.stringify(nextCurrentUser))
  }
  currentUser = nextCurrentUser
}

const removeCurrentUser = _ => {
  if (isBrowser()) {
    window.sessionStorage.removeItem('currentUser')
  }
  currentUser = null
}

export const login = (username, password) =>
  put(`${config.root}/login`)({ username, password })
    .then(response => {
      const { token, user } = response
      if (token) setToken(token)
      if (user) setCurrentUser(user)
      return response
    })

export const logout = _ =>
  put(`${config.root}/logout`)()
    .then(response => {
      removeToken()
      removeCurrentUser()
      return response
    })

export const signup = userInfo =>
  post(`${config.root}/signup`)(userInfo)
    .then(response => {
      const { token, user } = response
      if (token) setToken(token)
      if (user) setCurrentUser(user)
      return response
    })
