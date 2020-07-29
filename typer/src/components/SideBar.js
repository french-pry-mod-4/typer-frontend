import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'

import Logo from './Logo'

export default class SideBar extends Component {

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
            <button onClick={handleLogout}>Logout</button>
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
