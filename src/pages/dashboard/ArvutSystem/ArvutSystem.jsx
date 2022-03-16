import {
  Button,
  Divider,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import MuiPhoneInput from "material-ui-phone-number";
import { useTranslation } from "react-i18next";
import Phone from "../../../img/icons/phone.png";
import Whatsapp from "../../../img/icons/whatsapp.png";
import countries from "../../../constants/countries";
import SelectElement from "../MyProfile/Forms/FormElements/SelectElement";
const useStyles = makeStyles((theme) => ({
  image: {
    width: 22,
    height: 22,
  },
  input: {
    "& input": {
      padding: 0,
      height: 35,
      direction: "initial",
      textAlign: ({ textAlignProps }) => textAlignProps,
    },
    "& .MuiOutlinedInput-adornedStart": {
      paddingLeft: 0,
    },
    "& .MuiPhoneNumber-flagButton": {
      height: 35,
      background: "#F4F4F4",
    },
  },
}));
const ArvutSystem = () => {
  const { t, i18n } = useTranslation();
  const textAlignProps = i18n.dir() === "rtl" ? "right" : "left";
  const styles = useStyles({ textAlignProps });
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={6}>
        <Typography variant="body">
          {t("Dashboard.ArvutSystem.description")}
        </Typography>
        <br />
        <br />
        <Typography variant="h5">
          {t("Dashboard.ArvutSystem.accessTitle")}
        </Typography>
        <br />
        <Divider />
        <br />
        <Typography variant="body">
          {t("Dashboard.ArvutSystem.accessDescription")}
        </Typography>
        <br />
        <br />
        <Typography variant="body">
          {t("Dashboard.ArvutSystem.accessSubDescription")}
        </Typography>
        <br />
        <br />
        <Grid justify="flex-end">
          <Button variant="contained" color="primary">
            {t("Dashboard.ArvutSystem.continueAsGuest")}
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h5">
          {t("Dashboard.ArvutSystem.requestAccess")}
        </Typography>
        <br />

        <Typography variant="body">
          {t("Dashboard.ArvutSystem.verfiyInformation")}
        </Typography>
        <br />
        <br />

        <Grid container spacing={8}>
          <Grid item xs={12} md={6}>
            <TextField
              disabled={true}
              type="text"
              label={t("Dashboard.Profile.PersonalForm.firstName")}
              fullWidth
              placeholder={t(
                "Dashboard.Profile.PersonalForm.firstNamePlaceholder"
              )}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              disabled={true}
              type="text"
              label={t("Dashboard.Profile.PersonalForm.firstName")}
              fullWidth
              placeholder={t(
                "Dashboard.Profile.PersonalForm.firstNamePlaceholder"
              )}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              disabled={true}
              type="text"
              label={t("Dashboard.Profile.PersonalForm.firstName")}
              fullWidth
              placeholder={t(
                "Dashboard.Profile.PersonalForm.firstNamePlaceholder"
              )}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              disabled={true}
              type="text"
              label={t("Dashboard.Profile.PersonalForm.firstName")}
              fullWidth
              placeholder={t(
                "Dashboard.Profile.PersonalForm.firstNamePlaceholder"
              )}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid container item xs={12} md={6}>
            <Grid item xs={2}>
              <img src={Phone} alt="phone" style={{ width: 22, height: 22 }} />
            </Grid>
            <Grid item xs={10}>
              <MuiPhoneInput
                defaultCountry="us"
                variant="outlined"
                className={styles.input}
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid container item xs={12} md={6}>
            <Grid item xs={2}>
              <img
                src={Whatsapp}
                alt="whatsapp"
                style={{ width: 22, height: 22 }}
              />
            </Grid>
            <Grid item xs={10}>
              <MuiPhoneInput
                defaultCountry="us"
                variant="outlined"
                className={styles.input}
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <SelectElement
              id="country"
              label={t("Dashboard.Profile.PhysicalLocationForm.country")}
              selectData={countries}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              type="text"
              label={t("Dashboard.Profile.PhysicalLocationForm.city")}
              fullWidth
              placeholder={t("Global.inputPlaceholder", {
                input: t(
                  "Dashboard.Profile.PhysicalLocationForm.city"
                ).toLowerCase(),
              })}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              type="text"
              label={t("Dashboard.Profile.OtherInformation.tenName")}
              fullWidth
              placeholder={t("Global.inputPlaceholder", {
                input: t(
                  "Dashboard.Profile.OtherInformation.tenName"
                ).toLowerCase(),
              })}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              type="text"
              label={t("Dashboard.Profile.study.tellAboutYouStudyFramework")}
              fullWidth
              placeholder={t("Global.inputPlaceholder", {
                input: t(
                  "Dashboard.Profile.study.tellAboutYouStudyFramework"
                ).toLowerCase(),
              })}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} md={12} justify="flex-end">
            <Button variant="contained" color="primary">
              {t("Dashboard.ArvutSystem.requestAccess")}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ArvutSystem;
