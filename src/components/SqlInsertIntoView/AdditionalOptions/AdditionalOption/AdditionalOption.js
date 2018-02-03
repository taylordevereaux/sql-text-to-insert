import React, { Component } from 'react'
import PropTypes from 'prop-types'

// React Components
import {
  Label,
  FormGroup,
  Input
} from 'reactstrap';

/// A Single Checkbox option for the AdditionalOptions Component
export default class AdditionalOption extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired
  }
  // Handle the check box changed event and fire it directly back to the AdditionalOptionsComponent
  handleChange = (e) => {
    this.props.onChange(e);
  }

  render() {
    // Properties to pass.
    const name = this.props.name;
    const checked = this.props.checked;

    return (
      <FormGroup check>
        <Label for={name}>
          <Input name={name} type="checkbox" checked={checked} onChange={this.handleChange} />
          {this.props.children}
        </Label>
      </FormGroup>
    )
  }
}
