import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Typography, Button, Grid } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import LockIcon from "@material-ui/icons/Lock";

const useStyles = makeStyles((theme) => ({
  card: {
    textAlign: "center",
    padding: theme.spacing(4),
    margin: theme.spacing(2),
    maxWidth: 600,
    marginLeft: "auto",
    marginRight: "auto",
  },
  lockIcon: {
    fontSize: 64,
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(2),
  },
  title: {
    marginBottom: theme.spacing(2),
    fontWeight: "bold",
  },
  description: {
    marginBottom: theme.spacing(3),
    color: theme.palette.text.secondary,
  },
  button: {
    borderRadius: "0.3125rem",
    background: "#3376D6",
    padding: theme.spacing(1.5, 4),
    fontSize: "1.1rem",
  },
}));

const MembershipRequired = () => {
  const classes = useStyles();
  const { t, i18n } = useTranslation();

  const redirectToPayment = () => {
    window
    .open(
      `${window.location.origin}/pay/membership?lang=${i18n.language}`,
      "_blank"
    )
    .focus();
  };

  return (
    <Grid container justify="center" alignItems="center" style={{ minHeight: "60vh" }}>
      <Grid item xs={12} md={8} lg={6}>
        <Card className={classes.card}>
          <CardContent>
            <LockIcon className={classes.lockIcon} />
            <Typography variant="h4" className={classes.title}>
              {t("Dashboard.Broadcast.membershipRequired")}
            </Typography>
            <Typography variant="body1" className={classes.description}>
              {t("Dashboard.Broadcast.membershipRequiredDescription")}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={redirectToPayment}
              size="large"
            >
              {t("Membership.activate_membership")}
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default MembershipRequired; 