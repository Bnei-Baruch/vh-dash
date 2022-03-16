import React from "react";
import { connect } from "react-redux";
import store from "./redux/store/index";
import Helmet from "react-helmet";

import DateFnsUtils from "@date-io/date-fns";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { StylesProvider, jssPreset } from "@material-ui/styles";
import { ThemeProvider } from "styled-components";
import rtl from "jss-rtl";
import { create } from "jss";

import maTheme from "./theme";
import Routes from "./routes/Routes";
import Auth from "./config/Auth";
import { useTranslation } from "react-i18next";
import axios from "axios";

const jss = create({
  plugins: [...jssPreset().plugins, rtl()],
  insertionPoint: "jss-insertion-point",
});

/**
 * Axios interceptor for token updation
 * and appending token in api's
 */
axios.interceptors.request.use(async (c) => {
  if (c && c.url && c.url.includes("heartbeat")) {
    return c;
  }
  const state = store.getState();
  if (
    state.userReducer.keycloak &&
    state.userReducer.keycloak.isTokenExpired()
  ) {
    await state.userReducer.keycloak.updateToken(30).success();
  }
  //fetch token and pass here
  if (state.userReducer.keycloak.token) {
    let header = {
      Authorization: "Bearer " + state.userReducer.keycloak.token,
      Accept: "application/json",
    };
    c.headers = header;
  }
  return c;
});

const App = ({ theme }) => {
  const { i18n } = useTranslation();

  // Set direction on body
  document.body.setAttribute("dir", i18n.dir(i18n.language));

  return (
    <Auth>
      <Helmet
        titleTemplate="%s | Our Virtual Home"
        defaultTitle="Our Virtual Home"
      />
      <StylesProvider jss={jss}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <MuiThemeProvider
            theme={{
              ...maTheme[theme.currentTheme],
              direction: i18n.dir(i18n.language),
            }}
          >
            <ThemeProvider
              theme={{
                ...maTheme[theme.currentTheme],
                direction: i18n.dir(i18n.language),
              }}
            >
              <Routes />
            </ThemeProvider>
          </MuiThemeProvider>
        </MuiPickersUtilsProvider>
      </StylesProvider>
    </Auth>
  );
};

export default connect((store) => ({
  theme: store.themeReducer,
  token: store.userReducer.token,
}))(App);
