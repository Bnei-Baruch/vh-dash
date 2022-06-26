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
import { profileInfo } from "../../../redux/selectors/profile";
import { useSelector } from "react-redux";
import { keycloakData } from "../../../redux/selectors/user";
import CancelIcon from "@material-ui/icons/Cancel";
import {
  requestAccessToArvut,
  getArvutStatus,
} from "../../../services/arvut.service";
import styled from "styled-components";
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

const StatusArea = styled(Grid)`
  background: rgba(255, 190, 146, 0.38);
  border-radius: 3px;
  overflow: hidden;
  padding: 20px !important;
  margin: 10px !important;
  display: flex;
  align-items: center;
  font-weight: bold;
  color: #979797;

  svg {
    color: #979797;
    font-size: 40px;
    margin-right: 20px;
  }
`;
const ArvutSystem = () => {
  const { t, i18n } = useTranslation();
  const textAlignProps = i18n.dir() === "rtl" ? "right" : "left";
  const keycloak = useSelector(keycloakData);
  const profileData = useSelector(profileInfo);
  const [note, setNote] = React.useState("");
  const [submittedRequest, setSubmittedRequest] = React.useState(undefined);
  const requestAccess = () => {
    const body = {
      name: keycloak.profile.firstName + " " + keycloak.profile.lastName,
      keycloak_id: keycloak.subject,
      status: "REQUESTED",
      request_note: note,
    };
    requestAccessToArvut(body).then((res) => console.log(res));
  };
  const getRequestStatus = () => {
    getArvutStatus(keycloak.subject).then((res) => {
      if (res && res.length > 0) {
        setSubmittedRequest(res[0]);
      }
    });
  };
  React.useEffect(() => {
    if (keycloak && keycloak.subject) {
      getRequestStatus();
    }
  });

  const styles = useStyles({ textAlignProps });

  const navigateAsGuest = () => {
    var win = window.open("https://arvut.kli.one", "_blank");
    win.focus();
  };
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
          <Button variant="contained" color="primary" onClick={navigateAsGuest}>
            {t("Dashboard.ArvutSystem.continueAsGuest")}
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h5">
          {t("Dashboard.ArvutSystem.requestAccess")}
        </Typography>
        <br />
        {submittedRequest && (
          <>
            <Grid container spacing={8}>
              <Grid item xs={12}>
                <Typography variant="body">
                  {t("Dashboard.ArvutSystem.request_submitted")}
                </Typography>
              </Grid>

              <StatusArea item xs={12}>
                <span>
                  {submittedRequest.status === "REQUESTED" ? (
                    <svg
                      width="36"
                      height="42"
                      viewBox="0 0 36 42"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M26 22C20.48 22 16 26.48 16 32C16 37.52 20.48 42 26 42C31.52 42 36 37.52 36 32C36 26.48 31.52 22 26 22ZM29.3 36.7L25 32.4V26H27V31.58L30.7 35.28L29.3 36.7ZM28 4H21.64C20.8 1.68 18.6 0 16 0C13.4 0 11.2 1.68 10.36 4H4C1.8 4 0 5.8 0 8V38C0 40.2 1.8 42 4 42H16.22C15.04 40.86 14.08 39.5 13.38 38H4V8H8V14H24V8H28V18.16C29.42 18.36 30.76 18.78 32 19.36V8C32 5.8 30.2 4 28 4ZM16 8C14.9 8 14 7.1 14 6C14 4.9 14.9 4 16 4C17.1 4 18 4.9 18 6C18 7.1 17.1 8 16 8Z"
                        fill="#979797"
                      />
                    </svg>
                  ) : (
                    <CancelIcon />
                  )}
                </span>
                <Typography variant="body">
                  Status: {submittedRequest.status}
                </Typography>
              </StatusArea>
              <Grid item xs={12}>
                <Typography variant="body">
                  {t("Dashboard.ArvutSystem.request_submitted_text")}
                </Typography>
              </Grid>
            </Grid>
          </>
        )}
        {!submittedRequest && (
          <>
            {" "}
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
                  value={profileData.first_name_vernacular}
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
                  value={profileData.last_name_vernacular}
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
                  value={profileData.primary_email}
                  label={t("Dashboard.Profile.Emails.primaryEmail")}
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
                  value={profileData.alternate_email_1}
                  label={t("Dashboard.Profile.Emails.alternativeEmail", {
                    number: "1",
                  })}
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
                  <img
                    src={Phone}
                    alt="phone"
                    style={{ width: 22, height: 22 }}
                  />
                </Grid>
                <Grid item xs={10}>
                  <MuiPhoneInput
                    defaultCountry="us"
                    value={profileData.mobile_number}
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
                    value={profileData.whats_app_number}
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
                  disabled
                  value={profileData.country}
                  label={t("Dashboard.Profile.PhysicalLocationForm.country")}
                  selectData={countries}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  type="text"
                  value={profileData.city}
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
                  value={profileData.name_of_ten_group}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  type="text"
                  label={t(
                    "Dashboard.Profile.study.tellAboutYouStudyFramework"
                  )}
                  fullWidth
                  placeholder={t("Global.inputPlaceholder", {
                    input: t(
                      "Dashboard.Profile.study.tellAboutYouStudyFramework"
                    ).toLowerCase(),
                  })}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={12} justify="flex-end">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => requestAccess()}
                >
                  {t("Dashboard.ArvutSystem.requestAccess")}
                </Button>
              </Grid>
            </Grid>
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default ArvutSystem;
