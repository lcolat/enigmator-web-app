import api from 'services/api'
import { SERVER_URL } from '../config'

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
	
	// /Histories/filter/filter[where][userId]=IDUSER&filter[where][type]=like&filter[where][topicId]=IDDUTOPIC
	hasLikeTopic = async () => {
	
	}
}