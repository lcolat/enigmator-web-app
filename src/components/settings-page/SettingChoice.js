import React from 'react';
import PropType from "prop-types";

import {makeStyles} from '@material-ui/core';
import {FormControlLabel, RadioGroup, Radio, FormLabel, FormControl, Grid} from '@material-ui/core';


const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
	},
	formControl: {
		margin: theme.spacing(3),
	},
	group: {
		margin: theme.spacing(1, 0),
	},
}));

// const groupName = "Test";
// const choices = [
// 	{value: "value0", name: "name0"},
// 	{value: "value1", name: "name1"},
// 	{value: "value2", name: "name2"}
// ];

function SettingChoice(props) {
	const {groupName, choices, getChange} = props;
	const classes = useStyles();
	const [value, setValue] = React.useState(choices[0].value);
	
	function handleChange(event) {
		setValue(event.target.value);
		if (getChange) getChange(value)
	}
	
	return (
		<div className={classes.root}>
			<FormControl component="fieldset" className={classes.formControl}>
				<Grid container>
					<FormLabel>{groupName}</FormLabel>
				</Grid>
				<RadioGroup
					aria-label="groupName"
					name={groupName}
					className={classes.group}
					value={value}
					onChange={handleChange}
					row
				>
					{choices.map((choice, index) => (
						<FormControlLabel key={`${index}-${choice.value}-${choice.name}`}
						                  value={choice.value}
						                  checked={choice.value === value}
						                  control={<Radio color="primary"/>}
						                  label={choice.name}/>
					))}
				</RadioGroup>
			</FormControl>
		</div>
	);
}

SettingChoice.propTypes = {};


export default SettingChoice;