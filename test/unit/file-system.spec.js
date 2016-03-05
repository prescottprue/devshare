/* global describe it beforeEach */
import fileSystem from '../../src/project/file-system'

describe('File System', () => {
  beforeEach(() => {
  })

  afterEach(() => {
  })

  describe('get', () => {
    it('gets project', () =>
			fileSystem('mel', 'jazztoes')
				.get().should.eventually.have.property('src')
		)
  })
})
