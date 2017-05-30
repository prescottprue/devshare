import { get, update, remove } from '../utils/firebaser'
import templates from '../templates'
import { paths } from '../config'
import fileSystem from './file-system'

export default (templateName) => {
  const path = [paths.templates, templateName]

  const getTemplate = () =>
    get(path)()
     .then((template) =>
       template || Promise.reject(
         `Template with name: ${templateName} does not exist.`
       )
     )

  const removeTemplate = () =>
    getTemplate()
      .then(project =>
        remove(path)()
      )

  const methods = {
    get: getTemplate,
    remove: removeTemplate,
    delete: removeTemplate,

    rename: (newTemplatename) =>
      update(path)({ name: newTemplatename }),

    clone: (newName) =>
      getTemplate()
        .then((originalTemplate) =>
          templates()
            .add({ ...originalTemplate, name: newName })
            .then((res) =>
              fileSystem(templateName).clone(newName)
            ),
        ),

    download: () =>
      fileSystem(templateName).download(),

    copyToProject: (owner, projectname) =>
      fileSystem(templateName).copyToProject(owner, projectname),

    copyFromProject: (owner, projectname) =>
      fileSystem(templateName).copyFromProject(owner, projectname)
  }

  const subModels = {
    fileSystem: fileSystem(templateName)
  }

  return Object.assign(
    {},
    methods,
    subModels
  )
}
