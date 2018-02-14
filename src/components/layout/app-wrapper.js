import React, { Component } from 'react';
import TopNavbar from './top-navbar';
import Registration from "../registration/registration";
import { Route } from 'react-router-dom'

export default class AppWrapper extends Component {
  render = () => (
    <div>
      <TopNavbar />

      <Route exact component={Registration} />
    </div>
  )
}
