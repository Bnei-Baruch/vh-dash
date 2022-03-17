import React, { useState } from "react";
import styled from "styled-components";
import { darken, rgba } from "polished";
import { useTranslation } from "react-i18next";
import { NavLink as RouterNavLink, withRouter } from "react-router-dom";
import LogoImage from "../asset/logo/logo.svg";
import PerfectScrollbar from "react-perfect-scrollbar";
import "../vendor/perfect-scrollbar.css";

import { spacing } from "@material-ui/system";

import {
  Avatar,
  Box as MuiBox,
  Chip,
  Collapse,
  Drawer as MuiDrawer,
  List as MuiList,
  ListItem,
  ListItemText,
} from "@material-ui/core";

import { ExpandLess, ExpandMore } from "@material-ui/icons";

import { sidebarRoutes as routes } from "../routes/index";
import { DASHBOARD_ROOT } from "../routes/dashboardRoutes";

const NavLink = React.forwardRef((props, ref) => (
  <RouterNavLink innerRef={ref} {...props} />
));

const Box = styled(MuiBox)(spacing);
const Logo = styled(Avatar)`
  height: auto !important;
  width: auto !important;
`;
const Drawer = styled(MuiDrawer)`
  border-right: 0;

  > div {
    border-right: 0;
  }
`;
const ExternalLink = styled.a`
  text-decoration: none;
  &:hover {
    text-decoration: none;
  }
`;
const Scrollbar = styled(PerfectScrollbar)`
  background-color: ${(props) => props.theme.sidebar.background};
  border-right: 1px solid rgba(0, 0, 0, 0.12);
`;

const List = styled(MuiList)`
  background-color: ${(props) => props.theme.sidebar.background};
`;

const Items = styled.div`
  padding-top: ${(props) => props.theme.spacing(2.5)}px;
  padding-bottom: ${(props) => props.theme.spacing(2.5)}px;
`;

const Brand = styled(ListItem)`
  font-size: ${(props) => props.theme.typography.h5.fontSize};
  font-weight: ${(props) => props.theme.typography.fontWeightMedium};
  color: ${(props) => props.theme.sidebar.header.color};
  background-color: ${(props) => props.theme.sidebar.header.background};
  font-family: ${(props) => props.theme.typography.fontFamily};
  min-height: 56px;
  padding-left: ${(props) => props.theme.spacing(6)}px;
  padding-right: ${(props) => props.theme.spacing(6)}px;
  cursor: default;

  ${(props) => props.theme.breakpoints.up("sm")} {
    min-height: 64px;
  }

  &:hover {
    background-color: ${(props) => props.theme.sidebar.header.background};
  }

  a {
    padding: 0;
  }
`;

const Category = styled(ListItem)`
  padding-top: ${(props) => props.theme.spacing(3)}px;
  padding-bottom: ${(props) => props.theme.spacing(3)}px;
  padding-left: ${(props) => props.theme.spacing(6)}px;
  padding-right: ${(props) => props.theme.spacing(5)}px;
  font-weight: ${(props) => props.theme.typography.fontWeightRegular};

  svg {
    color: ${(props) => props.theme.sidebar.color};
    font-size: 20px;
    width: 20px;
    height: 20px;
    opacity: 0.5;
  }

  &:hover {
    background: rgba(0, 0, 0, 0.08);
  }

  &.${(props) => props.activeClassName} {
    background-color: ${(props) =>
      darken(0.05, props.theme.sidebar.background)};

    span {
      color: ${(props) => props.theme.sidebar.color};
    }
  }
`;

const CategoryText = styled(ListItemText)`
  margin: 0;

  span {
    color: ${(props) => props.theme.sidebar.color};
    font-size: ${(props) => props.theme.typography.body1.fontSize}px;
    font-weight: ${(props) => props.theme.sidebar.category.fontWeight};
    padding: 0 ${(props) => props.theme.spacing(4)}px;
  }
`;

const CategoryIconLess = styled(ExpandLess)`
  color: ${(props) => rgba(props.theme.sidebar.color, 0.5)};
`;

const CategoryIconMore = styled(ExpandMore)`
  color: ${(props) => rgba(props.theme.sidebar.color, 0.5)};
`;

const Subtitle = styled.div`
  color: #4aa5ff;
  font-size: 12px;
`;

const Link = styled(ListItem)`
  padding-left: ${(props) => props.theme.spacing(15)}px;
  padding-top: ${(props) => props.theme.spacing(2)}px;
  padding-bottom: ${(props) => props.theme.spacing(2)}px;
  margin-left: ${(props) => props.marginleft};

  span {
    color: ${(props) => rgba(props.theme.sidebar.color, 0.7)};
  }

  &:hover span {
    color: ${(props) => rgba(props.theme.sidebar.color, 0.9)};
  }

  &.${(props) => props.activeClassName} {
    background-color: ${(props) =>
      darken(0.06, props.theme.sidebar.background)};

    span {
      color: ${(props) => props.theme.sidebar.color};
    }
  }
`;

const LinkText = styled(ListItemText)`
  color: ${(props) => props.theme.sidebar.color};
  margin-left: 35px;
  span {
    font-size: ${(props) => props.theme.typography.body1.fontSize}px;
  }

  margin-top: 0;
  margin-bottom: 0;
`;

const LinkBadge = styled(Chip)`
  font-size: 11px;
  font-weight: ${(props) => props.theme.typography.fontWeightBold};
  height: 20px;
  position: absolute;
  right: 12px;
  top: 8px;
  background: ${(props) => props.theme.sidebar.badge.background};

  span.MuiChip-label,
  span.MuiChip-label:hover {
    cursor: pointer;
    color: ${(props) => props.theme.sidebar.badge.color};
    padding-left: ${(props) => props.theme.spacing(2)}px;
    padding-right: ${(props) => props.theme.spacing(2)}px;
  }
`;

const CategoryBadge = styled(LinkBadge)`
  top: 12px;
`;

const SidebarCategory = ({
  name,
  icon,
  classes,
  isOpen,
  isCollapsable,
  badge,
  ...rest
}) => (
  <Category {...rest}>
    {icon}
    <CategoryText>{name}</CategoryText>
    {isCollapsable ? (
      isOpen ? (
        <CategoryIconMore />
      ) : (
        <CategoryIconLess />
      )
    ) : null}
    {badge ? <CategoryBadge label={badge} /> : ""}
  </Category>
);

const SidebarLink = ({ name, to, badge }) => (
  <Link button dense component={NavLink} exact to={to} activeClassName="active">
    <LinkText>{name}</LinkText>
    {badge ? <LinkBadge label={badge} /> : ""}
  </Link>
);

const Sidebar = ({ classes, staticContext, location, ...rest }) => {
  const { t } = useTranslation();

  const initOpenRoutes = () => {
    /* Open collapse element that matches current url */
    const pathName = location.pathname;

    let _routes = {};

    routes.forEach((route, index) => {
      const isActive = pathName.indexOf(route.path) === 0;
      const isOpen = route.open;
      const isHome = route.containsHome && pathName === "/";

      _routes = { ..._routes, [index]: isActive || isOpen || isHome };
    });

    return _routes;
  };

  const [openRoutes, setOpenRoutes] = useState(() => initOpenRoutes());

  const toggle = (index) => {
    // Collapse all elements
    Object.keys(openRoutes).forEach(
      (item) =>
        openRoutes[index] ||
        setOpenRoutes((openRoutes) => ({ ...openRoutes, [item]: false }))
    );

    // Toggle selected element
    setOpenRoutes((openRoutes) => ({
      ...openRoutes,
      [index]: !openRoutes[index],
    }));
  };

  return (
    <Drawer variant="permanent" {...rest}>
      <Brand>
        <Link button component={NavLink} exact to={DASHBOARD_ROOT}>
          <Logo alt="Logo" src={LogoImage} />
          <Box ml={1}>
            <b>BNEI BARUCH</b>
            <Subtitle>VIRTUAL HOME</Subtitle>
          </Box>
        </Link>
      </Brand>
      <Scrollbar>
        <List disablePadding>
          <Items>
            {routes.map((category, index) => (
              <React.Fragment key={index}>
                {category.children ? (
                  <React.Fragment key={index}>
                    <SidebarCategory
                      isOpen={!openRoutes[index]}
                      isCollapsable
                      name={t(`${category.id}.name`)}
                      icon={category.icon}
                      button
                      onClick={() => toggle(index)}
                    />

                    <Collapse
                      in={openRoutes[index]}
                      timeout="auto"
                      unmountOnExit
                    >
                      {category.children.map((route, index) => (
                        <SidebarLink
                          key={index}
                          name={t(`Dashboard.${route.id}.name`)}
                          to={route.path}
                          icon={route.icon}
                          badge={route.badge}
                        />
                      ))}
                    </Collapse>
                  </React.Fragment>
                ) : category.isExternalLink ? (
                  <ExternalLink href={category.path} target="_blank">
                    <Category>
                      {category.icon}
                      <CategoryText>
                        {t(`Dashboard.${category.id}.name`)}
                      </CategoryText>
                    </Category>
                  </ExternalLink>
                ) : (
                  <SidebarCategory
                    isCollapsable={false}
                    name={t(`Dashboard.${category.id}.name`)}
                    to={category.path}
                    activeClassName="active"
                    component={NavLink}
                    icon={category.icon}
                    exact
                    badge={category.badge}
                  />
                )}
              </React.Fragment>
            ))}
          </Items>
        </List>
      </Scrollbar>
    </Drawer>
  );
};

export default withRouter(Sidebar);
