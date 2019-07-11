import api from 'services/api'
export default class UserService {
	id = undefined
	accessToken = undefined
	isValidator = true
	constructor() {
		if (this.getAccessToken()) {
			this.accessToken = this.getAccessToken()
			api.defaults.headers.common['Authorization'] = this.accessToken
		}
		if (this.getIdFromStorage()) {
			this.id = this.getIdFromStorage()
		}
	}

	setAccessToken = accessToken => {
		api.defaults.headers.common['Authorization'] = accessToken
		localStorage.setItem('accessToken', accessToken)
		//TODO: use more secure store
	}
	setIdInStorage = id => {
		localStorage.setItem('id', id)
	}
	getAccessToken = () => {
		return localStorage.getItem('accessToken')
	}
	getIdFromStorage = () => {
		return localStorage.getItem('id')
	}
	setUserData = (id, accessToken) => {
		this.id = id
		this.accessToken = accessToken
		this.setIdInStorage(id)
		this.setAccessToken(accessToken)
	}
	deleteUserData = () => {
		this.deleteAccessToken()
		this.deleteIdInStorage()
	}
	deleteAccessToken = () => {
		localStorage.removeItem('accessToken')
	}
	deleteIdInStorage = () => {
		localStorage.removeItem('id')
	}
	authenticate = async (email, password) => {
		const req = {
			password: password,
			email: email
		}
		try {
			const res = await api.post('/UserEnigmators/login', req)
			this.setUserData(res.data.userId, res.data.id)
			return true
		} catch (err) {
			switch (err.response.status) {
				case 401:
					return 'Identifiants incorrects'
				case 404:
					return "User doesn't exist"
				default:
					return err
			}
		}
	}

	get = async (id, criteria) => {
		let url = '/UserEnigmators'
		if (id !== undefined) {
			url = `/UserEnigmators/${id}`
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
					throw new Error('Bad credential')
				case 404:
					console.error("User doesn't exist")
					break
				default:
					console.error('error')
			}
		}
	}
	update = async (id, data) => {
		try {
			await api.patch(`/UserEnigmators/${id}`, data)
			return true
		} catch (err) {
			throw new Error(err)
		}
	}

	isLogin = async () => {
		if (this.getAccessToken() && this.getAccessToken() !== undefined) {
			return true
		}
		return false
	}

	logout = async () => {
		try {
			await api.post(
				`/UserEnigmators/logout?access_token=${this.getAccessToken()}`
			)
			this.deleteUserData()
			return true
		} catch (err) {
			return err
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
			await api.post('/UserEnigmators', req)
			return true
		} catch (err) {
			throw new Error(err)
		}
	}

	verifyToken = async () => {
		try {
			const res = await api.get(`/UserEnigmators/${this.id}/accessTokens`)
			if (res.data.length < 1) {
				return false
			}
			if (res.data[0].id !== this.accessToken) {
				return false
			}
			return true
		} catch (err) {
			return false
		}
	}
}
