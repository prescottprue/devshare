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
          .then(collaboratorsSnap => {
            if (collaboratorsSnap.val()) {
              // TODO: Make sure user is not already a collaborator
              return collaboratorsSnap.ref.child(Object.keys(collaboratorsSnap.val()).length).set(uids[1])
            }
            return collaboratorsSnap.ref.set([uids[1]])
          })
      )
  }

  return Object.assign(
    {},
    methods
  )
}
