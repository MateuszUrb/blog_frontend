import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createBlog } from "../reducers/blogListReducer"
/** @typedef {import("../types/blog").BlogProps} BlogProps */
/** @typedef {import("../types/blog").UserProps} UserProps */

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
    const blogWithUser = {
      ...blogPost,
      users: user ? [user] : [],
    }
    dispatch(createBlog(blogWithUser))
    setBlogPost({
      title: "",
      author: "",
      url: "",
    })
  }
  return (
    <>
      <h2>add new blog</h2>
      <form onSubmit={handleCreateBlog}>
        <div>
          <label htmlFor="title">
            title:
            <input
              type="text"
              id="title"
              name="title"
              value={blogPost.title}
              placeholder="enter blog title"
              onChange={(e) => {
                setBlogPost((prevState) => ({
                  ...prevState,
                  [e.target.name]: e.target.value,
                }))
              }}
            />
          </label>
        </div>
        <div>
          <label htmlFor="author">
            author:
            <input
              type="text"
              id="author"
              name="author"
              placeholder="enter blog author"
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
        <div>
          <label htmlFor="url">
            url:
            <input
              type="text"
              id="url"
              name="url"
              value={blogPost.url}
              placeholder="enter blog url"
              onChange={(e) => {
                setBlogPost((prevState) => ({
                  ...prevState,
                  [e.target.name]: e.target.value,
                }))
              }}
            />
          </label>
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default CreateBlog
