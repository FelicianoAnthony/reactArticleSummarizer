import React, { Component } from 'react';
import axios from 'axios';// eslint-disable-line no-unused-vars
import './App.css';
import { Switch, BrowserRouter as Router, Link, NavLink, Redirect } from 'react-router-dom';// eslint-disable-line no-unused-vars
import Route from 'react-router-dom/Route';// eslint-disable-line no-unused-vars
import TestComp from './TestComp';// eslint-disable-line no-unused-vars
import $ from 'jquery';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      isLoading: false,
      clicked: false
    };
    this.handleClick = this.handleClick.bind(this);
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
      console.log(res.title)
    }.bind(this));

  }


  render() {


    return (


        <div className="App" >
          {this.state.clicked ? 
            <div className="summary-box"> 
              <h1 className="article-title"> {this.state.posts.title} </h1>
                <p id="summary-text"> <span className="col-titles"> Summarized Text <br /> </span> {this.state.posts.text} </p> 
                <p id="orig-text"> <span className="col-titles"> Original Article <br /> </span> {this.state.posts.orig_text} </p>
                <ul className="lengths">
                  <li> The original length was {this.state.posts.orig_len} words </li>
                  <li> The new length is {this.state.posts.new_len} words </li>
                  <li> The article's length was reduced by {this.state.posts.pct_change}% </li> 
               </ul>

           </div> :  <div className="form_wrapper"> 
          <form onSubmit={this.handleSubmit}>
            <p className = "input-title"> Enter a URL to summarize! </p>
            <input id="box" ref="textBox" type="text"/>
              <div> 
                <button onClick={this.handleClick}> Click me now!
                </button>
              </div>
          </form>


        </div> }


        </div>




    );
  }
}

export default App;
