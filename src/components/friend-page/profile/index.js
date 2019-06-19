import React from 'react'

import { withStyles } from '@material-ui/core/styles'

import { Button, Grid, Tooltip, Typography, Paper } from '@material-ui/core'

import Avatar from '@material-ui/core/Avatar'
import { DonutSmall, CompareArrows } from '@material-ui/icons'

import { mapUserStatusColor } from '../../../model/User'

import TableEnigmas from './TableEnigmas'
import { StatsTable } from '../../../common'

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

class ProfileFriend extends React.Component {
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
						<Grid item>
							<Tooltip title={status}>
								<DonutSmall
									style={{ color: mapUserStatusColor.get(status) }}
									className={classes.statusIcon}
								/>
							</Tooltip>
						</Grid>
						<Grid item xs>
							<Typography gutterBottom variant="h4" align={'center'}>
								{pseudo}
							</Typography>
						</Grid>
						<Grid item>
							<Avatar
								alt={pseudo}
								src={
									profilePicture
										? profilePicture
										: process.env.PUBLIC_URL +
										  '/img/default-profile-picture.png'
								}
								className={classes.avatar}
							/>
						</Grid>
					</Grid>
					<Button
						variant="contained"
						color="primary"
						className={classes.button}>
						Compare
						<CompareArrows className={classes.buttonRightIcon} />
					</Button>
				</Paper>
				<StatsTable />
				<TableEnigmas />
			</div>
		)
	}
}

export default withStyles(styles)(ProfileFriend)
