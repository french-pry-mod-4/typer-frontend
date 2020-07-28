import React, {Component} from 'react'
import Tile from './Tile'
// import GameBoardContainer from './GameBoardContainer'

export default class Home extends Component {

  state = {
    // users: [],
    passages: [],
    loggedIn: false,
    game: {},
    searchTerm: ""
  }

  componentDidMount() {
    // fetch('http://localhost:3000/users')
    // .then(r => r.json())
    // .then(users => {
    //   this.setState({users})
    // })

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

  searchInput = React.createRef()

  handleSearch = () => {
    this.setState({searchTerm: this.searchInput.current.value })

  }

  render() {
    const filtered = this.state.passages.filter(psg => psg.text.includes(this.state.searchTerm))
    // on filtering it looks wonky, can be fixed with adjusting the height to not change
    return (
      <section className="content">
        <div className="filterWrapper">
          <input className="searchBar"
            type="text"
            placeholder="Search for a passage..."
            ref={this.searchInput}
            onChange={this.handleSearch}/>
        </div>
        <div className="tileWrapper">
          {filtered.map((passage, index) =>
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
