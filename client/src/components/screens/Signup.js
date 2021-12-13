import React, {useState, useContext} from 'react'
import './Form.css'
import {UserContext} from '../../App'
import {LoginStatusContext} from '../Hooks/LoginStatusContext'
import {useHistory} from 'react-router-dom'
import {Link} from 'react-router-dom'

function Signup() {
  const history = useHistory()
  const {state, dispatch} = useContext(UserContext)
  const {isLoggedIn, setIsLoggedIn} = useContext(LoginStatusContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nickname, setNickname] = useState('')
  const [image, setImage] = useState()
  const [imageURL, setImageURL] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUDeQ0UC4TH-VQn1gDp7HjwAPQvHiQvYHezg&usqp=CAU')  

  const avatarDetails = async () => {
    const formData = new FormData()
    formData.append("file", image)
    formData.append("cloud_name", "ananya-cloudinary")  
    formData.append("upload_preset", "social-media-app")  
    try{
      const res = await fetch('https://api.cloudinary.com/v1_1/ananya-cloudinary/image/upload', {
        method: "POST",
        body: formData
      })
      const JSONres = await res.json()
      setImageURL(JSONres.url)
    }catch(e){
      console.log(e)
    }
  }  

  const submitHandler = async (e) => {
    e.preventDefault()
    const emailError = document.querySelector('.email.error')
    const passwordError = document.querySelector('.password.error')
    try {
  // send backend req with nickname, email & password
      const res = await fetch('/signup', { 
        method: 'POST', 
        body: JSON.stringify({ email, password, nickname }),
        headers: {'Content-Type': 'application/json'}
      });
      const data = await res.json();
  // send backend request with avatar
      avatarDetails()
      const res2 = await fetch('/updateAvatar', {
        method:'PUT',
        body: JSON.stringify({
          avatarURL: imageURL
        }), headers: {
          'Content-Type': 'application/json'
        }
      })
      const JSONdata = await res2.json()      
      console.log('avatar details',JSONdata)
      if (data.errors) {
        emailError.textContent = data.errors.email;
        passwordError.textContent = data.errors.password;
      }
      // user present => update state
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user))        
        dispatch({type: "USER", payload: data.user})
        setIsLoggedIn(true)
        history.push('/')
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

  const fileHandler = (e) => {
    setImage(e.target.files[0])
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
  <label htmlFor="post-file">Avatar</label>
  <input type="file" name="post-file" onChange={fileHandler}/>
  <button>Sign up</button>
  <p className="form-p">
    <Link to="/login">Already have an account?</Link>
  </p>
  </form>
  </>
  )
}

export default Signup
