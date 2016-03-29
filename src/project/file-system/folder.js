import Entity from './entity'

export default class File extends Entity {
  constructor (project, path, entities) {
    super(project, path)
    this.entityType = 'folder'
    this.children = entities
  }
}
