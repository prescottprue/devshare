import config from '../config'
import cruder, { search } from '../utils/cruder'

export default () => {
  const url = `${config.tessellateRoot}/projects`

  const methods = {
    search: query =>
      search(url)('name', query)
  }

  return Object.assign(
    {},
    cruder(url, ['add']),
    methods
  )
}
