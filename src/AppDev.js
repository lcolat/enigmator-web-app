import React, {Component} from 'react'
import {MuiThemeProvider} from '@material-ui/core/styles'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Profile from 'components/profile/index'
import Authentication from 'components/login/authentication'
import ForgottentPassword from 'components/login/forgottenPassword'
import LogUp from 'components/login/logup'
import theme from './theme'
import PrivateRoute from './privateRoute'
import HomePage from 'components/home-page'
import FriendsView from 'components/friend-page'
import UserService from 'services/userService'
import {withStyles} from '@material-ui/core/styles'
import {NotificationContainer} from 'react-notifications'
import 'react-notifications/lib/notifications.css'

import EnigmaTypeSelection from "./components/create-enigma";


const styles = theme => ({
	app: {
		textAlign: 'center'
	}
});

class App extends Component {
	state = {
		userService: UserService.getInstance()
	};
	
	render() {
		const userService = this.state.userService;
		const {classes} = this.props;
		return (
			<BrowserRouter>
				<MuiThemeProvider theme={theme}>
					<div className={classes.app}>
						<EnigmaTypeSelection/>
					</div>
					<NotificationContainer/>
				</MuiThemeProvider>
			</BrowserRouter>
		)
	}
}

export default withStyles(styles, {withTheme: true})(App)
