import React, {Component} from 'react'
import Stopwatch from './Stopwatch'
import Odometer from 'react-odometerjs'
import 'odometer/themes/odometer-theme-default.css'

export default class GameBoard extends Component{

  state = {
    game: null,
    typingInput: "",
    // length: 0,
    // lastLetter: "",
    incorrect: 0,
    gameStatus: null
  }

  // text = this.state.game.passage.text
  id = this.props.match.params.id

  componentDidMount(){
    // const id = this.props.match.params.id
    fetch(`http://localhost:3000/games/${this.id}`, {
      credentials: "include"
    })
    .then(r => r.json())
    .then(game => {
      this.setState({ game })
    })
  }

  componentWillUnmount(){
    if (!this.state.game.speed){ // speed is null(game wasn't completed) or 0
      fetch(`http://localhost:3000/games/${this.id}`, {
        method: 'DELETE',
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(r => r.json())
      .then(response => console.log("deleted:", response))
    }
  }

  handleTyping = (e) => {

    // if the game is over, don't allow typing
    // (or we can diable the input field - not sure how we want to set it up, but don't really need both)
    // see textarea below in the return
    if (this.state.gameStatus === "over"){
      return
    }
    // if it's the first character, start the timer
    // else if
    if (!this.state.gameStatus){
      this.setState({
        gameStatus: "running"
      })
    }
    this.setState({ //prevState =>({
      typingInput: e.target.value,
      // not sure if this way would work when backspacing
      // length: prevState.length + 1,
      lastLetter: e.target.value.slice(-1)//e.target.value.charAt(prevState.length), //normally length -1 , but since prevState...
      // incorrect: 0
    })
  }

  componentDidUpdate(prevProps, prevState){

    // only if user types something
    if (prevState.typingInput !== this.state.typingInput){

      const length = this.state.typingInput.length
      // character typed
      const char = this.state.typingInput.charAt(length -1)
      // character in the passage
      const passageChar = this.state.game.passage.text[length -1 ]

      // console.log(char === passageChar)
      if (char === passageChar){
        this.setState({
          correct: prevState.correct + 1
        })
      }
      else{
        this.setState({
          incorrect: prevState.incorrect + 1
        })
      }
    }

  }

  handleGameOver = () => {
    if (this.state.gameStatus === "running"){
      this.setState({
        gameStatus: "over"
      })
      console.log(this.calculateAccuracy())
      console.log("speed (wpm)", this.calculateSpeed())
      this.updateScores(this.calculateSpeed(), this.calculateAccuracy())
    }
  }

  updateScores(speed, accuracy){
    const scoreInfo = {
      speed,
      accuracy
    }
    console.log(scoreInfo)
    fetch(`http://localhost:3000/games/${this.id}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(scoreInfo)
    })
    .then(r => r.json())
    .then(updatedGame => {
      this.setState({ game: updatedGame })
      console.log(updatedGame)
    })
  }

  calculateAccuracy = () => {
    const { typingInput, incorrect} = this.state
    const correct = typingInput.length - incorrect
    const accuracy = correct / typingInput.length
    return (accuracy * 100 ).toFixed(2)
  }

  calculateSpeed = () => {
    // hardcoded to one minute
    const { typingInput, game: {passage: {time_allotted}}} = this.state
    const numMins = time_allotted / 60
    const cpm = typingInput.length / numMins  //.1 when testing with 6 seconds
    const wpm = cpm / 5 // maybe average word is 5 char??
    return Math.round(wpm) // how precise do we want this??
  }

  // wrapping each character in the passage text in a span for color styling
  renderViewText = () => {return this.state.game.passage.text.split('').map((char, index) => {
    let color = ''
    if (index < this.state.typingInput.length){
      if (char === this.state.typingInput[index]){
        color = 'green'
      }
      else{
        color = 'red'
      }
    }
    return <span key={index} className={color}>{char}</span>

  })
}

// showTimeAllotted = () => {
//   return this.state.game.passage.time_allotted
// }


  render(){
    // console.log("props", this.props)
    // const time = this.state.game ? this.state.game.passage.time_allotted : "test"
    // console.log("time" , time)
    return (
      <div className="content">
        <div className="gameboardContainer">
          <div className="gameBoardBG">
            <div className="gameDetailsContainer">
                <Stopwatch
                  timeAllotted={this.state.game ? this.state.game.passage.time_allotted : null}
                  gameStatus={this.state.gameStatus} handleGameOver={this.handleGameOver}/>
                <div className="errorsContainer">
                  <h3 className="gameDetails">Errors</h3>
                  <Odometer
                    value={this.state.incorrect}
                    className="odometerVals"
                    format="(.ddd),dd" />
                </div>

              {/* If you don't want the incorrect to show up until the game begins, see below (currently commenteed out): */}
              {/* {this.state.gameStatus ?
                <h4>Incorrect: {this.state.incorrect}</h4> : null } */}
              {this.state.gameStatus === "over" ?
              <div>
                <div className="speedContainer">
                  <h4 className="gameDetails">WPM</h4>
                  <Odometer
                    value={this.calculateSpeed()}
                    className="odometerVals"
                    format="(.ddd),dd" />
                </div>
                <div className="accuracyContainer">
                  <h4 className="gameDetails">Accuracy {this.calculateAccuracy()}%</h4>
                </div>
              </div>  : null}
            </div>
            <div className="passageTextContainer">
              <p className="passageText">{this.state.game ? this.renderViewText() : "loading..."}</p>
            </div>

            <div className="passageInputContainer">
              <textarea
                className="passageInput"
                name="typingInput"
                spellcheck="false"
                // placeholder={"begin typing here"}
                value={this.state.typingInput}
                onChange={this.handleTyping}
                disabled={this.state.gameStatus === "over"} // not sure how we want to set it up
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
