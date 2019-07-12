import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TablePagination,
	TableRow,
	TableHead,
	IconButton,
	Paper
} from '@material-ui/core'
import FirstPage from '@material-ui/icons/FirstPage'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import LastPage from '@material-ui/icons/LastPage'
import CheckRounded from '@material-ui/icons/CheckRounded'
import MoreHorizRounded from '@material-ui/icons/MoreHorizRounded'

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
					{theme.direction === 'rtl' ? <LastPage /> : <FirstPage />}
				</IconButton>
				<IconButton
					onClick={this.handleBackButtonClick}
					disabled={page === 0}
					aria-label="Previous Page">
					{theme.direction === 'rtl' ? (
						<KeyboardArrowRight />
					) : (
						<KeyboardArrowLeft />
					)}
				</IconButton>
				<IconButton
					onClick={this.handleNextButtonClick}
					disabled={page >= Math.ceil(count / rowsPerPage) - 1}
					aria-label="Next Page">
					{theme.direction === 'rtl' ? (
						<KeyboardArrowLeft />
					) : (
						<KeyboardArrowRight />
					)}
				</IconButton>
				<IconButton
					onClick={this.handleLastPageButtonClick}
					disabled={page >= Math.ceil(count / rowsPerPage) - 1}
					aria-label="Last Page">
					{theme.direction === 'rtl' ? <FirstPage /> : <LastPage />}
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

const styles = theme => ({
	root: {
		marginLeft: theme.spacing(3),
		marginRight: theme.spacing(3),
		marginBottom: theme.spacing(3)
	},
	table: {
		minWidth: 500
	},
	tableWrapper: {
		overflowX: 'auto'
	}
})

class TabUnresolvedEnigmas extends React.Component {
	// formatDate = "HH:mm DD-MM-YY";
	state = {
		rows: [],
		page: 0,
		rowsPerPage: 5
	}
	async componentDidMount() {
		const res = await this.props.enigmaService.getTriedEnigmas(
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
								Énigmes non résolues
							</TableCell>
							<TableCell align="left" style={{ height: 26 }}>
								Date du dernier essai
							</TableCell>
							<TableCell />
						</TableHead>
						<TableBody>
							{rows
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map(row => (
									<TableRow
										key={row.id}
										style={{ height: 36, cursor: 'pointer' }}
										onClick={() => {
											this.props.history.push({
												pathname: '/enigma',
												state: {
													type: row.type,
													enigma: row
												}
											})
										}}
										hover>
										<TableCell component="th" scope="row">
											{row.name}
										</TableCell>
										<TableCell align="left">
											{this.formatDate(row.lastTryDate)}
										</TableCell>
										<TableCell align={'right'}>
											{row.resolved === true ? (
												<CheckRounded />
											) : (
												<MoreHorizRounded />
											)}
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

TabUnresolvedEnigmas.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(TabUnresolvedEnigmas)
