import React, { Component } from 'react'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { Route, Switch } from 'react-router-dom'

import {Authentication, ForgottenPassword, NewAccount} from "./components"
import {HomePage} from './components'
import {Profile} from './components'
import {FriendPage} from './components'
import {EnigmasList} from './components'

import PrivateRoute from './privateRoute'
import UserService from './services/userService'

import theme from './theme'
import './App.css'


class App extends Component {
	state = {
		userService: UserService.getInstance()
	};
	
	componentWillMount() {
	}
	render() {
		const userService = this.state.userService;
		return (
			<MuiThemeProvider theme={theme}>
				<div className="App">
					<Switch>
						<Route
							path="/login"
							render={props => (
								<Authentication {...props} userService={userService}/>
							)}
						/>
						<Route path="/forgotten-password" component={ForgottenPassword}/>
						<Route path="/logup" component={NewAccount}/>
						<PrivateRoute path="/profile" component={Profile}/>
						<PrivateRoute path="/friends" component={FriendPage}/>
						<PrivateRoute path="/enigmas" component={EnigmasList}/>
						<PrivateRoute path="/" component={HomePage}/>
					</Switch>
				</div>
			</MuiThemeProvider>
		)
	}
}

export default App
