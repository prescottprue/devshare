/* global describe it beforeEach */
import fileSystem from '../../src/project/file-system'
const testUser = 'tester'
const testProject = 'test'
describe('File System', () => {
  describe('get()', () => {
    beforeEach(() =>
      fileSystem(testUser, testProject)
      .addFile('src/index.html', 'some file content')
    )
    it('gets project', () =>
      fileSystem(testUser, testProject)
        .get().should.eventually.have.property('src')
    )
  })

  describe('clone', () => {
    it('exists', () =>
      fileSystem(testUser, testProject).should.respondTo('clone')
    )
    it.skip('clones one project into another', () =>
      fileSystem(testUser, testProject)
        .clone('test2', 'test').should.be.fullfilled
    )
  })

  describe('zip', () => {
    it('exists', () =>
      fileSystem(testUser, testProject).should.respondTo('zip')
    )
    it('has an alias "download"', () =>
      fileSystem(testUser, testProject).should.respondTo('download')
    )
    it.skip('downloads a zip file', () =>
      fileSystem(testUser, testProject)
        .zip().should.be.fullfilled
    )
  })

  describe('getUserColor', () => {
    it('exists', () =>
      fileSystem(testUser, testProject).should.respondTo('getUserColor')
    )
    it('returns a valid hex value', () =>
      fileSystem(testUser, testProject)
        .getUserColor().should.be.a.string
    )
  })
})
