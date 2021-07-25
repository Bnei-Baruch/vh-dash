import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Typography } from '@material-ui/core';
import SelectElement from '../FormElements/SelectElement';
import { commonFormStyles } from '../../../../../constants/formData';
import languages from '../../../../../constants/languages';

const LanguagesForm = ({ inputFields, handleChange, isModified }) => {
  const classes = commonFormStyles();
  const { t } = useTranslation();

  const {
    first_language,
    other_language_1,
    other_language_2,
    other_language_3,
    other_language_4,
  } = inputFields;

  return (
    <div className={classes.root}>
      <Typography variant='h4'>
        {t('Dashboard.Profile.Languages.name')}
      </Typography>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={6}>
          <SelectElement
            id='first_language'
            disabled={!isModified}
            label={t('Dashboard.Profile.Languages.firstLanguage')}
            value={first_language || ''}
            onChange={handleChange}
            selectData={languages}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SelectElement
            id='other_language_1'
            disabled={!isModified}
            label={t('Dashboard.Profile.Languages.otherLanguage', {
              number: '1',
            })}
            value={other_language_1 || ''}
            onChange={handleChange}
            selectData={languages}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SelectElement
            id='other_language_2'
            disabled={!isModified}
            label={t('Dashboard.Profile.Languages.otherLanguage', {
              number: '2',
            })}
            value={other_language_2 || ''}
            onChange={handleChange}
            selectData={languages}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SelectElement
            id='other_language_3'
            disabled={!isModified}
            label={t('Dashboard.Profile.Languages.otherLanguage', {
              number: '3',
            })}
            value={other_language_3 || ''}
            onChange={handleChange}
            selectData={languages}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SelectElement
            id='other_language_4'
            disabled={!isModified}
            label={t('Dashboard.Profile.Languages.otherLanguage', {
              number: '4',
            })}
            value={other_language_4 || ''}
            onChange={handleChange}
            selectData={languages}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default LanguagesForm;
