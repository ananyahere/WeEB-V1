import React, {useContext} from 'react'
import './Navbar.css'
import {Link} from 'react-router-dom'
import UserContext from '../../App'


function Navbar() {
  // state contains info of present user
  const state = useContext(UserContext)
  
  const renderList = () => {
    if(state){
      return [<Link to="/profile" ><li className="navStyle">Profile</li></Link>,
      <Link to="/createPost"><li className="navStyle btn">Create Post</li></Link>]
    }
    else{
      return [
        <Link to="/login" ><li className="navStyle">Log in</li></Link>,
        <Link to="/signup" ><li className="navStyle btn">Sign up</li></Link>
      ]
    }
  }

  return (
    <div>
      <nav>
        <Link to="/"><h1>WEeb</h1></Link>
        <ul>
        {renderList()}
       </ul>
      </nav>
    </div>
  )
}

export default Navbar
