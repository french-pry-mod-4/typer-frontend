import React, {Component} from 'react'
import SideBar from './SideBar'
import Home from './Home'
import Profile from './Profile'
import Scoreboard from './Scoreboard'
import GameBoardContainer from './GameBoardContainer'
// import SignUp from './SignUp'
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom'

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
      <BrowserRouter>
        <main>
          <SideBar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/profile" component={Profile} />
            <Route path="/scoreboard" component={Scoreboard} />
          </Switch>
        </main>
      </BrowserRouter>
    )
  }
}
