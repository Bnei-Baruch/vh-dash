import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { FlagProvider } from '@unleash/proxy-client-react';
import "./i18n";
import App from "./App";
import "./index.css";

import store from "./redux/store/index";
const config = {
  url: window.APP_CONFIG.VH_FLAG_URL, // Your front-end API URL or the Unleash proxy's URL (https://<proxy-url>/proxy)
  clientKey: window.APP_CONFIG.VH_FLAG_CLIENT_KEY, // A client-side API token OR one of your proxy's designated client keys (previously known as proxy secrets)
  refreshInterval: 15, // How often (in seconds) the client should poll the proxy for updates
  appName: window.APP_CONFIG.VH_FLAG_APP_NAME, // The name of your application. It's only used for identifying your application
};
ReactDOM.render(
  <Provider store={store}>
    <FlagProvider config={config}>
      <App />
    </FlagProvider>
  </Provider>,
  document.getElementById("root")
);
