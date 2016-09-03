/* global describe it beforeEach afterEach */
import fileSystem from '../../src/project/file-system'
const testUser = 'tester'
const testProject = 'test'
// NOTE:  Read/Write to Firebase tests skipped due to Error: PERMISSION_DENIED: Permission denied
describe('File System', () => {
  describe.skip('get()', () => {
    beforeEach(() =>
      fileSystem(testUser, testProject)
      .addFile('src/index.html', 'some file content')
    )
    afterEach(() =>
      fileSystem(testUser, testProject).file('src/index.html').remove()
    )
    it('gets project', () =>
      fileSystem(testUser, testProject)
        .get().should.eventually.have.property('src')
    )
  })
  describe.skip('addFile()', () => {
    it('exists', () =>
      fileSystem(testUser, testProject).should.respondTo('addFile')
    )
    it.skip('adds a file', () =>
      fileSystem(testUser, testProject)
        .addFile('src/index.html').should.eventually.have.property('meta')
    )
    it.skip('adds a file with content', () =>
      fileSystem(testUser, testProject)
        .addFile('src/index.html', 'some content')
        .should.eventually.have.property('meta')
    )
  })
  describe.skip('addFolder()', () => {
    it('exists', () =>
      fileSystem(testUser, testProject).should.respondTo('addFolder')
    )
    it('adds a folder', () =>
      fileSystem(testUser, testProject)
        .addFolder('something').should.eventually.have.property('meta')
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

  describe('sub-models', () => {
    it('entity', () =>
      fileSystem(testUser, testProject).should.respondTo('entity')
    )
    it('file', () =>
      fileSystem(testUser, testProject).should.respondTo('file')
    )
    it('folder', () =>
      fileSystem(testUser, testProject).should.respondTo('folder')
    )
  })
})
