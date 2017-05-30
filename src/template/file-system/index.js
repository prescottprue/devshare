import file from './file'
import entity from './entity'
import folder from './folder'
import { paths } from '../../config'
import { zipFileSystem } from '../../utils/zipper'
import firebaser, {
  createFirebaseUrl, set, update,
  createFirebaseRef, get
  } from '../../utils/firebaser'

export default (templateName) => {
  const relativePath = [paths.templateFiles, templateName]
  // const projectUrl = `${paths.files}/projects/${owner}/${templateName}`
  const methods = {
    firebaseUrl: () =>
      createFirebaseUrl(relativePath)(),

    firebaseRef: () =>
      createFirebaseRef(relativePath)(),

    addFile: (filePath, content) =>
      file(relativePath, filePath).add(content),

    addFolder: (folderPath) =>
      folder(relativePath, folderPath).add(),

    clone: (newOwner, newName) =>
      get(relativePath)()
        .then((files) =>
          set([paths.templateFiles, newOwner, newName || templateName])(files)
            .then(() => files)
        ),

    copyToProject: (projectOwner, projectName) => {
      // TODO: Check that current user is owner of template
      // TODO: Check that current user is owner or collaborator of project
      if (!projectOwner || !projectName) {
        return Promise.reject('Both owner and projectName are required to copy template to project.')
      }
      return get(relativePath)()
        .then((files) =>
          update([paths.files, projectOwner, projectName])(files)
            .then(() => files)
        )
    },

    copyFromProject: (projectOwner, projectName) => {
      // TODO: Check that current user is owner of template
      // TODO: Check that current user is owner or collaborator of project
      if (!projectOwner || !projectName) {
        return Promise.reject('Both owner and projectName are required to copy template to project.')
      }
      return get([paths.files, projectOwner, projectName])()
        .then((files) =>
          update(relativePath)(files)
            .then(() => files)
        )
    },

    zip: () => zipFileSystem({ name: templateName }, relativePath),

    download: () => zipFileSystem({ name: templateName }, relativePath)

  }

  const subModels = {
    entity: (entityPath) =>
      entity(relativePath, entityPath),
    file: (filePath) =>
      file(relativePath, filePath),
    folder: (folderPath) =>
      folder(relativePath, folderPath)
  }

  return Object.assign(
    {},
    firebaser(relativePath, ['get', 'sync']),
    methods,
    subModels
  )
}
