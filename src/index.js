import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route, Switch } from 'react-router-dom'; 
import SummaryComponent from './SummaryComponent';

ReactDOM.render(


     <BrowserRouter>
       <Switch>
         <Route path='/summary' component={SummaryComponent} />
          <Route path='/' component={App} />
       </Switch>
    </BrowserRouter>,

     document.getElementById('root'));
registerServiceWorker();