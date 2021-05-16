import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Button, Grid, Toolbar, Typography } from '@material-ui/core';

import PersonalForm from '../../Forms/PersonalForm/PersonalForm';
import EmailsForm from '../../Forms/EmailsForm';
import { initialErrorFields, initialFields } from '../../../constants/formData';
import validator from '../../../helpers/validator';
import PhysicalLocationForm from '../../Forms/PersonalForm/PhysicalLocationForm';
import SocialForm from '../../Forms/SocialForm';

const useStyles = makeStyles({
  errorMsg: {
    position: 'absolute',
    top: 0,
  },
  appBar: {
    top: 'auto',
    bottom: 0,
    textAlign: 'right',
  },
  toolBar: {
    padding: 20,
    display: 'flex',
    justifyContent: 'flex-end',
  },
});

const MyProfileTab = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  const state = useSelector(state => state.userReducer.info.profile);
  const [isModified, setIsModified] = useState(false);
  const [errorFields, setErrorFields] = useState({ ...initialErrorFields });
  const [errorMsg, setErrorMsg] = useState('');
  const [inputFields, setInputFields] = useState({
    ...initialFields,
    firstname: state.firstName,
    lastname: state.lastName,
    country: 'Germany',
    primaryLanguage: 'English',
    gender: 'male',
    maritalStatus: 'single',
    primaryEmail: state.email,
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
    const { fieldsetHasErrors } = validator;

    if (!isModified) {
      setIsModified(true);
      return;
    }

    if (!fieldsetHasErrors(errorFields)) {
      console.log('Submit', inputFields);
    } else {
      setErrorMsg(t('Global.formErrorMsg'));
    }
  };

  const buttonText = isModified ? t('Global.saveBtn') : t('Global.modify');

  return (
    <form noValidate autoComplete='off' onSubmit={onSubmit}>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={6}>
          <PersonalForm
            onInputBlur={onInputBlur}
            errorFields={errorFields}
            inputFields={inputFields}
            handleChange={handleChange}
            isModified={isModified}
          />
          <PhysicalLocationForm
            onInputBlur={onInputBlur}
            errorFields={errorFields}
            inputFields={inputFields}
            handleChange={handleChange}
            isModified={isModified}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          style={{ display: 'grid', alignContent: 'space-between' }}
        >
          <EmailsForm
            onInputBlur={onInputBlur}
            errorFields={errorFields}
            inputFields={inputFields}
            handleChange={handleChange}
            isModified={isModified}
          />
          <SocialForm
            onInputBlur={onInputBlur}
            errorFields={errorFields}
            inputFields={inputFields}
            handleChange={handleChange}
            isModified={isModified}
          />
        </Grid>
        <Grid item xs={12} style={{ position: 'relative' }}>
          <Typography component='p' color='error' className={classes.errorMsg}>
            {errorMsg}
          </Typography>
        </Grid>
        <AppBar
          position='fixed'
          className={classes.appBar}
          style={{ background: `${errorMsg ? '#ff00006e' : '#fff'}` }}
        >
          <Toolbar className={classes.toolBar}>
            <Button variant='contained' color='primary' type='submit'>
              {buttonText}
            </Button>
            {isModified && (
              <Button
                style={{ marginLeft: 20 }}
                variant='contained'
                color='default'
                onClick={() => setIsModified(false)}
              >
                {t('Global.cancelBtn')}
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Grid>
    </form>
  );
};

export default MyProfileTab;
