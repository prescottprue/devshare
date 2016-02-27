import { user } from '../../src'

describe('User', () => {
	beforeEach(() => {

	})
	afterEach(() => {

	})

	describe('get', () => {
		it('should get the user', () =>
			user('mel')
				.get()
				.should.eventually.have.property('username')
		)
	})

	describe('createProject', () => {
		it('should create a new user', () =>
			user('mel')
				.createProject('poop')
				.should.eventually.have.property('name')
		)
	})
})
