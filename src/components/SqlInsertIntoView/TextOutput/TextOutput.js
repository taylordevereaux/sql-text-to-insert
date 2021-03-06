import React, { Component } from 'react'
import { string } from 'prop-types'
// Utilities
// import classNames from 'classnames';
// ReactStrap Components
import {
  Button,
  Label
} from 'reactstrap'

// Styles 
import './TextOutput.css';

export default class TextOutput extends Component {
  // Properties.
  static propTypes = {
    value: string
  }
  // Default Properties.
  static defaultProps = {
    value: ""
  }
  // We need to get a reverence to the Pre object to setup the text selection.
  handlePreRef = (pre) => this.pre = pre;

  // When the copy button is clicked we need to select all the text in the pre element.
  handleCopy = (e) => {
    const pre = this.pre;
    let range;
    let selection;

    if (document.body.createTextRange) {
        range = document.body.createTextRange();
        range.moveToElementText(pre);
        range.select();
    } else if (window.getSelection) {
        selection = window.getSelection();
        range = document.createRange();
        range.selectNodeContents(pre);
        selection.removeAllRanges();
        selection.addRange(range);
    }
  }

  render() {
    const value = this.props.value;
    return (
      <div className="TextOutput h-100">
        <div className="d-flex justify-content-between align-items-end mb-1">
          <Label>Output</Label>
          <Button color="secondary" size="sm" onClick={this.handleCopy}>Copy</Button>
        </div>
        <div className="h-100" style={{paddingTop: "36px", marginTop: "-36px"}}>
          <pre className="h-100" ref={this.handlePreRef}>{value}</pre>
        </div>
      </div>
    )
  }
}
