import Entity from './entity'

export default class File extends Entity {
  constructor (path) {
    super(path)
    this.entityType = 'file'
  }

  /**
   * @description File's extension
   * @return {String}
   */
  get ext () {
    let re = /(?:\.([^.]+))?$/
    return re.exec(this.name)[1]
  }

  /**
   * @description File's syntaxMode for CodeMirror
   * @return {String}
   */
  get syntaxMode () {
    return modeFromFileExtension(this.ext)
  }

  /**
   * @description Get a file's content from default location (Firebase)
   */
  getOriginalContent () {
    return this.get().then(fileSnap => {
      if (!fileSnap.val()) return Promise.reject({message: 'File data does not exist.'})
      // Load file from firepad original content if no history available
      if (fileSnap.hasChild('original') && !fileSnap.hasChild('history')) {
        // File has not yet been opened in firepad
        this.content = fileSnap.child('original').val()
        return this.content
      }
      return Promise.reject({ message: 'no orignal content or has existing history' })
    })
  }
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
