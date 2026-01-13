import React, { useState } from "react";
import styled, { withTheme } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { darken } from "polished";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import _ from "lodash";
import { Bell, MessageSquare, Search as SearchIcon } from "react-feather";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import LanguageIcon from "@material-ui/icons/Language";
import {
  Badge,
  Grid,
  Hidden,
  InputBase,
  Menu,
  MenuItem,
  AppBar as MuiAppBar,
  IconButton as MuiIconButton,
  Toolbar,
  Typography,
  Box,
} from "@material-ui/core";

import { Menu as MenuIcon } from "@material-ui/icons";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { CHAT_AND_NOTIFICATION_ICONS, SEARCH_BAR } from "../shared/constants";
import { setSettings } from "../redux/actions/settingsActions";
import { setLoggedInUser } from "../redux/actions/userActions";
import ModalWindow from "../pages/dashboard/MyProfile/ui/ModalWindow";
import { DASHBOARD_ROUTES } from "../routes/dashboardRoutes";
import { membershipDataV2 } from "../redux/selectors/user";
import { usePageTitle } from "../contexts/PageTitleContext";

/* ---------- styled ---------- */

const AppBar = styled(MuiAppBar)`
  background: ${(props) => props.theme.header.background};
  color: ${(props) => props.theme.header.color};
  border-bottom: 1px solid ${(props) => props.theme.palette.divider};

`;

const StyledToolbar = styled(Toolbar)`
  min-height: 72px !important;
  height: 72px !important;
  padding-top: 2px !important;
`;

const IconButton = styled(MuiIconButton)`
  svg {
    width: 22px;
    height: 22px;
  }
`;

const MembershipStatusContainer = styled(Box)`
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  margin-inline-end: 12px;
  padding: 6px 14px;
  border-radius: 999px;

  background-color: ${({ active }) =>
    active ? "#EAF9F0" : "#FDECEC"};

  border: 1px solid
    ${({ active }) =>
      active ? "#BDEBD0" : "#F5B5B5"};

  /* Hide membership pill on screens smaller than xs (600px) */
  ${(props) => props.theme.breakpoints.down("xs")} {
    display: none;
  }
`;

const MembershipStatusText = styled(Typography)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  
  font-size: 14px;
  font-weight: 600;

  color: ${({ active }) =>
    active ? "#2E7D5A" : "#C62828"};

  svg {
    width: 8px;
    height: 8px;
    color: ${({ active }) =>
      active ? "#2E7D5A" : "#C62828"};
  }

  /* RTL / LTR */
  direction: inherit;
`;

const FlagButton = styled(MuiIconButton)`
  svg {
    width: 30px;
    height: 30px;
  }
  span {
    color: #747474;
    font-size: 14px;
  }
  :hover {
    background-color: transparent !important;
  }

  /* Hide language text on screens smaller than sm (600px) */
  ${(props) => props.theme.breakpoints.down("sm")} {
    .language-text {
      display: none;
    }
  }

  /* Reduce padding on screens smaller than xs (600px) */
  ${(props) => props.theme.breakpoints.down("xs")} {
    padding: 6px !important;
  }
`;

const UserIconButton = styled(MuiIconButton)`
  font-size: 16px !important;
  &:hover {
    border-radius: 10px !important;
  }
  span,
  label {
    color: #5a5a5a;
  }
  svg {
    width: 30px;
    height: 30px;
  }

  /* Hide user name on screens smaller than sm (600px) */
  ${(props) => props.theme.breakpoints.down("sm")} {
    .user-name {
      display: none;
    }
  }

  /* Change icon color and reduce padding on screens smaller than xs (600px) */
  ${(props) => props.theme.breakpoints.down("xs")} {
    padding: 6px !important;
    svg {
      color: ${({ membershipActive }) =>
        membershipActive ? "#2E7D5A" : "#C24A4A"};
    }
  }
`;

const Indicator = styled(Badge)`
  .MuiBadge-badge {
    background: ${(props) => props.theme.header.indicator.background};
    color: ${(props) => props.theme.palette.common.white};
  }
`;

const Search = styled.div`
  border-radius: 2px;
  background-color: ${(props) => props.theme.header.background};
  display: none;
  position: relative;

  &:hover {
    background-color: ${(props) =>
      darken(0.05, props.theme.header.background)};
  }

  ${(props) => props.theme.breakpoints.up("md")} {
    display: block;
  }
`;

const SearchIconWrapper = styled.div`
  width: 50px;
  height: 100%;
  position: absolute;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Input = styled(InputBase)`
  > input {
    color: ${(props) => props.theme.header.search.color};
    padding: ${(props) => props.theme.spacing(2.5)}px;
    padding-left: ${(props) => props.theme.spacing(12)}px;
    width: 160px;
  }
`;

const VerticalDivider = styled.span`
  display: inline-block;
  width: 1px;
  height: 24px;
  background-color: ${(props) => props.theme.palette.divider};
  vertical-align: middle;

   ${(props) => props.theme.breakpoints.down("xs")} {
    display: none;
  }
`;

const PageTitle = styled(Typography)`
  font-size: 1.25rem; 
  font-weight: 600;
  color: #333;
  margin-inline-start: 16px;
  margin-inline-end: 16px;

  ${(props) => props.theme.breakpoints.down("md")} {
    font-size: 1.125rem; 
  }
`;

const StartSection = styled(Box)`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const EndSection = styled(Box)`
  display: flex;
  align-items: center;
  gap: 8px;

  ${(props) => props.theme.breakpoints.down("md")} {
    gap: 4px;
  }
`;

/* ---------- LanguageMenu ---------- */

const languages = [
  { code: "en", name: "English" },
  { code: "ru", name: "Russian" },
  { code: "he", name: "Hebrew" },
  { code: "es", name: "Spanish" },
];

function LanguageMenu() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const [anchorMenu, setAnchorMenu] = useState(null);

  const closeMenu = (lng) => {
    setAnchorMenu(null);
    if (_.isString(lng)) {
      dispatch(setSettings({ language: lng }));
      i18n.changeLanguage(lng);
    }
  };

  return (
    <>
      <FlagButton onClick={(e) => setAnchorMenu(e.currentTarget)}>
        <LanguageIcon />
        <span className="language-text">{i18next.language?.toUpperCase()}</span>
      </FlagButton>
      <Menu anchorEl={anchorMenu} open={Boolean(anchorMenu)} onClose={() => closeMenu()}>
        {languages.map((l) => (
          <MenuItem key={l.code} onClick={() => closeMenu(l.code)}>
            {t(`Languages.${l.name}`)}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

/* ---------- UserMenu ---------- */

function UserMenu() {
  const { t } = useTranslation();
  const state = useSelector((state) => state.userReducer.info);
  const membership = useSelector((state) => membershipDataV2(state));
  const membershipActive = membership?.active || false;
  const dispatch = useDispatch();
  const history = useHistory();

  const [anchorMenu, setAnchorMenu] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <UserIconButton 
        onClick={(e) => setAnchorMenu(e.currentTarget)}
        membershipActive={membershipActive}
      >
        <AccountCircleIcon />
        <span className="user-name">
          {state.keycloak.profile.firstName} {state.keycloak.profile.lastName}
        </span>
        <KeyboardArrowDownIcon className="user-arrow" />
      </UserIconButton>

      <Menu anchorEl={anchorMenu} open={Boolean(anchorMenu)} onClose={() => setAnchorMenu(null)}>
        <MenuItem onClick={() => history.push(DASHBOARD_ROUTES.Profile)}>
          {t("Dashboard.Profile.name")}
        </MenuItem>
        <MenuItem onClick={() => setIsModalOpen(true)}>
          {t("UserMenu.logOut")}
        </MenuItem>
      </Menu>

      <ModalWindow
        open={isModalOpen}
        contentText={t("UserMenu.logOutText")}
        confirmBtnText={t("UserMenu.yesBtn")}
        closeBtnText={t("UserMenu.cancelBtn")}
        handleClose={() => setIsModalOpen(false)}
        onConfirmation={() => {
          state.keycloak.logout();
          dispatch(setLoggedInUser(null));
        }}
      />
    </>
  );
}

/* ---------- Header ---------- */

const Header = ({ onDrawerToggle }) => {
  const history = useHistory();
  const { t } = useTranslation();
  const membership = useSelector((state) => membershipDataV2(state));
  const active = membership?.active || false;
  const { title: currentPageTitle } = usePageTitle();
  return (
    <AppBar position="sticky" elevation={0}>
      <StyledToolbar>
        <Grid container alignItems="center" wrap="nowrap">
          <StartSection>
            <Hidden mdUp>
              <IconButton onClick={onDrawerToggle}>
                <MenuIcon />
              </IconButton>
            </Hidden>

            {currentPageTitle && (
              <PageTitle>{currentPageTitle}</PageTitle>
            )}
          </StartSection>

          {SEARCH_BAR && (
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <Input placeholder="Search topics" />
              </Search>
          )}
          
          {/* spacer */}
          <Grid item xs />
  
          <EndSection>
            {CHAT_AND_NOTIFICATION_ICONS && (
                <>
                  <IconButton>
                    <Indicator badgeContent={3}>
                      <MessageSquare />
                    </Indicator>
                  </IconButton>
                  <IconButton>
                    <Indicator badgeContent={7}>
                      <Bell />
                    </Indicator>
                  </IconButton>
                </>
              )}  

            <MembershipStatusContainer
              active={active}
              onClick={() => history.push(DASHBOARD_ROUTES.membership)}
            >
              <MembershipStatusText active={active}>
                <FiberManualRecordIcon />
                {`${t("Membership.myMembership")} ${
                  active
                    ? t("Membership.active")
                    : t("Membership.inactive")
                }`}
              </MembershipStatusText>
            </MembershipStatusContainer>

            <VerticalDivider />
            <LanguageMenu />
            <UserMenu />
          </EndSection>
        </Grid>
      </StyledToolbar>
    </AppBar>
  );
};

export default withTheme(Header);
