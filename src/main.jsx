import ReactDOM from "react-dom/client"
import App from "./App"
import { StrictMode } from "react"
import { BrowserRouter as Router } from "react-router-dom"
import { Provider } from "react-redux"
import store, { persistor } from "./store"
import "./index.css"
import { PersistGate } from "redux-persist/integration/react"

ReactDOM.createRoot(
  /**@type {HTMLElement} */ (document.getElementById("root"))
).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <Router>
          <App />
        </Router>
      </PersistGate>
    </Provider>
  </StrictMode>
)
