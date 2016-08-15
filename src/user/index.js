import { paths } from '../config'
import firebaser from '../utils/firebaser'

export default (username) => {
  const methods = {

  }

  return Object.assign(
    {},
    firebaser(paths.users, ['get', 'update', 'remove']),
    methods
  )
}
