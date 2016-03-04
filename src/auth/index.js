import cookie from 'cookie'
import config from '../../config.json'
import { put } from '../utils/cruder'
import { isBrowser } from '../utils/env'

let token
let currentUser

export const buildHeaders = _ => {
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

export const setToken = nextToken => {
  if (isBrowser()) {
    document.cookie = cookie.serialize('token', nextToken)
  }
  token = nextToken
}

export const setCurrentUser = nextCurrentUser => {
  if (isBrowser()) {
    window.sessionStorage.setItem('currentUser', JSON.stringify(nextCurrentUser))
  }
  currentUser = nextCurrentUser
}

export const login = (username, password) => put(`${config.root}/login`)({ username, password })
  .then(response => {
    const { token, user } = response
    if (token) setToken(token)
    if (user) setCurrentUser(user)
    return response
  })
