import React from 'react';
import PropType from "prop-types";

import {makeStyles} from '@material-ui/core';
import SettingChoice from "./SettingChoice";


const useStyles = makeStyles(theme => ({}));

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


function Settings(props) {
	const {} = props;
	const classes = useStyles();
	
	return (
		<div>
			{settingsGroups.map(settingGroup => (
				<SettingChoice groupName={settingGroup.groupName} choices={settingGroup.choices}/>
			))}
		</div>
	);
}

Settings.propTypes = {};


export default Settings;