import React, { Component } from 'react';
import './App.css';

import UserStatsResume from "./components/home-page/UserStatsResume"


class App extends Component {
  render() {
    return (
      <div className="App">
        <UserStatsResume score={"100"} winNumber={"2"} globalRank={"75"} localRank={"8"}/>
      </div>
    );
  }
}

export default App;
