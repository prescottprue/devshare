import { paths } from '../config'
import { getCurrentUser } from '../auth'
import user from '../user'
import firebaser, { search, get, set } from '../utils/firebaser'

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
      return user().getByUid(currentUser.uid)
        .then((user) => {
          if (!username) username = user.key
          get([paths.projects, username, project.name])()
            .then(projectVal => projectVal
              ? Promise.reject(`Error adding project: User already has a project named ${project.name}`)
              : set([paths.projects, username, project.name])(project)
                .then((newProject) =>
                  get([paths.users, username, paths.projects])()
                    .then((projectsList) => {
                      if (projectsList === null) {
                        return set([
                          paths.users,
                          username,
                          paths.projects
                        ])([newProject.name])
                      }
                      return set([
                        paths.users,
                        username,
                        paths.projects,
                        projectsList.length
                      ])(newProject.name)
                    })
                )
            )
        })
          .catch(error => Promise.reject(error))
    }

  }

  return Object.assign(
    {},
    firebaser(paths.projects, ['get', 'update']),
    methods
  )
}
