import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, TextField, Typography } from '@material-ui/core';
import SelectElement from '../FormElements/SelectElement';
import { commonFormStyles, studyGroup } from '../../../constants/formData';

const TenForm = ({
  inputFields,
  errorFields,
  onInputBlur,
  handleChange,
  isModified,
}) => {
  const classes = commonFormStyles();
  const { t } = useTranslation();

  const { isStudyGroup, isWantStudyGroup, tenName } = inputFields;

  return (
    <div className={classes.root}>
      <Typography variant='h4'>
        {t('Dashboard.Profile.OtherInformation.ten')}
      </Typography>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={6}>
          <SelectElement
            id='isStudyGroup'
            disabled={!isModified}
            label={t('Dashboard.Profile.OtherInformation.studyGroup')}
            value={isStudyGroup}
            onChange={handleChange}
            selectData={studyGroup}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SelectElement
            id='isWantStudyGroup'
            disabled={!isModified}
            label={t('Dashboard.Profile.OtherInformation.wantStudyGroup')}
            value={isWantStudyGroup}
            onChange={handleChange}
            selectData={studyGroup}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled={!isModified}
            type='text'
            label={t('Dashboard.Profile.OtherInformation.tenName')}
            value={tenName}
            fullWidth
            placeholder={t('Global.inputPlaceholder', {
              input: 'name of ten',
            })}
            error={!!errorFields.tenName.length}
            helperText={errorFields.tenName}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={event => handleChange('tenName', event.target.value)}
            onBlur={() => onInputBlur('tenName')}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default TenForm;
