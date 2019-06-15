import React from 'react';
import PropType from "prop-types";

import {makeStyles} from '@material-ui/core';
import {Tabs, Tab} from '@material-ui/core';

import {AllInclusive, Rowing, SupervisedUserCircle, Whatshot} from "@material-ui/icons";


const useStyles = makeStyles(theme => ({}));

// const exampleList = [
// 	{icon: <AllInclusive/>, text: "ALL"},
// 	{icon: <Rowing/>, text: "SOLO"},
// 	{icon: <SupervisedUserCircle/>, text: "TEAM"},
// 	{icon: <Whatshot/>, text: "BATTLE"},
// 	{text: "NO_ICON"}
// ];

function generateTab(list) {
	return (list.map(item => (
		//(item.icon) ? <Tab key={item.text} icon={item.icon} label={item.text}/> :
		<Tab key={item.text} label={item.text}/>
	)));
}

function TabChooser(props) {
	const {eventChange, tabList} = props;
	const classes = useStyles();
	const [value, setValue] = React.useState(0);
	
	const handleChange = (event, value) => {
		setValue(value);
		eventChange(value)
	};
	
	return (
		<Tabs
			value={value}
			onChange={handleChange}
			variant="fullWidth"
			indicatorColor="secondary"
			textColor="secondary">
			{generateTab(tabList)}
		</Tabs>
	);
}

TabChooser.propTypes = {};


export default TabChooser;