import React, {Component} from 'react'

export default class Score extends Component {
  render() {
    console.log(this.props)
    return (
        <tr>
          {/* TODO put username instead */}
          <td>User: {this.props.userId}</td>
          <td>Speed: {this.props.speed}</td>
          <td>Accuracy: {this.props.accuracy}</td>
          {/* TODO put passage name instead */}
          <td>Passage: {this.props.passage.id}</td>
        </tr>
    )
  }
}
