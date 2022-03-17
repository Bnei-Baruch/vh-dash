import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import EventIcon from "@material-ui/icons/Event";
import { useTranslation } from "react-i18next";
const useStyles = makeStyles((theme) => ({
  eventTile: {
    backgroundColor: "#fff",
    padding: "20px !important",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  },
  flexTile: {
    display: "flex",
    margin: "10px 0px",
  },
  eventName: {
    borderBottom: "1px solid #cfcfcf",
    padding: "10px 0px",
  },
  actionTile: {
    marginTop: "20px",
    justifyContent: "space-between",
  },
  label: {
    color: "#717171",
  },
}));
export default function Events() {
  const { t } = useTranslation();
  const classes = useStyles();
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4} className={classes.eventTile}>
        <Grid className={[classes.flexTile, classes.eventName]}>
          <EventIcon /> &nbsp; &nbsp;
          <Typography variant="h4">Events Name</Typography>
        </Grid>
        <Grid className={classes.flexTile}>
          <Typography className={classes.label} variant="p">
            Date:{" "}
          </Typography>{" "}
          &nbsp;
          <Typography variant="p">22/04/95</Typography>
        </Grid>
        <Grid className={classes.flexTile}>
          <Typography className={classes.label} variant="p">
            Paricipantion:{" "}
          </Typography>{" "}
          &nbsp;
          <Typography variant="p">$10</Typography>
        </Grid>
        <Grid className={[classes.flexTile, classes.actionTile]}>
          <Button variant="contained" color="default">
            {t('Dashboard.Events.page')}
          </Button>{" "}
          &nbsp;
          <Button variant="contained" color="primary">
          {t('Dashboard.Events.register')}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
