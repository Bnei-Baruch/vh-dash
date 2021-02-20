import React, { useState } from 'react';
import styled, { withTheme } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { darken } from 'polished';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';

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
} from '@material-ui/core';

import { Menu as MenuIcon } from '@material-ui/icons';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Bell, MessageSquare, Search as SearchIcon } from 'react-feather';
import { CHAT_AND_NOTIFICATION_ICONS, SEARCH_BAR } from '../shared/constants';
import { DASHBOARD_ROUTES } from '../routes/dashboardRoutes';
import { setLoggedInUser } from '../redux/actions/userActions';
import ModalWindow from './ui/ModalWindow';

const AppBar = styled(MuiAppBar)`
  background: ${props => props.theme.header.background};
  color: ${props => props.theme.header.color};
  box-shadow: ${props => props.theme.shadows[1]};
`;

const IconButton = styled(MuiIconButton)`
  svg {
    width: 22px;
    height: 22px;
  }
`;

const UserIconButton = styled(MuiIconButton)`
  svg {
    width: 30px;
    height: 30px;
  }
`;

const Indicator = styled(Badge)`
  .MuiBadge-badge {
    background: ${props => props.theme.header.indicator.background};
    color: ${props => props.theme.palette.common.white};
  }
`;

const Search = styled.div`
  border-radius: 2px;
  background-color: ${props => props.theme.header.background};
  display: none;
  position: relative;
  width: 100%;

  &:hover {
    background-color: ${props => darken(0.05, props.theme.header.background)};
  }

  ${props => props.theme.breakpoints.up('md')} {
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

  svg {
    width: 22px;
    height: 22px;
  }
`;

const Input = styled(InputBase)`
  color: inherit;
  width: 100%;

  > input {
    color: ${props => props.theme.header.search.color};
    padding-top: ${props => props.theme.spacing(2.5)}px;
    padding-right: ${props => props.theme.spacing(2.5)}px;
    padding-bottom: ${props => props.theme.spacing(2.5)}px;
    padding-left: ${props => props.theme.spacing(12)}px;
    width: 160px;
  }
`;

const Flag = styled.img`
  border-radius: 50%;
  width: 22px;
  height: 22px;
`;

const languages = [
  { code: 'en', name: 'English' },
  { code: 'ru', name: 'Russian' },
  { code: 'he', name: 'Hebrew' },
  { code: 'es', name: 'Spanish' },
];

function LanguageMenu() {
  const { t, i18n } = useTranslation();
  const [anchorMenu, setAnchorMenu] = useState(null);

  const toggleMenu = event => {
    setAnchorMenu(event.currentTarget);
  };

  const closeMenu = lng => {
    setAnchorMenu(null);
    _.isString(lng) && i18n.changeLanguage(lng);
  };

  return (
    <>
      <IconButton
        aria-owns={anchorMenu ? 'menu-appbar' : undefined}
        aria-haspopup='true'
        onClick={toggleMenu}
        color='inherit'
      >
        <Flag
          src={`/static/img/flags/${i18next.language}.png`}
          alt={i18next.language}
        />
      </IconButton>
      <Menu
        id='menu-appbar'
        anchorEl={anchorMenu}
        open={Boolean(anchorMenu)}
        onClose={closeMenu}
        style={{ maxHeight: 350 }}
      >
        {languages.map(item => (
          <MenuItem key={item.code} onClick={() => closeMenu(item.code)}>
            {t(`Languages.${item.name}`)}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

function UserMenu() {
  const { t } = useTranslation();
  const state = useSelector(state => state.userReducer.info);
  const history = useHistory();
  const dispatch = useDispatch();

  const [anchorMenu, setAnchorMenu] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleMenu = event => {
    setAnchorMenu(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorMenu(null);
  };

  const onProfileClick = () => {
    closeMenu();
    history.push(DASHBOARD_ROUTES.Profile);
  };

  const onLogOutClick = () => {
    closeMenu();
    setIsModalOpen(!isModalOpen);
  };

  const handleCloseModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  
  const onAuthLogout = () => {
    state.keycloak.logout();
    dispatch(setLoggedInUser(null));
    handleCloseModal();
  };

  return (
    <>
      <UserIconButton
        aria-owns={anchorMenu ? 'menu-appbar' : undefined}
        aria-haspopup='true'
        onClick={toggleMenu}
        color='inherit'
      >
        <AccountCircleIcon />
      </UserIconButton>
      <Menu
        id='menu-appbar'
        anchorEl={anchorMenu}
        open={Boolean(anchorMenu)}
        onClose={closeMenu}
      >
        <MenuItem onClick={onProfileClick}>{t('UserMenu.profile')}</MenuItem>
        <MenuItem onClick={onLogOutClick}>{t('UserMenu.logOut')}</MenuItem>
      </Menu>
      <ModalWindow
        open={isModalOpen}
        handleClose={handleCloseModal}
        onAuthLogout={onAuthLogout}
      />
    </>
  );
}

const Header = ({ onDrawerToggle }) => (
  <>
    <AppBar position='sticky' elevation={0}>
      <Toolbar>
        <Grid container alignItems='center'>
          <Hidden mdUp>
            <Grid item>
              <IconButton
                color='inherit'
                aria-label='Open drawer'
                onClick={onDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
            </Grid>
          </Hidden>
          {SEARCH_BAR && (
            <Grid item>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <Input placeholder='Search topics' />
              </Search>
            </Grid>
          )}
          <Grid item xs />
          <Grid item>
            {CHAT_AND_NOTIFICATION_ICONS && (
              <>
                <IconButton color='inherit'>
                  <Indicator badgeContent={3}>
                    <MessageSquare />
                  </Indicator>
                </IconButton>
                <IconButton color='inherit'>
                  <Indicator badgeContent={7}>
                    <Bell />
                  </Indicator>
                </IconButton>
              </>
            )}
            <LanguageMenu />
            <UserMenu />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  </>
);

export default withTheme(Header);
