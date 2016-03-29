// import Entity from './entity'
import firebaser from '../../utils/firebaser'
import Entity from './entity'

export default (owner, projectname) => {
  const relativePath = ['files', owner, projectname]

  const methods = {
    // rename: newProjectname =>
    //   update(url)({ name: newProjectname }),
  }

  const subModels = {
    file: filePath => new Entity(relativePath, filePath)
  }

  return Object.assign(
    {},
    firebaser(relativePath, ['get', 'sync', 'createFirebaseUrl', 'createFirebaseRef']),
    methods,
    subModels
  )
}
