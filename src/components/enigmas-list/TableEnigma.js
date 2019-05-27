import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import {Table, TableBody, TableCell, TableHead, TablePagination, TableRow, TableSortLabel} from '@material-ui/core';
import {Toolbar, Typography, Paper, IconButton, FormControlLabel, Switch, Button} from '@material-ui/core';

import {ThumbUp, Forum} from "@material-ui/icons";
import {lighten} from '@material-ui/core/styles/colorManipulator';

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
	{id: 'likes', numeric: true, disablePadding: false, label: "Likes"},
	{id: 'name', numeric: false, disablePadding: true, label: 'Name'},
	{id: 'creator', numeric: true, disablePadding: false, label: 'Creator'},
	{id: 'kind', numeric: true, disablePadding: false, label: 'Kind'},
	{id: 'difficulty', numeric: true, disablePadding: false, label: 'Level'},
	{id: 'date', numeric: true, disablePadding: false, label: "Date"},
	{id: 'status', numeric: true, disablePadding: false, label: "Date"},
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
						align={row.numeric ? 'right' : 'left'}
						padding={row.disablePadding ? 'none' : 'default'}
						sortDirection={orderBy === row.id ? order : false}
					>
						<TableSortLabel
							active={orderBy === row.id}
							direction={order}
							onClick={createSortHandler(row.id)}
						>
							{row.label}
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
	onSelectAllClick: PropTypes.func.isRequired,
	order: PropTypes.string.isRequired,
	orderBy: PropTypes.string.isRequired,
	rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles(theme => ({
	root: {
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(1),
	},
	highlight:
		theme.palette.type === 'light'
			? {
				color: theme.palette.secondary.main,
				backgroundColor: lighten(theme.palette.secondary.light, 0.85),
			}
			: {
				color: theme.palette.text.primary,
				backgroundColor: theme.palette.secondary.dark,
			},
	spacer: {
		flex: '1 1 100%',
	},
	actions: {
		color: theme.palette.text.secondary,
	},
	title: {
		flex: '0 0 auto',
	},
}));

const EnhancedTableToolbar = props => {
	const classes = useToolbarStyles();
	const {numSelected} = props;
	
	return (
		<Toolbar
			className={clsx(classes.root, {
				[classes.highlight]: numSelected > 0,
			})}
		>
			<div className={classes.title}>
				{numSelected > 0 ? (
					<Typography color="inherit" variant="subtitle1">
						{numSelected} selected
					</Typography>
				) : (
					<Typography variant="h6" id="tableTitle">
						Nutrition
					</Typography>
				)}
			</div>
		</Toolbar>
	);
};

EnhancedTableToolbar.propTypes = {
	numSelected: PropTypes.number.isRequired,
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
		minWidth: 750,
	},
	tableWrapper: {
		overflowX: 'auto',
	},
	rightIcon: {
		marginLeft: theme.spacing(1),
	}
}));

function EnhancedTable() {
	const classes = useStyles();
	const [order, setOrder] = React.useState('asc');
	const [orderBy, setOrderBy] = React.useState('calories');
	const [selected, setSelected] = React.useState([]);
	const [page, setPage] = React.useState(0);
	const [dense, setDense] = React.useState(false);
	
	const [liked] = React.useState(false);
	
	
	function handleRequestSort(event, property) {
		const isDesc = orderBy === property && order === 'desc';
		setOrder(isDesc ? 'asc' : 'desc');
		setOrderBy(property);
	}
	
	function handleSelectAllClick(event) {
		if (event.target.checked) {
			const newSelecteds = rows.map(n => n.name);
			setSelected(newSelecteds);
			return;
		}
		setSelected([]);
	}
	
	function handleClick(event, name) {
		const selectedIndex = selected.indexOf(name);
		let newSelected = [];
		
		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, name);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1),
			);
		}
		
		setSelected(newSelected);
	}
	
	function handleChangeDense(event) {
		setDense(event.target.checked);
	}
	
	const isSelected = name => selected.indexOf(name) !== -1;
	
	return (
		<div className={classes.root}>
			<Paper className={classes.paper}>
				<EnhancedTableToolbar numSelected={selected.length}/>
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
							onSelectAllClick={handleSelectAllClick}
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
											onClick={event => handleClick(event, row.name)}
											role="checkbox"
											aria-checked={isItemSelected}
											tabIndex={-1}
											key={row.name}
											selected={isItemSelected}
										>
											<TableCell>
												<Button variant="contained"
												        color={row.likedByUser ? "green" : "primary"}
												        className={classes.button}>
													{row.likes}
													<ThumbUp className={classes.rightIcon}>send</ThumbUp>
												</Button>
											</TableCell>
											<TableCell component="th" scope="row" padding="none">
												{row.name}
											</TableCell>
											<TableCell align="right">{row.name}</TableCell>
											<TableCell align="right">{row.creator}</TableCell>
											<TableCell align="right">{row.kind}</TableCell>
											<TableCell align="right">{row.difficulty}</TableCell>
											<TableCell align="right">{row.date}</TableCell>
											<TableCell align="right">{row.value}</TableCell>
											<TableCell align="right">{row.status}</TableCell>
											<TableCell align="right">
												<Forum fontSize={"large"}/>
											</TableCell>
										</TableRow>
									);
								})}
						</TableBody>
					</Table>
				</div>
			</Paper>
			<FormControlLabel
				control={<Switch checked={dense} onChange={handleChangeDense}/>}
				label="Dense padding"
			/>
		</div>
	);
}

export default EnhancedTable;