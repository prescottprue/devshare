import { randomIntBetween } from '../../utils'
import firebaser, { createFirebaseUrl, createFirebaseRef, get, set } from '../../utils/firebaser'
import file from './file'
import entity from './entity'
import folder from './folder'

const highlightColors = [
  '#FF0000',
  '#FF00F1',
  '#F1C40F',
  '#D35400',
  '#FF08',
  '#2980B9',
  '#9B59B6'
]

export default (owner, projectname) => {
  const rootPath = ['files']
  const relativePath = rootPath.concat([owner, projectname])

  const methods = {
    clone: (newOwner, newName) =>
      get(relativePath)()
        .then(files =>
          set(rootPath.concat([newOwner, newName]))(files)
            .then(() => files)
        ),
    // TODO: Check other existing colors before returning
    getUserColor: () =>
      highlightColors[randomIntBetween(0, highlightColors.length - 1)]
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
