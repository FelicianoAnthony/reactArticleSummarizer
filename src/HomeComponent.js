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
      sentenceCount: 7,
      boxToSummarize:[]
    };
  }


  handleClick = () => {
    console.log(this.state.boxText, 'inside handleClick')



    if (!this.state.sentenceCount) {
      alert('Enter sentence number')
    }

    else if (this.state.boxToSummarize.length >= 1 && this.state.urlToSummarize.length >=1) {
      alert('Can\'t summarize two things at the same time')
    }

    else if (this.state.boxToSummarize.length === 0 && this.state.urlToSummarize.length == 0) {
      alert('Nothing to summarize.')
    }

    // logic for summarizing text box
    else if (this.state.boxToSummarize.length > 1 && this.state.urlToSummarize.length === 0) {
      console.log('inside ajax')
      $.ajax({
        type:"GET",
        data: { textBoxString: this.state.boxToSummarize, arg2:parseInt(this.state.sentenceCount)},
        url: "http://127.0.0.1:5000/summarize_text/",
        success: function (data, text) {
          console.log('SUCCESS\n', 'DATA --> ', data, 'TEXT --> ', text)
        },
        error: function (request, status, error) {
          console.log('REQUEST- RESPONSETEXT\n',request.responseText, '\nrequest\n', request, '\nstatus\n', status, '\nerror\n', error);
        }
        }).then( (sumResult) => {
          console.log(sumResult)
        this.props.history.push({
          pathname: '/summary',
          state: {
            pythonJson: sumResult,
            sentenceCount: this.state.sentenceCount
          }
        })
      })
    }

    // logic for summarizing url 
    else if( this.state.urlToSummarize.startsWith('http') && this.state.boxToSummarize.length === 0) {
      console.log('right before ajax')
      $.ajax({
      type: "GET",
      data: { arg1: this.state.urlToSummarize, arg2:parseInt(this.state.sentenceCount)},
      // change this to the EC2 IP & make sure Custom TCP  @ 5000 in inbound rules
      url: "http://127.0.0.1:5000/summarize_url/",
      success: function (data, text) {
        console.log('SUCCESS\n', 'DATA --> ', data, 'TEXT --> ', text)
      },
      error: function (request, status, error) {
        console.log('REQUEST- RESPONSETEXT\n',request.responseText, '\nrequest\n', request, '\nstatus\n', status, '\nerror\n', error);
      }
      })
      .then( (result) => {
        //console.log(result)
        this.props.history.push({
          pathname: '/summary',
          // search: '='  + this.state.urlToSummarize,
          state: {
            pythonJson: result, 
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


  updateSentenceCount = ( e ) => {
    e.preventDefault()
    this.setState({sentenceCount: e.target.value})
  }

  updateBoxText = ( e ) => {
    this.setState({boxToSummarize:e.target.value})
  }


  render() {


    return (
      <div className='centered'>


        <form id="form_login">
          <h1> Paste a url </h1>
{/*           {this.state.sentenceCount} */}
            <p>
              <input value={this.state.urlToSummarize} onChange={this.updateUrlToSummarize} className= "mytext" type="text" id="server" placeholder="url" />
            </p>
            <h1>  Or paste some text </h1>
            <textarea value={this.state.boxToSummarize} onChange={this.updateBoxText} type="text"> 
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
