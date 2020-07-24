import React, {Component} from 'react'

export default class GameBoardContainer extends Component{

  render(){
    return (
      <p>{this.props.gameInfo.passage.text}</p>
    )
  }
}