import React, { Component } from 'react'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { Route, Switch } from 'react-router-dom'
import Header from './components/header'
import Profile from './components/profile/index'
import Authentication from './components/authentication'
import ForgottentPassword from './components/login/forgottenPassword'
import NewAccount from './components/login/newAccount'
import './App.css'
import theme from './theme'
import PrivateRoute from './privateRoute'
import HomePage from './components/home-page'
import UserService from './services/userService'

class App extends Component {
  state = {
    userService: UserService.getInstance()
  }
  render() {
    const userService = this.state.userService
    return (
      <MuiThemeProvider theme={theme}>
        <div className='App'>
          <Header />
          <Switch>
            <Route path='/login' component={Authentication} />
            <Route path='/forgotten-password' component={ForgottentPassword} />
            <Route path='/new-account' component={NewAccount} />
            <PrivateRoute path='/home' component={HomePage} />
            <PrivateRoute path='/profile' component={Profile} />
            <PrivateRoute path='/' />
          </Switch>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App
