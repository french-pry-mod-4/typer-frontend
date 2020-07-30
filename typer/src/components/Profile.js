import React, {Component} from 'react'
// import Score from './Score'
import {deleteGame, getUserstats} from '../fetches'

export default class Profile extends Component {
  state = {
    // user: "",
    games: [],

  }

  componentDidMount() {
    // custom route to get currentUser's game stats
    getUserstats()
      .then(games => {
        console.log("games", games)
        // hacky way to make sure 'empty' games don't show up
        // should really change them to be created only at the end, but hen we won't have update
        const filteredGames = games.filter(game => game.speed)
        console.log("filteredGames", filteredGames)
        this.setState( 
          { games: filteredGames } )
      })
  }

  handleDelete = (id) => {
    deleteGame(id)
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
      <div className="content">
        <div className="profile-header-wrapper">
          <div className="profile-header">
            <h1 className="profile-userName">{this.state.user}</h1>
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
          <table className="table-container">
            <thead>
            <tr>
              <th>Passage</th>
              <th>Speed</th>
              <th>Accuracy</th>
              <th>Delete</th>
            </tr>
            </thead>
            {/* create a div here that you can scroll through */}
            {console.log("state", this.state)}
            <tbody>
            {this.state.games.map((game) =>
                <tr className="tableRow-data" key={game.id}>
                  <td>{game.passage.name || game.passage.id}</td>
                  <td>{game.speed}</td>
                  <td>{game.accuracy}%</td>
                  {/* should only show up on hover */}
                  <td><button onClick={() => this.handleDelete(game.id)}>Delete</button></td>
                </tr>
              )}
              </tbody>
          </table>
        </div>
      </div>
    )
  }
}
