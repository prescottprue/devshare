import { randomIntBetween } from '../../utils'
import firebaser, { createFirebaseUrl, createFirebaseRef, get, set } from '../../utils/firebaser'
import file from './file'
import entity from './entity'
import folder from './folder'
import { each } from 'lodash'

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

  const createZip = directory => {
    let zip = new Jszip()
    console.log('create zip called', directory)
    let promiseArray = []
    let handleZip = fbChildren => {
      each(fbChildren, child => {
        if (!child.meta || child.meta.entityType === 'folder') {
          delete child.meta
          return handleZip(child)
        }
        let promise = file(relativePath, child.meta.path)
          .getContent()
          .then(content => zip.file(child.meta.path, content))
        promiseArray.push(promise)
      })
    }
    handleZip(directory)
    return Promise.all(promiseArray)
      .then(() => zip.generate({ type: 'blob' }))
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

    download: () =>
      get(relativePath)()
        .then(content => {
          console.log('files content loaded for download:', content)
          return createZip(content)
        })
        .then(content =>
          filesave.saveAs(content, `${projectname}-devShare-export.zip`)
        ),

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
