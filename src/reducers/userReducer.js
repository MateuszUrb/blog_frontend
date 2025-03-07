import { createSlice } from "@reduxjs/toolkit"
import { displayNotificaion } from "./notificationReducer"
import blogService from "../services/blogs"
import loginService from "../services/login"

/**
 * @typedef {import("../store").RootState} RootState
 * @typedef {import("../store").AppDispatch} AppDispatch
 * @typedef {import("../types/blog").UserProps} User
 */

/** @type {User} */
const initialState = {
  username: "",
  name: "",
  token: "",
}

const userInfoSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    getUser(state, action) {
      return state
    },
  },
})

/** @returns {(dispatch: AppDispatch) => Promise<void>} */
export function getUserInfo() {
  return async (dispatch) => {
    try {
      const loggedInUser = window.localStorage.getItem("loggedBlogUser")
      if (loggedInUser) {
        const user = JSON.parse(/**@type {string} */ (loggedInUser))
        dispatch(setUser(user))
        if (user && user.token) {
          blogService.setToken(user.token)
        } else {
          throw new Error("Invlid user token")
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
        window.localStorage.clear()
        dispatch(
          displayNotificaion({
            message: "Token expired, please login ",
            type: "error",
          })
        )
      }
    }
  }
}

/**
 * @returns {(dispatch: AppDispatch) => Promise<void>}
 * @param {{ username: string; password: string;}} usrCredentials
 */
export function setUserInfo(usrCredentials) {
  return async (dispatch) => {
    try {
      const userData = await loginService.login(usrCredentials)
      window.localStorage.setItem("loggedBlogUser", JSON.stringify(userData))
      blogService.setToken(userData.token)
      dispatch(setUser(userData))
    } catch (error) {
      dispatch(
        displayNotificaion({
          message: "wrong username or password",
          type: "error",
        })
      )
    }
  }
}

export const { setUser, getUser } = userInfoSlice.actions
export default userInfoSlice.reducer
