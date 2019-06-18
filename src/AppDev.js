import React, { Component } from 'react'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { BrowserRouter } from 'react-router-dom'
import theme from './theme'
import UserService from 'services/userService'
import { withStyles } from '@material-ui/core/styles'
import { NotificationContainer } from 'react-notifications'
import 'react-notifications/lib/notifications.css'
import LeaderBoard from './components/leader-board'
import ProfileFriend from './components/friend-page/profile'

import Template from './components/create-enigma/enigma-builder/Template'
import EnigmaBuilder from './components/create-enigma/enigma-builder'
import { listEnigmasTypes } from './model/Enigma'
import Settings from "./components/settings-page";


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
						<Settings/>
					</div>
					<NotificationContainer />
				</MuiThemeProvider>
			</BrowserRouter>
		)
	}
}

export default withStyles(styles, { withTheme: true })(AppDev)
