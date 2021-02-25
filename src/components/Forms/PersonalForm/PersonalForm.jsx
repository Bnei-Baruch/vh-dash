import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Grid, TextField, Typography } from '@material-ui/core';
import SelectElement from '../FormElements/SelectElement';
import countries from '../../../constants/countries';
import validator from '../../../helpers/validator';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(5),
    backgroundColor: theme.palette.background.paper,
    '& .MuiTypography-root': {
      marginBottom: theme.spacing(4),
      fontSize: '14px',
    },
    '& .MuiInputLabel-root': {
      color: '#263238',
      '&.Mui-error': {
        color: '#f44336',
      },
    },
  },
  errorMsg: {
    position: 'absolute',
    top: 0,
  },
}));

const initialFields = {
  firstname: '',
  dob: '',
  gender: '',
  fullname: '',
  lastname: '',
  country: '',
  primaryLanguage: '',
  phone: '',
};

const initialErrorFields = {
  firstname: [],
  dob: [],
  gender: [],
  fullname: [],
  lastname: [],
  country: [],
  primaryLanguage: [],
  phone: [],
};

const PersonalForm = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  
  const languages = [
    { code: 'English', label: t('Languages.English') },
    { code: 'Russian', label: t('Languages.Russian') },
    { code: 'Spanish', label: t('Languages.Spanish') },
    { code: 'Hebrew', label: t('Languages.Hebrew') },
  ];

  const genderData = [
    { code: 'male', label: i18next.t('Dashboard.Profile.PersonalForm.gender.male') },
    {
      code: 'female',
      label: i18next.t('Dashboard.Profile.PersonalForm.gender.female'),
    },
  ];

  const state = useSelector(state => state.userReducer.info.profile);
  const [errorFields, setErrorFields] = useState(initialErrorFields);
  const [errorMsg, setErrorMsg] = useState('');
  const [inputFields, setInputFields] = useState({
    ...initialFields,
    firstname: state.firstName,
    lastname: state.lastName,
    country: 'Germany',
    primaryLanguage: 'English',
    gender: 'male',
  });

  const handleChange = (field, value) => {
    setInputFields(prevState => ({ ...prevState, [field]: value }));
    setErrorMsg('');
  };

  const onInputBlur = field => {
    validator.extendErrorFields(
      errorFields,
      field,
      validator.fieldTypes[field],
      inputFields[field],
    );

    setErrorFields({ ...errorFields });
  };

  const onSubmit = event => {
    event.preventDefault();
    const { fieldsetHasValues, fieldsetHasErrors } = validator;

    if (!fieldsetHasErrors(errorFields) && fieldsetHasValues(inputFields)) {
      console.log('Submit', inputFields);
    } else {
      setErrorMsg('Please enter your details');
    }
  };

  const {
    firstname,
    lastname,
    fullname,
    dob,
    country,
    phoneNumber,
    gender,
    primaryLanguage,
  } = inputFields;

  return (
    <div className={classes.root}>
      <form noValidate autoComplete='off' onSubmit={onSubmit}>
        <Typography variant='h4'>
          {t('Dashboard.Profile.PersonalForm.name')}
        </Typography>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={6}>
            <TextField
              data-testid='model-name'
              type='text'
              label={t('Dashboard.Profile.PersonalForm.firstName')}
              value={firstname}
              fullWidth
              placeholder={t(
                'Dashboard.Profile.PersonalForm.firstNamePlaceholder',
              )}
              error={!!errorFields.firstname.length}
              helperText={errorFields.firstname}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={event => handleChange('firstname', event.target.value)}
              onBlur={() => onInputBlur('firstname')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              data-testid='model-name'
              type='text'
              label={t('Dashboard.Profile.PersonalForm.lastName')}
              value={lastname}
              fullWidth
              placeholder={t(
                'Dashboard.Profile.PersonalForm.lastNamePlaceholder',
              )}
              error={!!errorFields.lastname.length}
              helperText={errorFields.lastname}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={event => handleChange('lastname', event.target.value)}
              onBlur={() => onInputBlur('lastname')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              data-testid='model-name'
              type='date'
              label={t('Dashboard.Profile.PersonalForm.dateOfBirth')}
              value={dob}
              fullWidth
              placeholder={t(
                'Dashboard.Profile.PersonalForm.dateOfBirthPlaceholder',
              )}
              error={!!errorFields.dob.length}
              helperText={errorFields.dob}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={event => handleChange('dob', event.target.value)}
              onBlur={() => onInputBlur('dob')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SelectElement
              id='country'
              label={t('Dashboard.Profile.PersonalForm.country')}
              value={country}
              onChange={handleChange}
              selectData={countries}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SelectElement
              id='gender'
              label={t('Dashboard.Profile.PersonalForm.gender.label')}
              value={gender}
              onChange={handleChange}
              selectData={genderData}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SelectElement
              id='primaryLanguage'
              label={t('Dashboard.Profile.PersonalForm.primaryLanguage')}
              value={primaryLanguage}
              onChange={handleChange}
              selectData={languages}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              data-testid='model-name'
              type='text'
              label={t('Dashboard.Profile.PersonalForm.fullName')}
              value={fullname}
              fullWidth
              placeholder={t(
                'Dashboard.Profile.PersonalForm.fullNamePlaceholder',
              )}
              error={!!errorFields.fullname.length}
              helperText={errorFields.fullname}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={event => handleChange('fullname', event.target.value)}
              onBlur={() => onInputBlur('fullname')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              data-testid='model-name'
              type='text'
              label={t('Dashboard.Profile.PersonalForm.phoneNumber')}
              value={phoneNumber}
              fullWidth
              placeholder={t(
                'Dashboard.Profile.PersonalForm.phoneNumberPlaceholder',
              )}
              error={!!errorFields.phone.length}
              helperText={errorFields.phone}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={event => handleChange('phone', event.target.value)}
              onBlur={() => onInputBlur('phone')}
            />
          </Grid>
          <Grid item xs={12} style={{ position: 'relative' }}>
            <Typography
              component='p'
              color='error'
              className={classes.errorMsg}
            >
              {errorMsg}
            </Typography>
          </Grid>
        </Grid>
        <Box mt={4}>
          <Button variant='contained' color='primary' type='submit'>
            {t('Dashboard.Profile.PersonalForm.saveBtn')}
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default PersonalForm;
