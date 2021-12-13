import React, {useState, useEffect, useContext} from "react";
import './Profile.css'
import Post from '../utils/Post'
import { UserContext } from "../../App";
function Profile() {
  const {state, dispatch} = useContext(UserContext)
  const [userPosts, setUserPosts] = useState([])
  const [image, setImage] = useState()
  const [imageURL, setImageURL] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUDeQ0UC4TH-VQn1gDp7HjwAPQvHiQvYHezg&usqp=CAU')   

  const getUserPosts = async () => {
    try{
      const response = await fetch('/myposts', {
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      }          
      })
      const resJSON = await response.json()
      setUserPosts(resJSON.userPosts)
    }catch(e){
      console.log(e)
    }
  }

  const fileHandler = (e) => {
    setImage(e.target.files[0])
  }

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
      console.log('avatar-url', JSONres.url)
      setImageURL(JSONres.url)
    }catch(e){
      console.log(e)
    }
  }  

  const updateAvatar = async () => {
    avatarDetails()
    try{
      const res = await fetch('/updateAvatar', {
        method:'PUT',
        body: JSON.stringify({
          avatarURL: imageURL
        }), headers: {
          'Content-Type': 'application/json'
        }
      })
      const JSONdata = await res.json()
      // set payload to updated user   
      dispatch({type:"UPDATEPIC", payload: JSONdata.updatedUser})  
      localStorage.setItem('user', JSON.stringify(JSONdata.updatedUser)) 
      console.log('avatar details',JSONdata)
    }catch(e){
      console.log(e)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    updateAvatar()
  }

  useEffect( () => {
    getUserPosts()
  }, [])

  const userPostsToRender = userPosts.map(userPost =>  <Post key={userPost._id} post={userPost} /> )

  return (
    <>
      <div className="about">
          <div className="avatar">
            <img src={(state)?state.avatar: imageURL} alt="avatar-img" />
          </div>
          <div className="details">
            <h3>{(state)?state.nickname: "loading"}</h3>
            <div>
              <h5>40 posts</h5>
              <h5>{(state)?state.followers.length:"0"} followers</h5>
              <h5>{(state)?state.following.length:"0"} following</h5>
            </div>
            <form onSubmit={submitHandler}> 
            <label htmlFor="post-file">Avatar</label>
            <input type="file" name="post-file" onChange={fileHandler} />
            <button>Change Avatar</button>
            </form>            
          </div>
      </div>
      <div className="gallery">
        <ul className="posts">
          {userPosts.length == 0? "No Post Found :(" : userPostsToRender}
          {/* {userPosts.map(userPost => <Post key={userPost._id} post={userPost} />)} */}
        </ul>
      </div>
    </>
  );
}

export default Profile;
