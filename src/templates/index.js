import { set, get, search } from '../utils/firebaser'
import { paths } from '../config'
import { getCurrentUser } from '../auth'
import template from '../template'

export default () => {
  const methods = {
    search: (query) => search(paths.templates)('name', query),

    add: (newTemplate) => {
      if (!newTemplate.name) return Promise.reject('Name is required.')

      if (newTemplate.name.match(/[/\s]/g)) {
        return Promise.reject('Name may not contain spaces.')
      }

      if (newTemplate.name.match(/[.$#[\]/]/g)) {
        return Promise.reject(
          'Name may contain letters and symbols except for ., $, #, [, ], /.'
        )
      }
      // Confirm that template with matching name d
      return get([ paths.templates, newTemplate.name ])()
        .then(loadedProject =>
          (loadedProject)
            ? Promise.reject(`Error adding template: A template named ${newTemplate.name} already exists.`)
            : set([
              paths.templates,
              newTemplate.name
            ])({
              ...newTemplate,
              owner: getCurrentUser().uid
            })
            .then((templateData) =>
              ({ templateData, ...template(newTemplate.name) })
            )
        )
    }
  }

  return Object.assign(
    {},
    methods
  )
}
