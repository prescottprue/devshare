/* global describe it beforeEach nock */
import user from '../../src/user'
import config from '../../src/config'

describe('User', () => {
  describe('get', () => {
    beforeEach(() => {
      nock(`${config.tessellateRoot}`)
        .get(`/users/mel`)
        .reply(200, {
          username: 'mel'
        })
    })

    it('gets the user', () =>
      user('mel')
        .get()
        .should.eventually.have.property('username')
    )
  })
  describe('remove', () => {
    beforeEach(() => {
      nock(`${config.tessellateRoot}`)
        .delete(`/users/mel`)
        .reply(200, {
          message: 'Successfully removed project'
        })
    })

    it('removes the user', () =>
      user('mel')
        .remove()
        .should.eventually.have.property('message')
    )
  })
})
