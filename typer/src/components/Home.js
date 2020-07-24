import React, {Component} from 'react'
import GameBoardContainer from './GameBoardContainer'

export default class Home extends Component {

  state = {
    users: [],
    loggedIn: false,
    game: {}
  }

  componentDidMount() {
    fetch('http://localhost:3000/users')
    .then(r => r.json())
    .then(users => {
      this.setState({users})
    })
  }

  handleLogin = () => {
    console.log('logged in')
  }

  handleNewGame = () => {
    console.log("click")
    fetch("http://localhost:3000/games", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({speed: 0, accuracy:0})
    })
    .then(r => r.json())
    .then(newGame => {
      console.log(newGame)
      // for when routes are set up
      // this.props.history.push(`/games/${newGame.id}`)

      console.log("text:", newGame.passage.text)
      this.setState({game:newGame})
    })
  }

  render() {
    return (
      <div>
        <h1>This will render the tile container</h1>
        <p>Inside this will be all of the styled tiles for each game to select</p>

          <button onClick={this.handleNewGame}>Start a game</button>

         <p>{ this.state.game.passage ? <GameBoardContainer gameInfo={this.state.game}/> : "click \"Start a game\" button to begin"}</p>
      </div>
    )
  }
}
