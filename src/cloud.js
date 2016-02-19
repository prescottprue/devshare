// import tessellateClient from './helpers/tessellate-client'

class Cloud {
  constructor (config) {
    this.configStuff = config.stuff
  }

  createWorker (name) {

  }

}

export default function (config) {
  return new Cloud(config)
}
