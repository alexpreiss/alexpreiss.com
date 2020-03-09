import React from "react"
import axios from "axios"

import Post from "../../components/post/container"

export default class Profile extends React.Component {
  constructor() {
    super()

    this.state = {
      posts: [],
      user: {},
      error: null,
      editing: false,
    }
  }

  async componentDidMount() {
    if (this.props.match.params.username) {
      const user = await axios.get(
        "http://localhost:7500/user/fromUsername/" +
          this.props.match.params.username,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      )

      this.setState({ ...this.state, user: user.data })

      axios
        .get("http://localhost:7500/post/fromUser/" + user.data.id, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        })
        .then(res => this.setState({ ...this.state, posts: res.data }))
    }
  }

  render() {
    return (
      <div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {this.state.user.username
            ? this.state.user.username
            : "This user does not exist"}

          {console.log(this.state.user)}

          {
            <img
              src={
                this.state.user.profilePicture
                  ? this.state.user.profilePicture
                  : "https://www.sackettwaconia.com/wp-content/uploads/default-profile.png"
              }
              alt="User profile pic"
            />
          }

          {this.state.error && this.state.error}

          {this.state.posts
            ? this.state.posts.map(post => <Post key={post.id} post={post} />)
            : "Loading..."}
        </div>
      </div>
    )
  }
}
