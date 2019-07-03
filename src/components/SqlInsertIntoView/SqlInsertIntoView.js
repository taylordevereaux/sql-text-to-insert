import React, { Component } from 'react'
import PropTypes from 'prop-types'
// Utilities
import classNames from 'classnames';
import {
  parseColumnCount,
  parseSQLInsertInto
} from '../../utils/parser';
// ReactStrap Components
import {
  Form,
  // FormGroup,
  // Label,
  // Input,
  // Container
  Col,
  Row
} from 'reactstrap'

// Components
import HeaderView from '../HeaderView/HeaderView';
import TableName from './TableName/TableName';
import AdditionalOptions from './AdditionalOptions/AdditionalOptions';
import ColumnOptions from './ColumnOptions/ColumnOptions';
import TextInput from './TextInput/TextInput';
import TextOutput from './TextOutput/TextOutput';

export default class SqlInsertIntoView extends Component {
  // Properties
  static propTypes = {
    className: PropTypes.string
  }
  // Set the default state of the view. 
  state = {
    tableName: "",
    options: {
      trimEntries: true,
      tabsAsColumns: true,
      singleQuotes: true
    },
    columns: [],
    input: ""
  }
  ////////////////////////////
  // Helper Functions
  ////////////////////////////
  updateColumns (value, columns, options) {
    let count = options.tabsAsColumns ? parseColumnCount(value) : 1;
    // Then we need to update the state with more or less columns
    // depending on the text.
    const length = columns.length;
    // We need to remove some columns 
    if (length > count) {
      columns = columns.filter((x, i) => i < count);
    }
    // We need to add more column options.
    else if (length < count) {
      for (let i = length; i < count; ++i) {
        columns.push(ColumnOption());
      }
    }
    return columns;
  }
  

  ////////////////////////////
  // Event Handlers
  ////////////////////////////
  // Handles the Table name changing 
  handleTableNameChange = (e) => {
    this.setState({tableName: e.target.value});
  }
  // Handles anytime an additional option is changed.
  handleAdditionalOptions = (option) => {
    this.setState(prev => {
      // Get the new options 
      const options = Object.assign(prev.options, option);
      // Get the new column count based on the options.
      const columns = this.updateColumns(prev.input, prev.columns, options);

      return { 
        options: options,
        columns: columns
      };
    });
  }
  // Handles the Column Options from changing.
  handleColumnOptions = (e) => {
    this.setState(prev => {
      let columns = prev.columns;
      let col = columns.length > e.index && columns[e.index];
      if (!!col) {
       col = Object.assign(col, e.option); 
      }
      return {columns: columns};
    });
  }
  // Handles the text input from changing.
  handleTextInputChange = (e) => {
    const value = e.target.value;

    this.setState(prev => {
      // Get the new column count based on the options.
      const columns = this.updateColumns(value, prev.columns, prev.options);
      
      return {
        input: value,
        columns: columns 
      };
    });
  }

  render() {
    // const textUpdated = this.textUpdated;
    // this.textUpdated = false;
    // Header View Class Names
    const viewClass = classNames('row d-flex flex-fill no-gutters', this.props.className);
    // Default Column Settings for the top level columns
    const cols = {
      xs: 12,
      sm: 12,
      md: 12,
      lg: 6,
      xl: 6
    }
    // Table name 
    const tableName = this.state.tableName;
    // Options passed to the Additional Options COmponent.
    const options = this.state.options;
    // Column options passed.
    const columns = this.state.columns;   
    // Text Input 
    const input = this.state.input;
    // Calculate The output.
    const output = parseSQLInsertInto(input, tableName, columns, options);
    // Render Method
    return (
      <div id='SqlInsertIntoView' className={viewClass}>
        <Col className="d-flex flex-column">
          <Row>
            <HeaderView className="col col-12"
              title={'SQL INSERT INTO Text Parser'}>
              <p>Simply paste in text and it will auto format each newline into an <strong>INSERT INTO VALUES</strong> entry</p>
              <hr />
            </HeaderView>
          </Row>
          <Row className="d-flex flex-row h-100">
            <Col {...cols} className="d-flex flex-column">
              <Form>
                <TableName value={tableName} onChange={this.handleTableNameChange} />
                <AdditionalOptions onOptionChanged={this.handleAdditionalOptions} options={options} />
                <ColumnOptions columns={columns} onChange={this.handleColumnOptions} />
              </Form>
            </Col>
            <Col {...cols} className="d-flex flex-column pb-3">
              <div className="h-50">
                <TextInput value={input} onChange={this.handleTextInputChange} />
              </div>
              <div className="h-50">
                <TextOutput value={output} />
              </div>
            </Col>
          </Row>
        </Col>
      </div>
    );
  }
}

// Column Option
function ColumnOption (includeQuotes = true) {
  return {
    includeQuotes: includeQuotes
  };
}