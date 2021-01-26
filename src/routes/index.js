import React from 'react';

import async from '../components/Async';

import {Sliders} from 'react-feather';

// Home
const Welcome = async(() => import('../pages/pages/Welcome'));

// Dashboard components
const Events = async(() => import('../pages/dashboard/Events'));
const MyProfile = async(() => import('../components/MyProfile'));

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
  children: [
    {
      path: '/dashboard/events',
      name: 'Events',
      component: Events
    },
    {
      path: '/dashboard/profile',
      name: 'Profile',
      component: MyProfile
    },
  ],
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
