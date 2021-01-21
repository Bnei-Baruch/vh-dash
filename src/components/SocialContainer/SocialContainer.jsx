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
    '& h4': {
      fontSize: '14px',
      marginBottom: theme.spacing(3),
    },
  },
  icon: {
    width: '47px',
    height: '47px',
    color: '#004E7C',
    padding: '0 !important',
    '& .MuiSvgIcon-root': {
      width: '100%',
      height: '100%',
    },
  },
  inputField: {
    minWidth: '212px',
    '& .MuiFormLabel-root': {
      color: '#263238',
    },
    '& .MuiTextField-root': {
      width: '100%',
    },
  },
  gridContainer: {
    alignItems: 'flex-end',
    marginBottom: theme.spacing(6),
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
      label1: 'Your Facebook profile',
      placeholder1: 'Enter Facebook profile',
      icon1: facebook,
      id1: 'facebook',
      value1: inputFields['facebook'],
      label2: 'Your Instagram handle',
      placeholder2: 'Enter Instagram handle',
      icon2: instagram,
      id2: 'instagram',
      value2: inputFields['instagram'],
    },
    {
      label1: 'Your Twitter handle',
      placeholder1: 'Enter Twitter handle',
      icon1: twitter,
      id1: 'twitter',
      value1: inputFields['twitter'],
      label2: 'Your Youtube profile',
      placeholder2: 'Enter Youtube profile',
      icon2: youtube,
      id2: 'youtube',
      value2: inputFields['youtube'],
    },
    {
      label1: 'Your Linked profile',
      placeholder1: 'Enter Linked profile',
      icon1: linkedin,
      id1: 'linkedin',
      value1: inputFields['linkedin'],
      label2: 'Your Skype handle',
      placeholder2: 'Enter Skype handle',
      icon2: skype,
      id2: 'skype',
      value2: inputFields['skype'],
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
      <Box display='flex' justifyContent='space-between'>
        {socialFields.map(field => (
          <Box key={field.id1}>
            <Grid container spacing={2} className={classes.gridContainer}>
              <Grid item className={classes.icon}>
                <img src={field.icon1} alt='img' />
              </Grid>
              <Grid item className={classes.inputField}>
                <TextField
                  id={field.id1}
                  label={field.label1}
                  placeholder={field.placeholder1}
                  value={field.value1}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item>
                <Button
                  variant='contained'
                  disabled={field.value1 ? false : true}
                >
                  Connect
                </Button>
              </Grid>
            </Grid>
            <Grid container spacing={2} className={classes.gridContainer}>
              <Grid item className={classes.icon}>
                <img src={field.icon2} alt='img' />
              </Grid>
              <Grid item className={classes.inputField}>
                <TextField
                  id={field.id2}
                  label={field.label2}
                  placeholder={field.placeholder2}
                  value={field.value2}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item>
                <Button
                  variant='contained'
                  disabled={field.value2 ? false : true}
                >
                  Connect
                </Button>
              </Grid>
            </Grid>
          </Box>
        ))}
      </Box>
    </div>
  );
};

export default SocialContainer;
