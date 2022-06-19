import { Grid, Typography } from "@material-ui/core";
import moment from "moment";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Loader from "../../../components/Loader";
import { keycloakData } from "../../../redux/selectors/user";
import { getParticipants } from "../../../services/events.service";
const TicketGrid = styled(Grid)`
  max-width: 80% !important;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  padding: 0px !important;
  margin: auto !important;
  margin-top: 20px !important;
`;

const TicketHeaderLeft = styled(Grid)`
  background-color: #4aa5ff;
  padding: 15px;
  color: #fff;
  font-weight: bold;
  min-height: 66px;
`;
const TicketHeaderRight = styled(Grid)`
  background-color: #4aa5ff;
  padding: 15px;
  color: #fff;
  font-weight: bold;
  min-height: 66px;
`;

const RightSide = styled(Grid)`
  border-left: 0.18em dashed #f2f2f2;
  position: relative;
  &:before,
  &:after {
    content: "";
    position: absolute;
    display: block;
    width: 0.9em;
    height: 0.9em;
    background: #f2f2f2;
    border-radius: 50%;
    left: -0.5em;
  }
  &:before {
    top: -0.4em;
  }
  &:after {
    bottom: -0.4em;
  }
`;

const Label = styled(Typography)`
  padding: 20px 20px 0px 20px;
  font-weight: bold !important;
  transform: uppercase;
`;

const Value = styled(Typography)`
  padding: 0px 20px 20px 20px;
  font-weight: normal !important;
  color: grey;
`;

export default function Tickets() {
  const { eventId } = useParams();
  const { t } = useTranslation();
  const keycloak = useSelector(keycloakData);
  const [eventData, setEventData] = React.useState(undefined);
  React.useEffect(() => {
    const query = `?eventid=${eventId}&kc_id=${keycloak.subject}`;
    getParticipants(query).then((res) => {
      if (res) {
        setEventData(res[0]);
      }
    });
    // eslint-disable-next-line
  }, []);
  if (!eventData) return <Loader />;
  return (
    <Grid container spacing={3}>
      <TicketGrid container item xs={12}>
        <Grid item xs={8}>
          <TicketHeaderLeft>
            <Typography variant="h1">{t("ticket.title")}</Typography>
          </TicketHeaderLeft>
          <Grid>
            <Label variant="h3"> {eventData.event_name}</Label>
            <Value variant="h4">{t("ticket.event")}</Value>
          </Grid>

          <Grid container>
            <Grid item xs={4}>
              <Label variant="h4">
                {eventData.part_first_name} {eventData.part_last_name}
              </Label>
              <Value variant="h5">{t("ticket.name")}</Value>
            </Grid>
            <Grid item xs={4}>
              <Label variant="h4">{eventData.part_gender?.toUpperCase()}</Label>
              <Value variant="h5">{t("ticket.gender")}</Value>
            </Grid>
            <Grid item xs={4}>
              <Label variant="h4">{eventData.part_country}</Label>
              <Value variant="h5">{t("ticket.country")}</Value>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <Label
                variant="h4"
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {eventData.part_email}
              </Label>
              <Value variant="h5">{t("ticket.email")}</Value>
            </Grid>
          </Grid>
        </Grid>
        <RightSide item xs={4}>
          <TicketHeaderRight>
            <Typography variant="h1"></Typography>
          </TicketHeaderRight>
          <Grid>
            <Label variant="h3">
              {moment(eventData.event_starts_on).format("DD/MM/YYYY")}
            </Label>
            <Value variant="h4">{t("ticket.date")}</Value>
          </Grid>
          <Grid>
            <Label variant="h3">{eventData.participation_option}</Label>
            <Value variant="h4">{t("ticket.payment_option")}</Value>
          </Grid>
          <Grid>
            <Label variant="h3">
              {moment(eventData.registration_date).format("DD/MM/YYYY")}
            </Label>
            <Value variant="h4">{t("ticket.registration_date")}</Value>
          </Grid>
        </RightSide>
      </TicketGrid>
    </Grid>
  );
}
