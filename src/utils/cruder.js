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
    method: 'put',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
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

export const create = url => object => {
  return fetch(url, {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
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

export const add = create

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
