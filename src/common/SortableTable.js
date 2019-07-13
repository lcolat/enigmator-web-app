import React from 'react'
import PropTypes from 'prop-types'
import makeStyles from '@material-ui/core/styles/makeStyles'
import {
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	TableSortLabel,
	Table,
	Tooltip,
	FormControlLabel,
	Paper,
	Switch
} from '@material-ui/core'

function desc(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1
	}
	if (b[orderBy] > a[orderBy]) {
		return 1
	}
	return 0
}

function stableSort(array, cmp) {
	const stabilizedThis = array.map((el, index) => [el, index])
	stabilizedThis.sort((a, b) => {
		const order = cmp(a[0], b[0])
		if (order !== 0) return order
		return a[1] - b[1]
	})
	return stabilizedThis.map(el => el[0])
}

function getSorting(order, orderBy) {
	return order === 'desc'
		? (a, b) => desc(a, b, orderBy)
		: (a, b) => -desc(a, b, orderBy)
}

const useStyles = makeStyles(theme => ({}))

/// columnsHeader example :
// const columnsHeader = [
// 	{id: 'status', align: "center", disablePadding: true, label: ''},
// 	{id: 'rank', align: "left", disablePadding: false, label: 'Rank'},
// 	{id: 'pseudo', align: "left", disablePadding: false, label: 'Player'},
// 	{id: 'victory', align: "left", disablePadding: false, label: 'Win'},
// 	{id: 'score', align: "left", disablePadding: false, label: 'Score'},
// ];

function SortableTableHead(props) {
	const { order, orderBy, onRequestSort, columnsHeader } = props
	const createSortHandler = property => event => {
		onRequestSort(event, property)
	}

	return (
		<TableHead>
			<TableRow>
				{columnsHeader.map(row => (
					<TableCell
						key={row.id}
						align={row.align}
						padding={row.disablePadding ? 'none' : 'default'}
						sortDirection={orderBy === row.id ? order : false}>
						<Tooltip
							title="Sort"
							placement={row.align ? 'bottom-end' : 'bottom-start'}
							enterDelay={300}>
							<TableSortLabel
								active={orderBy === row.id}
								direction={order}
								onClick={createSortHandler(row.id)}>
								{row.label}
							</TableSortLabel>
						</Tooltip>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	)
}

SortableTableHead.propTypes = {
	onRequestSort: PropTypes.func.isRequired,
	order: PropTypes.string.isRequired,
	orderBy: PropTypes.string.isRequired
}

function SortableTable(props) {
	const { rowFormGenerator, columnsHeader, rows } = props
	const classes = useStyles()
	const [order, setOrder] = React.useState('asc')
	const [orderBy, setOrderBy] = React.useState('calories')
	const [dense, setDense] = React.useState(false)

	function handleRequestSort(event, property) {
		const isDesc = orderBy === property && order === 'desc'
		setOrder(isDesc ? 'asc' : 'desc')
		setOrderBy(property)
	}

	function handleChangeDense(event) {
		setDense(event.target.checked)
	}

	return (
		<div className={classes.root}>
			<Paper className={classes.paper}>
				<div className={classes.tableWrapper}>
					<Table
						className={classes.table}
						aria-labelledby="tableTitle"
						size={dense ? 'small' : 'medium'}>
						<SortableTableHead
							order={order}
							orderBy={orderBy}
							onRequestSort={handleRequestSort}
							columnsHeader={columnsHeader}
						/>
						<TableBody>
							{stableSort(rows, getSorting(order, orderBy)).map(
								(row, index) => {
									console.log(row)
									const labelId = `sortable-table-${index}`
									return rowFormGenerator(row, labelId)
								}
							)}
						</TableBody>
					</Table>
				</div>
			</Paper>
			<FormControlLabel
				control={<Switch checked={dense} onChange={handleChangeDense} />}
				label="Dense padding"
			/>
		</div>
	)
}

SortableTable.propTypes = {}

export default SortableTable
