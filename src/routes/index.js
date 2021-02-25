import React from 'react';

import { Sliders, Youtube } from 'react-feather';

import async from '../components/Async';
import { DASHBOARD_ROUTES } from './dashboardRoutes';

// Home
const Home = async(() => import('../pages/dashboard/Home'));

// Dashboard components
// const MyProfile = async(() => import('../components/MyProfile'));
// const MyAccount = async(() => import('../components/MyAccount'));
const CongressArea = async(() => import('../components/CongressArea'));

const dashboardRoutes = [
  {
    id: 'Dashboard',
    path: '/',
    icon: <Sliders />,
    containsHome: true,
    children: null,
    component: Home,
  },
  /*
  {
    path: DASHBOARD_ROUTES.Profile,
    id: 'Profile',
    icon: <FileText />,
    enableHeader: true,
    breadcrumbs: [{ name: 'Profile', path: DASHBOARD_ROUTES.Profile }],
    component: MyProfile,
    children: null,
  },
  {
    path: DASHBOARD_ROUTES.Account,
    id: 'Account',
    icon: <User />,
    enableHeader: true,
    breadcrumbs: [{ name: 'Account', path: DASHBOARD_ROUTES.Account }],
    component: MyAccount,
    children: null,
  },*/
  {
    path: DASHBOARD_ROUTES.CongressArea,
    id: 'CongressArea',
    icon: <Youtube />,
    enableHeader: true,
    breadcrumbs: [{ name: 'CongressArea', path: DASHBOARD_ROUTES.CongressArea }],
    component: CongressArea,
    children: null,
  },
];

// Routes using the Dashboard layout
export const dashboardLayoutRoutes = [...dashboardRoutes];

// Routes visible in the sidebar
export const sidebarRoutes = [...dashboardRoutes];
