import React, { useCallback, useState, useEffect } from "react";
import { withTheme } from "styled-components";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Grid } from "@material-ui/core";
// import Arvut from "./Arvut";
import Calendar from "./Calendar";
import Header from "./Header";
import StudyArea from "./StudyArea.jsx";
import StudyAreaNew from "./StudyAreaNew.jsx";
import ConventionCard from "./ConventionCard.jsx";
import QuickActions from "./QuickActions.jsx";
import GivingSectionNew from "./GivingSectionNew.jsx";
import RegistrationsAndPayments from "./RegistrationsAndPayments.jsx";
// import Convention from "./Convention";
import { setPageTitle } from "../../../redux/actions/layoutActions";
import StudyAreaBanner from "./StudyAreaBanner.jsx";

const Home = () => {
  const [liveEvent, setLiveEvent] = useState();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    // No page title for home page
    dispatch(setPageTitle(""));
    return () => {
      dispatch(setPageTitle(""));
    };
  }, [dispatch]);

  const onLiveEvent = useCallback((event) => {
    setLiveEvent(event);
  }, []);

  return (
    <>
      {/* 1️⃣ Quick Actions */}
      <div style={{ marginBottom: 24 }}>
        <QuickActions />
      </div>

      {/* 2️⃣ Main Content Section – Study + Events + Convention Banner */}
      <Grid container spacing={6} style={{ marginBottom: 24 }}>
        <Grid item xs={12} lg={7}>
          <StudyAreaBanner />
        </Grid>
        <Grid item xs={12} lg={5}>
          <Calendar onLiveEvent={onLiveEvent} />
        </Grid>
       
      </Grid>

      {/* 3️⃣ Registrations and Payments + Giving Section New (50% / 50%) */}
      <Grid container spacing={6}>
        <Grid item xs={12} lg={6}>
          <RegistrationsAndPayments />
        </Grid>
        <Grid item xs={12} lg={6}>
          <GivingSectionNew />
        </Grid>
      </Grid>
    </>
  );
};

export default withTheme(Home);
