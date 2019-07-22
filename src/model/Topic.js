export default class Topic {
	constructor(
		id,
		title,
		creationDate,
		lastEditDate,
		description,
		numberOfLikes,
		likedByUser,
		posts,
		isAutomaticTopic,
		ownerId,
		creator
	) {
		this.id = id
		this.title = title
		this.creationDate = creationDate
		this.lastEditDate = lastEditDate
		this.description = description
		this.like = { number: numberOfLikes, byUser: likedByUser }
		this.posts = posts
		this.isAutomaticTopic = isAutomaticTopic
		this.ownerId = ownerId
		this.creator = creator
	}
}
