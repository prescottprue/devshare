import { paths } from '../config'
import { getCurrentUser } from '../auth'
import firebaser, { push, search, get, set } from '../utils/firebaser'

export default (username) => {
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
      const currentUser = getCurrentUser()
      if (!currentUser || !currentUser.uid) {
        console.error('You must be logged in to create a project')
        return Promise.reject({message: 'You must be logged in to create a project'})
      }
      const newProject = Object.assign(project, { owner: currentUser.uid })
      return push(paths.projects)(newProject)
        .then((res) => {
          get([paths.users, currentUser.uid, paths.projects])()
            .then((projectsList) => {
              if (projectsList === null) return set([paths.users, currentUser.uid, paths.projects])([newProject.key])
              return set([
                paths.users,
                currentUser.uid,
                paths.projects,
                projectsList.length
              ])(newProject.key)
            })
        })
    }

  }

  return Object.assign(
    {},
    firebaser(paths.projects, ['get', 'update']),
    methods
  )
}
