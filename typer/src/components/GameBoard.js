import React, {Component} from 'react'
import Stopwatch from './Stopwatch'

export default class GameBoard extends Component{

  

// was originally using variables in componentDidUpdate, but switched it to state...
  state = {
    game: null,
    typingInput: "",
    // length: 0,
    // lastLetter: "",
    correct: 0,
    incorrect: 0, 
    gameStatus: null
  }

  // text = this.state.game.passage.text

  componentDidMount(){
    const id = this.props.match.params.id
    fetch(`http://localhost:3000/games/${id}`)
      .then(r => r.json())
      .then(game => {
        this.setState({ game })
      })
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
      // correct: 0,
      // incorrect: 0
    })
  }

  componentDidUpdate(prevProps, prevState){

    // only if they type somthing
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
        // console.log("correct", this.state.correct, "incorrect", this.state.incorrect)

    }

  }

  handleGameOver = () => {
    if (this.state.gameStatus === "running"){
      this.setState({
        gameStatus: "over"
      })
      console.log(this.calculateAccuracy())
    }
  }

  calculateAccuracy = () => {
    const correct = this.state.typingInput.length - this.state.incorrect
    return correct / this.state.typingInput.length
  }

  calculateSpeed = () => {
    // hardcoded to one minute
    const numMins = this.state.game.passage.time_alloted
    // this.state
    const correct = this.state.typingInput.length - this.state.incorrect
    return correct / this.state.typingInput.length
  }


  // wrapping each character in the passage text in a span for color styling
  renderViewText = () => {return this.state.game.passage.text.split('').map((char, index) => {
    let color = ''
    // console.log("index", index, "this.state.typingInput.length", this.state.typingInput.length)
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
  

  render(){
    // console.log("props", this.props)
    return (
      <div>
        <Stopwatch gameStatus={this.state.gameStatus} handleGameOver={this.handleGameOver}/>
        <h4>Correct: {this.state.correct}</h4>
        <h4>Incorrect: {this.state.incorrect}</h4>
        <p>{this.state.game ? this.renderViewText() : "loading..."}</p>

        <textarea name="typingInput" 
          placeholder={"begin typing here"} 
          value={this.state.typingInput} 
          onChange={this.handleTyping}
          disabled={this.state.gameStatus === "over"} // not sure how we want to set it up 
        />
      </div>
    )
  }
}