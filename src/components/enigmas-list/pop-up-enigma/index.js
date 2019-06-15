import React from 'react'

import TemplatePopUp from "./TemplatePopUp";


export function PopUpWellDone(props) {
	const {score, isOpen} = props;
	
	return (
		<TemplatePopUp isOpen={isOpen} score={score} image={process.env.PUBLIC_URL + '/img/WellDone.png'}/>
	);
}

export function PopUpYouWin(props) {
	const {score, isOpen} = props;
	
	return (
		<TemplatePopUp isOpen={isOpen} score={score} image={process.env.PUBLIC_URL + '/img/YouWin.png'}/>
	);
}

export function PopUpGameOver(props) {
	const {isOpen} = props;
	
	return (
		<TemplatePopUp isOpen={isOpen} image={process.env.PUBLIC_URL + '/img/GameOver.jpg'}/>
	);
}