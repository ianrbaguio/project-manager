import React from 'react';
import logo from './logo.svg';
import {BrowserRouter as Router, Switch, Route, Redirect, withRouter, Link} from 'react-router-dom'
import './App.css';

class App extends Component {
  render(){
    return(
      <Router>
        <div>
          <Switch>
            <Route exact path="/"/>
            
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
