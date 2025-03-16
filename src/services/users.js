import axios from "axios"
const baseUrl = "/api/users"
/**
 * @typedef {import("../types/user").User} User
 */

let token = ""

/**
 * @returns {Promise<User | undefined>} - currently logged user info
 */
async function getLogggedUser() {
  let config = {
    headers: { Authorization: token },
  }
  try {
    const res = await axios.get(`${baseUrl}`, config)
    return res.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Axios error fetching logged user:",
        error.response?.data || error.message
      )
    } else if (error instanceof Error) {
      console.error("Unexpected error fetching logged user:", error.message)
    } else {
      console.error("Unknown error fetching logged user:", error)
    }
  }
}

export default { getLogggedUser }
