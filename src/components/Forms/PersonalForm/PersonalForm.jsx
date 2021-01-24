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
    },
  },
}));

const initialFields = {
  firstName: '',
  dob: '',
  gender: 'male',
  fullName: '',
  lastName: '',
  country: 'Germany',
  primaryLanguage: 'English',
  phoneNumber: '',
};

const errorFields = {
  firstName: '',
  dob: '',
  gender: '',
  fullName: '',
  lastName: '',
  country: '',
  primaryLanguage: '',
  phoneNumber: '',
};

const PersonalForm = () => {
  const classes = useStyles();
  const genderData = [
    { code: 'male', label: 'male' },
    { code: 'female', label: 'female' },
  ];
  const [inputFields, setInputFields] = useState(initialFields);

  const handleChange = (field, value) => {
    setInputFields(prevState => ({ ...prevState, [field]: value }));
  };

  const onSubmit = event => {
    event.preventDefault();
    console.log('Submit');
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
              InputLabelProps={{
                shrink: true,
              }}
              onChange={event => handleChange('firstName', event.target.value)}
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
              InputLabelProps={{
                shrink: true,
              }}
              onChange={event => handleChange('lastName', event.target.value)}
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
              InputLabelProps={{
                shrink: true,
              }}
              onChange={event => handleChange('dob', event.target.value)}
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
              InputLabelProps={{
                shrink: true,
              }}
              onChange={event => handleChange('fullName', event.target.value)}
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
              InputLabelProps={{
                shrink: true,
              }}
              onChange={event => handleChange('phoneNumber', event.target.value)}
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
