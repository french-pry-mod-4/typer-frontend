import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'

import Logo from './Logo'

export default class SideBar extends Component {
  render() {
    return (
      <nav>
        <Logo />
        <ul>
          <li><NavLink exact to="/">Home</NavLink></li>
          <li><NavLink to="/profile">Profile</NavLink></li>
          <li><NavLink to="/scoreboard">Scoreboard</NavLink></li>
        </ul>
      </nav>
    )
  }
}
