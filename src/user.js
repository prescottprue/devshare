import tessellateClient from './helpers/tessellate-client'

class User {
  constructor(config) {
    this.configStuff = config.stuff
  }



}


export default function(config) {
  return new User(config)
}
