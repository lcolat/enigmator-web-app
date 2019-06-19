import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import {
	Grid,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TablePagination,
	TableRow,
	TableSortLabel
} from '@material-ui/core';
import {Toolbar, Typography, Paper, IconButton, FormControlLabel, Switch, Button} from '@material-ui/core';

import {ThumbUp, Forum, LocalActivity, Subject, Photo, MusicNote} from "@material-ui/icons";
import {lighten} from '@material-ui/core/styles/colorManipulator';

import PlayModeDialogue from "./play-mode";
import {LikeCount} from "../../common"


function createData(name, creator, kind, difficulty, date, value, description, status, likes, likedByUser) {
	return {name, creator, kind, difficulty, date, value, description, status, likes, likedByUser};
}

const rows = [
	createData('SuperEnigma',
		"DamSaulGoodMan",
		"audio",
		"easy",
		"23:36, 10/05/19",
		25,
		"A free one :)",
		"Resolved",
		51,
		true),
	createData('Who have 4-2-3 paws?',
		"The Sphinx",
		"text",
		"hard",
		"02:59, 02/05/19",
		75,
		"Œdipe solve it",
		"Never Tried",
		28,
		false),
	createData('What did the third Dwarf take?',
		"Dora",
		"text",
		"medium",
		"23:10, 10/05/19",
		50,
		"Brain f*ck*ng enigma",
		"In Progress",
		87,
		true),
	createData("v<^<^>v<^^<><<>>v>",
		"Saïtama",
		"picture",
		"demon",
		"09:00, 11/11/17",
		100,
		"All the enigma is in the title ;), i hope you will follow the right way !",
		"Resolved",
		11,
		false)
];

function desc(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function stableSort(array, cmp) {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = cmp(a[0], b[0]);
		if (order !== 0) return order;
		return a[1] - b[1];
	});
	return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
	return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

//name, creator, kind, difficulty, date, value, description, status, likes, likedByUser)
const headRows = [
	{id: 'likes', align: "center", disablePadding: false, label: "Like"},
	{id: 'name', align: "left", disablePadding: true, label: 'Name'},
	{id: 'creator', align: "left", disablePadding: false, label: 'Creator'},
	{id: 'kind', align: "left", disablePadding: false, label: 'Kind'},
	{id: 'difficulty', align: "left", disablePadding: false, label: 'Level'},
	{id: 'date', align: "left", disablePadding: false, label: "Date"},
	{id: 'value', align: "left", disablePadding: false, label: "Coins"},
	{id: 'status', align: "left", disablePadding: false, label: "Status"},
	{id: 'forum', align: "center", disablePadding: false, label: "Forum"}

];

function EnhancedTableHead(props) {
	const {order, orderBy, onRequestSort} = props;
	const createSortHandler = property => event => {
		onRequestSort(event, property);
	};
	
	return (
		<TableHead>
			<TableRow>
				{headRows.map(row => (
					<TableCell
						key={row.id}
						align={row.align}
						padding={row.disablePadding ? 'none' : 'default'}
						sortDirection={orderBy === row.id ? order : false}
					>
						<TableSortLabel
							active={orderBy === row.id}
							direction={order}
							onClick={createSortHandler(row.id)}
						>
							{(function () {
								switch (row.label) {
									case 'Like':
										return <ThumbUp fontSize={"small"}/>;
									case 'Coins':
										return <LocalActivity fontSize={"small"}/>;
									default:
										return row.label;
								}
							})()}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}

EnhancedTableHead.propTypes = {
	numSelected: PropTypes.number.isRequired,
	onRequestSort: PropTypes.func.isRequired,
	order: PropTypes.string.isRequired,
	orderBy: PropTypes.string.isRequired,
	rowCount: PropTypes.number.isRequired,
};


const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		marginTop: theme.spacing(3),
	},
	paper: {
		width: '100%',
		marginBottom: theme.spacing(2),
	},
	table: {
		minWidth: 500,
	},
	tableWrapper: {
		overflowX: 'auto',
	},
	rightIcon: {
		marginLeft: theme.spacing(1),
	}
}));

function kind(value) {
	switch (value) {
		case 'text':
			return <Subject fontSize={"small"}/>;
		case 'audio':
			return <MusicNote fontSize={"small"}/>;
		case "picture":
			return <Photo fontSize={"small"}/>;
	}
}

function EnhancedTable() {
	const classes = useStyles();
	const [order, setOrder] = React.useState('asc');
	const [orderBy, setOrderBy] = React.useState('calories');
	const [selected, setSelected] = React.useState([]);
	const [dense, setDense] = React.useState(false);
	const [open, setOpen] = React.useState(false);
	const [enigmaClicked, setEnigmaClicked] = React.useState();
	
	function handleRequestSort(event, property) {
		const isDesc = orderBy === property && order === 'desc';
		setOrder(isDesc ? 'asc' : 'desc');
		setOrderBy(property);
	}
	
	function handleClick(event, row) {
		setEnigmaClicked(row);
		handleClickDialogueOpen();
	}
	
	const handleClickDialogueOpen = () => {
		setOpen(true);
	};
	
	function handleDialogueClose() {
		setOpen(false);
	}
	
	function handleChangeDense(event) {
		setDense(event.target.checked);
	}
	
	const isSelected = name => selected.indexOf(name) !== -1;
	
	return (
		<div className={classes.root}>
			<Paper className={classes.paper}>
				<div className={classes.tableWrapper}>
					<Table
						className={classes.table}
						aria-labelledby="tableTitle"
						size={dense ? 'small' : 'medium'}
					>
						<EnhancedTableHead
							numSelected={selected.length}
							order={order}
							orderBy={orderBy}
							onRequestSort={handleRequestSort}
							rowCount={rows.length}
						/>
						<TableBody>
							{stableSort(rows, getSorting(order, orderBy))
								.map(row => {
									const isItemSelected = isSelected(row.name);
									return (
										<TableRow
											hover
											onClick={event => handleClick(event, row)}
											aria-checked={isItemSelected}
											tabIndex={-1}
											key={row.name}
											selected={isItemSelected}
										>
											<TableCell>
												<LikeCount liked={row.likedByUser} likes={row.likes}/>
											</TableCell>
											<TableCell component="th" scope="row" padding="none">
												{row.name}
											</TableCell>
											<TableCell align="left">{row.creator}</TableCell>
											<TableCell align="left">{kind(row.kind)}</TableCell>
											<TableCell align="left">{row.difficulty}</TableCell>
											<TableCell align="left">{row.date}</TableCell>
											<TableCell align="left">{row.value}</TableCell>
											<TableCell align="left">{row.status}</TableCell>
											<TableCell align="center">
												<Button variant="contained"
												        color={"primary"}
												        className={classes.button}>
													<Forum fontSize={"large"}/>
												</Button>
											</TableCell>
										</TableRow>
									);
								})}
						</TableBody>
					</Table>
				</div>
			</Paper>
			<Grid container justify={"flex-end"}>
				<FormControlLabel
					control={<Switch checked={dense} onChange={handleChangeDense}/>}
					label="Reduce"
				/>
			</Grid>
			<PlayModeDialogue enigma={enigmaClicked ? enigmaClicked : "undefined"} open={open}
			                  onOpen={handleClickDialogueOpen} onClose={handleDialogueClose}/>
		</div>
	);
}

export default EnhancedTable;