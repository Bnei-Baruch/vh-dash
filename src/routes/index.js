import React from 'react';

import async from '../components/Async';

import { Sliders } from 'react-feather';
import { DASHBOARD_ROOT, DASHBOARD_ROUTES } from './dashboardRoutes';

// Home
const Welcome = async(() => import('../pages/pages/Welcome'));

// Dashboard components
const Events = async(() => import('../pages/dashboard/Events'));
const MyProfile = async(() => import('../components/MyProfile'));
const MyAccount = async(() => import('../components/MyAccount'));

const homeRoutes = {
  id: 'Welcome',
  path: '/',
  component: Welcome,
  children: null,
};

const dashboardRoutes = {
  id: 'Dashboard',
  path: DASHBOARD_ROOT,
  icon: <Sliders />,
  containsHome: true,
  children: [
    {
      path: DASHBOARD_ROUTES.Events,
      name: 'Events',
      component: Events,
    },
    {
      path: DASHBOARD_ROUTES.Profile,
      name: 'Profile',
      enableHeader: true,
      title: 'My Profile',
      breadcrumbs: [{ name: 'Profile', path: DASHBOARD_ROUTES.Profile }],
      component: MyProfile,
    },
    {
      path: DASHBOARD_ROUTES.Account,
      name: 'Account',
      enableHeader: true,
      title: 'My Account',
      breadcrumbs: [{ name: 'Account', path: DASHBOARD_ROUTES.Account }],
      component: MyAccount,
    },
  ],
  component: null,
};

// Routes using the Dashboard layout
export const dashboardLayoutRoutes = [homeRoutes, dashboardRoutes];

// Routes visible in the sidebar
export const sidebarRoutes = [dashboardRoutes];
