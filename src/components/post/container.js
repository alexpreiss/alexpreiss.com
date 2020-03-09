// import { setUser, setAuthState } from "../../actions/auth"
import { connect } from "react-redux"
import { setAudioSrc, setPlaying } from "../../actions/audio"

import Post from "./"

const mapStateToProps = (state, ownProps) => ({
  state: state,
  ...ownProps,
})

export default connect(
  mapStateToProps,
  { setAudioSrc, setPlaying }
)(Post)
