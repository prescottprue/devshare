import { project } from '../../src'
import config from '../../config.json'

describe('Project', () => {
	afterEach(() => {

	})

  describe('get', () => {
  	beforeEach(() => {
      nock(`${config.root}`)
        .get('/users/mel/projects/goobaly')
        .reply(200, {
          name: 'goobaly'
        })
  	})

		it('should get the project', () =>
			project('mel', 'goobaly')
				.get()
				.should.eventually.have.property('name')
		)
	})

	describe('rename', () => {
    let oldProjectname = 'test1'
    let projectname = 'jazztoes'

  	beforeEach(() => {
      nock(`${config.root}`)
        .put(`/users/mel/projects/${oldProjectname}`, {
          name: projectname
        })
        .reply(200, {
          name: projectname
        })
  	})

		it('should rename the project', () =>
			project('mel', oldProjectname)
				.rename(projectname)
        // TODO: want to check that response object has the new name
				.should.eventually.have.property('name')
		)
	})
})
