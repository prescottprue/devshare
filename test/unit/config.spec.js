/* global describe it expect */
import config from '../../src/config'

describe('Config', () => {
  it('exists', () => {
    expect(config).to.be.an.object
  })
  describe('tessellateRoot', () => {
    it('exists', () =>
      config.should.have.property('tessellateRoot')
    )
    it('is correct', () =>
      expect(config.tessellateRoot).to.equal('https://kyper-tessellate.herokuapp.com')
    )
  })
})
