/* global describe it expect */
import file, { modeFromFileExtension } from '../../src/project/file-system/file'
const testUser = 'tester'
const testProject = 'test'
describe('File', () => {
  describe('constructor', () => {
    it('handles string path', () =>
      file([testUser, testProject], 'index.js')
        .getContent().should.exist
    )
    it('handles array path', () =>
      file([testUser, testProject], ['index.js'])
        .getContent().should.exist
    )
  })
  describe('getContent()', () => {
    it('reject for non existant file', () =>
      file([testUser, testProject], 'index.js')
        .getContent().should.eventually.be.rejected
    )
    it('loads content from upload', () =>
      file(['tester', 'test'], 'index.js')
        .getContent().should.eventually.be.fullfilled
    )
  })
  describe('setContent()', () => {
    it('handles js', () =>
      file([testUser, testProject], 'index.js')
        .setContent('asdfasdf').should.eventually.be.fullfilled
    )
  })
  describe('syntaxMode()', () => {
    it('handles js', () =>
      expect(
        file([testUser, testProject], 'index.js')
          .syntaxMode
      ).to.equal('javascript')
    )
    it('handles html', () =>
      expect(
        file([testUser, testProject], 'index.html')
          .syntaxMode
      ).to.equal('htmlmixed')
    )
  })
  describe('modeFromFileExtension', () => {
    it('handles js', () =>
      expect(modeFromFileExtension('js')).to.equal('javascript')
    )
    it('handles html', () =>
      expect(modeFromFileExtension('html')).to.equal('htmlmixed')
    )
  })
})
