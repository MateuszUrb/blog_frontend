import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import React from "react"
import "./menu.css"

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
      <header className="menu">
        <nav className="menuLinks">
          <ul>
            <li>
              <NavLink to="/blogs">blogs</NavLink>
            </li>
            <li>
              <NavLink to="/users">users</NavLink>
            </li>
          </ul>
        </nav>
        <div className="menuUser">
          <p>{user.name} logged in</p>
          <button onClick={props.logOut}>Log Out</button>
        </div>
      </header>
      {props.children}
    </>
  )
}

export default Menu
