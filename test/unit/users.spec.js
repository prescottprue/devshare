/* global describe it beforeEach nock */
import users from '../../src/users'
import config from '../../src/config'

describe('Users', () => {
  describe('search', () => {
    const usernameQuery = 'tes'
    const emailQuery = 'testuser@gmail.com'
    beforeEach(() => {
      nock(`${config.tessellateRoot}`)
        .get(`/users/search?username=${usernameQuery}`)
        .reply(200, {
          username: 'testuser'
        })
      nock(`${config.tessellateRoot}`)
        .get(`/users/search?email=${emailQuery}`)
        .reply(200, {
          email: 'testuser@gmail.com'
        })
    })

    it('searches by username', () =>
      users()
        .search(usernameQuery)
        .should.eventually.have.property('username', 'testuser')
    )

    it('searches by email', () =>
      users()
        .search(emailQuery)
        .should.eventually.have.property('email', emailQuery)
    )
  })
})
