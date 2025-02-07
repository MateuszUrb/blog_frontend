import React, { useState, useEffect } from "react";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginUser from "./components/LoginUser";
import Blogs from "./components/Blogs";

/** @typedef {import("./types/blog").BlogProps[] | []} BlogProps */
/** @typedef {import("./types/blog").UserProps} UserProps */

/**
 * @returns {React.JSX.Element} app
 */
function App() {
  const [blogs, setBlogs] = useState(/** @type {BlogProps}*/ ([]));
  const [userCredentials, setUserCredentials] = useState({
    username: "",
    password: "",
  });

  const [user, setUser] = useState(/**@type {UserProps | null} */ (null));

  /**
   */
  const [notification, setNotification] = useState({
    message: /** @type {string|null} */ (null),
    type: /** @type {string|null} */ (null),
  });

  useEffect(() => {
    try {
      const loggedInUser = window.localStorage.getItem("loggedBlogUser");
      if (loggedInUser) {
        const user = JSON.parse(/**@type {string} */ (loggedInUser));
        setUser(user);
        if (user && user.token) {
          blogService.setToken(user.token);
        } else {
          throw new Error("Invlid user token");
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        window.localStorage.clear();
        setNotification({
          message: "Token expired, please login ",
          type: "error",
        });
        setTimeout(() => {
          setNotification({ message: null, type: null });
        }, 5000);
      }
    }
  }, []);

  /**
   * @param {React.MouseEvent<HTMLButtonElement>} e - event
   */
  async function handleLogin(e) {
    e.preventDefault();

    try {
      const userData = await loginService.login(userCredentials);
      window.localStorage.setItem("loggedBlogUser", JSON.stringify(userData));
      blogService.setToken(userData.token);
      setUser(userData);
    } catch (error) {
      setNotification({ message: "wrong username or password", type: "error" });
      setTimeout(() => {
        setNotification({ message: null, type: null });
      }, 5000);
    }
  }

  return (
    <div>
      {user === null ? (
        <LoginUser
          notification={notification}
          userCredentials={userCredentials}
          setUserCredentials={setUserCredentials}
          handleLogin={handleLogin}
        />
      ) : (
        <Blogs
          blogs={blogs}
          setBlogs={setBlogs}
          user={user}
          notification={notification}
          setNotification={setNotification}
        />
      )}
    </div>
  );
}

export default App;
