import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import WavesUITimeline from './components/WavesUITimeline';

class App extends Component {
  render() {
    return (
      <div className="App">
        <WavesUITimeline />
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
