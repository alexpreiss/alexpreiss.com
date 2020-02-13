import React from "react"
import SignupForm from "../../components/form/signup"

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
        <h3>Sign up</h3>
        <SignupForm setUsername={this.props.setUsername} />
      </div>
    )
  }
}
