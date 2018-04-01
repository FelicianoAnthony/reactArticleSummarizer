import React, { Component } from 'react';

import logo from './logo.svg';
import './App.css';

class App extends Component {

  handleSubmit(event) {
  event.preventDefault();
  console.log("form was submitted");
  }

  render() {
    return (

      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <input />

          <button> Click me to summarize! </button>
        </form>
      </div>

      // <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <h1 className="App-title">Welcome to React</h1>
      //   </header>
      //   <p className="App-intro">
      //     To get started, edit <code>src/App.js</code> and save to reload.
      //   </p>
      // </div>
    );
  }
}

export default App;
