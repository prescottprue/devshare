import Entity from './entity'

class FileSystem {
  constructor (config) {
    this.configStuff = config.stuff
  }

  entity (path) {
    return new Entity(path)
  }
}

let fileSystem = null

export default function (config) {
  if (!fileSystem) fileSystem = new FileSystem(config)
  return fileSystem
}
