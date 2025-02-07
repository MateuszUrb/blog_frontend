import PropTypes from "prop-types";
import { useImperativeHandle } from "react";
import { forwardRef, useState } from "react";

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
    const [visable, setVisable] = useState(false);

    const hiddenWhenVisable = { display: visable ? "" : "none" };
    const showWhenVisable = { display: visable ? "none" : "" };

    /**
     * @returns {void} - fn return undefined
     */
    function toggleVisibility() {
      setVisable(!visable);
    }

    useImperativeHandle(ref, () => {
      return {
        toggleVisibility,
      };
    });

    return (
      <div>
        <div style={showWhenVisable}>
          <button onClick={toggleVisibility}>{props.buttonLabel}</button>
        </div>
        <div style={hiddenWhenVisable}>
          {props.children}

          <button onClick={toggleVisibility}>cancel</button>
        </div>
      </div>
    );
  },
);

Togglable.displayName = "Togglable";
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
