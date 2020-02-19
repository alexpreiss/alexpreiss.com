import { connect } from "react-redux"
import { setUser } from "../../actions/auth"

import LoginPage from "./"

const mapStateToProps = (state, ownProps) => ({
  state: state.auth,
  ...ownProps,
})

export default connect(
  mapStateToProps,
  { setUser }
)(LoginPage)
