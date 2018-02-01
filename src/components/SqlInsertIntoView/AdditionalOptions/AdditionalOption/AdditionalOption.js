import React, { Component } from 'react'
import PropTypes from 'prop-types'

// React Components
import {
  Label,
  FormGroup,
  Input
} from 'reactstrap';

export default class AdditionalOption extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired
  }

  handleChange = (e) => {
    this.props.onChange(e);
  }

  render() {
    // Properties to pass.
    const key = this.props.key;
    const checked = this.props.checked;

    return (
      <FormGroup check>
        <Label for={key}>
          <Input name={key} type="checkbox" checked={checked} onChange={this.handleChange} />
          {this.props.children}
        </Label>
      </FormGroup>
    )
  }
}
