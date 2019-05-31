import React, { Component } from 'react'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Profile from './components/profile/index'
import Authentication from './components/login/authentication'
import ForgottentPassword from './components/login/forgottenPassword'
import NewAccount from './components/login/newAccount'
import theme from './theme'
import PrivateRoute from './privateRoute'
import HomePage from './components/home-page'
import UserService from './services/userService'
import { withStyles } from '@material-ui/core/styles'
import api from './services/api'

const styles = theme => ({
	app: {
		textAlign: 'center',
		background: 'white',
		display: 'flex'
	}
})

class App extends Component {
	state = {
		userService: UserService.getInstance(api)
	}
	render() {
		const userService = this.state.userService
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
							<Route path="/logup" component={NewAccount} />
							<PrivateRoute path="/" component={HomePage} />
							<PrivateRoute path="/profile" component={Profile} />
						</Switch>
					</div>
				</MuiThemeProvider>
			</BrowserRouter>
		)
	}
}

export default withStyles(styles, { withTheme: true })(App)
