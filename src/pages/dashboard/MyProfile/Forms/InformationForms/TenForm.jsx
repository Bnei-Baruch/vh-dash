import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, TextField, Typography } from '@material-ui/core';
import SelectElement from '../FormElements/SelectElement';
import {
  commonFormStyles,
  studyGroup,
} from '../../../../../constants/formData';

const TenForm = ({ inputFields, handleChange, isModified }) => {
  const classes = commonFormStyles();
  const { t } = useTranslation();

  const { has_ten_group, wants_ten_group, name_ten_group } = inputFields;
  const tenNameTrans = t('Dashboard.Profile.OtherInformation.tenName');

  return (
    <div className={classes.root}>
      <Typography variant='h4'>
        {t('Dashboard.Profile.OtherInformation.ten')}
      </Typography>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={6}>
          <SelectElement
            id='has_ten_group'
            disabled={!isModified}
            label={t('Dashboard.Profile.OtherInformation.studyGroup')}
            value={has_ten_group}
            onChange={handleChange}
            selectData={studyGroup}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SelectElement
            id='wants_ten_group'
            disabled={!isModified}
            label={t('Dashboard.Profile.OtherInformation.wantStudyGroup')}
            value={wants_ten_group}
            onChange={handleChange}
            selectData={studyGroup}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled={!isModified}
            type='text'
            label={tenNameTrans}
            value={name_ten_group || ''}
            fullWidth
            placeholder={t('Global.inputPlaceholder', {
              input: tenNameTrans.toLowerCase(),
            })}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={event =>
              handleChange('name_ten_group', event.target.value)
            }
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default TenForm;
