import axios from "axios";
const baseUrl = "/api/login";

/**
 * @param {{username: string, password: string}} credentials - user credentials
 * @returns {Promise<import("../types/blog").UserProps>} - promise
 */
async function login(credentials) {
  const res = await axios.post(baseUrl, credentials);
  return res.data;
}

export default { login };
