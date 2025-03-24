import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createBlog } from "../reducers/blogListReducer"
import { displayNotificaion } from "../reducers/notificationReducer"
import style from "./createBlog.module.css"

/** @typedef {import("../types/blog").BlogProps} BlogProps */
/** @typedef {import("../types/blog").UserProps} UserProps */

/**
 * @returns {React.JSX.Element}
 */
function CreateBlog() {
  const dispatch = useDispatch()
  const [blogPost, setBlogPost] = useState({
    title: "",
    author: "",
    url: "",
  })
  const user = useSelector(
    /**@param {import("../store").RootState} state  */
    (state) => state.user
  )

  /**
   * @param {React.FormEvent} e - event
   */
  async function handleCreateBlog(e) {
    e.preventDefault()
    const { title, author, url } = blogPost
    const missingFields = []

    if (!title.trim()) missingFields.push("Title")
    if (!author.trim()) missingFields.push("Author")
    if (!url.trim()) missingFields.push("URL")

    if (missingFields.length > 0) {
      dispatch(
        displayNotificaion({
          message: `Error: Please fill in the following field(s): ${missingFields.join(", ")}`,
          type: "error",
        })
      )
      return
    }
    dispatch(createBlog(blogPost))
    setBlogPost({
      title: "",
      author: "",
      url: "",
    })
  }
  return (
    <form className={style.createBlog} onSubmit={handleCreateBlog}>
      <h2>Add New Blog</h2>

      <div className={style.formGroup}>
        <label htmlFor="title">
          Title:
          <input
            type="text"
            id="title"
            name="title"
            value={blogPost.title}
            placeholder="Enter blog title"
            onChange={(e) => {
              setBlogPost((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
              }))
            }}
          />
        </label>
      </div>

      <div className={style.formGroup}>
        <label htmlFor="author">
          Author:
          <input
            type="text"
            id="author"
            name="author"
            placeholder="Enter blog author"
            value={blogPost.author}
            onChange={(e) => {
              setBlogPost((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
              }))
            }}
          />
        </label>
      </div>

      <div className={style.formGroup}>
        <label htmlFor="url">
          Url:
          <input
            type="text"
            id="url"
            name="url"
            value={blogPost.url}
            placeholder="Enter blog URL"
            onChange={(e) => {
              setBlogPost((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
              }))
            }}
          />
        </label>
      </div>

      <button type="submit">Create</button>
    </form>
  )
}

export default CreateBlog
