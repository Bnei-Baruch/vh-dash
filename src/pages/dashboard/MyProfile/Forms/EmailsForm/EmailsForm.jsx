import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, TextField, Typography } from '@material-ui/core';
import { commonFormStyles } from '../../../../../constants/formData';

const EmailsForm = ({
  handleChange,
  inputFields,
  isModified,
  onInputBlur,
  errorFields,
}) => {
  const classes = commonFormStyles();
  const { t } = useTranslation();

  const primaryEmailTrans = t('Dashboard.Profile.Emails.primaryEmail');
  const alternativeEmail1Trans = t(
    'Dashboard.Profile.Emails.alternativeEmail',
    {
      number: '1',
    },
  );
  const alternativeEmail2Trans = t(
    'Dashboard.Profile.Emails.alternativeEmail',
    {
      number: '2',
    },
  );

  return (
    <div className={`${classes.root}  ${classes.emailForm}`}>
      <Typography variant='h4' gutterBottom>
        {t('Dashboard.Profile.Emails.name')}
      </Typography>
      <Grid container spacing={10}>
        <Grid item xs={12} md={6}>
          <TextField
            disabled
            type='email'
            label={primaryEmailTrans}
            value={inputFields.primary_email}
            fullWidth
            placeholder={t('Global.inputPlaceholder', {
              input: primaryEmailTrans.toLowerCase(),
            })}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={event =>
              handleChange('primary_email', event.target.value)
            }
            onBlur={() => onInputBlur('primary_email')}
            helperText={errorFields.primary_email}
            error={!!errorFields.primary_email}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            disabled={!isModified}
            type='email'
            label={alternativeEmail1Trans}
            value={inputFields.alternate_email_1 || ''}
            fullWidth
            placeholder={t('Global.inputPlaceholder', {
              input: alternativeEmail1Trans.toLowerCase(),
            })}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={event =>
              handleChange('alternate_email_1', event.target.value)
            }
            onBlur={() => onInputBlur('alternate_email_1')}
            helperText={errorFields.alternate_email_1}
            error={!!errorFields.alternate_email_1}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            disabled={!isModified}
            type='email'
            label={alternativeEmail2Trans}
            value={inputFields.alternate_email_2 || ''}
            fullWidth
            placeholder={t('Global.inputPlaceholder', {
              input: alternativeEmail2Trans.toLowerCase(),
            })}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={event =>
              handleChange('alternate_email_2', event.target.value)
            }
            onBlur={() => onInputBlur('alternate_email_2')}
            helperText={errorFields.alternate_email_2}
            error={!!errorFields.alternate_email_2}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default EmailsForm;
