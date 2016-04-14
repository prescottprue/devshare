import firebaser, {
  set, get,
  remove, update,
  createFirebaseUrl,
  createFirebaseRef
  } from '../../utils/firebaser'
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

    add: original =>
      original
      ? set(fullPath)({ meta: { name, path, entityType, original } })
      : set(fullPath)({ meta: { name, path, entityType } }),

    getMeta: () =>
      get(fullPath)()
        .then(entity =>
          entity.meta
        ),

    move: newPath =>
      get(fullPath)()
        .then(originalEntity =>
          set(pathArray.concat(newPath))(originalEntity)
        )
        .then(remove(fullPath)()),

    // TODO: Set in new location instead of just changing name
    rename: newName =>
      update(fullPath)({ name: newName })
  }

  return Object.assign(
    {},
    { entityType, name, path, pathArray },
    firebaser(
      fullPath,
      ['get', 'update', 'remove', 'getChild']
    ),
    methods
  )
}
