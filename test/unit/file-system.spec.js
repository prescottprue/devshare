/* global describe it beforeEach afterEach */
import fileSystem from '../../src/project/file-system'

describe('File System', () => {
  beforeEach(() => {

  })

  afterEach(() => {

  })

  describe('get()', () => {
    it('gets project', () =>
      fileSystem('mel', 'jazztoes')
        .get().should.eventually.have.property('src')
    )
  })
  describe('file()', () => {
    describe('get()', () => {
      it('gets file', () =>
        fileSystem('mel', 'jazztoes')
          .file('src/main.js')
          .get().should.eventually.be.an('object')
      )
    })
    describe('add()', () => {
      it('adds file', () =>
        fileSystem('mel', 'jazztoes')
          .file('index.html')
          .add().should.be.fulfilled
      )
    })
    describe('getMeta()', () => {
      it('gets file meta', () =>
        fileSystem('mel', 'jazztoes')
          .file('src/main.js')
          .getMeta().should.eventually.be.an('object')
      )
    })
    describe.skip('rename', () => {
      it('renames file', () =>
        fileSystem('mel', 'jazztoes')
          .file('index.html')
          .rename('index2.html').should.eventually.be.an('object')
      )
    })
    describe.skip('move', () => {
      it('moves file', () =>
        fileSystem('mel', 'jazztoes')
          .file('index.html')
          .move('src').should.eventually.be.an('object')
      )
    })
    describe('remove', () => {
      it('removes file', () =>
        fileSystem('mel', 'jazztoes')
          .file('index.html')
          .remove().should.eventually.be.null
      )
    })
  })
})
