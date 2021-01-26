import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import SelectElement from '../FormElements/SelectElement';
import countries from '../../../constants/countries';
import languages from '../../../constants/languages';
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
}));

const initialFields = {
  firstname: '',
  dob: '',
  gender: 'male',
  fullname: '',
  lastname: '',
  country: 'Germany',
  primaryLanguage: 'English',
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
  const genderData = [
    { code: 'male', label: 'male' },
    { code: 'female', label: 'female' },
  ];
  const [inputFields, setInputFields] = useState(initialFields);
  const [errorFields, setErrorFields] = useState(initialErrorFields);

  const handleChange = (field, value) => {
    setInputFields(prevState => ({ ...prevState, [field]: value }));
  };

  const onInputBlur = field => {
    validator.extendErrorFields(
      errorFields,
      field,
      validator.fieldTypes[field],
      inputFields[field],
    );

    setErrorFields({...errorFields});
  };

  const onSubmit = event => {
    event.preventDefault();
    const { fieldsetHasValues, fieldsetHasErrors } = validator;

    if (!fieldsetHasErrors(errorFields) && fieldsetHasValues(inputFields)) {
      console.log('Submit', inputFields);
    }
  };

  const {
    firstName,
    lastName,
    fullName,
    dob,
    country,
    gender,
    primaryLanguage,
    phoneNumber,
  } = inputFields;

  return (
    <div className={classes.root}>
      <form noValidate autoComplete='off' onSubmit={onSubmit}>
        <Typography variant='h4'>
          Personal
        </Typography>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={6}>
            <TextField
              data-testid='model-name'
              type='text'
              label='First Name'
              value={firstName}
              fullWidth
              placeholder='Enter your first name'
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
              label='Last Name'
              value={lastName}
              fullWidth
              placeholder='Enter your last name'
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
              label='Date of birth'
              value={dob}
              fullWidth
              placeholder='Enter your date of birth'
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
              label='Country of origin'
              value={country}
              onChange={handleChange}
              selectData={countries}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SelectElement
              id='gender'
              label='Gender'
              value={gender}
              onChange={handleChange}
              selectData={genderData}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SelectElement
              id='primaryLanguage'
              label='Primary language'
              value={primaryLanguage}
              onChange={handleChange}
              selectData={languages}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              data-testid='model-name'
              type='text'
              label='Full name in primary language'
              value={fullName}
              fullWidth
              placeholder='Enter your full name'
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
              label='Phone Numder'
              value={phoneNumber}
              fullWidth
              placeholder='Enter your phone number'
              error={!!errorFields.phone.length}
              helperText={errorFields.phone}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={event => handleChange('phone', event.target.value)}
              onBlur={() => onInputBlur('phone')}
            />
          </Grid>
        </Grid>
        <Box mt={4}>
          <Button variant='contained' color='primary' type='submit'>
            Save Changes
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default PersonalForm;
