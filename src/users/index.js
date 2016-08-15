import { paths } from '../config'
import firebaser, { search } from '../utils/firebaser'

export default () => {
  const methods = {
    search: (query) => query.indexOf('@') === -1
      ? search(paths.users)('username', query)
      : search(paths.users)('email', query)
  }

  return Object.assign(
    {},
    methods,
    firebaser(paths.users, ['add'])
  )
}
