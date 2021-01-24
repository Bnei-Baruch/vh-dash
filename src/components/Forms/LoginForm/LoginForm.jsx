import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Grid, TextField, Typography } from '@material-ui/core';

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
        <Grid container spacing={10}>
          <Grid item xs={12} md={6}>
            <TextField
              data-testid='model-name'
              type='email'
              label='Email'
              value={inputFields.email}
              fullWidth
              placeholder='Enter your email'
              InputLabelProps={{
                shrink: true,
              }}
              onChange={event => handleChange('email', event.target.value)}
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
              InputLabelProps={{
                shrink: true,
              }}
              onChange={event => handleChange('password', event.target.value)}
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
