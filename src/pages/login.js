import React from "react"

export default class Login extends React.Component {
  render() {
    return (
      <>
        <input type="text" placeholder="username" />
        <input type="text" placeholder="password" />
        <button>login</button>
        <div>
          Don't have an account? <a href="/login">Sign up</a>{" "}
        </div>
      </>
    )
  }
}
