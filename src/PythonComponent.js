import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './PythonComponent.css';
import { withRouter } from 'react-router'


class PythonComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showOrig: false
    };
  }


  handleClick = () => {
    this.setState({ showOrig: !this.state.showOrig });
  }


  render() {


    return (
    	<div>
	    	<Link to={{pathname:"/"}}> home </Link>

			<div className="row">
			    <h2>Summarized Text </h2>
			    <p>{this.props.location.state1.gets.text} wtf</p>
          <button onClick={this.handleClick}> Show Original Text </button>
			  </div>
          {(() => {
          if (this.state.showOrig) {
              return this.props.location.state1.gets.orig_text
          }
          })()}


			{/*       	<p > {this.props.location.message.map(x => x.title)} </p> */}
{/* 		<p>{this.props.location.message} </p> */}
		</div>



    );
  }
}

export default PythonComponent;
