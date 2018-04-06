import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import { Switch, BrowserRouter as Router, Link, NavLink, Redirect } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import TestComp from './TestComp';
import $ from 'jquery';

const User = () => {
  return (<h1> Welcome Bitch </h1>)
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      isLoading: false,
      textInput:[],
      clicked: false

    };
    this.click = this.click.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  // change response type to text here & make sure test.py returns a string & not json formatted data
  click() {

    // axios.get("http://127.0.0.1:5000/hello/", {arg1: 'long ass url'})
    //   .then(res => {
    //     console.log(res.data)
    //     this.setState({ posts: res.data,  isLoading: false });
    //   });


  }

  handleChange(value) {
    this.setState({textInput: value});
  }



  // prevents text from defaulting to "initial text" after button clicked 
  handleSubmit(event) {
    event.preventDefault();

  }

  handleClick() {
    this.setState({
      clicked: true
    });

    var urlBox = document.getElementById("box").value;

    $.ajax({
    type: "GET",
    data: { arg1: urlBox} ,
    url: "http://127.0.0.1:5000/hello/",
    }).done(function(res) {
      this.setState({ posts: res,  isLoading: false });
      console.log(res)
    }.bind(this));

  }


  render() {


    return (


        <div className="App" >
          {this.state.clicked ? <div className="summary-box"> Article Summary for  <p id="summary-text"> {this.state.posts.result} </p> </div> :  <div className="form_wrapper"> 
          <form onSubmit={this.handleSubmit}>
            <p className = "input-title"> Enter a URL to summarize! </p>
            <input id="box" ref="textBox" type="text" value={this.state.textInput} onChange={ (e) => this.handleChange(e.target.value) } />
              <div> 
                <button onClick={this.handleClick}> Click me now!
                </button>
              </div>
          </form>

        </div>}
        </div>




    );
  }
}

export default App;
