import config from '../config'
import cruder, { search } from '../utils/cruder'

export default () => {
  const url = `${config.tessellateRoot}/users`

  const methods = {
    search: query => query.indexOf('@')
      ? search(url)('email', query)
      : search(url)('username', query)
  }

  return Object.assign(
    {},
    cruder(url, ['add']),
    methods
  )
}
