import React from "react";
import './Profile.css'
import Post from '../utils/Post'
function Profile() {
  return (
    <>
      <div className="about">
          <div className="avatar">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjWjDqoiv7w7YggKg_561WbcNfplMzgsvohdlJLhKKB4Fls-fRqV-gtRM-uGB2qVcFDQQ&usqp=CAU" alt="avatar-img" />
          </div>
          <div className="details">
            <h3>Ananya Sharma</h3>
            <div>
              <h5>40 posts</h5>
              <h5>40 follower</h5>
              <h5>40 following</h5>
            </div>
          </div>
      </div>
      <div className="gallery">
        <ul class="posts">
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        </ul>
      </div>
    </>
  );
}

export default Profile;
