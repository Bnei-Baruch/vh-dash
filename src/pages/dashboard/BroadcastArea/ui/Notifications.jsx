import React from "react";
import PropTypes from "prop-types";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const Notifications = ({ open, toggleNotifications, isSentSuccessfully }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const message = isSentSuccessfully
    ? t("Dashboard.BroadcastArea.Question.successMsg")
    : t("Dashboard.BroadcastArea.Question.errorMsg");
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    toggleNotifications(false);
  };

  return (
    <div className={classes.root}>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleClose}
          severity={isSentSuccessfully ? "success" : "error"}
        >
          {message}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

Notifications.propTypes = {
  open: PropTypes.bool.isRequired,
  isSentSuccessfully: PropTypes.bool.isRequired,
  toggleNotifications: PropTypes.func.isRequired,
};

export default Notifications;
