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

const useStyles = makeStyles(theme => ({
  root: {
    width: '48%',
    padding: '20px',
    backgroundColor: theme.palette.background.paper,
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '65%',
    '& .MuiTextField-root': {
      margin: theme.spacing(2),
      paddingBottom: theme.spacing(3),
    },
  },
  label: {
    color: '#263238',
  },
}));

const LoginForm = () => {
  const classes = useStyles();

  const [inputFields, setInputFields] = useState({ email: '', password: '' });

  const handleChange = (field, value) => {
    setInputFields(prevState => ({ ...prevState, [field]: value }));
  };

  const onSubmit = event => {
    event.preventDefault();
    console.log('Submit');
  };

  return (
    <div className={classes.root}>
      <form noValidate autoComplete='off' onSubmit={onSubmit}>
        <Typography variant='h4' gutterBottom>
          Login Info
        </Typography>
        <div className={classes.inputContainer}>
          <FormControl margin='normal'>
            <InputLabel htmlFor='email' className={classes.label} shrink>
              Email
            </InputLabel>
            <Input
              id='email'
              value={inputFields.email}
              onChange={event => handleChange('email', event.target.value)}
            />
          </FormControl>
          <FormControl margin='normal'>
            <InputLabel htmlFor='password' className={classes.label} shrink>
              Password
            </InputLabel>
            <Input
              id='password'
              value={inputFields.password}
              onChange={event => handleChange('password', event.target.value)}
            />
          </FormControl>
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

export default LoginForm;
