import React from 'react'
import './Home.css'
import Post from '../utils/Post'

function Home() {
  return (
    <div className="home">
      <ul class="posts">
         <Post />
         <Post />
         <Post />
         <Post />
         <Post />
         <Post />
      </ul>
    </div>
  )
}

export default Home
