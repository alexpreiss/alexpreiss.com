import React from "react"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import { connect } from "react-redux"
import axios from "axios"

import Home from "./pages/index.js"
import About from "./pages/about.js"
import Login from "./pages/login/container"
import Signup from "./pages/signup/container"
import Profile from "./pages/profile/container"
import Upload from "./pages/upload/container"
import { setUser } from "./actions/auth"

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
        .then(res => this.props.setUser({ username: res.data.username }))
    }
  }

  render() {
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
              <Link style={{ color: "white" }} to="/about">
                About
              </Link>
            </div>

            {this.props.state.username !== "" ? (
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
                  to="/profile"
                >
                  Profile
                </Link>
                <div
                  style={{
                    color: "white",
                    cursor: "pointer",
                    "text-decoration": "underline",
                    marginLeft: "20px",
                  }}
                  onClick={() => {
                    localStorage.removeItem("token")
                    localStorage.setItem("loggedIn", false)
                    this.props.setUser({ username: "" })
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

          <div style={{ display: "flex", justifyContent: "center" }}>
            <Switch>
              <Route path="/about">
                <About />
              </Route>

              <Route path="/login">
                <Login />
              </Route>

              <Route path="/signup">
                <Signup />
              </Route>

              <Route path="/profile">
                <Profile />
              </Route>

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
}

const mapStateToProps = (state, ownProps) => ({
  state: state.auth,
  ...ownProps,
})

export default connect(
  mapStateToProps,
  { setUser }
)(App)
