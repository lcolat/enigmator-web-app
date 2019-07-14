import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableFooter from '@material-ui/core/TableFooter'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import FirstPage from '@material-ui/icons/FirstPage'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import LastPage from '@material-ui/icons/LastPage'
import TableHead from '@material-ui/core/TableHead'
import { FormatDate } from 'common/'

const actionsStyles = theme => ({
	root: {
		flexShrink: 0,
		color: theme.palette.text.secondary,
		marginLeft: theme.spacing(2.5)
	}
})

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

let counter = 0

function createData(nameEnigma, dateLastTry) {
	counter += 1
	return { id: counter, name: nameEnigma, date: dateLastTry }
}

const styles = theme => ({
	root: {
		width: '100%'
	},
	table: {
		minWidth: 500
	},
	tableWrapper: {
		overflowX: 'auto'
	}
})

const theme = createMuiTheme({
	overrides: {
		MuiTableRow: {
			root: {
				//for the body
				height: '100%'
			},
			head: {
				//for the head
				height: '100%'
			},
			footer: {
				'& > td > div': {
					height: '50%',
					minHeight: '50%'
				},
				// backgroundColor: "grey",
				height: '50%'
			}
		}
	}
})

class TabUnresolvedEnigmas extends React.Component {
	state = {
		page: 0,
		rowsPerPage: 4
	}

	handleChangePage = (event, page) => {
		this.setState({ page })
	}

	handleChangeRowsPerPage = event => {
		this.setState({ page: 0, rowsPerPage: event.target.value })
	}

	render() {
		const { classes, enigmas } = this.props
		const { rows, rowsPerPage, page } = this.state
		const emptyRows =
			rowsPerPage - Math.min(rowsPerPage, enigmas.length - page * rowsPerPage)

		return (
			<MuiThemeProvider theme={theme}>
				<Paper className={classes.root}>
					<div className={classes.tableWrapper}>
						<Table className={classes.table}>
							<TableHead>
								<TableCell align="left" style={{ height: 26 }}>
									Énigmes non résolues
								</TableCell>
								<TableCell align="right" style={{ height: 26 }}>
									Date du dernier essai
								</TableCell>
							</TableHead>
							<TableBody>
								{enigmas
									.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
									.map(row => (
										<TableRow
											key={row.id}
											style={{ height: 48, cursor: 'pointer' }}
											onClick={() => {
												alert('Soon able to go to the enigma :)')
											}}
											hover>
											<TableCell component="th" scope="row">
												{row.name}
											</TableCell>
											<TableCell align="right">
												{FormatDate(row.lastTryDate)}
											</TableCell>
										</TableRow>
									))}
								{emptyRows > 0 && (
									<TableRow style={{ height: 48 * emptyRows }}>
										<TableCell colSpan={6} />
									</TableRow>
								)}
							</TableBody>
							<TableFooter className={classes.footer}>
								<TableRow className={classes.footer}>
									<TablePagination
										rowsPerPageOptions={[]}
										colSpan={3}
										count={enigmas.length}
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
			</MuiThemeProvider>
		)
	}
}

TabUnresolvedEnigmas.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(TabUnresolvedEnigmas)
