/* global describe it */
import folder from '../../src/project/file-system/file'
describe('File', () => {
  describe('constructor', () => {
    it('handles array path', () =>
      folder(['mel', 'jazztoes'], ['index.js']).should.exist
    )
    it('sets path', () =>
      folder(['mel', 'jazztoes'], ['index.js'])
        .should
        .have
        .property('path', 'index.js')
    )
  })
})
