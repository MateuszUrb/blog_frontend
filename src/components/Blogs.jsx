import React, { useEffect } from "react"
import CreateBlog from "./CreateBlog"
import Togglable from "./Togglable"
import { useDispatch, useSelector } from "react-redux"
import { initializeBlogs } from "../reducers/blogListReducer"
import { Link } from "react-router-dom"
import style from "./blogs.module.css"

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
    <div className={style.blogsContainer}>
      <header>
        <h1>Blogs</h1>
      </header>
      <Togglable buttonLabel="new blog">
        <CreateBlog />
      </Togglable>
      <div className={style.blogs}>
        {sortedBlogs.map((/** @type {BlogProps} */ blog) => (
          <li key={blog.id} className={style.blogList}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </div>
    </div>
  )
}

export default Blogs
