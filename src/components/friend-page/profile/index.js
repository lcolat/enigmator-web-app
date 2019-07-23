import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Avatar from '@material-ui/core/Avatar'
import DonutSmall from '@material-ui/icons/DonutSmall'
import CompareArrows from '@material-ui/icons/CompareArrows'
import { mapUserStatusColor, listUserStatus } from '../../../model/User'
import DoneEnigmasList from './DoneEnigmasList'
import { StatsTable } from '../../../common'
import { playMode } from '../../../model/Enigma'
import {
	createNotification,
	LEVEL_NOTIF as Level
} from 'services/notifications'
import { SERVER_URL } from '../../../config'

const styles = theme => ({
	root: {
		marginTop: theme.spacing(3),
		marginLeft: theme.spacing(3),
		marginRight: theme.spacing(3)
	},
	avatar: {
		margin: theme.spacing(),
		width: 120,
		height: 120
	},
	statusIcon: {
		margin: theme.spacing(),
		width: 30,
		height: 30
	},
	button: {
		margin: theme.spacing()
	},
	rightIcon: {
		marginLeft: theme.spacing()
	},
	buttonRightIcon: {
		marginLeft: theme.spacing()
	}
})

function getMTotalScore(rows) {
	let scoreTotal = 0
	rows.map(row => (scoreTotal += row.score))
	return scoreTotal
}

function getTotalWin(rows) {
	let winTotal = 0
	rows.map(row => (winTotal += row.win))
	return winTotal
}

function createData(type, rank, score, win) {
	return { type, rank, score, win }
}

const rows = [
	createData(playMode[0], 31, 2540, 110),
	createData(playMode[0], 110, 102, 31),
	createData(playMode[0], 450, 87, 24)
]

rows.push(createData('Global', 127, getMTotalScore(rows), getTotalWin(rows)))

class ProfileFriend extends React.Component {
	state = { compare: false, userStats: {} }

	handleCompare = () => {
		this.setState({ compare: !this.state.compare })
	}
	componentDidMount = async () => {
		try {
			const res = await this.props.userService.getStats(
				this.props.userService.id
			)
			this.setState({ userStats: res })
		} catch (err) {
			createNotification({
				level: Level.ERROR,
				message: err.message
			})
		}
	}
	render() {
		const { classes } = this.props
		const friend = this.props.location.state.friend
		const profilePicture =
			friend.profilePicture !== undefined &&
			`${SERVER_URL}/Containers/profile/download/${friend.profilePicture}`
		return (
			<>
				<Paper className={classes.root}>
					<Grid
						container
						direction={'row'}
						justify={'space-between'}
						alignItems={'center'}>
						<Grid item xs>
							<Grid
								container
								direction={'row'}
								alignItems={'center'}
								justify={'center'}>
								<Grid item>
									<Typography variant="h4">{friend.username}</Typography>
								</Grid>
							</Grid>
						</Grid>
						<Grid item>
							<Avatar
								alt={friend.username}
								src={
									profilePicture
										? profilePicture
										: process.env.PUBLIC_URL +
										  '/img/default-profile-picture.jpg'
								}
								className={classes.avatar}
							/>
						</Grid>
					</Grid>
					<Grid item>
						<Grid container justify={'flex-end'}>
							<Button
								variant="contained"
								color="primary"
								className={classes.button}
								onClick={this.handleCompare}>
								Compare
								<CompareArrows className={classes.buttonRightIcon} />
							</Button>
						</Grid>
					</Grid>
				</Paper>
				<StatsTable
					friendStats={friend.stats}
					currentUserStats={this.state.userStats}
					isCompared={this.state.compare}
				/>
				<DoneEnigmasList
					enigmaService={this.props.enigmaService}
					friendId={friend.id}
				/>
			</>
		)
	}
}

//const { classes, pseudo, profilePicture, status } = this.props
ProfileFriend.propTypes = {
	classes: PropTypes.object.isRequired,
	pseudo: PropTypes.string.isRequired,
	profilePicture: PropTypes.string,
	status: PropTypes.oneOf(listUserStatus).isRequired
}

export default withStyles(styles)(ProfileFriend)
