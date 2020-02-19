import React from "react"
import UploadForm from "../../components/form/upload"

export default class Upload extends React.Component {
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
        <h3>Upload</h3>
        <UploadForm />
      </div>
    )
  }
}
