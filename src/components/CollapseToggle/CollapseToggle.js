import React, { Component } from 'react'
import PropTypes from 'prop-types'
// Utilities
import classNames from 'classnames';
// React Components
import {
  Label
} from 'reactstrap';
// Components
import Icon from '../Icon/Icon';

export default class CollapseToggle extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    expanded: PropTypes.bool.isRequired, 
    className: PropTypes.string
  }
  // Fired when the 
  handleClick = (e) => {
    this.props.onClick(e);
  }

  render() {
    const className = classNames(this.props.className);
    const expanded = this.props.expanded;

    return (
      <Label className={className} onClick={this.handleClick}>
        {expanded 
          ? <Icon modifier="minus-square-o" aria-hidden="true" />
          : <Icon modifier="plus-square-o" aria-hidden="true" />}
          {this.props.children}
      </Label>
    )
  }
}
