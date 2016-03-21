import _project from './project'
import _user from './user'
import _auth from './auth'

const devshare = {
  project: _project,
  user: _user
}

export default Object.assign(
  {},
  devshare,
  _auth
)

export const project = _project
export const user = _user
export const auth = _auth
