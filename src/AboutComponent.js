import React, { Component } from 'react';
import App from './App';
import { Link, Route, Switch } from 'react-router-dom';


import react_logo from './react_logo.png';
import pythonLogo from './pythonLogo.png'
import githubLogo from './githubLogo.png'

import flaskLogo from './flaskLogo.png'
import apacheLogo from './apacheLogo.png'
import ubuntuLogo from './ubuntuLogo.png'
import awsLogo from './awsLogo.png'





class AboutComponent extends Component {


  render() {


    return (



    <div className="footer-container">

        <ul>
          <li><Link to={{pathname:"/"}}> Home </Link></li>
        </ul>

        <div class="icon-bar">
          <h1 className="footer-tech"> Software Used </h1>
          <a href="https://github.com/" target="_blank" rel='noopener noreferrer'> <img alt="" src={githubLogo}/> </a> 
          <a href="https://www.python.org/" target="_blank" rel='noopener noreferrer'> <img alt="Python Logo " src={pythonLogo} /> </a>
          <a href="https://reactjs.org/" target="_blank" rel='noopener noreferrer'>    <img alt="React JS Logo" src={react_logo}/> </a>
          <a href="http://flask.pocoo.org/" target="_blank" rel='noopener noreferrer'>    <img alt="Flask Logo" src={flaskLogo}/> </a>
          <a href="https://httpd.apache.org/" target="_blank" rel='noopener noreferrer'> <img alt="Apache Logo" src={apacheLogo}/> </a>
          <a href="https://www.ubuntu.com/" target="_blank" rel='noopener noreferrer'>    <img alt="Ubuntu Logo" src={ubuntuLogo}/> </a> 
          <a href="https://aws.amazon.com/" target="_blank" rel='noopener noreferrer'>    <img alt="AWS Logo" src={awsLogo}/> </a> 
        </div>

        <Switch>
          <Route exact path="/" component={App}/>
        </Switch>

    </div>




    );
  }
}

export default AboutComponent;
