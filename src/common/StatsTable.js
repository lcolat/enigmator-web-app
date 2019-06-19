import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles/index';
import Table from '@material-ui/core/Table/index';
import TableBody from '@material-ui/core/TableBody/index';
import TableCell from '@material-ui/core/TableCell/index';
import TableHead from '@material-ui/core/TableHead/index';
import TableRow from '@material-ui/core/TableRow/index';
import Paper from '@material-ui/core/Paper/index';

const styles = theme => ({
	root: {
		width: '100%',
		marginTop: theme.spacing.unit,
		overflowX: 'auto',
	},
	table: {
		minWidth: 700,
	},
});

let id = 0;

function createData(type, rank, score, win) {
	id += 1;
	return {id, type, rank, score, win};
}


const rows = [
	createData('Solo', 102, 840, 37),
	createData('Team', 382, 450, 24),
];

function getMTotalScore() {
	let scoreTotal = 0;
	rows.map(row => (scoreTotal += row.score));
	return scoreTotal;
}

function getTotalWin() {
	let winTotal = 0;
	rows.map(row => (winTotal += row.win));
	return winTotal;
}

rows.push(createData('Global', 178, getMTotalScore(), getTotalWin()));

function StatsTable(props) {
	const {classes} = props;
	
	return (
		<Paper className={classes.root}>
			<Table className={classes.table}>
				<TableHead>
					<TableRow>
						<TableCell align="right"> </TableCell>
						<TableCell align="center" style={{fontWeight: "bold"}}>Rank</TableCell>
						<TableCell align="center" style={{fontWeight: "bold"}}>Score</TableCell>
						<TableCell align="center" style={{fontWeight: "bold"}}>Win</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map(row => (
						<TableRow key={row.id}>
							<TableCell component="th" scope="row" style={{fontWeight: "bold"}}>{row.type}</TableCell>
							<TableCell align="center">{row.rank}</TableCell>
							<TableCell align="center">{row.score}</TableCell>
							<TableCell align="center">{row.win}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Paper>
	);
}

StatsTable.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StatsTable);