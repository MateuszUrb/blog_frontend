import { useEffect, useState } from "react";
import blogService from "../services/blogs";
/** @typedef {import("../types/blog").BlogProps} BlogProps */
/** @typedef {import("../types/blog").UserProps} UserProps */

/**
 * @param {object} params - parameters passed to competent
 * @param {React.Dispatch<React.SetStateAction<BlogProps[]>>} params.setBlogs - blog setter fn
 * @param {React.Dispatch<React.SetStateAction<
 * {message: string|null, type: string|null}>>} params.setNotification - notification setter fn
 * @returns {React.JSX.Element} - Jsx
 */
function CreateBlog({ setBlogs, setNotification }) {
  const [blogPost, setBlogPost] = useState({
    title: "",
    author: "",
    url: "",
  });
  const [isFetching, setIsFetching] = useState(false);
  useEffect(() => {
    if (!isFetching) return;
    blogService.getAll().then((blogs) => setBlogs(blogs));
    setIsFetching(false);
  }, [isFetching, setBlogs]);

  /**
   * @param {React.FormEvent} e - event
   */
  async function handleCreateBlog(e) {
    e.preventDefault();
    try {
      await blogService.create(blogPost);
      setIsFetching(true);
      setNotification({
        message: `a new blog ${blogPost.title} by ${blogPost.author}`,
        type: "success",
      });
      setBlogPost({
        title: "",
        author: "",
        url: "",
      });
      setTimeout(() => {
        setNotification({ message: null, type: null });
      }, 5000);
    } catch (error) {
      if (error instanceof Error) {
        setNotification({ message: error.message, type: "error" });
        setTimeout(() => {
          setNotification({ message: null, type: null });
        }, 5000);
      }
    }
  }
  return (
    <>
      <h2>add new blog</h2>
      <form onSubmit={handleCreateBlog}>
        <div>
          <label htmlFor="title">
            title:
            <input
              type="text"
              id="title"
              name="title"
              value={blogPost.title}
              placeholder="enter blog title"
              onChange={(e) => {
                setBlogPost((prevState) => ({
                  ...prevState,
                  [e.target.name]: e.target.value,
                }));
              }}
            />
          </label>
        </div>
        <div>
          <label htmlFor="author">
            author:
            <input
              type="text"
              id="author"
              name="author"
              placeholder="enter blog author"
              value={blogPost.author}
              onChange={(e) => {
                setBlogPost((prevState) => ({
                  ...prevState,
                  [e.target.name]: e.target.value,
                }));
              }}
            />
          </label>
        </div>
        <div>
          <label htmlFor="url">
            url:
            <input
              type="text"
              id="url"
              name="url"
              value={blogPost.url}
              placeholder="enter blog url"
              onChange={(e) => {
                setBlogPost((prevState) => ({
                  ...prevState,
                  [e.target.name]: e.target.value,
                }));
              }}
            />
          </label>
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
}

export default CreateBlog;
