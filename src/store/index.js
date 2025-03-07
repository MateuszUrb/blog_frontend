import { configureStore } from "@reduxjs/toolkit"
import notificationReducer from "../reducers/notificationReducer"
import blogListReducer from "../reducers/blogListReducer"
import userReducer from "../reducers/userReducer"

const store = configureStore({
  reducer: {
    user: userReducer,
    blogList: blogListReducer,
    notification: notificationReducer,
  },
})

/**
 * @typedef {ReturnType<typeof store.getState>} RootState
 * @typedef {typeof store.dispatch} AppDispatch
 */

export default store
