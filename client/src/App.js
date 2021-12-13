import React, { useEffect, useReducer, useContext } from 'react'
import './App.css';
import Navbar from './components/utils/Navbar';
import {BrowserRouter as Router, useHistory, Redirect} from 'react-router-dom'
import Routes from './components/utils/Routes';
import { initialState, reducerFunc } from './components/Hooks/UserReducer';
import {LoginStatusContext} from './components/Hooks/LoginStatusContext'
import Cookies from 'js-cookie'

export const UserContext = React.createContext()

function App() {
  const [state, dispatch] = useReducer(reducerFunc, initialState)
  const {isLoggedIn, setIsLoggedIn} = useContext(LoginStatusContext)

  // const checkLoginStatus = () => {
  //   const userCookie = Cookies.get('jwt')
  //   if(userCookie){
  //     setIsLoggedIn(true)
  //     // redirect to '/'
      
  //     return (
  //       <Redirect to = "/login" />
  //     )
  //   }else{
  //     setIsLoggedIn(false)
  //     // redirect to '/login'
      
  //     return (
  //       <Redirect to = "/login" />
  //     )
  //   }
  //   // note: it is necessary to redirect only after the state is set
  // }

  // // check if user is LoggedIn
  // useEffect(() => {
  //   checkLoginStatus()
  // }, [])

  return (
    <UserContext.Provider value={{state, dispatch}}>
      <div className="App">
      <Router>
        <Navbar />
        <Routes />
      </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;
