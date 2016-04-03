/* global describe expect it */
import cruder, { search } from '../../../src/utils/cruder'

describe('cruder util', () => {
  describe('constructor', () => {
    it('exports specific types', () =>
      cruder('some/url', ['get']).should.respondTo('get')
    )
    it('throws for invalid methods', () => {
      expect(cruder.bind(cruder, 'some/url', ['asdf'])).to.throw('asdf is not a valid method of cruder')
    })
  })
  describe('search()', () => {
    it('handles no query', () =>
      search('some/url')('test').should.eventually.be.rejected
    )
  })
})
