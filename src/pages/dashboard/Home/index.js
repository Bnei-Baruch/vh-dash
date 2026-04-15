import React, { useCallback, useState, useEffect } from "react";
import { withTheme } from "styled-components";
import { Grid } from "@material-ui/core";
import Calendar from "./Calendar";
import StudyArea from "./StudyArea.jsx";
import QuickActions from "./QuickActions.jsx";
import GivingSectionNew from "./GivingSectionNew.jsx";
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
   
      {/* 1️⃣ Quick Actions */}
      <div style={{ marginBottom: 24 }}>
        <QuickActions />
      </div>

      {/* 2️⃣ Messages + Study Area + Calendar */}
      <Grid container spacing={6} style={{ marginBottom: 24 }} alignItems="stretch">
        <Grid item xs={12} lg={5}>
          <Messages />
        </Grid>
        <Grid item xs={12} lg={3}>
          <StudyArea />
        </Grid>
        <Grid item xs={12} lg={4}>
          <Calendar onLiveEvent={onLiveEvent} />
        </Grid>
      </Grid>

      {/* 3️⃣ Registrations and Payments + Giving Section New (50% / 50%) */}
      <Grid container spacing={6}>
        <Grid item xs={12}>
          {/* Placeholder for live broadcast indication */}
          {liveEvent && console.log("Live event active")}
        </Grid>

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