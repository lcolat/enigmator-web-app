import api from 'services/api'
import { SERVER_URL } from '../config'

export default class ForumService {
	accessToken = localStorage.getItem('accessToken')
	
	getEnigmasTopics = async () => {
		try {
			const topics = await api.get('/Topics')
			console.log(topics.data)
			return topics.data
		} catch (err) {
			return err
		}
	}
}