import React, { useState } from 'react'
import { render } from 'react-dom';
import {withRouter} from 'react-router'


const SignUp = (props) => {

  const [signUpInput, setSignUpInput] = useState({
    username: "",
    password: ""
  })

  const [errors, setErrors] = useState([])

  const { username, password } = signUpInput;

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(signUpInput)
  
    fetch("http://localhost:3000/users", {
      method: "POST",
      credentials: "include", 
      headers: {
        "Content-Type": "application/json"
      },
      // body: JSON.stringify({signUpInput})
      body: JSON.stringify({username, password})
    })
    .then(r => r.json())
    .then(newUser => {
      console.log(newUser)
      // if (newUser.id){
        props.handleLogIn(newUser)
        props.history.push("/")

      // }
      // else {
      //   setErrors(newUser)
      // }
    })
  }

  const handleChange = (e) => {
    setSignUpInput({...signUpInput, [e.target.name]: e.target.value})
  }

//   const renderErrors = () => {
//     if (errors){
//     return errors.map(error => <><h3 style={{color:"red"}}>{error}</h3></>)
//   }
// }

  return(
    <>
      {/* {errors && renderErrors()} */}
      <form onChange={handleChange} onSubmit={handleSubmit}>
        <input type="text" name="username" value={username} />
        <input type="password" name="password" value={password}/>
        <input type="submit"/>
      </form>
    </>
  )
}

export default withRouter(SignUp);