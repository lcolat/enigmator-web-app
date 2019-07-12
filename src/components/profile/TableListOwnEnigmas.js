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
import DeleteForever from '@material-ui/icons/DeleteForever'
import TablePaginationActions from './TablePaginationActions'

const actionsStyles = theme => ({})

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
