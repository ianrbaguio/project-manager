import React, { Component } from 'react';
import logo from './logo.svg';
import {BrowserRouter as Router, Switch, Route, Redirect, withRouter, Link} from 'react-router-dom'
import './App.css';
import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login';
import Layout from './components/Layout';
import ProjectTable from './components/ProjectTable';

class App extends Component {
  render(){
    return(
      <Layout>
        <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Login}/>
            <PrivateRoute exact path="/main" component={ProjectTable} />
          </Switch>
        </div>
      </Router>
      </Layout>
    )
  }
}

export default App;
