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
      <div className="sb_content">
        <div className="leaderBoardHeader">
          <div className="leaderBoardHeaderInner">
            <h1 className="leaderboardH1">Leaderboard</h1>
          </div>
        </div>
        <table className="table-container">
        <div className="scoreStatsContainer">
          <div className="scoreStats">User</div>
          <div className="scoreStats">Speed</div>
          <div className="scoreStats">Accuracy</div>
          <div className="scoreStats">Passage</div>
        </div>

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
