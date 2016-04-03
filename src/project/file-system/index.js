// import Entity from './entity'
import firebaser, { createFirebaseUrl, createFirebaseRef } from '../../utils/firebaser'
import file from './file'
import entity from './entity'
import folder from './folder'

export default (owner, projectname) => {
  const relativePath = ['files', owner, projectname]

  const methods = {

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
