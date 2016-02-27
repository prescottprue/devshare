import _project from './project'
import _user from './user'

// export default class Devshare {
//   constructor (config) {
//     // TODO: Work on this logic for auth
//     this.auth = config
//     // TODO: fall back to cookie JWT token if no auth is provided
//   }
//
//   project (username, projectname) {
//     return project(username, projectname)
//   }
//
//   user (username) {
//     return new User(username)
//   }
// }

export default {
  project: _project,
  user: _user
}
export const project = _project
export const user = _user
