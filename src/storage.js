import devshareClient from './helpers/tessellate-client'

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

class Store {
  constructor () {

  }

  createItem (name) {

  }

  getItem (id) {
  }

}

class Item {
  constructor () {

  }

  get () {

  }

  update (id, object) {

  }

  delete () {

  }

}

export default function (config) {
  return new Storage(config)
}
