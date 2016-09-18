import { set, get, update } from '../utils/firebaser'
import fileSystem from './file-system'
import cloud from './cloud'
import projects from '../projects'
import collaborators from './collaborators'
import { isObject, remove } from 'lodash'
import { paths } from '../config'

export default (owner, projectname) => {
  // Handle object as first param
  if (isObject(owner) && owner.owner) {
    projectname = owner.name
    owner = (isObject(owner.owner) && owner.owner.username)
      ? owner.owner.username
      : owner.owner
  }

  const name = `${paths.projects}/${owner}/${projectname}`

  const getProject = () =>
    get([paths.usernames, owner])()
     .then((uid) => !uid
       ? Promise.reject(`User with username: ${owner} does not exist.`)
       : get([paths.projects, owner, projectname])()
         .then((project) => !project
           ? Promise.reject(`Project with name: ${projectname} does not exist.`)
           : project
         )
       )

  const addCollaborator = (username) =>
    get([paths.usernames, username])()
      .then((uid) =>
        getProject().then((project) =>
          !project.collaborators
            ? set([ paths.projects, owner, projectname, 'collaborators' ])([ { uid, username } ])
            : project.collaborators.indexOf(uid) !== -1
              ? Promise.reject('User is already a collaborator')
              : set([
                paths.projects,
                owner,
                projectname,
                'collaborators'
              ])([
                ...project.collaborators,
                { uid, username }
              ])
        )
      )

  const methods = {
    get: getProject,
    addCollaborator,

    rename: (newProjectname) =>
      update(name)({ name: newProjectname }),

    addCollaborators: (collaborators) =>
      Promise.all(
        collaborators.map(collaborator =>
          get([paths.usernames, collaborator])()
            .then(uid => addCollaborator(uid))
        )
      ),

    removeCollaborator: (username) =>
      get([paths.usernames, username])()
        .then((uid) =>
          getProject()
            .then(({ collaborators }) =>
              (!collaborators || collaborators.indexOf(uid) !== -1)
                ? Promise.reject('User is not a collaborator on project')
                : set(`${name}/collaborators`)(remove(collaborators, uid))
            )
      ),

    clone: (newOwner, newName) =>
      projects(newOwner)
        .add({ name: newName })
        .then((res) =>
          fileSystem(owner, projectname)
            .clone(newOwner, newName)
        ),

    download: () =>
      fileSystem(owner, projectname).download()

  }

  const subModels = {
    fileSystem: fileSystem(owner, projectname),
    cloud: cloud(owner, projectname),
    collaborators: collaborators(owner, projectname)
  }

  return Object.assign(
    {},
    methods,
    subModels
  )
}
