import React, { useEffect } from "react"
import CreateBlog from "./CreateBlog"
import Togglable from "./Togglable"
import "./blogs.css"
import { useDispatch, useSelector } from "react-redux"
import { initializeBlogs } from "../reducers/blogListReducer"
import { Link } from "react-router-dom"

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
      <Togglable buttonLabel="new note">
        <CreateBlog />
      </Togglable>
      <div className="blog-container">
        {sortedBlogs.map((/** @type {BlogProps} */ blog) => (
          <li key={blog.id} className="blog-li">
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </div>
    </>
  )
}

export default Blogs
