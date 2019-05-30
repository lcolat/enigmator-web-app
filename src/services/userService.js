import api from './api'
export default class UserService {
	static instance = undefined

	constructor() {
		if (UserService.instance !== undefined) {
			throw new Error('Constructor call more than one time !')
		}
	}
	static getInstance = () => {
		if (UserService.instance === undefined) {
			UserService.instance = new UserService()
		}

		return UserService.instance
	}
	setAccessToken = accessToken => {
		api.defaults.headers.common['Authorization'] = accessToken
		localStorage.setItem('accessToken', accessToken)
		//TODO: use more secure store
	}
	getAccessToken = () => {
		return localStorage.getItem('accessToken')
	}
	deleteAccessToken = () => {
		localStorage.removeItem('accessToken')
	}
	authenticate = async (email, password) => {
		const req = {
			password: password,
			email: email
		}
		try {
			const res = await api.post('/UserEnigmators/login', req)
			this.setAccessToken(res.data.id)
			this.id = res.data.userId
			return true
		} catch (err) {
			switch (err.response.status) {
				case 401:
					console.error('Bad credential')
					break
				case 404:
					console.error("User doesn't exist")
					break
				default:
					console.error('error')
			}
		}
	}

	get = async (id, criteria) => {
		let url = '/UserEnigmators'
		if (id !== undefined) {
			url = `/UserEnigmators/${this.id}`
		} else if (criteria !== undefined) {
			url += '?'
			for (let criterion in criteria) {
				url += `${criterion}=${criteria[criterion]}&`
			}
		}
		try {
			const res = await api.get(url)
			return res.data
		} catch (err) {
			switch (err.response.status) {
				case 401:
					console.error('Bad credential')
					break
				case 404:
					console.error("User doesn't exist")
					break
				default:
					console.error('error')
			}
		}
	}

	isLogin = () => {
		if (this.getAccessToken()) {
			return true
		}
		return false
	}

	logout = async () => {
		try {
			await this.axios.post(
				`/UserEnigmators/logout?access_token=${this.getAccessToken()}`
			)
			this.deleteAccessToken()
			return true
		} catch (err) {
			throw new Error(err)
		}
	}

	logup = async (name, username, password, email) => {
		const req = {
			nom: name,
			username: username,
			password: password,
			email: email,
			inscription_date: Date.now()
		}
		try {
			await this.axios.post('/UserEnigmators', req)
			return true
		} catch (err) {
			throw new Error(err)
		}
	}
}
