import React, { useState } from 'react'
import { withRouter } from 'react-router'
import { login } from '../fetches'

const Login = (props) => {

  const [loginInput, setloginInput] = useState({
    username: "",
    password: ""
  })

  const { username, password } = loginInput;

  const [error, setError] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    // console.log(loginInput)

    login(username, password)
      .then(user => {
        console.log("user", user)
        // if login was successful
        if (user.username){
          props.handleLogIn(user)
          props.history.push("/")
        }
        else{
          setError(user.message)
        }
      })
  }

  const handleChange = (e) => {
    setloginInput({...loginInput, [e.target.name]: e.target.value})
  }



  return(
    <>
      <div className="content">
        <div className="credentialContainer">
          <div className="credentialContainerInner">
            <h1>LOGIN</h1>
            {error ? <h3 className="errorMsg" style={{color:"red"}}>{error}</h3> : null }
            <form onSubmit={handleSubmit}>
              <input className="credentialInput" type="text" name="username" value={username} onChange={handleChange} autoComplete='off' placeholder="Username"/>
              <input className="credentialInput" type="password" name="password" value={password} onChange={handleChange} autoComplete='off' placeholder="Password"/>
              <input className="credentialSubmit" type="submit"/>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default withRouter(Login);
