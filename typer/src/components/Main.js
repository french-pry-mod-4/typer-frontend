import React, {Component} from 'react'
import SignUp from './SignUp'

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
      <div>
        <h1>Hello World</h1>
        <SignUp
          login={this.handleLogin}
        />
      </div>
    )
  }
}
