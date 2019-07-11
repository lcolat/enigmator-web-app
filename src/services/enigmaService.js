import api from 'services/api'
import { SERVER_URL } from '../config'

export default class EnigmaService {
	accessToken = undefined
	constructor() {
		if (localStorage.hasOwnProperty('accessToken')) {
			this.accessToken = localStorage.getItem('accessToken')
			api.defaults.headers.common['Authorization'] = this.accessToken
		}
	}

	create = async (name, question, answer, scoreReward, file, mediaType) => {
		if (
			question === '' ||
			question === undefined ||
			answer === '' ||
			answer === undefined
		) {
			return "Impossible de créer l'énigme"
		}
		const req = {
			name: name,
			question: question,
			answer: answer,
			scoreReward: parseInt(scoreReward)
		}

		try {
			const res = await api.post('/Enigmes/CreateEnigme', req)
			if (file !== undefined && mediaType !== undefined) {
				var formdata = new FormData()
				formdata.append('file', file)
				formdata.append('mediaType', mediaType)
				try {
					await api.post(`/Enigmes/${res.data.id}/AddMediaToEnigme`, formdata)
					return true
				} catch (err) {
					return err
				}
			}
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
	getEnigmas = async () => {
		try {
			const res = await api.get('/Enigmes?filter[include]=Enigme_User')
			let enigmas = res.data
			let newEnigmas = new Array(res.data.length)
			await Promise.all(
				enigmas.map(async (enigma, index) => {
					const res = await api.get(
						`/Media?filter[where][enigmeID]=${enigma.id}`
					)
					if (res.data.length === 0) {
						newEnigmas[index] = { ...enigmas[index], ...{ type: 'text' } }
					} else {
						newEnigmas[index] = {
							...enigmas[index],
							...{ type: res.data[0].type }
						}
					}
				})
			)
			return newEnigmas
		} catch (err) {
			return err
		}
	}
	getNotDoneEnigmas = async userId => {
		try {
			const res = await api.get(`/UserEnigmators/${userId}/GetEnigmeNotDone`)
			let enigmas = res.data
			let newEnigmas = new Array(res.data.length)
			await Promise.all(
				enigmas.map(async (enigma, index) => {
					const res = await api.get(
						`/Media?filter[where][enigmeID]=${enigma.id}`
					)
					if (res.data.length === 0) {
						newEnigmas[index] = { ...enigmas[index], ...{ type: 'text' } }
					} else {
						newEnigmas[index] = {
							...enigmas[index],
							...{ type: res.data[0].type }
						}
					}
				})
			)
			return newEnigmas
		} catch (err) {
			return err
		}
	}
	getTriedEnigmas = async userId => {
		try {
			const res = await api.get(`/UserEnigmators/${userId}/GetEnigmeTried`)
			let enigmas = res.data
			let newEnigmas = new Array(res.data.length)
			await Promise.all(
				enigmas.map(async (enigma, index) => {
					const res = await api.get(
						`/Media?filter[where][enigmeID]=${enigma.id}`
					)
					if (res.data.length === 0) {
						newEnigmas[index] = { ...enigmas[index], ...{ type: 'text' } }
					} else {
						newEnigmas[index] = {
							...enigmas[index],
							...{ type: res.data[0].type }
						}
					}
				})
			)
			return newEnigmas
		} catch (err) {
			return err
		}
	}
	setTriedEnigma = async (userId, enigmaId) => {
		const req = {
			date: Date.now().toJSON(),
			type: 'tried',
			enigmeId: parseInt(enigmaId),
			userEnigmatorId: parseInt(userId)
		}
		try {
			await api.post(`/Histories`, req)
			return true
		} catch (err) {
			return err
		}
	}
	getEnigmaFileUrl = async id => {
		try {
			const res = await api.get(`/Media?filter[where][enigmeID]=${id}`)
			let filename = res.data[0].filename
			return `${SERVER_URL}/Containers/enigme/download/${filename}`
		} catch (err) {
			return err
		}
	}
	getUserEnigmas = async userId => {
		try {
			const res = await api.get(`/Enigmes?filter[where][UserID]=${userId}`)
			return res.data
		} catch (err) {
			return err
		}
	}
	validateEnigma = async (enigmaId, scoreReward) => {
		const req = { scoreReward: scoreReward }
		try {
			await api.patch(`/Enigmes/${enigmaId}/ValidateEnigme`, req)
			return true
		} catch (err) {
			return err
		}
	}
	haveWaitingValidation = async () => {
		try {
			const res = await api.get('/Enigmes?filter[where][status]=false')
			if (res.data.length > 0) {
				return true
			}
			return false
		} catch (err) {
			return err
		}
	}
	getEnigmaFileUrl = async id => {
		try {
			const res = await api.get(`/Media?filter[where][enigmeID]=${id}`)
			let filename = res.data[0].filename
			return `${SERVER_URL}/Containers/enigme/download/${filename}`
		} catch (err) {
			return err
		}
	}
	answer = async (id, answer) => {
		if (answer === undefined || answer === '') {
			return 'Il manque la réponse'
		}
		const req = { answer: answer }
		try {
			const res = await api.post(`/Enigmes/${id}/AnswerEnigme`, req)
			return res
		} catch (err) {
			return err
		}
	}
	setLastWords = (enigmaID, words) => {
		const data = {
			id: enigmaID,
			words: words
		}
		sessionStorage.setItem(
			`enigmator.enigma.${enigmaID}.words`,
			JSON.stringify(data)
		)
	}
	getLastWords = enigmaID => {
		const data = JSON.parse(
			sessionStorage.getItem(`enigmator.enigma.${enigmaID}.words`)
		)
		if (data === null || data === '') {
			return []
		}
		return data.words
	}
	deleteLastWords = enigmaID => {
		sessionStorage.removeItem(`enigmator.enigma.${enigmaID}.words`)
	}
}
