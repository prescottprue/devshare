import { paths } from '../config'
import firebaser from '../../utils/firebaser'

export default (owner, projectname) => {
  const methods = {

  }

  return Object.assign(
    {},
    firebaser([
      paths.projects,
      owner,
      projectname,
      'collaborators'
    ],
      ['get', 'add', 'remove']
    ),
    methods
  )
}
