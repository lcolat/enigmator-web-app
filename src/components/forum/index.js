import React from 'react';
import PropType from "prop-types";

import {Grid, makeStyles, TableCell, TableRow, Button} from '@material-ui/core';
import {SortableTable, TabChooser, LikeCount, SearchPick} from "../../common";

import {PlaylistAdd} from "@material-ui/icons";



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

const body = [[
	{
		name: "enigma0", creator: "DamSauGoodMan", creation: "18/08/2018, 18h42", lastUpdate: "18/08/2018, 18h42",
		like: {number: "10", byUser: true}
	},
],
	[
		{
			name: "other0", creator: "DamSauGoodMan", creation: "18/08/2018, 18h42", lastUpdate: "18/08/2018, 18h42",
			like: {number: "10", byUser: false}
		},
		{
			name: "other1", creator: "DamSauGoodMan", creation: "18/08/2018, 18h42", lastUpdate: "18/08/2018, 18h42",
			like: {number: "10", byUser: true}
		}
	]];

const useStyles = makeStyles(theme => ({
	rootMenu: {
		marginBottom: theme.spacing(1)
	},
	search: {
		marginTop: theme.spacing(1),
		marginLeft: theme.spacing(2),
		width: "20%",
		align: "left"
	},
	rightIcon: {
		marginLeft: theme.spacing(1),
	},
	button: {
		marginTop: theme.spacing(1),
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
	},
}));

function ListThreads(props) {
	const {} = props;
	const classes = useStyles();
	const [numTab, setNumTab] = React.useState(0);
	
	function handleClick(event, enigma) {
		alert("Must open " + enigma.name)
	}
	
	function changeBody(num) {
		setNumTab(num);
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
				<TableCell align="left">
					<LikeCount liked={bodyRow.like.byUser} likes={bodyRow.like.number}/>
				</TableCell>
			</TableRow>
		);
	}
	
	return (
		<div>
			<Grid container direction={"row"} className={classes.rootMenu}>
				<Grid item xs={8}>
					<TabChooser tabList={tabs} eventChange={changeBody}/>
				</Grid>
				<Grid item xs className={classes.search}>
					<SearchPick suggestions={
						body[numTab].map(thread => {
							return ({label: thread.name})
						})
					}/>
				</Grid>
				{numTab === 1 &&
				<Grid>
					<Button variant="contained" color="primary" className={classes.button}>
						ADD
						<PlaylistAdd className={classes.rightIcon}/>
					</Button>
				</Grid>
				}
			</Grid>
			<SortableTable columnsHeader={header} rowFormGenerator={formBody} rows={body[numTab]}/>
		</div>
	);
}

ListThreads.propTypes = {};


export default ListThreads;