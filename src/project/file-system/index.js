import file from './file'
import entity from './entity'
import folder from './folder'
import { highlightColors, paths } from '../../config'
import { randomIntBetween } from '../../utils'
import { zipFileSystem } from '../../utils/zipper'
import firebaser, {
  createFirebaseUrl, set,
  createFirebaseRef, get
  } from '../../utils/firebaser'

export default (owner, projectname) => {
  const relativePath = [paths.files, owner, projectname]
  // const projectUrl = `${paths.files}/projects/${owner}/${projectname}`
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
          set([paths.files, newOwner, newName || projectname])(files)
            .then(() => files)
        ),

    zip: () => zipFileSystem({owner, name: projectname}, relativePath),

    download: () => zipFileSystem({owner, name: projectname}, relativePath),

    // TODO: Check other existing colors before returning
    getUserColor: () =>
      highlightColors[randomIntBetween(0, highlightColors.length - 1)]

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
