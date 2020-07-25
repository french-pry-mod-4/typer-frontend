import React, {Component} from 'react'
import SideBar from './SideBar'
import Home from './Home'
import Profile from './Profile'
import Scoreboard from './Scoreboard'
// import GameBoardContainer from './GameBoardContainer'
// import SignUp from './SignUp'
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom'

export default class Main extends Component {


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
