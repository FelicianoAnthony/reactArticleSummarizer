import React, { Component } from 'react';
import './HomeComponent.css'
import SummaryComponent from './SummaryComponent'
import {withRouter} from "react-router-dom";

import { Link } from 'react-router-dom';
import './App.css';
import $ from 'jquery';




class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      summaryObject:[],
      SearchUrl: '',
      sumByNum: ''
    };
  }


  handleClick = () => {
    console.log(this.state.sumByNum)

    $.ajax({
    type: "GET",
    data: { arg1: this.state.SearchUrl, arg2:parseInt(this.state.sumByNum)},
    url: "http://127.0.0.1:5000/hello/",
    })
    .then( (result) => {
      console.log(result)
      this.props.history.push({
        pathname: '/summary',
        // search: '='  + this.state.SearchUrl,
        summaryObject: result
      })
    })
  }

  updateSearchUrl = (e) => {
    this.setState({SearchUrl: e.target.value})
    console.log(e.target.value)
  }

  updateSumByNum = (e) => {
    this.setState({sumByNum: e.target.value})
  }


  render() {
    return (
      <div>

        <form id="form_login">
          <p> Paste a url </p>
            <p>
              <input value={this.state.SearchUrl} onChange={this.updateSearchUrl} className= "mytext" type="text" id="server" placeholder="url" />
            </p> Summarize in 
                <input value={this.state.SumByNum} onChange={this.updateSumByNum} className="sentences" id="box" type="text" placeholder="10" />
              sentences
            <p> 
                <button onClick={this.handleClick} id="submitbutton" type="button">Summarize</button>
            </p>
              {(() => {
              if (this.state.renderComp) {
                  return <SummaryComponent test={this.state.gets}/>
              }
              })()}
        </form>

      </div>

    );
  }
}

export default withRouter(Home);
