import React from "react"

export default class Profile extends React.Component {
  constructor() {
    super()

    this.state = {
      data: null,
    }
  }

  render() {
    return (
      <div>
        {this.props.state.username
          ? this.props.state.username
          : "not permitted"}
      </div>
    )
  }
}
