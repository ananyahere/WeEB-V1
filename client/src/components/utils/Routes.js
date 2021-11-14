import React, { useEffect } from 'react'
import Home from '../screens/Home'
import Login from '../screens/Login'
import Cookies from 'js-cookie'
import Profile from '../screens/Profile'
import Signup from '../screens/Signup'
import CreatePost from '../screens/CreatePost';
import {BrowserRouter as Router, Route, Switch, useHistory, Redirect} from 'react-router-dom'

function Routes() {
  const history = useHistory()
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    const userCookie = Cookies.get('jwt')
    if(userCookie){
      // window.location.assign('/')
      history.push('/')
    }else{
      // window.location.assign('/login')
      history.push('/login')
    }
  }, [])


  return (
    <Switch>
    <Route exact path="/"><Home /></Route>
    <Route  path="/profile"><Profile/></Route>
    <Route path="/signup"><Signup/></Route>
    <Route path="/login"><Login/></Route>
    <Route path="/createPost"><CreatePost/></Route>
    </Switch>
  )
}

export default Routes
