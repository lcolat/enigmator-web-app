import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'

import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TablePagination,
	TableRow,
	TableHead
} from '@material-ui/core'
import { IconButton, Paper } from '@material-ui/core'

import {
	FirstPage,
	KeyboardArrowLeft,
	KeyboardArrowRight,
	LastPage,
	DeleteForever
} from '@material-ui/icons'

const actionsStyles = theme => ({})

class TablePaginationActions extends React.Component {
	handleFirstPageButtonClick = event => {
		this.props.onChangePage(event, 0)
	}

	handleBackButtonClick = event => {
		this.props.onChangePage(event, this.props.page - 1)
	}

	handleNextButtonClick = event => {
		this.props.onChangePage(event, this.props.page + 1)
	}

	handleLastPageButtonClick = event => {
		this.props.onChangePage(
			event,
			Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1)
		)
	}

	render() {
		const { classes, count, page, rowsPerPage, theme } = this.props

		return (
			<div className={classes.root}>
				<IconButton
					onClick={this.handleFirstPageButtonClick}
					disabled={page === 0}
					aria-label="First Page">
					{theme.direction === 'rtl' ? (
						<LastPage fontSize={'small'} />
					) : (
						<FirstPage fontSize={'small'} />
					)}
				</IconButton>
				<IconButton
					onClick={this.handleBackButtonClick}
					disabled={page === 0}
					aria-label="Previous Page">
					{theme.direction === 'rtl' ? (
						<KeyboardArrowRight fontSize={'small'} />
					) : (
						<KeyboardArrowLeft fontSize={'small'} />
					)}
				</IconButton>
				<IconButton
					onClick={this.handleNextButtonClick}
					disabled={page >= Math.ceil(count / rowsPerPage) - 1}
					aria-label="Next Page">
					{theme.direction === 'rtl' ? (
						<KeyboardArrowLeft fontSize={'small'} />
					) : (
						<KeyboardArrowRight fontSize={'small'} />
					)}
				</IconButton>
				<IconButton
					onClick={this.handleLastPageButtonClick}
					disabled={page >= Math.ceil(count / rowsPerPage) - 1}
					aria-label="Last Page">
					{theme.direction === 'rtl' ? (
						<FirstPage fontSize={'small'} />
					) : (
						<LastPage fontSize={'small'} />
					)}
				</IconButton>
			</div>
		)
	}
}

TablePaginationActions.propTypes = {
	classes: PropTypes.object.isRequired,
	count: PropTypes.number.isRequired,
	onChangePage: PropTypes.func.isRequired,
	page: PropTypes.number.isRequired,
	rowsPerPage: PropTypes.number.isRequired,
	theme: PropTypes.object.isRequired
}

const TablePaginationActionsWrapped = withStyles(actionsStyles, {
	withTheme: true
})(TablePaginationActions)

let counter = 0

function createData(nameEnigma, creationDate) {
	counter += 1
	return { id: counter, name: nameEnigma, date: creationDate }
}

const styles = theme => ({
	root: {
		marginLeft: theme.spacing(3),
		marginRight: theme.spacing(3),
		marginBottom: theme.spacing(3)
	},
	table: {
		minWidth: 500
	}
	// tableWrapper: {
	// 	overflowX: 'auto'
	// }
})

class TableListOwnEnigmas extends React.Component {
	state = {
		rows: [],
		page: 0,
		rowsPerPage: 5
	}
	async componentDidMount() {
		const res = await this.props.enigmaService.getUserEnigmas(
			this.props.userService.id
		)
		if (res) {
			this.setState({
				rows: res.sort((a, b) => (a.date < b.date ? -1 : 1))
			})
		}
	}
	formatDate(date) {
		return new Date(date).toLocaleDateString('fr-FR', {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		})
	}
	handleChangePage = (event, page) => {
		this.setState({ page })
	}

	handleChangeRowsPerPage = event => {
		this.setState({ page: 0, rowsPerPage: event.target.value })
	}

	render() {
		const { classes } = this.props
		const { rows, rowsPerPage, page } = this.state
		const emptyRows =
			rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage)

		return (
			<Paper className={classes.root}>
				<div className={classes.tableWrapper}>
					<Table className={classes.table}>
						<TableHead>
							<TableCell align="left" style={{ height: 26 }}>
								Enigmes créées
							</TableCell>
							<TableCell align="left" style={{ height: 26 }}>
								Date de création
							</TableCell>
							<TableCell align={'right'}> </TableCell>
						</TableHead>
						<TableBody>
							{rows
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map(row => (
									<TableRow key={row.id} hover>
										<TableCell component="th" scope="row">
											{row.name}
										</TableCell>
										<TableCell scope={'row'} align={'left'}>
											{this.formatDate(row.creationDate)}
										</TableCell>
										<TableCell align={'right'}>
											<IconButton>
												<DeleteForever fontSize={'small'} />
											</IconButton>
										</TableCell>
									</TableRow>
								))}
							{emptyRows > 0 && (
								<TableRow style={{ height: 36 * emptyRows }}>
									<TableCell colSpan={6} />
								</TableRow>
							)}
						</TableBody>
						<TableFooter className={classes.footer}>
							<TableRow className={classes.footer}>
								<TablePagination
									rowsPerPageOptions={[]}
									colSpan={3}
									count={rows.length}
									rowsPerPage={rowsPerPage}
									page={page}
									SelectProps={{
										native: true
									}}
									onChangePage={this.handleChangePage}
									onChangeRowsPerPage={this.handleChangeRowsPerPage}
									ActionsComponent={TablePaginationActionsWrapped}
									style={{ padding: 0, margin: 0 }}
								/>
							</TableRow>
						</TableFooter>
					</Table>
				</div>
			</Paper>
		)
	}
}

TableListOwnEnigmas.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(TableListOwnEnigmas)
