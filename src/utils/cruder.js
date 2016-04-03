import fetch from 'isomorphic-fetch'
import { createHeaders } from '../auth'
import { typeReducer } from './index'

const handleResponse = body => {
  if (body.code >= 400) {
    const { message, status } = body /* istanbul ignore next */
    return Promise.reject({ message, status })
  }
  return body
}

export const get = url => _ =>
  fetch(url, { headers: createHeaders() })
    .then(response => response.json())
    .then(body => handleResponse(body))

export const remove = url => _ =>
  fetch(url, {
    method: 'delete',
    headers: createHeaders()
  })
    .then(response => response.json())
    .then(body => handleResponse(body))

export const put = url => object =>
  fetch(url, {
    method: 'put',
    headers: createHeaders(),
    body: JSON.stringify(object)
  })
    .then(response => response.json())
    .then(body => handleResponse(body))

export const post = url => object =>
  fetch(url, {
    method: 'post',
    headers: createHeaders(),
    body: JSON.stringify(object)
  })
    .then(response => response.json())
    .then(body => handleResponse(body))

export const search = url => (key, query) =>
  query ? fetch(`${url}/search?${key}=${query}`, {
    method: 'get',
    headers: createHeaders()
  })
    .then(response => response.json())
    .then(body => handleResponse(body))
  : Promise.reject({ message: 'query is required to search' })

export const add = post
export const create = post
export const update = put

export default (url, types) => {
  let methods = {
    get,
    remove,
    update,
    create,
    add
  }

  return typeReducer(url, types, methods, 'cruder')
}
