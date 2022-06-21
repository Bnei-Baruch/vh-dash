import React from "react";
import { useTranslation } from "react-i18next";
import { Grid, TextField, Typography } from "@material-ui/core";
import { DatePicker } from "@material-ui/pickers";
import { commonFormStyles } from "../../../../../constants/formData";

const EducationForm = ({ inputFields, handleChange, isModified }) => {
  const classes = commonFormStyles();
  const { t } = useTranslation();

  const { study_start_year, study_framework } = inputFields;
  const convertedStudyYear = study_start_year && study_start_year.toString();

  const onYearChange = (value) => {
    const year = new Date(value).getFullYear();
    handleChange("study_start_year", +year);
  };

  const startYearTrans = t("Dashboard.Profile.OtherInformation.startYear");
  const studyFrameworkTrans = t(
    "Dashboard.Profile.OtherInformation.studyFramework"
  );

  return (
    <div className={`${classes.root} ${classes.height_100}`}>
      <Typography variant="h4">
        {t("Dashboard.Profile.OtherInformation.education")}
      </Typography>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={6}>
          <DatePicker
            views={["year"]}
            label={startYearTrans}
            placeholder={t("Global.inputPlaceholder", {
              input: startYearTrans.toLowerCase(),
            })}
            InputProps={{ disableUnderline: !isModified ? true : false }}
            value={convertedStudyYear}
            disabled={!isModified}
            onChange={onYearChange}
            disableToolbar
            initialFocusedDate={new Date("1990-01-01")}
            autoOk
            openTo="year"
            maxDate={new Date("2050-01-01")}
            minDate={new Date("1990-01-01")}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled={!isModified}
            type="text"
            label={studyFrameworkTrans}
            value={study_framework || ""}
            fullWidth
            placeholder={t("Global.inputPlaceholder", {
              input: studyFrameworkTrans.toLowerCase(),
            })}
            InputProps={{
              disableUnderline: !isModified ? true : false
            }}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(event) =>
              handleChange("study_framework", event.target.value)
            }
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default EducationForm;
