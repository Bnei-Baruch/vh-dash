import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, TextField, Typography } from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import { commonFormStyles } from '../../../../../constants/formData';

const EducationForm = ({ inputFields, handleChange, isModified }) => {
  const classes = commonFormStyles();
  const { t } = useTranslation();

  const { study_start_year, study_framework } = inputFields;
  const convertedStudyYear = study_start_year && study_start_year.toString();

  return (
    <div className={`${classes.root} ${classes.height_100}`}>
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
            value={convertedStudyYear}
            disabled={!isModified}
            onChange={value => handleChange('study_start_year', value)}
            animateYearScrolling
            autoOk
            openTo='year'
            maxDate={new Date('2050-01-01')}
            minDate={new Date('1990-01-01')}
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
            value={study_framework || ''}
            fullWidth
            placeholder={t('Global.inputPlaceholder', {
              input: 'study framework',
            })}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={event =>
              handleChange('study_framework', event.target.value)
            }
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default EducationForm;
