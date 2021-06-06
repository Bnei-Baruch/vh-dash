import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, TextField, Typography } from '@material-ui/core';
import SelectElement from '../FormElements/SelectElement';
import countries from '../../../constants/countries';
import { commonFormStyles } from '../../../constants/formData';

const PhysicalLocationForm = ({ handleChange, inputFields, isModified }) => {
  const { t } = useTranslation();
  const classes = commonFormStyles();

  const { streetAddress, stateRegion, postalCode, country, city } = inputFields;

  return (
    <div className={classes.root}>
      <Typography variant='h4'>
        {t('Dashboard.Profile.PhysicalLocationForm.name')}
      </Typography>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled={!isModified}
            type='text'
            label={t('Dashboard.Profile.PhysicalLocationForm.streetAddress')}
            value={streetAddress || ''}
            fullWidth
            placeholder={t('Global.inputPlaceholder', { input: 'street' })}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={event =>
              handleChange('streetAddress', event.target.value)
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled={!isModified}
            type='text'
            label={t('Dashboard.Profile.PhysicalLocationForm.postalCode')}
            value={postalCode || ''}
            fullWidth
            placeholder={t('Global.inputPlaceholder', { input: 'postal code' })}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={event => handleChange('postalCode', event.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SelectElement
            id='country'
            disabled={!isModified}
            label={t('Dashboard.Profile.PhysicalLocationForm.country')}
            value={country}
            onChange={handleChange}
            selectData={countries}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled={!isModified}
            type='text'
            label={t('Dashboard.Profile.PhysicalLocationForm.stateRegion')}
            value={stateRegion || ''}
            fullWidth
            placeholder={t('Global.inputPlaceholder', {
              input: 'state or region',
            })}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={event => handleChange('stateRegion', event.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled={!isModified}
            type='text'
            label={t('Dashboard.Profile.PhysicalLocationForm.city')}
            value={city || ''}
            fullWidth
            placeholder={t('Global.inputPlaceholder', {
              input: 'city',
            })}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={event => handleChange('city', event.target.value)}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default PhysicalLocationForm;
