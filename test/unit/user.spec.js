import { user } from '../../src'
import config from '../../config.json'

describe('User', () => {
	afterEach(() => {

	})

	describe('get', () => {
		beforeEach(() => {
	    nock(`${config.root}`)
	      .get(`/users/mel`)
	      .reply(200, {
	        username: 'mel'
	      })
		})

		it('should get the user', () =>
			user('mel')
				.get()
				.should.eventually.have.property('username')
		)
	})

	// describe('createProject', () => {
	// 	it('should create a project for a user', () =>
	// 		user('mel')
	// 			.createProject('poop')
	// 			.should.eventually.have.property('name')
	// 	)
	// })
})
