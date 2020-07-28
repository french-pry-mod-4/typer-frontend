import React, {Component} from 'react'
import Score from './Score'

export default class Scoreboard extends Component {

  state = {
    highScores: []
  }
  componentDidMount(){
    // fetch high scores
    fetch("http://localhost:3000/games")
      .then(r => r.json())
      .then(highScores => this.setState({highScores: highScores}))
  }

  render() {
    return (
      <div>
        <h1>View the High Scores!</h1>
        <table>
        <tr>
          <th>User</th>
          <th>Speed</th>
          <th>Accuracy</th>
          <th>Passage</th>
        </tr>
           
        {this.state.highScores.map((gameScore) =>
            <Score
              key={gameScore.id}
              id={gameScore.id}
              userId={gameScore.user_id}
              speed={gameScore.speed}
              accuracy={gameScore.accuracy}
              passage={gameScore.passage}
            />
          )}

  
      </table>
      </div>
    )
  }
}
