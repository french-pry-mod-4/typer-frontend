import React, {Component} from 'react'
import Tile from './Tile'
import { getPassages, createGame} from '../fetches'
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
    getPassages()
      .then(passages => {
        this.setState({passages})
      })
  }

  handleLogin = () => {
    console.log('logged in')
  }

  handleNewGame = (id) => {
    if (!this.props.currentUser){ // not logged in
      this.props.history.push("/login")
    }
    else{
      console.log(id)

      createGame(id)
        .then(newGame => {
          console.log(newGame)

          this.setState({game:newGame})
          // display the gameBoard now
          this.props.history.push(`/games/${newGame.id}`)
        })
    }
  }

  searchInput = React.createRef()

  handleSearch = () => {
    this.setState({searchTerm: this.searchInput.current.value })

  }

  render() {
    const filtered = this.state.passages.filter(psg => {
      if (psg.name){
        return psg.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())
      }
      // for those that don't have name (yet) - can still search by text
      else{
        return psg.text.toLowerCase().includes(this.state.searchTerm.toLowerCase())
      }
    })
    // on filtering it looks wonky, can be fixed with adjusting the height to not change
    return (
      <section className="home-content">
        <div className="filterWrapper">
        {/* the logged out message is here */}
        {this.props.message ? <h3 className="errorMsg" style={{color:"red"}}>{this.props.message}</h3> : null }
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
              name={passage.name}
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
