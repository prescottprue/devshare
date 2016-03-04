import fetch from 'isomorphic-fetch'
import { createHeaders } from '../auth'

const handleResponse = body => {
  if (body.code >= 400) {
    const { message, status } = body
    return Promise.reject({ message, status })
  }
  return body
}

export const get = url => _ => {
  return fetch(url, { headers: createHeaders() })
    .then(response => {
      return response.json()
    })
    .then(body => {
      return handleResponse(body)
    })
}

export const remove = url => _ => {
  return fetch(url, {
    method: 'delete',
    headers: createHeaders()
  })
    .then(response => {
      return response.json()
    })
    .then(body => {
      return handleResponse(body)
    })
}

export const put = url => object => {
  return fetch(url, {
    method: 'put',
    headers: createHeaders(),
    body: JSON.stringify(object)
  })
    .then(response => {
      return response.json()
    })
    .then(body => {
      return handleResponse(body)
    })
}

export const post = url => object => {
  return fetch(url, {
    method: 'post',
    headers: createHeaders(),
    body: JSON.stringify(object)
  })
    .then(response => {
      return response.json()
    })
    .then(body => {
      return handleResponse(body)
    })
}

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
