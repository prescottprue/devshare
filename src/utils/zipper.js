import Jszip from 'jszip'
import { saveAs } from 'node-safe-filesaver'
import { each } from 'lodash'
import { zipSuffix } from '../config'
import { get } from './firebaser'
import file from '../project/file-system/file'

export const createZip = (relativePath, directory) => {
  let zip = new Jszip()
  let promiseArray = []

  let handleZip = (fbChildren) => {
    each(fbChildren, (child) => {
      if (!child.meta || child.meta.entityType === 'folder') {
        delete child.meta
        return handleZip(child)
      }
      let promise = file(relativePath, child.meta.path)
        .getContent()
        .then((content) =>
          zip.file(child.meta.path, content)
        )
      promiseArray.push(promise)
    })
  }

  handleZip(directory)

  const projectName = relativePath[relativePath.length - 1]

  return Promise.all(promiseArray)
    .then(() =>
      zip.generateAsync({ type: 'blob' })
        .then((content) =>
          saveAs(content, `${projectName}${zipSuffix}.zip`)
        )
        .catch((error) => Promise.reject(error))
    )
}

/**
 * @description Create a zip file with all of the files within a project's file system
 * Note: Firepad is used to get the file's contents for zipping
 */
export const zipFileSystem = ({ owner, name }, relativePath) =>
  get(relativePath)()
    .then((content) => createZip(relativePath, content))

export default {
  createZip,
  zipFileSystem
}
