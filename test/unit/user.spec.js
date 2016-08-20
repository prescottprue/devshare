/* global describe it beforeEach nock */
import user from '../../src/user'
import config from '../../src/config'

describe('User', () => {
  describe('get', () => {
    beforeEach(() => {

    })

    it.skip('gets the user', () =>
      user('mel')
        .get()
        .should.eventually.have.property('username')
    )
  })
  describe('remove', () => {
    beforeEach(() => {

    })

    it.skip('removes the user', () =>
      user('mel')
        .remove()
        .should.eventually.have.property('message')
    )
  })
})
