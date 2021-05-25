import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Link,
  Radio,
  RadioGroup,
  TextField,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { commonFormStyles } from '../../../constants/formData';
import { CustomTooltip } from '../../../shared/Tooltip';
import GoogleIcon from '../../../img/icons/google.png';
import FacebookIcon from '../../../img/icons/facebook.png';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
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
  linkWrapper: {
    display: 'grid',
    justifyContent: 'flex-end',
  },
  formControl: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    '@media (max-width: 600px)': {
      flexDirection: 'column',
    },
  },
  radioLabel: {
    position: 'relative',
    paddingRight: 30,
    fontSize: 18,
    color: theme.palette.text.primary,
  },
  radioGroup: {
    flexDirection: 'row',
    '& .MuiTypography-root': {
      fontSize: 18,
      marginBottom: 2,
    },
  },
}));

const initialFields = {
  email: '',
  isGoogleConnected: 'Yes',
  isFacebookConnected: 'No',
};

const SecurityTab = () => {
  const classes = useStyles();
  const styles = commonFormStyles();
  const { t } = useTranslation();
  const { keycloak } = useSelector(state => state.userReducer.info);

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

  const onForgotPasswordClick = () =>
    window.open(
      `${keycloak.authServerUrl}realms/${keycloak.realm}/login-actions/reset-credentials?client_id=membership_pay&tab_id=P47ir4Jct-s`,
      '_self',
    );

  const buttonText = isModified ? t('Global.saveBtn') : t('Global.modify');
  const { email, isGoogleConnected, isFacebookConnected } = inputFields;

  return (
    <form noValidate autoComplete='off' onSubmit={onSubmit}>
      <div className={styles.root}>
        <Typography variant='h4'>
          {t('Dashboard.Profile.Security.name')}
        </Typography>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={8}>
            <TextField
              disabled={!isModified}
              type='email'
              label={t('Dashboard.Profile.Security.email')}
              value={email}
              fullWidth
              placeholder={t('Global.inputPlaceholder', {
                input: 'email',
              })}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={event => handleChange('email', event.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={8} className={classes.linkWrapper}>
            <Link
              component='button'
              variant='body2'
              onClick={onForgotPasswordClick}
            >
              {t('Dashboard.Profile.Security.forgotPassword')}
            </Link>
          </Grid>
          <Grid item xs={12} sm={8}>
            <FormControl component='fieldset' className={classes.formControl}>
              <FormLabel component='div' className={classes.radioLabel}>
                <img
                  src={GoogleIcon}
                  alt='google'
                  style={{ marginRight: 10 }}
                />
                {t('Dashboard.Profile.Security.googleConnected')}
                <CustomTooltip
                  tooltipText={t('Dashboard.Profile.Security.googleTooltip')}
                />
              </FormLabel>
              <RadioGroup
                className={classes.radioGroup}
                value={isGoogleConnected}
                onChange={event =>
                  handleChange('isGoogleConnected', event.target.value)
                }
              >
                <FormControlLabel
                  value='Yes'
                  disabled
                  control={<Radio />}
                  label={t('Global.yes')}
                />
                <FormControlLabel
                  value='No'
                  disabled
                  control={<Radio />}
                  label={t('Global.no')}
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={8}>
            <FormControl component='fieldset' className={classes.formControl}>
              <FormLabel component='div' className={classes.radioLabel}>
                <img
                  src={FacebookIcon}
                  alt='facebook'
                  style={{ marginRight: 10 }}
                />
                {t('Dashboard.Profile.Security.facebookConnected')}
                <CustomTooltip
                  tooltipText={t('Dashboard.Profile.Security.facebookTooltip')}
                />
              </FormLabel>
              <RadioGroup
                className={classes.radioGroup}
                value={isFacebookConnected}
                onChange={event =>
                  handleChange('isFacebookConnected', event.target.value)
                }
              >
                <FormControlLabel
                  value='Yes'
                  disabled
                  control={<Radio />}
                  label={t('Global.yes')}
                />
                <FormControlLabel
                  value='No'
                  disabled
                  control={<Radio />}
                  label={t('Global.no')}
                />
              </RadioGroup>
            </FormControl>
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
      </div>
    </form>
  );
};

export default SecurityTab;
