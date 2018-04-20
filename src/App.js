import React, { Component } from 'react';
import PythonComponent from './PythonComponent';
import { Link } from 'react-router-dom';
import './App.css';
import $ from 'jquery';
import { withRouter } from 'react-router'

class App extends Component {


  constructor(props) {
    super(props);
    this.state = {
      summaryObject:[],
      SearchUrl: '',
      sumByNum: ''
    };
  }

  handleClick = () => {

    $.ajax({
    type: "GET",
    data: { arg1: this.state.SearchUrl, arg2:parseInt(this.state.sumByNum)},
    url: "http://127.0.0.1:5000/hello/",
    })
    .then( (result) => {
      console.log(result)
      this.props.history.push({
        pathname: '/python',
        // search: '='  + this.state.SearchUrl,
        summaryObject: result
      })
    })
  }

  updateSearchUrl = (e) => {
    this.setState({SearchUrl: e.target.value})
  }

  updateSumByNum = (e) => {
    this.setState({sumByNum: e.target.value})
  }


  render() {
    return (
        <div className="App">
            <div>
            <p className = "input-title"> Enter a URL</p>
            <input value={this.state.SearchUrl} onChange={this.updateSearchUrl} placeholder = "placeholder text" id="box" ref="textBox" type="text"/>
              <div> 
              <p> Summary by sentence number - cant leave blank for now... </p>
              <input value={this.state.SumByNum} onChange={this.updateSumByNum} placeholder = "10" type="text" /> 
              </div>
            <button onClick={this.handleClick}> Click to summarize
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

