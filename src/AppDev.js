import React, { Component } from 'react'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Profile from 'components/profile/index'
import Authentication from 'components/login/authentication'
import ForgottentPassword from 'components/login/forgottenPassword'
import LogUp from 'components/login/logup'
import theme from './theme'
import PrivateRoute from './privateRoute'
import HomePage from 'components/home-page'
import FriendsView from 'components/friend-page'
import UserService from 'services/userService'
import { withStyles } from '@material-ui/core/styles'
import { NotificationContainer } from 'react-notifications'
import 'react-notifications/lib/notifications.css'

import Template from './components/create-enigma/enigma-builder/Template'
import EnigmaBuilder from './components/create-enigma/enigma-builder'
import { listEnigmasTypes } from './model/Enigma'
import {TabChooser} from "./common"
import ListThreads from "./components/forum";



const styles = theme => ({
	app: {
		textAlign: 'center'
	}
});

class AppDev extends Component {
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
						<TabChooser/>
					</div>
					<NotificationContainer />
				</MuiThemeProvider>
			</BrowserRouter>
		)
	}
}

export default withStyles(styles, { withTheme: true })(AppDev)
