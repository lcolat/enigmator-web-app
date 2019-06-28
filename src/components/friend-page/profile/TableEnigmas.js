import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TablePagination,
	TableRow,
	TableHead, Typography
} from '@material-ui/core'
import { IconButton, Paper } from '@material-ui/core'

import {
	FirstPage,
	KeyboardArrowLeft,
	KeyboardArrowRight,
	LastPage
} from '@material-ui/icons'

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
		marginTop: theme.spacing(2),
		padding: theme.spacing()
	},
	table: {
		minWidth: 500
	},
	tableWrapper: {
		overflowX: 'auto'
	}
})

// const theme = theme => ({
// 	overrides: {
// 		MuiTableRow: {
// 			root: {
// 				//for the body
// 				height: '100%',
// 				marginTop:
// 			},
// 			head: {
// 				//for the head
// 				height: '100%'
// 			},
// 			footer: {
// 				'& > td > div': {
// 					height: '50%',
// 					minHeight: '50%'
// 				},
// 				// backgroundColor: "grey",
// 				height: '50%'
// 			}
// 		}
// 	}
// })

class TableEnigmas extends React.Component {
	// formatDate = "HH:mm DD-MM-YY";
	state = {
		rows: [
			createData('SuperEnigma', '23:36 10/05/19'),
			createData('GuessHerName', '10:01 10/04/19'),
			createData('Who have 4-2-3 paws?', '02:59 02/05/19'),
			createData('What did the third Dwarf take?', '23:10 10/05/19'),
			createData('hihihi', '01:59 07/05/18'),
			createData('Yolooo', '20:46 10/01/19'),
			createData('Palindromatique', '23:59 31/12/18'),
			createData('<><<><<>>>>', '09:00 11/11/17'),
			createData('Cachochachat', '03:33 03/03/19'),
			createData('Lollipop', '07:11 26/08/19'),
			createData('<^>v><<<^^v', '04:26 10/05/19'),
			createData('MIAM', '20:36 10/08/17'),
			createData(
				'Thanos has erase the half of this sentence...',
				'00:01 01/02/17'
			)
		].sort((a, b) => (a.date < b.date ? -1 : 1)),
		page: 0,
		rowsPerPage: 5
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

		return (
				<Paper className={classes.root}>
					<Typography variant={'h5'}>
						List of Enigmas
					</Typography>
					<div className={classes.tableWrapper}>
						<Table className={classes.table}>
							<TableBody>
								{rows
									.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
									.map(row => (
										<TableRow key={row.id} hover>
											<TableCell component="th" scope="row">
												{row.name}
											</TableCell>
											<TableCell scope={'row'} align={'right'}>
												{row.date}
											</TableCell>
										</TableRow>
									))}
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

TableEnigmas.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(TableEnigmas)
