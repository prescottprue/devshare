/* global describe it expect */
import firepader from '../../../src/utils/firepader'
let window
describe('firepader util', () => {
  describe('firepadExists()', () => {
    beforeEach(() => {
      window = {}
      window.Firepad = {}
    })
    it('returns false when no Firepad', () =>
      expect(firepader.firepadExists()).to.be.false
    )
    it('returns true when no Firepad', () => {
      window.Firepad = {}
      expect(firepader.firepadExists()).to.be.false
    })
  })
  describe('getFirepad()', () => {
    it('returns null when no window', () => {
      window = undefined
      expect(firepader.getFirepad()).to.be.null
    })
    it.skip('returns Firepad if available', () => {
      const mockFirepad = { Headless: () => 'something' }
      window = { Firepad: mockFirepad }
      expect(firepader.getFirepad()).to.equal(mockFirepad)
    })
  })
  describe('getTextFromRef()', () => {
    it('is rejected without firepad', () =>
      firepader.getTextFromRef()
        .should.eventually.be.rejectedWith({ message: 'Loading content is not yet supported without Firepad' })
    )
  })
})
