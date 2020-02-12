import React from "react"
import LoginForm from "../../components/form/login"

export default class Login extends React.Component {
  render() {
    return <LoginForm setUsername={this.props.setUsername} />
  }
}
