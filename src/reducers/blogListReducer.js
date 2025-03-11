import { createSlice } from "@reduxjs/toolkit"
import { displayNotificaion } from "./notificationReducer"
import blogService from "../services/blogs"
import userService from "../services/users"
import users from "../services/users"

/**
 * @typedef {import("../App").BlogProps} BlogProps
 * @typedef {import("../store").RootState} RootState
 * @typedef {import("../store").AppDispatch} AppDispatch
 */

/**
 * @type {import("../types/blog").BlogProps[]}
 */
const initialState = []

const blogListSlice = createSlice({
  name: "blogList",
  initialState,
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      const newBlog = action.payload
      if (!newBlog.users) {
        newBlog.users = []
      }
      state.push(newBlog)
    },
    addLike(state, action) {
      return state.map((blog) =>
        blog.id === action.payload.id ? action.payload : blog
      )
    },
    deleteBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload)
    },
  },
})

/**
 * @returns {(dispatch: AppDispatch, getState: () => RootState) => Promise<void>}
 */
export function initializeBlogs() {
  return async (dispatch) => {
    try {
      const res = await blogService.getAll()

      if (!Array.isArray(res)) {
        throw new Error("Error while geting Blogs")
      } else {
        const blogsWithUsers = res.map((blog) => ({
          ...blog,
          users: blog.users || [],
        }))
        dispatch(setBlogs(blogsWithUsers))
      }
    } catch (error) {
      if (error instanceof Error) {
        dispatch(
          displayNotificaion({
            message: "Error: failed fetching blogs",
            type: "error",
          })
        )
      }
    }
  }
}

/**
 * @param {import("../types/blog").BlogProps} blogPost
 * @returns {(dispatch: AppDispatch, getState: () => RootState) => Promise<void>}
 */
export function createBlog(blogPost) {
  return async (dispatch) => {
    try {
      const blog = await blogService.create(blogPost)
      const userArr = await userService.getLogggedUser()

      const users = userArr.map((user) => ({
        username: user.username,
        name: user.name,
        id: user.id,
      }))

      const newBlog = {
        ...blog,
        users,
      }
      dispatch(appendBlog(newBlog))
      dispatch(
        displayNotificaion({
          message: `a new blog ${blogPost.title} by ${blogPost.author}`,
          type: "success",
        })
      )
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)

        dispatch(displayNotificaion({ message: error.message, type: "error" }))
      }
    }
  }
}

/**
 * @param {import("../types/blog").BlogProps} blog
 * @returns {(dispatch: AppDispatch, getState: () => RootState) => Promise<void>}
 */
export function updateLike(blog) {
  return async (dispatch) => {
    try {
      const updatedBlog = {
        ...blog,
        likes: (blog.likes ?? 0) + 1,
      }
      const res = await blogService.update(blog.id, updatedBlog)
      const currentUser = blog.users || []

      const updatedWithUsers = { ...res, users: currentUser }
      dispatch(addLike(updatedWithUsers))
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
        dispatch(displayNotificaion({ message: error.message, type: "error" }))
      }
    }
  }
}

/**
 * @param {string} userId
 * @param {import("../types/blog").BlogProps} blog
 * @returns {(dispatch: AppDispatch, getState: () => RootState) => Promise<void>}
 */
export function removeBlog(userId, blog) {
  return async (dispatch) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        if (userId !== undefined) {
          await blogService.remove(blog.id, userId)
          dispatch(deleteBlog(blog.id))
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message)
          dispatch(
            displayNotificaion({ message: error.message, type: "error" })
          )
        }
      }
    }
  }
}

export const { setBlogs, appendBlog, addLike, deleteBlog } =
  blogListSlice.actions
export default blogListSlice.reducer
