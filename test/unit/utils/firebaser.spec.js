/* global describe expect it */
import firebaser, { search } from '../../../src/utils/firebaser'

describe('firebaser util', () => {
  describe('constructor', () => {
    it('exports specific types', () =>
      firebaser('some/url', ['get']).should.respondTo('get')
    )
    it('throws for invalid methods', () => {
      expect(firebaser.bind(firebaser, 'some/url', ['asdf'])).to.throw('asdf is not a valid method of firebaser')
    })
  })
  // describe('get()', () => {
  //   it('handles no query', () =>
  //     get('some/url')('test').should.eventually.be.rejected
  //   )
  // })
})
