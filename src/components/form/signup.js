import React, { useState } from "react"
import { useFormik } from "formik"
import axios from "axios"
import { Link } from "react-router-dom"
import { useHistory } from "react-router-dom"

export default function SignupForm() {
  // Pass the useFormik() hook initial form values and a submit function that will
  // be called when the form is submitted

  const [file, setFile] = useState({})

  const handleFileInputChange = event => {
    setFile(event.target.files[0])
  }

  let history = useHistory()

  const validate = values => {
    const errors = {}
    if (!values.username) {
      errors.username = "Required"
    }

    if (!values.password) {
      errors.password = "Required"
    }

    return errors
  }

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validate,
    onSubmit: values => {
      const formData = new FormData()

      if (file) {
        formData.append("profilePicture", file, file.name)
      }
      formData.append("username", values.username)
      formData.append("password", values.password)

      axios
        .post("http://localhost:7500/user/signup", formData, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        })
        .then(result => {
          history.push("/login")
        })
        .catch(err => console.log({ error: err }))
    },
  })
  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      onSubmit={formik.handleSubmit}
    >
      <label htmlFor="username">Username</label>
      <input
        id="username"
        name="username"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.username}
        onBlur={formik.handleBlur}
      />

      {formik.touched.username && formik.errors.username ? (
        <div>{formik.errors.username}</div>
      ) : null}

      <label htmlFor="password">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        onChange={formik.handleChange}
        value={formik.values.password}
        onBlur={formik.handleBlur}
      />
      {formik.touched.password && formik.errors.password ? (
        <div>{formik.errors.password}</div>
      ) : null}

      <label htmlFor="profilePicture">Profile Picture</label>
      <input
        id="profilePicture"
        name="profilePicture"
        type="file"
        onChange={handleFileInputChange}
        accept="image"
      />

      <button type="submit">Submit</button>

      <div>
        <Link to="/login">Back to log in</Link>
      </div>
    </form>
  )
}
