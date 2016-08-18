import { paths } from '../config'
import { getCurrentUser } from '../auth'
import firebaser, { search, get, set, push } from '../utils/firebaser'

export default (username) => {
  const methods = {
    search: (query) =>
      username
      ? search([paths.projects, username])('name', query)
      : search(paths.projects)('name', query),

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
        return Promise.reject({ message: 'You must be logged in to create a project' })
      }
      if (!project.owner) project.owner = currentUser.uid
      return get([paths.projectNames, currentUser.uid])()
          .then(projectNamesList =>
            (projectNamesList && projectNamesList.val && projectNamesList.val().indexOf(project.name) !== -1)
            ? Promise.reject(`Error adding project: User already has a project named ${project.name}`)
            : push([paths.projects])(project)
              .then((newProject) =>
                set([paths.projectNames, currentUser.uid, newProject.key])(project.name)
                  .then(() =>
                    get([paths.users, currentUser.uid, paths.projects])()
                      .then((projectsList) =>
                        projectsList === null
                          ? set([ paths.users, currentUser.uid, paths.projects ])([newProject.key])
                            .then(id => project)
                          : set([ paths.users, currentUser.uid, paths.projects, projectsList.length ])(newProject.key)
                            .then(id => project)
                      )
                      .catch(error => Promise.reject(error))
                  )
                  .catch(error => Promise.reject(error))
              )
              .catch(error => Promise.reject(error))
          )
          .catch(error => Promise.reject(error))
    }

  }

  const projectsPath = username ? `${paths.projects}/${username}` : paths.projects

  return Object.assign(
    {},
    firebaser(projectsPath, ['get', 'update']),
    methods
  )
}
