import config from '../../config.json'
import cruder from '../utils/cruder'

export default (username) => {
  const url = `${config.root}/users/${username}`

  const methods = {
    createProject: (projectname) =>
      cruder(`${url}/projects`, ['create']).create({ name: projectname })
  }

  return Object.assign(
    {},
    cruder(url, ['get', 'update']),
    methods
  )
}
