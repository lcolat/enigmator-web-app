import React, { Component } from 'react'
import { MuiThemeProvider } from '@material-ui/core/styles'
import Header from './components/header'
import Authentication from './components/authentication'
import './App.css';
import theme from './theme'


class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>      
        <div className="App">
          <Header />
          <Authentication/>
        </div> 
      </MuiThemeProvider>

    );
  }
}

export default App;
