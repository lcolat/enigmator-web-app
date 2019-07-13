export default class Topic {
	constructor(name,
	            creation,
	            lastUpdate,
	            description,
	            numberOfLikes,
	            likedByUser,
	            posts,
	            isAutomaticTopic,
	            ownerId) {
		
		this.name = name
		this.creation = creation
		this.lastUpdate = lastUpdate
		this.description = description
		this.like = { number: numberOfLikes, byUser: likedByUser }
		this.posts = posts
		this.isAutomaticTopic = isAutomaticTopic
		this.ownerId = ownerId
	}
}