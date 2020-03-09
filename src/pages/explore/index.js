import React from "react"
import axios from "axios"

import Post from "../../components/post/container"

export default class Explore extends React.Component {
  constructor() {
    super()

    this.state = {
      posts: null,
    }

    this.getPosts = this.getPosts.bind(this)
  }

  componentDidMount() {
    axios
      .get("http://localhost:7500/post", {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      })
      .then(res => this.setState({ posts: res.data }))
  }

  getPostsByCategory(category) {
    axios
      .get(
        "http://localhost:7500/post/fromCategory/" + category,

        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      )
      .then(res => this.setState({ posts: res.data }))
  }

  getPosts() {
    axios
      .get("http://localhost:7500/post", {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      })
      .then(res => this.setState({ posts: res.data }))
  }

  render() {
    return (
      <div>
        <h2>Explore</h2>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <div
              style={{ cursor: "pointer", textDecoration: "underline" }}
              onClick={this.getPosts}
            >
              All
            </div>
            <div
              style={{ cursor: "pointer", textDecoration: "underline" }}
              onClick={() => this.getPostsByCategory("music")}
            >
              Music
            </div>
            <div
              style={{ cursor: "pointer", textDecoration: "underline" }}
              onClick={() => this.getPostsByCategory("text")}
            >
              Text
            </div>{" "}
            <div
              style={{ cursor: "pointer", textDecoration: "underline" }}
              onClick={() => this.getPostsByCategory("art")}
            >
              Art
            </div>{" "}
          </div>

          {this.state.posts
            ? this.state.posts.map(post => <Post key={post.id} post={post} />)
            : "Loading..."}
        </div>
      </div>
    )
  }
}
