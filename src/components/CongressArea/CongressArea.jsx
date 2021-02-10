import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import HLSPlayer from '../HLSPlayer';
import CongressQuestions from './CongressQuestions';
import Annoucements from './Annoucements';
import CongressLogo from '../../img/icons/congress-logo.jpg';

const useStyles = makeStyles(theme => ({
  rightButton: {
    borderRight: `2px  solid ${theme.palette.text.secondary}`,
    '@media (max-width: 600px)': {
      borderRight: 'none',
      borderBottom: `2px  solid ${theme.palette.text.secondary}`, 
    },
  },
  image: {
    width: '10%',
    borderRadius: '50%',
    maxWidth: 90,
    '@media (max-width: 600px)': {
      width: '25%',
      maxWidth: 70,
    },
  },
  upper: {
    textTransform: 'uppercase',
    '@media (max-width: 600px)': {
      fontSize: '1.25rem',
    },
  },
}));

const CongressArea = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Grid container spacing={10}>
      <Grid item xs={12}>
        <Box display='flex' justifyContent='center' alignItems='center'>
          <img src={CongressLogo} alt='logo' className={classes.image} />
          <Box ml={4}>
            <Typography
              variant='h1'
              className={classes.upper}
              style={{ color: '#ff6f28' }}
            >
              {t('Dashboard.CongressArea.caption')}
            </Typography>
            <Typography variant='h2' className={classes.upper}>
            {t('Dashboard.CongressArea.subCaption')}
            </Typography>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} className={classes.rightButton}>
        <HLSPlayer />
        <CongressQuestions />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Annoucements />
      </Grid>
    </Grid>
  );
};

export default CongressArea;
