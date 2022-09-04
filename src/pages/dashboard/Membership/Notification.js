import { makeStyles, Paper, Typography } from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import React from "react";
const useStyles = makeStyles({
  default: {
    padding: "20px",
    margin: "0px 20px",
    boxShadow: "0 0 14px 0 rgb(53 64 82 / 15%) !important",
  },
  error: {
    backgroundColor: "#FEF2EF",
    padding: "20px",
    margin: "0px 20px",
    boxShadow: "0 0 14px 0 rgb(53 64 82 / 15%) !important",
    "& >h6": {
      color: "#FF0000",
    },
  },
  success: {
    backgroundColor: "#F3FFE9",
    margin: "0px 20px",
    padding: "20px",
    boxShadow: "0 0 14px 0 rgb(53 64 82 / 15%) !important",
    "& >h6": {
      color: "#003728",
    },
  },
  pending: {
    backgroundColor: "#FFFAE9",
    margin: "0px 20px",
    padding: "20px",
    boxShadow: "0 0 14px 0 rgb(53 64 82 / 15%) !important",
    "& >h6": {
      color: "#836109",
    },
  },
});
export default function Notification({ status }) {
  const classes = useStyles();
  const [defaultClass, setDefaultClass] = React.useState(classes.default);
  const getClass = () => {
    if (status === "success") return setDefaultClass(classes.default);
    if (status === "pending") return setDefaultClass(classes.pending);
    if (status === "error") return setDefaultClass(classes.error);
    if (status === "approved") return setDefaultClass(classes.success);
  };

  React.useEffect(() => {
    getClass();
  }, [status]);
  return (
    <Paper elevation={3} className={defaultClass}>
      <Typography variant="h6">
        There was a problem with previous payment
      </Typography>
      <Typography variant="p">
        Possible causes of the error: your card may be inactive, insufficient
        funds on the card. Please, check and update your payment details.
      </Typography>
    </Paper>
  );
}
