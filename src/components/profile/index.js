import React from 'react'
import UserData from './UserData'
import { StatsTable } from '../../common'
import TableListEnigmasTried from './TableListEnigmasTried'
import TableListOwnEnigmas from './TableListOwnEnigmas'
import DoneEnigmasList from './DoneEnigmasList'
import Paper from '@material-ui/core/Paper'
import withStyles from '@material-ui/core/styles/withStyles'
import style from './style'
import EnigmaService from 'services/enigmaService'
import Loader from 'components/loader'
class Profile extends React.Component {
	state = {
		enigmaService: new EnigmaService(),
		loaded: true,
		userDataLoaded: false,
		ownEnigmasLoaded: false,
		enigmasTriedLoaded: false,
		enigmasDoneLoaded: false
	}

	setUserDataLoaded = value => {
		this.setState({
			userDataLoaded: value,
			loaded:
				value &&
				this.state.ownEnigmasLoaded &&
				this.state.enigmasTriedLoaded &&
				this.state.enigmasDoneLoaded
		})
	}
	setOwnEnigmasLoaded = value => {
		this.setState({
			ownEnigmasLoaded: value,
			loaded:
				value &&
				this.state.userDataLoaded &&
				this.state.enigmasTriedLoaded &&
				this.state.enigmasDoneLoaded
		})
	}
	setEnigmasTriedLoaded = value => {
		this.setState({
			enigmasTriedLoaded: value,
			loaded:
				value &&
				this.state.ownEnigmasLoaded &&
				this.state.userDataLoaded &&
				this.state.enigmasDoneLoaded
		})
	}
	setEnigmasDoneLoaded = value => {
		this.setState({
			enigmasDoneLoaded: value,
			loaded:
				value &&
				this.state.ownEnigmasLoaded &&
				this.state.enigmasTriedLoaded &&
				this.state.userDataLoaded
		})
	}

	render() {
		const { classes } = this.props
		return (
			<Loader loaded={this.state.loaded}>
				<>
					<Paper className={classes.userData}>
						<UserData
							{...this.props}
							setUserDataLoaded={this.setUserDataLoaded}
						/>
					</Paper>
					<Paper className={classes.ownEnigmas}>
						<StatsTable />
					</Paper>
					<TableListOwnEnigmas
						enigmaService={this.state.enigmaService}
						{...this.props}
						setOwnEnigmasLoaded={this.setOwnEnigmasLoaded}
					/>
					<TableListEnigmasTried
						enigmaService={this.state.enigmaService}
						{...this.props}
						setEnigmasTriedLoaded={this.setEnigmasTriedLoaded}
					/>
					<DoneEnigmasList
						enigmaService={this.state.enigmaService}
						{...this.props}
						setEnigmasDoneLoaded={this.setEnigmasDoneLoaded}
					/>
				</>
			</Loader>
		)
	}
}
export default withStyles(style, { withTheme: true })(Profile)
