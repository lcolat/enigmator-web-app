import React, { Component } from 'react'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { Route, Switch } from 'react-router-dom'
import Profile from './components/profile/index'
import Authentication from './components/login/authentication'
import ForgottentPassword from './components/login/forgottenPassword'
import LogUp from './components/login/logup'
import theme from './theme'
import PrivateRoute from './privateRoute'
import HomePage from './components/home-page'
import UserService from './services/userService'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
	app: {
		textAlign: 'center'
	}
})

class App extends Component {
	state = {
		userService: UserService.getInstance()
	}
	render() {
		const userService = this.state.userService
		const { classes } = this.props
		return (
			<MuiThemeProvider theme={theme}>
				<div className={classes.app}>
					<Switch>
						<Route
							path="/login"
							render={props => (
								<Authentication {...props} userService={userService} />
							)}
						/>
						<Route path="/forgotten-password" component={ForgottentPassword} />
						<Route
							path="/logup"
							render={props => <LogUp {...props} userService={userService} />}
						/>
						<PrivateRoute path="/" component={HomePage} />
						<PrivateRoute path="/profile" component={Profile} />
					</Switch>
				</div>
			</MuiThemeProvider>
		)
	}
}

export default withStyles(styles, { withTheme: true })(App)
