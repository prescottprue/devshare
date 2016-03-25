import fetch from 'isomorphic-fetch'
import { createHeaders } from '../auth'

const handleResponse = body => {
  if (body.code >= 400) {
    const { message, status } = body
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
  fetch(`${url}/search?${key}=${query}`, {
    method: 'get',
    headers: createHeaders()
  })
    .then(response => response.json())
    .then(body => handleResponse(body))

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

  return types
    .reduce((returnedMethods, type) => {
      let method = {}
      method[type] = methods[type].call(this, url)
      return Object.assign({}, returnedMethods, method)
    }, {})
}
