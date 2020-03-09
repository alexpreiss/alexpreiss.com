import React from "react"
import { Link } from "react-router-dom"

export default class Header extends React.Component {
  render() {
    return (
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
            <Link style={{ color: "white", marginLeft: "20px" }} to="/profile">
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
    )
  }
}
