import React from 'react'
import UserData from './UserData'
import { StatsTable } from '../../common'
import TableListEnigmasTried from './TableListEnigmasTried'
import TableListOwnEnigmas from './TableListOwnEnigmas'
import Paper from '@material-ui/core/Paper'
import withStyles from '@material-ui/core/styles/withStyles'
import style from './style'
import EnigmaService from 'services/enigmaService'

class Profile extends React.Component {
	state = { enigmaService: new EnigmaService() }
	render() {
		const { classes } = this.props
		return (
			<>
				<Paper className={classes.userData}>
					<UserData {...this.props} />
				</Paper>
				<Paper className={classes.ownEnigmas}>
					<StatsTable />
				</Paper>
				<TableListOwnEnigmas
					enigmaService={this.state.enigmaService}
					{...this.props}
				/>
				<TableListEnigmasTried
					enigmaService={this.state.enigmaService}
					{...this.props}
				/>
			</>
		)
	}
}
export default withStyles(style, { withTheme: true })(Profile)
