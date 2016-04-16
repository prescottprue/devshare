import { isBrowser } from './env'

export const firepadExists = () => !!(isBrowser() && window.Firepad)

export const getFirepad = () => {
  if (firepadExists()) return window.Firepad
  // require firepad in node environment (depends on firepad being in webpack's noParse)
  if (!isBrowser()) return require('firepad')
  return null
}

export const getTextFromRef = (ref) => {
  // TODO: Load content from getContent endpoint
  if (!firepadExists()) {
    console.error('Loading content is not yet supported without Firepad')
    return Promise.reject({ message: 'Loading content is not yet supported without Firepad' })
  }
  const Firepad = getFirepad()
  return new Promise((resolve) =>
    Firepad
      .Headless(ref)
      .getText((text) => resolve(text))
  )
}

export default {
  firepadExists,
  getFirepad,
  getTextFromRef
}
