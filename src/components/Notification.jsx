import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import "./notification.css"

/**
 * @returns {React.JSX.Element | null} The rendered notification component.
 */
const Notification = () => {
  const notification = useSelector(
    /**
     * @param {import("../store/index").RootState} state
     */
    (state) => state.notification
  )
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(false)
    }, 5000)

    return () => clearTimeout(timeout)
  }, [])

  const notificationClass =
    notification.type === "error"
      ? "notification error"
      : "notification success"

  if (!isVisible || !notification.message) return null

  return (
    <div className={notificationClass}>
      <p>{notification.message}</p>
      <button className="dismiss-btn" onClick={() => setIsVisible(false)}>
        ✕
      </button>
    </div>
  )
}

export default Notification
