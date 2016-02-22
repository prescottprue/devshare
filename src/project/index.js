import cloud from './cloud'
import storage from './storage'
import fileSystem from './file-system'
import config from '../../config.json'
import fetch from 'isomorphic-fetch'

const fetcher = (state) => ({
  get: () => {
    return new Promise((resolve, reject) => {
      fetch(`http://tessellate.elasticbeanstalk.com/users/${state.username}/projects/${state.projectname}`)
        .then(response => {
          if (response.status >= 400) {
             const { message, status } = response.body.json()
             return reject({ message, status })
          }
          return response.json()
        })
        .then(body => {
          resolve(body)
        })
    })
  }
})

const project = (username, projectname) => {
  let state = {
    username,
    projectname,
    endpoint: `${config.root}/username/projectname`
  }


  return Object.assign(
    {},
    fetcher(state)
  )

  // Promise that return the fetch of content and meta data

  remove: () => {
    // Promise that returns successful removal event
  }

  rename: (name) => {
    // Promise that returns successful rename event

  }

  storage: () => storage(state.auth)

  cloud: () => cloud(state.auth)

  fileSystem: () => fileSystem(state.auth)

};

export default project
