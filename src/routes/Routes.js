import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { useTranslation } from "react-i18next";

import { dashboardLayoutRoutes } from "./index";
import DashboardLayout from "../layouts/Dashboard";
import Page404 from "../pages/auth/Page404";
import Auth from "../config/Auth";

const RoutedPage = ({
  Layout,
  Component,
  enableHeader,
  id,
  routeProps,
}) => {
  const { t } = useTranslation();

  const pageTitle =
    enableHeader && id ? t(`Dashboard.${id}.title`) : "";

  return (
    <Layout pageTitle={pageTitle}>
      <Component {...routeProps} />
    </Layout>
  );
};

const renderRoute = (Layout, route) => {
  const { path, id, enableHeader, component: Component } = route;

  if (!Component) return null;

  return (
    <Route
      key={path}
      path={path}
      exact
      render={(routeProps) => (
        <RoutedPage
          Layout={Layout}
          Component={Component}
          enableHeader={enableHeader}
          id={id}
          routeProps={routeProps}
        />
      )}
    />
  );
};


const renderRoutes = (Layout, routes) =>
  routes.flatMap((route) =>
    route.children
      ? route.children.map((child) => renderRoute(Layout, child))
      : renderRoute(Layout, route)
  );

const Routes = () => {
  return (
    <Router>
      <Switch>
        {renderRoutes(DashboardLayout, dashboardLayoutRoutes)}
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
  );
};

export default Routes;
