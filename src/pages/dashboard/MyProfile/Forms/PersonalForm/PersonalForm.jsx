import React from "react";
import { useTranslation } from "react-i18next";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import SelectElement from "../FormElements/SelectElement";
import {
  commonFormStyles,
  genderData,
  maritalStatuses,
} from "../../../../../constants/formData";
import moment from "moment";
var month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const fullMonth = [
  "January",
  "March",
  "May",
  "July",
  "August",
  "October",
  "December",
];
const PersonalForm = ({ inputFields, handleChange, isModified }) => {
  const classes = commonFormStyles();
  const [maxDate, setMaxDate] = React.useState(31);
  const [monthsArray, setMonthsArray] = React.useState(month);
  const { t } = useTranslation();

  const {
    first_name_vernacular,
    last_name_vernacular,
    date_of_birth,
    gender,
    marital_status,
  } = inputFields;

  const getDateValue = (date, type) => {
    if (date === undefined || date === null) {
      return undefined;
    }
    date = date.split("T")[0];
    if (type === "date" && date) {
      return date.split("-").pop();
    } else if (type === "month" && date) {
      if (month[parseInt(date.split("-")[1]) - 1])
        return month[parseInt(date.split("-")[1]) - 1];
    } else {
      return date.split("-")[0];
    }
  };

  const dobChange = (type, value) => {
    let date = "";
    if (type === "date") {
      if (parseInt(value) === 31) {
        setMonthsArray(fullMonth);
      } else if (parseInt(value) > 28) {
        setMonthsArray(month.splice(month.indexOf("February")));
      } else {
        setMonthsArray(month);
      }
      date = `${getDateValue(date_of_birth, "year")}-${getDateValue(
        date_of_birth,
        "month"
      )}-${value}`;
    } else if (type === "month") {
      date = `${getDateValue(date_of_birth, "year")}-${
        month.indexOf(value) + 1
      }-${getDateValue(date_of_birth, "date")}`;
    } else {
      date = `${value}-${getDateValue(date_of_birth, "month")}-${getDateValue(
        date_of_birth,
        "date"
      )}`;
    }
    handleChange(
      "date_of_birth",
      moment(date).startOf("day").format("YYYY-MM-DD")
    );
  };

  React.useEffect(() => {
    if (inputFields && inputFields.date_of_birth) {
      let date = inputFields.date_of_birth.split("T")[0];
      if (
        !fullMonth.includes(month[parseInt(date.split("-")[1]) - 1]) &&
        parseInt(date.split("-")[1]) - 1 !== 1
      ) {
        setMaxDate(30);
      } else if (parseInt(date.split("-")[1]) - 1 === 1) {
        setMaxDate(28);
      } else {
        setMaxDate(31);
      }
    }
  }, [inputFields]);

  return (
    <div className={classes.root}>
      <Typography variant="h4">
        {t("Dashboard.Profile.PersonalForm.name")}
      </Typography>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={6}>
          <TextField
            InputProps={{ disableUnderline: !isModified ? true : false }}
            disabled={!isModified}
            type="text"
            label={t("Dashboard.Profile.PersonalForm.firstName")}
            value={first_name_vernacular || ""}
            fullWidth
            placeholder={t(
              "Dashboard.Profile.PersonalForm.firstNamePlaceholder"
            )}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(event) =>
              handleChange("first_name_vernacular", event.target.value)
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            InputProps={{ disableUnderline: !isModified ? true : false }}
            disabled={!isModified}
            type="text"
            label={t("Dashboard.Profile.PersonalForm.lastName")}
            value={last_name_vernacular || ""}
            fullWidth
            placeholder={t(
              "Dashboard.Profile.PersonalForm.lastNamePlaceholder"
            )}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(event) =>
              handleChange("last_name_vernacular", event.target.value)
            }
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-outlined-label">Date</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={date_of_birth ? getDateValue(date_of_birth, "date") : 1}
              onChange={(e) => dobChange("date", e.target.value)}
              label="Date"
              disabled={!isModified ? true : false}
              disableUnderline={!isModified ? true : false}
            >
              {[...Array(maxDate - 1 + 1).keys()]
                .map((i) => i + 1)
                .map((i) => (
                  <MenuItem value={i}>{i}</MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={2}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-outlined-label">
              Month
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={
                date_of_birth ? getDateValue(date_of_birth, "month") : "January"
              }
              onChange={(e) => dobChange("month", e.target.value)}
              label="Age"
              disabled={!isModified ? true : false}
              disableUnderline={!isModified ? true : false}
            >
              {monthsArray.map((i) => (
                <MenuItem value={i}>{i}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={2}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-outlined-label">Year</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={date_of_birth ? getDateValue(date_of_birth, "year") : 1990}
              onChange={(e) => dobChange("year", e.target.value)}
              label="Age"
              disabled={!isModified ? true : false}
              disableUnderline={!isModified ? true : false}
            >
              {[...Array(2022 - 1990 + 1).keys()]
                .map((i) => i + 1990)
                .map((i) => (
                  <MenuItem value={i}>{i}</MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <SelectElement
            id="marital_status"
            disabled={!isModified}
            label={t("Dashboard.Profile.PersonalForm.maritalStatus.label")}
            value={marital_status}
            onChange={handleChange}
            selectData={maritalStatuses}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SelectElement
            id="gender"
            disabled={!isModified}
            label={t("Dashboard.Profile.PersonalForm.gender.label")}
            value={gender}
            onChange={handleChange}
            selectData={genderData}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default PersonalForm;
