import { tessellateRoot } from '../../config'
import entity from './entity'
import { set, createFirebaseRef } from '../../utils/firebaser'
import { get } from '../../utils/cruder'
import { isArray } from 'lodash'

export default (projectPath, filePath) => {
  const pathArray = isArray(filePath) ? filePath : filePath.split('/')
  const path = pathArray.join('/')
  const fullPath = projectPath.concat(pathArray)
  const name = pathArray[pathArray.length - 1]
  const fullUrl = [tessellateRoot].concat([projectPath[1], projectPath[2], projectPath[0]])
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

    setContent: original =>
      set(fullPath)({ meta: { path, name }, original }),

    getContent: () =>
      createFirebaseRef(fullPath)()
        .once('value')
        .then(entitySnap => {
          if (!entitySnap || !entitySnap.val()) return Promise.reject({ message: 'Entity does not exist.' })
          // Load file from original content if no history available
          if (entitySnap.hasChild('original') && !entitySnap.hasChild('history')) {
            // File has not yet been opened in firepad
            this.content = entitySnap.child('original').val()
            return this.content
          }
          // Use endpoint to get file content (Headless Firepad)
          return get(fullUrl)({ path })
        })
  }

  return Object.assign(
    {},
    entity(projectPath, filePath, 'file'),
    methods
  )
}

function modeFromFileExtension (mode) {
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
