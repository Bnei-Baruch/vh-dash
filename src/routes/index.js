import async from "../components/Async";
import { DASHBOARD_ROUTES } from "./dashboardRoutes";
import { ARCHIVE_LINK, ARVUT_SYSTEM_URL, PAY_KLI_ONE_URL } from "../constants/common";

// Home
const Home = async(() => import("../pages/dashboard/Home"));

// Dashboard components
const MyProfile = async(() => import("../pages/dashboard/MyProfile"));
const Archive = async(() => import("../pages/dashboard/Archive"));
const ArvutSystem = async(() => import("../pages/dashboard/ArvutSystem"));
const BroadcastArea = async(() => import("../pages/dashboard/BroadcastArea"));
const PreviousPayments = async(() => import("../pages/dashboard/MembershipV2/PreviousPayments"));
const MembershipStatus = async(() => import("../pages/dashboard/MembershipV2/MembershipStatus"));

const dashboardRoutes = [
  {
    id: "Dashboard",
    path: "/dash",
    children: null,
    component: Home,
  },
  {
    path: DASHBOARD_ROUTES.Profile,
    id: "Profile",
    component: MyProfile,
    children: null,
  },
  {
    path: DASHBOARD_ROUTES.membership,
    id: "Membership",
    component: MembershipStatus,
    children: [
      {
        path: DASHBOARD_ROUTES.membership,
        id: "Status",
        component: MembershipStatus,
      },
      {
        path: DASHBOARD_ROUTES.previousPayment,
        id: "PreviousPayment",
        component: PreviousPayments,
      },
    ],
  },
  {
    path: "https://events.kli.one/",
    id: "Events",
    component: null,
    children: null,
  },
  {
    path: DASHBOARD_ROUTES.broadcastArea,
    id: "BroadcastArea",
    component: BroadcastArea,
    children: null,
  },
  {
    path: ARVUT_SYSTEM_URL,
    id: "ArvutSystem",
    component: ArvutSystem,
    children: null,
  },
  {
    path: ARCHIVE_LINK,
    id: "Archive",
    component: Archive,
    children: null,
  },
  {
    path: PAY_KLI_ONE_URL,
    id: "Payments",
    component: null,
    children: null,
  },
];

// Routes using the Dashboard layout
export const dashboardLayoutRoutes = [...dashboardRoutes];
