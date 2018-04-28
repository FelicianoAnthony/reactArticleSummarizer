import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route, Switch } from 'react-router-dom'; 
import SummaryComponent from './SummaryComponent';
import AboutComponent from './AboutComponent';

// for some reason the order in which the routes are place affect the link they lead to -- i.e. change the <Route> order & see what happens 
ReactDOM.render(


     <BrowserRouter>
       <Switch>
         <Route path='/summary' component={SummaryComponent} />
         <Route path='/about' component={AboutComponent} />
          <Route path='/' component={App} />
          
       </Switch>
    </BrowserRouter>,

     document.getElementById('root'));
registerServiceWorker();