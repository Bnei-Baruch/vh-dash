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
import PersonOutlinedIcon from "@material-ui/icons/PersonOutlined";
import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import SmartphoneOutlinedIcon from "@material-ui/icons/SmartphoneOutlined";
import { useSelector } from "react-redux";
import { profileInfo } from "../../../redux/selectors/profile";
import countries from "../../../constants/countries";

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
  flexCentered: {
    display: "flex",
    alignItems: "center",
  },
  iconNew: {
    color: "#1976d2",
  },
  greyText: {
    color: "#747474",
    marginBottom: "10px",
  },
  ctaContainer: {
    textAlign: "right",
  },
  cardHeaderContent: {
    fontSize: "1.5rem",
    fontWeight: 400,
    lineHeight: "2.5rem",
    paddingBlockEnd: "0px",
  },
  cardHeader: {
    padding: " 16px  16px 0 16px",
  },
});
export default function Status({ membershipDetails }) {
  const [status, setStatus] = React.useState("inactive");
  const classes = useStyles();
  const { t } = useTranslation();
  const profileData = useSelector(profileInfo);

  const getCountry = (code) => {
    const country = countries.find((country) => country.ISO === code);
    return country.label;
  };
  React.useEffect(() => {
    if (membershipDetails && membershipDetails.active) {
      setStatus("active");
    }
  }, [membershipDetails]);
  return (
    <Grid container spacing={12}>
      <Grid item xs={12} >
        <CardHeader className={classes.cardHeader}
          title={
            <Typography variant="h4" className={classes.cardHeaderContent}>
              {t("Membership.name") + " " + t("Membership.information")}
            </Typography>
          }
        />
      </Grid>
      <Grid container rowSpacing={10} item xs={12} lg={12} >
        <Grid item xs={12} lg={status !== "inactive" ? 2 : 4}>
          <Card mb={6}>
            <CardContent>
              <Box>
                <Grid className={classes.statusContainer}>
                  {status === "active" && (
                    <div>
                      <Typography variant="h6" className={classes.greyText}>
                        {t("common.status")}
                      </Typography>
                      <Typography variant="h6" className={classes.iconActive}>
                        {t("Membership.active")}
                      </Typography>
                    </div>
                  )}
                  {status === "inactive" && (
                    <div>
                      <Typography variant="h6" className={classes.greyText}>
                        {t("common.status")}
                      </Typography>
                      <Typography variant="h6">
                        {t("Membership.inactive")}
                      </Typography>
                    </div>
                  )}
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        {status !== "inactive" && (
          <Grid item xs={12} lg={2}>
            <Card mb={6}>
              <CardContent>
                <Box>
                  <Grid className={classes.statusContainer}>
                    <div>
                      <Typography variant="h6" className={classes.greyText}>
                        {t("common.type")}
                      </Typography>
                      <Typography variant="h6">
                        {t(`Membership.type.${membershipDetails.type}`)}
                      </Typography>
                    </div>
                  </Grid>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        )}
        {status !== "inactive" && (
          <Grid item lg={2}></Grid>
        )}
        <Grid item xs={12} lg={3}>
          <Card mb={6}>
            <CardContent>
              <Box>
                <Grid className={classes.statusContainer}>
                  <div>
                    <Typography variant="h6" className={classes.flexCentered}>
                      <PersonOutlinedIcon /> &nbsp;
                      {profileData
                        ? profileData.first_name_vernacular +
                        " " +
                        profileData.last_name_vernacular
                        : ""}
                    </Typography>
                    <Typography variant="h6" className={classes.flexCentered}>
                      <EmailOutlinedIcon /> &nbsp;{" "}
                      {profileData ? profileData.primary_email : ""}
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
                    <Typography variant="h6" className={classes.flexCentered}>
                      <LocationOnOutlinedIcon /> &nbsp;{" "}
                      {profileData && profileData.country
                        ? getCountry(profileData.country)
                        : ""}
                    </Typography>
                    <Typography variant="h6" className={classes.flexCentered}>
                      <SmartphoneOutlinedIcon /> &nbsp;{" "}
                      {profileData ? profileData.mobile_number : ""}
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
