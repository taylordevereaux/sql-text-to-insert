import React, { Component } from 'react'
import PropTypes from 'prop-types'

// React Components
import {
  Label,
  FormGroup,
  
  Collapse
} from 'reactstrap';

// Components
import Icon from '../../Icon/Icon';
import AdditionalOption from "./AdditionalOption/AdditionalOption";

export default class AdditionalOptions extends Component {
  static propTypes = {
    tabsAsColumns: PropTypes.bool,
    trimEntries: PropTypes.bool,
    expanded: PropTypes.bool,
    // Events
    onOptionChanged: PropTypes.func.isRequired
  }

  static defaultProps = {
    tabsAsColumns: true,
    trimEntries: true,
    expaned: false
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
    const tabsAsColumns = this.props.tabsAsColumns;
    const trimEntries = this.props.trimEntries
    // Are the options expanded by default.
    const expanded = this.state.expanded;

    console.log(`Expanded: ${expanded}`);

    return (
      <FormGroup>
        <Label className="w-100" onClick={this.toggle}>
          {expanded 
            ? <Icon modifier="minus-square-o" className="pr-2" aria-hidden="true" />
            : <Icon modifier="plus-square-o" className="pr-2" aria-hidden="true" />}
          <strong>Additional Options</strong>
        </Label>
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
