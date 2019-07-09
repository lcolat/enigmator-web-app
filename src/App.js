import React, { Component } from 'react'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import withStyles from '@material-ui/core/styles/withStyles'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Profile from 'components/profile/index'
import Authentication from 'components/login/authentication'
import ForgottentPassword from 'components/login/forgottenPassword'
import LogUp from 'components/login/logup'
import theme from './theme'
import PrivateRoute from './privateRoute'
import HomePage from 'components/home-page'
import FriendsView from 'components/friend-page'
import CreateEnigma from 'components/create-enigma'
import Enigma from 'components/enigmas-list/enigmas-play-ground'
import EnigmaList from 'components/enigmas-list'
import UserService from 'services/userService'
import EnigmaService from 'services/enigmaService'
import Settings from 'components/settings-page'
import EnigmasValidation from 'components/enigmas-validation'
import { NotificationContainer } from 'react-notifications'
import 'react-notifications/lib/notifications.css'

const styles = theme => ({
	app: {
		textAlign: 'center'
	}
})
class App extends Component {
	state = {
		userService: new UserService(),
		enigmaService: new EnigmaService()
	}

	render() {
		const { userService, enigmaService } = this.state
		const { classes } = this.props
		return (
			<BrowserRouter>
				<MuiThemeProvider theme={theme}>
					<div className={classes.app}>
						<Switch>
							<Route
								path="/login"
								render={props => (
									<Authentication {...props} userService={userService} />
								)}
							/>
							<Route
								path="/forgotten-password"
								component={ForgottentPassword}
							/>
							<Route
								path="/logup"
								render={props => <LogUp {...props} userService={userService} />}
							/>
							<PrivateRoute
								path="/profile"
								component={<Profile />}
								userService={userService}
								enigmaService={enigmaService}
							/>
							<PrivateRoute
								path="/friends"
								component={<FriendsView />}
								userService={userService}
								enigmaService={enigmaService}
							/>
							<PrivateRoute
								path="/enigma"
								component={<Enigma />}
								userService={userService}
								enigmaService={enigmaService}
							/>
							<PrivateRoute
								path="/enigmas"
								component={<EnigmaList />}
								userService={userService}
								enigmaService={enigmaService}
							/>
							<PrivateRoute
								path="/create-enigmas"
								component={<CreateEnigma />}
								userService={userService}
								enigmaService={enigmaService}
							/>
							<PrivateRoute
								path="/settings"
								component={<Settings />}
								userService={userService}
								enigmaService={enigmaService}
							/>
							<PrivateRoute
								path="/validation"
								component={<EnigmasValidation />}
								userService={userService}
								enigmaService={enigmaService}
							/>
							<PrivateRoute
								path="/"
								component={<HomePage />}
								userService={userService}
								enigmaService={enigmaService}
							/>
						</Switch>
					</div>
					<NotificationContainer />
				</MuiThemeProvider>
			</BrowserRouter>
		)
	}
}

export default withStyles(styles, { withTheme: true })(App)
