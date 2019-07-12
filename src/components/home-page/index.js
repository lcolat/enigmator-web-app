import React from 'react'
import { Grid, withStyles, LinearProgress } from '@material-ui/core'

import UserStatsResume from './UserStatsResume'
import TabUnresolvedEnigmas from './TabUnresolvedEnigmas'
import EnigmasList from './EnigmasList'

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
	render() {
		const { classes } = this.props
		return (
			<div>
				<LinearProgress color="primary" />
				<Grid item>
					<Grid container direction={'row'}>
						<Grid item xs={12} sm={5} className={classes.userStats}>
							<UserStatsResume
								score={'1000'}
								winNumber={'2'}
								globalRank={'75'}
								localRank={'8'}
								history={this.props.history}
							/>
						</Grid>
						<Grid item xs className={classes.unresolvedEnigmas}>
							<TabUnresolvedEnigmas />
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12} className={classes.enigmasList}>
					<EnigmasList />
				</Grid>
			</div>
		)
	}
}

export default withStyles(styles)(HomePage)
