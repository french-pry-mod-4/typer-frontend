import React, { useState } from 'react'
import {withRouter} from 'react-router'

const Login = (props) => {

  const [loginInput, setloginInput] = useState({
    username: "",
    password: ""
  })

  const { username, password } = loginInput;

  const handleSubmit = (e) => {
    e.preventDefault()

    // console.log(loginInput)

    fetch("http://localhost:3000/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      // body: JSON.stringify({loginInput})
      body: JSON.stringify({username, password})
    })
    .then(r => r.json())
    .then(user => {
      console.log("user", user)
      // if login was successful
      if (user.username){
        props.handleLogIn(user)
        props.history.push("/")

      }
      // props.handleLogIn(user)
    })
  }

  const handleChange = (e) => {
    setloginInput({...loginInput, [e.target.name]: e.target.value})
  }

  return(
    <>
    {props.message ? <h3>{props.message}</h3> : null }
      <div className="content">
        <div className="credentialContainer">
          <div className="credentialContainerInner">
            <h1>LOGIN</h1>
            <form onChange={handleChange} onSubmit={handleSubmit}>
              <input className="credentialInput" type="text" name="username" value={username} autoComplete='off' placeholder="Username"/>
              <input className="credentialInput" type="password" name="password" value={password} autoComplete='off' placeholder="Password"/>
              <input className="credentialSubmit" type="submit"/>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default withRouter(Login);
