import cookie from 'cookie'
import { isBrowser } from './env'

let token

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

export const setToken = newToken => {
  if (isBrowser()) {
    document.cookie = cookie.serialize('devshare', newToken)
  }
  token = newToken
}
