import axios from "axios"
const baseUrl = "/api/blogs"
/**
 * @typedef {import("../types/blog").BlogProps} BlogProps
 */

let token = ""
/**
 * @param {string} newToken - fn: assign new token
 */
function setToken(newToken) {
  token = `Bearer ${newToken}`
}

const getConfig = () => {
  if (!token) {
    console.error("Authorization token missing")
  }
  return {
    headers: { Authorization: token },
  }
}

/**
 * @returns {Promise<BlogProps[] | undefined>} - all blogs
 */
async function getAll() {
  if (!token) {
    console.error("Authorization token missing")
  }
  try {
    const config = getConfig()
    const request = await axios.get(baseUrl, config)
    return request.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Axios error getting blogs:",
        error.response?.data || error.message
      )
    } else if (error instanceof Error) {
      console.error("Unexpected error getting blogs:", error.message)
    } else {
      console.error("Unknown error getting blogs:", error)
    }
  }
}

/**
 * @param {BlogProps} newBlog - client req with data
 * @returns {Promise<BlogProps | undefined>} - blogs with newly created one
 */
async function create(newBlog) {
  if (!token) {
    console.error("Authorization token missing")
  }

  try {
    const config = getConfig()
    const res = await axios.post(baseUrl, newBlog, config)
    return res.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Axios error creating blog:",
        error.response?.data || error.message
      )
    } else if (error instanceof Error) {
      console.error("Unexpected error creating blog:", error.message)
    } else {
      console.error("Unknown error creating blog:", error)
    }
  }
}

/**
 * @param {string} id - blog id
 * @param {BlogProps} blog - blog to update
 * @returns {Promise<BlogProps | undefined>} - updated blog
 */
async function update(id, blog) {
  if (!token) {
    console.error("Authorization token missing")
  }

  try {
    const config = getConfig()
    const res = await axios.put(`${baseUrl}/${id}`, blog, config)
    return res.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Axios error updating blog:",
        error.response?.data || error.message
      )
    } else if (error instanceof Error) {
      console.error("Unexpected error updating blog:", error.message)
    } else {
      console.error("Unknown error updating blog:", error)
    }
  }
}

/**
 * @param {string} id
 * @param {string} comment
 */
async function addComment(id, comment) {
  if (!token) {
    console.error("Authorization token missing")
    return
  }

  try {
    const config = getConfig()

    const res = await axios.post(
      `${baseUrl}/${id}/comments`,
      { comment },
      config
    )

    return res.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Axios error creating comment:",
        error.response?.data || error.message
      )
    } else if (error instanceof Error) {
      console.error("Unexpected error creating comment:", error.message)
    } else {
      console.error("Unknown error creating  comment:", error)
    }
  }
}

/**
 * @param {string} id - blog id
 * @param {string} userId - user id
 * @returns {Promise<unknown>} - result of deletino either error obj or 204 no content
 */
async function remove(id, userId) {
  if (!token) {
    console.error("Authorization token missing")
  }

  try {
    const config = getConfig()

    const res = await axios.delete(`${baseUrl}/${id}`, {
      ...config,
      data: { userId },
    })
    return res
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Axios error deleting blog:",
        error.response?.data || error.message
      )
    } else if (error instanceof Error) {
      console.error("Unexpected error deleting blog:", error.message)
    } else {
      console.error("Unknown error deleting blog:", error)
    }
  }
}

export default { getAll, create, setToken, update, remove, addComment }
