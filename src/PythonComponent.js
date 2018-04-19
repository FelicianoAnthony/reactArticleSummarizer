import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './PythonComponent.css';


class PythonComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showOrig: false,
      liked: false
    };
  }


  handleClick = () => {
    this.setState({ showOrig: !this.state.showOrig, liked: !this.state.liked });
  }


  render() {

    const text = this.state.liked ? 'Close original text' : 'Show original text';


    return (
    	<div>
	    	<Link to={{pathname:"/"}}> home </Link>

			<div className="row">
			    <h2> {this.props.location.summaryObject.title} </h2>
			    <p>{this.props.location.summaryObject.text} wtf</p>
          <button onClick={this.handleClick}> {text} </button>
			  </div>
          {(() => {
          if (this.state.showOrig) {
              return this.props.location.summaryObject.orig_text
          }
          })()}
		</div>



    );
  }
}

export default PythonComponent;
