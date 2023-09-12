import React from "react";

import { FileText, Sliders, Youtube } from "react-feather";
import ViewComfyIcon from "@material-ui/icons/ViewComfy";
import FolderOpenIcon from "@material-ui/icons/FolderOpen";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import EventIcon from "@material-ui/icons/Event";
// import HelpIcon from "@material-ui/icons/Help";
import { isMembershipV2 } from "../config/keycloak-config"
import async from "../components/Async";
import { DASHBOARD_ROUTES } from "./dashboardRoutes";
import { ARCHIVE_LINK, ARVUT_SYSTEM_URL } from "../constants/common";

// Home
const Home = async(() => import("../pages/dashboard/Home"));

// Dashboard components
const MyProfile = async(() => import("../pages/dashboard/MyProfile"));
const Archive = async(() => import("../pages/dashboard/Archive"));
const ArvutSystem = async(() => import("../pages/dashboard/ArvutSystem"));
const BroadcastArea = async(() => import("../pages/dashboard/BroadcastArea"));
const Events = async(() => import("../pages/dashboard/Events/Events"));

if (isMembershipV2) {
  var MembershipStatus = async(() =>
    import("../pages/dashboard/MembershipV2/MembershipStatus"));
  var PreviousPayments = async(() =>
    import("../pages/dashboard/MembershipV2/PreviousPayments"));
}
else {
  var MembershipStatus = async(() =>
    import("../pages/dashboard/Membership/Status"));
  var PreviousPayments = async(() =>
    import("../pages/dashboard/Membership/PreviousPayments"));
}

const dashboardRoutes = [
  {
    id: "Dashboard",
    path: "/dash",
    icon: <Sliders />,
    containsHome: true,
    children: null,
    component: Home,
  },
  {
    path: DASHBOARD_ROUTES.Profile,
    id: "Profile",
    icon: <FileText />,
    enableHeader: true,
    breadcrumbs: [{ name: "Profile", path: DASHBOARD_ROUTES.Profile }],
    component: MyProfile,
    children: null,
  },
  {
    path: DASHBOARD_ROUTES.membership,
    id: "Membership",
    icon: <VerifiedUserIcon />,
    enableHeader: true,
    breadcrumbs: [{ name: "Membership", path: DASHBOARD_ROUTES.membership }],
    component: MembershipStatus,
    children: [
      {
        path: DASHBOARD_ROUTES.membership,
        id: "Status",
        icon: <VerifiedUserIcon />,
        enableHeader: true,
        breadcrumbs: [
          { name: "Membership", path: DASHBOARD_ROUTES.membership },
          { name: "Status", path: DASHBOARD_ROUTES.Profile },
        ],
        component: MembershipStatus,
      },
      {
        path: DASHBOARD_ROUTES.previousPayment,
        id: "PreviousPayment",
        icon: <VerifiedUserIcon />,
        enableHeader: true,
        breadcrumbs: [
          { name: "Membership", path: DASHBOARD_ROUTES.membership },
          { name: "PreviousPayment", path: DASHBOARD_ROUTES.previousPayment },
        ],
        component: PreviousPayments,
      },
    ],
  },
  {
    path: DASHBOARD_ROUTES.events,
    id: "Events",
    icon: <EventIcon />,
    enableHeader: true,
    breadcrumbs: [{ name: "Events", path: DASHBOARD_ROUTES.events }],
    component: Events,
  },
  {
    path: DASHBOARD_ROUTES.broadcastArea,
    id: "BroadcastArea",
    icon: <Youtube />,
    enableHeader: true,
    breadcrumbs: [
      { name: "BroadcastArea", path: DASHBOARD_ROUTES.broadcastArea },
    ],
    component: BroadcastArea,
    children: null,
  },
  {
    path: ARVUT_SYSTEM_URL,
    id: "ArvutSystem",
    icon: <ViewComfyIcon />,
    enableHeader: true,
    breadcrumbs: [
      { name: "BroadcastArea", path: DASHBOARD_ROUTES.arvutSystem },
    ],
    component: ArvutSystem,
    children: null,
    isExternalLink: true,
  },
  {
    path: ARCHIVE_LINK,
    id: "Archive",
    icon: <FolderOpenIcon />,
    enableHeader: true,
    breadcrumbs: [{ name: "BroadcastArea", path: DASHBOARD_ROUTES.archive }],
    component: Archive,
    children: null,
    isExternalLink: true,
  },
  // {
  //   path: window.APP_CONFIG.VH_BASE_URL + BB_HELP_LINK,
  //   id: "Help",
  //   icon: <HelpIcon />,
  //   enableHeader: true,
  //   component: Archive,
  //   children: null,
  //   isExternalLink: true,
  // },
];

// Routes using the Dashboard layout
export const dashboardLayoutRoutes = [...dashboardRoutes];

// Routes visible in the sidebar
export const sidebarRoutes = [...dashboardRoutes];
