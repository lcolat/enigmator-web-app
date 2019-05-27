import React, { Component } from 'react'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { Route, Switch } from 'react-router-dom'
import Header from './components/header'
import Profile from "./components/profile/index"
// import Authentication from './components/login/authentication'
// import ForgottentPassword from './components/login/forgottenPassword'
// import NewAccount from './components/login/newAccount'
import './App.css';
import theme from './theme'
import PrivateRoute from './privateRoute';
import HomePage from "./components/home-page";

import TableEnigma from "./components/enigmas-list/TableEnigma"

class App extends Component {
	render() {
		return (
			<MuiThemeProvider theme={theme}>
				<div className="App">
					<Header/>
					<TableEnigma/>
				</div>
			</MuiThemeProvider>
		);
	}
}

export default App;
