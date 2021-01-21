import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  Typography,
} from '@material-ui/core';
import SelectElement from '../FormElements/SelectElement';
import countries from '../../../constants/countries';
import languages from '../../../constants/languages';

const useStyles = makeStyles(theme => ({
  root: {
    fontSize: '16px',
    width: '48%',
    padding: '20px',
    backgroundColor: theme.palette.background.paper,
  },
  inputContainer: {
    display: 'flex',
    '& div': {
      flexDirection: 'column',
      display: 'flex',
      width: '96%',
    },
    '& .MuiTextField-root': {
      width: '270px',
    },
  },
  label: {
    color: '#263238',
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
        <Typography variant='h4' gutterBottom>
          Personal
        </Typography>
        <div className={classes.inputContainer}>
          <Box>
            <FormControl margin='normal'>
              <InputLabel htmlFor='first-name' className={classes.label} shrink>
                First Name
              </InputLabel>
              <Input
                id='first-name'
                value={firstName}
                onChange={event =>
                  handleChange('firstName', event.target.value)
                }
              />
            </FormControl>
            <FormControl margin='normal'>
              <InputLabel
                htmlFor='date-of-birth'
                className={classes.label}
                shrink
              >
                Date of birth
              </InputLabel>
              <Input
                id='date-of-birth'
                value={dob}
                onChange={event => handleChange('dob', event.target.value)}
              />
            </FormControl>
            <SelectElement
              id='gender'
              label='Gender'
              value={gender}
              onChange={handleChange}
              selectData={genderData}
            />
            <FormControl margin='normal'>
              <InputLabel htmlFor='full-name' className={classes.label} shrink>
                Full name in primary language
              </InputLabel>
              <Input
                id='full-name'
                value={fullName}
                onChange={event => handleChange('fullName', event.target.value)}
              />
            </FormControl>
          </Box>
          <Box alignItems='flex-end'>
            <FormControl margin='normal'>
              <InputLabel htmlFor='last-name' className={classes.label} shrink>
                Last name
              </InputLabel>
              <Input
                id='last-name'
                value={lastName}
                onChange={event => handleChange('lastName', event.target.value)}
              />
            </FormControl>
            <SelectElement
              id='country'
              label='Country of origin'
              value={country}
              onChange={handleChange}
              selectData={countries}
            />
            <SelectElement
              id='primaryLanguage'
              label='Primary language'
              value={primaryLanguage}
              onChange={handleChange}
              selectData={languages}
            />
            <FormControl margin='normal'>
              <InputLabel
                htmlFor='phone-number'
                className={classes.label}
                shrink
              >
                Phone Number
              </InputLabel>
              <Input
                id='phone-number'
                value={phoneNumber}
                onChange={event =>
                  handleChange('phoneNumber', event.target.value)
                }
              />
            </FormControl>
          </Box>
        </div>
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
