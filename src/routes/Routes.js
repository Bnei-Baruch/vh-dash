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
import DashboardHeader from "../pages/dashboard/Home/DashboardHeader";
import Auth from "../config/Auth";

const childRoutes = (Layout, routes) =>
  routes.map(
    (
      { children, path, id, breadcrumbs, enableHeader, component: Component },
      index
    ) =>
      children ? (
        // Route item with children
        children.map(
          (
            { path, id, enableHeader, breadcrumbs, component: Component },
            index
          ) => (
            <Route
              key={index}
              path={path}
              exact
              render={(props) => (
                <Layout>
                  {enableHeader && (
                    <DashboardHeader name={id} breadcrumbs={breadcrumbs} />
                  )}
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
              {enableHeader && (
                <DashboardHeader name={id} breadcrumbs={breadcrumbs} />
              )}
              <Component {...props} />
            </Layout>
          )}
        />
      )
  );
const Routes = () => {
  return <Router>
    <Switch>
      {childRoutes( DashboardLayout, dashboardLayoutRoutes)}
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
