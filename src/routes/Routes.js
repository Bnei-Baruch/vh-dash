import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { dashboardLayoutRoutes } from "./index";

import DashboardLayout from "../layouts/Dashboard";
import Page404 from "../pages/auth/Page404";
import Auth from "../config/Auth";
import { setPageTitle } from "../redux/actions/layoutActions";

// Component to set page title in Redux
const PageTitleSetter = ({ name }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (name) {
      const pageTitleText = t(`Dashboard.${name}.title`);
      dispatch(setPageTitle(pageTitleText));
    }
    return () => {
      dispatch(setPageTitle(""));
    };
  }, [dispatch, name, t]);

  return null;
};

const childRoutes = (Layout, routes) =>
  routes.map(
    (
      { children, path, id, enableHeader, component: Component },
      index
    ) =>
      children ? (
        // Route item with children
        children.map(
          (
            { path, id, enableHeader, component: Component },
            index
          ) => (
            <Route
              key={index}
              path={path}
              exact
              render={(props) => (
                <Layout>
                  {enableHeader && <PageTitleSetter name={id} />}
                  <Component {...props} />
                </Layout>
              )}
            />
          )
        )
      ) : (
        // Route item without children
        <Route
          key={index}
          path={path}
          exact
          render={(props) => (
            <Layout>
              {enableHeader && <PageTitleSetter name={id} />}
              <Component {...props} />
            </Layout>
          )}
        />
      )
  );
  
const Routes = () => {
  return <Router>
    <Switch>
      {childRoutes(DashboardLayout, dashboardLayoutRoutes)}
      <Redirect to="/dash" />
      <Route
        render={() => (
          <Auth>
            <Page404 />
          </Auth>
        )}
      />
    </Switch>
  </Router>
};

export default Routes;
