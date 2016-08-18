import firebaser, { update, remove } from '../utils/firebaser'
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

  const methods = {
    rename: (newProjectname) =>
      update(name)({ name: newProjectname }),

    addCollaborator: (username) =>
      update(`${name}/collaborators/${username}`)(),

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
    firebaser(name, ['get', 'remove']),
    methods,
    subModels
  )
}
