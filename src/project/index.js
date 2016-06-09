import config from '../config'
import cruder, { update, remove } from '../utils/cruder'
import fileSystem from './file-system'
import cloud from './cloud'
import projects from '../projects'
import collaborators from './collaborators'
import { isObject } from 'lodash'

export default (owner, projectname) => {
  // Handle object as first param
  if (isObject(owner) && owner.owner) {
    projectname = owner.name
    owner = owner.owner.username
  }
  const url = `${config.tessellateRoot}/projects/${owner}/${projectname}`

  const methods = {
    rename: (newProjectname) =>
      update(url)({ name: newProjectname }),

    addCollaborator: (username) =>
      update(`${url}/collaborators/${username}`)(),

    addCollaborators: (collaborators) =>
      update(`${url}/collaborators`)(collaborators),

    removeCollaborator: (username) =>
      remove(`${url}/collaborators/${username}`)(),

    clone: (newOwner, newName) =>
      projects(newOwner)
        .add({ name: newName })
        .then((res) =>
          fileSystem(owner, projectname).clone(newOwner, newName)
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
    cruder(url, ['get', 'remove']),
    methods,
    subModels
  )
}
