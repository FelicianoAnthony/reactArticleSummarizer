import React, { Component } from 'react';
import axios from 'axios';


import logo from './logo.svg';
import './App.css';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  // change response type to text here & make sure test.py returns a string & not json formatted data
  componentDidMount() {
    axios.get("http://127.0.0.1:5000/hello/", {
      responseType:"text"
    })
      .then(res => {
        //console.log(posts)
        this.setState({ posts: res.data });
      });
  }


  // prevents text from defaulting to "initial text" after button clicked 
  handleSubmit(event) {
    event.preventDefault();
    console.log('form submitted')
  }

  render() {
    return (

        <div>
        <h1>{`/r/reactjs}`}</h1>
        <ul>
          {this.state.posts}
        </ul>
      </div>


      // <div className="App">
      // //{this.state.text}
      //   <div className="form_wrapper">
      //     <form onSubmit={this.handleSubmit}>
      //       <input ref="textBox" type="text" />
      //       //<button onClick={ (e) => { this.clicked(); } } > Click me to summarize! </button>
      //       <button onClick={this.clicked}> Click me bitch! </button>
      //     </form>
      //   </div>
      // </div>

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
