/* global describe it beforeEach nock */
import projects from '../../src/projects'
import config from '../../src/config'

describe('Projects', () => {
  describe('add', () => {
    let projectname = 'chamunga'
    let username = 'scott'

    beforeEach(() => {
      nock(`${config.tessellateRoot}`)
        .post(`/projects/${username}`, {
          name: projectname
        })
        .reply(200, {
          name: projectname
        })
    })

    it('adds a project', () =>
      projects(username)
        .add({ name: projectname })
        .should.eventually.have.property('name', projectname)
    )
  })

  describe('search', () => {
    const nameQuery = 'someProj'
    const name = 'someProject'
    const owner = { username: 'testuser' }
    beforeEach(() => {
      nock(`${config.tessellateRoot}`)
        .get(`/projects/search?name=${nameQuery}`)
        .reply(200, { name, owner })
      nock(`${config.tessellateRoot}`)
        .post(`/projects`, { name })
        .reply(200, { name, owner })
    })

    it('searches by name', () =>
      projects()
        .search(nameQuery)
        .should.eventually.have.property('name', name)
    )

    it('adds a new project', () =>
      projects()
        .add({ name, owner })
        .should.eventually.have.property('name', name)
    )
  })
})
