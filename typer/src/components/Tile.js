import React, {Component} from 'react'

export default class Tile extends Component {
  render() {
    return (
      <div className="tileCardWrapper">
        <div className="tileCard" onClick={() => this.props.handleNewGame(this.props.id)}>
          {/* <p>{this.props.language}</p>
          <p>{this.props.text}</p> */}
          {/* first few words of the passage*/}
          {`${this.props.text.slice(0, 20)}...`}
        </div>
      </div>
    )
  }
}
