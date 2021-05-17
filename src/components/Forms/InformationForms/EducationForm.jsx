import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, TextField, Typography } from '@material-ui/core';
import { commonFormStyles } from '../../../constants/formData';

const EducationForm = ({
  inputFields,
  errorFields,
  handleChange,
  onInputBlur,
  isModified,
}) => {
  const classes = commonFormStyles();
  const { t } = useTranslation();

  const { startYear, endYear, studyFramework } = inputFields;

  return (
    <div className={classes.root}>
      <Typography variant='h4'>
        {t('Dashboard.Profile.OtherInformation.education')}
      </Typography>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled={!isModified}
            type='date'
            label={t('Dashboard.Profile.OtherInformation.startYear')}
            value={startYear}
            fullWidth
            placeholder={t('Global.inputPlaceholder', {
              input: 'start year',
            })}
            error={!!errorFields.startYear.length}
            helperText={errorFields.startYear}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={event => handleChange('startYear', event.target.value)}
            onBlur={() => onInputBlur('startYear')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled={!isModified}
            type='date'
            label={t('Dashboard.Profile.OtherInformation.endYear')}
            value={endYear}
            fullWidth
            placeholder={t('Global.inputPlaceholder', {
              input: 'end year',
            })}
            error={!!errorFields.endYear.length}
            helperText={errorFields.endYear}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={event => handleChange('endYear', event.target.value)}
            onBlur={() => onInputBlur('endYear')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled={!isModified}
            type='text'
            label={t('Dashboard.Profile.OtherInformation.studyFramework')}
            value={studyFramework}
            fullWidth
            placeholder={t('Global.inputPlaceholder', {
              input: 'study framework',
            })}
            error={!!errorFields.studyFramework.length}
            helperText={errorFields.studyFramework}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={event =>
              handleChange('studyFramework', event.target.value)
            }
            onBlur={() => onInputBlur('studyFramework')}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default EducationForm;
