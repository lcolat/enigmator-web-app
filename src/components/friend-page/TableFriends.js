import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core'
import {
	TableHead,
	TableRow,
	TableCell,
	TablePagination,
	TableSortLabel,
	Table,
	TableBody
} from '@material-ui/core'
import { Tooltip, Paper } from '@material-ui/core'
import { DonutSmall } from '@material-ui/icons'

import { mapUserStatusColor } from '../../model/User'

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

const rows = [
	{ id: 'status', align: 'center', disablePadding: true, label: '' },
	{ id: 'rank', align: 'left', disablePadding: false, label: 'Rank' },
	{ id: 'pseudo', align: 'left', disablePadding: false, label: 'Player' },
	{ id: 'victory', align: 'left', disablePadding: false, label: 'Win' },
	{ id: 'score', align: 'left', disablePadding: false, label: 'Score' }
]

class EnhancedTableHead extends React.Component {
	createSortHandler = property => event => {
		this.props.onRequestSort(event, property)
	}

	render() {
		const { order, orderBy } = this.props

		return (
			<TableHead>
				<TableRow>
					{rows.map(
						row => (
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
										onClick={this.createSortHandler(row.id)}>
										{row.label}
									</TableSortLabel>
								</Tooltip>
							</TableCell>
						),
						this
					)}
				</TableRow>
			</TableHead>
		)
	}
}

EnhancedTableHead.propTypes = {
	numSelected: PropTypes.number.isRequired,
	onRequestSort: PropTypes.func.isRequired,
	onSelectAllClick: PropTypes.func.isRequired,
	order: PropTypes.string.isRequired,
	orderBy: PropTypes.string.isRequired,
	rowCount: PropTypes.number.isRequired
}

const styles = theme => ({
	root: {
		width: '100%',
		marginTop: theme.spacing(2)
	},
	table: {
		//minWidth: 1020,
	},
	tableWrapper: {
		overflowX: 'auto'
	}
})

class TableFriends extends React.Component {
	state = {
		order: 'asc',
		orderBy: 'rank',
		selected: [],
		//data: this.props.data,
		page: 0
	}

	handleRequestSort = (event, property) => {
		const orderBy = property
		let order = 'desc'

		if (this.state.orderBy === property && this.state.order === 'desc') {
			order = 'asc'
		}

		this.setState({ order, orderBy })
	}

	handleSelectAllClick = event => {
		if (event.target.checked) {
			this.setState(state => ({ selected: state.data.map(n => n.id) }))
			return
		}
		this.setState({ selected: [] })
	}

	handleClick = (event, id) => {
		const { selected } = this.state
		const selectedIndex = selected.indexOf(id)
		let newSelected = []

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, id)
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1))
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1))
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1)
			)
		}

		this.setState({ selected: newSelected })
	}

	isSelected = id => this.state.selected.indexOf(id) !== -1

	render() {
		const { classes, data } = this.props
		const { order, orderBy, selected } = this.state

		return (
			<Paper className={classes.root}>
				<div className={classes.tableWrapper}>
					<Table className={classes.table} aria-labelledby="tableTitle">
						<EnhancedTableHead
							numSelected={selected.length}
							order={order}
							orderBy={orderBy}
							onSelectAllClick={this.handleSelectAllClick}
							onRequestSort={this.handleRequestSort}
							rowCount={data.length}
						/>
						<TableBody>
							{stableSort(data, getSorting(order, orderBy)).map(row => {
								const isSelected = this.isSelected(row.id)
								return (
									<TableRow
										hover
										onClick={event => this.handleClick(event, row.id)}
										role="checkbox"
										aria-checked={isSelected}
										tabIndex={-1}
										key={row.id}
										selected={isSelected}>
										<TableCell
											align={'center'}
											component="th"
											scope="row"
											padding="none">
											<Tooltip title={row.status}>
												<DonutSmall
													style={{ color: mapUserStatusColor.get(row.status) }}
												/>
											</Tooltip>
										</TableCell>
										<TableCell align="left">{row.rank}</TableCell>
										<TableCell align="left">{row.pseudo}</TableCell>
										<TableCell align="left">{row.victory}</TableCell>
										<TableCell align="left">{row.score}</TableCell>
									</TableRow>
								)
							})}
						</TableBody>
					</Table>
				</div>
			</Paper>
		)
	}
}

TableFriends.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(TableFriends)
