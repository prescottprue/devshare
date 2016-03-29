// import Entity from './entity'
import firebaser from '../../utils/firebaser'

export default (owner, projectname) => {
  const relativePath = ['files', owner, projectname]

  const methods = {
    // rename: newProjectname =>
    //   update(url)({ name: newProjectname }),
  }

  return Object.assign(
    {},
    firebaser(relativePath, ['get', 'set', 'sync', 'createFirebaseUrl']),
    methods
  )
}
