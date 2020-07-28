// import React, {Component} from 'react'

// export default class SignUp extends Component {
//   usernameInput = React.createRef()
//   passwordInput = React.createRef()

//   render() {
//     return (
//       <form onChange={this.props.login}>
//         <input type="text" ref={this.usernameInput}/>
//         <input type="password" ref={this.passwordInput}/>
//         <input type="submit"/>
//       </form>
//     )
//   }
// }

import React, { useState } from 'react'

const SignUp = () => {

  const [signUpInput, setSignUpInput] = useState({
    username: "",
    password: ""
  })

  const { username, password } = signUpInput;

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(signUpInput)
  
    fetch("http://localhost:3000/users", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json"
      },
      // body: JSON.stringify({signUpInput})
      body: JSON.stringify({username, password})
    })
    .then(r => r.json())
    .then(console.log)
  }

  const handleChange = (e) => {
    setSignUpInput({...signUpInput, [e.target.name]: e.target.value})
  }

  return(
    
    <form onChange={handleChange} onSubmit={handleSubmit}>
      <input type="text" name="username" value={username} />
      <input type="password" name="password" value={password}/>
      <input type="submit"/>
    </form>
  )
}

export default SignUp