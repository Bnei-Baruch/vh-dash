import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, TextField, Typography } from '@material-ui/core';
import SelectElement from '../FormElements/SelectElement';
import {
  commonFormStyles,
  genderData,
  maritalStatuses,
} from '../../../constants/formData';

const PersonalForm = ({
  errorFields,
  inputFields,
  onInputBlur,
  handleChange,
  isModified,
}) => {
  const classes = commonFormStyles();
  const { t } = useTranslation();

  const { firstname, lastname, dob, gender, maritalStatus } = inputFields;

  return (
    <div className={classes.root}>
      <Typography variant='h4'>
        {t('Dashboard.Profile.PersonalForm.name')}
      </Typography>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled={!isModified}
            type='text'
            label={t('Dashboard.Profile.PersonalForm.firstName')}
            value={firstname}
            fullWidth
            placeholder={t(
              'Dashboard.Profile.PersonalForm.firstNamePlaceholder',
            )}
            error={!!errorFields.firstname.length}
            helperText={errorFields.firstname}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={event => handleChange('firstname', event.target.value)}
            onBlur={() => onInputBlur('firstname')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled={!isModified}
            type='text'
            label={t('Dashboard.Profile.PersonalForm.lastName')}
            value={lastname}
            fullWidth
            placeholder={t(
              'Dashboard.Profile.PersonalForm.lastNamePlaceholder',
            )}
            error={!!errorFields.lastname.length}
            helperText={errorFields.lastname}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={event => handleChange('lastname', event.target.value)}
            onBlur={() => onInputBlur('lastname')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled={!isModified}
            type='date'
            label={t('Dashboard.Profile.PersonalForm.dateOfBirth')}
            value={dob}
            fullWidth
            placeholder={t(
              'Dashboard.Profile.PersonalForm.dateOfBirthPlaceholder',
            )}
            error={!!errorFields.dob.length}
            helperText={errorFields.dob}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={event => handleChange('dob', event.target.value)}
            onBlur={() => onInputBlur('dob')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SelectElement
            id='maritalStatus'
            disabled={!isModified}
            label={t('Dashboard.Profile.PersonalForm.maritalStatus.label')}
            value={maritalStatus}
            onChange={handleChange}
            selectData={maritalStatuses}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SelectElement
            id='gender'
            disabled={!isModified}
            label={t('Dashboard.Profile.PersonalForm.gender.label')}
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
