import React, { Component } from 'react'
import PropTypes from 'prop-types'
// React Components
import {
  FormGroup,
  Collapse,
  Table
} from 'reactstrap';

// Components
import CollapseToggle from '../../CollapseToggle/CollapseToggle';
import ColumnOptionRow from './ColumnOptionRow/ColumnOptionRow';
// import AdditionalOption from "./AdditionalOption/AdditionalOption";

// Styles 
import './ColumnOptions.css';

export default class ColumnOptions extends Component {
  // Properties
  static propTypes = {
    expanded: PropTypes.bool,
    columns: PropTypes.arrayOf(PropTypes.shape({
        includeQuotes: PropTypes.bool
      })),
    onChange: PropTypes.func.isRequired
  }
  // Defaults
  static defaultProps = {
    expanded: false,
    columns: []
  }
  // Initialize State.
  state = {
    expanded: this.props.expanded
  }
  
  // Toggle the Expanded Option
  toggle = () => {
    this.setState(prev => ({expanded: !prev.expanded}));
  }
  // Handles the Column Options Changing.
  handleChange = (e) => {
    this.props.onChange(e);
  }

  render() {
    // Are the options expanded by default.
    const expanded = this.state.expanded;
    // The existing column options
    const columns = this.props.columns;
    // The rows created from the column options.
    const rows = columns.map((x, i) => 
      <ColumnOptionRow key={i} index={i} {...x} onChange={this.handleChange} />);

    return (
      <FormGroup className="ColumnOptions">
        <CollapseToggle className="w-100" expanded={expanded} onClick={this.toggle}>
          <strong className="pl-2">Column Options</strong>
        </CollapseToggle>
        <Collapse isOpen={expanded} aria-expanded={expanded}>
          <Table bordered size="sm">
            <thead>
              <tr>
                <th scope="col">Column</th>
                <th scope="col">Include Quotes</th>
              </tr>
            </thead>
            <tbody>
              {rows}
            </tbody>
          </Table>
        </Collapse>
      </FormGroup>
    )
  }
}
