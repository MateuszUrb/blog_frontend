import axios from "axios";
const baseUrl = "/api/users";
/**
 * @typedef {import("../types/user").User} User
 */

let token = "";

/**
 * @returns {Promise<User>} - currently logged user info
 */
async function getLogggedUser() {
  let config = {
    headers: { Authorization: token },
  };

  const res = await axios.get(`${baseUrl}`, config);
  return res.data;
}

export default { getLogggedUser };
