import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Routes from './components/routing/Routes';

// Redux
import { Provider ,connect,ReactReduxContext} from 'react-redux';
import store from './store';
import {withRouter} from 'react-router-dom'
import { loadUser ,isGuest} from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import './App.css';
import './color.scss'
import './bootstrap/bootstrap.scss'

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = (props) => {
  
  useEffect(() => {
    let a = 0
   
      console.log('a',a+=1)
       
      store.dispatch(loadUser());
      
    })
   

  return (
   
    <Provider store={store}>
   
      <Router>
      <Fragment>
       
          
          
          <Switch>
       
            <Route exact path='/' component={Landing} />
            <Route component={Routes} />
          </Switch>
         
       </Fragment>
      </Router>
      
    </Provider>
   
  );
};


export default App