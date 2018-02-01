import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class HeaderView extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired
    // subtitle: PropTypes.string
  }
  static defaultProps = {
    title: ''
  }

  render() {
    const title = this.props.title;
    // const subtitle = this.props.subtitle;
    return (
      <div className="col-12">
        <h1>{title}</h1>
        {this.props.children}
      </div>
    );
  }
}
