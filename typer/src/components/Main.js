import React, {Component} from 'react'
import SignUp from './SignUp'
import { Route } from 'react-router-dom'
import GameBoardContainer from './GameBoardContainer'

export default class Main extends Component {
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

  render () {
    return (
      <div>
        <h1>Hello World</h1>
        <SignUp
          login={this.handleLogin}
        />
        <button onClick={this.handleNewGame}>Start a game</button>

        <p>{ this.state.game.passage ? <GameBoardContainer gameInfo={this.state.game}/> : "click \"Start a game\" button to begin"}</p>
      </div>
    )
  }
}
