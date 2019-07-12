export default class Post {
	constructor(title,
	            userID,
	            dateOfCreation,
	            body,
	            numberOfLikes) {
		
		this.title = title
		this.userID = userID
		this.dateOfCreation = dateOfCreation
		this.numberOfLikes = numberOfLikes
	}
}