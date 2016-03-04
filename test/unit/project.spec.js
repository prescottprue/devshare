/* global describe it beforeEach nock */
import { project } from '../../src'
import config from '../../config.json'

describe('Project', () => {
  describe('get', () => {
    beforeEach(() => {
      nock(`${config.root}`)
        .get('/projects/mel/goobaly')
        .reply(200, {
          name: 'goobaly'
        })
    })

    it('get the project', () =>
      project('mel', 'goobaly')
        .get()
        .should.eventually.have.property('name', 'goobaly')
    )
  })

  describe('remove', () => {
    beforeEach(() => {
      nock(`${config.root}`)
        .delete('/projects/mel/goobaly')
        .reply(200, {
          name: 'goobaly'
        })
    })

    it('delete the project', () =>
      project('mel', 'goobaly')
        .remove()
        .should.eventually.have.property('name')
    )
  })

  describe('rename', () => {
    let oldProjectname = 'test1'
    let projectname = 'jazztoes'

    beforeEach(() => {
      nock(`${config.root}`)
        .put(`/projects/mel/${oldProjectname}`, {
          name: projectname
        })
        .reply(200, {
          name: projectname
        })
    })

    it('rename the project', () =>
      project('mel', oldProjectname)
        .rename(projectname)
        .should.eventually.have.property('name', projectname)
    )
  })

  describe('addCollaborator', () => {
    let projectname = 'jazztoes'
    let username = 'scott'

    beforeEach(() => {
      nock(`${config.root}`)
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

    it('add a collaborator to the project', () =>
      project('mel', projectname)
        .addCollaborator(username)
        .should.eventually.have.deep.property('collaborators[0].username', username)
    )
  })

  describe('removeCollaborator', () => {
    let projectname = 'jazztoes'
    let username = 'scott'

    beforeEach(() => {
      nock(`${config.root}`)
        .delete(`/projects/mel/${projectname}/collaborators/${username}`)
        .reply(200, {
          message: 'collaborator successfully deleted'
        })
    })

    it('remove a collaborator from the project', () =>
      project('mel', projectname)
        .removeCollaborator(username)
        .should.eventually.have.property('message', 'collaborator successfully deleted')
    )
  })
})
