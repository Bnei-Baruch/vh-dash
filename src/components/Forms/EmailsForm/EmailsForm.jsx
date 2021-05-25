import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, TextField, Typography } from '@material-ui/core';
import { commonFormStyles } from '../../../constants/formData';

const EmailsForm = ({
  handleChange,
  inputFields,
  isModified,
  onInputBlur,
  errorFields,
}) => {
  const classes = commonFormStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.root}>
      <Typography variant='h4' gutterBottom>
        {t('Dashboard.Profile.Emails.name')}
      </Typography>
      <Grid container spacing={10}>
        <Grid item xs={12} md={6}>
          <TextField
            disabled={!isModified}
            type='email'
            label={t('Dashboard.Profile.Emails.primaryEmail')}
            value={inputFields.primaryEmail}
            fullWidth
            placeholder={t('Global.inputPlaceholder', {
              input: 'primary email',
            })}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={event => handleChange('primaryEmail', event.target.value)}
            onBlur={() => onInputBlur('primaryEmail')}
            helperText={errorFields.primaryEmail}
            error={!!errorFields.primaryEmail}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            disabled={!isModified}
            type='email'
            label={t('Dashboard.Profile.Emails.alternativeEmail', {
              number: '1',
            })}
            value={inputFields.alternativeEmail1}
            fullWidth
            placeholder={t('Global.inputPlaceholder', {
              input: 'alternative email 1',
            })}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={event =>
              handleChange('alternativeEmail1', event.target.value)
            }
            onBlur={() => onInputBlur('alternativeEmail1')}
            helperText={errorFields.alternativeEmail1}
            error={!!errorFields.alternativeEmail1}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            disabled={!isModified}
            type='email'
            label={t('Dashboard.Profile.Emails.alternativeEmail', {
              number: '2',
            })}
            value={inputFields.alternativeEmail2}
            fullWidth
            placeholder={t('Global.inputPlaceholder', {
              input: 'alternative email 1',
            })}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={event =>
              handleChange('alternativeEmail2', event.target.value)
            }
            onBlur={() => onInputBlur('alternativeEmail2')}
            helperText={errorFields.alternativeEmail2}
            error={!!errorFields.alternativeEmail2}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default EmailsForm;
