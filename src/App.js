import React, { Component } from 'react'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { Route, Switch } from 'react-router-dom'
import Profile from './components/profile/index'
import Authentication from './components/login/authentication'
import ForgottentPassword from './components/login/forgottenPassword'
import NewAccount from './components/login/newAccount'
import './App.css'
import theme from './theme'
import PrivateRoute from './privateRoute'
import HomePage from './components/home-page'
import UserService from './services/userService'

//import import_icon from "./icon/import-font-awesome";
import Sidebar from "./sidebar/Sidebar";


class App extends Component {
	state = {
		userService: UserService.getInstance()
	}
	componentWillMount() {}
	render() {
		const userService = this.state.userService
		return (
			<MuiThemeProvider theme={theme}>
				<div className="App">
					<Switch>
						<Route
							path="/login"
							render={props => (
								<Authentication {...props} userService={userService} />
							)}
						/>
						<Route path="/forgotten-password" component={ForgottentPassword} />
						<Route path="/logup" component={NewAccount} />
						<PrivateRoute path="/" component={HomePage} />
						<PrivateRoute path="/profile" component={Profile} />
					</Switch>
				</div>
			</MuiThemeProvider>
		)
	}
}

export default App
