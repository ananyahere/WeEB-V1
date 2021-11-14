import React, {useState} from 'react'
import './Form.css'

function CreatePost() {
  const [postTitle, setPostTitle] = useState('')
  const [postBody, setPostBody] = useState('')
  const [image, setImage] = useState()
  const [imageURL, setImageURL] = useState('https://i.pinimg.com/originals/58/a2/2b/58a22b10abdfd9e34a39c47bdde1480f.jpg')

  const postDetails = async () => {
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
      console.log(JSONres)
      setImageURL(JSONres.url)
    }catch(e){
      console.log(e)
    }
  }

  const postTitleHandler = (e) => {
    setPostTitle(e.target.value)
  }
  const postBodyHandler = (e) => {
    setPostBody(e.target.value)
  }
  const submitHandler = async (e) => {
    e.preventDefault()
    postDetails()
    try{
      const res = await fetch('/createpost', {
        method:'POST',
        body: JSON.stringify({
          title: postTitle,
          body: postBody,
          photoLink: imageURL
        }), headers: {
          'Content-Type': 'application/json'
        }
      })
      const JSONdata = await res.json()
      console.log(JSONdata)
    }catch(e){
      console.log(e)
    }
  }

  const fileHandler = (e) => {
    setImage(e.target.files[0])
  }

  return (
    <div>
      <form onSubmit={submitHandler}>
      <h2>Post</h2>
        <label for="post-title">Title</label>
        <input type="text" value={postTitle} onChange={postTitleHandler}/>
      
        <label for="post-body" >Body</label>
        <input type="text" value={postBody} onChange={postBodyHandler}/>
       
        <label for="post-file">Image</label>
        <input type="file" name="post-file" onChange={fileHandler}/>
  
        <button>Create Post</button>
      </form>
    </div>
  )
}

export default CreatePost
