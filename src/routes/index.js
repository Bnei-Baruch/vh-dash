import React from "react";

import {Sliders} from "react-feather";

const dashboardsRoutes = {
  id: "Dashboard",
  path: "/dashboard",
  icon: <Sliders/>,
  containsHome: true,
  children: [
  ],
  component: null
};

// Routes using the Dashboard layout
export const dashboardLayoutRoutes = [
  dashboardsRoutes
];

// Routes visible in the sidebar
export const sidebarRoutes = [
  dashboardsRoutes
];
