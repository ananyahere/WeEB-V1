import React, {useContext, useEffect} from 'react'
import {LoginStatusContext} from '../Hooks/LoginStatusContext'
import {UserContext} from '../../App'
import "./LoggedOut.css";

function LoggedOut() {
  const {state, dispatch} = useContext(UserContext)
  useEffect(() => {
    localStorage.clear()
    dispatch({type: "CLEAR"})
  }, [])
  const {isLoggedIn, setIsLoggedIn} = useContext(LoginStatusContext)
  setIsLoggedIn(false)
  return (
    <div>
      <h4>We are sorry to see you leave :(</h4>
    </div>
  )
}

export default LoggedOut
