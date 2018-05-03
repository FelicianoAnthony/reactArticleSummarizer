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
      urlSummary: '',
      sentenceCount: 7,
      boxSummary:[]
    };
  }

  ajaxSuccess =  (data, text) =>  {
    console.log('SUCCESS\n', 'DATA --> ', data, 'TEXT --> ', text)
  }

  ajaxError =  (request, status, error) => {
        console.log('REQUEST- RESPONSETEXT\n',request.responseText, '\nrequest\n', request, '\nstatus\n', status, '\nerror\n', error);
  }


  handleClick = () => {

    // since state wont change until it's used -- assign states to variables 
    let sentenceCount = this.state.sentenceCount;
    let boxSummary = this.state.boxSummary;
    let urlSummary = this.state.urlSummary;


    // handle for incorrect & correct input
    if (!sentenceCount) {
      alert('Enter sentence number')
    }

    else if (boxSummary.length >= 1 && urlSummary.length >=1) {
      alert('Can\'t summarize two things at the same time')
    }

    else if (boxSummary.length === 0 && urlSummary.length === 0) {
      alert('Nothing to summarize')
    }

    // logic for summarizing text box
    else if (boxSummary.length >= 1 && urlSummary.length === 0) {
      if (boxSummary.length < 50) {
          alert('Text is too short to summarize')
      }
      else {
        console.log('Summarizing from textbox...\n\n')
        $.ajax({
          type:"GET",
          data: { textBoxString: boxSummary, sentenceCountStr:sentenceCount},
          url: "http://184.72.180.74:5000/summarize_text/",
          success: this.ajaxSuccess,
          error: this.ajaxError
          })
          .then( (summaryBoxObj) => {
            this.props.history.push({
              pathname: '/summary',
              state: {
              pythonJson: summaryBoxObj,
              sentenceCount: sentenceCount
            }
          })
        })
      }
    }

    // logic for summarizing url 
    else if( urlSummary.startsWith('http') && boxSummary.length === 0) {
      console.log('Summarizing from url...\n\n')
      $.ajax({
      type: "GET",
      data: { urlString: urlSummary, sentenceCountStr:sentenceCount},
      // change this to the EC2 IP & make sure Custom TCP  @ 5000 in inbound rules
      url: "http://184.72.180.74:5000/summarize_url/",
      success: this.ajaxSuccess,
      error: this.ajaxError
      })
      .then( (summaryUrlObj) => {
        this.props.history.push({
          pathname: '/summary',
           // search: '='  + urlSummary,
          state: {
          pythonJson: summaryUrlObj, 
          sentenceCount: sentenceCount
          }
        })
      })
    }
  }



  updateUrlSummary = ( e ) => {
    this.setState({urlSummary: e.target.value})
    console.log(e.target.value)
  }


  updateSentenceCount = ( e ) => {
    this.setState({sentenceCount: e.target.value})
  }

  updateBoxText = ( e ) => {
    this.setState({boxSummary:e.target.value})
  }


  render() {


    return (
      <div className='centered'>


        <form id="form_login">
          <h1> Paste a url </h1>
            <p>
              <input value={this.state.urlSummary} onChange={this.updateUrlSummary} className= "mytext" type="text" id="server" placeholder="url" />
            </p>
            <h1>  Or some text </h1>
            <textarea value={this.state.boxSummary} onChange={this.updateBoxText} type="text"> 
            </textarea>
             <h1> Summarize in </h1>
                <input value={this.state.sentenceCount} onChange={this.updateSentenceCount} className="sentences" id="sentence-box" type="text" placeholder="7" />
              <h1> sentences </h1>
            <p> 
                <button onClick={this.handleClick} className="btn-push blue" id="submitbutton" type="button">Summarize</button>
            </p>
        </form>




      </div>





    );
  }
}

export default withRouter(Home);
