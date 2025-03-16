import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import "./menu.css"
import React from "react"

/**
 * @param {object} props
 * @param {React.ReactNode} props.children
 * @param {import("react").MouseEventHandler<HTMLButtonElement>} props.logOut
 */
function Menu(props) {
  const user = useSelector(
    /** @param {import("./store/index").RootState} state */
    (state) => state.user
  )

  return (
    <>
      <div className="menu">
        <div className="menu-links">
          <NavLink to="/blogs">blogs</NavLink>
          <NavLink to="/users">users</NavLink>
        </div>
        <div className="menu-user">
          <p>{user.name} logged in</p>
          <button onClick={props.logOut}>Log Out</button>
        </div>
      </div>
      {props.children}
    </>
  )
}

export default Menu
