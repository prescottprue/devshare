/* global describe expect it */
import * as utils from '../../../src/utils'
import { typeReducer } from '../../../src/utils'

describe('utils', () => {
  describe('constructor', () => {
    it('exports cruder', () =>
      utils.should.have.property('cruder')
    )
  })
  describe('typeReducer()', () => {
    it('throws for invalid types', () =>
      expect(typeReducer.bind(typeReducer, 'testurl/', ['asdf'], { get: () => '' }, 'tester'))
        .to.throw('asdf is not a valid method of tester')
    )
    it('methods are accessible', () => {
      const methods = {
        get: () => () => 'asdf'
      }
      const reducer = typeReducer('testurl/', ['get'], methods, 'tester')
      expect(reducer)
        .to.respondTo('get')
    })
  })
})
