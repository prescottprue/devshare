// import devshareClient from './helpers/tessellate-client'

class Storage {
  constructor (config) {
    this.configStuff = config.stuff
  }

  createStore (name) {
    return devshareClient.createStore()
  }

  store (name) {
    return new Store()
  }

}

let storage = null

export default function (config) {
  if (!storage) storage = new Storage(config)
  return storage
}
