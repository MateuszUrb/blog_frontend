import { createSlice } from "@reduxjs/toolkit"

/**
 * @typedef {import("../store").RootState} RootState
 * @typedef {import("../store").AppDispatch} AppDispatch
 */

const initialState = {
  message: null,
  type: null,
}

const notifiacitonSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotificaiton(state, action) {
      return { message: action.payload.message, type: action.payload.type }
    },
    clearNotificaiton() {
      return { message: null, type: null }
    },
  },
})

/**
 * @param {{message: string, type: string}} notification
 * @param {number} delay
 * @returns {(dispatch: AppDispatch, getState: () => RootState) => Promise<void>}
 */
export function displayNotificaion(notification, delay = 5000) {
  return async (dispatch) => {
    dispatch(setNotificaiton(notification))
    setTimeout(() => {
      dispatch(clearNotificaiton())
    }, delay)
  }
}

export const { setNotificaiton, clearNotificaiton } = notifiacitonSlice.actions
export default notifiacitonSlice.reducer
