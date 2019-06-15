import React from 'react';
import PropType from "prop-types";

import {makeStyles} from '@material-ui/core';

import {Type} from "./../../../model/Enigma";
import Template from "./Template";
import PictureSelector from "./PictureSelector";
import TextualField from "./TextualField";
import VocalSelector from "./VocalSelector";


const useStyles = makeStyles(theme => ({}));


function EnigmaBuilder(props) {
	const {type} = props;
	const classes = useStyles();
	
	switch (type) {
		case Type.text:
			return <Template component={<TextualField/>}/>;
		case Type.photo:
			return <Template component={<PictureSelector/>}/>;
		case Type.vocal:
			return <Template component={<VocalSelector/>}/>
	}
}

EnigmaBuilder.propTypes = {};


export default EnigmaBuilder;