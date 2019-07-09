import React, { Component } from 'react'
import { Paper, Table, TableBody, TableCell, TableRow } from '@material-ui/core'
import { Subject, Photo, MusicNote, VideoLabel } from '@material-ui/icons'
import { withStyles } from '@material-ui/core/styles'
import style from './style'
import EnigmasTableHead from './enigmas-table-head'
import EnigmaDialog from './enigma-dialog'
import {
	createNotification,
	LEVEL_NOTIF as Level
} from 'services/notifications'
import EnigmaService from 'services/enigmaService'
import { Difficulties } from 'model/Enigma'

class EnigmasValidation extends Component {
	constructor(props) {
		super(props)
		this.state = {
			fileName: '',
			enigmaService: new EnigmaService(),
			enigmas: [],
			order: 'asc',
			orderBy: 'calories',
			selected: [],
			open: false,
			enigmaClicked: undefined
		}
	}
	async componentDidMount() {
		const res = await this.state.enigmaService.getEnigmas()
		if (res) {
			this.setState({ enigmas: res })
		} else {
			createNotification({
				level: Level.ERROR,
				message: res
			})
		}
	}

	desc = (a, b, orderBy) => {
		if (b[orderBy] < a[orderBy]) {
			return -1
		}
		if (b[orderBy] > a[orderBy]) {
			return 1
		}
		return 0
	}
	tableSort = (array, cmp) => {
		const stabilizedThis = array.map((el, index) => [el, index])
		stabilizedThis.sort((a, b) => {
			const order = cmp(a[0], b[0])
			if (order !== 0) return order
			return a[1] - b[1]
		})
		return stabilizedThis.map(el => el[0])
	}
	getSorting = (order, orderBy) => {
		return order === 'desc'
			? (a, b) => this.desc(a, b, orderBy)
			: (a, b) => -this.desc(a, b, orderBy)
	}

	handleRequestSort = (event, property) => {
		const isDesc =
			this.state.orderBy === property && this.state.order === 'desc'
		this.setState({ order: isDesc ? 'asc' : 'desc', orderBy: property })
	}
	handleClickDialogueOpen = () => {
		this.setState({ open: true })
	}

	handleDialogueClose = () => {
		this.setState({ open: false })
	}
	handleClick = (event, row) => {
		this.setState({ enigmaClicked: row })
		this.handleClickDialogueOpen()
	}
	formatDate(date) {
		return new Date(date).toLocaleDateString('fr-FR', {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		})
	}

	isSelected = name => this.state.selected.indexOf(name) !== -1

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
		const classes = this.props.classes
		document.body.style.backgroundColor = '#ae75e9'
		return (
			<div className={classes.root}>
				<Paper className={classes.paper}>
					<div className={classes.tableWrapper}>
						<Table
							className={classes.table}
							aria-labelledby="tableTitle"
							size="small">
							<EnigmasTableHead
								numSelected={this.state.selected.length}
								order={this.state.order}
								orderBy={this.state.orderBy}
								onRequestSort={this.handleRequestSort}
								rowCount={this.state.enigmas.length}
							/>
							<TableBody>
								{this.tableSort(
									this.state.enigmas,
									this.getSorting(this.state.order, this.state.orderBy)
								).map(enigma => {
									if (enigma.status === false) {
										const isItemSelected = this.isSelected(enigma.name)
										return (
											<TableRow
												hover
												onClick={event => this.handleClick(event, enigma)}
												aria-checked={isItemSelected}
												tabIndex={-1}
												key={enigma.id}
												selected={isItemSelected}>
												<TableCell
													align="left"
													component="th"
													scope="row"
													padding="none">
													{enigma.name}
												</TableCell>
												<TableCell align="left">
													{enigma.Enigme_User.username}
												</TableCell>
												<TableCell align="left">
													{this.kind(enigma.type)}
												</TableCell>
												<TableCell align="left">
													{Difficulties(enigma.scoreReward)}
												</TableCell>
												<TableCell align="left">
													{this.formatDate(enigma.creationDate)}
												</TableCell>
												<TableCell align="left">{enigma.scoreReward}</TableCell>
											</TableRow>
										)
									}
								})}
							</TableBody>
						</Table>
					</div>
				</Paper>
				{this.state.enigmaClicked !== undefined && (
					<EnigmaDialog
						{...this.props}
						enigma={this.state.enigmaClicked}
						open={this.state.open}
						onOpen={this.state.handleClickDialogueOpen}
						onClose={this.state.handleDialogueClose}
					/>
				)}
			</div>
		)
	}
}

export default withStyles(style, { withTheme: true })(EnigmasValidation)
