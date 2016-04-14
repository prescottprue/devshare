import entity from './entity'
import { set, createFirebaseRef } from '../../utils/firebaser'
import { isArray } from 'lodash'
import { getTextFromRef } from '../../utils/firepader'

export default (projectPath, filePath) => {
  const pathArray = isArray(filePath) ? filePath : filePath.split('/')
  const path = pathArray.join('/')
  const fullPath = projectPath.concat(pathArray)
  const name = pathArray[pathArray.length - 1]

  const methods = {
    /**
     * @description File's extension
     * @return {String}
     */
    get ext () {
      let re = /(?:\.([^.]+))?$/
      return re.exec(name)[1]
    },

    /**
     * @description File's syntaxMode for CodeMirror
     * @return {String}
     */
    get syntaxMode () {
      return modeFromFileExtension(this.ext)
    },

    /**
     * @description Set string content of file
     * @return {String}
     */
    //  TODO: Set content using firepad if available, or fall back to server endpoint
    setContent: original =>
      set(fullPath)({ meta: { path, name }, original }),

    /**
     * @description Get string content of file
     * @return {String}
     */
    getContent: () =>
      createFirebaseRef(fullPath)()
        .once('value')
        .then(snap => {
          if (!snap || !snap.val()) return Promise.reject({ message: 'Entity does not exist.' })
          // Load file from original content if no firepad history available
          if (snap.hasChild('original') && !snap.hasChild('history')) {
            this.content = snap.child('original').val() /* istanbul ignore next */
            return this.content
          }
          return getTextFromRef(snap.ref())
        })
  }

  return Object.assign(
    {},
    entity(projectPath, filePath, 'file'),
    methods
  )
}

/**
 * @description Get a file's CodeMirror syntax mode based on its file extension
 * @return {String}
 */
/* istanbul ignore next */
export function modeFromFileExtension (mode) {
  switch (mode) {
    case 'js':
    case 'json':
    case 'ts':
      return 'javascript'
    case 'html':
      return 'htmlmixed'
    case 'scss':
      return 'text/x-scss'
    case 'less':
      return 'text/x-less'
    case 'ejs':
      return 'application/x-ejs'
    case 'md':
      return 'markdown'
    case 'yml':
      return 'yaml'
    case 'java':
      return 'text/x-java'
    case 'scala':
      return 'text/x-scala'
    case 'c':
    case 'h':
      return 'text/x-csrc'
    case 'cc':
      return 'text/x-c++src'
    case 'm':
      return 'text/x-objectivec'
    case 'py':
      return { name: 'python', version: 3, singleLineStringErrors: false }
    case 'sh':
      return 'shell'
    default:
      return mode
  }
}
