import React, { Component } from 'react'
import PropTypes from 'prop-types'
// Utilities
import classNames from 'classnames';
// ReactStrap Components
import {
  Form,
  FormGroup,
  Label,
  Input,
  // Container
  Col
} from 'reactstrap'

// Components
import HeaderView from '../HeaderView/HeaderView';
import TableName from './TableName/TableName';
import AdditionalOptions from './AdditionalOptions/AdditionalOptions';
import ColumnOptions from './ColumnOptions/ColumnOptions';
import TextInput from './TextInput/TextInput';

export default class SqlInsertIntoView extends Component {
  // Properties
  static propTypes = {
    className: PropTypes.string
  }
  // Set the default state of the view.
  constructor (props) {
    super(props);
    this.state = {
      options: {
        trimEntries: true,
        tabsAsColumns: true
      },
      columnOptions: {

      },
      input: ""
    }
  }
  

  // Handles anytime an additional option is changed.
  handleAdditionalOptions = (option) => {
    this.setState(prev => ({options: Object.assign(prev.options, option)}));
  }
  // Handles the text input from changing.
  handleTextInputChange = (e) => {
    const value = e.target.value;
    this.setState(prev => ({input: value}));
  }

  render() {
    // Header View Class Names
    const viewClass = classNames('row', this.props.className);
    // Default Column Settings for the top level columns
    const cols = {
      sm: 12,
      md: 12,
      lg: 6,
      xl: 6
    }
    // Options passed to the Additional Options COmponent.
    const options = this.state.options;
    // Text Input 
    const input = this.state.input;

    // Render Method
    return (
      <div id='SqlInsertIntoView' className={viewClass}>
        <HeaderView className="col" 
          title={'SQL INSERT INTO Text Parser'}>
          <p>Simply paste in text and it will auto format each newline into an <strong>INSERT INTO VALUES</strong> entry</p>
          <hr />
        </HeaderView>
        <Col {...cols}>
          <Form>
            <TableName />
            <AdditionalOptions onOptionChanged={this.handleAdditionalOptions} options={options} />
            <ColumnOptions />
          </Form>
        </Col>
        <Col {...cols}>
          <TextInput input={input} onChange={this.handleTextInputChange} />
          <div className="row justify-content-between">
            <div className="col-8">
              <label className="section-label">Output</label>
            </div>
            <div className="col-4 text-right" >
              <button id="copyBtn" className="btn btn-secondary btn-sm">Copy</button>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <pre id="output"></pre>
            </div>
          </div>
        </Col>
      </div>
    );
  }
}
