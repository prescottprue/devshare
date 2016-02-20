import Project from './project'
import User from './user'

export default class Devshare {
  constructor (config) {
    // TODO: Work on this logic for auth
    this.auth = config
    // TODO: fall back to cookie JWT token if no auth is provided
  }

  project (username, projectname) {
    return new Project(username, projectname)
  }

  user (username) {
    return new User(username)
  }
}
