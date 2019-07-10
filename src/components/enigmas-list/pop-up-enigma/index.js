import React from 'react'
import TemplatePopUp from './TemplatePopUp'

export function PopUpWellDone(props) {
	const { score, isOpen, history } = props

	return (
		<TemplatePopUp
			history={history}
			isOpen={isOpen}
			score={score}
			image={process.env.PUBLIC_URL + '/img/WellDone.png'}
		/>
	)
}

export default function PopUpYouWin(props) {
	const { score, isOpen, history } = props

	return (
		<TemplatePopUp
			history={history}
			isOpen={isOpen}
			score={score}
			image={process.env.PUBLIC_URL + '/img/YouWin.png'}
		/>
	)
}

export function PopUpGameOver(props) {
	const { isOpen, history } = props

	return (
		<TemplatePopUp
			history={history}
			isOpen={isOpen}
			image={process.env.PUBLIC_URL + '/img/GameOver.jpg'}
		/>
	)
}
