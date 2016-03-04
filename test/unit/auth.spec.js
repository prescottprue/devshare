/* global describe it beforeEach nock sinon */
import * as auth from '../../src/auth'
import cookie from 'cookie'
import config from '../../config.json'

describe('Auth', () => {
  const username = 'crazyDude'
  const password = 'twinkletoes'
  const email = 'cdude@twinkler.com'
  const name = 'David Smiggles'
  const token = '2k2kj9d92jd9uby3'

  describe('login', () => {
    beforeEach(() => {
      nock(`${config.root}`)
        .put(`/login`, { username, password })
        .reply(200, {
          user: {
            username, email, name
          },
          token
        })
    })

    it('successfully call server endpoint', () =>
      auth
        .login(username, password)
        .should.eventually.have.deep.property('user.username', username)
    )

    it('saves the token', () =>
      auth
        .login(username, password)
        .should.be.fulfilled
        .then(_ => {
          return cookie.parse(document.cookie).should.have.property('token', token)
        })
    )

    it('saves the current user', () =>
      auth
        .login(username, password)
        .should.be.fulfilled
        .then(_ => {
          return JSON.parse(window.sessionStorage.getItem('currentUser')).should.have.property('username', username)
        })
    )
  })
})
