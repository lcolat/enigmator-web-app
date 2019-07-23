import api from 'services/api'
import { SERVER_URL } from '../config'
export default class UserService {
	id = undefined
	accessToken = undefined
	isValidator = true
	avatar = process.env.PUBLIC_URL + '/img/default-profile-picture.jpg'
	username = ''
	constructor() {
		if (this.getAccessToken()) {
			this.accessToken = this.getAccessToken()
			api.defaults.headers.common['Authorization'] = this.accessToken
		}
		if (this.getIdFromStorage()) {
			this.id = this.getIdFromStorage()
		}
		if (this.getAvatarInStorage()) {
			this.avatar = this.getAvatarInStorage()
		}
		if (this.getUsernameInStorage()) {
			this.username = this.getUsernameInStorage()
		}
	}

	setAccessToken = accessToken => {
		api.defaults.headers.common['Authorization'] = accessToken
		localStorage.setItem('enigmator.accessToken', accessToken)
		// TODO use more secure store
	}
	setIdInStorage = id => {
		localStorage.setItem('enigmator.id', id)
	}
	setAvatarInStorage = avatar => {
		localStorage.setItem('enigmator.avatar', avatar)
	}
	setUsernameInStorage = username => {
		localStorage.setItem('enigmator.username', username)
	}
	getAccessToken = () => {
		return localStorage.getItem('enigmator.accessToken')
	}
	getIdFromStorage = () => {
		return localStorage.getItem('enigmator.id')
	}
	getAvatarInStorage = () => {
		return localStorage.getItem('enigmator.avatar')
	}
	getUsernameInStorage = () => {
		return localStorage.getItem('enigmator.username')
	}
	setUserData = (id, accessToken, avatar, username) => {
		this.id = id
		this.accessToken = accessToken
		this.setIdInStorage(id)
		this.setAccessToken(accessToken)
		this.setAvatarInStorage(avatar)
		this.setUsernameInStorage(username)
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
			await this.get(res.data.userId)
			this.setUserData(res.data.userId, res.data.id, this.avatar, this.username)
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
			url += '?filter[where]'
			for (let criterion in criteria) {
				url += `[${criterion}]=${criteria[criterion]}&`
			}
		}
		try {
			const res = await api.get(url)
			let newUsers = []
			if (res.data.length !== undefined) {
				res.data.forEach(user => {
					let newUser = user
					newUser.profilePicture = `${SERVER_URL}/Containers/profile/download/${
						user.profilePicture
					}`
					newUsers.push(newUser)
				})
				return newUsers
			} else {
				this.avatar = `${SERVER_URL}/Containers/profile/download/${
					res.data.profilePicture
				}`
				this.username = res.data.username
			}
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
	getStats = async id => {
		try {
			const res = await api.get(`/UserEnigmators/${id}/GetStats`)
			return res.data
		} catch (err) {
			return err
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

	logup = async (username, firstName, lastName, country, email, password) => {
		const req = {
			username: username,
			firstName: firstName,
			lastName: lastName,
			country: country,
			email: email,
			password: password
		}
		try {
			await api.post('/UserEnigmators', req)
			return true
		} catch (err) {
			return err
		}
	}

	verifyToken = async () => {
		let isOk = false
		try {
			const res = await api.get(`/UserEnigmators/${this.id}/accessTokens`)
			if (res.data.length > 0) {
				res.data.forEach(token => {
					if (token.id === this.accessToken) {
						isOk = true
					}
				})
			}
			return isOk
		} catch (err) {
			return false
		}
	}

	addFriend = async id => {
		try {
			await api.post(`/UserEnigmators/${id}/AddAFriend`)
			return true
		} catch (err) {
			return err
		}
	}
	getFriendRequest = async () => {
		try {
			const res = await api.get(
				`/friends?filter[where][state]=request&filter[where][ID_TO]=${
					this.id
				}&filter[include]=FROM`
			)
			return res.data
		} catch (err) {
			return err
		}
	}
	acceptFriendRequest = async userId => {
		try {
			await api.post(`/UserEnigmators/${userId}/AcceptAFriendRequest`)
			return true
		} catch (err) {
			return err
		}
	}
	denyFriendRequest = async userId => {
		try {
			await api.post(`/UserEnigmators/${userId}/DenyAFriendRequest`)
			return true
		} catch (err) {
			return err
		}
	}
	getFriends = async () => {
		try {
			const res = await api.get('/UserEnigmators/GetMyFriend')
			const friends = res.data
			let newFriends = new Array(res.data.length)
			await Promise.all(
				friends.map(async (friend, index) => {
					const res = await this.getStats(friend.id)
					newFriends[index] = {
						...friends[index],
						...{ stats: res }
					}
				})
			)
			return newFriends
		} catch (err) {
			return err
		}
	}
}
