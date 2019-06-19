import React from 'react'
import { Grid, withStyles } from '@material-ui/core'

import UserStatsResume from './UserStatsResume'
import TabUnresolvedEnigmas from './TabUnresolvedEnigmas'
import EnigmasList from './EnigmasList'
import DailyMessage from './DailyMessage'

const styles = theme => ({});

class HomePage extends React.Component {
	render() {
		document.body.style.backgroundColor = 'white';
		return (
			<div>
				<Grid item>
					<Grid container direction={'row'} spacing={2}>
						<Grid item xs={12} sm={5}>
							<UserStatsResume
								score={'1000'}
								winNumber={'2'}
								globalRank={'75'}
								localRank={'8'}
							/>
						</Grid>
						<Grid item xs>
							<TabUnresolvedEnigmas />
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12}>
					<DailyMessage
						message={
							'This is a test for the daily message, i want to see how it will be wrapped and if it will.'
						}
					/>
				</Grid>
				<Grid item xs={12}>
					<EnigmasList />
				</Grid>
			</div>
		)
	}
}

export default withStyles(styles)(HomePage)
