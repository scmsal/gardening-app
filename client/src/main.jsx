import React from "react";
import ReactDOM from "react-dom/client";
import App1 from "./App1.jsx";
import { Provider } from "react-redux";
import store from "./store.js";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App1 />
    </Provider>
  </React.StrictMode>
);
