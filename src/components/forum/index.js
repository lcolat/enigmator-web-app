import React from 'react';
import PropType from "prop-types";

import {makeStyles, TableCell, TableRow} from '@material-ui/core';
import {SortableTable, TabChooser} from "../../common";


const useStyles = makeStyles(theme => ({}));

const tabs = [
	{text: "Enigmas"},
	{text: "Other"},
];

const header = [
	{id: 'name', align: "center", disablePadding: true, label: 'Name'},
	{id: 'creator', align: "left", disablePadding: false, label: 'Creator'},
	{id: 'creation', align: "left", disablePadding: false, label: 'Date of Creation'},
	{id: 'lastUpdate', align: "left", disablePadding: false, label: 'Date of Last Update'},
	{id: 'like', align: "left", disablePadding: false, label: 'Like'},
];

const body = [
	{
		name: "test0", creator: "DamSauGoodMan", creation: "18/08/2018, 18h42", lastUpdate: "18/08/2018, 18h42",
		like: {number: "10", byUser: true}
	},
];

function ListThreads(props) {
	const {} = props;
	const classes = useStyles();
	
	function handleClick(event, enigma) {
		alert("Must open " + enigma.name)
	}
	
	function formBody(bodyRow, labelId) {
		return (
			<TableRow
				hover
				onClick={event => handleClick(event, bodyRow)}
				tabIndex={-1}
				key={bodyRow.name + "-" + bodyRow.creator}
			>
				<TableCell component="th" id={labelId} scope="row" padding="none">
					{bodyRow.name}
				</TableCell>
				<TableCell align="left">{bodyRow.creator}</TableCell>
				<TableCell align="left">{bodyRow.creation}</TableCell>
				<TableCell align="left">{bodyRow.lastUpdate}</TableCell>
				<TableCell align="left">{bodyRow.like.number}</TableCell>
			</TableRow>
		);
	}
	
	return (
		<div>
			<TabChooser tabList={tabs}/>
			<SortableTable columnsHeader={header} rowFormGenerator={formBody} rows={body}/>
		</div>
	);
}

ListThreads.propTypes = {};


export default ListThreads;