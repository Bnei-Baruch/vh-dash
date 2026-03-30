import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import log from "loglevel";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./i18n";
import App from "./App";
import "./index.css";

import store from "./redux/store/index";

log.setLevel(process.env.NODE_ENV === "production" ? "info" : "debug");

ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById("root")
);
