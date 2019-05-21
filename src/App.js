import React, { Component } from 'react';

import TabFriends from "./components/friend-page/TabFriends"
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <TabFriends/>
      </div>
    );
  }
}

export default App;
