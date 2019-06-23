import api from 'services/api'
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
}
