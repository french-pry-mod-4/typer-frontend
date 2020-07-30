import React, {Component} from 'react'

export default class Score extends Component {
  render() {
    console.log(this.props)
    return (
        <tr>
          <td>{this.props.username}</td>
          <td>{this.props.speed}</td>
          <td>{this.props.accuracy}</td>
          {/* TODO put passage name instead */}
          <td>{this.props.passage.name || this.props.passage.id}</td>
        </tr>
    )
  }
}
