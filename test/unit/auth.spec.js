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
      nock(`${config.tessellateRoot}`)
        .put('/login', { username, password })
        .reply(200, {
          user: {
            username, email, name
          },
          token
        })
    })

    it('rejects null input', () =>
      auth
        .login()
        .should.eventually.be.rejected
    )

    it('calls endpoint', () =>
      auth
        .login(username, password)
        .should.eventually.have.deep.property('user.username', username)
    )

    it('saves the token', () =>
      auth
        .login(username, password)
        .should.be.fulfilled
        .then(() => cookie.parse(document.cookie).should.have.property('token', token))
    )

    it('saves the current user', () =>
      auth
        .login(username, password)
        .should.be.fulfilled
        .then(() => JSON.parse(window.sessionStorage.getItem('currentUser')).should.have.property('username', username))
    )

    it('accepts an object', () =>
      auth
        .login({ username, password })
        .should.eventually.have.deep.property('user.username', username)
    )

    it('rejects if no params are passed', () =>
      auth
        .login()
        .should.eventually.be.rejected
    )
  })

  describe('logout', () => {
    beforeEach(() => {
      nock(`${config.tessellateRoot}`)
        .put('/logout')
        .reply(200, {
          message: 'logout successful'
        })
    })

    it('calls endpoint', () =>
      auth
        .logout()
        .should.eventually.have.property('message', 'logout successful')
    )

    it('clears token from cookie', () =>
      auth
        .logout()
        .should.be.fulfilled
        .then(() => document.cookie.should.be.empty) // or document.cookie.should.equal('token=')
    )

    it('removes current user from session storage', () =>
      auth
        .logout()
        .should.be.fulfilled
        .then(() => expect(window.sessionStorage.getItem('currentUser')).to.be.null)
    )
  })

  describe('signup', () => {
    beforeEach(() => {
      nock(`${config.tessellateRoot}`)
        .post('/signup', { username, password, name, email })
        .reply(200, {
          user: {
            username, email, name
          },
          token
        })
    })

    it('calls endpoint', () =>
      auth
        .signup({ username, password, name, email })
        .should.eventually.have.deep.property('user.username', username)
    )

    it('saves the token', () =>
      auth
        .signup({ username, password, name, email })
        .should.be.fulfilled
        .then(() =>
          cookie.parse(document.cookie).should.have.property('token', token)
        )
    )

    it('saves the current user', () =>
      auth
        .signup({ username, password, name, email })
        .should.be.fulfilled
        .then(() =>
          JSON
            .parse(window.sessionStorage.getItem('currentUser'))
            .should.have.property('username', username)
        )
    )
  })
  describe('authWithProvider', () => {
    beforeEach(() => {
      nock(`${config.tessellateRoot}`)
        .get('/stateToken')
        .reply(200, {
          message: 'Success'
        })
    })

    it('calls endpoint', () =>
      auth
        .authWithProvider({ provider: 'google' })
        .should.be.rejected
    )
  })
  describe('getCurrentUser', () => {
    it('gets user', () => {
      const currentUser = auth.getCurrentUser()
      expect(currentUser).to.be.an('object')
    })
  })
})
