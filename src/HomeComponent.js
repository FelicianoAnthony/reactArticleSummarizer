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
      console.log('right before ajax')
      $.ajax({
      type: "GET",
      //headers: {  'Access-Control-Allow-Origin': 'http://localhost:5000/hello/' },
      //headers: {  'Access-Control-Allow-Origin': 'http://localhost:5000/hello/' },
      //dataType: "jsonp",
      //jsonp: 'callback',
      //jsonpCallback: 'successMsg',
      //crossDomain:true,
      data: { arg1: this.state.urlToSummarize, arg2:parseInt(this.state.sentenceCount)},
      // change this to the EC2 IP & make sure Custom TCP  @ 5000 in inbound rules
      url: "http://54.159.129.186:5000/hello/",
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


  updateSentenceCount = ( e ) => {
    e.preventDefault()
    this.setState({sentenceCount: e.target.value})
  }


  render() {


    return (
      <div className='outer'>


        <form id="form_login">
          <h1> Paste a url </h1>
{/*           {this.state.sentenceCount} */}
            <p>
              <input value={this.state.urlToSummarize} onChange={this.updateUrlToSummarize} className= "mytext" type="text" id="server" placeholder="url" />
            </p>
             <h1> Summarize in </h1>
                <input value={this.state.sentenceCount} onChange={this.updateSentenceCount} className="sentences" id="sentence-box" type="text" placeholder="10" />
              <h1> sentences </h1>
            <p> 
                <button onClick={this.handleClick} id="submitbutton" type="button">Summarize</button>
            </p>
        </form>


      </div>

    );
  }
}

export default withRouter(Home);
