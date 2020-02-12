import { connect } from "react-redux"
import { setUsername } from "../../actions/auth"

import LoginPage from "./"

const mapStateToProps = (state, ownProps) => ({
  state: state.general,
  ...ownProps,
})

export default connect(
  mapStateToProps,
  { setUsername }
)(LoginPage)
