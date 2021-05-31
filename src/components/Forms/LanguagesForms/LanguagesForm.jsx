import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Typography } from '@material-ui/core';
import SelectElement from '../FormElements/SelectElement';
import { commonFormStyles } from '../../../constants/formData';
import languages from '../../../constants/languages';

const LanguagesForm = ({ inputFields, handleChange, isModified }) => {
  const classes = commonFormStyles();
  const { t } = useTranslation();

  const { firstLanguage, language1, language2, language3 } = inputFields;

  return (
    <div className={classes.root}>
      <Typography variant='h4'>
        {t('Dashboard.Profile.Languages.name')}
      </Typography>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={6}>
          <SelectElement
            id='firstLanguage'
            disabled={!isModified}
            label={t('Dashboard.Profile.Languages.firstLanguage')}
            value={firstLanguage}
            onChange={handleChange}
            selectData={languages}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SelectElement
            id='language1'
            disabled={!isModified}
            label={t('Dashboard.Profile.Languages.otherLanguage', {
              number: '1',
            })}
            value={language1}
            onChange={handleChange}
            selectData={languages}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SelectElement
            id='language2'
            disabled={!isModified}
            label={t('Dashboard.Profile.Languages.otherLanguage', {
              number: '2',
            })}
            value={language2}
            onChange={handleChange}
            selectData={languages}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SelectElement
            id='language3'
            disabled={!isModified}
            label={t('Dashboard.Profile.Languages.otherLanguage', {
              number: '3',
            })}
            value={language3}
            onChange={handleChange}
            selectData={languages}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default LanguagesForm;
