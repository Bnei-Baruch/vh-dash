import React from 'react';

import async from '../components/Async';

import {Sliders} from 'react-feather';

const Welcome = async(() => import('../pages/pages/Welcome'));

const homeRoutes = {
  id: 'Welcome',
  path: '/',
  component: Welcome,
  children: null
};

const dashboardRoutes = {
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
  dashboardRoutes
];

// Routes visible in the sidebar
export const sidebarRoutes = [
  dashboardRoutes
];
