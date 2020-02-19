import { connect } from "react-redux"

import LoginPage from "./"

const mapStateToProps = (state, ownProps) => ({
  state: state.general,
  ...ownProps,
})

export default connect(
  mapStateToProps,
  {}
)(LoginPage)
