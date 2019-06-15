import React from 'react';
import PropType from "prop-types";

import {makeStyles} from '@material-ui/core';
import {TextField, Button} from "@material-ui/core";

import {CloudUpload} from "@material-ui/icons";


import {Difficulties as EnigmaDif} from "./../../../model/Enigma";


const useStyles = makeStyles(theme => ({
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
	},
	textFieldDescription: {
		width: "80%",
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
	},
	button: {
		margin: theme.spacing(1),
	},
	rightIcon: {
		marginLeft: theme.spacing(1),
	},
}));


function Template(props) {
	const {component} = props;
	const classes = useStyles();
	const [enigmaData, setEnigmaData] = React.useState({
		name: "",
		difficulty: 'Normal',
		score: '10',
		description: "",
	});
	
	const handleChangeData = fieldName => event => {
		setEnigmaData({...enigmaData, [fieldName]: event.target.value});
	};
	
	return (
		<div>
			<TextField
				id="enigma-name"
				label="Name"
				className={classes.textField}
				value={enigmaData.name}
				onChange={handleChangeData('name')}
				margin="normal"
				variant="filled"
			/>
			<TextField
				id="enigma-difficulty"
				select
				label="Difficulty"
				className={classes.textField}
				value={enigmaData.difficulty}
				onChange={handleChangeData('difficulty')}
				SelectProps={{
					native: true,
					MenuProps: {
						className: classes.menu,
					},
				}}
				margin="normal"
				variant="outlined"
			>
				{EnigmaDif.map(field => (
					<option key={field} value={field}>
						{field}
					</option>
				))}
			</TextField>
			<TextField
				id="enigma-score"
				label="Score"
				className={classes.textField}
				value={enigmaData.score}
				onChange={handleChangeData('score')}
				type={"number"}
				InputLabelProps={{
					shrink: true,
				}}
				margin="normal"
				variant="outlined"
			/>
			<TextField
				id="enigma-description"
				label="Description"
				multiline
				rowsMax="8"
				value={enigmaData.description}
				onChange={handleChangeData('description')}
				className={classes.textFieldDescription}
				fullWidth
				margin="normal"
			/>
			{component}
			<Button variant="contained" color="default" className={classes.button}>
				Upload
				<CloudUpload className={classes.rightIcon}/>
			</Button>
		</div>
	);
}

Template.propTypes = {};


export default Template;