import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Button, Grid, Toolbar, Typography } from '@material-ui/core';
import EducationForm from '../../Forms/InformationForms/EducationForm';
import validator from '../../../helpers/validator';
import TenForm from '../../Forms/InformationForms/TenForm';

const useStyles = makeStyles({
  errorMsg: {
    position: 'absolute',
    top: 0,
  },
  appBar: {
    top: 'auto',
    bottom: 0,
    textAlign: 'right',
    background: '#fff',
  },
  toolBar: {
    padding: 20,
    display: 'flex',
    justifyContent: 'flex-end',
  },
});

const initialErrorFields = {
  startYear: [],
  endYear: [],
  studyFramework: [],
  tenName: [],
};

const initialFields = {
  startYear: '',
  endYear: '',
  studyFramework: '',
  isStudyGroup: 'Yes',
  isWantStudyGroup: 'Yes',
  tenName: '',
};

const OtherInformationsTab = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  const [isModified, setIsModified] = useState(false);
  const [errorFields, setErrorFields] = useState({ ...initialErrorFields });
  const [errorMsg, setErrorMsg] = useState('');
  const [inputFields, setInputFields] = useState(initialFields);

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
          <EducationForm
            inputFields={inputFields}
            errorFields={errorFields}
            onInputBlur={onInputBlur}
            handleChange={handleChange}
            isModified={isModified}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TenForm
            inputFields={inputFields}
            errorFields={errorFields}
            onInputBlur={onInputBlur}
            handleChange={handleChange}
            isModified={isModified}
          />
        </Grid>
        <Grid item xs={12} style={{ position: 'relative' }}>
          <Typography component='p' color='error' className={classes.errorMsg}>
            {errorMsg}
          </Typography>
        </Grid>
        <AppBar position='fixed' className={classes.appBar}>
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

export default OtherInformationsTab;
