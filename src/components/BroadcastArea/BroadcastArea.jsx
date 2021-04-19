import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import Helmet from 'react-helmet';

import HLSPlayer from '../HLSPlayer';
import BroadcastQuestions from './BroadcastQuestions';
import Annoucements from './Annoucements';

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
  container: {
    marginTop: 40,
    '@media (max-width: 600px)': {
      marginTop: 20,
    },
  },
}));

const BroadcastArea = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <>
      <Helmet title={t('Dashboard.BroadcastArea.name')} />

      <Grid container spacing={10} className={classes.container}>
        <Grid item xs={12} sm={6} className={classes.rightButton}>
          <HLSPlayer />
          <BroadcastQuestions />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Annoucements />
        </Grid>
      </Grid>
    </>
  );
};

export default BroadcastArea;
