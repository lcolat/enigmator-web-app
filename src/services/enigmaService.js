import api from 'services/api'
export default class EnigmaService {
	accessToken = undefined
	constructor() {
		if (localStorage.hasOwnProperty('accessToken')) {
			this.accessToken = localStorage.getItem('accessToken')
			api.defaults.headers.common['Authorization'] = this.accessToken
		}
	}

	create = async (question, answer, file) => {
		if (
			question === '' ||
			question === undefined ||
			answer === '' ||
			answer === undefined
		) {
			return "Impossible de créer l'énigme"
		}
		let formdata = new FormData()
		formdata.append('question', question)
		formdata.append('answer', answer)
		if (file !== undefined) {
			formdata.append('file', file)
		}
		try {
			const res = await api.post('/Enigmes/CreateEnigme', formdata)
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
