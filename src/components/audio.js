import React from "react"

export default class Audio extends React.Component {
  componentDidUpdate() {
    if (this.props.state.playing) {
      this.audio.play()
    } else {
      this.audio.pause()
    }
  }
  render() {
    return (
      <audio
        src={this.props.state.src}
        ref={audio => {
          this.audio = audio
        }}
      />
    )
  }
}
