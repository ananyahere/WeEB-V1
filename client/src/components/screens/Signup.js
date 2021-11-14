import React, {useState, useContext} from 'react'
import './Form.css'
import {UserContext} from '../../App'
import {Link} from 'react-router-dom'

function Signup() {
  const {state, dispatch} = useContext(UserContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nickname, setNickname] = useState('')

  const submitHandler = async (e) => {
    e.preventDefault()
    const emailError = document.querySelector('.email.error')
    const passwordError = document.querySelector('.password.error')
    try {
      const res = await fetch('/signup', { 
        method: 'POST', 
        body: JSON.stringify({ email, password, nickname }),
        headers: {'Content-Type': 'application/json'}
      });
      const data = await res.json();
      // console.log(data);
      if (data.errors) {
        emailError.textContent = data.errors.email;
        passwordError.textContent = data.errors.password;
      }
      // user present => update state
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user))
        dispatch({type: "USER", payload: data.user})
        window.location.assign('/');
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  const nicknameHandler = (e) => {
    setNickname(e.target.value)
  }

  const emailHandler = (e) => {
    setEmail(e.target.value)
  }

  const passwordHandler = (e) => {
    setPassword(e.target.value)
  }

  return (
  <>
  <form onSubmit={submitHandler}>
  <h2>Sign up</h2>
  <label htmlFor="nickname">Nickname</label>
  <input type="text" required value={nickname} onChange={nicknameHandler}/>
  <label htmlFor="email">Email</label>
  <input type="text" required value={email} onChange={emailHandler}/>
  <div className="email error"></div>
  <label htmlFor="password">Password</label>
  <input type="password" required value={password} onChange={passwordHandler}/>
  <div className="password error"></div>
  <button>Sign up</button>
  <p className="form-p">
    <Link to="/login">Already have an account?</Link>
  </p>
  </form>
  </>
  )
}

export default Signup
