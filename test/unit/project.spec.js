import { project } from '../../src'

describe('User', () => {
	beforeEach(() => {

	})
	afterEach(() => {

	})

	describe('get', () => {
		it('should get the project', () =>
			project('mel', 'test1')
				.get()
				.should.eventually.have.property('name')
		)
	})
})
