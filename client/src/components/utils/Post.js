import React from 'react'
import Modal from "react-modal";
import { useState } from "react";
import './Post.css'

Modal.setAppElement("#root");

function Post() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return (
    <li class="post">
    <img
      src="https://i.pinimg.com/564x/8b/e4/d5/8be4d5b8675f9cea2b61968a43eb075f.jpg"
      alt="smoothie recipe icon"
    />
    <h4>Banana Boost</h4>
    <p>Banana, Vanilla ice cream, Milk</p>
    <p onClick={() => setModalIsOpen(true)} className="modal-btn">
        Comments & Likes
      </p>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        style={
          {
            content: {
              display: "flex",
              justifyContent:"space-between"
            }
          }
        }
      >
        <div className="post-img">
          <img
            src="https://i.pinimg.com/736x/14/14/6e/14146eec5aa45145ce00d871f4ad58b6.jpg"
            alt="post-img"
          />
        </div>
        <div className="post-details">
          <h4>Playing Tennis</h4>
          <p>I went to park today!</p>
          <hr />
          <div className="comments">
            <div className="comment">
              <h5>Ananya Sh</h5>
              <p> wow! nic pic</p>
            </div>
            <div className="comment">
              <h5>Ananya Sh</h5>
              <p> wow! nic pic</p>
            </div>
            <div className="comment">
              <h5>Ananya Sh</h5>
              <p> wow! nic pic</p>
            </div>
          </div>
        </div>
        <p onClick={() => setModalIsOpen(false)} className="modal-btn">
          Close
        </p>
      </Modal>    
    </li>
  )
}

export default Post
