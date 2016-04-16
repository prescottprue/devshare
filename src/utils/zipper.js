import Jszip from 'jszip'
import filesave from 'node-safe-filesaver'
import { each } from 'lodash'

import { firepadExists } from './firepader'
import { get } from './firebaser'
import { getFile as serverGet } from './cruder'
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
          filesave.saveAs(content, `${projectName}-devShare-export.zip`))
        .catch((error) => Promise.reject(error))
    )
}

/*
 * Create a zip file with all of the files within a project's file system
 * Note: Firepad is used to get the file's contents for zipping however,
 * if Firepad is not available, the ZIP file will be requested from the server
 */

export const zipFileSystem = (projectUrl, relativePath) =>
  firepadExists()
    ? get(relativePath)().then((content) => createZip(relativePath, content))
    : serverGet(`${projectUrl}/zip`)()

export default {
  createZip,
  zipFileSystem
}
