import axios from "axios";
const baseUrl = "/api/blogs";
/**
 * @typedef {import("../types/blog").BlogProps} BlogProps
 */

let token = "";
/**
 * @param {string} newToken - fn: assign new token
 */
function setToken(newToken) {
  token = `Bearer ${newToken}`;
}

/**
 * @returns {Promise<BlogProps[]>} - all blogs
 */
async function getAll() {
  let config = {
    headers: { Authorization: token },
  };
  const request = await axios.get(baseUrl, config);
  return request.data;
}

/**
 * @param {BlogProps} newBlog - client req with data
 * @returns {Promise<BlogProps>} - blogs with newly created one
 */
async function create(newBlog) {
  let config = {
    headers: { Authorization: token },
  };
  const res = await axios.post(baseUrl, newBlog, config);
  return res.data;
}

/**
 * @param {string} id - blog id
 * @param {BlogProps} blog - blog to update
 * @returns {Promise<BlogProps>} - updated blog
 */
async function update(id, blog) {
  let config = {
    headers: { Authorization: token },
  };
  const res = await axios.put(`${baseUrl}/${id}`, blog, config);
  return res.data;
}

/**
 * @param {string} id - blog id
 * @param {string} userId - user id
 * @returns {Promise<unknown>} - result of deletino either error obj or 204 no content
 */
async function remove(id, userId) {
  let config = {
    headers: { Authorization: token },
  };

  const res = await axios.delete(`${baseUrl}/${id}`, {
    ...config,
    data: { userId },
  });
  return res;
}

export default { getAll, create, setToken, update, remove };
