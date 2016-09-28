import Jszip from 'jszip'
import { saveAs } from 'node-safe-filesaver'
import { each } from 'lodash'
import { zipSuffix, paths } from '../config'
import { firepadExists } from './firepader'
import { get, push, sync, unsync, storage } from './firebaser'
import { getFile as restGet } from './cruder'
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
 * Note: Firepad is used to get the file's contents for zipping however,
 * if Firepad is not available, the ZIP file will be requested from the server
 */

export const zipFileSystem = ({ owner, name }, relativePath) => {
  let key
  let listenerRef
  return firepadExists()
    ? get(relativePath)().then((content) => createZip(relativePath, content))
    : push(paths.requests)({ owner, name, isCompleted: false })
        .then(request => {
          console.log('request', request)
          key = request.key
          sync([paths.requests, request.key])((val) => {
            console.log('val from sync:', val)
            listenerRef = val.ref
            if (val.isCompleted && val.zip) {
              storage()
                  .child(val.zip.path)
                  .getDownloadURL()
                  .then((url) => {
                    console.log('response from getDownloadURL', url)
                    return restGet(url)()
                  })
                  // Save blob to browser
                  // .then((blob) =>
                  //   saveAs(blob, `${relativePath[relativePath.length - 1]}${zipSuffix}.zip`)
                  // )
                  .catch((err) => {
                    console.log('catch;', err)
                    val.ref.off('value')
                    unsync([paths.requests, request.key])(() => {
                      console.log('after unsync')
                    })
                    return Promise.reject(err.code.split('/')[1])
                  })
            }
          })
        })
      // Disable listener after successful download
      .then(() => {
        console.log('last then', key)
        listenerRef.off('value')
        return Promise.resolve([ paths.requests, key ])
      })
      .catch((err) => {
        listenerRef.off('value')
        return Promise.reject(err)
      })
}

export default {
  createZip,
  zipFileSystem
}
