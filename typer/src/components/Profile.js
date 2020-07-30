import React, {Component} from 'react'
import Score from './Score'

export default class Profile extends Component {
  state = {
    // user: "",
    games: [],

  }

  componentDidMount() {
    // custom route to get currentUser's game stats
    fetch('http://localhost:3000/userstats',{
      credentials: "include"
    })
    .then(r => r.json())
    .then(games => {
      console.log("games", games)
      this.setState(
        { games } )
    })
  }

  handleDelete = (id) => {
    fetch(`http://localhost:3000/games/${id}`, {
      method: 'DELETE',
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(r => r.json)
    .then(response => {
      const updatedGames = this.state.games.filter(game => game.id !== id)
      this.setState({
        games: updatedGames
      })
      console.log("deleted:", response)
    })
  }

  render() {
    const calcWPM = this.state.games.reduce((total, game) => total + game.speed, 0)
    const calcAccuracy = this.state.games.reduce((total, game) => total + game.accuracy, 0)
    return (
      <div className="sb_content">
        <div className="profile-header-wrapper">
          <div className="profile-header">

            {/* <h1 className="profile-userName">{this.state.user}</h1> */}
            <div className="profile-userStats">
              <div className="statsDataContainer">
                <h2>Games</h2>
                <h3>{this.state.games.length}</h3>
              </div>
              <div className="statsDataContainer">
                <h2>WPM</h2>
                <h3>{parseInt(calcWPM / this.state.games.length) || 0}</h3>
              </div>
              <div className="statsDataContainer">
                <h2>Accuracy</h2>
                <h3>{parseInt(calcAccuracy / this.state.games.length) || 0}%</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="profile-scores">
            <tr>
              <th>Passage</th>
              <th>Speed</th>
              <th>Accuracy</th>
              <th>Delete</th>
            </tr>
            {/* create a div here that you can scroll through */}
            {console.log("state", this.state)}
            <div className="profileStatsScroll">
              {this.state.games.map((game) =>
                  <tr className="tableRow-data" id={game.id}>
                    <td>{game.passage.name || game.passage.id}</td>
                    <td>{game.speed}</td>
                    <td>{game.accuracy}%</td>
                    {/* should only show up on hover */}
                    <td><button onClick={() => this.handleDelete(game.id)}>Delete</button></td>
                  </tr>
                )}
            </div>
        </div>
      </div>
    )
  }
}
