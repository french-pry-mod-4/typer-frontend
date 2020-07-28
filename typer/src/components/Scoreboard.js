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
      .then(highScores => {
        console.log("highscores", highScores)
        this.setState({highScores: highScores}
        )})
  }

  render() {
    return (
      <div>
        <h1>View the High Scores!</h1>
        <table className="table-container">
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
              username={gameScore.user.username}
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
