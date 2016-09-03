/* global describe it beforeEach */
import zipper from '../../../src/utils/zipper'
import { tessellateRoot, filesRoot } from '../../../src/config'
const testUser = 'tester'
const testProject = 'test'
const relativePath = [filesRoot, testUser, testProject]
const projectUrl = `${tessellateRoot}/projects/${testUser}/${testProject}`

let directory

describe('zipper util', () => {
  describe('zipFileSystem()', () => {
    it('exists', () =>
      zipper.should.respondTo('zipFileSystem')
    )
    // TypeError: (0 , _auth.createHeaders) is not a function
    it.skip('creates a zip file in Browser env', () =>
      zipper.zipFileSystem(relativePath, projectUrl).should.eventually.resolve
    )
    it.skip('creates a zip file in Node env', () =>
      zipper.zipFileSystem(relativePath, projectUrl).should.eventually.resolve
    )
  })
  describe('createZip()', () => {
    beforeEach(() => {
      directory = {
        'index:html': {
          meta: {
            entityType: 'file',
            fileType: 'html',
            name: 'index.html',
            path: 'index.html'
          }
        }
      }
    })
    it('exists', () =>
      zipper.should.respondTo('createZip')
    )
    it('handles folder entities', () => {
      directory['index:html'].meta.entityType = 'folder'
      return zipper.createZip(relativePath, directory).should.eventually.resolve
    })
    it('creates a zip file from directory', () =>
      zipper.createZip(relativePath, directory).should.eventually.resolve
    )
  })
})
