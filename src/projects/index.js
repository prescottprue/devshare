import { paths } from '../config'
import { getCurrentUser } from '../auth'
import { search, get, set } from '../utils/firebaser'

export default (username) => {
  const methods = {
    search: (query) =>
      username
      ? search([paths.projects, username])('name', query)
      : search(paths.projects)('name', query),

    get: () =>
      get([paths.usernames, username])()
        .then((uid) => get([paths.projects, uid])()),

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

      // Check for existance of project name
      return get([
        paths.projects,
        username || currentUser.uid,
        project.name
      ])().then(loadedProject =>
          // Push new project to projects list if it does not already exist in projectNamesList
          (loadedProject && loadedProject.name === project.name)
            ? Promise.reject(`Error adding project: User already has a project named ${project.name}`)
            : set([paths.projects, username || currentUser.uid, project.name])(project).then((newProject) =>
                // get list of projects within user
                get([
                  paths.users,
                  currentUser.uid,
                  paths.projects
                ])().then((projectsList) =>
                    projectsList === null
                      ? set([
                        paths.users,
                        currentUser.uid,
                        paths.projects
                      ])([project.name]).then(() => project)
                      : set([
                        paths.users,
                        currentUser.uid,
                        paths.projects,
                        projectsList.length
                      ])(project.name).then(() => project)
                  )
              )
          )
    }

  }

  return Object.assign(
    {},
    methods
  )
}
