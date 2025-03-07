import { useSelector } from "react-redux"
import { NavLink, useNavigate } from "react-router-dom"

/**
 * @param {object} props
 * @param {React.ReactNode} props.children
 * @param {import("react").MouseEventHandler<HTMLButtonElement>} props.logOut
 */
function Menu(props) {
  const navigate = useNavigate()
  const user = useSelector(
    /** @param {import("./store/index").RootState} state */
    (state) => state.user
  )

  const style = {
    marginLeft: "1rem",
    display: "flex",
    alignContent: "flex-start",
    justifyContent: "flex-start",
    alignItems: "center",
    columnGap: "1rem",
  }
  return (
    <>
      <div style={style}>
        <NavLink to="/blogs">blogs</NavLink>
        <NavLink to="/users">users</NavLink>
        <p>{user.name} logged in</p>
        <button onClick={props.logOut}>Log Out</button>
      </div>
      {props.children}
    </>
  )
}

export default Menu
