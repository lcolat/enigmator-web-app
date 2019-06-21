import React from 'react';
import PropType from "prop-types";

import {Grid, makeStyles, TableCell, TableRow} from '@material-ui/core';
import {SearchPick, SortableTable, TabChooser} from "../../common";


const tabs = [
	{text: "ALL"},
	{text: "SOLO"},
	{text: "MULTI"},
	{text: "PVP"}
];

const header = [
	{id: 'rank', align: "center", disablePadding: true, label: 'Rank'},
	{id: 'player', align: "left", disablePadding: false, label: 'Player'},
	{id: 'win', align: "left", disablePadding: false, label: 'Win'},
	{id: 'score', align: "left", disablePadding: false, label: 'Score'}
];

const body = [[
	{
		rank: 1, name: "Toto", win: 40, score: 842
	},
	{
		rank: 2, name: "Tata", win: 31, score: 578
	},
	{
		rank: 3, name: "Titi", win: 87, score: 142
	},
	{
		rank: 4, name: "Tutu", win: 2, score: 17
	},
], [
	{
		rank: 1, name: "Toto", win: 20, score: 600
	},
	{
		rank: 2, name: "Tata", win: 31, score: 578
	},
	{
		rank: 3, name: "Tutu", win: 2, score: 17
	},
], [
	{
		rank: 1, name: "Toto", win: 15, score: 200
	},
	{
		rank: 2, name: "Titi", win: 87, score: 142
	},
], [
	{
		rank: 1, name: "Toto", win: 5, score: 42
	},
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


function LeaderBoard(props) {
	const {} = props;
	const classes = useStyles();
	const [numTab, setNumTab] = React.useState(0);
	
	function handleClick(event, player) {
		alert("Must open " + player.name + " profile")
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
					{bodyRow.rank}
				</TableCell>
				<TableCell align="left">{bodyRow.name}</TableCell>
				<TableCell align="left">{bodyRow.win}</TableCell>
				<TableCell align="left">{bodyRow.score}</TableCell>
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
						body[numTab].map(player => {
							return ({label: player.name})
						})
					}/>
				</Grid>
			</Grid>
			<SortableTable columnsHeader={header} rowFormGenerator={formBody} rows={body[numTab]}/>
		</div>
	);
}

LeaderBoard.propTypes = {};


export default LeaderBoard;