import React from "react"
import PropTypes from "prop-types"
import Notification from "./Notification"
import { useSelector } from "react-redux"
import store from "../store"

/** @typedef {ReturnType<typeof store.getState>} RootState */

/**
 * @param {object} props - properties passed to component
 * @param {{[key: string]: string}} props.userCredentials - user credentials
 * @param {React.MouseEventHandler<HTMLButtonElement>} props.handleLogin - forum submit handler
 * @param {React.Dispatch<React.SetStateAction<
 * {username: string;
 * password: string;}>>} props.setUserCredentials - function used to set user Credentials
 * @returns {React.ReactElement} Login forum
 */
function LoginUser({ userCredentials, handleLogin, setUserCredentials }) {
  const notification = useSelector(
    /** @param {RootState} state */
    (state) => state.notification.message
  )

  return (
    <>
      <h1>Log in to application</h1>
      {notification && <Notification />}
      <form>
        <div>
          <label htmlFor="username">
            username:{" "}
            <input
              type="text"
              name="username"
              id="username"
              value={userCredentials.username}
              onChange={(e) =>
                setUserCredentials(
                  (
                    /** @type {{username: string, password: string}} */ prevState
                  ) => ({
                    ...prevState,
                    [e.target.name]: e.target.value,
                  })
                )
              }
            />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            password:{" "}
            <input
              type="password"
              name="password"
              id="password"
              value={userCredentials.password}
              onChange={(e) =>
                setUserCredentials(
                  (
                    /** @type {{username: string, password: string}} */ prevState
                  ) => ({
                    ...prevState,
                    [e.target.name]: e.target.value,
                  })
                )
              }
            />
          </label>
        </div>
        <button type="submit" onClick={handleLogin}>
          login
        </button>
      </form>
    </>
  )
}

LoginUser.propTypes = {
  userCredentials: PropTypes.object.isRequired,
  handleLogin: PropTypes.func.isRequired,
  setUserCredentials: PropTypes.func.isRequired,
}

export default LoginUser
