import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Grid, TextField, Typography } from '@material-ui/core';
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

const LoginForm = () => {
  const classes = useStyles();

  const [inputFields, setInputFields] = useState({ email: '', password: '' });
  const [errorFields, setErrorFields] = useState({ email: [], password: [] });

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

    setErrorFields({ ...errorFields });
  };

  const onSubmit = event => {
    event.preventDefault();
    const { fieldsetHasErrors, fieldsetHasValues } = validator;
    
    if (fieldsetHasValues(inputFields) && !fieldsetHasErrors(errorFields)) {
      console.log('Submit', inputFields);
    }
  };

  return (
    <div className={classes.root}>
      <form noValidate autoComplete='off' onSubmit={onSubmit}>
        <Typography variant='h4' gutterBottom>
          Login Info
        </Typography>
        <Grid container spacing={10}>
          <Grid item xs={12} md={6}>
            <TextField
              data-testid='model-name'
              type='email'
              label='Email'
              value={inputFields.email}
              fullWidth
              placeholder='Enter your email'
              error={!!errorFields.email.length}
              helperText={errorFields.email}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={event => handleChange('email', event.target.value)}
              onBlur={() => onInputBlur('email')}
            />
          </Grid>
        </Grid>
        <Grid container spacing={10}>
          <Grid item xs={12} md={6}>
            <TextField
              data-testid='model-name'
              type='password'
              label='Password'
              value={inputFields.password}
              fullWidth
              placeholder='Enter your password'
              error={!!errorFields.password.length}
              helperText={errorFields.password}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={event => handleChange('password', event.target.value)}
              onBlur={() => onInputBlur('password')}
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

export default LoginForm;
