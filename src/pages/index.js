import React from "react"
import axios from "axios"

import Post from "../components/post/container"

export default class Home extends React.Component {
  constructor() {
    super()

    this.state = {
      posts: null,
    }
  }

  componentDidMount() {
    axios
      .get("http://localhost:7500/post", {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      })
      .then(res => {
        console.log(res.data)
        this.setState({ posts: res.data })
      })
  }

  render() {
    return (
      <div>
        <h2>Home</h2>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {this.state.posts
            ? this.state.posts.map(post => <Post key={post.id} post={post} />)
            : "Loading..."}
        </div>
      </div>
    )
  }
}
