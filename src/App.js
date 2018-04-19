import React, { Component } from 'react';
import logo from './logo.svg';
import PythonComponent from './PythonComponent';
import { Link } from 'react-router-dom';
import './App.css';
import $ from 'jquery';

class App extends Component {


  constructor(props) {
    super(props);
    this.state = {
      gets:[]
    };
  }

  handleClick = () => {
    const urlBox = document.getElementById("box").value;

    $.ajax({
    type: "GET",
    data: { arg1: urlBox} ,
    url: "http://127.0.0.1:5000/hello/",
    })
    .then( (result) => {
      this.setState({gets:result})
      console.log(result.title)
    })
    
    .then( () => {
      this.props.history.push({
        pathname: '/python',
        state1: {gets: this.state.gets}
      })
    })

  }



  render() {
    return (
        <div className="App">
            <div>
            <p className = "input-title"> Enter a URL</p>
            <input placeholder = "placeholder text" id="box" ref="textBox" type="text"/>
            <button onClick={this.handleClick}>
{/*               <Link to={{pathname:"/python", state : {message: this.state.gets} }}> cant use button have to use link text </Link> */}
            </button>
            <div>
            </div>
          </div>
        </div>
    );
  }
}

export default App;
