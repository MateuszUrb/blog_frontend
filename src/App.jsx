import React, { useState, useEffect } from "react"
import Notification from "./components/Notification"
import LoginUser from "./components/LoginUser"
import Blogs from "./components/Blogs"
import { useDispatch, useSelector } from "react-redux"
import { getUser, getUserInfo, setUserInfo } from "./reducers/userReducer"
import {
  Routes,
  Route,
  useMatch,
  useNavigate,
  Navigate,
} from "react-router-dom"
import Users from "./components/Users"
import ProtectedRoute from "./ProtectedRoute"
import Menu from "./Menu"
import Blog from "./components/Blog"
import User from "./components/User"
import { persistor } from "./store"
import "./variables.css"
import style from "./app.module.css"

/** @typedef {import("./types/blog").BlogProps[] | []} BlogProps */
/** @typedef {import("./types/blog").UserProps} UserProps */
/** @typedef {import("./store/index").RootState} RootState */
/** @typedef {import("./store").AppDispatch} AppDispatch */

/**
 * @returns {React.JSX.Element} app
 */
function App() {
  const navigate = useNavigate()
  /** @type {AppDispatch} */
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)

  const user = useSelector(
    /** @param {import("./store").RootState} state */
    (state) => state.user
  )
  const blogs = useSelector(
    /** @param {import("./store").RootState} state */
    (state) => state.blogList
  )

  const notification = useSelector(
    /** @param {RootState} state */
    (state) => state.notification.message
  )
  const [userCredentials, setUserCredentials] = useState({
    username: "",
    password: "",
  })

  useEffect(() => {
    async function fetchUserInfo() {
      dispatch(getUserInfo())

      setLoading(false)
    }
    fetchUserInfo()
  }, [dispatch])

  /**
   * @param {React.MouseEvent<HTMLButtonElement>} e - event
   */
  async function handleLogin(e) {
    e.preventDefault()
    dispatch(setUserInfo(userCredentials))
    navigate("/blogs")
  }

  function logOut() {
    window.localStorage.clear()
    persistor.purge()
    navigate("/login", { replace: true })
    setTimeout(() => window.location.reload(), 100)
  }

  const matchBlog = useMatch("/blogs/:id")
  const blog = matchBlog
    ? blogs.find((b) => b.id === matchBlog.params.id)
    : null

  if (loading) return <Loading />

  return (
    <div className={style.container}>
      {notification && <Notification />}
      {user.username ? (
        <div className={style.app}>
          <Menu logOut={logOut}>
            <Routes>
              <Route
                path="/blogs/:id"
                element={
                  <ProtectedRoute
                    element={
                      blog ? (
                        <Blog blog={blog} user={user} />
                      ) : (
                        <p>Blog not found</p>
                      )
                    }
                  />
                }
              />

              <Route
                path="/users/:author"
                element={<ProtectedRoute element={<User />} />}
              />
              <Route
                path="/blogs"
                element={<ProtectedRoute element={<Blogs />} />}
              />

              <Route
                path="/users"
                element={<ProtectedRoute element={<Users />} />}
              />

              <Route
                path="/"
                element={<ProtectedRoute element={<Blogs />} />}
              />
              <Route path="*" element={<Navigate to="/blogs" replace />} />
            </Routes>
          </Menu>
        </div>
      ) : (
        <Routes>
          <Route
            path="/login"
            element={
              <LoginUser
                userCredentials={userCredentials}
                setUserCredentials={setUserCredentials}
                handleLogin={handleLogin}
              />
            }
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      )}
    </div>
  )
}

/**
 * @returns {React.JSX.Element}
 */
function Loading() {
  return (
    <div>
      <h1>Loading...</h1>
    </div>
  )
}

export default App
