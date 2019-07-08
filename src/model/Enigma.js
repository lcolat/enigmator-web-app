export const enigmasTypes = {
	AUDIO: 'audio',
	TEXT: 'text',
	IMAGE: 'image',
	VIDEO: 'video'
}

export const enigmasStatus = {
	SUCCESS: 'success',
	TRIED: 'tried',
	NOTTRIED: 'notTried'
}

export const listEnigmasTypes = [
	enigmasTypes.AUDIO,
	enigmasTypes.TEXT,
	enigmasTypes.IMAGE,
	enigmasTypes.VIDEO
]

export const Difficulties = scoreReward => {
	if (scoreReward >= 0 && scoreReward < 25) {
		return 'Facile'
	} else if (scoreReward > 24 && scoreReward < 50) {
		return 'Normal'
	} else if (scoreReward > 49 && scoreReward < 75) {
		return 'Difficile'
	} else {
		return 'Vraiment vraiment Dur'
	}
}
