import React from "react"
import axios from "axios"

import Post from "../../components/post/container"

export default class Profile extends React.Component {
  constructor() {
    super()

    this.state = {
      post: null,
      error: null,
    }
  }

  async componentDidMount() {
    if (this.props.match.params.postId) {
      const post = await axios.get(
        "http://localhost:7500/post/" + this.props.match.params.postId,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      )

      this.setState({ ...this.state, post: post.data })
    }
  }

  render() {
    return (
      <div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {this.state.error && this.state.error}
          {console.log(this.state)}

          {this.state.post ? <Post post={this.state.post} /> : "Loading..."}
        </div>
      </div>
    )
  }
}
