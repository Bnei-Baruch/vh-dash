import { Paper, Typography } from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import React from "react";

export default function Notification() {
  return (
    <Paper elevation={3}>
      <Typography variant="h3">
        <InfoIcon />
        There was a problem with previous payment
      </Typography>
      <Typography variant="p">
        Possible causes of the error: your card may be inactive, insufficient
        funds on the card. Please, check and update your payment details.
      </Typography>
    </Paper>
  );
}
