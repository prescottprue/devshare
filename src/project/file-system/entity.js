import firebaser, { set } from '../../utils/firebaser'

export default class Entity {
  constructor (projectPath, filePath) {
    this.projectPath = projectPath
    this.path = filePath
    Object.assign(
      this,
      firebaser(
        projectPath.concat([filePath]),
        ['get', 'update', 'remove', 'getChild']
      )
    )
  }
  add () {
    return set(this.projectPath.concat([this.path]))({ meta: { name: this.path, path: this.path } })
  }

  /** Get entity meta data
  */
  getMeta () {
    return this.getChild('meta')
  }

  /** Move entity within file system
  */
  move () {
    // Create new file in new location within file system
    // this.project.fileSystem.getFirebaseRef()
    // Delete old version of file
    // this.remove()
  }

  /** Give entity a new name
  */
  rename (name) {
    // return this.update({ meta: { name } })
  }
}
