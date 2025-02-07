import React, { useEffect } from "react";
import blogService from "../services/blogs";
import Blog from "./Blog";
import CreateBlog from "./CreateBlog";
import Notification from "./Notification";
import Togglable from "./Togglable";
import "./blog.css";
/** @typedef {import("../types/blog").BlogProps} BlogProps */
/** @typedef {import("../types/blog").UserProps} UserProps */

/**
 * @param {object} params - parameter passed to component
 * @param {BlogProps[]} params.blogs - array of blogs
 * @param {UserProps} params.user - user info
 * @param {{message: null | string, type: null | string}} params.notification - notification message and type
 * @param {React.Dispatch<React.SetStateAction<BlogProps[]>>} params.setBlogs - blogs setter fn
 * @param {React.Dispatch<React.SetStateAction<{ message: string | null; type: string | null; }>> } params.setNotification  - notification setter fn
 * @returns {React.JSX.Element} - JSX Element
 */
function Blogs({ blogs, setBlogs, user, notification, setNotification }) {
  useEffect(() => {
    /**
     * @async
     * @throws {Error}
     * @returns {Promise<void>}
     */
    async function getBlogs() {
      try {
        const res = await blogService.getAll();
        if (!Array.isArray(res)) {
          throw new Error("Error while geting Blogs");
        }
        setBlogs(res);
      } catch (error) {
        if (error instanceof Error) {
          setNotification({
            message: "Error: fialed fetching blogs",
            type: "error",
          });
        }
      }
    }

    getBlogs();
  }, []);

  /**
   * @returns {void}
   */
  function logOut() {
    window.localStorage.clear();
    window.location.reload();
  }

  return (
    <>
      <h1>Blogs</h1>
      {notification.message && (
        <Notification message={notification.message} type="success" />
      )}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <p>{user.name} logged in</p>
        <button onClick={logOut}>Log Out</button>
      </div>
      <Togglable buttonLabel="new note">
        <CreateBlog setNotification={setNotification} setBlogs={setBlogs} />
      </Togglable>
      <div className="blog-container">
        {blogs
          .sort((a, b) => {
            const likesA = a.likes || 0;
            const likesB = b.likes || 0;
            return likesB - likesA;
          })
          .map((/** @type {BlogProps} */ blog) => (
            <Blog key={blog.id} user={user} blog={blog} setBlogs={setBlogs} />
          ))}
      </div>
    </>
  );
}

export default Blogs;
