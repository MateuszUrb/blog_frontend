import "./comments.css"
import React, { useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { createComment } from "../reducers/blogListReducer"

/**
 * @param {object} params
 * @param {import("../types/blog").BlogProps} params.blog
 */
function Comments({ blog }) {
  const [loading, setLoading] = useState(false)
  /** @type {import('react').RefObject<HTMLTextAreaElement>} */
  const commentRef = useRef(null)

  /** @type {import("../store").AppDispatch} */
  const dispatch = useDispatch()
  /**
   * @param {React.FormEvent} e
   */
  async function handleCreateComment(e) {
    e.preventDefault()

    const comment = commentRef.current?.value.trim()
    setLoading(true)
    dispatch(createComment(comment, blog.id))

    if (commentRef.current) {
      commentRef.current.value = ""
    }
    setLoading(false)
  }

  /**
   * @param {React.KeyboardEvent<HTMLTextAreaElement>} e
   */
  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleCreateComment(e)
    }
  }

  return (
    <section className="comments">
      <h1>Comments</h1>
      <form className="comments-add" onSubmit={handleCreateComment}>
        <textarea
          ref={commentRef}
          id="commentInput"
          disabled={loading}
          onKeyDown={handleKeyDown}
          placeholder="Your comment"
        />
        <button type="submit">{loading ? "Adding..." : "Add Comment"}</button>
      </form>

      {blog.comments.length > 0 ? (
        <ul className="comments-list">
          {blog.comments.map((comment) => (
            <li key={comment.id} className="comment-item">
              <div className="comment-header">
                <span className="comment-author">
                  {comment.author ? comment.author : "Anonymous"}
                </span>{" "}
                <span className="comment-date">{comment.created}</span>
              </div>
              <p>{comment.comment}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No comments yet.</p>
      )}
    </section>
  )
}

export default Comments
