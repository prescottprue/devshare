import { paths } from '../config'
import firebaser, { push, search, update } from '../utils/firebaser'

export default (uid) => {
  const methods = {
    search: (query) =>
      search(paths.projects)('name', query),

    add: (project) => {
      if (!project.name) return Promise.reject({ message: 'name is required' })
      if (project.name.match(/[^A-Za-z0-9\-_!,() ]/)) {
        return Promise.reject({
          message: 'name may not contain symbols other than: _ ! , ( )'
        })
      }
      const newProject = Object.assign(project, { owner: uid })
      return push(paths.projects)(newProject)
        .then(update([paths.users, uid])(newProject))
    }

  }

  return Object.assign(
    {},
    firebaser(paths.projects, ['get', 'update']),
    methods
  )
}
