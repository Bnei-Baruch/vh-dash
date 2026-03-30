import React, { useCallback, useState, useEffect } from "react";
import { withTheme } from "styled-components";
import { Grid } from "@material-ui/core";
import Calendar from "./Calendar";
import Header from "./Header";
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
      <Header />

      <Grid container spacing={6}>
        <Grid item xs={12}>
          {/* Placeholder for live broadcast indication */}
          {liveEvent && console.log("Live event active")}
        </Grid>

        <Grid item xs={12} lg={6}>
          <Calendar onLiveEvent={onLiveEvent} />
        </Grid>
      </Grid>
    </>
  );
};

export default withTheme(Home);