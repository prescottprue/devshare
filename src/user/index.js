import { paths } from '../config'
import { get, update, remove, createFirebaseRef } from '../utils/firebaser'

export const getUid = (username) => !username
  ? Promise.reject('Username is required to get Uid')
  : get([paths.usernames, username])()
    .then(uid => uid || Promise.reject(`Not Found. ${username} is not a valid username.`))

export const getByUsername = (username) =>
  !username
  ? Promise.reject('Username is required to get user')
  : getUid(username)
      .then(uid =>
        get([paths.users, uid])()
          .then(user => !user
            ? Promise.reject('User not found.')
            : Object.assign({}, user, { uid })
          )
      )

export default (username) => {
  const methods = {
    // TODO: Firebase function to include username in token (this query won't be needed)
    get: () =>
      getByUsername(username),
    getFromUid: (uid) =>
      get([paths.users, uid])(),
    update: (newUserData) =>
      getByUsername(username)
        .then(user =>
          update([paths.users, user.uid])(newUserData)
            .then(() =>
              Object.assign({}, user, newUserData)
            )
        ),

    remove: () =>
      get([paths.usernames, username])
        .then(uid =>
          Promise.all([
            remove([paths.users, uid]),
            // Remove all Projects based on projects names list
            createFirebaseRef([paths.projectNames, uid])
              .then((ref) => {
                let promises = []
                ref.forEach((projectIdSnap) => {
                  promises.push(remove([paths.projects, projectIdSnap.val()]))
                })
                return Promise.all(promises)
                  .then(() => ref.remove())
              }),
            remove([paths.usernames, username])
          ])
        )
  }

  return Object.assign(
    {},
    methods
  )
}
