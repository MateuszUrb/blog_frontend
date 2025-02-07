import ReactDOM from "react-dom/client";
import App from "./App";
import { StrictMode } from "react";

ReactDOM.createRoot(
  /**@type {HTMLElement} */ (document.getElementById("root")),
).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
