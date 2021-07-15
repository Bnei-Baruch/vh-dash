import React from 'react';

import { FileText, Sliders, Youtube } from 'react-feather';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import async from '../components/Async';
import { DASHBOARD_ROUTES } from './dashboardRoutes';

// Home
const Home = async(() => import('../pages/dashboard/Home'));

// Dashboard components
const MyProfile = async(() => import('../components/MyProfile'));
const Archive = async(() => import('../components/Archive'));
const ArvutSystem = async(() => import('../components/ArvutSystem'));
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
    path: DASHBOARD_ROUTES.broadcastArea,
    id: 'BroadcastArea',
    icon: <Youtube />,
    enableHeader: true,
    breadcrumbs: [{ name: 'BroadcastArea', path: DASHBOARD_ROUTES.broadcastArea }],
    component: BroadcastArea,
    children: null,
  },
  {
    path: DASHBOARD_ROUTES.arvutSystem,
    id: 'ArvutSystem',
    icon: <ViewComfyIcon />,
    enableHeader: true,
    breadcrumbs: [{ name: 'BroadcastArea', path: DASHBOARD_ROUTES.arvutSystem }],
    component: ArvutSystem,
    children: null,
  },
  {
    path: DASHBOARD_ROUTES.archive,
    id: 'Archive',
    icon: <FolderOpenIcon />,
    enableHeader: true,
    breadcrumbs: [{ name: 'BroadcastArea', path: DASHBOARD_ROUTES.archive }],
    component: Archive,
    children: null,
  }
];

// Routes using the Dashboard layout
export const dashboardLayoutRoutes = [...dashboardRoutes];

// Routes visible in the sidebar
export const sidebarRoutes = [...dashboardRoutes];
