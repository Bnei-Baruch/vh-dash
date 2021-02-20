import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { Box, Button, Typography } from '@material-ui/core';
import facebook from '../../img/icons/facebook.png';
import twitter from '../../img/icons/twitter.png';
import instagram from '../../img/icons/instagram.png';
import youtube from '../../img/icons/youtube.png';
import linkedin from '../../img/icons/linkedin.png';
import skype from '../../img/icons/skype.png';

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(4, 0),
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.paper,
    '& .MuiTypography-root': {
      fontSize: '14px',
      marginBottom: theme.spacing(6),
    },
  },
  icon: {
    width: '47px',
    height: '47px',
    color: '#004E7C',
    '& .MuiSvgIcon-root': {
      width: '100%',
      height: '100%',
    },
  },
  wrapper: {
    display: 'flex',
  },
}));

const initialFields = {
  facebook: '',
  instagram: '',
  skype: '',
  twitter: '',
  linkedin: '',
  youtube: '',
};

const SocialContainer = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  const [inputFields, setInputFields] = useState(initialFields);

  const socialFields = [
    {
      label: t('Dashboard.Profile.SocialForm.facebook'),
      placeholder: t('Dashboard.Profile.SocialForm.facebookPlaceholder'),
      icon: facebook,
      id: 'facebook',
      value: inputFields['facebook'],
    },
    {
      label: t('Dashboard.Profile.SocialForm.instagram'),
      placeholder: t('Dashboard.Profile.SocialForm.instagramPlaceholder'),
      icon: instagram,
      id: 'instagram',
      value: inputFields['instagram'],
    },
    {
      label: t('Dashboard.Profile.SocialForm.twitter'),
      placeholder: t('Dashboard.Profile.SocialForm.twitterPlaceholder'),
      icon: twitter,
      id: 'twitter',
      value: inputFields['twitter'],
    },
    {
      label: t('Dashboard.Profile.SocialForm.youtube'),
      placeholder: t('Dashboard.Profile.SocialForm.youtubePlaceholder'),
      icon: youtube,
      id: 'youtube',
      value: inputFields['youtube'],
    },
    {
      label: t('Dashboard.Profile.SocialForm.linked'),
      placeholder: t('Dashboard.Profile.SocialForm.linkedPlaceholder'),
      icon: linkedin,
      id: 'linkedin',
      value: inputFields['linkedin'],
    },
    {
      label: t('Dashboard.Profile.SocialForm.skype'),
      placeholder: t('Dashboard.Profile.SocialForm.skypePlaceholder'),
      icon: skype,
      id: 'skype',
      value: inputFields['skype'],
    },
  ];

  const handleChange = event => {
    const { id, value } = event.target;

    setInputFields(prevState => ({ ...prevState, [id]: value }));
  };

  return (
    <div className={classes.root}>
      <Typography variant='h4' gutterBottom>
        {t('Dashboard.Profile.SocialForm.name')}
      </Typography>
      <Grid container spacing={6}>
        {socialFields.map(field => (
          <Grid
            item
            xs={12}
            md={6}
            lg={4}
            className={classes.wrapper}
            key={field.id}
          >
            <Box className={classes.icon}>
              <img src={field.icon} alt='img' />
            </Box>
            <Box ml={2} mr={2} width='100%'>
              <TextField
                id={field.id}
                label={field.label}
                placeholder={field.placeholder}
                value={field.value}
                fullWidth
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>
            <Box alignSelf='flex-end'>
              <Button variant='contained' disabled={field.value ? false : true}>
                {t('Dashboard.Profile.SocialForm.connectBtn')}
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default SocialContainer;
