import React from "react"
import style from "./user.module.css"
import { Link, useParams } from "react-router-dom"
import { useSelector } from "react-redux"

const User = () => {
  const { author } = useParams()
  const blogs = useSelector(
    /**@param {import("../store").RootState} state */
    (state) => state.blogList
  )

  const decodedAuthor = author?.replace(/_/g, ".")

  const userBlogs = blogs.filter((blog) => blog.author === decodedAuthor)

  return (
    <div className={style.userContainer}>
      <h2>Blogs created by {decodedAuthor}</h2>
      {userBlogs.length ? (
        <ul>
          {userBlogs.map((blog) => (
            <li key={blog.id}>
              <a href={blog.url} target="_blank" rel="noopener noreferrer">
                {blog.title}
              </a>{" "}
              <p>by {blog.author}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No blogs created by this author.</p>
      )}
    </div>
  )
}

export default User
