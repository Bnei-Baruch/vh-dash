import React from 'react';

import async from '../components/Async';

import {Sliders} from 'react-feather';

const Blank = async(() => import("../pages/pages/Blank"));

const homeRoutes = {
  id: 'Blank',
  path: '/',
  header: 'Blank',
  component: Blank,
  children: null
};

const dashboardsRoutes = {
  id: 'Dashboard',
  path: '/dashboard',
  icon: <Sliders/>,
  containsHome: true,
  children: [],
  component: null
};

// Routes using the Dashboard layout
export const dashboardLayoutRoutes = [
  homeRoutes,
  dashboardsRoutes
];

// Routes visible in the sidebar
export const sidebarRoutes = [
  // dashboardsRoutes
];
