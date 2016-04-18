import cruder from '../../utils/cruder'
import { tessellateRoot } from '../../config'

export default (owner, projectname) => {
  const url = `${tessellateRoot}/projects/${owner}/${projectname}/collaborators`

  const methods = {

  }

  return Object.assign(
    {},
    cruder(url, ['get', 'add', 'remove']),
    methods
  )
}
