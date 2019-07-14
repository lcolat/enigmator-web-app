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
	Paper
} from '@material-ui/core'
import Subject from '@material-ui/icons/Subject'
import MusicNote from '@material-ui/icons/MusicNote'
import Photo from '@material-ui/icons/Photo'
import VideoLabel from '@material-ui/icons/VideoLabel'
import TablePaginationActions from './TablePaginationActions'
import { Difficulties } from 'model/Enigma'

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
	},
	tableWrapper: {
		overflowX: 'auto'
	}
})

class TabUnresolvedEnigmas extends React.Component {
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
			this.props.setEnigmasTriedLoaded(true)
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
	kind = value => {
		switch (value) {
			case 'text':
				return <Subject fontSize={'small'} />
			case 'audio':
				return <MusicNote fontSize={'small'} />
			case 'image':
				return <Photo fontSize={'small'} />
			case 'video':
				return <VideoLabel fontSize={'small'} />
			default:
				break
		}
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
							<TableCell id="username" align="left">
								Créateur
							</TableCell>
							<TableCell id="type" align="left">
								Type
							</TableCell>
							<TableCell id="difficulty" align="left">
								Niveau
							</TableCell>
							<TableCell id="scoreReward" align="left">
								Points
							</TableCell>
							<TableCell align="left" style={{ height: 26 }}>
								Date du dernier essai
							</TableCell>
						</TableHead>
						<TableBody>
							{rows
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map(row => (
									<TableRow
										key={row.id}
										style={{ height: 48, cursor: 'pointer' }}
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
											{row.Enigme_User.username}
										</TableCell>
										<TableCell align="left">{this.kind(row.type)}</TableCell>
										<TableCell align="left">
											{Difficulties(row.scoreReward)}
										</TableCell>
										<TableCell align="left">{row.scoreReward}</TableCell>
										<TableCell align="left">
											{this.formatDate(row.lastTryDate)}
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
									colSpan={6}
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
