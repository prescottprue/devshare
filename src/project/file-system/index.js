import firebaser, { createFirebaseUrl, createFirebaseRef, get, set } from '../../utils/firebaser'
import file from './file'
import entity from './entity'
import folder from './folder'

export default (owner, projectname) => {
  const rootPath = ['files']
  const relativePath = rootPath.concat([owner, projectname])

  const methods = {
    clone: (newOwner, newName) =>
      get(relativePath)()
        .then(files =>
          set(rootPath.concat([newOwner, newName]))(files)
            .then(() => files)
        )
  }

  const subModels = {
    firebaseUrl: () =>
      createFirebaseUrl(relativePath)(),
    firebaseRef: () =>
      createFirebaseRef(relativePath)(),
    entity: entityPath =>
      entity(relativePath, entityPath),
    file: filePath =>
      file(relativePath, filePath),
    folder: folderPath =>
      folder(relativePath, folderPath)
  }

  return Object.assign(
    {},
    firebaser(relativePath, ['get', 'sync']),
    methods,
    subModels
  )
}
