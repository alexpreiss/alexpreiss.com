import { setUser, setAuthState } from "../../actions/auth"
import { connect } from "react-redux"

import Header from "./"

const mapStateToProps = (state, ownProps) => ({
  state: state.auth,
  ...ownProps,
})

export default connect(
  mapStateToProps,
  { setUser, setAuthState }
)(Header)
