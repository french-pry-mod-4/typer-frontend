import React, {Component} from 'react'
import Score from './Score'

export default class Profile extends Component {
  state = {
    user: "",
    games: [],

  }

  componentDidMount() {
    fetch('http://localhost:3000/users/1')
    .then(r => r.json())
    .then(users => {
      this.setState({
        user: users[0].username,
        games: users[0].games
      })
    })
  }

  handleDelete = (id) => {
    fetch(`http://localhost:3000/games/${id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(r => r.json())
    .then(response => {
      console.log(response)

      const updatedGames = this.state.games.filter(game => game.id !== id)
      this.setState({
        games: updatedGames
      })
      
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
                <h3>{parseInt(calcWPM / this.state.games.length)}</h3>
              </div>
              <div className="statsDataContainer">
                <h2>Accuracy</h2>
                <h3>{parseInt(calcAccuracy / this.state.games.length)}%</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="profile-scores">
          <table className="table-container">
            <tr>
              <th>Passage</th>
              <th>Speed</th>
              <th>Accuracy</th>
              <th>Delete</th>
            </tr>
            {/* create a div here that you can scroll through */}
            {this.state.games.map((game) =>
                <tr className="tableRow-data" id={game.id}>
                  <td>{game.id}</td>
                  <td>{game.speed}</td>
                  <td>{game.accuracy}%</td>
                  {/* should only show up on hover */}
                  <td><button onClick={() => this.handleDelete(game.id)}>Delete</button></td>
                </tr>
              )}
          </table>
        </div>
      </div>
    )
  }
}
