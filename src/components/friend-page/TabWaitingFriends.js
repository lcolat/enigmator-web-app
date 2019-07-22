import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core'
import {
	TableHead,
	TableRow,
	TableCell,
	TableSortLabel,
	Table,
	TableBody,
	Button
} from '@material-ui/core'
import { Tooltip, Paper } from '@material-ui/core'

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
	{ id: 'username', align: 'left', disablePadding: false, label: 'Pseudo' },
	{ id: 'country', align: 'left', disablePadding: false, label: 'Pays' },
	{ id: 'score', align: 'left', disablePadding: false, label: 'Score' },
	{},
	{}
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
		marginTop: theme.spacing(3),
		marginLeft: theme.spacing(3),
		marginRight: theme.spacing(3)
	},
	table: {
		//minWidth: 1020,
	},
	tableWrapper: {
		overflowX: 'auto'
	},
	buttonAccept: {
		color: '#4caf50'
	},
	buttonDeny: {
		color: '#c62828'
	}
})

class TableWaitingFriends extends React.Component {
	state = {
		order: 'asc',
		orderBy: 'rank',
		selected: [],
		//friends: this.props.data,
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

	handleAcceptRequest = async (event, id) => {
		await this.props.userService.acceptFriendRequest(id)
		this.props.fetchFriends()
		this.props.fetchWaitingFriends()
	}
	handleDenyRequest = async (event, id) => {
		await this.props.userService.denyFriendRequest(id)
		this.props.fetchWaitingFriends()
	}

	isSelected = id => this.state.selected.indexOf(id) !== -1

	render() {
		const { classes, waitingFriends } = this.props
		const { order, orderBy, selected } = this.state
		// console.log(this.props)
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
							rowCount={waitingFriends.length}
						/>
						<TableBody>
							{stableSort(waitingFriends, getSorting(order, orderBy)).map(
								row => {
									const isSelected = this.isSelected(row.id)
									return (
										<TableRow
											hover
											role="checkbox"
											aria-checked={isSelected}
											tabIndex={-1}
											key={row.id}
											selected={isSelected}>
											<TableCell align="left">{row.FROM.username}</TableCell>
											<TableCell align="left">{row.FROM.country}</TableCell>
											<TableCell align="left">{row.FROM.score}</TableCell>
											<TableCell align="left">
												<Button
													className={classes.buttonAccept}
													color={'secondary'}
													onClick={event => {
														this.handleAcceptRequest(event, row.FROM.id)
													}}>
													Accepter
												</Button>
											</TableCell>

											<TableCell align="left">
												<Button
													className={classes.buttonDeny}
													color={'secondary'}
													onClick={event => {
														this.handleDenyRequest(event, row.FROM.id)
													}}>
													Refuser
												</Button>
											</TableCell>
										</TableRow>
									)
								}
							)}
						</TableBody>
					</Table>
				</div>
			</Paper>
		)
	}
}

TableWaitingFriends.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(TableWaitingFriends)
