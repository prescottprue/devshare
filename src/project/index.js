import config from '../../config.json'
import cruder, { add, update } from '../utils/cruder'

export default (username, projectname) => {
  const url = `${config.root}/users/${username}/projects/${projectname}`

  const methods = {
    rename: newProjectname =>
      update(url)({ name: newProjectname }),
    addCollaborator: username =>
      add(`${url}/collaborator`)(username)
  }

  return Object.assign(
    {},
    cruder(url, ['get', 'remove']),
    methods
  )
}
