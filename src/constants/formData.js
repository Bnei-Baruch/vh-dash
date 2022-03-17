import { makeStyles } from "@material-ui/core";
import i18next from "i18next";

export const commonFormStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(5),
    backgroundColor: theme.palette.background.paper,
    "& .MuiTypography-root": {
      marginBottom: theme.spacing(4),
      fontSize: 18,
    },
    "& .MuiInputBase-input": {
      fontSize: 16,
    },
    "& .MuiInputLabel-root": {
      color: "#263238",
      fontSize: 18,
      position: "relative",
      width: "fit-content",
      "&.Mui-error": {
        color: "#f44336",
      },
      "& + .MuiInput-formControl": {
        marginTop: 0,
      },
    },
  },
  emailForm: {
    marginBottom: "6px",
  },
  socialForm: {
    marginTop: "6px",
  },
  height_100: {
    height: "100%",
  },
}));

export const systemLanguages = [
  { code: "en", label: i18next.t("Languages.English") },
  { code: "fr", label: i18next.t("Languages.French") },
  { code: "ru", label: i18next.t("Languages.Russian") },
  { code: "es", label: i18next.t("Languages.Spanish") },
  { code: "he", label: i18next.t("Languages.Hebrew") },
];

export const studyGroup = [
  { code: true, label: i18next.t("Global.yes") },
  { code: false, label: i18next.t("Global.no") },
];

export const currencyData = [
  { code: "USD", label: i18next.t("Global.Currency.usd") },
  { code: "EUR", label: i18next.t("Global.Currency.eur") },
];

export const subscriptionData = [
  { code: "active", label: i18next.t("UserMenu.statuses.active") },
  { code: "hold", label: i18next.t("UserMenu.statuses.hold") },
  { code: "late", label: i18next.t("UserMenu.statuses.late") },
  {
    code: "nonExistant",
    label: i18next.t("UserMenu.statuses.nonExistant"),
  },
  { code: "Unknown", label: i18next.t("UserMenu.statuses.unknown") },
];

export const genderData = [
  {
    code: "male",
    label: i18next.t("Dashboard.Profile.PersonalForm.gender.male"),
  },
  {
    code: "female",
    label: i18next.t("Dashboard.Profile.PersonalForm.gender.female"),
  },
];

export const maritalStatuses = [
  {
    code: "Single",
    label: i18next.t("Dashboard.Profile.PersonalForm.maritalStatus.single"),
  },
  {
    code: "Married",
    label: i18next.t("Dashboard.Profile.PersonalForm.maritalStatus.married"),
  },
  {
    code: "Divorced",
    label: i18next.t("Dashboard.Profile.PersonalForm.maritalStatus.divorced"),
  },
  {
    code: "Widowed",
    label: i18next.t("Dashboard.Profile.PersonalForm.maritalStatus.widowed"),
  },
];
