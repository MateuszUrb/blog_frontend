import { combineReducers, configureStore } from "@reduxjs/toolkit"
import notificationReducer from "../reducers/notificationReducer"
import blogListReducer from "../reducers/blogListReducer"
import userReducer from "../reducers/userReducer"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"

const persistConfig = {
  key: "root",
  storage,
}
const rootReducer = combineReducers({
  user: userReducer,
  blogList: blogListReducer,
  notification: notificationReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
export const persistor = persistStore(store)

/**
 * @typedef {ReturnType<typeof store.getState>} RootState
 * @typedef {typeof store.dispatch} AppDispatch
 */

export default store
