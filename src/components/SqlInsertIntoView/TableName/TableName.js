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
    name: PropTypes.string
  }

  render() {
    const name = this.props.name;

    return (
      <FormGroup>
        <Label for="tableName">Table Name</Label>
        <Input name="tableName" type="text" placeholder="Ex: @Values, #Values or dbo.Values">
          {name}
        </Input>
      </FormGroup>
    );
  }
}
