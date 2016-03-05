import config from '../config.json'
import cruder, { update, remove } from '../utils/cruder'

export default (owner, projectname) => {
  const url = `${config.root}/projects/${owner}/${projectname}`

  const methods = {
    rename: newProjectname =>
      update(url)({ name: newProjectname }),
    addCollaborator: username =>
      update(`${url}/collaborators/${username}`)(),
    addCollaborators: collaborators =>
      update(`${url}/collaborators`)(collaborators),
    removeCollaborator: username =>
      remove(`${url}/collaborators/${username}`)()
  }

  return Object.assign(
    {},
    cruder(url, ['get', 'remove']),
    methods
  )
}
