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

  // have your handler to filter here

  render() {
    return (
      <div className="sb_content">
        <div className="leaderBoardHeader">
          <div className="leaderBoardHeaderInner">
            <h1 className="leaderboardH1">Leaderboard</h1>
          </div>
        </div>
        {/* <div className="table-container"> */}
        <div className="scoreStatsContainer">
          <div className="scoreStatsHeader"><h2>User</h2></div>
          <div className="scoreStatsHeader"><h2>Speed</h2></div>
          <div className="scoreStatsHeader"><h2>Accuracy</h2></div>
          <div className="scoreStatsHeader"><h2>Passage</h2></div>
        </div>

        <div className="scoreStatsScroll">
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
        </div>


      {/* </div> */}
      </div>
    )
  }
}
