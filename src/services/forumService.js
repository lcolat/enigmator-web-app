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
			let newTopics = new Array(topics.data.length)
			await Promise.all(
				topics.data.map(async (topic, index) => {
					const res = await api.get(`/UserEnigmators/${topic.userEnigmatorsId}`)
					let creator = {
						...res.data,
						...{
							avatar: `${SERVER_URL}/Containers/profile/download/${
								res.data.profilePicture
							}`
						}
					}
					newTopics[index] = {
						...topics.data[index],
						...{ creator: creator }
					}
				})
			)
			return newTopics
		} catch (err) {
			return err
		}
	}
	getPosts = async id => {
		try {
			const posts = await api.get(`/Topics/${id}/GetMessages`)
			let newPosts = new Array(posts.data.length)
			await Promise.all(
				posts.data.map(async (post, index) => {
					const res = await api.get(`/UserEnigmators/${post.userId}`)
					let creator = {
						...res.data,
						...{
							avatar: `${SERVER_URL}/Containers/profile/download/${
								res.data.profilePicture
							}`
						}
					}
					newPosts[index] = {
						...posts.data[index],
						...{ creator: creator }
					}
				})
			)
			return newPosts
		} catch (err) {
			return err
		}
	}
	likeTopic = async id => {
		try {
			await api.post(`/Topics/${id}/LikeTopic`)
			return true
		} catch (err) {
			return err
		}
	}
	addPost = async (id, content) => {
		const req = {
			content: content
		}
		try {
			await api.post(`/Topics/${id}/PostAMessage`, req)
			return true
		} catch (err) {
			return err
		}
	}
}
