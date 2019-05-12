import React, { Component } from 'react';
import './App.css';

import HomePage from "./components/home-page/TabUnresolvedEnigmas"
import EnigmasList, {enigmaItem} from "./components/home-page/EnigmasList"


class App extends Component {
  render() {
    return (
      <div className="App">
        <EnigmasList/>
      </div>
    );
  }
}

export default App;
