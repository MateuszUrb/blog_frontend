import React from "react"
import style from "./users.module.css"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

/**
 * @returns {React.JSX.Element}
 */
function Users() {
  const blog = useSelector(
    /** @param {import("../store").RootState} state */
    (state) => state.blogList
  )

  /**@type {{[key: string]: number, }} */
  const authorBlogCount = {}

  /**@type {{[key: string]: number|string, }} */
  const authorIds = {}

  for (const b of blog) {
    if (authorBlogCount[b.author]) {
      authorBlogCount[b.author]++
    } else {
      authorBlogCount[b.author] = 1
    }
    if (b.users && b.users.length > 0 && !authorIds[b.author]) {
      authorIds[b.author] = b.users[0].id
    }
  }

  const authors = Object.keys(authorBlogCount).map((author) => ({
    author,
    blogCount: authorBlogCount[author],
    id: authorIds[author],
  }))

  return (
    <div className={style.authorsContainer}>
      <h1>Authors</h1>
      <table>
        <thead>
          <tr>
            <th>Author</th>
            <th>Blog Count</th>
          </tr>
        </thead>
        <tbody>
          {authors.map((authorData) => (
            <tr key={authorData.author}>
              <td>
                <Link to={`/users/${authorData.author.replace(/\./g, "_")}`}>
                  {authorData.author}
                </Link>
              </td>
              <td>{authorData.blogCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
