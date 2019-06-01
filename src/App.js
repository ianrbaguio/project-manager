import React, { Component } from 'react';
import logo from './logo.svg';
import {BrowserRouter as Router, Switch, Route, Redirect, withRouter, Link} from 'react-router-dom'
import './App.css';
import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login';
import Demo from './components/Register';
import Layout from './components/Layout';
import ProjectTable from './components/ProjectTable';
import EditProject from './components/EditProject';

class App extends Component {
  render(){
    return(
      <Layout>
        <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Login}/>
            <Route exact path="/register" component={Demo}/>
            <PrivateRoute exact path="/main" component={ProjectTable} />
            <PrivateRoute exact path="/editProject" component={EditProject}/>
            <Redirect to="/" />
          </Switch>
        </div>
      </Router>
      </Layout>
    )
  }
}

export default App;
