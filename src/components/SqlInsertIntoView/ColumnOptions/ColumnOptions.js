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
// import AdditionalOption from "./AdditionalOption/AdditionalOption";

export default class ColumnOptions extends Component {
  // Properties
  static propTypes = {
    expanded: PropTypes.bool
  }
  // Defaults
  static defaultProps = {
    expanded: false
  }
  // Initialize State.
  constructor (props) {
    super(props);
    this.state = {
      expanded: props.expanded
    }
  }
  
  // Toggle the Expanded Option
  toggle = () => {
    this.setState(prev => ({expanded: !prev.expanded}));
  }

  render() {
    // Are the options expanded by default.
    const expanded = this.state.expanded;

    return (
      <FormGroup>
        <CollapseToggle className="w-100" expanded={expanded} onClick={this.toggle}>
          <strong className="pl-2">Column Options</strong>
        </CollapseToggle>
        <Collapse className="ml-4" isOpen={expanded} aria-expanded={expanded}>
          <Table>
            <thead>
              <tr>
                <th>Column</th>
                <th>Include Quotes</th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </Table>
        </Collapse>
      </FormGroup>
    )
  }
}
