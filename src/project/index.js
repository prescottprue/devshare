import { get, update, remove } from '../utils/firebaser'
import fileSystem from './file-system'
import cloud from './cloud'
import projects from '../projects'
import collaborators from './collaborators'
import { isObject } from 'lodash'
import { paths } from '../config'

export default (owner, projectname) => {
  // Handle object as first param
  if (isObject(owner) && owner.owner) {
    projectname = owner.name
    owner = owner.owner.username
  }

  const name = `${paths.projects}/${owner}/${projectname}`

  const getProject = () =>
    get([paths.usernames, owner])()
      .then((uid) => !uid
        ? Promise.reject('User not found.')
        : get([paths.projects, projectname])()
          .then((project) => !project
            ? Promise.reject('Project not found.')
            : project
          )
        )
  const methods = {
    get: getProject,

    rename: (newProjectname) =>
      update(name)({ name: newProjectname }),

    // addCollaborator: (username) =>
    //   get([paths.usernames, username])
    //     .then((uid) =>
    //       project().then((project) =>
    //         update([paths.projects, project.name, ]).update({ collaborators: [...project.collaborators, uid] })
    //       )
    //     ),

    addCollaborators: (collaborators) =>
      update(`${name}/collaborators`)(collaborators),

    removeCollaborator: (username) =>
      remove(`${name}/collaborators/${username}`)(),

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
