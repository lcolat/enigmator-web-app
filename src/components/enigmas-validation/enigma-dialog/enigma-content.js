import React, { Component } from 'react'
import { enigmasTypes } from 'model/Enigma'

class EnigmaContent extends Component {
	render() {
		const { type, content } = this.props
		switch (type) {
			case enigmasTypes.IMAGE:
				return <img alt={'enigma'} src={content} height="360" />
			case enigmasTypes.AUDIO:
				return (
					<audio controls>
						<source src={content} />
					</audio>
				)
			case enigmasTypes.VIDEO:
				return (
					<video controls width="640" height="360">
						<source src={content} />
					</video>
				)
			default:
				break
		}
	}
}
export default EnigmaContent
