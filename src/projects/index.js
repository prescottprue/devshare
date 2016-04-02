import config from '../config'
import cruder, { search } from '../utils/cruder'

export default (username) => {
  const url = username
    ? `${config.tessellateRoot}/projects/${username}`
    : `${config.tessellateRoot}/projects`

  const methods = {
    search: query =>
      search(url)('name', query)
  }

  return Object.assign(
    {},
    cruder(url, ['get', 'add']),
    methods
  )
}
