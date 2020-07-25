import React, {Component} from 'react'
import Tile from './Tile'
// import GameBoardContainer from './GameBoardContainer'

export default class Home extends Component {

  state = {
    users: [],
    passages: [],
    loggedIn: false,
    game: {}
  }

  componentDidMount() {
    fetch('http://localhost:3000/users')
    .then(r => r.json())
    .then(users => {
      this.setState({users})
    })

    fetch('http://localhost:3000/passages')
    .then(r => r.json())
    .then(passages => {
      this.setState({passages})
    })
  }

  handleLogin = () => {
    console.log('logged in')
  }

  handleNewGame = () => {
    console.log("click")
    fetch("http://localhost:3000/games", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({speed: 0, accuracy:0})
    })
    .then(r => r.json())
    .then(newGame => {
      console.log(newGame)
      // for when routes are set up
      // this.props.history.push(`/games/${newGame.id}`)

      console.log("text:", newGame.passage.text)
      this.setState({game:newGame})
    })
  }

  render() {
    return (
      <section className="homeWrapper">
        <div className="filterWrapper">
          <input type="text" value="Search"/>
          <select name="Language" id="" value="Language">
            Language
              <option value="Language"></option>
              <option value=""></option>
              <option value=""></option>
          </select>
        </div>
        <div className="tileWrapper">
          {this.state.passages.map((passage, index) =>
            <Tile
              key={index}
              text={passage.text}
              language={passage.language}
            />
          )}
        </div>

      </section>
    )
  }
}
