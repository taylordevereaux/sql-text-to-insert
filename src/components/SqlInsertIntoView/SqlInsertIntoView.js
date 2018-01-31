import React, { Component } from 'react'
import PropTypes from 'prop-types'
// Utilities
import classNames from 'classnames';
// ReactStrap Components
import {
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap'

// Components
import HeaderView from '../HeaderView/HeaderView';

export default class SqlInsertIntoView extends Component {
  static propTypes = {
    className: PropTypes.string
  }

  render() {
    const viewClass = classNames('row', this.props.className);
    return (
      <div id='SqlInsertIntoView' className={viewClass}>
        <HeaderView className="col" 
          title={'SQL INSERT INTO Text Parser'}>
          Simply paste in text and it will auto format each newline into an <strong>INSERT INTO VALUES</strong> entry
          <hr />
        </HeaderView>
        <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6">
          <div className="form">
            <div className="form-group">
              <label for="tableName">Table Name</label>
              <input name="tableName" className="form-control" id="tableName" type="text" placeholder="Ex: @Values, #Values or dbo.Values" />
            </div>
            <div className="form-group">
              <label className="w-100" data-toggle="collapse" data-target="#additionalOptions" aria-expanded="false" aria-controls="additionalOptions">
                <i className="fa fa-plus-square-o pr-2 collapsed" aria-hidden="true"></i>
                <i className="fa fa-minus-square-o pr-2 expanded" aria-hidden="true"></i>
                <strong>Additional Options</strong>
              </label>
              <div id="additionalOptions" className="collapse ml-4" aria-expanded="false" aria-controls="additionalOptions">
                <div className="form-group">
                  <div className="form-check">
                    <input className="form-check-input" name="tabColumns" id="tabColumns" type="checkbox" checked />
                    <label className="form-check-label" for="tabColumns">Treat tabs as columns</label>
                  </div>
                </div>
                <div className="form-group">
                  <div className="form-check">
                    <input className="form-check-input" name="trimEntries" id="trimEntries" type="checkbox" checked />
                    <label className="form-check-label" for="trimEntries">Trim leading and trailing spaces</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
        </div>
        <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6">
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
        </div>
      </div>
    );
  }
}
