import React, { Component } from 'react';
import './App.css';

import UserStatsResume from "./components/home-page/UserStatsResume"
import HomePage from "./components/home-page";


class App extends Component {
  render() {
    return (
      <div className="App">
        <HomePage/>
      </div>
    );
  }
}

export default App;
