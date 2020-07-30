import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import {withRouter} from 'react-router'

import Logo from './Logo'

class SideBar extends Component {

  handleLogoutClick = () => {
    this.props.handleLogout()
    this.props.history.push("/")
  }
  render() {
    const {currentUser, handleLogout } = this.props
    return (
      <nav>
        <Logo />
        {currentUser ? (
          <>
        <NavLink exact to="/"><li className="sidebarItem">Home</li></NavLink>
        <NavLink to="/profile"><li className="sidebarItem">Stats</li></NavLink>
        <NavLink to="/scoreboard"><li className="sidebarItem">Scoreboard</li></NavLink>
            <li className="sidebarItem" onClick={this.handleLogoutClick}>Logout</li>
          </>
        ) : (
            <>
              <NavLink to="/signup"><li className="sidebarItem">Signup</li></NavLink>
              <NavLink to="/login"><li className="sidebarItem">Login</li></NavLink>
            </>
          )}
      </nav>
    )
  }
}

export default withRouter(SideBar);
