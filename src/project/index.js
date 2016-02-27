import config from '../../config.json'
import cruder from '../utils/cruder'

export default (username, projectname) => {
  const url = `${config.root}/users/${username}/projects/${projectname}`

  const methods = {
    rename: (newProjectname) =>
      cruder(url, ['update']).update({ name: newProjectname })
  }

  return Object.assign(
    {},
    cruder(url, ['get', 'remove']),
    methods
  )
}
