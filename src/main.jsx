import ReactDOM from "react-dom/client"
import App from "./App"
import { StrictMode } from "react"
import { BrowserRouter as Router } from "react-router-dom"
import { Provider } from "react-redux"
import store from "./store"
import "./index.css"

ReactDOM.createRoot(
  /**@type {HTMLElement} */ (document.getElementById("root"))
).render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </StrictMode>
)
