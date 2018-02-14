import React, { Component } from 'react';

export default class Container extends Component {

  renderHead = () => null

  renderContent = () => null

  renderFooter = () => null

  render = () => (
    <div className="container main-container">
      <div className="main-container-head">
        {this.renderHead()}
      </div>
      <div className="main-container-content">
        {this.renderContent()}
      </div>
      <div>
        {this.renderFooter()}
      </div>
    </div>
  )
}
