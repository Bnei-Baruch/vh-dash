import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, TextField, Typography } from '@material-ui/core';
import SelectElement from '../FormElements/SelectElement';
import countries from '../../../../../constants/countries';
import { commonFormStyles } from '../../../../../constants/formData';

const PhysicalLocationForm = ({ handleChange, inputFields, isModified }) => {
  const { t } = useTranslation();
  const classes = commonFormStyles();

  const { street_address, state_region, postal_code, country, city } =
    inputFields;
  const streetAddressTrans = t(
    'Dashboard.Profile.PhysicalLocationForm.streetAddress',
  );
  const postalCodeTrans = t(
    'Dashboard.Profile.PhysicalLocationForm.postalCode',
  );
  const stateRegionTrans = t(
    'Dashboard.Profile.PhysicalLocationForm.stateRegion',
  );
  const cityTrans = t('Dashboard.Profile.PhysicalLocationForm.city');

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
            label={streetAddressTrans}
            value={street_address || ''}
            fullWidth
            placeholder={t('Global.inputPlaceholder', {
              input: streetAddressTrans.toLowerCase(),
            })}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={event =>
              handleChange('street_address', event.target.value)
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled={!isModified}
            type='text'
            label={postalCodeTrans}
            value={postal_code || ''}
            fullWidth
            placeholder={t('Global.inputPlaceholder', {
              input: postalCodeTrans.toLowerCase(),
            })}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={event => handleChange('postal_code', event.target.value)}
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
            label={stateRegionTrans}
            value={state_region || ''}
            fullWidth
            placeholder={t('Global.inputPlaceholder', {
              input: stateRegionTrans.toLowerCase(),
            })}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={event => handleChange('state_region', event.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled={!isModified}
            type='text'
            label={cityTrans}
            value={city || ''}
            fullWidth
            placeholder={t('Global.inputPlaceholder', {
              input: cityTrans.toLowerCase(),
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
