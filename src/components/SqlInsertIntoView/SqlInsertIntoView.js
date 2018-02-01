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

export default class SqlInsertIntoView extends Component {
  constructor (props) {
    super(props);
    this.state = {
      options: {
        trimEntries: true,
        tabsAsColumns: true
      },
      columnOptions: {

      }
    }
  }
  
  static propTypes = {
    className: PropTypes.string
  }

  handleAdditionalOptions = (option) => {
    this.setState(prev => ({options: Object.assign(prev.options, option)}));
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
            <AdditionalOptions onOptionChanged={this.handleAdditionalOptions} {...options} />
          </Form>
          <label data-toggle="collapse" data-target="#columnOptionsForm" aria-expanded="true" aria-controls="columnOptionsForm">
            <i className="fa fa-plus-square-o pr-2 collapsed" aria-hidden="true"></i>
            <i className="fa fa-minus-square-o pr-2 expanded" aria-hidden="true"></i>
            <strong>Column Options</strong>
          </label>
          <div className="collapse show ml-4" id="columnOptionsForm" aria-expanded="true" aria-controls="columnOptionsForm">
            <table className="table" id="columnOptionsTable">
              <thead>
                <tr>
                  <th>Column</th>
                  <th>Include Quotes</th>
                </tr>
              </thead>
              <tbody>
              </tbody>
            </table>
          </div>
        </Col>
        <Col {...cols}>
          <div className="row">
            <div className="col">
              <label className="section-label">Input</label>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <textarea id="input" className="form-control" placeholder={`Example:
              ID1	Data1	543.21
              ID2	Data2	98.65
              ID4	Data4	9083
              `}></textarea>
              </div>
            </div>
          </div>
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
