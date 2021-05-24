import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Button, Grid, Toolbar } from '@material-ui/core';
import EducationForm from '../../Forms/InformationForms/EducationForm';
import TenForm from '../../Forms/InformationForms/TenForm';

const useStyles = makeStyles({
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

const initialFields = {
  startYear: '',
  studyFramework: '',
  isStudyGroup: 'Yes',
  isWantStudyGroup: 'Yes',
  tenName: '',
};

const OtherInformationsTab = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  const [isModified, setIsModified] = useState(false);
  const [inputFields, setInputFields] = useState(initialFields);

  const handleChange = (field, value) =>
    setInputFields(prevState => ({ ...prevState, [field]: value }));

  const onSubmit = event => {
    event.preventDefault();

    if (!isModified) {
      setIsModified(true);
      return;
    }

    console.log('Submit', inputFields);
  };

  const buttonText = isModified ? t('Global.saveBtn') : t('Global.modify');

  return (
    <form noValidate autoComplete='off' onSubmit={onSubmit}>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={6}>
          <EducationForm
            inputFields={inputFields}
            handleChange={handleChange}
            isModified={isModified}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TenForm
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
