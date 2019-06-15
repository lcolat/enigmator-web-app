const UserService = require('../userService').default
const userService = UserService.getInstance()
const testUser = {
	id: 3,
	Classement: null,
	nom: 'bbb',
	rang: null,
	inscription_date: '2019-05-24T09:33:22.000Z',
	realm: null,
	username: null,
	email: 'bb.zz@gmail.com',
	emailVerified: null,
	UserID: null
}
it('Should Login user', async function() {
	expect(
		await userService.authenticate(
			testUser.email,
			process.env.REACT_APP_TEST_USER_PASSWORD
		)
	).toEqual(true)
})

it('Login should return bad credential', async function() {
	expect(await userService.authenticate(testUser.email, 'test')).toEqual(
		'Bad credential'
	)
})

it('Should get current user detail', async function() {
	expect(await userService.get(testUser.id)).toEqual(testUser)
})
