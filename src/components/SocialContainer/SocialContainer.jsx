import React, { useState } from 'react';
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
  const [inputFields, setInputFields] = useState(initialFields);

  // TODO: Change array structure
  const socialFields = [
    {
      label: 'Your Facebook profile',
      placeholder: 'Enter Facebook profile',
      icon: facebook,
      id: 'facebook',
      value: inputFields['facebook'],
    },
    {
      label: 'Your Instagram handle',
      placeholder: 'Enter Instagram handle',
      icon: instagram,
      id: 'instagram',
      value: inputFields['instagram'],
    },
    {
      label: 'Your Twitter handle',
      placeholder: 'Enter Twitter handle',
      icon: twitter,
      id: 'twitter',
      value: inputFields['twitter'],
    },
    {
      label: 'Your Youtube profile',
      placeholder: 'Enter Youtube profile',
      icon: youtube,
      id: 'youtube',
      value: inputFields['youtube'],
    },
    {
      label: 'Your Linked profile',
      placeholder: 'Enter Linked profile',
      icon: linkedin,
      id: 'linkedin',
      value: inputFields['linkedin'],
    },
    {
      label: 'Your Skype handle',
      placeholder: 'Enter Skype handle',
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
        My social media accounts
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
                Connect
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default SocialContainer;
