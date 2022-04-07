import { Grid, Typography } from "@material-ui/core";
import moment from "moment";
import React from "react";
import styled from "styled-components";
const TicketGrid = styled(Grid)`
  max-width: 800px !important;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  padding: 0px !important;
  margin: auto !important;
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

export default function Tickets(props) {
  if (!props && !props.location && !props.location.state) return <></>;
  const { state } = props.location;
  if (state && state.length > 0) {
    const eventData = state[0];
    return (
      <Grid container spacing={3}>
        <TicketGrid container item xs={12}>
          <Grid item xs={8}>
            <TicketHeaderLeft>
              <Typography variant="h1">Ticket</Typography>
            </TicketHeaderLeft>
            <Grid>
              <Label variant="h3"> {eventData.event_name}</Label>
              <Value variant="h4">Convention Event</Value>
            </Grid>

            <Grid container>
              <Grid item xs={4}>
                <Label variant="h4">
                  {eventData.part_first_name} {eventData.part_last_name}
                </Label>
                <Value variant="h5">Name</Value>
              </Grid>
              <Grid item xs={4}>
                <Label variant="h4">{eventData.part_gender}</Label>
                <Value variant="h5">Gender</Value>
              </Grid>
              <Grid item xs={4}>
                <Label variant="h4">{eventData.part_country}</Label>
                <Value variant="h5">Country</Value>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={4}>
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
                <Value variant="h5">Email</Value>
              </Grid>
              <Grid item xs={4}>
                <Label variant="h4">
                  {moment(eventData.registration_date).format("DD/MM/YYYY")}
                </Label>
                <Value variant="h5">Registration Date</Value>
              </Grid>
              <Grid item xs={4}>
                <Label variant="h4">{eventData.participation_option}</Label>
                <Value variant="h5">Payment Option</Value>
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
              <Value variant="h4">Date</Value>
            </Grid>

            <Grid>
              <Label variant="h3">
                {moment(eventData.event_starts_on).format("HH:MM:SSS")}
              </Label>
              <Value variant="h4">Time</Value>
            </Grid>
          </RightSide>
        </TicketGrid>
      </Grid>
    );
  } else {
    return <></>;
  }
}
