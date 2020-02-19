import { connect } from "react-redux"

import UploadPage from "./"

const mapStateToProps = (state, ownProps) => ({
  state: state.general,
  ...ownProps,
})

export default connect(
  mapStateToProps,
  {}
)(UploadPage)
