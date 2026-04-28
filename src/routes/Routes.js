import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import { dashboardLayoutRoutes } from "./index";
import DashboardLayout from "../layouts/Dashboard";
import Page404 from "../pages/auth/Page404";
import Auth from "../config/Auth";
import DashboardPageLayout from "./DashboardPageLayout";

const renderRoute = (Layout, route) => {
  const { path, id, enableHeader, component: Component } = route;

  if (!Component) return null;

  return (
    <Route
      key={path}
      path={path}
      exact
      render={(props) => (
        <DashboardPageLayout
          Layout={Layout}
          Component={Component}
          routeId={id}
          enableHeader={enableHeader}
          routeProps={props}
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
