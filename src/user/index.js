import config from '../config.json'
import cruder, { create } from '../utils/cruder'

export default (username) => {
  const url = `${config.root}/users/${username}`

  const methods = {
    createProject: (projectname, collaborators) =>
      create(`${url}/projects`)({ name: projectname, collaborators })
  }

  return Object.assign(
    {},
    cruder(url, ['get', 'update']),
    methods
  )
}
