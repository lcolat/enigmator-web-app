import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Forum from '@material-ui/icons/Forum'
import Subject from '@material-ui/icons/Subject'
import Photo from '@material-ui/icons/Photo'
import MusicNote from '@material-ui/icons/MusicNote'
import VideoLabel from '@material-ui/icons/VideoLabel'
import withStyles from '@material-ui/core/styles/withStyles'
import style from './style'
import EnigmasTableHead from './enigmas-table-head'
import PlayModeDialogue from './play-mode'
import { LikeCount } from '../../common'
import {
	createNotification,
	LEVEL_NOTIF as Level
} from 'services/notifications'
import EnigmaService from 'services/enigmaService'
import { Difficulties } from 'model/Enigma'
import { Typography } from '@material-ui/core'
import Loader from 'components/loader'

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
			enigmaClicked: undefined,
			loaded: false
		}
	}
	async componentDidMount() {
		const res = await this.state.enigmaService.getNotDoneEnigmas(
			this.props.userService.id
		)
		if (res) {
			this.setState({ enigmas: res, loaded: true })
		} else {
			createNotification({
				level: Level.ERROR,
				message: res
			})
		}
	}

	desc = (a, b, orderBy) => {
		if (orderBy === 'username') {
			if (b['Enigme_User']['username'] < a['Enigme_User']['username']) {
				return -1
			}
			if (b['Enigme_User']['username'] > a['Enigme_User']['username']) {
				return 1
			}
		} else if (orderBy === 'difficulty') {
			if (b['scoreReward'] < a['scoreReward']) {
				return -1
			}
			if (b['scoreReward'] > a['scoreReward']) {
				return 1
			}
		} else {
			if (b[orderBy] < a[orderBy]) {
				return -1
			}
			if (b[orderBy] > a[orderBy]) {
				return 1
			}
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
		this.props.history.push({
			pathname: '/enigma',
			state: {
				type: row.type,
				enigma: row
			}
		})
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
	likeEnigma = async enigma => {
		await this.state.enigmaService.likeEnigma(enigma.id)
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
		const classes = this.props.classes
		document.body.style.backgroundColor = '#ae75e9'
		return (
			<Loader loaded={this.state.loaded}>
				<div className={classes.root}>
					{this.state.enigmas.length > 0 ? (
						<>
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
																likeEnigma={() => {
																	this.likeEnigma(enigma)
																}}
																liked={'enigma.likedByUser'}
																likes={enigma.likes}
															/>
														</TableCell>
														<TableCell
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
														<TableCell align="left">
															{enigma.scoreReward}
														</TableCell>
													</TableRow>
												)
											})}
										</TableBody>
									</Table>
								</div>
							</Paper>

							<PlayModeDialogue
								{...this.props}
								enigma={
									this.state.enigmaClicked
										? this.state.enigmaClicked
										: 'undefined'
								}
								open={this.state.open}
								onOpen={this.state.handleClickDialogueOpen}
								onClose={this.state.handleDialogueClose}
							/>
						</>
					) : (
						<Paper className={classes.createEnigmaPaper}>
							<div className={classes.createEnigma}>
								<Typography>
									Pas de nouvelles Énigmes. <br />
									Mais vous pouvez en créer.
								</Typography>
								<Button
									variant="contained"
									color={'primary'}
									className={classes.button}
									onClick={() => {
										this.props.history.push({
											pathname: '/create-enigmas'
										})
									}}>
									Créer une nouvelle Énigme
								</Button>
							</div>
						</Paper>
					)}
				</div>
			</Loader>
		)
	}
}

export default withStyles(style, { withTheme: true })(EnigmasList)
