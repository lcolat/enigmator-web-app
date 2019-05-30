import axios from 'axios'
import { SERVER_URL } from '../config'

export default class UserService {
	static instance = undefined
	email = ''
	pseudo = ''
	firstName = ''
	lastName = ''
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
			const res = await axios.post(`${SERVER_URL}/UserEnigmators/login`, req)
			this.setAccessToken(res.data.id)
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

	isLogin = () => {
		if (this.getAccessToken()) {
			return true
		}
		return false
	}

	logout = async () => {
		try {
			await axios.post(
				`${SERVER_URL}/UserEnigmators/logout?access_token=${this.getAccessToken()}`
			)
			this.deleteAccessToken()
			return true
		} catch (err) {
			throw new Error(err)
		}
	}
}
