import { randomIntBetween } from '../../utils'
import { getFile as serverGet } from '../../utils/cruder'
import firebaser, { createFirebaseUrl, createFirebaseRef, get, set } from '../../utils/firebaser'
import file from './file'
import entity from './entity'
import folder from './folder'
import { each } from 'lodash'
import { Firepad } from '../../utils/firepader'
import { tessellateRoot } from '../../config'
import Jszip from 'jszip'

console.log('firepad loaded into file-system:', Firepad)
const highlightColors = [
  '#FF0000',
  '#FF00F1',
  '#F1C40F',
  '#D35400',
  '#FF08',
  '#2980B9',
  '#9B59B6'
]

export default (owner, projectname) => {
  const rootPath = ['files']
  const relativePath = rootPath.concat([owner, projectname])
  const projectUrl = `${tessellateRoot}/projects/${owner}/${projectname}`
  console.log('project url', projectUrl)

  const createZip = directory => {
    // Get zip from server if Firepad does not exist
    let zip = new Jszip()
    let promiseArray = []
    let handleZip = fbChildren => {
      each(fbChildren, child => {
        if (!child.meta || child.meta.entityType === 'folder') {
          delete child.meta
          return handleZip(child)
        }
        let promise = file(relativePath, child.meta.path)
          .getContent()
          .then(content => {
            console.log('--------------- content loaded, being added to zip')
            zip.file(child.meta.path, content)
          })
        promiseArray.push(promise)
      })
    }
    handleZip(directory)
    return Promise.all(promiseArray)
      .then(() => {
        console.log('zipping together')
        try {
          let content = zip.generate({ type: 'blob' })
          let zipFile = filesave.saveAs(content, `${projectname}-devShare-export.zip`)
          console.log('zip file created', zipFile)
        } catch (err) {
          console.error('error:', err)
          return Promise.reject(err)
        }
      })
  }

  const methods = {
    addFile: (filePath, content) =>
      file(relativePath, filePath).add(content),

    addFolder: folderPath =>
      folder(relativePath, folderPath).add(),

    clone: (newOwner, newName) =>
      get(relativePath)()
        .then(files =>
          set(rootPath.concat([newOwner, newName || projectname]))(files)
            .then(() => files)
        ),

    download: () => Firepad
      ? get(relativePath)()
        .then(content => {
          console.log('files content loaded for download:', content)
          return createZip(content)
        })
      : serverGet(`${projectUrl}/zip`)(),

    // TODO: Check other existing colors before returning
    getUserColor: () =>
      highlightColors[randomIntBetween(0, highlightColors.length - 1)]

  }

  const subModels = {
    firebaseUrl: () =>
      createFirebaseUrl(relativePath)(),
    firebaseRef: () =>
      createFirebaseRef(relativePath)(),
    entity: entityPath =>
      entity(relativePath, entityPath),
    file: filePath =>
      file(relativePath, filePath),
    folder: folderPath =>
      folder(relativePath, folderPath)
  }

  return Object.assign(
    {},
    firebaser(relativePath, ['get', 'sync']),
    methods,
    subModels
  )
}
