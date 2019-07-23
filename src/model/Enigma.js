import React from 'react'
import Subject from '@material-ui/icons/Subject'
import Photo from '@material-ui/icons/Photo'
import MusicNote from '@material-ui/icons/MusicNote'
import PlayArrow from '@material-ui/icons/PlayArrow'

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

export const playMode = ['Solo', 'Multi', 'PvP']

export const kind = value => {
	switch (value) {
		case 'text':
			return <Subject fontSize={'small'} />
		case 'audio':
			return <MusicNote fontSize={'small'} />
		case 'image':
			return <Photo fontSize={'small'} />
		case 'video':
			return <PlayArrow fontSize={'small'} />
		default:
			break
	}
}
