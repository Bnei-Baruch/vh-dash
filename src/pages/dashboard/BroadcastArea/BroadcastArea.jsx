import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import Helmet from "react-helmet";
import Broadcast from "./Broadcast";
import BroadcastQuestions from "./BroadcastQuestions";

const useStyles = makeStyles((theme) => ({
  rightButton: {
    marginTop: "10px",
  },
}));

const BroadcastArea = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <>
      <Helmet title={t("Dashboard.BroadcastArea.name")} />

      <Grid container spacing={10}>
        <Grid item xs={12} sm={12} md={12} className={classes.rightButton}>
          <Broadcast />
          <BroadcastQuestions />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          {/* <Annoucements /> */}
        </Grid>
      </Grid>
    </>
  );
};

export default BroadcastArea;
