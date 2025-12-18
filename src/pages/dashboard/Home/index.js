import React, { useCallback, useState, useEffect } from "react";
import { withTheme } from "styled-components";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Grid } from "@material-ui/core";
// import Arvut from "./Arvut";
import Calendar from "./Calendar";
import Header from "./Header";
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
      <Header />

      <Grid container spacing={6}>
        <Grid item xs={12} lg={6}>
          <Calendar onLiveEvent={onLiveEvent} />
        </Grid>
      </Grid>
    </>
  );
};

export default withTheme(Home);
