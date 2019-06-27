import React from 'react'
import PropType from 'prop-types'

import { makeStyles } from '@material-ui/core'

import TemplateEnigma from './Template'

import VocalEnigma from './VocalEnigma'
import TextEnigma from './TextEnigma'
import ImageEnigma from './ImageEnigma'
import VideoEnigma from './VideoEnigma'
import { enigmasTypes, listEnigmasTypes } from '../../../model/Enigma'

const useStyles = makeStyles(theme => ({}))

function Enigma(props) {
	const { type, enigma } = props
	const classes = useStyles()

	switch (type) {
		case enigmasTypes.AUDIO:
			return (
				<TemplateEnigma
					enigmaView={<VocalEnigma soundDuration={100} volume={8} />}
					enigma={enigma}
				/>
			)
		case enigmasTypes.TEXT:
			return <TemplateEnigma enigmaView={<TextEnigma />} enigma={enigma} />
		case enigmasTypes.IMAGE:
			return <TemplateEnigma enigmaView={<ImageEnigma />} enigma={enigma} />
		case enigmasTypes.VIDEO:
			return <TemplateEnigma enigmaView={<VideoEnigma />} enigma={enigma} />
		default:
			break
	}
}

Enigma.propTypes = {
	type: PropType.oneOf(listEnigmasTypes).isRequired
}

export default Enigma
