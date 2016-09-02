import _projects from './projects'
import _project from './project'
import _users from './users'
import _user from './user'
import _auth from './auth'
import { init } from './utils/firebaser'
import firebase from 'firebase'

const devshare = {
  projects: _projects,
  project: _project,
  users: _users,
  user: _user,
  init,
  firebase
}

export default Object.assign(
  {},
  devshare,
  _auth
)

export const project = _project
export const projects = _projects
export const user = _user
export const users = _users
export const auth = _auth
export const { authWithProvider, login, logout, signup, getCurrentUser } = _auth
export { init }
