import config from '../config'
import cruder from '../utils/cruder'

export default (username) => {
  const url = `${config.tessellateRoot}/users/${username}`

  const methods = {

  }

  return Object.assign(
    {},
    cruder(url, ['get', 'update', 'remove']),
    methods
  )
}
