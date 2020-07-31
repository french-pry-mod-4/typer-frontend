import React, {Component} from 'react'
import SideBar from './SideBar'
import Home from './Home'
import Profile from './Profile'
import Scoreboard from './Scoreboard'
import GameBoard from './GameBoard'
import SignUp from './SignUp'
import Login from './Login'
import AddPassage from './AddPassage'
import { autoLogin, logout } from '../fetches'

import {
  BrowserRouter,
  Route,
  Switch,
  withRouter,
  Redirect
} from 'react-router-dom'

class Main extends Component {

  state = {
    currentUser: null,
    message: null
  }

  //log in user when component mounts
  componentDidMount(){
    autoLogin()
      .then(user => {
        this.handleLogin(user)
      })
      .catch((err) => console.error(err))
  }

  handleLogin = (currentUser) => {
    this.setState({
      currentUser,
      message: null
    })
  }

  handleLogout = () => {
    logout()
    .then(logoutResponse => {
      this.setState({
        currentUser: null,
        message: logoutResponse.message
      })
    })
  }

  render () {
    console.log("in main, state:", this.state)
    return (
      <BrowserRouter>
        {/* <h3 style={{color:"white"}}>{this.state.currentUser ? `Hi, ${this.state.currentUser.username}`: "Please login"}</h3> */}
        <main>
          <SideBar currentUser={this.state.currentUser} handleLogout={this.handleLogout}/>
          <Switch>

            <Route exact path="/" render={routeProps => (
              <Home {...routeProps}
                currentUser={this.state.currentUser}
                message={this.state.message}
              />
              )}/>
            {/* <Route exact path="/login" render={() => (
              <Login
                handleLogIn={this.handleLogin}
              />
            )}/> */}
            <Route path="/login">
            {this.state.currentUser ?  <Redirect to='/' /> : <Login handleLogIn={this.handleLogin} /> }
          </Route>
            {/* <Route exact path="/signup" render={() => (
              <SignUp
                handleLogIn={this.handleLogin}
              />
            )}/> */}
            <Route path="/signup">
              {this.state.currentUser ?  <Redirect to='/' /> : <SignUp handleLogIn={this.handleLogin}/> }
            </Route>

            <Route path="/profile">
              {this.state.currentUser ? <Profile currentUser={this.state.currentUser} /> : <Redirect to='/login' />}
            </Route>
            <Route path="/scoreboard" component={Scoreboard} />
            <Route path="/addpassage" component={AddPassage} />

            {/* <Route path="games/:id">
              {this.state.currentUser ?  <Profile currentUser={this.state.currentUser} /> : <Redirect to='/login' />}
            </Route> */}
            <Route path="/games/:id" render={routeProps => (
              <GameBoard {...routeProps} />
              )} />
          </Switch>
        </main>
      </BrowserRouter>
    )
  }
}

export default withRouter(Main);
