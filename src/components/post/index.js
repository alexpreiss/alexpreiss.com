import React from "react"
import axios from "axios"
import { Link } from "react-router-dom"

import "../../css/components/post.css"

export default function Post({ post, setPlaying, setAudioSrc, state }) {
  return (
    <div className="post">
      <div
        style={{
          display: "flex",
          borderBottom: "1px grey solid",
          justifyContent: "center",
          padding: "10px 0px",
        }}
      >
        <div>{post.title}</div>
      </div>
      {post.image && <img alt="User's art" src={post.image} />}
      <div class="post-body">
        {post.audio && (
          <div
            onClick={() => {
              setAudioSrc(post.audio)
              setPlaying(true)
            }}
          >
            Play
          </div>
        )}

        <div>
          Posted by <Link to={"/users/" + post.author}>{post.author}</Link>
        </div>
        <div>{post.content}</div>
        <div
          onClick={() => {
            axios
              .post("http://localhost:7500/post/delete/" + post.id, {
                token: localStorage.token,
              })
              .then(window.location.reload())
          }}
        >
          Remove
        </div>
      </div>
    </div>
  )
}
