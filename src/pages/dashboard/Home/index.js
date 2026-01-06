import React, { useCallback, useState, useEffect } from "react";
import { withTheme } from "styled-components";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Grid } from "@material-ui/core";
// import Arvut from "./Arvut";
import Calendar from "./Calendar";
import Header from "./Header";
import QuickActions from "./QuickActions.jsx";
import ConventionCard from "./ConventionCard.jsx";
import StudyArea from "./StudyArea.jsx";
import GivingSection from "./GivingSection.jsx";
// import Convention from "./Convention";
import { setPageTitle } from "../../../redux/actions/layoutActions";

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
      {/* 1️⃣ Top Section – Convention Banner (Full Width) */}
      <Grid container spacing={6} style={{ marginBottom: 24, marginTop: -40 }}>
        <Grid item xs={12}>
          <ConventionCard />
        </Grid>
      </Grid>

      {/* 2️⃣ Main Content Section – Events + Study (50% / 50%) */}
      <Grid container spacing={6} style={{ marginBottom: 24 }}>
        <Grid item xs={12} lg={6}>
          <Calendar onLiveEvent={onLiveEvent} />
        </Grid>
        <Grid item xs={12} lg={6}>
          <StudyArea />
        </Grid>
      </Grid>

      {/* 3️⃣ Quick Actions – Compact Strip (Secondary Navigation) */}
      <div style={{ marginBottom: 24 }}>
        <QuickActions />
      </div>

      {/* 4️⃣ Bottom Section – Giving & Mutual Responsibility (Full Width) */}
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <GivingSection />
        </Grid>
      </Grid>
    </>
  );
};

export default withTheme(Home);
