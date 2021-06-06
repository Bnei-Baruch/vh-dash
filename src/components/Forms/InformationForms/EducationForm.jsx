import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, TextField, Typography } from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import { commonFormStyles } from '../../../constants/formData';

const EducationForm = ({ inputFields, handleChange, isModified }) => {
  const classes = commonFormStyles();
  const { t } = useTranslation();

  const { startYear, studyFramework } = inputFields;

  return (
    <div className={classes.root}>
      <Typography variant='h4'>
        {t('Dashboard.Profile.OtherInformation.education')}
      </Typography>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={6}>
          <DatePicker
            views={['year']}
            label={t('Global.inputPlaceholder', {
              input: 'start year',
            })}
            value={startYear}
            disabled={!isModified}
            onChange={value => handleChange('startYear', value)}
            animateYearScrolling
            autoOk
            openTo='year'
            maxDate={new Date('2050-01-01')}
            minDate={new Date('2010-01-01')}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled={!isModified}
            type='text'
            label={t('Dashboard.Profile.OtherInformation.studyFramework')}
            value={studyFramework || ''}
            fullWidth
            placeholder={t('Global.inputPlaceholder', {
              input: 'study framework',
            })}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={event =>
              handleChange('studyFramework', event.target.value)
            }
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default EducationForm;
