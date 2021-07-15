import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Typography } from '@material-ui/core';
import MuiPhoneInput from 'material-ui-phone-number';
import { commonFormStyles } from '../../../constants/formData';
import Phone from '../../../img/icons/phone.png';
import Telegram from '../../../img/icons/telegram.png';
import Whatsapp from '../../../img/icons/whatsapp.png';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  image: {
    width: 22,
    height: 22,
  },
  input: {
    '& input': {
      padding: 0,
      height: 35,
    },
    '& .MuiOutlinedInput-adornedStart': {
      paddingLeft: 0,
    },
    '& .MuiPhoneNumber-flagButton': {
      height: 35,
      background: '#F4F4F4',
    },
  },
});

const SocialForm = ({ handleChange, isModified }) => {
  const classes = commonFormStyles();
  const styles = useStyles();
  const { t } = useTranslation();

  const onPhoneChange = value => handleChange('mobile_number', value);
  const onTelegramPhoneChange = value => handleChange('telegram_number', value);
  const onWhatsappPhoneChange = value => handleChange('whats_app_number', value);

  return (
    <div className={`${classes.root} ${classes.socialForm}`}>
      <Typography variant='h4' gutterBottom>
        {t('Dashboard.Profile.socialFormName')}
      </Typography>
      <Grid container spacing={10}>
        <Grid item xs={2} md={1}>
          <img src={Phone} alt='phone' className={styles.image} />
        </Grid>
        <Grid item xs={10} md={8} lg={6}>
          <MuiPhoneInput
            defaultCountry='us'
            disabled={!isModified}
            onChange={onPhoneChange}
            variant='outlined'
            className={styles.input}
            fullWidth
          />
        </Grid>
      </Grid>
      <Grid container spacing={10}>
        <Grid item xs={2} md={1}>
          <img src={Whatsapp} alt='whatsapp' className={styles.image} />
        </Grid>
        <Grid item xs={10} md={8} lg={6}>
          <MuiPhoneInput
            defaultCountry='us'
            disabled={!isModified}
            onChange={onTelegramPhoneChange}
            variant='outlined'
            className={styles.input}
            fullWidth
          />
        </Grid>
      </Grid>
      <Grid container spacing={10}>
        <Grid item xs={2} md={1}>
          <img src={Telegram} alt='telegram' className={styles.image} />
        </Grid>
        <Grid item xs={10} md={8} lg={6}>
          <MuiPhoneInput
            defaultCountry='us'
            disabled={!isModified}
            onChange={onWhatsappPhoneChange}
            variant='outlined'
            className={styles.input}
            fullWidth
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default SocialForm;
