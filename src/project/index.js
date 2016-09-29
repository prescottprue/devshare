import { set, get, update } from '../utils/firebaser'
import fileSystem from './file-system'
import cloud from './cloud'
import projects from '../projects'
import collaborators from './collaborators'
import { isObject, remove } from 'lodash'
import { paths } from '../config'
import { getCurrentUser } from '../auth'

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
    get([paths.uids, owner])()
     .then((uid) => !uid
       ? Promise.reject(`${owner} is not a user`)
       : get([paths.projects, owner, projectname])()
         .then((project) => {
           console.log('project:', project)
           return project || Promise.reject(`Project with name: ${paths.projects} ${owner} ${projectname} does not exist.`)
         })
       )

  const addCollaborator = (username) =>
    get([paths.uids, username])()
        .then((uid) =>
          !uid
            ? Promise.reject(`${username} is not a user`)
            : uid === getCurrentUser().uid
              ? Promise.reject(`${username} is the owner`)
              : getProject().then((project) =>
                !project.collaborators
                  ? set([ paths.projects, owner, projectname, 'collaborators' ])([ uid ])
                  : project.collaborators.indexOf(uid) !== -1
                    ? Promise.reject('User is already a collaborator')
                    : set([
                      paths.projects,
                      owner,
                      projectname,
                      'collaborators'
                    ])([
                      ...project.collaborators,
                      uid
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
          addCollaborator(collaborator)
        )
      ),

    removeCollaborator: (username) =>
      get([paths.uids, username])()
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
