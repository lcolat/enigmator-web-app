import React from 'react'

import { enigmasTypes } from 'model/Enigma'
import Template from './Template'
import FileSelector from './FileSelector'

function EnigmaBuilder(props) {
	const { type } = props
	switch (type) {
		case enigmasTypes.TEXT:
			return <Template {...props} />
		case enigmasTypes.IMAGE:
			return (
				<Template
					{...props}
					component={<FileSelector />}
					mediaType={enigmasTypes.IMAGE}
				/>
			)
		case enigmasTypes.AUDIO:
			return (
				<Template
					{...props}
					component={<FileSelector />}
					mediaType={enigmasTypes.AUDIO}
				/>
			)
		case enigmasTypes.VIDEO:
			return (
				<Template
					{...props}
					component={<FileSelector />}
					mediaType={enigmasTypes.VIDEO}
				/>
			)
		default:
			break
	}
}

export default EnigmaBuilder
