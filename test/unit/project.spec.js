/* global describe it beforeEach nock */
import project from '../../src/project'
import config from '../../src/config'
const testProject = 'test'
const testUser = 'tester'
describe('Project', () => {
  describe('constructor', () => {
    it('handles an object as a param', () =>
      project({ name: testProject, owner: { username: testUser } })
        .should.respondTo('get')
    )
  })

  describe('get', () => {
    beforeEach(() => {
      nock(`${config.tessellateRoot}`)
        .get(`/projects/${testUser}/${testProject}`)
        .reply(200, {
          name: testProject
        })
    })

    it('gets the project', () =>
      project(testUser, testProject)
        .get()
        .should.eventually.have.property('name', testProject)
    )
  })

  describe('remove', () => {
    beforeEach(() => {
      nock(`${config.tessellateRoot}`)
        .delete(`/projects/${testUser}/${testProject}`)
        .reply(200, {
          name: testProject
        })
    })

    it('deletes the project', () =>
      project(testUser, testProject)
        .remove()
        .should.eventually.have.property('name')
    )
  })

  describe('rename', () => {
    let newName = 'test1'

    beforeEach(() => {
      nock(`${config.tessellateRoot}`)
        .put(`/projects/${testUser}/${testProject}`, {
          name: newName
        })
        .reply(200, {
          name: newName
        })
    })

    it('renames the project', () =>
      project(testUser, testProject)
        .rename(newName)
        .should.eventually.have.property('name', newName)
    )
  })

  describe('addCollaborator', () => {
    let username = 'scott'

    beforeEach(() => {
      nock(`${config.tessellateRoot}`)
        .put(`/projects/${testUser}/${testProject}/collaborators/${username}`)
        .reply(200, {
          collaborators: [
            {
              username,
              name: 'Scott Prue'
            }
          ],
          name: testProject
        })
    })

    it('adds a collaborator to the project', () =>
      project(testUser, testProject)
        .addCollaborator(username)
        .should.eventually.have.deep.property('collaborators[0].username', username)
    )
  })

  describe('addCollaborators', () => {
    let username = 'scott'

    beforeEach(() => {
      nock(`${config.tessellateRoot}`)
        .put(`/projects/${testUser}/${testProject}/collaborators`)
        .reply(200, {
          collaborators: [
            { username },
            { username }
          ],
          name: testProject
        })
    })

    it('adds a collaborators to the project', () =>
      project(testUser, testProject)
        .addCollaborators([{ username }, { username }])
        .should.eventually.have.deep.property('collaborators[0].username', username)
    )
  })

  describe('removeCollaborator', () => {
    const username = 'scott'

    beforeEach(() => {
      nock(`${config.tessellateRoot}`)
        .delete(`/projects/${testUser}/${testProject}/collaborators/${username}`)
        .reply(200, {
          message: 'collaborator successfully deleted'
        })
    })

    it('removes a collaborator from the project', () =>
      project(testUser, testProject)
        .removeCollaborator(username)
        .should.eventually.have.property('message', 'collaborator successfully deleted')
    )
  })
})
