import config from '../config'
import cruder, { update, remove } from '../utils/cruder'
import fileSystem from './file-system'

export default (owner, projectname) => {
  const url = `${config.tessellateRoot}/projects/${owner}/${projectname}`

  const methods = {
    rename: newProjectname =>
      update(url)({ name: newProjectname }),
    addCollaborator: username =>
      update(`${url}/collaborators/${username}`)(),
    addCollaborators: collaborators =>
      update(`${url}/collaborators`)(collaborators),
    removeCollaborator: username =>
      remove(`${url}/collaborators/${username}`)(),
    clone: (newOwner, newName) =>
      fileSystem(owner, projectname).clone(newOwner, newName)
  }

  const subModels = {
    fileSystem: fileSystem(owner, projectname)
  }

  return Object.assign(
    {},
    cruder(url, ['get', 'remove']),
    methods,
    subModels
  )
}
