import {
  Box,
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
import PersonIcon from "@material-ui/icons/Person";
import EmailIcon from "@material-ui/icons/Email";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import SmartphoneIcon from "@material-ui/icons/Smartphone";
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
  const { t } = useTranslation();
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
      <Grid item xs={12}>
        <CardHeader
          title={t("Membership.name") + " " + t("Membership.information")}
        />
      </Grid>
      <Grid container item xs={12} lg={12}>
        <Grid item xs={12} lg={3}>
          <Card mb={6}>
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
                          {t("common.status")}
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
                          {t("common.status")}
                        </Typography>
                        <Typography variant="h4" className={classes.iconActive}>
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
                          {t("common.status")}
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
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={3}>
          <Card mb={6}>
            <CardContent>
              <Box>
                <Grid className={classes.statusContainer}>
                  <div>
                    <Typography variant="h5" className={classes.greyText}>
                      {t("common.type")}
                    </Typography>
                    <Typography variant="h4" className={classes.iconActive}>
                      {t("common.success", "Success")}
                    </Typography>
                  </div>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={3}>
          <Card mb={6}>
            <CardContent>
              <Box>
                <Grid className={classes.statusContainer}>
                  <div>
                    <Typography variant="h5" className={classes.greyText}>
                      <PersonIcon /> &nbsp; {t("Membership.myMembership")}
                    </Typography>
                    <Typography variant="h5" className={classes.greyText}>
                      <EmailIcon /> &nbsp; {t("Membership.myMembership")}
                    </Typography>
                  </div>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={3}>
          <Card mb={6}>
            <CardContent>
              <Box>
                <Grid className={classes.statusContainer}>
                  <div>
                    <Typography variant="h5" className={classes.greyText}>
                      <LocationOnIcon /> &nbsp; {t("Membership.myMembership")}
                    </Typography>
                    <Typography variant="h5" className={classes.greyText}>
                      <SmartphoneIcon /> &nbsp; {t("Membership.myMembership")}
                    </Typography>
                  </div>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
}
