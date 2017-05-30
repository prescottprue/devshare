import { set, get, update, remove } from '../utils/firebaser'
import fileSystem from './file-system'
import cloud from './cloud'
import projects from '../projects'
import template from '../template'
import collaborators from './collaborators'
import { isObject, remove as removeFromList } from 'lodash'
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
         .then((project) =>
           project || Promise.reject(
             `Project with name: ${projectname} does not exist.`
           )
         )
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
                  ? set([
                    paths.projects,
                    owner,
                    projectname,
                    'collaborators'
                  ])([ uid ])
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

  const removeProject = () =>
    getProject()
      .then(project =>
        remove([ paths.projects, owner, projectname ])()
      )

  const methods = {
    get: getProject,
    remove: removeProject,
    delete: removeProject,

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
              (!collaborators || collaborators.indexOf(uid) === -1)
                ? Promise.reject('User is not a collaborator on project')
                : set(`${name}/collaborators`)(
                    removeFromList(collaborators, uid)
                  )
            )
      ),

    clone: (newOwner, newName) =>
      projects(newOwner)
        .add({ name: newName })
        .then((res) =>
          fileSystem(owner, projectname)
            .clone(newOwner, newName)
        ),

    copyToTemplate: (name) => {
      console.log('copy from project;', { owner, projectname })
      return template(name).copyFromProject(owner, projectname)
    },

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
