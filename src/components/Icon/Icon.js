import React
// , { Component } 
from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames';

// Icon is a wrapper for the bootstrap icons toolset.
export default function Icon(props) {
  return <i className={classnames(`fa fa-${props.modifier}`, props.className)}></i>;
}
// Set the property types for the icon Class.
Icon.propTypes = {
  modifier: PropTypes.string.isRequired,
  className: PropTypes.string
}

