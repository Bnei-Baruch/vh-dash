import {
  Button,
  Grid,
  makeStyles,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import React from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import { getEventsListWithParticipationDetail } from "../../../services/events.service";
import { keycloakData } from "../../../redux/selectors/user";
import moment from "moment";
import { useHistory } from "react-router-dom";
import InfoIcon from "@material-ui/icons/Info";
import Loader from "../../../components/Loader";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  eventTile: {
    backgroundColor: "#fff",
    padding: "20px !important",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  },
  flexTile: {
    display: "flex",
    margin: "10px 0px",
  },
  registeredTile: {
    marginTop: "20px",
  },
  eventTitle: {
    marginTop: "20px",
    padding: "10px 0px",
  },
  eventName: {
    padding: "5px 0px",
  },
  actionTile: {
    marginTop: "20px",
    justifyContent: "space-between",
  },
  label: {
    color: "#717171",
  },
  partStatus: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  registeredContainer: {
    alignItems: "center",
    display: "flex",
    marginBottom: "5px",
    "& svg.green": {
      color: "#0D9D0D",
      fontSize: "16px",
    },
    "& svg.grey": {
      color: "#717171",
      fontSize: "16px",
    },
  },
  primaryText: {
    color: "#1565C0",
  },
  secondaryText: {
    color: "#5A5A5A",
  },
  pending: {
    borderRadius: "20px",
    border: "1px solid #F36518",
    padding: "5px 25px",
    margin: "auto",
  },
}));

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

const NoEvents = ({ message }) => (
  <Grid container>
    <Grid
      item
      xs={12}
      style={{ textAlign: "center", marginTop: "20px", color: "#bdbdbd" }}
    >
      <InfoIcon />
      <Typography variant="h6" style={{}}>
        {message}
      </Typography>
    </Grid>
  </Grid>
);

export default function Events() {
  const [loading, setLoading] = React.useState(true);
  // eslint-disable-next-line no-unused-vars
  const [registeredEvents, setRegisteredEvents] = React.useState([]);
  const [upcomingEvents, seUpcomingEvents] = React.useState([]);
  const [pastEvents, setPastEvents] = React.useState([]);
  const { t, i18n } = useTranslation();
  const history = useHistory();
  const classes = useStyles();
  const keycloak = useSelector(keycloakData);
  React.useEffect(() => {
    if (keycloak && keycloak.profile && keycloak.profile.email)
      getEventsListWithParticipationDetail(keycloak.profile.email).then(
        (res) => {
          if (res) {
            res = res.filter((event) => event.deleted !== true);
            const registeredEvents = res.filter(
              (event) =>
                event.is_user_registered &&
                moment(event.starts_on).isAfter(moment())
            );
            const upcomingEvents = res.filter(
              (event) =>
                !event.is_user_registered &&
                moment(event.starts_on).isAfter(moment())
            );
            const pastEvents = res.filter((event) =>
              moment(event.starts_on).isBefore(moment())
            );
            setRegisteredEvents(registeredEvents);
            seUpcomingEvents([...upcomingEvents, ...registeredEvents]);
            setPastEvents(pastEvents);
          }
          setLoading(false);
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

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={12}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          {/* <Tab label={t("events.upcoming_event")} {...a11yProps(0)} /> */}
          <Tab label={t("events.upcoming_event")} {...a11yProps(0)} />
          <Tab label={t("events.past_events")} {...a11yProps(1)} />
        </Tabs>

        <TabPanel value={value} index={0}>
          <Grid container spacing={2} style={{ marginTop: "5px" }}>
            {upcomingEvents && upcomingEvents.length > 0 ? (
              upcomingEvents.map((event) => (
                <Grid item xs={12} md={5}>
                  <Grid className={classes.eventTile}>
                    <Grid container>
                      <Grid sm={7} item>
                        <Typography variant="h1">
                          {moment(event.starts_on).format("DD")} -{" "}
                          {moment(event.ends_on).format("DD")}
                        </Typography>
                        <Typography
                          variant="p"
                          className={classes.secondaryText}
                        >
                          {moment(event.starts_on).format("MMMM") +
                            "," +
                            moment(event.starts_on).format("YYYY")}
                        </Typography>
                      </Grid>
                      <Grid sm={5} item className={classes.partStatus}>
                        <Typography
                          variant="p"
                          className={classes.registeredContainer}
                        >
                          {event.is_user_registered ? (
                            event.user_participation_details.confirmed ? (
                              <>
                                <CheckCircleIcon className="green" /> &nbsp;{" "}
                                {t("events.registered")}{" "}
                              </>
                            ) : (
                              <div className={classes.pending}>
                                {t("events.pending")}
                              </div>
                            )
                          ) : (
                            <>
                              <RemoveCircleIcon className="grey" /> &nbsp;{" "}
                              {t("events.notRegistered")}
                            </>
                          )}
                        </Typography>
                        <Typography
                          variant="p"
                          className={classes.secondaryText}
                        >
                          {t("events.part_status")}
                        </Typography>
                      </Grid>
                    </Grid>
                    {event.is_user_registered && (
                      <Grid container className={classes.registeredTile}>
                        <Grid sm={7} item>
                          <Typography
                            variant="p"
                            className={classes.secondaryText}
                          >
                            {t("events.registered_date")}
                          </Typography>
                          <br />
                          <Typography variant="p">
                            <strong>
                              {" "}
                              {moment(
                                event.user_participation_details
                                  .registration_date
                              ).format("DD, MMMM, YYYY")}{" "}
                            </strong>
                          </Typography>
                        </Grid>
                        <Grid sm={5} item>
                          <Typography
                            variant="p"
                            className={classes.secondaryText}
                          >
                            {t("events.option")}
                          </Typography>
                          <br />
                          <Typography
                            variant="p"
                            className={classes.primaryText}
                          >
                            {t(
                              event.user_participation_details
                                .participation_option
                            )}
                          </Typography>
                        </Grid>
                      </Grid>
                    )}
                    <Grid className={[classes.eventName, classes.eventTitle]}>
                      <Typography variant="h6">
                        {event.content?.[i18n.language]?.title || event.slug}
                      </Typography>
                    </Grid>
                    <Grid className={[classes.eventName]}>
                      <Typography variant="p">
                        {t(
                          event.content?.[i18n.language]?.description ||
                            "Our next big gathering with the whole world kli is an other opportunity to unite."
                        )}
                      </Typography>
                    </Grid>
                    <Grid className={[classes.flexTile, classes.actionTile]}>
                      <Button
                        fullWidth={event.is_user_registered}
                        variant="outlined"
                        color="primary"
                        onClick={() =>
                          navigate(
                            true,
                            event.url
                              ? event.url
                              : "https://convention.kli.one",
                            true
                          )
                        }
                      >
                        {t("Dashboard.Events.page")}
                      </Button>{" "}
                      &nbsp;
                      {!event.is_user_registered && (
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
                </Grid>
              ))
            ) : (
              <NoEvents message={t("events.no_upcoming_events")} />
            )}
          </Grid>
        </TabPanel>
        {/* <TabPanel value={value} index={0}>
          <Grid container spacing={2} style={{ marginTop: "5px" }}>
            {registeredEvents && registeredEvents.length > 0 ? (
              registeredEvents.map((event) => (
                <Grid item xs={12} md={4}>
                  <Grid className={classes.eventTile}>
                    <Grid container>
                      <Grid sm={7} item>
                        <Typography variant="h1">
                          {moment(event.starts_on).format("DD")} -{" "}
                          {moment(event.ends_on).format("DD")}
                        </Typography>
                        <Typography
                          variant="p"
                          className={classes.secondaryText}
                        >
                          {moment(event.starts_on).format("MMMM") +
                            "," +
                            moment(event.starts_on).format("YYYY")}
                        </Typography>
                      </Grid>
                      <Grid sm={5} item className={classes.partStatus}>
                        <Typography
                          variant="p"
                          className={classes.registeredContainer}
                        >
                          <CheckCircleIcon /> &nbsp; {t("events.registered")}
                        </Typography>
                        <Typography
                          variant="p"
                          className={classes.secondaryText}
                        >
                          {t("events.part_status")}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container className={classes.registeredTile}>
                      <Grid sm={7} item>
                        <Typography
                          variant="p"
                          className={classes.secondaryText}
                        >
                          {t("events.registered_date")}
                        </Typography>
                        <br />
                        <Typography variant="p">
                          <strong>
                            {" "}
                            {moment(event.starts_on).format(
                              "DD, MMMM, YYYY"
                            )}{" "}
                          </strong>
                        </Typography>
                      </Grid>
                      <Grid sm={5} item>
                        <Typography
                          variant="p"
                          className={classes.secondaryText}
                        >
                          {t("events.option")}
                        </Typography>
                        <br />
                        <Typography variant="p" className={classes.primaryText}>
                          {"Regular"}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid className={[classes.eventName, classes.eventTitle]}>
                      <Typography variant="h6">{t(event.slug)}</Typography>
                    </Grid>
                    <Grid className={[classes.eventName]}>
                      <Typography variant="p">
                        {t(
                          event.desciption ||
                            "Our next big gathering with the whole world kli is an other opportunity to unite."
                        )}
                      </Typography>
                    </Grid>
                    <Grid className={[classes.flexTile, classes.actionTile]}>
                      <Button
                        fullWidth
                        variant="outlined"
                        color="primary"
                        onClick={() =>
                          navigate(
                            true,
                            event.url
                              ? event.url
                              : "https://convention.kli.one",
                            true
                          )
                        }
                      >
                        {t("Dashboard.Events.page")}
                      </Button>{" "}
                    </Grid>
                  </Grid>
                </Grid>
              ))
            ) : (
              <NoEvents message={t("events.no_registered_events")} />
            )}
          </Grid>
        </TabPanel> */}
        <TabPanel value={value} index={1}>
          <Grid container spacing={2} style={{ marginTop: "5px" }}>
            {pastEvents && pastEvents.length > 0 ? (
              pastEvents.map((event) => (
                <Grid item xs={12} md={5}>
                  <Grid className={classes.eventTile}>
                    <Grid>
                      <Typography variant="h1">
                        {moment(event.starts_on).format("DD")}
                      </Typography>
                      <Typography variant="p">
                        {moment(event.starts_on).format("MMMM") +
                          "," +
                          moment(event.starts_on).format("YYYY")}
                      </Typography>
                    </Grid>
                    <Grid className={[classes.eventName, classes.eventTitle]}>
                      <Typography variant="h6">
                        {event.content?.[i18n.language]?.title || event.slug}
                      </Typography>
                    </Grid>
                    <Grid className={[classes.eventName]}>
                      <Typography variant="p">
                        {t(
                          event.content?.[i18n.language]?.description ||
                            "Our next big gathering with the whole world kli is an other opportunity to unite."
                        )}
                      </Typography>
                    </Grid>
                    <Grid className={classes.actionTile}>
                      <Button
                        fullWidth
                        variant="outlined"
                        color="primary"
                        onClick={() =>
                          navigate(
                            true,
                            event.url
                              ? event.url
                              : "https://convention.kli.one",
                            true
                          )
                        }
                      >
                        {t("Dashboard.Events.watch_in_archive")}
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              ))
            ) : (
              <NoEvents message={t("events.no_past_events")} />
            )}
          </Grid>
        </TabPanel>
      </Grid>
    </Grid>
  );
}
