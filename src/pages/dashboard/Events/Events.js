import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import EventIcon from "@material-ui/icons/Event";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import {
  getEventsListWithParticipationDetail,
  getParticipants,
} from "../../../services/events.service";
import { keycloakData } from "../../../redux/selectors/user";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { DASHBOARD_ROUTES } from "../../../routes/dashboardRoutes";
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
  const [events, setEvents] = React.useState([]);
  const { t } = useTranslation();
  const history = useHistory();
  const classes = useStyles();
  const keycloak = useSelector(keycloakData);
  React.useEffect(() => {
    if (keycloak && keycloak.profile && keycloak.profile.email)
      getEventsListWithParticipationDetail(keycloak.profile.email).then(
        (res) => {
          if (res) {
            setEvents(res);
          }
        }
      );
  }, [keycloak]);

  const navigate = (externalUrl, url, newTab) => {
    if (newTab) {
      window.open(url, "_blank").focus();
      return;
    }
    if (externalUrl) {
      window.location.href = window.location.origin + url;
      return;
    }
    history.push(url);
  };
  const getTicketsData = (eventId) => {
    const query = `?eventid=${eventId}&kc_id=${keycloak.subject}`;
    getParticipants(query).then(res => {
      if (res) {
        history.push(DASHBOARD_ROUTES.eventsTickets, res);
      }
    });
  };
  return (
    <Grid container spacing={6}>
      {events &&
        events.map((event) => (
          <Grid item xs={12} md={4} className={classes.eventTile}>
            <Grid className={[classes.flexTile, classes.eventName]}>
              <EventIcon /> &nbsp; &nbsp;
              <Typography variant="h4">{t(event.slug)}</Typography>
            </Grid>
            <Grid className={classes.flexTile}>
              <Typography className={classes.label} variant="p">
                {t("common.date")}:{" "}
              </Typography>{" "}
              &nbsp;
              <Typography variant="p">
                {moment(event.starts_on).format("DD/MM/YYYY")} -{" "}
                {moment(event.ends_on).format("DD/MM/YYYY")}
              </Typography>
            </Grid>
            <Grid className={classes.flexTile}>
              <Typography className={classes.label} variant="p">
                {t("common.time")} :{" "}
              </Typography>{" "}
              &nbsp;
              <Typography variant="p">
                {moment(event.starts_on).format("HH:MM:SSS")} -{" "}
                {moment(event.ends_on).format("HH:MM:SSS")}
              </Typography>
            </Grid>
            <Grid className={[classes.flexTile, classes.actionTile]}>
              <Button
                variant="contained"
                color="default"
                onClick={() =>
                  navigate(
                    true,
                    event.url ? event.url : "https://convention.kli.one",
                    true
                  )
                }
              >
                {t("Dashboard.Events.page")}
              </Button>{" "}
              &nbsp;
              {event.is_user_registered ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => getTicketsData(event.id)}
                >
                  {t("common.ticket")}
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    navigate(true, `/pay/order/ticket/${event.slug}`)
                  }
                >
                  {t("Dashboard.Events.register")}
                </Button>
              )}
            </Grid>
          </Grid>
        ))}
    </Grid>
  );
}
