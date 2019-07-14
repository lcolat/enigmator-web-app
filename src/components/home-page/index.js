import React from 'react'
import { Grid, withStyles } from '@material-ui/core'

import UserStatsResume from './UserStatsResume'
import TabUnresolvedEnigmas from './TabUnresolvedEnigmas'
import EnigmasList from './EnigmasList'
import {
	createNotification,
	LEVEL_NOTIF as Level
} from 'services/notifications'

const styles = theme => ({
	userStats: { margin: theme.spacing(3) },
	unresolvedEnigmas: {
		marginTop: theme.spacing(3),
		marginRight: theme.spacing(3),
		marginBottom: theme.spacing(3)
	},
	enigmasList: {
		marginLeft: theme.spacing(3),
		marginRight: theme.spacing(3),
		marginBottom: theme.spacing(3)
	}
})

class HomePage extends React.Component {
	state = { loaded: false, userStats: {}, enigmas: [] }
	isLoaded() {
		this.setState({ loaded: true })
	}

	fetchStats = async () => {
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
	fetchEnigmas = async () => {
		try {
			const res = await this.props.enigmaService.getEnigmas(true)
			this.setState({ enigmas: res })
		} catch (err) {
			createNotification({
				level: Level.ERROR,
				message: err.message
			})
		}
	}
	componentDidMount = () => {
		this.fetchStats()
		this.fetchEnigmas()
	}
	render() {
		const { classes } = this.props
		return (
			<>
				<Grid item container direction={'row'}>
					<Grid item xs={12} sm={5} className={classes.userStats}>
						<UserStatsResume
							score={this.state.userStats.score}
							winNumber={'2'}
							globalRank={this.state.userStats.globalRank}
							localRank={this.state.userStats.localRank}
							history={this.props.history}
							country={this.state.userStats.country}
						/>
					</Grid>
					<Grid item xs className={classes.unresolvedEnigmas}>
						<TabUnresolvedEnigmas />
					</Grid>
				</Grid>
				<Grid item xs={12} className={classes.enigmasList}>
					<EnigmasList
						history={this.props.history}
						enigmas={this.state.enigmas}
					/>
				</Grid>
			</>
		)
	}
}

export default withStyles(styles)(HomePage)
