import fetch from 'isomorphic-fetch'

const checkResponseError = body => {
  if (body.code >= 400) {
    const { message, status } = body
    return Promise.reject({ message, status })
  }
}

export const get = url => _ => {
  return fetch(url)
    .then(response => {
      return response.json()
    })
    .then(body => {
      checkResponseError(body)
      return body
    })
}

export const remove = url => _ => {
  return fetch(url, {
    method: 'delete'
  })
    .then(response => {
      return response.json()
    })
    .then(body => {
      checkResponseError(body)
      return body
    })
}

export const update = url => object => {
  return fetch(url, {
    method: 'patch',
    body: object
  })
    .then(response => {
      return response.json()
    })
    .then(body => {
      checkResponseError(body)
      return body
    })
}

export const create = url => object => {
  return fetch(url, {
    method: 'post',
    body: JSON.stringify(object)
  })
    .then(response => {
      return response.json()
    })
    .then(body => {
      checkResponseError(body)
      return body
    })
}

export default (url, types) => {
  let methods = {
    get,
    remove,
    update,
    create
  }

  return types
    .reduce((returnedMethods, type) => {
      let method = {}
      method[type] = methods[type].call(this, url)
      return Object.assign({}, returnedMethods, method)
    }, {})
}
