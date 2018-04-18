import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './PythonComponent.css';


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

			<div class="row">
			    <h2>Summarized Text </h2>
			    <p>{this.props.test.text}</p>
          <button onClick={this.handleClick}> Show Original Text </button>
			  </div>
          {(() => {
          if (this.state.showOrig) {
              return this.props.test.orig_text
          }
          })()}


			{/*       	<p > {this.props.location.message.map(x => x.title)} </p> */}
{/* 		<p>{this.props.location.message} </p> */}
		</div>



    );
  }
}

export default PythonComponent;
