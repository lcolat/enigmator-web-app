import React from 'react'
import PropType from 'prop-types'
import TemplateEnigma from './Template'
import VocalEnigma from './VocalEnigma'
import ImageEnigma from './ImageEnigma'
import VideoEnigma from './VideoEnigma'
import { enigmasTypes, listEnigmasTypes } from 'model/Enigma'

function Enigma(rest, props) {
	const userService = rest.userService
	const { type, enigma } = rest.location.state
	switch (type) {
		case enigmasTypes.AUDIO:
			return (
				<TemplateEnigma
					history={rest.history}
					enigmaView={<VocalEnigma />}
					enigma={enigma}
					userService={userService}
				/>
			)
		case enigmasTypes.TEXT:
			return (
				<TemplateEnigma
					history={rest.history}
					enigma={enigma}
					userService={userService}
				/>
			)
		case enigmasTypes.IMAGE:
			return (
				<TemplateEnigma
					history={rest.history}
					enigmaView={<ImageEnigma />}
					enigma={enigma}
					userService={userService}
				/>
			)
		case enigmasTypes.VIDEO:
			return (
				<TemplateEnigma
					history={rest.history}
					enigmaView={<VideoEnigma />}
					enigma={enigma}
					userService={userService}
				/>
			)
		default:
			return <div>No Enigma</div>
	}
}

Enigma.propTypes = {
	type: PropType.oneOf(listEnigmasTypes).isRequired
}

export default Enigma
