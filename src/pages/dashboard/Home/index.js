import React, { useCallback, useState, useEffect } from "react";
import { withTheme } from "styled-components";
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
import StudyAreaBanner from "./StudyAreaBanner.jsx";
import { usePageTitle } from "../../../contexts/PageTitleContext";


const Home = () => {
  const [liveEvent, setLiveEvent] = useState();
  const { setTitle } = usePageTitle();
  const { t } = useTranslation();

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
