import { useSelector } from "react-redux"

function Users() {
  const blog = useSelector(
    /** @param {import("../store").RootState} state */
    (state) => state.blogList
  )

  const authorBlogCount = {}
  for (const b of blog) {
    if (authorBlogCount[b.author]) {
      authorBlogCount[b.author]++
    } else {
      authorBlogCount[b.author] = 1
    }
  }

  const authors = Object.keys(authorBlogCount).map((author) => ({
    author,
    blogCount: authorBlogCount[author],
  }))

  return (
    <div>
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
              <td>{authorData.author}</td>
              <td>{authorData.blogCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
