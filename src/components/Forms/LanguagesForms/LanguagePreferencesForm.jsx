// Created 2 different language forms because it coulb be changed in the future
// TODO: remove this one and replace LanguagesForm component with passing props
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Typography } from '@material-ui/core';
import SelectElement from '../FormElements/SelectElement';
import { commonFormStyles, systemLanguages } from '../../../constants/formData';
import languages from '../../../constants/languages';

const LanguagePreferencesForm = ({ inputFields, handleChange, isModified }) => {
  const classes = commonFormStyles();
  const { t } = useTranslation();

  const { listening_language, reading_language, email_language } = inputFields;

  return (
    <div className={classes.root}>
      <Typography variant='h4'>
        {t('Dashboard.Profile.LanguagePreferences.name')}
      </Typography>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={6}>
          <SelectElement
            id='listening_language'
            disabled={!isModified}
            label={t('Dashboard.Profile.LanguagePreferences.listeningLanguage')}
            value={listening_language || ''}
            onChange={handleChange}
            selectData={languages}
            tooltipText={t(
              'Dashboard.Profile.LanguagePreferences.listeningTooltip',
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SelectElement
            id='reading_language'
            disabled={!isModified}
            label={t('Dashboard.Profile.LanguagePreferences.readingLanguage')}
            value={reading_language || ''}
            onChange={handleChange}
            selectData={languages}
            tooltipText={t(
              'Dashboard.Profile.LanguagePreferences.readingTooltip',
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SelectElement
            id='email_language'
            disabled={!isModified}
            label={t('Dashboard.Profile.LanguagePreferences.emailLanguage')}
            value={email_language || ''}
            onChange={handleChange}
            selectData={systemLanguages}
            tooltipText={t(
              'Dashboard.Profile.LanguagePreferences.emailTooltip',
            )}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default LanguagePreferencesForm;
