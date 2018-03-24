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
  // Handles when the user presses the tab key.
  handleKeyDown = (e) => {
    if (e.keyCode === 9) { // tab was pressed
      // Prevent the default event from happening.
      e.preventDefault();
      // Get the current target.
      let target = e.target;
      // get caret position/selection
      const val = target.value,
          start = target.selectionStart,
          end = target.selectionEnd;
      // set textarea value to: text before caret + tab + text after caret
      target.value = val.substring(0, start) + '\t' + val.substring(end);
      // put caret at right position again
      target.selectionStart = target.selectionEnd = start + 1;
      // Fire the on change event.
      this.props.onChange(e);
    } 
  }

  render() {
    // Class names passed to the component.
    const className = classNames("TextInput h-100 m-0 pb-3", this.props.className);
    // Input Value
    const value = this.props.value;
    // Placeholder Value for the text area.
    const placeholder = `Example:
ID1	Data1	543.21
ID2	Data2	98.65
ID4	Data4	9083`;

    return (
      <FormGroup className={className}>
        <Label>Input</Label>
        <div className="h-100" style={{paddingTop: "30px", marginTop: "-30px"}}>
          <Input type="textarea" className="h-100" name="input" 
            placeholder={placeholder} 
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            value={value} />
        </div>
      </FormGroup>
    )
  }
}
