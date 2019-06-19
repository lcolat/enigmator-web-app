import React, { Component } from 'react'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { BrowserRouter } from 'react-router-dom'
import theme from './theme'
import UserService from 'services/userService'
import { withStyles } from '@material-ui/core/styles'
import { NotificationContainer } from 'react-notifications'
import 'react-notifications/lib/notifications.css'
import Thread from './components/forum/thread'

const styles = theme => ({
	app: {
		textAlign: 'center'
	}
})

class AppDev extends Component {
	state = {
		userService: new UserService()
	}

	render() {
		const { classes } = this.props
		return (
			<BrowserRouter>
				<MuiThemeProvider theme={theme}>
					<div className={classes.app}>
						<Thread />
					</div>
					<NotificationContainer />
				</MuiThemeProvider>
			</BrowserRouter>
		)
	}
}

export default withStyles(styles, { withTheme: true })(AppDev)
