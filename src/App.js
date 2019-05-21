import React, { Component } from 'react'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { Route, Switch } from 'react-router-dom'
import Header from './components/header'
import Authentication from './components/login/authentication'
import ForgottentPassword from './components/login/forgottenPassword'
import NewAccount from './components/login/newAccount'
import './App.css';
import theme from './theme'
import PrivateRoute from './privateRoute';


import UserStatsResume from "./components/home-page/UserStatsResume"
import HomePage from "./components/home-page";


class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>      
        <div className="App">
          <Header />
          <Switch>
            <Route path="/login" component={Authentication} />
            <Route path="/forgotten-password" component={ForgottentPassword} />
            <Route path="/new-account" component={NewAccount} />
            <PrivateRoute path="/home" component={HomePage}/>
            <PrivateRoute path="/" />
          </Switch>
        </div> 
      </MuiThemeProvider>
    );
  }
}

export default App;
