import React, { useCallback, useState, useEffect } from "react";
import { withTheme } from "styled-components";
import { Grid } from "@material-ui/core";
import Calendar from "./Calendar";
import StudyArea from "./StudyArea.jsx";
import PlatformsNavigation from "./PlatformsNavigation.jsx";
import GivingSection from "./GivingSection.jsx";
import RegistrationsAndPayments from "./RegistrationsAndPayments.jsx";
import Messages from "./Messages.jsx";
import { usePageTitle } from "../../../contexts/PageTitleContext";

const Home = () => {
  const [liveEvent, setLiveEvent] = useState();
  const { setTitle } = usePageTitle();

  // Reset title immediately when component mounts
  useEffect(() => {
    setTitle("");
    return () => {
      setTitle("");
    };
  }, [setTitle]);

  const onLiveEvent = useCallback((event) => {
    setLiveEvent(event);
  }, []);

  return (
    <>
   
      {/* 1️⃣ Quick Actions + Messages + Study Area + Calendar */}
      <Grid container spacing={6} style={{ marginBottom: 24 }} alignItems="stretch">
        {/* md: row 1 left (5/12) — lg: full width above */}
        <Grid item xs={12} md={5} lg={12}>
          <PlatformsNavigation />
        </Grid>
        {/* md: row 1 right (7/12) — lg: 4/12 */}
        <Grid item xs={12} md={7} lg={4}>
          <Messages />
        </Grid>
        {/* md: row 2 left (5/12) — lg: 4/12 */}
        <Grid item xs={12} md={5} lg={4}>
          <StudyArea />
        </Grid>
        {/* md: row 2 right (7/12) — lg: 4/12 */}
        <Grid item xs={12} md={7} lg={4}>
          <Calendar onLiveEvent={onLiveEvent} />
        </Grid>
      </Grid>

      {/* 2️⃣ Registrations and Payments + Giving Section New (50% / 50%) */}
      <Grid container spacing={6}>
        <Grid item xs={12}>
          {/* Placeholder for live broadcast indication */}
          {liveEvent && console.log("Live event active")}
        </Grid>

        <Grid item xs={12} md={6}>
          <RegistrationsAndPayments />
        </Grid>
        <Grid item xs={12} md={6}>
          <GivingSection />
        </Grid>
      </Grid>
    </>
  );
};

export default withTheme(Home);