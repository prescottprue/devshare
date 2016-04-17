import config from '../config'
import cruder, { search, add } from '../utils/cruder'

export default (username) => {
  const url = username
    ? `${config.tessellateRoot}/projects/${username}`
    : `${config.tessellateRoot}/projects`

  const methods = {
    search: (query) =>
      search(url)('name', query),

    add: (project) => {
      if (!project.name) return Promise.reject({ message: 'name is required' })
      if (project.name.match(/[^A-Za-z0-9\-_!,() ]/)) {
        return Promise.reject({
          message: 'name may not contain symbols other than: _ ! , ( )'
        })
      }
      return add(url)(project)
    }

  }

  return Object.assign(
    {},
    cruder(url, ['get']),
    methods
  )
}
