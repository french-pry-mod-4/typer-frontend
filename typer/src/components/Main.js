import React, {Component} from 'react'
import SideBar from './SideBar'
import Home from './Home'
import Profile from './Profile'
import Scoreboard from './Scoreboard'
import GameBoard from './GameBoard'
import SignUp from './SignUp'
import Login from './Login'

import {
  BrowserRouter,
  Route,
  Switch, 
  withRouter, 
  Redirect
} from 'react-router-dom'

class Main extends Component {

  state = {
    currentUser: null
  }

  //log in user when component mounts
  componentDidMount(){
    fetch("http://localhost:3000/autologin", {
      credentials: "include" // tells browser to send cookies with fetch req
    })
    .then(r => {
      if (r.ok) {
        return r.json()
      }
      else{
        throw Error("Not logged in!")
      }
    })
    .then(user => {
      this.handleLogin(user)
    })
    .catch((err) => console.error(err))
  }

  handleLogin = (currentUser) => {
    this.setState({currentUser}, () => {
      // this.props.history.push("/")
    })
  }

  handleLogout = () => {
    fetch("http://localhost:3000/logout", {
      credentials: "include" 
    })
    .then(r => r.json())
    .then(() => { 
      this.setState({currentUser: null})
    })
  }

  render () {
    console.log("in main, state:", this.state)
    return (
      <BrowserRouter>
        <h3 style={{color:"white"}}>{this.state.currentUser ? `Hi, ${this.state.currentUser.username}`: "Please login"}</h3>
        <main>
          <SideBar currentUser={this.state.currentUser} handleLogout={this.handleLogout}/>
          <Switch>

            <Route exact path="/" render={routeProps => (
              <Home {...routeProps}
                currentUser={this.state.currentUser}
              />  
              )}/>
            <Route exact path="/login" render={() => (
              <Login
                handleLogIn={this.handleLogin}
              /> 
            )}/>
            <Route exact path="/signup" render={() => (
              <SignUp
                handleLogIn={this.handleLogin}
              /> 
            )}/>

            <Route path="/profile">
              {this.state.currentUser ? <Profile currentUser={this.state.currentUser} /> : <Redirect to='/login' />}
            </Route>
            <Route path="/scoreboard" component={Scoreboard} />

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