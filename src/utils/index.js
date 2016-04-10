import _cruder from './cruder'
import _firebaser from './firebaser'
import _env from './env'

export const cruder = _cruder
export const firebaser = _firebaser
export const env = _env

export const typeReducer = (url, types, methods, name) =>
  types
    .reduce((returnedMethods, type) => {
      let method = {}
      if (typeof methods[type] === 'undefined') {
        throw Error(`${type} is not a valid ${name ? 'method of ' + name : 'method'}`)
      }
      method[type] = methods[type].call(this, url)
      return Object.assign({}, returnedMethods, method)
    }, {})
/*
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
export const randomIntBetween = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min

export default Object.assign(
  {},
  { cruder, firebaser, env, typeReducer }
)
