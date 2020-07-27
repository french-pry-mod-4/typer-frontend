import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'

import Logo from './Logo'

export default class SideBar extends Component {
  render() {
    return (
      <nav>
        <Logo />
        <ul>
          <NavLink exact to="/"><li className="sidebarItem">Home</li></NavLink>
          <NavLink to="/profile"><li className="sidebarItem">Stats</li></NavLink>
          <NavLink to="/scoreboard"><li className="sidebarItem">Scoreboard</li></NavLink>
        </ul>
      </nav>
    )
  }
}
