import React from "react"
import { useFormik } from "formik"
import axios from "axios"
import { Link } from "react-router-dom"
import { useHistory } from "react-router-dom"

export default function SignupForm({ setUsername }) {
  // Pass the useFormik() hook initial form values and a submit function that will
  // be called when the form is submitted

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
      axios
        .post(
          "http://localhost:7500/user/signup",
          {
            username: values.username,
            password: values.password,
          },
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
            },
          }
        )
        .then(result => {
          console.log(result)
          setUsername(result.data.user.username)
          history.push("/")
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

      <button type="submit">Submit</button>

      <div>
        <Link to="/login">Back to log in</Link>
      </div>
    </form>
  )
}