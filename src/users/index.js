import config from '../config'
import cruder, { search } from '../utils/cruder'

export default () => {
  const url = `${config.tessellateRoot}/users`

  const methods = {
    search: query => query.indexOf('@') === -1
      ? search(url)('username', query)
      : search(url)('email', query)
  }

  return Object.assign(
    {},
    methods,
    cruder(url, ['add'])
  )
}
