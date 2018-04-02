import React, { Component } from 'react';


import logo from './logo.svg';
import './App.css';

var $ = require('jquery')

class App extends Component {

  constructor() {
    super();
    this.state = {
      text:"Initial text"
    };
  }

  // refs.textBox is refers to input element below
  clicked() {
    //this.setState({text: this.refs.textBox.value });
    $.ajax({
    type:"POST",
    dataType: "json",
    crossDomain:true,
    //data:{'name':'Payam'},
    url: "http://127.0.0.1:5000/hello/",
    success: function(data){
        console.log(data);
    }
  })


  }

  // prevents text from defaulting to "initial text" after button clicked 
  handleSubmit(event) {
    event.preventDefault();
    console.log('form submitted')
  }

  render() {
    return (


      <div className="App">
      {this.state.text}
        <div className="form_wrapper">
          <form onSubmit={this.handleSubmit}>
            <input ref="textBox" type="text" />
            //<button onClick={ (e) => { this.clicked(); } } > Click me to summarize! </button>
            <button onClick={this.clicked}> Click me bitch! </button>
          </form>
        </div>
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
