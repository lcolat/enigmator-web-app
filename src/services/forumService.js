import api from 'services/api'

export default class ForumService {
	accessToken = localStorage.getItem('accessToken')

	constructor() {
		if (localStorage.hasOwnProperty('accessToken')) {
			api.defaults.headers.common['Authorization'] = this.accessToken
		}
	}

	getTopics = async () => {
		try {
			const topics = await api.get('/Topics')
			return topics.data
		} catch (err) {
			return err
		}
	}
	getPosts = async id => {
		try {
			const posts = await api.get(`/Topics/${id}/GetMessages`)
			return posts.data
		} catch (err) {
			return err
		}
	}
	hasLikeTopic = async () => {}
}
