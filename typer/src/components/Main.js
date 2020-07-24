import React, {Component} from 'react'
import SideBar from './SideBar'
import Home from './Home'
import Profile from './Profile'
import Scoreboard from './Scoreboard'
// import SignUp from './SignUp'
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom'

export default class Main extends Component {
  state = {
    users: [],
    loggedIn: false
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
