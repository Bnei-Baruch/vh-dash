import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useTranslation } from "react-i18next";
import AddBoxIcon from "@material-ui/icons/AddBox";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import CancelIcon from "@material-ui/icons/Cancel";
import { useSelector } from "react-redux";
import { membershipData } from "../../../redux/selectors/user";
const useStyles = makeStyles({
  statusContainer: {
    display: "flex",
    alignItems: "center",
  },
  iconStyle: {
    fontSize: 75,
    color: "#ff0000",
    margin: "0px 20px 0px 0px",
  },
  iconActive: {
    color: "#0d9d0d",
  },
  iconInActive: {
    color: "#ff0000",
  },
  iconNew: {
    color: "#1976d2",
  },
  greyText: {
    color: "#747474",
  },
  ctaContainer: {
    textAlign: "right",
  },
});
export default function Status() {
  const [status, setStatus] = React.useState("inactive");
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const membership = useSelector(membershipData);
  const redirectToPayment = () => {
    window
      .open(
        `${window.location.origin}/pay/membership?lang=${i18n.language}`,
        "_blank"
      )
      .focus();
  };

  // const redirectToPayment = () => {
  //   window
  //     .open(
  //       `${window.location.origin}/pay/membership?lang=${i18n.language}`,
  //       "_blank"
  //     )
  //     .focus();
  // };

  React.useEffect(() => {
    if (membership && membership.membership) {
      setStatus("active");
    }
  }, [membership]);
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} lg={8}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={12}>
            <Card mb={6}>
              <CardHeader title={t("Membership.name")} />
              <CardContent>
                <Box>
                  <Grid className={classes.statusContainer}>
                    {status === "new" && (
                      <>
                        <AddBoxIcon
                          className={[classes.iconStyle, classes.iconNew]}
                        />
                        <div>
                          <Typography variant="h5" className={classes.greyText}>
                            {t("Membership.myMembership")}
                          </Typography>
                          <Typography variant="h4">
                            {t("Membership.new")}
                          </Typography>
                        </div>
                      </>
                    )}
                    {status === "active" && (
                      <>
                        <VerifiedUserIcon
                          className={[classes.iconStyle, classes.iconActive]}
                        />
                        <div>
                          <Typography variant="h5" className={classes.greyText}>
                            {t("Membership.myMembership")}
                          </Typography>
                          <Typography
                            variant="h4"
                            className={classes.iconActive}
                          >
                            {t("Membership.active")}
                          </Typography>
                        </div>
                      </>
                    )}
                    {status === "inactive" && (
                      <>
                        <CancelIcon
                          className={[classes.iconStyle, classes.iconInActive]}
                        />
                        <div>
                          <Typography variant="h5" className={classes.greyText}>
                            {t("Membership.myMembership")}
                          </Typography>
                          <Typography
                            variant="h4"
                            className={classes.iconInActive}
                          >
                            {t("Membership.inactive")}
                          </Typography>
                        </div>
                      </>
                    )}
                  </Grid>
                  <br />
                  <Grid>
                    <Typography variant="h5">
                      {t("Membership.statusDescription")} :
                    </Typography>
                    <Typography variant="body1">
                      {t(`Membership.${membership.status_name}`)}
                    </Typography>
                  </Grid>
                  <br />
                  <Grid className={classes.ctaContainer}>
                    <Button
                      onClick={redirectToPayment}
                      variant="contained"
                      color="primary"
                    >
                      {t("UserMenu.payUserFee")}
                    </Button>
                  </Grid>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} lg={4}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={12}>
            <Card mb={6}>
              <CardHeader title={t("Membership.info")} />
              <CardContent>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body1">
                    {t("Membership.membershipDescription")}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
