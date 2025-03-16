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
import { useNavigate } from "react-router-dom"
import Comments from "./Comments"

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
  const navigate = useNavigate()

  const [currentUser, setCurrentUser] = useState(
    /**
     * @type {{id: string, username: string, name: string } | null}
     */ (null)
  )
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
      setIsBlogOwner(
        blog.users.some(
          (i) =>
            i.username === currentUser?.username || i.id === currentUser?.id
        )
      )
    }
  }, [user, blog, currentUser])

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
      const isDeleted = await dispatch(removeBlog(currentUser.id, blog))
      if (isDeleted) {
        navigate("/")
      }
    }
  }
  return (
    <>
      <article className="blog">
        <header className="blog-header">
          <div className="header-top">
            <div className="title-author">
              <h1 className="blog-title">{blog.title}</h1>
              <p className="blog-author">by {blog.author}</p>
            </div>
          </div>
        </header>

        <section className="blog-details">
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
        </section>
        <Comments blog={blog} />
      </article>
    </>
  )
}
export default Blog
