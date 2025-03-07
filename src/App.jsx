import React, { useState, useEffect } from "react"
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

/** @typedef {import("./types/blog").BlogProps[] | []} BlogProps */
/** @typedef {import("./types/blog").UserProps} UserProps */
/** @typedef {import("./store").AppDispatch} AppDispatch */

/**
 * @returns {React.JSX.Element} app
 */
function App() {
  const navigate = useNavigate()
  /** @type {AppDispatch} */
  const dispatch = useDispatch()
  const user = useSelector(
    /** @param {import("./store").RootState} state */
    (state) => state.user
  )

  const [userCredentials, setUserCredentials] = useState({
    username: "",
    password: "",
  })

  useEffect(() => {
    dispatch(getUserInfo())
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
    navigate("/login", { replace: true })
    setTimeout(() => window.location.reload(), 100)
  }

  return (
    <div>
      {user.username ? (
        <Menu logOut={logOut}>
          <Routes>
            <Route path="/" element={<ProtectedRoute element={<Blogs />} />} />
            <Route
              path="/blogs"
              element={<ProtectedRoute element={<Blogs />} />}
            />

            <Route
              path="/blogs/:id"
              element={<ProtectedRoute element={<Blogs />} />}
            />
            <Route
              path="/users"
              element={<ProtectedRoute element={<Users />} />}
            />
            <Route path="*" element={<Navigate to="/blogs" replace />} />
          </Routes>
        </Menu>
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

export default App
