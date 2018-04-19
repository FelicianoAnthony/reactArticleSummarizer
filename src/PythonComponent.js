import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './PythonComponent.css';
import PythonComponent2 from './PythonComponent2'



class PythonComponent extends Component {

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

  ShowDiv ()  {
    return (
      <div> stuff </div>
      )
  }


  render() {

    const text = this.state.toggleButtonText ? 'Close original text' : 'Show original text';


    return (




            <div className="App" >
            <Link to={{pathname:"/"}}> home </Link>
            <button onClick={this.handleClick}> {text} </button>

   
            <div className="summary-box"> 
              <h1 className="article-title"> {this.props.location.summaryObject.title} </h1>
                <p id="summary-text"> <span className="col-titles"> Summarized Text <br /> </span> {this.props.location.summaryObject.text} </p> 
           </div>  

           {!this.state.clicked ?
            <div className="summary-box-orig"> 
              <h1 className="article-title-orig"> {this.props.location.summaryObject.title} </h1>
                <p id="summary-text"> <span className="col-titles"> Summarized Text <br /> </span> {this.props.location.summaryObject.orig_text} </p> 

           </div> : null }


        </div>



    );
  }
}

export default PythonComponent;
