/* global describe it beforeEach nock */
import projects from '../../src/projects'
import config from '../../src/config'

describe('Projects', () => {
  describe('add', () => {
    let projectname = 'chamunga'
    let invalidName = 'asdf?'
    let username = 'scott'

    beforeEach(() => {

    })

    it.skip('adds a project', () =>
      projects(username)
        .add({ name: projectname })
        .should.eventually.have.property('name', projectname)
    )
    it.skip('handles no name', () =>
      projects(username)
        .add({ name: invalidName })
        .should.eventually.be.rejectedWith({ message: 'name is required' })
    )
    it.skip('handles invalid names', () =>
      projects(username)
        .add({ name: invalidName })
        .should.eventually.be.rejected
    )
  })

  describe('search', () => {
    const nameQuery = 'someProj'
    const name = 'someProject'
    const owner = { username: 'testuser' }
    beforeEach(() => {

    })

    it.skip('searches by name', () =>
      projects()
        .search(nameQuery)
        .should.eventually.have.property('name', name)
    )

    it.skip('adds a new project', () =>
      projects()
        .add({ name, owner })
        .should.eventually.have.property('name', name)
    )
  })
})
