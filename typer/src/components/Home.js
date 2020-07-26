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

  handleNewGame = (id) => {
    console.log(id)
    const postBody = {
      speed: 0,
      accuracy: 0,
      passage_id: id
    }
    fetch("http://localhost:3000/games", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postBody)
    })
    .then(r => r.json())
    .then(newGame => {
      console.log(newGame)

      console.log("text:", newGame.passage.text)
      this.setState({game:newGame})
      // want to display the gameBoard now

      this.props.history.push(`/games/${newGame.id}`)
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
              id={passage.id}
              text={passage.text}
              language={passage.language}
              handleNewGame={this.handleNewGame}
            />
          )}
        </div>

      </section>
    )
  }
}
