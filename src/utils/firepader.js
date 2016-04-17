export const isBrowser = () => typeof window !== 'undefined' && typeof document !== 'undefined'

/*
 * Check to see if Firepad exists
 */
export const firepadExists = () => !!(isBrowser() && window.Firepad)

/*
 * Get Firepad instance if it exists (if not, returns null)
 */
export const getFirepad = () => {
  if (firepadExists()) return window.Firepad
  // require firepad in node environment (depends on firepad being in webpack's noParse)
  // if (!isBrowser() && typeof require !== 'undefined') return require('firepad') // require is undefined error when used with React/Webpack
  return null
}

/*
 * Get file contents of a Firebase ref using Firebase.Headless
 */
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
