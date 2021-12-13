import React, {useContext, useEffect} from 'react'
import {LoginStatusContext} from '../Hooks/LoginStatusContext'
import {UserContext} from '../../App'

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
      We are sorry to see you leave.
    </div>
  )
}

export default LoggedOut
