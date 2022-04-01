import { Grid, Typography } from "@material-ui/core";
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
  font-family: auto !important;
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
  font-family: auto !important;
  transform: uppercase;
`;

const Value = styled(Typography)`
  padding: 0px 20px 20px 20px;
  font-weight: normal !important;
  color: grey;
  font-family: auto !important;
`;

export default function Tickets() {
  return (
    <Grid container spacing={3}>
      <TicketGrid container item xs={12}>
        <Grid item xs={8}>
          <TicketHeaderLeft>
            <Typography variant="h1">Convention Ticket</Typography>
          </TicketHeaderLeft>
          <Grid>
            <Label variant="h3"> CONVENTION 2020 JAN : KABALAAH</Label>
            <Value variant="h4">Convention Event</Value>
          </Grid>

          <Grid container>
            <Grid item xs={4}>
              <Label variant="h4">Yash Shah</Label>
              <Value variant="h5">Name</Value>
            </Grid>
            <Grid item xs={4}>
              <Label variant="h4">Male</Label>
              <Value variant="h5">Gender</Value>
            </Grid>
            <Grid item xs={4}>
              <Label variant="h4">Active</Label>
              <Value variant="h5">Membership</Value>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={4}>
              <Label variant="h4">$10</Label>
              <Value variant="h5">Price</Value>
            </Grid>
            <Grid item xs={4}>
              <Label variant="h4">Regular</Label>
              <Value variant="h5">Ticket Type</Value>
            </Grid>
            <Grid item xs={4}>
              <Label variant="h4">Credit Card</Label>
              <Value variant="h5">Payment Mode</Value>
            </Grid>
          </Grid>
        </Grid>
        <RightSide item xs={4}>
          <TicketHeaderRight>
            <Typography variant="h1"></Typography>
          </TicketHeaderRight>
          <Grid>
            <Label variant="h3">22 May 2022</Label>
            <Value variant="h4">Date</Value>
          </Grid>

          <Grid>
            <Label variant="h3">12AM</Label>
            <Value variant="h4">Time</Value>
          </Grid>
        </RightSide>
      </TicketGrid>
    </Grid>
  );
}
