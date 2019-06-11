import React from 'react';
import PropType from "prop-types";

import {makeStyles} from '@material-ui/core';

import TemplateEnigma from "./Template";

import VocalEnigma from "./VocalEnigma";


const useStyles = makeStyles(theme => ({}));


function Enigma(props) {
	const {type} = props;
	const classes = useStyles();
	
	switch (type) {
		case "vocal":
			return <TemplateEnigma enigmaView={<VocalEnigma soundDuration={100} volume={8}/>}/>;
		// case "text":
		// 	return <TemplateEnigma enigmaView={<TextEnigma/>}/>;
		// case "photo":
		// 	return <TemplateEnigma enigmaView={<PhotoEnigma/>}/>;
	}
}

Enigma.propTypes = {
	type: PropType.string.isRequired
};


export default Enigma