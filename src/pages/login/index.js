import React from "react"
import LoginForm from "../../components/form/login"

export default class Login extends React.Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          width: "50%",
        }}
      >
        <h3>Log in</h3>
        <LoginForm setUser={this.props.setUser} />
      </div>
    )
  }
}
