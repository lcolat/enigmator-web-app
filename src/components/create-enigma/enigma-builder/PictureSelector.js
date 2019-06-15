import React from 'react';
import PropType from "prop-types";

import {makeStyles} from '@material-ui/core';


const useStyles = makeStyles(theme => ({}));


function PictureSelector(props) {
	const {} = props;
	const classes = useStyles();
	
	function handleChange(selected) {
		console.log(selected);
	}
	
	return (
		<input type="file" onChange={(event) => handleChange(event.target.files)}/>
	);
}

PictureSelector.propTypes = {};


export default PictureSelector;