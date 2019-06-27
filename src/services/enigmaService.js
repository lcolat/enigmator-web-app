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

	create = async (name, question, answer, file, mediaType) => {
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
			answer: answer
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
			const res = await api.get('/Enigmes')
			let enigmas = res.data
			let newEnigmas = new Array(res.data.length)
			await Promise.all(
				enigmas.map(async (enigma, index) => {
					const res = await api.get(
						`Media?filter[where][enigmeID]=${enigma.id}`
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
	getEnigmaFileUrl = async id => {
		try {
			const res = await api.get(`/Media?filter[where][enigmeID]=${id}`)
			let filename = res.data[0].filename
			return `${SERVER_URL}/Containers/enigme/download/${filename}`
		} catch (err) {
			return err
		}
	}
}
