import React, { useState } from 'react'
import {withRouter} from 'react-router'
import { signUp } from '../fetches'


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

    signUp(username, password)
      .then(newUser => {
        console.log(newUser)
        if (newUser.messages){
          setErrors(newUser.messages)
        }
        else{
          props.handleLogIn(newUser)
          props.history.push("/")
        }

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
//     return errors.map(error => <><h3 className="errorMsg" style={{color:"red"}}>{error}</h3></>)
//   }
// }

  return(
    <>
      {/* {errors && renderErrors()} */}
      <div className="content">
        <div className="credentialContainer">
          <div className="credentialContainerInner">
            <h1>SIGN UP</h1>
            {errors ? <h3 className="errorMsg" style={{color:"red"}}>{errors}</h3> : null}
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

export default withRouter(SignUp);
