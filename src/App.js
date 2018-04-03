import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import $ from 'jquery';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      isLoading: false,
      textInput:[]
    };
    this.click = this.click.bind(this);
  }

  // change response type to text here & make sure test.py returns a string & not json formatted data
  click() {

    // axios.get("http://127.0.0.1:5000/hello/", {arg1: 'long ass url'})
    //   .then(res => {
    //     console.log(res.data)
    //     this.setState({ posts: res.data,  isLoading: false });
    //   });
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

  handleChange(value) {
    this.setState({textInput: value});
  }



  // prevents text from defaulting to "initial text" after button clicked 
  handleSubmit(event) {
    event.preventDefault();

  }

  render() {


    return (
      // text from test.py will appear here
      <div className="App">
        <div id = "left"> Url to be passed as arg to python script
        <p> {this.state.textInput}</p>
        </div>

        <div id = "right"> Python data returned from flask server via axios get request  
        <p > {this.state.posts.result} </p>
        </div>

      

        <div className="form_wrapper">
          <form onSubmit={this.handleSubmit}>
            <p className = "input-title"> Enter a URL to summarize! </p>
            <input id = "box" ref="textBox" type="text" value={this.state.textInput} onChange={ (e) => this.handleChange(e.target.value) } />
            <div> 
                <button onClick={this.click} disabled={this.state.isLoading}> click me </button>
            </div>
          </form>
        </div>
        
      </div>

    );
  }
}

export default App;
