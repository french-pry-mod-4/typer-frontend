import React, { Component } from 'react';

export default class Stopwatch extends Component{

  state = {
    // isRunning: false,
    // elapsedTime: 0,
    // previousTime: 0,
    intervalID: null,
    timeLeft: 6, // will be based on passage model - time_allotted
    // endGame: false
  };

  componentDidMount() {
    // this.intervalID = setInterval(() => this.tick(), 1000);
    // this.startTimer()
    // if (this.props.gameStatus === "running"){
    //   this.startTimer()
    // }
  }

  componentDidUpdate() {
    // if the game started (by typing in the input feld) and there is no intervalID yet
    // (meaning the timer has not yet started)
    if (this.props.gameStatus === "running" && !this.state.intervalID){ // && !this.state.endGame &&this.state.timeLeft > 0
      this.startTimer()
    }

    else if (this.state.timeLeft === 0){
      // this.setState({endGame: true})
      this.endGame()
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalID);
  }

  startTimer(){
    const intervalID = setInterval(() => {
      console.log(this.state)
      // if (this.state.timeLeft > 0){
        this.setState(prevState => ({
          timeLeft: prevState.timeLeft - 1
        }))
      // }
      // else{
        // clearInterval(this.intervalID);
      // }
    }, 1000)
    this.setState({ intervalID })
  }

  endGame(){
    //stopTimer
    clearInterval(this.state.intervalID)
    this.props.handleGameOver()

    //PATCH scores to db
    //and display to user
  }

  updateScores(){
    const scoreInfo = {

    }
    fetch("http://localhost:3000/games", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(scoreInfo)
    })
    .then(r => r.json())
    .then(console.log)  
  }


  render() {

    return (
      <div className="stopwatch">
        <h3 className="stopwatch-time">Time Remaining: { this.state.timeLeft }</h3>
      </div>
    );
  }
}