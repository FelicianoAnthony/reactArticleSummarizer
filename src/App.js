import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import HomeComponent from './HomeComponent';



class App extends Component {
  render() {
    return (
    	<div id='outer-app'>
      <div className="App">

        <HomeComponent />

      </div>
      </div>
    );
  }
}

export default App;
