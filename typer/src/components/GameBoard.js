import React, {Component} from 'react'

export default class GameBoard extends Component{

  state = {
    game: null
  }

  componentDidMount(){
    const id = this.props.match.params.id
    fetch(`http://localhost:3000/games/${id}`)
      .then(r => r.json())
      .then(game => {
        this.setState({ game })
      })
  }
  render(){
    return (
      // <div>hello</div>
      <p>{this.state.game ? this.state.game.passage.text : "loading..."}</p>
    )
  }
}

// // was originally using variables in componentDidUpdate, but switched it to state...
// state = {
//   typingInput: "",
//   // length: 0,
//   // lastLetter: "",
//   correct: 0,
//   incorrect: 0
// }

// handleTyping = (e) => {
//   this.setState({ //prevState =>({
//     typingInput: e.target.value,
//     // not sure if this way would work when backspacing
//     // length: prevState.length + 1,
//     lastLetter: e.target.value.slice(-1)//e.target.value.charAt(prevState.length), //normally length -1 , but since prevState...
//     // correct: 0,
//     // incorrect: 0
//   })

//   console.log(e.target)


// }

// componentDidUpdate(prevProps, prevState){

//   // only if they type somthing
//   if (prevState.typingInput !== this.state.typingInput){

//     const length = this.state.typingInput.length
//     // character typed
//     const char = this.state.typingInput.charAt(length -1)
//     // character in the passage
//     const passageChar = this.props.gameText[length -1 ]

//     console.log(char === passageChar)
//       if (char === passageChar){
//         console.log("this", this)
//         this.setState({
//           correct: prevState.correct + 1
//         })
//       }
//       else{
//         this.setState({
//           incorrect: prevState.incorrect + 1
//         })
//       }
//       console.log("correct", this.state.correct, "incorrect", this.state.incorrect)

//   }

// }
//  // wrapping each character in the passage text in a span for color styling
// renderViewText = () => {return this.props.gameText.split('').map((char, index) => {
//   let color = ''
//   // console.log("index", index, "this.state.typingInput.length", this.state.typingInput.length)
//   if (index < this.state.typingInput.length){
//     if (char === this.state.typingInput[index]){
//       color = 'green'
//       console.log("yes")
//     }
//     else{
//       color = 'red'
//       console.log("no")
//     }
//   }
//   return <span key={index} className={color}>{char}</span>

// })
// }

// render(){
//   return (
//     <div>
//       <h4>Correct: {this.state.correct}</h4>
//       <h4>Incorrect: {this.state.incorrect}</h4>
//       {/* <p>{this.props.gameText}</p> */}
//       <p>++++++++++++++++++++++++++++++++++</p>
//       <p>{this.renderViewText()}</p>

//       <textarea name="typingInput" 
//         placeholder={"begin typing here"} 
//         value={this.state.typingInput} 
//         onChange={this.handleTyping}
//       />
//     </div>
//   )
// }