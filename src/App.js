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
      gets:[],
      renderComp: false,
    };
  }

  handleClick = () => {
    const urlBox = document.getElementById("box").value;

    $.ajax({
    type: "GET",
    data: { arg1: urlBox} ,
    url: "http://127.0.0.1:5000/hello/",
    }).then(function(result) {
      this.setState({ gets: result, renderComp: !this.state.renderComp });
      console.log(result.title)
    }.bind(this));
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
            {(() => {
              if (this.state.renderComp) {
                  return <PythonComponent test={this.state.gets}/>
              }
              })()}
            </div>
          </div>
        </div>
    );
  }
}

export default App;
