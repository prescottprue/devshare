import { paths } from '../config'
import firebaser, { createFirebaseRef } from '../utils/firebaser'

export default (username) => {
  const methods = {
    // TODO: Firebase function to include username in token (this query won't be needed)
    getByUid: (uid) =>
      createFirebaseRef(paths.users)()
        .orderByChild('uid')
        .equalTo(uid)
        .limitToFirst(1)
        .once('value')
        .then((data) => {
          if (!data || !data.val()) return Promise.reject('User not found')
          const key = Object.keys(data.val())[0]
          const userData = data.val()[key]
          return Object.assign({}, userData, { key })
        })
  }

  return Object.assign(
    {},
    firebaser(`${paths.users}/${username}`, ['get', 'update', 'remove']),
    methods
  )
}
