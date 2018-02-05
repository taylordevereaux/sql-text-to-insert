import React, { Component } from 'react'
import {bool, number, func} from 'prop-types'
// React Components
import {Input} from 'reactstrap'

export default class ColumnOptionRow extends Component {
  static propTypes = {
    index: number,
    includeQuotes: bool,
    onChange: func.isRequired
  }

  handleChange = (e) => {
    this.props.onChange({
      index: this.props.index,
      option: { [e.target.name]: e.target.checked }
    });  
  }

  render () {
    const { index, includeQuotes } = this.props;
    return (
      <tr>
        <th scope="row">{index}</th> 
        <td><Input type="checkbox" name="includeQuotes" checked={includeQuotes} onChange={this.handleChange}  /></td>
      </tr>
    );
  }
}
