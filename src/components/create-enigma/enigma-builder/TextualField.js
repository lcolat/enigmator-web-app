import React from 'react';
import PropType from "prop-types";

import {makeStyles} from '@material-ui/core';
import TextField from "@material-ui/core/TextField";


const useStyles = makeStyles(theme => ({
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: "95%"
	}
}));


function TextualField(props) {
	const {} = props;
	const classes = useStyles();
	
	return (
		<TextField
			id="textual-input-enigma"
			label="Text of the Enigma"
			multiline
			rows="4"
			defaultValue=""
			className={classes.textField}
			margin="normal"
			fullWidth
			
		/>
	);
}

TextualField.propTypes = {};


export default TextualField;