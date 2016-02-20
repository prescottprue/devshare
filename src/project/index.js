import cloud from './cloud'
import storage from './storage'
import fileSystem from './file-system'

export default class Project {
  constructor (username, projectname, config) {
  }

  get () {
    // Promise that return the fetch of content and meta data
  }

  remove () {
    // Promise that returns successful removal event
  }

  rename (name) {
    // Promise that returns successful rename event

  }

  get storage () {
    return storage(this.auth)
  }

  get cloud () {
    return cloud(this.auth)
  }

  get fileSystem () {
    return fileSystem(this.auth)
  }

}
