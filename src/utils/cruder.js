import fetch from 'isomorphic-fetch'

const checkResponseError = (body) => {
  if (body.code >= 400) {
    const { message, status } = body
    return Promise.reject({ message, status })
  }
}

export default (url, types) => {
  let methods = {
    get: () => {
      return fetch(url)
        .then(response => {
          return response.json()
        })
        .then(body => {
          checkResponseError(body)
          return body
        })
    },
    remove: () => {
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
    },
    update: (object) => {
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
    },
    create: (object) => {
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
  }
  return types
    .reduce((returnedMethods, type) => {
      let method = {}
      method[type] = methods[type]
      return Object.assign({}, returnedMethods, method)
    }, {})
}
