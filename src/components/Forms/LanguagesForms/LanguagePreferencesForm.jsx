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

  const { emailLanguage, listeningLanguage, readingLanguage } = inputFields;

  return (
    <div className={classes.root}>
      <Typography variant='h4'>
        {t('Dashboard.Profile.LanguagePreferences.name')}
      </Typography>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={6}>
          <SelectElement
            id='listeningLanguage'
            disabled={!isModified}
            label={t('Dashboard.Profile.LanguagePreferences.listeningLanguage')}
            value={listeningLanguage || ''}
            onChange={handleChange}
            selectData={languages}
            tooltipText={t(
              'Dashboard.Profile.LanguagePreferences.listeningTooltip',
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SelectElement
            id='readingLanguage'
            disabled={!isModified}
            label={t('Dashboard.Profile.LanguagePreferences.readingLanguage')}
            value={readingLanguage || ''}
            onChange={handleChange}
            selectData={languages}
            tooltipText={t(
              'Dashboard.Profile.LanguagePreferences.readingTooltip',
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SelectElement
            id='emailLanguage'
            disabled={!isModified}
            label={t('Dashboard.Profile.LanguagePreferences.emailLanguage')}
            value={emailLanguage || ''}
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
