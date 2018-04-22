import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import App from './App'




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
      <div>
  <div className="App" >
            <Link to={{pathname:"/"}}> home </Link>
            <button onClick={this.handleClick}> {text} </button>

   
            <div className="summary-box"> 
              <h1 className="article-title"> {this.props.location.summaryObject.title} </h1>

                <p id="summary-text"> <span className="col-titles"> Summarized Text <br /> 
                {this.props.location.summaryObject.summary_as_list.map(function(d, idx) {
                  return (
                    <ul>
                      <li key={idx}>{idx} {d}</li>
                    </ul>
                    )
                })}   
                </span>  </p> 


           </div>  

           {!this.state.clicked ?
            <div className="summary-box-orig"> 
              <h1 className="article-title-orig"> {this.props.location.summaryObject.title} </h1>
                <p id="summary-text"> <span className="col-titles"> Original Text <br /> </span>
                {this.props.location.summaryObject.orig_text.map(function(d, idx) {
                  return (
                    <ul>
                      <li key={idx}>{idx} {d}</li>
                    </ul>
                    )
                })}  

                </p> 

           </div> : null }


        






    <Switch>
      <Route exact path="/" component={App}/>
    </Switch>

      </div>
      </div>

    );
  }
}

export default SummaryComponent;
