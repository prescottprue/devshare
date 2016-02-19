import tessellateClient from './helpers/tessellate-client'

class FileSystem {
  constructor(config) {
    this.configStuff = config.stuff
  }

  

}


export default function(config) {
  return new FileSystem(config)
}
