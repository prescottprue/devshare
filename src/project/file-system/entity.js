import firebaser, { createFirebaseUrl, createFirebaseRef, set } from '../../utils/firebaser'
import { isArray } from 'lodash'

export default (projectPath, entityPath, entityType) => {
  const pathArray = isArray(entityPath) ? entityPath : entityPath.split('/')
  const path = pathArray.join('/')
  const name = pathArray[pathArray.length - 1]
  const fullPath = projectPath.concat(pathArray)

  const methods = {
    firebaseUrl: () =>
      createFirebaseUrl(fullPath)(),
    firebaseRef: () =>
      createFirebaseRef(fullPath)(),
    add: () =>
      set(fullPath)({ meta: { name, path } }),
    getMeta: () => this.getChild('meta'),
    move: () => {
      // Create new file in new location within file system
      // this.project.fileSystem.getFirebaseRef()
      // Delete old version of file
      // this.remove()
    },
    rename: () => {
      // return this.update({ meta: { name } })
    }
  }

  return Object.assign(
    {},
    { entityType, name, path, pathArray },
    firebaser(
      fullPath,
      ['get', 'set', 'update', 'remove', 'getChild']
    ),
    methods
  )
}
