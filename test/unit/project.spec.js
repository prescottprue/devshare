/* global describe it beforeEach nock */
import project from '../../src/project'
import config from '../../src/config'
const testProject = 'test'
const testUser = 'tester'
describe('Project', () => {
  describe('constructor', () => {
    it.skip('handles an object as a param', () =>
      project({ name: testProject, owner: { username: testUser } })
        .should.respondTo('get')
    )
  })

  describe('get', () => {
    beforeEach(() => {

    })

    it('gets the project', () =>
      project(testUser, testProject)
        .get()
        .should.eventually.have.property('name', testProject)
    )
  })

  describe('remove', () => {
    beforeEach(() => {

    })

    it.skip('deletes the project', () =>
      project(testUser, testProject)
        .remove()
        .should.eventually.have.property('name')
    )
  })

  describe('rename', () => {
    let newName = 'test1'

    beforeEach(() => {

    })

    it.skip('renames the project', () =>
      project(testUser, testProject)
        .rename(newName)
        .should.eventually.have.property('name', newName)
    )
  })

  describe('addCollaborator', () => {
    let username = 'scott'

    beforeEach(() => {

    })

    it.skip('adds a collaborator to the project', () =>
      project(testUser, testProject)
        .addCollaborator(username)
        .should.eventually.have.deep.property('collaborators[0].username', username)
    )
  })

  describe('addCollaborators', () => {
    let username = 'scott'

    beforeEach(() => {

    })

    it.skip('adds a collaborators to the project', () =>
      project(testUser, testProject)
        .addCollaborators([{ username }, { username }])
        .should.eventually.have.deep.property('collaborators[0].username', username)
    )
  })

  describe('removeCollaborator', () => {
    const username = 'scott'

    beforeEach(() => {

    })

  })
})
