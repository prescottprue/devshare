import { paths } from '../config'
import { getCurrentUser } from '../auth'
import template from '../template'
import { search, get, set, setWithMeta } from '../utils/firebaser'

export default (username) => {
  const addProject = (project) => {
    if (!project.name) return Promise.reject('Name is required.')

    if (project.name.match(/[/\s]/g)) {
      return Promise.reject('Name may not contain spaces.')
    }

    if (project.name.match(/[.$#[\]/]/g)) {
      return Promise.reject(
        'Name may contain letters and symbols except for ., $, #, [, ], /.'
      )
    }

    const currentUser = getCurrentUser()
    if (!currentUser || !currentUser.uid) {
      console.error('You must be logged in to create a project')
      return Promise.reject('You must be logged in to create a project')
    }
    // TODO: Handle project owner being username or uid
    // TODO: Handle project owner being object
    // TODO: Handle project owner not being provided
    // if (!project.owner) {
    //   get([paths.projects, currentUser.uid, 'username'])().then(username => )
    // }
    // Check for existance of project name

    return get([
      paths.projects,
      username || project.owner,
      project.name
    ])().then(loadedProject =>
        // Push new project to projects list if it does not already exist
        (loadedProject && loadedProject.name === project.name)
          ? Promise.reject(`Error adding project: User already has a project named ${project.name}`)
          : setWithMeta([
            paths.projects, username || project.owner,
            project.name
          ])(project).then((newProject) =>
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
  const methods = {
    search: (query) =>
      username
      ? search([paths.projects, username])('name', query)
      : search(paths.projects)('name', query),

    get: () =>
      get([paths.usernames, username])()
        .then((uid) => get([paths.projects, uid])()),

    add: addProject,

    addFromTemplate: (templateName, project) =>
      get([paths.usernames, getCurrentUser().uid])()
        .then((username) =>
          addProject({ ...project, owner: username })
            .then((newProject) =>
              template(templateName).copyToProject(username, newProject.name)
            )
        )
  }

  return Object.assign(
    {},
    methods
  )
}
