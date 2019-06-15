import React from 'react';
import PropType from "prop-types";

import {makeStyles} from '@material-ui/core';

import TemplateEnigma from "./Template";

import VocalEnigma from "./VocalEnigma";
import TextEnigma from "./TextEnigma";
import PhotoEnigma from "./PhotoEnigma";
import {enigmasTypes, listEnigmasTypes} from "../../../model/Enigma";



const useStyles = makeStyles(theme => ({}));


function Enigma(props) {
	const {type} = props;
	const classes = useStyles();
	
	switch (type) {
		case enigmasTypes.VOCAL:
			return <TemplateEnigma enigmaView={<VocalEnigma soundDuration={100} volume={8}/>}/>;
		case enigmasTypes.TEXT:
			return <TemplateEnigma enigmaView={<TextEnigma/>}/>;
		case enigmasTypes.PHOTO:
			return <TemplateEnigma enigmaView={<PhotoEnigma/>}/>;
	}
}

Enigma.propTypes = {
	type: PropType.oneOf(listEnigmasTypes).isRequired
};


export default Enigma