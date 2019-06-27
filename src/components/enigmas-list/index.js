import React, { Component } from 'react'
import {
	Paper,
	FormControlLabel,
	Switch,
	Button,
	Grid,
	Table,
	TableBody,
	TableCell,
	TableRow
} from '@material-ui/core'
import { Forum, Subject, Photo, MusicNote } from '@material-ui/icons'
import { withStyles } from '@material-ui/core/styles'
import style from './style'
import EnigmasTableHead from './enigmas-table-head'
import PlayModeDialogue from './play-mode'
import { LikeCount } from '../../common'
import {
	createNotification,
	LEVEL_NOTIF as Level
} from 'services/notifications'
import EnigmaService from 'services/enigmaService'

class EnigmasList extends Component {
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

	isSelected = name => this.state.selected.indexOf(name) !== -1

	kind = value => {
		switch (value) {
			case 'text':
				return <Subject fontSize={'small'} />
			case 'audio':
				return <MusicNote fontSize={'small'} />
			case 'image':
				return <Photo fontSize={'small'} />
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
									const isItemSelected = this.isSelected(enigma.name)
									return (
										<TableRow
											hover
											onClick={event => this.handleClick(event, enigma)}
											aria-checked={isItemSelected}
											tabIndex={-1}
											key={enigma.id}
											selected={isItemSelected}>
											<TableCell>
												<LikeCount
													liked={'enigma.likedByUser'}
													likes={'enigma.likes'}
												/>
											</TableCell>
											<TableCell component="th" scope="row" padding="none">
												{enigma.name}
											</TableCell>
											<TableCell align="left">{'enigma.creator'}</TableCell>
											<TableCell align="left">
												{this.kind(enigma.type)}
											</TableCell>
											<TableCell align="left">{'enigma.difficulty'}</TableCell>
											<TableCell align="left">{'enigma.date'}</TableCell>
											<TableCell align="left">{enigma.scoreReward}</TableCell>
											<TableCell align="left">{'enigma.status'}</TableCell>
											<TableCell align="center">
												<Button
													variant="contained"
													color={'primary'}
													className={classes.button}>
													<Forum fontSize={'large'} />
												</Button>
											</TableCell>
										</TableRow>
									)
								})}
							</TableBody>
						</Table>
					</div>
				</Paper>
				<PlayModeDialogue
					enigma={
						this.state.enigmaClicked ? this.state.enigmaClicked : 'undefined'
					}
					open={this.state.open}
					onOpen={this.state.handleClickDialogueOpen}
					onClose={this.state.handleDialogueClose}
				/>
			</div>
		)
	}
}

export default withStyles(style, { withTheme: true })(EnigmasList)
