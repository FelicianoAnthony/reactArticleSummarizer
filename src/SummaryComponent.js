import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import App from './App'
import './SummaryComponent.css'
import FooterComponent from './FooterComponent'



class SummaryComponent extends Component {

   constructor(props) {
    super(props);
    this.state = {
      showOrig: false,
      toggleButtonText: false, 
      clicked: true
    };
  }


  handleClick = () => {
    this.setState({ 
      showOrig: !this.state.showOrig, 
      toggleButtonText: !this.state.toggleButtonText , 
      clicked:!this.state.clicked});
  }






  render() {

    const text = this.state.toggleButtonText ? 'Close original text' : 'Show original text';


    return (


          <div className="App" >
                    
            <ul>
              <li><Link to={{pathname:"/"}}> Home </Link></li>
            </ul>

            <div className="summary-box"> 

              <h1 className="article-title"> {this.props.location.state.pythonJson.title} </h1>

                <p id="summary-text"> <span className="col-titles"> 
                  ( Article Summarized in {this.props.location.state.sentenceCount} sentences ) 
                 <br /> 
                {this.props.location.state.pythonJson.summary_as_list.map(function(d, idx) {
                  return (
                    <div className="summary-div">
                      <ul>
                        <li key={idx} >{idx+1}. {d} </li>
                      </ul>
                    </div>
                    )
                })}   
                </span>  </p> 

              <FooterComponent />

              <div>
                <h1 className="summary-stats"> Summary Statistics </h1>
                <p className = "summary-stats-text"> Original text - {this.props.location.state.pythonJson.orig_len} words </p>
                <p className = "summary-stats-text"> Summary - {this.props.location.state.pythonJson.summary_list_length} words </p>
                <p className = "summary-stats-text">  Percent Change - {this.props.location.state.pythonJson.pct_change_list} % </p>
              </div>


              

              <li><button className="btn-push blue" type="button"onClick={this.handleClick}> {text} </button></li>
           </div>  

           {!this.state.clicked ?
            <div className="summary-box-orig"> 
              <h1 className="article-title-orig"> {this.props.location.state.pythonJson.title} </h1>
                <p id="summary-text"> <span className="col-titles"> Original Text <br /> </span>
                {this.props.location.state.pythonJson.orig_text.map(function(d, idx) {
                  return (
                    <ul>
                      <li key={idx}>{idx+1} <br /> {d}</li>
                    </ul>
                    )
                })}  

                </p> 

           </div> : null }



            <Switch>
              <Route exact path="/" component={App}/>
            </Switch>

          </div>

    );
  }
}

export default SummaryComponent;
