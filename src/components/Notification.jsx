import { useState, useEffect } from "react";
import "./notification.css"; // External CSS file

/**
 * @param {object} props - The properties object.
 * @param {string} props.message - The notification message to display.
 * @param {'success'|'error' } props.type - The type of the notification (e.g., "success", "error").
 * @returns {React.JSX.Element | null} The rendered notification component.
 */
const Notification = ({ message, type }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  const notificationClass =
    type === "error" ? "notification error" : "notification success";

  if (!isVisible || !message) return null;

  return (
    <div className={notificationClass}>
      <p>{message}</p>
      <button className="dismiss-btn" onClick={() => setIsVisible(false)}>
        ✕
      </button>
    </div>
  );
};

export default Notification;
