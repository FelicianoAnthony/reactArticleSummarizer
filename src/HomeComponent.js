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
      pythonJson:[],
      urlToSummarize: '',
      sentenceCount: 10    
    };
  }

  handleClick = () => {
    console.log(this.state.sentenceCount, 'from inside handleClick')

    if (!this.state.urlToSummarize.startsWith('http')) {
      alert('Invalid URL')
    }

    else if (!this.state.sentenceCount) {
      alert('Enter sentence number')
    } 

    else{
      $.ajax({
      type: "GET",
      data: { arg1: this.state.urlToSummarize, arg2:parseInt(this.state.sentenceCount)},
      url: "http://127.0.0.1:5000/hello/",
      })
      .then( (result) => {
        console.log(result)
        this.props.history.push({
          pathname: '/summary',
          // search: '='  + this.state.urlToSummarize,
          state: {
            pythonJson: result, 
            urlToSummarize: this.state.urlToSummarize,
            sentenceCount: this.state.sentenceCount
          }
        })
      })
    }
  }



  updateUrlToSummarize = (e) => {
    this.setState({urlToSummarize: e.target.value})
    console.log(e.target.value)
  }

  handleOnChange = ( e ) => {
    e.preventDefault()
    this.setState({sentenceCount: e.target.value})
  }


  render() {
    return (
      <div>

        <form id="form_login">
          <p> Paste a url </p>
          {this.state.sentenceCount}
            <p>
              <input value={this.state.urlToSummarize} onChange={this.updateUrlToSummarize} className= "mytext" type="text" id="server" placeholder="url" />
            </p> Summarize in 
                <input value={this.state.sentenceCount} onChange={this.handleOnChange} className="sentences" id="sentence-box" type="text" placeholder="10" />
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
