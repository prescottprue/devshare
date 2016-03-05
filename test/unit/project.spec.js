/* global describe it beforeEach nock */
import project from '../../src/project'
import config from '../../src/config'

describe('Project', () => {
  describe('get', () => {
    beforeEach(() => {
      nock(`${config.tessellateRoot}`)
        .get('/projects/mel/goobaly')
        .reply(200, {
          name: 'goobaly'
        })
    })

    it('gets the project', () =>
      project('mel', 'goobaly')
        .get()
        .should.eventually.have.property('name', 'goobaly')
    )
  })

  describe('remove', () => {
    beforeEach(() => {
      nock(`${config.tessellateRoot}`)
        .delete('/projects/mel/goobaly')
        .reply(200, {
          name: 'goobaly'
        })
    })

    it('deletes the project', () =>
      project('mel', 'goobaly')
        .remove()
        .should.eventually.have.property('name')
    )
  })

  describe('rename', () => {
    let oldProjectname = 'test1'
    let projectname = 'jazztoes'

    beforeEach(() => {
      nock(`${config.tessellateRoot}`)
        .put(`/projects/mel/${oldProjectname}`, {
          name: projectname
        })
        .reply(200, {
          name: projectname
        })
    })

    it('renames the project', () =>
      project('mel', oldProjectname)
        .rename(projectname)
        .should.eventually.have.property('name', projectname)
    )
  })

  describe('addCollaborator', () => {
    let projectname = 'jazztoes'
    let username = 'scott'

    beforeEach(() => {
      nock(`${config.tessellateRoot}`)
        .put(`/projects/mel/${projectname}/collaborators/${username}`)
        .reply(200, {
          collaborators: [
            {
              username: username,
              name: 'Scott Prue'
            }
          ],
          name: projectname
        })
    })

    it('adds a collaborator to the project', () =>
      project('mel', projectname)
        .addCollaborator(username)
        .should.eventually.have.deep.property('collaborators[0].username', username)
    )
  })

  describe('addCollaborators', () => {
    let projectname = 'jazztoes'
    let username = 'scott'

    beforeEach(() => {
      nock(`${config.tessellateRoot}`)
        .put(`/projects/mel/${projectname}/collaborators`)
        .reply(200, {
          collaborators: [
            { username },
            { username }
          ],
          name: projectname
        })
    })

    it('adds a collaborators to the project', () =>
      project('mel', projectname)
        .addCollaborators([{ username }, { username }])
        .should.eventually.have.deep.property('collaborators[0].username', username)
    )
  })

  describe('removeCollaborator', () => {
    let projectname = 'jazztoes'
    let username = 'scott'

    beforeEach(() => {
      nock(`${config.tessellateRoot}`)
        .delete(`/projects/mel/${projectname}/collaborators/${username}`)
        .reply(200, {
          message: 'collaborator successfully deleted'
        })
    })

    it('removes a collaborator from the project', () =>
      project('mel', projectname)
        .removeCollaborator(username)
        .should.eventually.have.property('message', 'collaborator successfully deleted')
    )
  })
})
