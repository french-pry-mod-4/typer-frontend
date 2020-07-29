import React, { useState } from 'react'

const Login = (props) => {

  const [loginInput, setloginInput] = useState({
    username: "",
    password: ""
  })

  const { username, password } = loginInput;

  const handleSubmit = (e) => {
    // e.preventDefault()
    // console.log(loginInput)
  
    // fetch("http://localhost:3000/users/", {
    //   method: "POST", 
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   // body: JSON.stringify({loginInput})
    //   body: JSON.stringify({username, password})
    // })
    // .then(r => r.json())
    // .then(newUser => {
    //   props.handleLogIn(newUser)
    // })
  }

  const handleChange = (e) => {
    setloginInput({...loginInput, [e.target.name]: e.target.value})
  }

  return(
    
    <form onChange={handleChange} onSubmit={handleSubmit}>
      <input type="text" name="username" value={username} />
      <input type="password" name="password" value={password}/>
      <input type="submit"/>
    </form>
  )
}

export default Login