import React, { Component } from 'react';

import FriendsView from "./components/friend-page/index"
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <FriendsView/>
      </div>
    );
  }
}

export default App;
