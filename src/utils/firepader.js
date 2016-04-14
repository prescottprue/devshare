
// import Firepad from 'firepad'

var Firepad = (window && window.Firepad) ? window.Firepad : null
// Handle server side requiring of firepad (depends on firepad being in webpack's noParse)
// Firepad = !window ? require('firepad') : Firepad

export const getTextFromRef = ref => {
  // TODO: Load content from getContent endpoint
  if (!Firepad) {
    console.error('Loading content is not supported without Firepad')
    return Promise.reject({ message: 'Loading content is not supported without Firepad' })
  }
  return new Promise(resolve =>
    Firepad
      .Headless(ref)
      .getText(text => {
        console.log('text loaded', text)
        resolve(text)
      })
  )
}

export default {
  getTextFromRef
}
