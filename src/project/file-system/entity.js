import firebaser from '../../utils/firebaser'

export default class Entity {
  constructor (projectPath, filePath) {
    this.path = filePath
    Object.assign(
      this,
      firebaser(
        projectPath.concat([filePath]),
        ['get', 'update', 'remove']
      )
    )
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
    this.remove()
  }

  /** Give entity a new name
  */
  rename (name) {
    return this.update({ meta: { name } })
  }
}
