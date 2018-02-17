import React, { Component } from 'react'
import PropTypes from 'prop-types'

// React Components
import {
  FormGroup,
  Collapse
} from 'reactstrap';

// Components
import CollapseToggle from '../../CollapseToggle/CollapseToggle';
import AdditionalOption from "./AdditionalOption/AdditionalOption";

// Defines all the Options for configuring the output of the SQL Text Parser
export default class AdditionalOptions extends Component {
  static propTypes = {
    options: PropTypes.shape({
      tabsAsColumns: PropTypes.bool,
      trimEntries: PropTypes.bool
    }),
    expanded: PropTypes.bool,
    // Events
    onOptionChanged: PropTypes.func.isRequired
  }

  static defaultProps = {
    options: {
      tabsAsColumns: true,
      trimEntries: true
    },
    expanded: false
  }

  constructor (props) {
    super(props);
    this.state = {
      expanded: props.expanded
    }
  }

  toggle = () => {
    console.log("Click Called");
    this.setState(prev => ({expanded: !prev.expanded}));
  }

  handleChange = (e) => {
    this.props.onOptionChanged({[e.target.name]: e.target.checked});
  }

  render() {
    // The Options to assign.
    const { tabsAsColumns, trimEntries } = this.props.options;
    // Are the options expanded by default.
    const expanded = this.state.expanded;

    return (
      <FormGroup>
        <CollapseToggle className="w-100" expanded={expanded} onClick={this.toggle}>
          <strong className="pl-2">Additional Options</strong>
        </CollapseToggle>
        <Collapse className="ml-4" isOpen={expanded} aria-expanded={expanded}>
          <AdditionalOption name="tabsAsColumns" checked={tabsAsColumns} onChange={this.handleChange}>
            Treat tabs as columns
          </AdditionalOption>
          <AdditionalOption name="trimEntries" checked={trimEntries} onChange={this.handleChange}>
            Trim leading and trailing spaces
          </AdditionalOption>
        </Collapse>
      </FormGroup>
    )
  }
}
