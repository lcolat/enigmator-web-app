import React from 'react';
import PropType from "prop-types";

import {makeStyles} from '@material-ui/core';
import {
	Paper, Switch, FormControlLabel, Typography, Input,
	MenuItem, Select, Grid, FormControl
} from '@material-ui/core';

import SettingChoice from "./SettingChoice";


const useStyles = makeStyles(theme => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
	rootTypoChange: {
		marginLeft: theme.spacing(3)
	}
}));

const groupName = "Test";
const choices = [
	{value: "value0", name: "name0"},
	{value: "value1", name: "name1"},
	{value: "value2", name: "name2"}
];

const settingsGroups = [{
	groupName: "Friend Request",
	choices: [
		{value: "always", name: "Always"},
		{value: "never", name: "Never"}
	]
}, {
	groupName: "Enigma Validation",
	choices: [
		{value: "always", name: "Always"},
		{value: "never", name: "Never"}
	]
}, {
	groupName: "Remind Unfinished Enigma",
	choices: [
		{value: "all_days", name: "All Days"},
		{value: "once_a_week", name: "Once a Week"},
		{value: "once_a_month", name: "Once a Month"},
		{value: "never", name: "Never"}
	]
}, {
	groupName: "Respond On Topic",
	choices: [
		{value: "always", name: "Always"},
		{value: "on_your_thread", name: "On your Thread"},
		{value: "on_your_post", name: "On your Post"},
		{value: "never", name: "Never"}
	]
}
];

const listTypo = [
	"Sherif",
	"Sherif Sans MS",
	"Time New Roman",
	"Comics",
	"Arial Black"
];

function Settings(props) {
	const {} = props;
	const classes = useStyles();
	const [settingGroupEnable, setSettingGroupEnable] = React.useState(true);
	const [typography, setTypography] = React.useState(listTypo[0]);
	
	const handleChangeSettingState = () => {
		setSettingGroupEnable(!settingGroupEnable);
	};
	
	function handleChangeTypo(event) {
		setTypography(event.target.value);
	}
	
	return (
		<Paper>
			<FormControlLabel
				control={
					<Switch
						checked={settingGroupEnable}
						onChange={handleChangeSettingState}
						value="alarms_settings"
						color="primary"
					/>
				}
				label="ALARMS SETTINGS"
			/>
			{settingGroupEnable && settingsGroups.map(settingGroup => (
				<SettingChoice groupName={settingGroup.groupName} choices={settingGroup.choices}/>
			))}
			<Typography>VIEW</Typography>
			<Grid container direction={"column"} alignItems={"flex-start"} className={classes.rootTypoChange}>
				<Typography>Typography</Typography>
				<FormControl className={classes.formControl}>
					<Select
						value={typography}
						onChange={handleChangeTypo}
						input={<Input name="typography" id="typography-label-placeholder"/>}
						name="Enigmator Typography"
						displayEmpty
					>
						{listTypo.map((typo, index) => (
							index === 0 ? <MenuItem value="" key={index + '-' + typo}><em>{typo}</em></MenuItem> :
								<MenuItem value={index} key={index + '-' + typo}>{typo}</MenuItem>
						))}
					</Select>
				</FormControl>
			</Grid>
		</Paper>
	);
}

Settings.propTypes = {};


export default Settings;