import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";
import Calendar from "./Calendar";
import StudyArea from "./StudyArea.jsx";
import GivingSection from "./GivingSection.jsx";
import PaymentsArea from "./PaymentsArea.jsx";
import Messages from "./Messages.jsx";
import { usePageTitle } from "../../../contexts/PageTitleContext";

const Home = () => {
  const { setTitle } = usePageTitle();

  // Reset title immediately when component mounts
  useEffect(() => {
    setTitle("");
    return () => {
      setTitle("");
    };
  }, [setTitle]);

  return (
    <>
   
      {/* 1️⃣ Messages + Study Area + Calendar */}
      <Grid container spacing={6} style={{ marginBottom: 24 }} alignItems="stretch">
        <Grid item xs={12} md={4}>
          <Messages />
        </Grid>
        <Grid item xs={12} md={4}>
          <StudyArea />
        </Grid>
        <Grid item xs={12} md={4}>
          <Calendar />
        </Grid>
      </Grid>

      {/* 2️⃣ Payments + Giving (50% / 50%) */}
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <PaymentsArea />
        </Grid>
        <Grid item xs={12} md={6}>
          <GivingSection />
        </Grid>
      </Grid>
    </>
  );
};

export default Home;