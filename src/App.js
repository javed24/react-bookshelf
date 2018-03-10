import React, { Component } from 'react';
import './App.css';
import BooksApp from './Home.js';
import Search from './Search.js';
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;

class App extends Component {
  render() {
    return (
        <Router>
          <Switch>
            <Route exact path='/' component={BooksApp} />
            <Route path='/Search' component={Search} />
          </Switch>
      </Router>
    )
  }
}

export default App;