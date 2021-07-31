import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, TextField, Typography } from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import SelectElement from '../FormElements/SelectElement';
import {
  commonFormStyles,
  genderData,
  maritalStatuses,
} from '../../../../../constants/formData';

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
            value={first_name_vernacular || ''}
            fullWidth
            placeholder={t(
              'Dashboard.Profile.PersonalForm.firstNamePlaceholder',
            )}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={event => handleChange('first_name_vernacular', event.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled={!isModified}
            type='text'
            label={t('Dashboard.Profile.PersonalForm.lastName')}
            value={last_name_vernacular || ''}
            fullWidth
            placeholder={t(
              'Dashboard.Profile.PersonalForm.lastNamePlaceholder',
            )}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={event => handleChange('last_name_vernacular', event.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatePicker
            autoOk
            orientation='landscape'
            openTo='date'
            value={date_of_birth}
            disableFuture
            onChange={value => handleChange('date_of_birth', value)}
            label={t('Dashboard.Profile.PersonalForm.dateOfBirth')}
            fullWidth
            disabled={!isModified}
            format='dd.mm.yyyy'
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SelectElement
            id='marital_status'
            disabled={!isModified}
            label={t('Dashboard.Profile.PersonalForm.maritalStatus.label')}
            value={marital_status}
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
