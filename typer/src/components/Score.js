import React, {Component} from 'react'

export default class Score extends Component {
  render() {
    return (
        <div className="scoreStatsWrapper">
          <div className="scoreStats">{this.props.username}</div>
          <div className="scoreStats">{this.props.speed} WPM</div>
          <div className="scoreStats">{this.props.accuracy}%</div>
          {/* TODO put passage name instead */}
          <div className="scoreStats">{this.props.passage.name || this.props.passage.id}</div>
        </div>
    )
  }
}
