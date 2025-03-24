import PropTypes from "prop-types"
import React, { useImperativeHandle } from "react"
import { forwardRef, useState } from "react"
import style from "./togglable.module.css"

/**
 *@typedef {object} ToggleProps - parameters
 *@property {React.ReactNode} children - Html elements passed to component
 *@property {string} buttonLabel - button text
 */

const Togglable = forwardRef(
  /**
   * @param {ToggleProps} props - properties passed to component
   * @param {React.ForwardedRef<{toggleVisibility: () => void}>} ref - reference to html node
   * @returns {React.JSX.Element} - Jsx
   */
  (props, ref) => {
    const [visible, setVisible] = useState(false)

    /**
     * @returns {void} - Toggles visibility
     */
    function toggleVisibility() {
      setVisible(!visible)
    }

    useImperativeHandle(ref, () => ({
      toggleVisibility,
    }))

    return (
      <div
        className={`${style.toggleContainer} ${visible ? style.expanded : ""}`}>
        {!visible && (
          <button className={style.toggleButton} onClick={toggleVisibility}>
            {props.buttonLabel}
          </button>
        )}
        {visible && (
          <div>
            {props.children}
            <button className={style.cancelButton} onClick={toggleVisibility}>
              Cancel
            </button>
          </div>
        )}
      </div>
    )
  }
)

Togglable.displayName = "Togglable"
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

export default Togglable
