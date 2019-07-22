import React from 'react'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'
import { Tab, Typography, Grid } from '@material-ui/core'
import AddFriendButton from './AddFriendButton'

const styles = theme => ({
	root: {
		margin: theme.spacing(3),
		maxWidth: '100%'
	},
	rootButton: {
		// marginTop: theme.spacing(2)
	}
})

const tabType = ['ALL', 'SOLO', 'MULTI', 'BATTLE']

class TabChooser extends React.Component {
	state = {
		value: 0
	}

	handleChange = (event, value) => {
		this.setState({ value })
		this.props.changeTable(tabType[value])
	}

	render() {
		const { classes, friendList, handleChange } = this.props

		return (
			<Paper className={classes.root}>
				<Grid container direction={'row'} justify="center" alignItems="center">
					<Grid item>
						<Typography variant="h4">Amis</Typography>
					</Grid>
					{/* <Tabs
						value={this.state.value}
						onChange={handleChange}
						variant="fullWidth"
						indicatorColor="secondary"
						textColor="secondary">
						<Tab icon={<AllInclusive />} label={tabType[0]} />
						<Tab icon={<Rowing />} label={tabType[1]} />
						<Tab icon={<SupervisedUserCircle />} label={tabType[2]} />
						<Tab icon={<Whatshot />} label={tabType[3]} />
					</Tabs>
					<SearchPick suggestions={friendList} /> */}
					<Grid item>
						<Grid
							container
							alignItems={'flex-end'}
							className={classes.rootButton}>
							<Grid item>
								<AddFriendButton userService={this.props.userService} />
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Paper>
		)
	}
}

TabChooser.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(TabChooser)
