import React from "react";
import blogService from "../services/blogs";
import userService from "../services/users";
import "./blog.css";

/** @typedef {import("../types/blog").BlogProps} BlogProps */
/** @typedef {import("../types/blog").UserProps} UserProps */

/**
 * @param {object} params - component parameters
 * @param {BlogProps} params.blog - blog post with title like etc.
 * @param {UserProps} params.user - logged in user info
 * @param {React.Dispatch<React.SetStateAction<BlogProps[]>>} params.setBlogs - blog post setter
 * @throws {Error} - message
 * @returns {React.ReactElement} blog
 */
function Blog({ blog, setBlogs, user }) {
  const currentUser = Array.isArray(user) ? user[0] : (user ?? "not found");
  const blogOwner = blog?.users ? blog.users.map((u) => u.username) : [];
  const isBlogOwner = blogOwner.includes(currentUser.username);

  /**
   * @returns {Promise<void>} - return promise implicitly
   */
  async function addLike() {
    const updatedBlog = {
      ...blog,
      likes: (blog.likes ?? 0) + 1,
    };
    try {
      const res = await blogService.update(blog.id, updatedBlog);
      setBlogs((/** @type {BlogProps[]} */ prevState) =>
        prevState.map(
          (b) => (b.id === blog.id ? { ...res, users: blog.users } : b), // Preserve `users`
        ),
      );
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }

  /**
   * @returns {Promise<(string|undefined)>} - logged in user id
   */
  async function getLoggedUserId() {
    try {
      const userId = await userService.getLogggedUser();
      if (Array.isArray(userId)) {
        return userId[0].id;
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
      }
    }
  }

  /**
   * @returns {Promise<void>} - delete result (void)
   */
  async function handleDelete() {
    const userId = await getLoggedUserId();
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        if (userId !== undefined) {
          await blogService.remove(blog.id, userId);
          setBlogs((/** @type {BlogProps[]} */ prevState) =>
            prevState.filter((b) => b.id !== blog.id),
          );
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        }
      }
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
            <button onClick={addLike} className="blog-btn">
              like
            </button>
          </div>
          {isBlogOwner && (
            <div>
              <button
                onClick={handleDelete}
                className="blog-btn blog-btn__delete"
              >
                remove
              </button>
            </div>
          )}
        </div>
      </details>
    </div>
  );
}
export default Blog;
