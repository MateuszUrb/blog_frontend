import React, { useEffect, useState } from "react"
import blogService from "../services/blogs"
import userService from "../services/users"
import "./blog.css"
import { useDispatch, useSelector } from "react-redux"
import { removeBlog, updateLike } from "../reducers/blogListReducer"
import {
  displayNotificaion,
  setNotificaiton,
} from "../reducers/notificationReducer"

/** @typedef {import("../types/blog").BlogProps} BlogProps */
/** @typedef {import("../types/blog").UserProps} UserProps */
/** @typedef {import("../store").RootState} RootState */
/** @typedef {import("../store").AppDispatch} AppDispatch */

/**
 * @param {object} params - component parameters
 * @param {BlogProps} params.blog - blog post with title like etc.
 * @param {UserProps} params.user - logged in user info
 * @throws {Error} - message
 * @returns {React.ReactElement} blog
 */
function Blog({ blog, user }) {
  /** @type {AppDispatch} */
  const dispatch = useDispatch()

  const [currentUser, setCurrentUser] = useState(null)
  const [isBlogOwner, setIsBlogOwner] = useState(false)

  useEffect(() => {
    async function fetchUser() {
      try {
        const user = await userService.getLogggedUser()
        setCurrentUser(Array.isArray(user) ? user[0] : user)
      } catch (error) {
        if (error instanceof Error) {
          dispatch(
            displayNotificaion({ message: error.message, type: "error" })
          )
        }
      }
    }
    fetchUser()
  }, [dispatch])

  useEffect(() => {
    if (user && blog.users) {
      setIsBlogOwner(blog.users.some((i) => i.username === user.username))
    }
  }, [user, blog])

  function updateBlogLike() {
    dispatch(updateLike(blog))
  }
  /**
   * @returns {Promise<void>} - delete result (void)
   * @throws {Error}
   */
  async function handleDelete() {
    if (!currentUser) {
      throw new Error("cannot find loggen-in user Id")
    } else {
      dispatch(removeBlog(currentUser.id, blog))
    }
  }

  return (
    <div className="blog">
      <div className="blog-header">
        <div className="header-top">
          <div className="title-author">
            <span className="blog-title">{blog.title}</span>
            <div className="blog-author">by {blog.author}</div>
          </div>
        </div>
      </div>

      <details className="blog-details">
        <summary className="toggle-summary">More Info</summary>
        <div className="details-content">
          <p className="blog-url">
            Url:{" "}
            {blog.url === "none" ? (
              <span>Missing url</span>
            ) : (
              <a href={blog.url} target="_blank" rel="noopener noreferrer">
                {blog.url}
              </a>
            )}
          </p>
          <div className="blog-likes">
            <p className="blog-like">Likes: {blog.likes}</p>
            <button onClick={updateBlogLike} className="blog-btn">
              like
            </button>
          </div>
          {isBlogOwner && (
            <div>
              <button
                onClick={handleDelete}
                className="blog-btn blog-btn__delete">
                remove
              </button>
            </div>
          )}
        </div>
      </details>
    </div>
  )
}
export default Blog
