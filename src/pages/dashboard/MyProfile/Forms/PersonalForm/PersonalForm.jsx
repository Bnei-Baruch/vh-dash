import React from "react";
import { useTranslation } from "react-i18next";
import { Grid, InputLabel, TextField, Typography } from "@material-ui/core";
import SelectElement from "../FormElements/SelectElement";
import {
  commonFormStyles,
  genderData,
  maritalStatuses,
} from "../../../../../constants/formData";
import moment from "moment";
import MaskedInput from "react-text-mask";
import Input from "@material-ui/core/Input";
function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[
        /[1-9]/,
        /[1-9]/,
        "-",
        /[0-1]/,
        /[1-9]/,
        "-",
        /[1-9]/,
        /[1-9]/,
        /[1-9]/,
        /[1-9]/,
      ]}
      showMask
      placeholder="DD-MM-YYYY"
    />
  );
}
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

  const getDate = (date) => {
    return moment(date).isValid() ? moment(date).format("DD-MM-YYYY") : date;
  };

  console.log(date_of_birth);

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
        <Grid item xs={12} sm={6}>
          <InputLabel shrink>
            {t("Dashboard.Profile.PersonalForm.dateOfBirth") + ` (DD-MM-YYYY)`}
          </InputLabel>
          <Input
            fullWidth
            disabled={!isModified}
            onChange={(event) => {
              handleChange("date_of_birth", event.target.value);
            }}
            value={getDate(date_of_birth)}
            name="textmask"
            id="formatted-text-mask-input"
            inputComponent={TextMaskCustom}
          />
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
