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
import TableEnigmas from './TableEnigmas'
import { StatsTable } from '../../../common'
import { playMode } from '../../../model/Enigma'

const styles = theme => ({
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
	state = { compare: false }

	handleCompare = () => {
		this.setState({ compare: !this.state.compare })
	}

	render() {
		const { classes, pseudo, profilePicture, status } = this.props

		return (
			<div>
				<Paper>
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
									<Tooltip title={status}>
										<DonutSmall
											style={{ color: mapUserStatusColor.get(status) }}
											className={classes.statusIcon}
										/>
									</Tooltip>
								</Grid>
								<Grid item>
									<Typography variant="h4">{pseudo}</Typography>
								</Grid>
							</Grid>
						</Grid>
						<Grid item>
							<Avatar
								alt={pseudo}
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
				<StatsTable currentUserStats={rows} isCompared={this.state.compare} />
				<TableEnigmas />
			</div>
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
