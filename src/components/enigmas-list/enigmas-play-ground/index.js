import React from 'react'
import PropType from 'prop-types'
import TemplateEnigma from './Template'
import VocalEnigma from './VocalEnigma'
import ImageEnigma from './ImageEnigma'
import VideoEnigma from './VideoEnigma'
import { enigmasTypes, listEnigmasTypes } from 'model/Enigma'

function Enigma(rest, props) {
	const { type, enigma } = rest.location.state

	switch (type) {
		case enigmasTypes.AUDIO:
			return <TemplateEnigma enigmaView={<VocalEnigma />} enigma={enigma} />
		case enigmasTypes.TEXT:
			return <TemplateEnigma enigma={enigma} />
		case enigmasTypes.IMAGE:
			return <TemplateEnigma enigmaView={<ImageEnigma />} enigma={enigma} />
		case enigmasTypes.VIDEO:
			return <TemplateEnigma enigmaView={<VideoEnigma />} enigma={enigma} />
		default:
			return <div>No Enigma</div>
	}
}

Enigma.propTypes = {
	type: PropType.oneOf(listEnigmasTypes).isRequired
}

export default Enigma
