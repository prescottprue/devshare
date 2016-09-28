import { paths } from '../../config'
import { get, createFirebaseRef } from '../../utils/firebaser'
import { getUid } from '../../user'

export default (owner, projectname) => {
  const methods = {
    get: () => getUid(owner)
      .then(uid => get([paths.projects, uid, projectname, 'collaborators'])()),

    add: (newCollabUsername) =>
      Promise.all([getUid(owner), getUid(newCollabUsername)])
      .then(uids =>
        createFirebaseRef([paths.projects, uids[0], projectname, 'collaborators'])()
          .once('value')
          .then(collabsSnap => {
            if (collabsSnap.val()) {
              // TODO: Make sure user is not already a collaborator
              return collabsSnap.ref.child(Object.keys(collabsSnap.val()).length).set(uids[1])
            }
            return collabsSnap.ref.set([uids[1]])
          })
      ),

    remove: (removeUsername) =>
      Promise.all([getUid(owner), getUid(removeUsername)])
      .then(uids =>
        createFirebaseRef([paths.projects, uids[0], projectname, 'collaborators'])()
          .once('value')
          .then(collabsSnap => {
            if (!collabsSnap.hasChildren()) {
              return Promise.reject('Can not remove user from project collaborators')
            }
            if (collabsSnap.val().indexOf(uids[1]) === -1) {
              return Promise.reject('User is not a collaborator')
            }
            return collabsSnap.ref.set(collabsSnap.val().filter(id => id !== uids[1]))
          })
      )
  }

  return Object.assign(
    {},
    methods
  )
}
