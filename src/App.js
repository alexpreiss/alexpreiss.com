import React from "react"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import { connect } from "react-redux"
import axios from "axios"

import Home from "./pages/index.js"
import Explore from "./pages/explore"
import Login from "./pages/login/container"
import Signup from "./pages/signup/container"
import Post from "./pages/post/container"
import Profile from "./pages/profile/container"
import Upload from "./pages/upload/container"
import { setUser, setAuthState } from "./actions/auth"
import { setPlaying } from "./actions/audio"
import Audio from "./components/audio"

class App extends React.Component {
  componentDidMount() {
    if (localStorage.token) {
      axios
        .post(
          "http://localhost:7500/user/fromToken",
          {
            token: localStorage.token,
          },
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
            },
          }
        )
        .then(res => {
          this.props.setUser({ username: res.data.username, id: res.data.id })
          this.props.setAuthState("authenticated")
        })
    } else {
      this.props.setAuthState("guest")
    }
  }

  displayApp() {
    return (
      <Router>
        <div>
          <nav
            style={{
              display: "flex",
              justifyContent: "space-between",
              backgroundColor: "black",
              color: "white",
              padding: "10px 25px",
              position: "fixed",
              right: 0,
              left: 0,
              top: 0,
            }}
          >
            <div
              style={{
                display: "flex",
              }}
            >
              <Link style={{ color: "white", marginRight: "20px" }} to="/">
                Home
              </Link>
              <Link style={{ color: "white" }} to="/explore">
                Explore
              </Link>
            </div>

            {this.props.state.auth.username !== "" ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                <Link style={{ color: "white" }} to="/upload">
                  Upload
                </Link>
                <Link
                  style={{ color: "white", marginLeft: "20px" }}
                  to={"/users/" + this.props.state.auth.username}
                >
                  Profile
                </Link>
                <div
                  style={{
                    color: "white",
                    cursor: "pointer",
                    textDecoration: "underline",
                    marginLeft: "20px",
                  }}
                  onClick={() => {
                    localStorage.removeItem("token")
                    localStorage.setItem("loggedIn", false)
                    this.props.setUser({ username: "" })
                    window.location.reload()
                  }}
                >
                  Logout
                </div>
              </div>
            ) : (
              <Link style={{ color: "white" }} to="/login">
                Login
              </Link>
            )}
          </nav>

          <Audio state={this.props.state.audio} />

          {this.props.state.audio.src !== "" && (
            <div
              style={{
                bottom: "0",
                left: "0",
                right: "0",
                backgroundColor: "black",
                display: "flex",
                position: "fixed",
              }}
            >
              {this.props.state.audio.playing ? (
                <div
                  onClick={() => {
                    this.props.setPlaying(false)
                  }}
                  style={{
                    color: "white",
                    padding: "10px 25px",
                    cursor: "pointer",
                  }}
                >
                  Pause
                </div>
              ) : (
                <div
                  onClick={() => {
                    this.props.setPlaying(true)
                  }}
                  style={{
                    color: "white",
                    padding: "10px 25px",
                    cursor: "pointer",
                  }}
                >
                  Play
                </div>
              )}
              {/* / {this.audio.duration} */}
            </div>
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "41px 0px",
            }}
          >
            <Switch>
              <Route path="/explore">
                <Explore />
              </Route>

              <Route path="/login">
                <Login />
              </Route>

              <Route path="/signup">
                <Signup />
              </Route>

              <Route path="/users/:username" component={Profile} />

              <Route path="/posts/:postId" component={Post} />

              <Route path="/upload">
                <Upload />
              </Route>

              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    )
  }

  render() {
    switch (this.props.state.auth.authState) {
      case "guest": {
        return this.displayApp()
      }
      case "authenticated": {
        return this.displayApp()
      }
      default: {
        return <div>Logging in...</div>
      }
    }
  }
}

const mapStateToProps = (state, ownProps) => ({
  state,
  ...ownProps,
})

export default connect(
  mapStateToProps,
  { setUser, setAuthState, setPlaying }
)(App)
