import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";

import { spacing } from "@material-ui/system";
import {
  CssBaseline,
  Paper as MuiPaper,
  withWidth,
} from "@material-ui/core";
import { isWidthUp } from "@material-ui/core/withWidth";
import Header from "../components/Header";
import GlassixWidget from "../components/Glassix";
import PlatformsNavigation from "../pages/dashboard/Home/PlatformsNavigation";
import CountryPromptModal from "../components/CountryPromptModal";
import { updateProfile } from "../redux/actions/profileActions";

// Storage keys for country prompt modal
const COUNTRY_PROMPT_DISMISSED_KEY = 'VH_COUNTRY_PROMPT_DISMISSED';
const COUNTRY_PROMPT_SESSION_DISMISSED_KEY = 'VH_COUNTRY_PROMPT_SESSION_DISMISSED';

const GlobalStyle = createGlobalStyle`
  html,
  body,
  #root {
    height: 100%;
  }

  body {
    background: ${(props) => props.theme.body.background};
  }

  .MuiCardHeader-action .MuiIconButton-root {
    padding: 4px;
    width: 28px;
    height: 28px;
  }
`;

const Root = styled.div`
  display: flex;
  min-height: 100vh;
`;

const AppContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Paper = styled(MuiPaper)(spacing);

const MainContent = styled(Paper)`
  flex: 1;
  background: #f9fafc !important;
  background-color: #f9fafc !important;

  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    flex: none;
  }

  .MuiPaper-root .MuiPaper-root {
    box-shadow: none;
  }
`;

const Dashboard = ({ children, width }) => {
  const [countryModalOpen, setCountryModalOpen] = useState(false);

  const profile = useSelector((state) => state.profileReducer.info);
  const dispatch = useDispatch();
  const location = useLocation();

  // Check if we should show the country prompt
  useEffect(() => {
    if (profile && Object.keys(profile).length > 0) {
      const isPermanentlyDismissed = localStorage.getItem(COUNTRY_PROMPT_DISMISSED_KEY) === 'true';
      const isSessionDismissed = sessionStorage.getItem(COUNTRY_PROMPT_SESSION_DISMISSED_KEY) === 'true';

      const shouldShow = !isPermanentlyDismissed && !isSessionDismissed;
      setCountryModalOpen(shouldShow);
    }
  }, [profile, location.pathname]);

  const handleSaveCountry = (countryISO) => {
    dispatch(updateProfile({ country: countryISO }));
    localStorage.setItem(COUNTRY_PROMPT_DISMISSED_KEY, 'true');
    setCountryModalOpen(false);
  };

  const handleDismissCountryPrompt = () => {
    localStorage.setItem(COUNTRY_PROMPT_DISMISSED_KEY, 'true');
  };

  const handleCloseCountryPrompt = () => {
    sessionStorage.setItem(COUNTRY_PROMPT_SESSION_DISMISSED_KEY, 'true');
    setCountryModalOpen(false);
  };

  return (
    <Root>
      <CssBaseline />
      <GlobalStyle />
      <AppContent>
        <Header />
        {location.pathname === "/dash" && <PlatformsNavigation />}
        <MainContent p={isWidthUp("lg", width) ? 10 : 5}>
          {children}
        </MainContent>
        <GlassixWidget/>
      </AppContent>
      <CountryPromptModal
        open={countryModalOpen}
        onClose={handleCloseCountryPrompt}
        onSave={handleSaveCountry}
        onDismiss={handleDismissCountryPrompt}
        currentCountry={profile?.country || ''}
      />
    </Root>
  );
};

export default withWidth()(Dashboard);
