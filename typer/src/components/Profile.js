import React, {Component} from 'react'

export default class Profile extends Component {
  state = {
    user: "",
    games: [],

  }

  componentDidMount() {
    fetch('http://localhost:3000/users/1')
    .then(r => r.json())
    .then(user => {
      this.setState({
        // hardcoded the user here :shrug
        user: user[1].username,
        games: user[1].games
      })
    })
  }

  render() {
    const calcWPM = this.state.games.reduce((total, game) => total + game.speed, 0)
    const calcAccuracy = this.state.games.reduce((total, game) => total + game.accuracy, 0)
    return (
      <div className="content">
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
              <h3>{parseInt(calcAccuracy / this.state.games.length)}</h3>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
