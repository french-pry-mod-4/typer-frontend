import React, { Component } from 'react';
import Odometer from 'react-odometerjs'
import 'odometer/themes/odometer-theme-default.css'

export default class Stopwatch extends Component{

  state = {
    // isRunning: false,
    intervalID: null,
    timeLeft: "" // 6 when testing
  };

  // componentDidMount() {
  // }

  componentDidUpdate(prevProps, prevState) {
    // if the game started (by typing in the input feld) and there is no intervalID yet
    // (meaning the timer has not yet started)
    if (this.props.gameStatus === "running" && !this.state.intervalID){ // && !this.state.endGame &&this.state.timeLeft > 0
      this.startTimer()
    }

    else if (this.state.timeLeft === 0){
      // this.setState({endGame: true})
      this.endGame()
    }

    // when the gameboard fetches the game, set this.state.timeLeft to timeAlloted from the db
    else if (prevProps.timeAllotted === null && this.props.timeAllotted){
      this.setState({
        timeLeft: this.props.timeAllotted
      })
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

    //PATCH scores to db   -- see gameboard component
    //and display to user
    this.props.handleGameOver()

  }


  render() {
    return (
      <div className="stopwatch">
        <h3 className="stopwatch-time gameDetails">Time</h3>
        <Odometer
          value={this.state.timeLeft}
          className="odometerVals"
          format="(.ddd),dd" />
      </div>
    );
  }
}
