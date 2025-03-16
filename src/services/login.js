import axios from "axios"
const baseUrl = "/api/login"

/**
 * @param {{username: string, password: string}} credentials - user credentials
 * @returns {Promise<import("../types/blog").UserProps | undefined>} - promise
 */
async function login(credentials) {
  try {
    const res = await axios.post(baseUrl, credentials)
    return res.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Axios error while logging in:",
        error.response?.data || error.message
      )
    } else if (error instanceof Error) {
      console.error("Unexpected error logging in :", error.message)
    } else {
      console.error("Unknown error logging  in:", error)
    }
  }
}

export default { login }
