import React, { Component } from 'react';
import mad from './Mad.svg';
import './App.css';
import RecordView from './RecordView.js'

class App extends Component {
  render() {
    return (
		<div>
			<h1>Mad Scientist</h1> <img src={mad} className="App-logo" alt="logo" />
			<h2>Speech Emotion Recognition</h2>
			<RecordView></RecordView>
		</div>
    );
  }
}

export default App;
