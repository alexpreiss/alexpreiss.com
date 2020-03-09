import React, { useState } from "react"
import { useFormik } from "formik"
import axios from "axios"
import { useHistory } from "react-router-dom"

export default function UploadForm({ setUser }) {
  // Pass the useFormik() hook initial form values and a submit function that will
  // be called when the form is submitted

  let history = useHistory()

  const [file, setFile] = useState({})
  const [error, setError] = useState("")

  const handleFileInputChange = event => {
    setFile(event.target.files[0])
  }

  const validate = values => {
    const errors = {}
    if (!values.title) {
      errors.title = "Required"
    }

    if (!values.content) {
      errors.content = "Required"
    }

    if (!values.category) {
      errors.category = "Required"
    }

    return errors
  }

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      category: "",
    },
    validate,
    onSubmit: values => {
      const formData = new FormData()

      if (values.category === "art") {
        formData.append("image", file, file.name)
      } else if (values.category === "music") {
        formData.append("audio", file, file.name)
      }

      formData.append("title", values.title)
      formData.append("category", values.category)
      formData.append("content", values.content)
      formData.append("token", localStorage.token)
      axios
        .post("http://localhost:7500/post/create", formData, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        })
        .then(result => {
          history.push("/posts/" + result.data.id)
        })
        .catch(ref => {
          // setError(response.data.error)
          console.log(ref)
        })
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
      <label htmlFor="category">Post Type</label>
      <select
        name="category"
        value={formik.values.category}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        style={{ display: "block" }}
      >
        <option value="" label="Select a category" />
        <option value="music" label="Music" />
        <option value="text" label="Text" />
        <option value="art" label="Art" />
      </select>

      {formik.touched.category && formik.errors.category ? (
        <div>{formik.errors.category}</div>
      ) : null}

      <label htmlFor="title">Title</label>
      <input
        id="title"
        name="title"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.title}
        onBlur={formik.handleBlur}
      />

      {formik.touched.title && formik.errors.title ? (
        <div>{formik.errors.title}</div>
      ) : null}

      <label htmlFor="content">Content</label>
      <input
        id="content"
        name="content"
        type="content"
        onChange={formik.handleChange}
        value={formik.values.content}
        onBlur={formik.handleBlur}
      />
      {formik.touched.content && formik.errors.content ? (
        <div>{formik.errors.content}</div>
      ) : null}

      {formik.values.category === "art" && (
        <>
          <label htmlFor="image">Image</label>
          <input
            id="image"
            name="image"
            type="file"
            onChange={handleFileInputChange}
            accept="image/png, image/jpeg"
          />
        </>
      )}

      {formik.values.category === "music" && (
        <>
          <label htmlFor="image">Audio</label>
          <input
            id="audio"
            name="audio"
            type="file"
            onChange={handleFileInputChange}
            accept="audio"
          />
        </>
      )}

      <button type="submit">Submit</button>
      {error ? <div>{error}</div> : null}
    </form>
  )
}
