import React, {Component} from 'react'

export default class AddPassage extends Component {
  passageTitle = React.createRef()
  passageBody = React.createRef()

  handleSubmit = (e) => {
    e.preventDefault()
    const obj = {
      name: this.passageTitle.current.value,
      text: this.passageBody.current.value,
      time_allotted: 60
    }
    // console.log(obj)
    fetch('http://localhost:3000/passages', {
      method: 'POST',
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(obj)
    }).then(r => r.json())
  }

  render() {


    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" ref={this.passageTitle} required/>
          <textarea name="" id="" cols="30" rows="10" ref={this.passageBody} required></textarea>
          <input type="submit"/>
        </form>
      </div>
    )
  }
}
