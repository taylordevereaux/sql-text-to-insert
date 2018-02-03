import React, { Component } from 'react'
import PropTypes from 'prop-types'
// Utilities
import classNames from 'classnames';
// ReactStrap Components
import {
  FormGroup,
  Label,
  Input
} from 'reactstrap'

// Styles 
import './TextInput.css';

export default class TextInput extends Component {
  // Properties
  static propTypes = {
    input: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func.isRequired
  }
  static defaultProps = {
    input: ""
  }

  // Handles the Value of the Text Input Changing.
  handleChange = (e) => {
    this.props.onChange(e);
  }

  render() {
    // Class names passed to the component.
    const className = classNames("TextInput", this.props.className);
    // Input Value
    const input = this.props.input;
    // Placeholder Value for the text area.
    const placeholder = `Example:
ID1	Data1	543.21
ID2	Data2	98.65
ID4	Data4	9083`;

    return (
      <FormGroup className={className}>
        <Label>Input</Label>
        <Input type="textarea" name="input" placeholder={placeholder} onChange={this.handleChange}>
          {input}
        </Input>
      </FormGroup>
    )
  }
}
