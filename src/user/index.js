import { paths } from '../config'
import { get, update, remove } from '../utils/firebaser'

export const getByUsername = (username) =>
  !username
  ? Promise.reject('Username is required to get user')
  : get([paths.usernames, username])()
    .then((uid) => !uid
      ? Promise.reject('User not found')
      : get([paths.users, uid])().then(user => Object.assign({}, user, { uid }))
    )

export default (username) => {
  const methods = {
    // TODO: Firebase function to include username in token (this query won't be needed)
    get: () => getByUsername(username),
    update: (newUserData) =>
      getByUsername(username)
        .then(user =>
          update([paths.users, user.uid])(newUserData)
            .then(() =>
              Object.assign({}, user, newUserData)
            )
        ),
    remove: () =>
      getByUsername(username)
        .then(user => remove([paths.users, user.uid])())
  }

  return Object.assign(
    {},
    methods
  )
}
