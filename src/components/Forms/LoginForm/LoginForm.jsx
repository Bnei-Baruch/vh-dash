import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  errorMsg: {
    position: 'absolute',
    top: 0,
  },
}));

const LoginForm = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  const [inputFields, setInputFields] = useState({ email: '', password: '' });
  const [errorFields, setErrorFields] = useState({ email: [], password: [] });
  const [errorMsg, setErrorMsg] = useState('');

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
    const { fieldsetHasErrors, fieldsetHasValues } = validator;

    if (fieldsetHasValues(inputFields) && !fieldsetHasErrors(errorFields)) {
      console.log('Submit', inputFields);
    } else {
      setErrorMsg('Please enter your details');
    }
  };

  return (
    <div className={classes.root}>
      <form noValidate autoComplete='off' onSubmit={onSubmit}>
        <Typography variant='h4' gutterBottom>
          {t('Dashboard.Profile.LoginForm.name')}
        </Typography>
        <Grid container spacing={10}>
          <Grid item xs={12} md={6}>
            <TextField
              data-testid='model-name'
              type='email'
              label={t('Dashboard.Profile.LoginForm.email')}
              value={inputFields.email}
              fullWidth
              placeholder={t('Dashboard.Profile.LoginForm.emailPlaceholder')}
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
              label={t('Dashboard.Profile.LoginForm.password')}
              value={inputFields.password}
              fullWidth
              placeholder={t('Dashboard.Profile.LoginForm.passwordPlaceholder')}
              error={!!errorFields.password.length}
              helperText={errorFields.password}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={event => handleChange('password', event.target.value)}
              onBlur={() => onInputBlur('password')}
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
            {t('Dashboard.Profile.LoginForm.saveBtn')}
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default LoginForm;
