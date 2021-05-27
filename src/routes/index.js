import React from 'react';

import { FileText, Sliders, User, Youtube } from 'react-feather';

import async from '../components/Async';
import { DASHBOARD_ROUTES } from './dashboardRoutes';

// Home
const Home = async(() => import('../pages/dashboard/Home'));

// Dashboard components
const MyProfile = async(() => import('../components/MyProfile'));
const MyPayments = async(() => import('../components/MyPayments'));
const BroadcastArea = async(() => import('../components/BroadcastArea'));

const dashboardRoutes = [
  {
    id: 'Dashboard',
    path: '/dash',
    icon: <Sliders />,
    containsHome: true,
    children: null,
    component: Home,
  },
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
    path: DASHBOARD_ROUTES.Payments,
    id: 'Payments',
    icon: <User />,
    enableHeader: true,
    breadcrumbs: [{ name: 'Payments', path: DASHBOARD_ROUTES.Payments }],
    component: MyPayments,
    children: null,
  },
  {
    path: DASHBOARD_ROUTES.broadcastArea,
    id: 'BroadcastArea',
    icon: <Youtube />,
    enableHeader: true,
    breadcrumbs: [{ name: 'BroadcastArea', path: DASHBOARD_ROUTES.broadcastArea }],
    component: BroadcastArea,
    children: null,
  },
];

// Routes using the Dashboard layout
export const dashboardLayoutRoutes = [...dashboardRoutes];

// Routes visible in the sidebar
export const sidebarRoutes = [...dashboardRoutes];
