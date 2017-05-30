import entity from './entity'

export default (relativePath, folderPath, children) => {
  return Object.assign(
    {},
    entity(relativePath, folderPath, 'folder')
  )
}
