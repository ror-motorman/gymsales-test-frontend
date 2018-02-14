import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import AppWrapper from './components/layout/app-wrapper';

import './App.scss';

class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/" component={AppWrapper} />
      </Router>
    );
  }
}

export default App;
