import React, {Component} from 'react'

export default class SignUp extends Component {
  usernameInput = React.createRef()
  passwordInput = React.createRef()

  render() {
    return (
      <form onChange={this.props.login}>
        <input type="text" ref={this.usernameInput}/>
        <input type="password" ref={this.passwordInput}/>
        <input type="submit"/>
      </form>
    )
  }
}
