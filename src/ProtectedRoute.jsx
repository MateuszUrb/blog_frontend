import React from "react"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

/**
 * @param {object} props
 * @param {React.ReactElement} props.element
 * @returns {React.ReactElement}
 */
function ProtectedRoute({ element }) {
  const user = useSelector(
    /** @param {import("./store/index").RootState} state */
    (state) => state.user
  )
  return user.username ? element : <Navigate to="/login" replace />
}

export default ProtectedRoute
