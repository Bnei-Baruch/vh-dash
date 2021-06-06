import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Button, Grid, Toolbar } from '@material-ui/core';

import PersonalForm from '../../Forms/PersonalForm/PersonalForm';
import EmailsForm from '../../Forms/EmailsForm';
import PhysicalLocationForm from '../../Forms/PersonalForm/PhysicalLocationForm';
import SocialForm from '../../Forms/SocialForm';

const useStyles = makeStyles({
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

const MyProfileTab = ({
  errorFields,
  inputFields,
  setErrorFields,
  onErrorClear,
  onSubmit,
  setInputFields,
  handleChange,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const [isModified, setIsModified] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [copiedFields, setCopiedFields] = useState({});

  useEffect(() => {
    setCopiedFields(inputFields);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onInputBlur = field => {
    const isValid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(inputFields[field]);
    if (inputFields[field]) {
      if (!isValid) {
        setErrorFields(prevState => ({
          ...prevState,
          [field]: t('Dashboard.Profile.Emails.emailError'),
        }));
        setIsValid(false);

        return;
      }

      onErrorClear();
      setIsValid(true);
    }
  };

  const onFormSubmit = event => {
    event.preventDefault();

    if (!isModified) {
      setIsModified(true);
      return;
    }

    isValid && onSubmit();
  };

  const onCancel = () => {
    onErrorClear();
    setIsModified(false);
    setInputFields(copiedFields);
  };

  const buttonText = isModified ? t('Global.saveBtn') : t('Global.modify');

  return (
    <form noValidate autoComplete='off' onSubmit={onFormSubmit}>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={6}>
          <PersonalForm
            inputFields={inputFields}
            handleChange={handleChange}
            isModified={isModified}
          />
          <PhysicalLocationForm
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
            inputFields={inputFields}
            errorFields={errorFields}
            handleChange={handleChange}
            isModified={isModified}
            onInputBlur={onInputBlur}
          />
          <SocialForm
            inputFields={inputFields}
            handleChange={handleChange}
            isModified={isModified}
          />
        </Grid>
        <AppBar
          position='fixed'
          className={classes.appBar}
          style={{ background: `${isModified ? '#C9F9DA' : '#fff'}` }}
        >
          <Toolbar className={classes.toolBar}>
            <Button
              variant='contained'
              color={isModified ? 'secondary' : 'primary'}
              type='submit'
            >
              {buttonText}
            </Button>
            {isModified && (
              <Button
                style={{ marginLeft: 20 }}
                variant='contained'
                color='default'
                onClick={onCancel}
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
