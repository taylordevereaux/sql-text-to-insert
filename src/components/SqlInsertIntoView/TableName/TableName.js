import React, { Component } from 'react'
import PropTypes from 'prop-types'

// React Components
import {
  Label,
  FormGroup,
  Input
} from 'reactstrap';

export default class TableName extends Component {
  static propTypes = {
    value: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func.isRequired
  }
  static defaultProps = {
    value: ""
  }
  // Handles the Value of the Text Input Changing.
  handleChange = (e) => {
    this.props.onChange(e);
  }

  render() {
    const value = this.props.value;
    return (
      <FormGroup>
        <Label for="tableName">Table Name</Label>
        <Input name="tableName" type="text" placeholder="Ex: @Values, #Values or dbo.Values"
          value={value}
          onChange={this.handleChange} />
      </FormGroup>
    );
  }
}
