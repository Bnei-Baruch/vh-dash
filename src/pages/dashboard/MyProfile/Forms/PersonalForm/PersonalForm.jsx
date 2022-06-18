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
import { DatePicker } from "@material-ui/pickers";
import SelectElement from "../FormElements/SelectElement";
import {
  commonFormStyles,
  genderData,
  maritalStatuses,
} from "../../../../../constants/formData";
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
const PersonalForm = ({ inputFields, handleChange, isModified }) => {
  const classes = commonFormStyles();
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
    if (type === 'date' && date) {
      console.log(date.split('-').pop())
      return date.split('-').pop()
    } else if (type == "month" && date) {
      console.log([date.split('-')[1]])
      return month[parseInt(date.split('-')[1])]
    } else {
      console.log(date.split('-')[0])
      return date.split('-')[0]
    }
  }

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
              value={date_of_birth ? getDateValue(date_of_birth, 'date') : 1}
              onChange={(e) => handleChange("date_of_birth", e.target.value)}
              label="Age"
            >
              {[...Array(31 - 1 + 1).keys()]
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
              value={date_of_birth ? getDateValue(date_of_birth, 'month') : 'January'}
              onChange={(e) => handleChange("date_of_birth", e.target.value)}
              label="Age"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {month.map((i) => (
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
              value={date_of_birth ? getDateValue(date_of_birth, 'year') : 1990}
              onChange={(e) => handleChange("date_of_birth", e.target.value)}
              label="Age"
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
