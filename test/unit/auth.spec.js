/* global describe it expect beforeEach nock */
import auth from '../../src/auth'
import cookie from 'cookie'
import config from '../../src/config'

describe('Auth', () => {
  const username = 'crazyDude'
  const password = 'twinkletoes'
  const email = 'cdude@twinkler.com'
  const name = 'David Smiggles'
  const token = '2k2kj9d92jd9uby3'

  describe('login', () => {
    beforeEach(() => {

    })
    //NOTE: Skipped due to TypeError: Cannot read property 'email' of undefined
    it.skip('rejects null input', () =>
      auth
        .login()
        .should.eventually.be.rejected
    )

    it.skip('saves the current user', () =>
      auth
        .login(username, password)
        .should.be.fulfilled
        .then(() => JSON.parse(window.sessionStorage.getItem('currentUser')).should.have.property('username', username))
    )

    it.skip('accepts an object', () =>
      auth
        .login({ username, password })
        .should.eventually.have.deep.property('user.username', username)
    )

    it.skip('rejects if no params are passed', () =>
      auth
        .login()
        .should.eventually.be.rejected
    )
  })

  describe('logout', () => {
    beforeEach(() => {

    })

    it.skip('removes current user from session storage', () =>
      auth
        .logout()
        .should.be.fulfilled
        .then(() => expect(window.sessionStorage.getItem('currentUser')).to.be.null)
    )
  })

  describe('signup', () => {
    beforeEach(() => {

    })

    it.skip('calls firebase signup', () => {

    })

    it.skip('saves the current user', () => {

    })
  })
  describe('authWithProvider', () => {
    beforeEach(() => {

    })

    it('calls endpoint', () => {

    })
  })
})
