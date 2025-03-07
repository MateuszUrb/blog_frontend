import React, { useEffect } from "react"
import Blog from "./Blog"
import CreateBlog from "./CreateBlog"
import Notification from "./Notification"
import Togglable from "./Togglable"
import "./blog.css"
import { useDispatch, useSelector } from "react-redux"
import { initializeBlogs } from "../reducers/blogListReducer"

/** @typedef {import("../types/blog").BlogProps} BlogProps */
/** @typedef {import("../store").RootState} State */
/** @typedef {import("../types/blog").UserProps} UserProps */
/** @typedef {import("../store").AppDispatch} AppDispatch */

/**
 * @returns {React.JSX.Element} - JSX Element
 */
function Blogs() {
  /** @type {AppDispatch} */
  const dispatch = useDispatch()

  const blogs = useSelector(
    /** @param {State} state */
    (state) => state.blogList
  )
  const notification = useSelector(
    /** @param {State} state */
    (state) => state.notification.message
  )

  const user = useSelector(
    /** @param {State} state */
    (state) => state.user
  )

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const sortedBlogs = [...blogs].sort((a, b) => {
    const likesA = a.likes || 0
    const likesB = b.likes || 0
    return likesB - likesA
  })

  return (
    <>
      <h1>Blogs</h1>
      {notification && <Notification />}
      <Togglable buttonLabel="new note">
        <CreateBlog />
      </Togglable>
      <div className="blog-container">
        {sortedBlogs.map((/** @type {BlogProps} */ blog) => (
          <Blog key={blog.id} user={user} blog={blog} />
        ))}
      </div>
    </>
  )
}

export default Blogs
